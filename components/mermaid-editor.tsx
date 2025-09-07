"use client";

import { useRef, useEffect } from "react";

interface MermaidEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export function MermaidEditor({ content, onChange, placeholder = "Enter your Mermaid diagram code..." }: MermaidEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const updateLineNumbers = () => {
    if (!textareaRef.current || !lineNumbersRef.current) return;
    
    const lines = textareaRef.current.value.split('\n');
    const lineCount = lines.length;
    
    lineNumbersRef.current.innerHTML = Array.from(
      { length: lineCount }, 
      (_, i) => `<div class="line-number">${i + 1}</div>`
    ).join('');
  };

  const handleScroll = () => {
    if (!textareaRef.current || !lineNumbersRef.current) return;
    lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
  };

  useEffect(() => {
    updateLineNumbers();
  }, [content]);

  return (
    <div className="border rounded-lg bg-background h-full flex flex-col">
      <div className="border-b p-2 bg-muted/50">
        <h3 className="text-sm font-medium">Mermaid Code</h3>
      </div>
      <div className="flex flex-1 min-h-96">
        {/* Line numbers */}
        <div 
          ref={lineNumbersRef}
          className="bg-muted/30 border-r text-xs text-muted-foreground p-2 w-12 overflow-hidden font-mono leading-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
            .line-number {
              text-align: right;
              padding-right: 8px;
              height: 24px;
              line-height: 24px;
              user-select: none;
            }
          `}</style>
        </div>
        
        {/* Code editor */}
        <div className="flex-1">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => onChange(e.target.value)}
            onScroll={handleScroll}
            onInput={updateLineNumbers}
            placeholder={placeholder}
            className="w-full h-full resize-none border-none outline-none p-4 font-mono text-sm bg-transparent leading-6"
            style={{
              tabSize: 2,
              minHeight: '384px'
            }}
          />
        </div>
      </div>
    </div>
  );
}
