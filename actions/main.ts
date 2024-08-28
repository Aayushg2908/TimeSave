"use server";

import { auth } from "@/auth";
import { db } from "@/db/drizzle";
import { userNotes, userSubscription, userTodos } from "@/db/schema";
import { stripe } from "@/lib/stripe";
import { checkSubscription } from "@/lib/subscription";
import { and, desc, eq } from "drizzle-orm";
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

  const query = await db
    .select()
    .from(userTodos)
    .where(
      and(eq(userTodos.userId, session.user.id!), eq(userTodos.date, date))
    )
    .orderBy(desc(userTodos.order))
    .limit(1);
  const lastTodo = query[0];
  const newOrder = lastTodo ? lastTodo.order + 1 : 0;

  await db.insert(userTodos).values({
    userId: session.user.id!,
    content: content,
    date: date,
    tag: tag,
    order: newOrder,
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
    .orderBy(userTodos.order);

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
    order?: number;
    start?: Date | null;
    end?: Date | null;
  };
  pathname: string;
}) => {
  const session = await auth();
  if (!session || !session?.user || !session.user?.id) {
    return redirect("/sign-in");
  }

  const isPro = await checkSubscription();
  if (!isPro) {
    return;
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

export const upgradeToPro = async () => {
  const session = await auth();
  if (!session || !session?.user || !session.user?.id) {
    return redirect("/sign-in");
  }

  const query = await db
    .select()
    .from(userSubscription)
    .where(eq(userSubscription.userId, session.user.id!));
  const subscription = query[0];

  if (subscription && subscription.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: subscription.stripeCustomerId,
      return_url: "https://time-save.vercel.app/today",
    });

    return { url: stripeSession.url };
  }

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: "https://time-save.vercel.app/today",
    cancel_url: "https://time-save.vercel.app/today",
    payment_method_types: ["card"],
    mode: "subscription",
    billing_address_collection: "auto",
    customer_email: session.user.email!,
    line_items: [
      {
        price_data: {
          currency: "USD",
          product_data: {
            name: "Time Save",
            description: "Your daily productivity companion",
          },
          unit_amount: 1000,
          recurring: {
            interval: "month",
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      userId: session.user.id,
    },
  });

  return { url: stripeSession.url };
};
