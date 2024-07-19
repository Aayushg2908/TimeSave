import { ListTodoIcon } from "lucide-react";

const Todo = () => {
  return (
    <div className="h-full border-r p-3">
      <h1 className="flex items-center gap-x-2">
        <ListTodoIcon className="text-green-600" />
        <span className="font-bold tracking-tighter text-lg">To-Do</span>
      </h1>
    </div>
  );
};

export default Todo;
