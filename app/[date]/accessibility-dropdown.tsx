import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Link2Icon, SunsetIcon } from "lucide-react";
import Link from "next/link";

const AccessibilityDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <Globe className="text-green-500" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href="/" className="flex items-center">
            <Link2Icon className="size-5 mr-2" /> Home Page
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/today" className="flex items-center">
            <SunsetIcon className="size-5 mr-2" /> Go to Today
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccessibilityDropdown;
