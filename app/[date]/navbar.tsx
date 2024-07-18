import UserDropdown from "./user-dropdown";

const Navbar = () => {
  return (
    <nav className="absolute w-full top-4 flex flex-col items-center">
      <div className="h-[55px] w-[230px] rounded-full border shadow-lg flex items-center py-2 px-4 justify-between">
        <div>Calendar</div>
        <UserDropdown />
      </div>
    </nav>
  );
};

export default Navbar;
