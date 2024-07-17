import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="h-[45px] border-b px-4 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-x-1">
        <Image
          src="/logo.webp"
          alt="main-logo"
          width={50}
          height={50}
          className="size-10"
        />
        <h1 className="font-medium text-lg max-sm:hidden">TimeSave</h1>
      </Link>
      <UserButton />
    </div>
  );
};

export default Navbar;
