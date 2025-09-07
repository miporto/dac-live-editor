"use client";

import { useState } from "react";
import { MermaidEditor } from "@/components/mermaid-editor";
import { MermaidPreview } from "@/components/mermaid-preview";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const defaultMermaidCode = `flowchart TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[fa:fa-car Car]`;

export default function Home() {
  const [mermaidContent, setMermaidContent] = useState(defaultMermaidCode);

  return (
    <div className="h-screen flex flex-col">
      <header className="border-b p-4 bg-background">
        <h1 className="text-2xl font-bold">DAC Live Editor</h1>
        <p className="text-sm text-muted-foreground">Create diagrams with Mermaid</p>
      </header>
      
      <div className="flex-1">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel defaultSize={50} minSize={30}>
            <MermaidEditor
              content={mermaidContent}
              onChange={setMermaidContent}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50} minSize={30}>
            <MermaidPreview content={mermaidContent} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
