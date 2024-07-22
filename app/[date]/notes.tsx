"use client";

import { createNote, saveNote as saveUserNote } from "@/actions/main";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserNote } from "@/db/schema";
import { Loader2, NotebookPen } from "lucide-react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

const Notes = ({ userNote }: { userNote: UserNote }) => {
  const [note, setNote] = useState(userNote ? userNote.content : "");
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const saveNote = async () => {
    try {
      setLoading(true);
      if (!userNote) {
        await createNote({
          content: note,
          date: new Date().toISOString().split("T")[0],
          pathname: pathname,
        });
      } else {
        await saveUserNote({
          content: note,
          date: userNote.date,
          pathname: pathname,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollArea className="w-full h-full py-2">
      <h1 className="w-full flex items-center justify-between gap-x-1 border-b pb-2 px-3">
        <div className="flex items-center gap-x-1">
          <NotebookPen className="text-green-600" />
          <span className="font-bold tracking-tighter text-lg">Notes</span>
        </div>
        <Button disabled={loading} onClick={saveNote} size="sm">
          {loading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <span>Save</span>
          )}
        </Button>
      </h1>
      <Editor
        onChange={setNote}
        initialContent={userNote ? userNote.content : ""}
      />
    </ScrollArea>
  );
};

export default Notes;
