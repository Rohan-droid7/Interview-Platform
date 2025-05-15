"use client";

import React, { useEffect } from "react";
import { TopBar } from "@/components/TopBar";
import { Sidebar } from "@/components/Sidebar";
import { ProblemStatement } from "@/components/ProblemStatement";
import { CodeEditor } from "@/components/CodeEditor";
import { BottomPanel } from "@/components/BottomPanel";
import { EndTestModal } from "@/components/EndTestModal";
import { useTest } from "@/store/TestContext";

export default function ProblemPage({ params }: { params: { id: string } }) {
  const { setCurrentProblemId } = useTest();

  useEffect(() => {
    setCurrentProblemId(params.id);
  }, [params.id, setCurrentProblemId]);

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#0f1115]">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex flex-1">
          {/* Left Panel - Problem Statement */}
          <div className="w-[48%] min-w-0 border-r border-[#2a2c35]">
            <ProblemStatement />
          </div>
          
          {/* Right Panel - Editor & Test Panel */}
          <div className="flex w-[52%] min-w-0 flex-col">
            <div className="flex-1 overflow-hidden">
              <CodeEditor />
            </div>
            <BottomPanel />
          </div>
        </div>
      </div>
      <EndTestModal />
    </div>
  );
}
