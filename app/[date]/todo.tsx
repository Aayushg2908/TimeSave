"use client";

import { createTodo } from "@/actions/main";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserTodo } from "@/db/schema";
import { ListTodoIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Todo = ({ userTodos }: { userTodos: UserTodo[] }) => {
  const [todo, setTodo] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAddTodo = async (e: any) => {
    e.preventDefault();
    if (!todo) return;

    try {
      setLoading(true);
      let finalContent;
      let tag = todo.match(/#\w+/g)?.[0];
      tag = tag?.replace("#", "");
      if (tag) {
        finalContent = todo.replace(`#${tag}`, "").trim();
      }

      await createTodo({
        content: finalContent || todo,
        date: new Date().toISOString().split("T")[0],
        tag: tag,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setTodo("");
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "n" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="h-full border-r p-2">
      <h1 className="flex items-center gap-x-2">
        <ListTodoIcon className="text-green-600" />
        <span className="font-bold tracking-tighter text-lg">To-Do</span>
      </h1>
      <form onSubmit={handleAddTodo} className="px-2">
        <div className="relative w-full">
          <Input
            ref={inputRef}
            value={todo}
            disabled={loading}
            onChange={(e) => setTodo(e.target.value)}
            className="mt-2 h-[40px] text-base"
            placeholder="Add a new to-do and #tag if needed"
          />
          <span className="bg-white absolute w-[25px] h-[25px] right-2 top-2 border p-1 flex items-center justify-center rounded-md shadow-md shadow-green-200 text-sm">
            N
          </span>
        </div>
        <Button type="submit" className="hidden">
          Save
        </Button>
      </form>
      <div className="flex flex-col px-2 gap-y-2 mt-4">
        {userTodos.map((todo) => (
          <div key={todo.id} className="flex items-center gap-x-2">
            <input type="checkbox" className="h-4 w-4" />
            <span>{todo.content}</span>
            {todo.tag && <span>{todo.tag}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
