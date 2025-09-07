"use client";

import { useRef, useEffect } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MermaidEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export function MermaidEditor({ content, onChange, placeholder = "Enter your Mermaid diagram code..." }: MermaidEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

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
    if (!textareaRef.current || !lineNumbersRef.current || !highlightRef.current) return;
    const scrollTop = textareaRef.current.scrollTop;
    lineNumbersRef.current.scrollTop = scrollTop;
    highlightRef.current.scrollTop = scrollTop;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      
      const textarea = textareaRef.current;
      if (!textarea) return;
      
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      // Insert tab character at cursor position
      const newValue = content.substring(0, start) + '\t' + content.substring(end);
      onChange(newValue);
      
      // Set cursor position after the inserted tab
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      }, 0);
    }
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
        
        {/* Code editor with syntax highlighting */}
        <div className="flex-1 relative">
          {/* Syntax highlighting overlay */}
          <div 
            ref={highlightRef}
            className="absolute inset-0 pointer-events-none overflow-hidden"
          >
            <SyntaxHighlighter
              language="mermaid"
              style={{
                ...oneLight,
                'pre[class*="language-"]': {
                  ...oneLight['pre[class*="language-"]'],
                  background: 'transparent',
                  margin: 0,
                  padding: '16px',
                  fontSize: '14px',
                  lineHeight: '24px',
                  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
                },
                'code[class*="language-"]': {
                  ...oneLight['code[class*="language-"]'],
                  background: 'transparent',
                  fontSize: '14px',
                  lineHeight: '24px',
                  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
                }
              }}
              customStyle={{
                background: 'transparent',
                margin: 0,
                padding: '16px',
                fontSize: '14px',
                lineHeight: '24px',
              }}
            >
              {content || ' '}
            </SyntaxHighlighter>
          </div>
          
          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => onChange(e.target.value)}
            onScroll={handleScroll}
            onInput={updateLineNumbers}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full h-full resize-none border-none outline-none p-4 font-mono text-sm bg-transparent leading-6 relative z-10 text-transparent caret-gray-400"
            style={{
              tabSize: 2,
              minHeight: '384px',
            }}
          />
        </div>
      </div>
    </div>
  );
}
