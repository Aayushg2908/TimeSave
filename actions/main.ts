"use server";

import { auth } from "@/auth";
import { db } from "@/db/drizzle";
import { userNotes, userTodos } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getNotes = async (date: string) => {
  const session = await auth();
  if (!session || !session?.user || !session.user?.id) {
    return redirect("/sign-in");
  }

  if (date === "today") {
    date = new Date().toISOString().split("T")[0];
  }

  const query = await db
    .select()
    .from(userNotes)
    .where(
      and(eq(userNotes.userId, session.user.id!), eq(userNotes.date, date))
    );

  return query[0];
};

export const createNote = async ({
  content,
  date,
  pathname,
}: {
  content: string;
  date: string;
  pathname: string;
}) => {
  const session = await auth();
  if (!session || !session?.user || !session.user?.id) {
    return redirect("/sign-in");
  }

  await db.insert(userNotes).values({
    userId: session.user.id!,
    content: content,
    date: date,
  });

  revalidatePath(pathname);
};

export const saveNote = async ({
  content,
  date,
  pathname,
}: {
  content: string;
  date: string;
  pathname: string;
}) => {
  const session = await auth();
  if (!session || !session?.user || !session.user?.id) {
    return redirect("/sign-in");
  }

  await db
    .update(userNotes)
    .set({ content })
    .where(
      and(eq(userNotes.userId, session.user.id!), eq(userNotes.date, date))
    );

  revalidatePath(pathname);
};

export const createTodo = async ({
  content,
  date,
  tag,
  pathname,
}: {
  content: string;
  date: string;
  tag?: string;
  pathname: string;
}) => {
  const session = await auth();
  if (!session || !session?.user || !session.user?.id) {
    return redirect("/sign-in");
  }

  await db.insert(userTodos).values({
    userId: session.user.id!,
    content: content,
    date: date,
    tag: tag,
  });

  revalidatePath(pathname);
};

export const getTodos = async (date: string) => {
  const session = await auth();
  if (!session || !session?.user || !session.user?.id) {
    return redirect("/sign-in");
  }

  if (date === "today") {
    date = new Date().toISOString().split("T")[0];
  }

  const query = await db
    .select()
    .from(userTodos)
    .where(
      and(eq(userTodos.userId, session.user.id!), eq(userTodos.date, date))
    )
    .orderBy(userTodos.createdAt);

  return query;
};

export const saveTodo = async ({
  id,
  values,
  pathname,
}: {
  id: string;
  values: {
    content?: string;
    tag?: string | null;
    completed?: boolean;
  };
  pathname: string;
}) => {
  const session = await auth();
  if (!session || !session?.user || !session.user?.id) {
    return redirect("/sign-in");
  }

  await db
    .update(userTodos)
    .set({ ...values })
    .where(and(eq(userTodos.userId, session.user.id!), eq(userTodos.id, id)));

  revalidatePath(pathname);
};

export const deleteTodo = async (id: string, pathname: string) => {
  const session = await auth();
  if (!session || !session?.user || !session.user?.id) {
    return redirect("/sign-in");
  }

  await db
    .delete(userTodos)
    .where(and(eq(userTodos.userId, session.user.id!), eq(userTodos.id, id)));

  revalidatePath(pathname);
};
