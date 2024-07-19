"use client";

import { Button } from "@/components/ui/button";
import { NotebookPen } from "lucide-react";

const Notes = () => {
  return (
    <div className="py-2">
      <h1 className="w-full flex items-center justify-between gap-x-1 border-b pb-2 px-3">
        <div className="flex items-center gap-x-1">
          <NotebookPen className="text-green-600" />
          <span className="font-bold tracking-tighter text-lg">Notes</span>
        </div>
        <Button>Save</Button>
      </h1>
    </div>
  );
};

export default Notes;
