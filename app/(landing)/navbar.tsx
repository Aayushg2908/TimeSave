import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="h-[60px] w-full px-4 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-x-1">
        <Image
          src="/logo.webp"
          alt="main-logo"
          width={50}
          height={50}
          className="size-12"
        />
        <h1 className="font-semibold text-lg max-sm:hidden">TimeSave</h1>
      </Link>
      <ClerkLoading>
        <Loader2 className="size-8 animate-spin text-green-500" />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Link
            href="/sign-in"
            className={cn(
              buttonVariants({
                className: "font-bold",
              })
            )}
          >
            Login
          </Link>
        </SignedOut>
      </ClerkLoaded>
    </nav>
  );
};

export default Navbar;
