import { getNotes, getTodos } from "@/actions/main";
import Notes from "./notes";
import Todo from "./todo";
import Calendar from "./calendar";
import { Event } from "react-big-calendar";

const MainPage = async ({ params }: { params: { date: string } }) => {
  const userNote = await getNotes(params.date);
  const userTodos = await getTodos(params.date);

  const calendarEvents: Event[] = userTodos.map((todo) => {
    if (todo.start && todo.end) {
      return {
        title: todo.content,
        start: new Date(todo.start),
        end: new Date(todo.end),
        resource: todo.id,
      };
    } else {
      return {};
    }
  });

  return (
    <div className="w-full h-full grid grid-cols-1 sm:grid-cols-3">
      <Todo userTodos={userTodos} date={params.date} />
      <Calendar calendarEvents={calendarEvents} />
      <Notes userNote={userNote} />
    </div>
  );
};

export default MainPage;
