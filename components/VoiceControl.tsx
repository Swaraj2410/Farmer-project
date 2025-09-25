"use client";

import React, { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Check, X } from "lucide-react";

// Define the structure for a voice command
type VoiceCommand = {
  phrases: string[]; // Phrases that trigger the command
  action: string;      // The action to be executed
};

// Define a prop type for the component, specifying the onCommand function
type VoiceControlProps = {
  onCommand: (action: string) => void;
  commands: VoiceCommand[]; // Allow passing commands as props for flexibility
  language: "en" | "hi" | "mr"; // To support multilingual commands
};

// Language mapping for the SpeechRecognition API
const langCodeMap = {
  en: "en-US",
  hi: "hi-IN",
  mr: "mr-IN",
};

export const VoiceControl: React.FC<VoiceControlProps> = ({ onCommand, commands, language }) => {
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "info" | "success" | "error"; message: string } | null>(null);
  const recognitionRef = useRef<any>(null); // Using 'any' for browser-specific SpeechRecognition

  // Check for browser support once
  const isSpeechRecognitionSupported =
    typeof window !== "undefined" &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

  // Effect to clean up the recognition instance when the component unmounts
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const matchCommand = (transcript: string): string | null => {
    const lowerTranscript = transcript.toLowerCase().trim();
    for (const { phrases, action } of commands) {
      if (phrases.some((phrase) => lowerTranscript.includes(phrase.toLowerCase()))) {
        return action;
      }
    }
    return null;
  };

  const handleToggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      setFeedback({ type: "info", message: "Voice control stopped." });
    } else {
      if (!isSpeechRecognitionSupported) {
        alert("Sorry, your browser doesn't support speech recognition.");
        return;
      }
      
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = langCodeMap[language];
      recognitionRef.current.continuous = false; // Listen for a single command
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setFeedback({ type: "info", message: "Listening..." });
      };

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        const matchedAction = matchCommand(transcript);

        if (matchedAction) {
          setFeedback({ type: "success", message: `Command: "${transcript}" → Action: ${matchedAction}` });
          onCommand(matchedAction);
        } else {
          setFeedback({ type: "error", message: `Command: "${transcript}" → No action found.` });
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        setFeedback({ type: "error", message: `Error: ${event.error}` });
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.start();
    }
  };

  // Determine which icon and color to show based on feedback
  const renderFeedbackIcon = () => {
    if (!feedback) return null;
    switch (feedback.type) {
      case "success":
        return <Check className="h-4 w-4 text-green-500" />;
      case "error":
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000] flex items-center space-x-4 bg-white p-3 rounded-full shadow-lg border border-gray-200">
      {feedback && (
        <div className="flex items-center space-x-2 text-sm text-gray-700">
          {renderFeedbackIcon()}
          <span>{feedback.message}</span>
        </div>
      )}
      <button
        onClick={handleToggleListening}
        className={`flex items-center justify-center h-12 w-12 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-forest-green ${
          isListening ? "bg-red-500 text-white animate-pulse" : "bg-forest-green text-white"
        }`}
        aria-label={isListening ? "Stop listening" : "Start listening"}
      >
        {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
      </button>
    </div>
  );
};