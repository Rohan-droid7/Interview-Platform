"use client";

import React from "react";
import { useTest } from "@/store/TestContext";
import { X, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export const EndTestModal = () => {
  const { isEndTestModalOpen, setIsEndTestModalOpen, timeLeft } = useTest();
  const router = useRouter();

  if (!isEndTestModalOpen) return null;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleEndTest = () => {
    setIsEndTestModalOpen(false);
    router.push("/submitted");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-[500px] rounded-lg border border-[#2a2c35] bg-[#222329] p-6 text-[#f5f5f7] shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">End Test?</h2>
          <button 
            onClick={() => setIsEndTestModalOpen(false)}
            className="text-[#b7bac7] hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <p className="mb-6 text-[#b7bac7]">Review your progress before final submission</p>
        
        <div className="mb-8 flex space-x-4">
          <div className="flex flex-1 flex-col items-center justify-center rounded-lg border border-[#ca8a04] bg-[#a16207]/20 py-6 text-[#facc15]">
            <div className="text-3xl font-bold mb-2">{formatTime(timeLeft)}</div>
            <div className="text-sm">Time Left</div>
          </div>
          
          <div className="flex flex-1 flex-col items-center justify-center rounded-lg border border-green-600 bg-green-900/20 py-6 text-green-500">
            <CheckCircle className="mb-2 h-8 w-8" />
            <div className="font-semibold">All Done!</div>
            <div className="text-xs">Ready to submit</div>
          </div>
        </div>
        
        <button 
          onClick={handleEndTest}
          className="w-full rounded-md bg-[#f97316] py-3 font-semibold text-white hover:bg-[#ea580c] transition"
        >
          End Test
        </button>
      </div>
    </div>
  );
};
