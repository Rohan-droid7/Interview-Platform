"use client";

import React from "react";
import { problems } from "@/data/problems";
import { useTest } from "@/store/TestContext";
import { useRouter } from "next/navigation";

import { TopBar } from "@/components/TopBar";
import { EndTestModal } from "@/components/EndTestModal";

export default function Home() {
  const { score } = useTest();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0f1115] text-[#f5f5f7] flex flex-col">
      <TopBar />

      {/* Main Content */}
      <div className="mx-auto flex-1 w-full max-w-4xl py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">2 problems</h1>
          <p className="text-[#b7bac7]">GOCC134 - 2026 IN Coding SWE Intern : Problems list</p>
        </div>

        <div className="space-y-4">
          {problems.map((problem, idx) => (
            <div 
              key={problem.id}
              className="flex items-center justify-between rounded-lg border border-[#2a2c35] bg-[#16171d] p-6 hover:border-blue-500 transition"
            >
              <div className="flex items-center space-x-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#2a2c35] text-[#b7bac7]">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold">{problem.title}</h3>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="rounded bg-[#222329] px-2 py-1 text-xs text-[#b7bac7]">
                      {problem.tag}
                    </span>
                    <span className="text-[#b7bac7]">Max score: {problem.score.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => router.push(`/problem/${problem.id}`)}
                className="rounded-md border border-[#2a2c35] bg-transparent px-6 py-2 text-sm font-medium text-white hover:bg-[#222329] transition"
              >
                Solve
              </button>
            </div>
          ))}
        </div>
      </div>
      <EndTestModal />
    </div>
  );
}
