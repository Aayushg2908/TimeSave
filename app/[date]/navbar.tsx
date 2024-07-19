import AccessibilityDropdown from "./accessibility-dropdown";
import UserDropdown from "./user-dropdown";

const Navbar = () => {
  return (
    <nav className="z-10 fixed w-full bottom-3 flex flex-col items-center">
      <div className="h-[40px] w-[200px] rounded-full border shadow-lg flex items-center py-2 px-4 justify-between">
        <AccessibilityDropdown />
        <div>Calendar</div>
        <UserDropdown />
      </div>
    </nav>
  );
};

export default Navbar;
