"use client";

import React from "react";
import { Play, CheckCircle2, Diamond, EyeOff, Wifi } from "lucide-react";
import { useTest } from "@/store/TestContext";
import { useRouter } from "next/navigation";
import { problems } from "@/data/problems";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const TopBar = () => {
  const { 
    timeLeft, score, isEndTestModalOpen, setIsEndTestModalOpen, 
    setRunResult, setSubmissionResults, activeBottomTab, setActiveBottomTab, setIsBottomPanelOpen,
    codes, currentProblemId 
  } = useTest();
  const router = useRouter();
  const pathname = usePathname();

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleRun = async () => {
    setIsBottomPanelOpen(true);
    setActiveBottomTab("Results");
    setSubmissionResults(null); // Clear previous submit
    setRunResult({
      status: "running",
      output: "",
      expected: "",
      time: "0.0",
      memory: "0.0",
      passed: false
    });

    const problem = problems.find((p) => p.id === currentProblemId);
    const code = codes[currentProblemId];

    if (!problem || !code) return;

    try {
      const res = await fetch("/api/run-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: "c++",
          version: "10.2.0",
          code,
          stdin: problem.sampleInput,
        }),
      });
      const data = await res.json();
      const output = data.run?.stdout?.trim() || data.run?.stderr?.trim() || "";
      const expected = problem.sampleOutput.trim();
      
      setRunResult({
        status: "success",
        output,
        expected,
        time: "0.1",
        memory: "2",
        passed: output === expected
      });
    } catch (err) {
      setRunResult({
        status: "error",
        output: "Execution failed",
        expected: problem.sampleOutput,
        time: "0.0",
        memory: "0",
        passed: false
      });
    }
  };

  const handleSubmit = async () => {
     setIsBottomPanelOpen(true);
     setActiveBottomTab("Results");
     setRunResult(null); // Clear previous run
     const problem = problems.find((p) => p.id === currentProblemId);
     const code = codes[currentProblemId];
     if (!problem || !code) return;
     
     // Set initial loading state for submission
     setSubmissionResults([]);

     try {
       const results = await Promise.all(problem.testCases.map(async (tc, idx) => {
          const res = await fetch("/api/run-code", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              language: "c++",
              version: "10.2.0",
              code,
              stdin: tc.input,
            }),
          });
          const data = await res.json();
          const output = data.run?.stdout?.trim() || "";
          const expected = tc.expected.trim();
          const passed = output === expected;
          
          return {
            testCase: `Test case ${idx + 1}`,
            time: "0.01",
            memory: "2",
            score: passed ? (problem.score / problem.testCases.length) : 0,
            result: passed ? "Accepted" as const : "Wrong answer" as const
          };
       }));

       setSubmissionResults(results);
     } catch (err) {
        setSubmissionResults([{ testCase: "Test case 1", time: "0.0", memory: "0", score: 0, result: "Wrong answer" }]);
     }
  };

  return (
    <div className="flex h-14 shrink-0 items-center justify-between border-b border-[#2a2c35] bg-[#0f1115] px-4">
      {/* Left section */}
      <div className="flex items-center space-x-4">
        <Link href="/problems" className="flex h-8 w-8 items-center justify-center rounded bg-[#222329] font-bold text-white hover:bg-[#2a2c35] transition">
          H
        </Link>
        <div className="flex items-center space-x-2 text-xs font-medium text-[#b7bac7]">
          <CheckCircle2 className="h-4 w-4" />
          <span>0/2</span>
        </div>
        <div className="flex items-center space-x-1 text-xs font-medium text-[#b7bac7]">
          <Diamond className="h-4 w-4" />
          <span>40</span>
        </div>
        <div className="flex items-center justify-center h-6 w-8 rounded border border-green-500/30 bg-green-500/10">
          <Wifi className="h-4 w-4 text-green-500" />
        </div>
      </div>

      {/* Center - Timer */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center space-x-2 rounded-full bg-[#33353f] px-4 py-1.5">
        <span className="text-sm font-semibold tracking-wider text-white">
          {formatTime(timeLeft)}
        </span>
        <EyeOff className="h-4 w-4 text-[#b7bac7]" />
      </div>

      {/* Right section - Buttons */}
      <div className="flex items-center space-x-3">
        {pathname === "/problems" ? (
          <button 
            onClick={() => setIsEndTestModalOpen(true)}
            className="flex items-center space-x-2 rounded-md bg-red-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-red-600 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            <span>End test</span>
          </button>
        ) : (
          <>
            <button 
              onClick={handleRun}
              className="flex items-center space-x-2 rounded-md bg-[#222329] px-4 py-1.5 text-sm font-medium text-white hover:bg-[#2a2c35] transition"
            >
              <Play className="h-4 w-4" />
              <span>Run</span>
            </button>
            <button 
              onClick={handleSubmit}
              className="flex items-center space-x-2 rounded-md bg-blue-600 px-6 py-1.5 text-sm font-medium text-white hover:bg-blue-700 transition"
            >
              <span>Submit</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
