import { getNotes, getTodos } from "@/actions/main";
import Notes from "./notes";
import Todo from "./todo";
import Calendar from "./calendar";

const MainPage = async ({ params }: { params: { date: string } }) => {
  const userNote = await getNotes(params.date);
  const userTodos = await getTodos(params.date);

  return (
    <div className="w-full h-full grid grid-cols-1 sm:grid-cols-3">
      <Todo userTodos={userTodos} date={params.date} />
      <Calendar />
      <Notes userNote={userNote} />
    </div>
  );
};

export default MainPage;
