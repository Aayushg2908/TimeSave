"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { Gem, LogOutIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const UserDropdown = () => {
  const { data } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        {data?.user?.image ? (
          <Image
            src={data.user.image}
            alt="user-image"
            width={50}
            height={50}
          />
        ) : (
          <FaUserCircle className="size-6" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer">
          <Gem className="size-5 mr-2" /> Upgrade
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={async () => {
            await signOut();
          }}
          className="cursor-pointer"
        >
          <LogOutIcon className="size-5 mr-2" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
