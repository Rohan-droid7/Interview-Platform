"use client";

import React, { useState } from "react";
import { CheckCircle, Star } from "lucide-react";

export default function SubmittedPage() {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [rating, setRating] = useState(0);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white relative">
      {/* Toast-like sign-in message at top */}
      <div className="absolute top-0 left-0 w-full flex justify-center pt-4">
         <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded shadow-sm text-sm font-medium">
            Successfully signed in
         </div>
      </div>

      <div className="flex flex-col items-center">
        <CheckCircle className="mb-4 h-24 w-24 text-green-500" />
        <h1 className="text-3xl font-bold text-[#1f2937]">
          Your test is submitted successfully
        </h1>
      </div>

      {/* Tiny invisible trigger button */}
      <button 
        onClick={() => setIsFeedbackOpen(true)}
        className="fixed bottom-2 right-2 h-4 w-4 opacity-5 hover:opacity-20 bg-gray-200 rounded-full transition-opacity cursor-pointer z-0"
        aria-label="Open Feedback"
      ></button>

      {/* Feedback Modal */}
      {isFeedbackOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-[400px] rounded-lg bg-white p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Feedback</h2>
            <p className="text-sm text-gray-600 mb-4">How was your test experience?</p>
            
            <div className="flex space-x-2 mb-6 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star} 
                  onClick={() => setRating(star)}
                  className={`p-1 transition-colors ${rating >= star ? "text-yellow-400" : "text-gray-300 hover:text-gray-400"}`}
                >
                  <Star className="h-8 w-8" fill={rating >= star ? "currentColor" : "none"} />
                </button>
              ))}
            </div>

            <textarea 
              className="w-full rounded-md border border-gray-300 p-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] mb-6 resize-none"
              placeholder="Tell us what you think (optional)..."
            ></textarea>

            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setIsFeedbackOpen(false)}
                className="px-4 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsFeedbackOpen(false)}
                className="px-4 py-2 rounded-md bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 transition"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
