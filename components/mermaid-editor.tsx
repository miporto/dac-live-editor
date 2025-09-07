"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

interface MermaidEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export function MermaidEditor({ content, onChange, placeholder = "Enter your Mermaid diagram code..." }: MermaidEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-96 p-4 font-mono text-sm",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getText());
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && editor.getText() !== content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  return (
    <div className="border rounded-lg bg-background">
      <div className="border-b p-2 bg-muted/50">
        <h3 className="text-sm font-medium">Mermaid Code</h3>
      </div>
      <EditorContent 
        editor={editor} 
        className="min-h-96"
        placeholder={placeholder}
      />
    </div>
  );
}
