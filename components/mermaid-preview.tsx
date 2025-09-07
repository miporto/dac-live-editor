"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

interface MermaidPreviewProps {
  content: string;
}

export function MermaidPreview({ content }: MermaidPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "default",
      securityLevel: "loose",
      fontFamily: "monospace",
      flowchart: {
        htmlLabels: true,
        useMaxWidth: true,
      },
      sequence: {
        useMaxWidth: true,
      },
      gantt: {
        useMaxWidth: true,
      },
    });
  }, []);

  useEffect(() => {
    if (!content.trim()) {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
      setError(null);
      return;
    }

    const renderDiagram = async () => {
      if (!containerRef.current) return;

      setIsLoading(true);
      setError(null);

      try {
        // Clear previous content
        containerRef.current.innerHTML = "";

        // Generate unique ID for this diagram
        const id = `mermaid-${Date.now()}`;
        
        // Validate and render the diagram
        const { svg } = await mermaid.render(id, content);
        containerRef.current.innerHTML = svg;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to render diagram");
        containerRef.current.innerHTML = "";
      } finally {
        setIsLoading(false);
      }
    };

    renderDiagram();
  }, [content]);

  return (
    <div className="border rounded-lg bg-background h-full flex flex-col">
      <div className="border-b p-2 bg-muted/50">
        <h3 className="text-sm font-medium">Preview</h3>
      </div>
      <div className="flex-1 overflow-auto p-4">
        {isLoading && (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded p-4 text-sm">
            <h4 className="font-medium text-destructive mb-2">Syntax Error</h4>
            <pre className="text-destructive/80 whitespace-pre-wrap">{error}</pre>
          </div>
        )}
        {!content.trim() && !isLoading && (
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            <p>Start typing Mermaid code to see the preview</p>
          </div>
        )}
        <div
          ref={containerRef}
          className="flex justify-center items-center min-h-32"
        />
      </div>
    </div>
  );
}
