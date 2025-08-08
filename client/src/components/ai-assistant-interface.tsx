"use client";

import type React from "react";

import { useState, useRef } from "react";
import {
  Search,
  Mic,
  ArrowUp,
  Plus,
  FileText,
  Code,
  BookOpen,
  PenTool,
  BrainCircuit,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FlickeringGrid } from "./flickering-grid";

export function AIAssistantInterface() {
  const [inputValue, setInputValue] = useState("");
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [deepResearchEnabled, setDeepResearchEnabled] = useState(false);
  const [reasonEnabled, setReasonEnabled] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [showUploadAnimation, setShowUploadAnimation] = useState(false);
  const [activeCommandCategory, setActiveCommandCategory] = useState<
    string | null
  >(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commandSuggestions = {
    learn: [
      "Explain the Big Bang theory",
      "How does photosynthesis work?",
      "What are black holes?",
      "Explain quantum computing",
      "How does the human brain work?",
    ],
    code: [
      "Create a React component for a todo list",
      "Write a Python function to sort a list",
      "How to implement authentication in Next.js",
      "Explain async/await in JavaScript",
      "Create a CSS animation for a button",
    ],
    write: [
      "Write a professional email to a client",
      "Create a product description for a smartphone",
      "Draft a blog post about AI",
      "Write a creative story about space exploration",
      "Create a social media post about sustainability",
    ],
  };

  const handleUploadFile = () => {
    setShowUploadAnimation(true);

    // Simulate file upload with timeout
    setTimeout(() => {
      const newFile = `Document.pdf`;
      setUploadedFiles((prev) => [...prev, newFile]);
      setShowUploadAnimation(false);
    }, 1500);
  };

  const handleCommandSelect = (command: string) => {
    setInputValue(command);
    setActiveCommandCategory(null);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      console.log("Sending message:", inputValue);
      setInputValue("");
    }
  };

  return (
    <section className="py-8 xs:py-10 sm:py-12 md:py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Flickering Grid Background */}
      <div className="absolute inset-0 opacity-40">
        <FlickeringGrid
          squareSize={4}
          gridGap={6}
          flickerChance={0.3}
          color="rgb(59, 130, 246)"
          maxOpacity={0.2}
          className="w-full h-full"
        />
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <div className="absolute top-10 xs:top-16 sm:top-20 right-5 xs:right-10 sm:right-20 w-32 xs:w-48 sm:w-72 h-32 xs:h-48 sm:h-72 bg-blue-500/10 rounded-full blur-2xl xs:blur-3xl"></div>
        <div className="absolute bottom-10 xs:bottom-16 sm:bottom-20 left-5 xs:left-10 sm:left-20 w-40 xs:w-64 sm:w-96 h-40 xs:h-64 sm:h-96 bg-purple-500/10 rounded-full blur-2xl xs:blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 xs:w-48 sm:w-80 h-32 xs:h-48 sm:h-80 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-2xl xs:blur-3xl"></div>
      </div>
      
      <div className="relative max-w-6xl mx-auto px-3 xs:px-4 sm:px-6">
        <div className="text-center mb-6 xs:mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-1.5 xs:gap-2 px-3 xs:px-4 sm:px-6 py-2 xs:py-2.5 sm:py-3 bg-white/80 backdrop-blur-xl rounded-full mb-4 xs:mb-6 sm:mb-8 border border-slate-200/60 shadow-lg">
            <Sparkles className="w-3 xs:w-4 sm:w-5 h-3 xs:h-4 sm:h-5 text-blue-600" />
            <span className="text-xs xs:text-sm font-semibold text-slate-700">
              AI Assistant
            </span>
          </div>
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 xs:mb-4 sm:mb-6 px-2 xs:px-4 sm:px-0 leading-tight">
            <span className="bg-gradient-to-r from-slate-900 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Try Our AI Assistant
            </span>
          </h2>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-slate-600 max-w-xs xs:max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4 xs:px-6 sm:px-4 lg:px-0">
            Experience intelligent assistance with advanced search, deep research, and reasoning capabilities
          </p>
        </div>
        
        {/* Main AI Assistant Card */}
        <div className="w-full max-w-4xl mx-auto px-2 xs:px-4 sm:px-0">
          <div className="bg-white/90 backdrop-blur-xl rounded-xl xs:rounded-2xl sm:rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
            <div className="p-3 xs:p-4 sm:p-6 md:p-8 lg:p-12">
              <div className="flex flex-col items-center">
                {/* Logo with animated gradient */}
                <div className="mb-6 sm:mb-8 lg:mb-10 w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 200 200"
                    width="100%"
                    height="100%"
                    className="w-full h-full"
                  >
                    <g clipPath="url(#cs_clip_1_ellipse-12)">
                      <mask
                        id="cs_mask_1_ellipse-12"
                        style={{ maskType: "alpha" }}
                        width="200"
                        height="200"
                        x="0"
                        y="0"
                        maskUnits="userSpaceOnUse"
                      >
                        <path
                          fill="#fff"
                          fillRule="evenodd"
                          d="M100 150c27.614 0 50-22.386 50-50s-22.386-50-50-50-50 22.386-50 50 22.386 50 50 50zm0 50c55.228 0 100-44.772 100-100S155.228 0 100 0 0 44.772 0 100s44.772 100 100 100z"
                          clipRule="evenodd"
                        ></path>
                      </mask>
                      <g mask="url(#cs_mask_1_ellipse-12)">
                        <path fill="#fff" d="M200 0H0v200h200V0z"></path>
                        <path
                          fill="#0066FF"
                          fillOpacity="0.33"
                          d="M200 0H0v200h200V0z"
                        ></path>
                        <g
                          filter="url(#filter0_f_844_2811)"
                          className="animate-gradient"
                        >
                          <path fill="#0066FF" d="M110 32H18v68h92V32z"></path>
                          <path fill="#0044FF" d="M188-24H15v98h173v-98z"></path>
                          <path fill="#0099FF" d="M175 70H5v156h170V70z"></path>
                          <path fill="#00CCFF" d="M230 51H100v103h130V51z"></path>
                        </g>
                      </g>
                    </g>
                    <defs>
                      <filter
                        id="filter0_f_844_2811"
                        width="385"
                        height="410"
                        x="-75"
                        y="-104"
                        colorInterpolationFilters="sRGB"
                        filterUnits="userSpaceOnUse"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                        <feBlend
                          in="SourceGraphic"
                          in2="BackgroundImageFix"
                          result="shape"
                        ></feBlend>
                        <feGaussianBlur
                          result="effect1_foregroundBlur_844_2811"
                          stdDeviation="40"
                        ></feGaussianBlur>
                      </filter>
                      <clipPath id="cs_clip_1_ellipse-12">
                        <path fill="#fff" d="M0 0H200V200H0z"></path>
                      </clipPath>
                    </defs>
                    <g
                      style={{ mixBlendMode: "overlay" }}
                      mask="url(#cs_mask_1_ellipse-12)"
                    >
                      <path
                        fill="gray"
                        stroke="transparent"
                        d="M200 0H0v200h200V0z"
                        filter="url(#cs_noise_1_ellipse-12)"
                      ></path>
                    </g>
                    <defs>
                      <filter
                        id="cs_noise_1_ellipse-12"
                        width="100%"
                        height="100%"
                        x="0%"
                        y="0%"
                        filterUnits="objectBoundingBox"
                      >
                        <feTurbulence
                          baseFrequency="0.6"
                          numOctaves="5"
                          result="out1"
                          seed="4"
                        ></feTurbulence>
                        <feComposite
                          in="out1"
                          in2="SourceGraphic"
                          operator="in"
                          result="out2"
                        ></feComposite>
                        <feBlend
                          in="SourceGraphic"
                          in2="out2"
                          mode="overlay"
                          result="out3"
                        ></feBlend>
                      </filter>
                    </defs>
                  </svg>
                </div>

                {/* Welcome message */}
                <div className="mb-6 sm:mb-8 lg:mb-10 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center"
                  >
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-400 mb-3 sm:mb-4">
                      Ready to assist you
                    </h3>
                    <p className="text-gray-600 max-w-lg text-base sm:text-lg leading-relaxed px-4 sm:px-0">
                      Ask me anything or try one of the suggestions below
                    </p>
                  </motion.div>
                </div>

                {/* Input area with integrated functions and file upload */}
                <div className="w-full bg-gradient-to-r from-white to-blue-50/30 border border-slate-200/60 rounded-xl sm:rounded-2xl shadow-xl overflow-hidden mb-6 sm:mb-8 hover:shadow-2xl transition-all duration-300">
                  <div className="p-4 sm:p-6">
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Ask me anything..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="w-full text-gray-700 text-base sm:text-lg outline-none placeholder:text-gray-500 bg-transparent font-medium"
                      data-testid="input-ai-assistant"
                    />
                  </div>

                  {/* Uploaded files */}
                  {uploadedFiles.length > 0 && (
                    <div className="px-4 sm:px-6 pb-4">
                      <div className="flex flex-wrap gap-3">
                        {uploadedFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 bg-blue-50 py-2 px-4 rounded-xl border border-blue-200/60 shadow-sm hover:shadow-md transition-all duration-200"
                          >
                            <FileText className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium text-gray-700">{file}</span>
                            <button
                              onClick={() =>
                                setUploadedFiles((prev) =>
                                  prev.filter((_, i) => i !== index)
                                )
                              }
                              className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                              data-testid={`button-remove-file-${index}`}
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
                              >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Search, Deep Research, Reason functions and actions */}
                  <div className="px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0 sm:justify-between bg-slate-50/50">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
                      <button
                        onClick={() => setSearchEnabled(!searchEnabled)}
                        className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                          searchEnabled
                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105"
                            : "bg-white text-gray-600 hover:bg-slate-50 border border-slate-200 shadow-sm hover:shadow-md"
                        }`}
                        data-testid="button-search-toggle"
                      >
                        <Search className="w-4 h-4" />
                        <span>Search</span>
                      </button>
                      <button
                        onClick={() => setDeepResearchEnabled(!deepResearchEnabled)}
                        className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                          deepResearchEnabled
                            ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg transform scale-105"
                            : "bg-white text-gray-600 hover:bg-slate-50 border border-slate-200 shadow-sm hover:shadow-md"
                        }`}
                        data-testid="button-deep-research-toggle"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className={"w-4 h-4"}
                        >
                          <circle
                            cx="8"
                            cy="8"
                            r="7"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <circle cx="8" cy="8" r="3" fill="currentColor" />
                        </svg>
                        <span>Deep Research</span>
                      </button>
                      <button
                        onClick={() => setReasonEnabled(!reasonEnabled)}
                        className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                          reasonEnabled
                            ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg transform scale-105"
                            : "bg-white text-gray-600 hover:bg-slate-50 border border-slate-200 shadow-sm hover:shadow-md"
                        }`}
                        data-testid="button-reason-toggle"
                      >
                        <BrainCircuit className={"w-4 h-4"} />
                        <span>Reason</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 justify-end w-full sm:w-auto">
                      <button className="p-2 sm:p-3 text-gray-500 hover:text-gray-700 hover:bg-white rounded-lg sm:rounded-xl transition-all duration-200 border border-transparent hover:border-slate-200 hover:shadow-sm" data-testid="button-microphone">
                        <Mic className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim()}
                        className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg sm:rounded-xl transition-all duration-200 ${
                          inputValue.trim()
                            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:scale-105"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                        data-testid="button-send-message"
                      >
                        <ArrowUp className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Upload files */}
                  <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-slate-200/60 bg-slate-50/30">
                    <button
                      onClick={handleUploadFile}
                      className="flex items-center gap-2 sm:gap-3 text-gray-700 text-sm hover:text-gray-900 transition-all duration-200 font-medium hover:bg-white px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl"
                      data-testid="button-upload-file"
                    >
                      {showUploadAnimation ? (
                        <motion.div
                          className="flex space-x-1"
                          initial="hidden"
                          animate="visible"
                          variants={{
                            hidden: {},
                            visible: {
                              transition: {
                                staggerChildren: 0.1,
                              },
                            },
                          }}
                        >
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 bg-blue-600 rounded-full"
                              variants={{
                                hidden: { opacity: 0, y: 5 },
                                visible: {
                                  opacity: 1,
                                  y: 0,
                                  transition: {
                                    duration: 0.4,
                                    repeat: Infinity,
                                    repeatType: "mirror",
                                    delay: i * 0.1,
                                  },
                                },
                              }}
                            />
                          ))}
                        </motion.div>
                      ) : (
                        <Plus className="w-5 h-5" />
                      )}
                      <span>Upload Files</span>
                    </button>
                  </div>
                </div>

                {/* Command categories */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
                  <CommandButton
                    icon={<BookOpen className="w-6 h-6" />}
                    label="Learn"
                    isActive={activeCommandCategory === "learn"}
                    onClick={() =>
                      setActiveCommandCategory(
                        activeCommandCategory === "learn" ? null : "learn"
                      )
                    }
                  />
                  <CommandButton
                    icon={<Code className="w-6 h-6" />}
                    label="Code"
                    isActive={activeCommandCategory === "code"}
                    onClick={() =>
                      setActiveCommandCategory(
                        activeCommandCategory === "code" ? null : "code"
                      )
                    }
                  />
                  <CommandButton
                    icon={<PenTool className="w-6 h-6" />}
                    label="Write"
                    isActive={activeCommandCategory === "write"}
                    onClick={() =>
                      setActiveCommandCategory(
                        activeCommandCategory === "write" ? null : "write"
                      )
                    }
                  />
                </div>

                {/* Command suggestions */}
                <AnimatePresence>
                  {activeCommandCategory && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="w-full mb-6 overflow-hidden"
                    >
                      <div className="bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-slate-200/60 shadow-xl overflow-hidden">
                        <div className="p-4 sm:p-6 border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-blue-50/30">
                          <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                            {activeCommandCategory === "learn"
                              ? "Learning suggestions"
                              : activeCommandCategory === "code"
                              ? "Coding suggestions"
                              : "Writing suggestions"}
                          </h3>
                        </div>
                        <ul className="divide-y divide-slate-100">
                          {commandSuggestions[
                            activeCommandCategory as keyof typeof commandSuggestions
                          ].map((suggestion, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: index * 0.03 }}
                              onClick={() => handleCommandSelect(suggestion)}
                              className="p-3 sm:p-4 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/30 cursor-pointer transition-all duration-200 group"
                              data-testid={`suggestion-${activeCommandCategory}-${index}`}
                            >
                              <div className="flex items-center gap-3 sm:gap-4">
                                <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-blue-100 group-hover:bg-blue-200 transition-colors duration-200">
                                  {activeCommandCategory === "learn" ? (
                                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                                  ) : activeCommandCategory === "code" ? (
                                    <Code className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                                  ) : (
                                    <PenTool className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                                  )}
                                </div>
                                <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200 leading-relaxed">
                                  {suggestion}
                                </span>
                              </div>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface CommandButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function CommandButton({ icon, label, isActive, onClick }: CommandButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border transition-all duration-300 ${
        isActive
          ? "bg-gradient-to-br from-blue-50 to-purple-50/30 border-blue-200 shadow-lg transform scale-105"
          : "bg-white/80 backdrop-blur-sm border-slate-200/60 hover:border-slate-300 shadow-md hover:shadow-lg"
      }`}
      data-testid={`button-command-${label.toLowerCase()}`}
    >
      <div className={`p-3 rounded-xl transition-all duration-300 ${
        isActive 
          ? "bg-blue-100 text-blue-600" 
          : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
      }`}>
        {icon}
      </div>
      <span
        className={`text-base font-semibold transition-all duration-300 ${
          isActive ? "text-blue-700" : "text-gray-700"
        }`}
      >
        {label}
      </span>
    </motion.button>
  );
}