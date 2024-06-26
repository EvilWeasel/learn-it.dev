"use client";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import type { PartialBlock } from "@blocknote/core";
import { debounce, debounceTime, from, Observable } from "rxjs";
import usePost from "@/hooks/use-http";

interface EditorProps {
  initialContent: PartialBlock[];
  articleId: string;
}

export const Editor = ({ initialContent = [], articleId }: EditorProps) => {
  // Creates a new editor instance.
  const editor = useCreateBlockNote({ initialContent: initialContent });

  // todo: extract into module (useHTTPHook)
  // returns an observable, that the consumer can subscribe to
  const dataObs = new Observable((subscribers) => {
    editor.onChange((editor) => {
      subscribers.next(editor.document);
    });
  })
    .pipe(debounceTime(2000))
    .subscribe(async (data) => {
      try {
        console.log("Editor content changed:");
        const content = JSON.stringify(editor.document);

        // fetch PATCH "api/article/[articleId]"
        const result = await fetch(`/api/article/${articleId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content }),
        });
        if (result.ok) {
          console.log("Editor content saved successfully:", content);
        } else {
          console.error("Failed to save editor content:", result.statusText);
        }
      } catch (error) {
        console.error("Failed to save editor content:", error);
      }
    });

  // Renders the editor instance using a React component.
  return <BlockNoteView editor={editor} />;
};
