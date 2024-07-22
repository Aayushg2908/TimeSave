"use client";

import { createTodo, saveTodo } from "@/actions/main";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserTodo } from "@/db/schema";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Ellipsis, ListTodoIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

const Todo = ({ userTodos }: { userTodos: UserTodo[] }) => {
  const [todo, setTodo] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const [contentEditing, setContentEditing] = useState("");
  const [newContent, setNewContent] = useState("");

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
        pathname: pathname,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setTodo("");
      setLoading(false);
    }
  };

  const handleSaveTodo = async (e: any) => {
    e.preventDefault();
    if (!newContent) {
      setContentEditing("");
      return;
    }

    try {
      setLoading(true);
      await saveTodo({
        id: contentEditing,
        values: {
          content: newContent,
        },
        pathname,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setContentEditing("");
      setNewContent("");
      setLoading(false);
    }
  };

  const handleCheckedChange = async (checked: CheckedState, id: string) => {
    try {
      await saveTodo({
        id,
        values: {
          completed: checked as boolean,
        },
        pathname,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollArea className="w-full h-full border-r">
      <div className="h-full p-2">
        <h1 className="flex items-center gap-x-2">
          <ListTodoIcon className="text-green-600" />
          <span className="font-bold tracking-tighter text-lg">To-Do</span>
        </h1>
        <form onSubmit={handleAddTodo} className="px-2">
          <div className="w-full">
            <Input
              ref={inputRef}
              value={todo}
              disabled={loading}
              onChange={(e) => setTodo(e.target.value)}
              className="mt-2 h-[40px] text-base"
              placeholder="Add a new to-do and #tag if needed"
            />
          </div>
          <Button type="submit" className="hidden">
            Save
          </Button>
        </form>
        <div className="flex flex-col px-2 gap-y-2 mt-6">
          {userTodos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between border shadow-sm h-[40px] rounded-md p-2"
            >
              <div className="flex items-center gap-x-4">
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={(checked: CheckedState) =>
                    handleCheckedChange(checked, todo.id)
                  }
                />
                {contentEditing === todo.id ? (
                  <form onSubmit={handleSaveTodo}>
                    <Input
                      autoFocus
                      disabled={loading}
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      className="p-0 outline-none border-none focus-visible:ring-0"
                    />
                    <Button type="submit" className="hidden">
                      Save
                    </Button>
                  </form>
                ) : (
                  <span
                    onClick={() => {
                      setContentEditing(todo.id);
                      setNewContent(todo.content);
                    }}
                    className={todo.completed ? "line-through" : ""}
                  >
                    {todo.content}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-x-4">
                {todo.tag && <Badge>{todo.tag}</Badge>}
                <Ellipsis className="size-5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};

export default Todo;
