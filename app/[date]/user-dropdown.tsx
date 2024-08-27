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
import { toast } from "sonner";
import { upgradeToPro } from "@/actions/main";

const UserDropdown = () => {
  const { data } = useSession();

  const handleUpgrade = async () => {
    try {
      const data = await upgradeToPro();
      window.location.href = data.url!;
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        {data?.user?.image ? (
          <Image
            src={data.user.image}
            alt="user-image"
            width={50}
            height={50}
            className="size-6"
          />
        ) : (
          <FaUserCircle className="size-6" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={handleUpgrade} className="cursor-pointer">
          <Gem className="size-5 mr-2 text-green-500" />
          <span className="text-green-500">Upgrade</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={async () => {
            await signOut();
          }}
          className="cursor-pointer"
        >
          <LogOutIcon className="size-5 mr-2 text-red-500" />
          <span className="text-red-500">Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
