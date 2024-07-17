import { Button } from "@/components/ui/button";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="h-[60px] w-full px-4 flex items-center justify-between">
      <div className="flex items-center gap-x-1">
        <Image
          src="/logo.webp"
          alt="main-logo"
          width={50}
          height={50}
          className="size-12"
        />
        <h1 className="font-semibold text-lg">TimeSave</h1>
      </div>
      <Button className="font-bold">Login</Button>
    </nav>
  );
};

export default Navbar;
