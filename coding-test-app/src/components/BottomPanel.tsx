"use client";

import React from "react";
import { useTest } from "@/store/TestContext";
import { X, Play } from "lucide-react";
import { problems } from "@/data/problems";
import { cn } from "@/lib/utils";

export const BottomPanel = () => {
  const { currentProblemId, isBottomPanelOpen, setIsBottomPanelOpen, activeBottomTab, setActiveBottomTab, runResult, submissionResults } = useTest();
  
  const problem = problems.find((p) => p.id === currentProblemId);
  if (!problem) return null;

  return (
    <div className={cn(
      "flex shrink-0 flex-col border-t border-[#2a2c35] bg-[#16171d] text-[#f5f5f7] transition-all",
      isBottomPanelOpen ? "h-64" : "h-10"
    )}>
      {/* Tabs */}
      <div className="flex h-10 items-center justify-between bg-[#16171d] px-4">
        <div className="flex space-x-6 text-sm font-medium text-[#b7bac7]">
          <button 
            onClick={() => {
               setActiveBottomTab("TestCases");
               if (!isBottomPanelOpen) setIsBottomPanelOpen(true);
            }}
            className={cn("h-10 border-b-2 transition", activeBottomTab === "TestCases" && isBottomPanelOpen ? "border-blue-500 text-white" : "border-transparent hover:text-white")}
          >
            Test cases
          </button>
          <button 
            onClick={() => {
               setActiveBottomTab("QuickTest");
               if (!isBottomPanelOpen) setIsBottomPanelOpen(true);
            }}
            className={cn("h-10 border-b-2 transition", activeBottomTab === "QuickTest" && isBottomPanelOpen ? "border-blue-500 text-white" : "border-transparent hover:text-white")}
          >
            Quick test
          </button>
          <button 
            onClick={() => {
               setActiveBottomTab("Results");
               if (!isBottomPanelOpen) setIsBottomPanelOpen(true);
            }}
            className={cn("h-10 border-b-2 transition", activeBottomTab === "Results" && isBottomPanelOpen ? "border-blue-500 text-white" : "border-transparent hover:text-white")}
          >
            Results
          </button>
        </div>
        <button 
           onClick={() => setIsBottomPanelOpen(!isBottomPanelOpen)} 
           className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2a2c35] text-[#b7bac7] hover:text-white transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("transition-transform", isBottomPanelOpen ? "rotate-180" : "")}
          >
            <path d="m18 15-6-6-6 6"/>
          </svg>
        </button>
      </div>

      {/* Content */}
      {isBottomPanelOpen && (
        <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-[#2a2c35] scrollbar-track-transparent bg-[#16171d]">
        {activeBottomTab === "TestCases" && (
          <div className="flex h-full space-x-4">
            <div className="flex-1 rounded-md border border-[#2a2c35] bg-[#0f1115] p-3 flex flex-col min-w-0">
               <h4 className="mb-2 text-xs font-semibold text-[#b7bac7]">Sample Input</h4>
               <pre className="text-sm flex-1 overflow-y-auto whitespace-pre-wrap break-all" style={{ scrollbarWidth: 'none' }}>{problem.sampleInput}</pre>
            </div>
            <div className="flex-1 rounded-md border border-[#2a2c35] bg-[#0f1115] p-3 flex flex-col min-w-0">
               <h4 className="mb-2 text-xs font-semibold text-[#b7bac7]">Expected Output</h4>
               <pre className="text-sm flex-1 overflow-y-auto whitespace-pre-wrap break-all" style={{ scrollbarWidth: 'none' }}>{problem.sampleOutput}</pre>
            </div>
            <div className="flex flex-col space-y-2">
               <button className="flex items-center space-x-1 rounded bg-[#222329] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#2a2c35] transition">
                  <span>Copy to custom Input</span>
               </button>
               <button className="flex items-center justify-center space-x-1 rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition">
                  <Play className="h-3 w-3" />
                  <span>Run</span>
               </button>
            </div>
          </div>
        )}

        {activeBottomTab === "QuickTest" && (
          <div className="flex h-full flex-col">
             <textarea 
               className="w-full flex-1 rounded-md border border-[#2a2c35] bg-[#0f1115] p-3 text-sm text-white focus:border-blue-500 focus:outline-none resize-none mb-3" 
               placeholder="Enter custom input here..."
             />
             <div className="flex justify-end">
                <button className="flex items-center space-x-1 rounded bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700 transition">
                   <Play className="h-4 w-4" />
                   <span>Run custom input</span>
                </button>
             </div>
          </div>
        )}

        {activeBottomTab === "Results" && (
          <div className="flex h-full flex-col">
            {runResult?.status === "running" && <div className="text-sm text-blue-400">Running code...</div>}
            {runResult?.status === "success" && !submissionResults && (
               <div className="flex flex-col space-y-3">
                  <div className={cn("text-lg font-bold", runResult.passed ? "text-green-500" : "text-red-500")}>
                     {runResult.passed ? "Accepted" : "Wrong Answer"}
                  </div>
                  <div className="flex space-x-8 text-sm">
                     <div>
                        <div className="text-[#b7bac7]">Score</div>
                        <div className="font-semibold">{runResult.passed ? "100.00" : "0.00"}</div>
                     </div>
                     <div>
                        <div className="text-[#b7bac7]">Time taken</div>
                        <div className="font-semibold">{runResult.time} s</div>
                     </div>
                     <div>
                        <div className="text-[#b7bac7]">Memory used</div>
                        <div className="font-semibold">{runResult.memory} KiB</div>
                     </div>
                  </div>
               </div>
            )}
            
            {submissionResults && (
               <div className="flex flex-col h-full">
                  <div className="text-sm text-[#b7bac7] mb-2">Your highest scored submission will be selected as the best submission</div>
                  <div className="overflow-y-auto border border-[#2a2c35] rounded-md">
                     <table className="w-full text-sm text-left">
                        <thead className="bg-[#0f1115] text-[#b7bac7]">
                           <tr>
                              <th className="px-4 py-2 font-medium">Test cases</th>
                              <th className="px-4 py-2 font-medium">Time (s)</th>
                              <th className="px-4 py-2 font-medium">Memory (KiB)</th>
                              <th className="px-4 py-2 font-medium">Score</th>
                              <th className="px-4 py-2 font-medium">Result</th>
                           </tr>
                        </thead>
                        <tbody>
                           {submissionResults.map((res, idx) => (
                              <tr key={idx} className="border-t border-[#2a2c35]">
                                 <td className="px-4 py-2 flex items-center space-x-2">
                                    <span className="h-3 w-3 rounded-full bg-transparent border border-[#b7bac7] flex items-center justify-center text-[8px]">i</span>
                                    <span>{res.testCase}</span>
                                 </td>
                                 <td className="px-4 py-2">{res.time}</td>
                                 <td className="px-4 py-2">{res.memory}</td>
                                 <td className="px-4 py-2">{res.score}</td>
                                 <td className={cn("px-4 py-2", res.result === "Accepted" ? "text-green-500" : "text-red-500")}>
                                    {res.result}
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            )}

            {!runResult && !submissionResults && (
               <div className="text-sm text-[#b7bac7]">No results yet. Run or submit your code to see results.</div>
            )}
          </div>
        )}
        </div>
      )}
    </div>
  );
};
