import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Link2Icon, SunsetIcon } from "lucide-react";

const AccessibilityDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <Globe className="text-green-500" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer">
          <Link2Icon className="size-5 mr-2" /> Home Page
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <SunsetIcon className="size-5 mr-2" /> Go to Today
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccessibilityDropdown;
