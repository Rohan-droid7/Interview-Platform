"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { defaultCppCode, problems } from "../data/problems";

export type RunResult = {
  status: "idle" | "running" | "success" | "error";
  output: string;
  expected: string;
  time: string;
  memory: string;
  passed: boolean;
};

export type SubmissionResult = {
  testCase: string;
  time: string;
  memory: string;
  score: number;
  result: "Accepted" | "Wrong answer";
};

type CodeMap = { [problemId: string]: string };

type TestContextType = {
  timeLeft: number;
  setTimeLeft: (time: number) => void;
  codes: CodeMap;
  setCode: (problemId: string, code: string) => void;
  currentProblemId: string;
  setCurrentProblemId: (id: string) => void;
  isEndTestModalOpen: boolean;
  setIsEndTestModalOpen: (open: boolean) => void;
  runResult: RunResult | null;
  setRunResult: (res: RunResult | null) => void;
  submissionResults: SubmissionResult[] | null;
  setSubmissionResults: (res: SubmissionResult[] | null) => void;
  score: number;
  setScore: (score: number) => void;
  activeBottomTab: "TestCases" | "QuickTest" | "Results";
  setActiveBottomTab: (tab: "TestCases" | "QuickTest" | "Results") => void;
  isBottomPanelOpen: boolean;
  setIsBottomPanelOpen: (open: boolean) => void;
  hasTestStarted: boolean;
  setHasTestStarted: (started: boolean) => void;
  startTime: string | null;
  setStartTime: (time: string) => void;
};

const TestContext = createContext<TestContextType | undefined>(undefined);

export const TestProvider = ({ children }: { children: React.ReactNode }) => {
  const [timeLeft, setTimeLeft] = useState(50 * 60); // 50 minutes
  const [codes, setCodes] = useState<CodeMap>({
    "1": defaultCppCode,
    "2": defaultCppCode,
  });
  const [currentProblemId, setCurrentProblemId] = useState("1");
  const [isEndTestModalOpen, setIsEndTestModalOpen] = useState(false);
  const [runResult, setRunResult] = useState<RunResult | null>(null);
  const [submissionResults, setSubmissionResults] = useState<SubmissionResult[] | null>(null);
  const [score, setScore] = useState(0);
  const [activeBottomTab, setActiveBottomTab] = useState<"TestCases" | "QuickTest" | "Results">("TestCases");
  const [isBottomPanelOpen, setIsBottomPanelOpen] = useState(false);
  const [hasTestStarted, setHasTestStarted] = useState(false);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [email, setEmail] = useState("garg20005rohan@gmail.com");

  useEffect(() => {
    if (!hasTestStarted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsEndTestModalOpen(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [hasTestStarted]);

  const setCode = (problemId: string, code: string) => {
    setCodes((prev) => ({ ...prev, [problemId]: code }));
  };

  return (
    <TestContext.Provider
      value={{
        timeLeft,
        setTimeLeft,
        codes,
        setCode,
        currentProblemId,
        setCurrentProblemId,
        isEndTestModalOpen,
        setIsEndTestModalOpen,
        runResult,
        setRunResult,
        submissionResults,
        setSubmissionResults,
        score,
        setScore,
        activeBottomTab,
        setActiveBottomTab,
        isBottomPanelOpen,
        setIsBottomPanelOpen,
        hasTestStarted,
        setHasTestStarted,
        startTime,
        setStartTime,
      }}
    >
      {children}
    </TestContext.Provider>
  );
};

export const useTest = () => {
  const context = useContext(TestContext);
  if (!context) {
    throw new Error("useTest must be used within a TestProvider");
  }
  return context;
};
