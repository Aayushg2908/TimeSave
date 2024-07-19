"use client";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { PartialBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
}

const Editor = ({ onChange, initialContent }: EditorProps) => {
  const editor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    trailingBlock: false,
  });

  return (
    <BlockNoteView
      editor={editor}
      theme="light"
      onChange={() => onChange(JSON.stringify(editor.document))}
    />
  );
};

export default Editor;
