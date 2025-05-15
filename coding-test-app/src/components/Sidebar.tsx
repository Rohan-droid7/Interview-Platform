"use client";

import React from "react";
import { useTest } from "@/store/TestContext";
import { FileText, Sun, HelpCircle, Power } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
  const { currentProblemId, setCurrentProblemId, setIsEndTestModalOpen } = useTest();
  const router = useRouter();

  return (
    <div className="flex w-16 shrink-0 flex-col items-center justify-between border-r border-[#2a2c35] bg-[#0f1115] py-4">
      <div className="flex flex-col items-center space-y-4 w-full">
        <button className="flex h-10 w-10 items-center justify-center rounded-lg text-[#b7bac7] hover:bg-[#222329] hover:text-white transition">
          <FileText className="h-5 w-5" />
        </button>
        <div className="w-8 h-px bg-[#2a2c35] my-2" />
        {[1, 2].map((num) => {
          const isActive = currentProblemId === num.toString();
          return (
            <button
              key={num}
              onClick={() => {
                setCurrentProblemId(num.toString());
                router.push(`/problem/${num}`);
              }}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition",
                isActive
                  ? "border-[2px] border-blue-600 bg-transparent text-white"
                  : "bg-transparent text-[#b7bac7] hover:bg-[#222329] hover:text-white"
              )}
            >
              {num}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col items-center space-y-4">
        <button className="text-[#b7bac7] hover:text-white transition">
          <Sun className="h-5 w-5" />
        </button>
        <button className="text-[#b7bac7] hover:text-white transition">
          <HelpCircle className="h-5 w-5" />
        </button>
        <button 
          onClick={() => setIsEndTestModalOpen(true)}
          className="text-red-500 hover:text-red-400 transition"
        >
          <Power className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
