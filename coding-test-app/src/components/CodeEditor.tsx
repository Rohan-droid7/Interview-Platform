"use client";

import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { useTest } from "@/store/TestContext";
import { ChevronDown, Keyboard, RotateCcw, Settings } from "lucide-react";

export const CodeEditor = () => {
  const { currentProblemId, codes, setCode } = useTest();
  const [language, setLanguage] = useState("c++"); // Default to C++

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(currentProblemId, value);
    }
  };

  return (
    <div className="flex h-full flex-col bg-[#0f1115]">
      {/* Toolbar */}
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-[#2a2c35] px-4">
        <div className="relative flex items-center">
          <button className="flex items-center space-x-2 rounded-md bg-[#16171d] px-3 py-1.5 text-sm text-[#f5f5f7] border border-[#2a2c35]">
            <span>C++ (gcc 10.3)</span>
            <ChevronDown className="h-4 w-4 text-[#b7bac7]" />
          </button>
        </div>
        
        <div className="flex items-center space-x-4 text-[#b7bac7]">
          <button className="hover:text-white"><Keyboard className="h-4 w-4" /></button>
          <button className="hover:text-white"><RotateCcw className="h-4 w-4" /></button>
          <button className="hover:text-white"><Settings className="h-4 w-4" /></button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          language={language === "c++" ? "cpp" : language}
          theme="vs-dark"
          value={codes[currentProblemId]}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            tabSize: 4,
          }}
        />
      </div>

      {/* Status bar */}
      <div className="flex h-8 shrink-0 items-center justify-end space-x-4 border-t border-[#2a2c35] bg-[#0f1115] px-4 text-xs text-[#b7bac7]">
        <span className="text-green-500">Autocomplete</span>
        <span>Ln 1, Col 1</span>
        <span>Tab: 4 Spaces</span>
        <span>Visual Studio</span>
      </div>
    </div>
  );
};
