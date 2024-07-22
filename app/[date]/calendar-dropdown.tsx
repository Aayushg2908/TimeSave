"use client";

import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CalendarDropdown = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <span className="font-semibold">
          {new Date().toLocaleDateString(undefined, {
            month: "long",
            day: "numeric",
          })}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Calendar
          mode="single"
          selected={new Date()}
          onSelect={(date) => {
            if (!date) {
              router.push("/today");
              return;
            }
            date.setHours(date.getHours() + 24);
            router.push(`/${date.toISOString().split("T")[0]}`);
          }}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CalendarDropdown;
