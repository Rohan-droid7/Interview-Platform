"use client";

import React from "react";
import { useTest } from "@/store/TestContext";
import { problems } from "@/data/problems";
import { ChevronLeft, ChevronRight, Diamond, Bug } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export const ProblemStatement = () => {
  const { currentProblemId, setCurrentProblemId, startTime } = useTest();
  const watermarkEmail = "garg20005rohan@gmail.com";
  const router = useRouter();
  
  const problem = problems.find((p) => p.id === currentProblemId);
  if (!problem) return <div className="p-4 text-white">Problem not found</div>;

  const navigateTo = (direction: "prev" | "next") => {
    const currentIndex = problems.findIndex(p => p.id === currentProblemId);
    if (direction === "prev" && currentIndex > 0) {
      setCurrentProblemId(problems[currentIndex - 1].id);
      router.push(`/problem/${problems[currentIndex - 1].id}`);
    } else if (direction === "next" && currentIndex < problems.length - 1) {
      setCurrentProblemId(problems[currentIndex + 1].id);
      router.push(`/problem/${problems[currentIndex + 1].id}`);
    }
  };

  return (
    <div className="flex h-full flex-col bg-[#16171d] text-[#f5f5f7] relative">
      {/* Top Header inside ProblemStatement */}
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-[#2a2c35] bg-[#16171d] px-6">
        <span className="rounded-full border border-[#b7bac7] px-3 py-0.5 text-xs font-medium text-white">
          {problem.tag}
        </span>
        <div className="flex items-center space-x-4 text-xs font-medium text-white">
          <span className="flex items-center space-x-1">
            <Diamond className="h-4 w-4" />
            <span>{problem.score.toFixed(2)}</span>
          </span>
          <Bug className="h-4 w-4 text-[#b7bac7]" />
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden">
        {/* Watermarks - Fixed in background */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between py-24 opacity-[0.65] text-[#9396a5] z-10 overflow-hidden">
           <div className="rotate-[-15deg] text-lg whitespace-nowrap font-medium self-start ml-12">
              {watermarkEmail} <br/> {startTime || "2026-07-03 18:04 IST"}
           </div>
           <div className="rotate-[-15deg] text-lg whitespace-nowrap font-medium self-end mr-12 mt-12">
              {watermarkEmail} <br/> {startTime || "2026-07-03 18:04 IST"}
           </div>
           <div className="rotate-[-15deg] text-lg whitespace-nowrap font-medium self-center mt-24">
              {watermarkEmail} <br/> {startTime || "2026-07-03 18:04 IST"}
           </div>
        </div>

        {/* Scrolling Content */}
        <div className="absolute inset-0 overflow-y-auto p-6" style={{ scrollbarWidth: 'none' }}>
          <div className="space-y-6 text-sm text-[#b7bac7] relative z-20 mix-blend-normal">
          <h1 className="text-2xl font-semibold text-white">{problem.title}</h1>
          
          <section>
             <p className="whitespace-pre-wrap">{problem.description}</p>
          </section>

          <section>
            <h3 className="mb-2 font-semibold text-white">Input format</h3>
            <p className="whitespace-pre-wrap">{problem.inputFormat}</p>
          </section>

          <section>
            <h3 className="mb-2 font-semibold text-white">Output format</h3>
            <p className="whitespace-pre-wrap">{problem.outputFormat}</p>
          </section>

          <section>
            <h3 className="mb-2 font-semibold text-white">Constraints</h3>
            <p className="whitespace-pre-wrap">{problem.constraints}</p>
          </section>

          <div className="flex space-x-4">
            <div className="flex-1 flex flex-col min-w-0">
              <h3 className="mb-2 text-sm font-semibold text-white">Sample Input 1</h3>
              <div className="rounded-md border border-[#2a2c35] bg-[#222329] p-4 flex-1">
                <pre className="whitespace-pre-wrap break-all text-[#f5f5f7] font-mono text-xs">{problem.sampleInput}</pre>
              </div>
            </div>
            <div className="flex-1 flex flex-col min-w-0">
              <h3 className="mb-2 text-sm font-semibold text-white">Sample Output 1</h3>
              <div className="rounded-md border border-[#2a2c35] bg-[#222329] p-4 flex-1">
                <pre className="whitespace-pre-wrap break-all text-[#f5f5f7] font-mono text-xs">{problem.sampleOutput}</pre>
              </div>
            </div>
          </div>

          <section>
            <h3 className="mb-2 font-semibold text-white">Explanation</h3>
            <p className="whitespace-pre-wrap">{problem.explanation}</p>
          </section>

          {problem.note && (
             <section>
                <h3 className="mb-2 font-semibold text-white">Note:</h3>
                <p className="whitespace-pre-wrap">{problem.note}</p>
             </section>
          )}

          <section>
             <h3 className="mb-2 font-semibold text-white">Limits</h3>
             <ul className="list-disc pl-5 space-y-1">
                <li>Time Limit: {problem.limits.timeLimit}</li>
                <li>Memory Limit: {problem.limits.memoryLimit}</li>
                <li>Source Limit: {problem.limits.sourceLimit}</li>
             </ul>
          </section>

          <section>
             <h3 className="mb-2 font-semibold text-white">Scoring</h3>
             <p className="whitespace-pre-wrap text-[#b7bac7]">Score is assigned if any testcase passes.</p>
          </section>

          <section>
             <h3 className="mb-2 font-semibold text-white">Allowed Languages</h3>
             <p className="whitespace-pre-wrap text-xs text-[#b7bac7] leading-relaxed">{problem.allowedLanguages.join(", ")}</p>
          </section>
        </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-between border-t border-[#2a2c35] bg-[#16171d] px-6 py-4 z-20 relative">
        <button 
          onClick={() => navigateTo("prev")}
          disabled={problems.findIndex(p => p.id === currentProblemId) === 0}
          className="flex items-center space-x-2 rounded border border-[#2a2c35] px-4 py-1.5 text-sm text-white hover:bg-[#222329] transition disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </button>
        <span className="text-sm font-medium text-white">
          {problems.findIndex(p => p.id === currentProblemId) + 1}/{problems.length}
        </span>
        <button 
          onClick={() => navigateTo("next")}
          disabled={problems.findIndex(p => p.id === currentProblemId) === problems.length - 1}
          className="flex items-center space-x-2 rounded border border-[#2a2c35] px-4 py-1.5 text-sm text-white hover:bg-[#222329] transition disabled:opacity-50"
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
