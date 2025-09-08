"use client";

import { useCallback } from "react";
import CodeMirror from '@uiw/react-codemirror';
import { mermaid } from 'codemirror-lang-mermaid';
import { EditorView } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import { keymap } from '@codemirror/view';

interface MermaidEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export function MermaidEditor({ content, onChange, placeholder = "Enter your Mermaid diagram code..." }: MermaidEditorProps) {
  const handleChange = useCallback((value: string) => {
    onChange(value);
  }, [onChange]);

  return (
    <div className="border rounded-lg bg-background h-full flex flex-col">
      <div className="border-b p-2 bg-muted/50">
        <h3 className="text-sm font-medium">Mermaid Code</h3>
      </div>
      <div className="flex-1 overflow-hidden">
        <CodeMirror
          value={content}
          height="100%"
          placeholder={placeholder}
          extensions={[
            mermaid(),
            EditorView.lineWrapping,
            keymap.of([indentWithTab]),
            EditorView.theme({
              '&': { 
                height: '100%',
                fontSize: '14px',
              },
              '.cm-content': {
                padding: '16px',
                minHeight: '100%',
                fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
              },
              '.cm-focused': {
                outline: 'none',
              },
              '.cm-editor': { 
                height: '100%',
              },
              '.cm-scroller': {
                fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
                lineHeight: '1.5',
              },
              '.cm-gutters': {
                backgroundColor: 'hsl(var(--muted))',
                borderRight: '1px solid hsl(var(--border))',
                color: 'hsl(var(--muted-foreground))',
                fontSize: '12px',
              },
              '.cm-activeLineGutter': {
                backgroundColor: 'hsl(var(--muted) / 0.8)',
              },
              '.cm-activeLine': {
                backgroundColor: 'hsl(var(--muted) / 0.3)',
              },
              '.cm-selectionBackground': {
                backgroundColor: '#3b82f6 !important',
                opacity: '0.3 !important',
              },
              '&.cm-focused .cm-selectionBackground': {
                backgroundColor: '#3b82f6 !important',
                opacity: '0.3 !important',
              },
              '.cm-content ::selection': {
                backgroundColor: '#3b82f6 !important',
                opacity: '0.3 !important',
              },
              '.cm-cursor': {
                borderLeft: '2px solid #000000 !important',
                borderColor: '#000000 !important',
              },
              '.cm-cursor-primary': {
                borderLeft: '2px solid #000000 !important',
                borderColor: '#000000 !important',
              },
              '&.cm-focused .cm-cursor': {
                borderLeft: '2px solid #000000 !important',
                borderColor: '#000000 !important',
              },
            }),
          ]}
          onChange={handleChange}
          basicSetup={{
            lineNumbers: true,
            foldGutter: true,
            dropCursor: false,
            allowMultipleSelections: true,
            indentOnInput: true,
            tabSize: 2,
            closeBrackets: true,
            autocompletion: true,
            searchKeymap: true,
            highlightSelectionMatches: false,
          }}
        />
      </div>
    </div>
  );
}
