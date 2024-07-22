"use client";

import { createTodo, deleteTodo, saveTodo } from "@/actions/main";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserTodo } from "@/db/schema";
import { CheckedState } from "@radix-ui/react-checkbox";
import {
  Activity,
  CircleCheckBig,
  CopyIcon,
  Ellipsis,
  ListTodoIcon,
  TagIcon,
  Trash2,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

const Todo = ({ userTodos }: { userTodos: UserTodo[] }) => {
  const [todo, setTodo] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const [contentEditing, setContentEditing] = useState("");
  const [newContent, setNewContent] = useState("");
  const [tagEditing, setTagEditing] = useState("");
  const [newTag, setNewTag] = useState("");
  const [loadingTag, setLoadingTag] = useState(false);
  const [todoTag, setTodoTag] = useState("");
  const [todoTagLoading, setTodoTagLoading] = useState(false);

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

  const handleTodoTag = async (e: any) => {
    e.preventDefault();
    try {
      setLoadingTag(true);
      await saveTodo({
        id: tagEditing,
        values: {
          tag: newTag ? newTag : null,
        },
        pathname,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setTagEditing("");
      setNewTag("");
      setLoadingTag(false);
    }
  };

  const handleDragEnd = async (result: any) => {
    const { destination, source, type } = result;

    if (!destination) {
      console.log("No destination");
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      console.log("Same position");
      return;
    }

    if (type !== "Todos") return;

    if (source.droppableId === destination.droppableId) {
      try {
        const reorderedTodos = Array.from(userTodos);
        const [removed] = reorderedTodos.splice(source.index, 1);
        reorderedTodos.splice(destination.index, 0, removed);

        userTodos = reorderedTodos;

        await Promise.all(
          reorderedTodos.map(async (todo, index) => {
            await saveTodo({
              id: todo.id,
              values: {
                order: index,
              },
              pathname,
            });
          })
        );
      } catch (error) {
      } finally {
        toast.dismiss();
      }
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
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="todos" type="Todos">
            {(provided) => (
              <ol
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-col px-2 gap-y-2 mt-6"
              >
                {userTodos.map((todo, index) => (
                  <Draggable key={todo.id} draggableId={todo.id} index={index}>
                    {(provided) => (
                      <div
                        key={todo.id}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
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
                          {todo.tag && (
                            <>
                              {tagEditing === todo.id ? (
                                <Badge>
                                  <form onSubmit={handleTodoTag}>
                                    <Input
                                      disabled={loadingTag}
                                      autoFocus
                                      value={newTag}
                                      onChange={(e) =>
                                        setNewTag(e.target.value)
                                      }
                                      className="max-w-[60px] w-fit h-fit p-0 border-none focus-visible:ring-0 text-xs"
                                    />
                                    <Button type="submit" className="hidden">
                                      Save
                                    </Button>
                                  </form>
                                </Badge>
                              ) : (
                                <Badge
                                  onClick={() => {
                                    setTagEditing(todo.id);
                                    setNewTag(todo.tag!);
                                  }}
                                  className="max-w-[100px] line-clamp-1"
                                >
                                  {todo.tag}
                                </Badge>
                              )}
                            </>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <Ellipsis className="size-5 text-slate-500" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="space-y-1">
                              {todo.completed ? (
                                <DropdownMenuItem
                                  onSelect={async () => {
                                    await saveTodo({
                                      id: todo.id,
                                      values: {
                                        completed: false,
                                      },
                                      pathname,
                                    });
                                  }}
                                  className="cursor-pointer flex items-center gap-x-2"
                                >
                                  <Activity className="size-4" /> Mark as Active
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem
                                  onSelect={async () => {
                                    await saveTodo({
                                      id: todo.id,
                                      values: {
                                        completed: true,
                                      },
                                      pathname,
                                    });
                                  }}
                                  className="cursor-pointer flex items-center gap-x-2"
                                >
                                  <CircleCheckBig className="size-4" /> Mark as
                                  Done
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                onSelect={() => {
                                  navigator.clipboard.writeText(todo.content);
                                  toast.success("Title copied to clipboard");
                                }}
                                className="cursor-pointer flex items-center gap-x-2"
                              >
                                <CopyIcon className="size-4" /> Copy Title
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {todo.tag ? (
                                <DropdownMenuItem
                                  onSelect={async () => {
                                    await saveTodo({
                                      id: todo.id,
                                      values: {
                                        tag: null,
                                      },
                                      pathname,
                                    });
                                  }}
                                  className="cursor-pointer flex items-center gap-x-2"
                                >
                                  <TagIcon className="size-4" /> Remove Tag
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuSub>
                                  <DropdownMenuSubTrigger className="cursor-pointer flex items-center gap-x-2">
                                    <TagIcon className="size-4" /> Add Tag
                                  </DropdownMenuSubTrigger>
                                  <DropdownMenuSubContent>
                                    <form
                                      onSubmit={async (e) => {
                                        e.preventDefault();
                                        try {
                                          setTodoTagLoading(true);
                                          await saveTodo({
                                            id: todo.id,
                                            values: {
                                              tag: todoTag,
                                            },
                                            pathname,
                                          });
                                        } catch (error) {
                                          console.log(error);
                                        } finally {
                                          setTodoTagLoading(false);
                                        }
                                      }}
                                    >
                                      <Input
                                        disabled={todoTagLoading}
                                        value={todoTag}
                                        onChange={(e) =>
                                          setTodoTag(e.target.value)
                                        }
                                        placeholder="Add a to-do"
                                      />
                                      <Button type="submit" className="hidden">
                                        Save
                                      </Button>
                                    </form>
                                  </DropdownMenuSubContent>
                                </DropdownMenuSub>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onSelect={async () => {
                                  await deleteTodo(todo.id, pathname);
                                  toast.success("To-do deleted successfully");
                                }}
                                className="cursor-pointer flex items-center gap-x-2 text-red-500 hover:!text-red-500"
                              >
                                <Trash2 className="size-4" /> Delete to-do
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ol>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </ScrollArea>
  );
};

export default Todo;
