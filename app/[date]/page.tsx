import Notes from "./notes";
import Todo from "./todo";

const MainPage = () => {
  return (
    <div className="w-full h-full grid grid-cols-1 sm:grid-cols-3">
      <Todo />
      <div className="h-full border-r">CALENDAR</div>
      <Notes />
    </div>
  );
};

export default MainPage;
