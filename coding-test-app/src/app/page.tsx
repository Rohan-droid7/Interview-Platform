"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTest } from "@/store/TestContext";

export default function SetupWizard() {
  const [step, setStep] = useState(1);
  const [waitTimer, setWaitTimer] = useState(25); // Wait for 25 seconds on step 5
  const [fullName, setFullName] = useState("");
  const [emailInput, setEmailInput] = useState("");
  
  const router = useRouter();
  const { setHasTestStarted, setStartTime } = useTest();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 5 && waitTimer > 0) {
      interval = setInterval(() => {
        setWaitTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, waitTimer]);

  const handleStartTest = () => {
    const now = new Date();
    // Convert to IST string format: YYYY-MM-DD HH:MM IST
    const options: Intl.DateTimeFormatOptions = { 
      timeZone: 'Asia/Kolkata',
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hour12: false 
    };
    const formatter = new Intl.DateTimeFormat('en-IN', options);
    const parts = formatter.formatToParts(now);
    const dateMap = parts.reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {} as Record<string, string>);
    
    const formatted = `${dateMap.year}-${dateMap.month}-${dateMap.day} ${dateMap.hour}:${dateMap.minute} IST`;
    
    setStartTime(formatted);
    setHasTestStarted(true);
    router.push("/problems");
  };

  const stepsList = [
    "Google's Online Challenge Terms and Conditions",
    "Terms and Conditions",
    "System Checks",
    "Add Information",
    "Proctoring and Test Instructions"
  ];

  return (
    <div className="min-h-screen bg-[#0f1115] text-[#f5f5f7] flex flex-col">
      {/* Top Header */}
      <div className="flex h-16 shrink-0 items-center border-b border-[#2a2c35] bg-[#0f1115] px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-[#222329] font-bold text-white mr-4 cursor-pointer" onClick={() => router.push("/problems")}>
          G
        </div>
        <div className="text-sm font-medium text-[#b7bac7] border-l border-[#2a2c35] pl-4">
          GOCC134 - 2026 IN Coding SWE Intern
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 justify-center py-12 px-8 overflow-y-auto">
        <div className="flex w-full max-w-5xl">
          {/* Left Navigation */}
          <div className="w-1/3 pr-12 flex flex-col">
            <h2 className="text-xl font-bold mb-8">Test set up</h2>
            
            <div className="flex flex-col space-y-6 relative">
               {/* Vertical line connecting steps */}
               <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-[#2a2c35] z-0"></div>

               {stepsList.map((stepName, index) => {
                 const stepNumber = index + 1;
                 const isCompleted = step > stepNumber;
                 const isCurrent = step === stepNumber;
                 
                 return (
                   <div key={stepNumber} className="flex items-center space-x-4 relative z-10">
                     <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-colors border", 
                       isCompleted ? "bg-[#33353f] text-[#b7bac7] border-transparent" : 
                       isCurrent ? "bg-blue-600 text-white border-transparent" : "bg-[#0f1115] text-[#b7bac7] border-[#2a2c35]"
                     )}>
                       {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : stepNumber}
                     </div>
                     <div className={cn("text-sm font-medium", (isCompleted || isCurrent) ? "text-white" : "text-[#b7bac7]")}>
                       {stepName}
                     </div>
                   </div>
                 );
               })}
            </div>
          </div>

          {/* Right Content */}
          <div className="w-2/3 pl-12 border-l border-[#2a2c35] flex flex-col h-full max-h-[80vh] overflow-y-auto pr-4" style={{ scrollbarWidth: 'none' }}>
            {step === 1 && (
              <div className="flex flex-col h-full">
                <h1 className="text-xl font-bold mb-6">Google's Online Challenge Terms and Conditions</h1>
                <div className="overflow-y-auto flex-1 pr-4 text-[#b7bac7] text-sm leading-relaxed" style={{ scrollbarWidth: 'none' }}>
                  <p className="mb-4">We take your privacy seriously. Please take a moment to review <span className="underline cursor-pointer text-white">Google's Applicant and Candidate Privacy Policy</span>. Here's how we will process your data and protect your privacy:</p>
                  <ul className="list-disc pl-6 space-y-4 mb-8">
                    <li>Due to the volume of applications received, Google has introduced this Assessment as an early step in our hiring process.</li>
                    <li>If you are hired, we will link your responses to internal surveys you may take as an employee, details from your future performance reviews, and other metrics to understand how your responses are associated with these other indicators, based on Google's legitimate interest in understanding how effective our hiring assessments are. This analysis will not be used to make decisions about you or evaluate your performance as an employee, and we take steps to de-identify and aggregate your personal information where appropriate.</li>
                    <li>Pursuant to any consent you provided via the <span className="underline cursor-pointer text-white">Voluntary Self Identification form</span>, the demographic identity you selected will be connected to your responses on the coding exercise in compliance with applicable law. Demographic data is never used for the purposes of making hiring or other employment related decisions. You can always revoke your consent...</li>
                  </ul>
                </div>
                <div className="flex justify-end items-center mt-6 pt-6 border-t border-[#2a2c35]">
                  <button onClick={() => setStep(2)} className="px-8 py-3 rounded-md bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 transition">Accept & Next</button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col h-full">
                <h1 className="text-xl font-bold mb-6">Terms and Conditions</h1>
                <p className="text-sm text-[#b7bac7] mb-6">I understand that by agreeing to take this test or interview, I will be required to give my consent to the following:</p>
                <div className="overflow-y-auto flex-1 pr-4" style={{ scrollbarWidth: 'none' }}>
                  <ul className="list-disc pl-6 space-y-4 text-sm leading-relaxed text-[#b7bac7] mb-8">
                    <li>I agree to share any personal information that may be required by HackerEarth on behalf of the Company (the organization which is conducting this test/interview) including, but not limited to, the following: first name, last name, e-mail ID, permanent residential address, education qualifications, work experience, age, cookies, browsing and usage data, and any other data that may be required.</li>
                    <li>I understand that HackerEarth does not take any responsibility and is not liable for any damage because of errors, omissions, negligence, or any inaccuracies in the HackerEarth platform.</li>
                    <li>If it is applicable to this test/interview, I may be required to grant access to my webcam and/or microphone. In that case, I give my explicit consent to HackerEarth to take any snapshots, record video, record audio, and capture keystrokes, if required for specific tests/interviews.</li>
                    <li>I understand and agree that all data that is collected by HackerEarth on behalf of the Company will only be used internally for reviews.</li>
                  </ul>
                </div>
                <div className="flex justify-between items-center mt-6 pt-6 border-t border-[#2a2c35]">
                  <button onClick={() => setStep(1)} className="px-6 py-2 rounded-md border border-transparent text-sm font-medium hover:text-white text-[#b7bac7] transition">Back</button>
                  <button onClick={() => setStep(3)} className="px-8 py-3 rounded-md bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 transition">Accept & Next</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col h-full">
                <h1 className="text-xl font-bold mb-4">System Check</h1>
                <p className="text-sm text-[#b7bac7] mb-8">Make sure your device, browser, and webcam meet the requirements before starting the assessment.</p>
                
                <div className="space-y-3 flex-1">
                  {[
                    { label: "Operating system", value: "Windows" },
                    { label: "Browser", value: "Chrome" },
                    { label: "Screen size", value: "1440 x 900 px" },
                    { label: "Cookies", value: "Enabled" },
                    { label: "Firebase", value: "Enabled" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-lg border border-[#2a2c35] bg-[#16171d]">
                      <span className="text-sm font-medium text-[#b7bac7]">{item.label}</span>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-white">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-6 pt-6 border-t border-[#2a2c35]">
                  <button onClick={() => setStep(2)} className="px-6 py-2 rounded-md border border-transparent text-sm font-medium hover:text-white text-[#b7bac7] transition">Back</button>
                  <button onClick={() => setStep(4)} className="px-6 py-2 rounded-md bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 transition">Next</button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="flex flex-col h-full">
                <h1 className="text-xl font-bold mb-4">Add Information</h1>
                <p className="text-sm text-[#b7bac7] mb-8">Provide all the details to identify yourself.</p>
                
                <div className="flex-1">
                  <h3 className="text-base font-semibold mb-4">Personal Information</h3>
                  
                  <div className="flex space-x-6">
                    <div className="flex-1 flex flex-col">
                      <label className="text-xs font-medium text-white mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="px-4 py-2.5 rounded bg-transparent border border-[#33353f] text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                    
                    <div className="flex-1 flex flex-col">
                      <label className="text-xs font-medium text-white mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="email" 
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="px-4 py-2.5 rounded bg-transparent border border-[#33353f] text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6 pt-6">
                  <button onClick={() => setStep(3)} className="px-6 py-2 rounded-md border border-transparent text-sm font-medium hover:text-white text-[#b7bac7] transition">Back</button>
                  <button onClick={() => setStep(5)} className="px-6 py-2 rounded-md bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 transition">Next</button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="flex flex-col h-full">
                <h1 className="text-xl font-bold mb-6">Proctoring & test instructions</h1>
                
                {waitTimer > 0 ? (
                  <div className="mb-8 p-4 rounded-lg border border-orange-500/50 flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-orange-500/80 shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-orange-500/90">
                        You can start the test in 00:{waitTimer < 10 ? `0${waitTimer}` : waitTimer}
                      </span>
                      <span className="text-sm text-orange-500/70">We are still setting up the test environment. Please wait for a moment.</span>
                    </div>
                  </div>
                ) : (
                  <div className="mb-8 p-4 rounded-lg border border-green-500/50 flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500/80 shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-green-500/90">Test environment ready</span>
                      <span className="text-sm text-green-500/70">You can now proceed to start the test.</span>
                    </div>
                  </div>
                )}
                
                <h2 className="text-lg font-bold mb-4">Test instructions</h2>
                <div className="overflow-y-auto flex-1 pr-4" style={{ scrollbarWidth: 'none' }}>
                  <ul className="list-disc pl-6 space-y-3 text-sm leading-relaxed text-[#b7bac7] mb-8">
                    <li>This test contains 2 Programming questions.</li>
                    <li>Total number of questions: 2, Total number of sections: 1, Total score: 40.</li>
                    <li>The duration of this test is 50 mins. Your time will start when you see the questions.</li>
                    <li>Do not use any Online Development Environment, which exposes your code to the public. We take plagiarism seriously and do not entertain activities that are against the spirit of learning and programming. Violations can lead to account suspension or permanent blacklisting from HackerEarth.</li>
                    <li>It is recommended that you attempt the test in an Incognito or private window so that any extensions installed do not interfere with the test environment.</li>
                    <li>Ensure that you are attempting the challenge using your Full Name and Email ID to which you have received GOC invite email.</li>
                    <li>Once the test has started, the timer cannot be paused. You have to complete the test in one attempt.</li>
                    <li>Use a stable internet connection. Tethering via a mobile device is not advised. It is recommended that you ensure that your system meets HackerEarth's compatibility...</li>
                  </ul>
                </div>

                <div className="flex justify-between items-center mt-6 pt-6">
                  <button onClick={() => setStep(4)} className="px-6 py-2 rounded-md border border-transparent text-sm font-medium hover:text-white text-[#b7bac7] transition">Back</button>
                  <button 
                    onClick={handleStartTest}
                    disabled={waitTimer > 0}
                    className={cn(
                      "px-6 py-2 rounded-md text-sm font-medium transition",
                      waitTimer > 0 ? "bg-blue-600/30 text-white/50 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
                    )}
                  >
                    Start test
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
