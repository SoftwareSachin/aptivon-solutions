"use client";

import React from "react";
import { motion } from "motion/react";
import { Folder, HeartHandshakeIcon, SparklesIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatabaseWithRestApiProps {
  className?: string;
  circleText?: string;
  badgeTexts?: {
    first: string;
    second: string;
    third: string;
    fourth: string;
  };
  buttonTexts?: {
    first: string;
    second: string;
  };
  title?: string;
  lightColor?: string;
}

const DatabaseWithRestApi = ({
  className,
  circleText,
  badgeTexts,
  buttonTexts,
  title,
  lightColor,
}: DatabaseWithRestApiProps) => {
  return (
    <div
      className={cn(
        "relative flex h-[280px] xs:h-[300px] sm:h-[330px] md:h-[360px] lg:h-[400px] w-full max-w-[260px] xs:max-w-[300px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[500px] flex-col items-center mx-auto",
        className
      )}
    >
      {/* SVG Paths  */}
      <svg
        className="h-full w-full text-muted"
        width="100%"
        height="100%"
        viewBox="0 0 200 100"
        preserveAspectRatio="xMidYMid meet"
        style={{ minWidth: '260px' }}
      >
        <g
          stroke="currentColor"
          fill="none"
          strokeWidth="0.4"
          strokeDasharray="100 100"
          pathLength="100"
        >
          <path d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10" />
          <path d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10" />
          <path d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10" />
          <path d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10" />
          {/* Animation For Path Starting */}
          <animate
            attributeName="stroke-dashoffset"
            from="100"
            to="0"
            dur="1s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.25,0.1,0.5,1"
            keyTimes="0; 1"
          />
        </g>
        {/* Blue Lights */}
        <g mask="url(#db-mask-1)">
          <circle
            className="database db-light-1"
            cx="0"
            cy="0"
            r="12"
            fill="url(#db-blue-grad)"
          />
        </g>
        <g mask="url(#db-mask-2)">
          <circle
            className="database db-light-2"
            cx="0"
            cy="0"
            r="12"
            fill="url(#db-blue-grad)"
          />
        </g>
        <g mask="url(#db-mask-3)">
          <circle
            className="database db-light-3"
            cx="0"
            cy="0"
            r="12"
            fill="url(#db-blue-grad)"
          />
        </g>
        <g mask="url(#db-mask-4)">
          <circle
            className="database db-light-4"
            cx="0"
            cy="0"
            r="12"
            fill="url(#db-blue-grad)"
          />
        </g>
        {/* Buttons */}
        <g stroke="currentColor" fill="none" strokeWidth="0.4">
          {/* First Button - GET */}
          <g className="api-method-button">
            <rect
              fill="#059669"
              x="14"
              y="5"
              width="30"
              height="8"
              rx="4"
              className="button-bg"
            ></rect>
            <text
              x="29"
              y="10.5"
              fill="white"
              stroke="none"
              fontSize="4"
              fontWeight="600"
              textAnchor="middle"
              className="method-text"
            >
              GET
            </text>
          </g>
          {/* Second Button - POST */}
          <g className="api-method-button">
            <rect
              fill="#DC2626"
              x="50"
              y="5"
              width="32"
              height="8"
              rx="4"
              className="button-bg"
            ></rect>
            <text
              x="66"
              y="10.5"
              fill="white"
              stroke="none"
              fontSize="4"
              fontWeight="600"
              textAnchor="middle"
              className="method-text"
            >
              POST
            </text>
          </g>
          {/* Third Button - PUT */}
          <g className="api-method-button">
            <rect
              fill="#EA580C"
              x="88"
              y="5"
              width="28"
              height="8"
              rx="4"
              className="button-bg"
            ></rect>
            <text
              x="102"
              y="10.5"
              fill="white"
              stroke="none"
              fontSize="4"
              fontWeight="600"
              textAnchor="middle"
              className="method-text"
            >
              PUT
            </text>
          </g>
          {/* Fourth Button - DELETE */}
          <g className="api-method-button">
            <rect
              fill="#B91C1C"
              x="122"
              y="5"
              width="36"
              height="8"
              rx="4"
              className="button-bg"
            ></rect>
            <text
              x="140"
              y="10.5"
              fill="white"
              stroke="none"
              fontSize="4"
              fontWeight="600"
              textAnchor="middle"
              className="method-text"
            >
              DELETE
            </text>
          </g>
        </g>
        <defs>
          {/* 1 -  user list */}
          <mask id="db-mask-1">
            <path
              d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          {/* 2 - task list */}
          <mask id="db-mask-2">
            <path
              d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          {/* 3 - backlogs */}
          <mask id="db-mask-3">
            <path
              d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          {/* 4 - misc */}
          <mask id="db-mask-4">
            <path
              d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          {/* Blue Grad */}
          <radialGradient id="db-blue-grad" fx="1">
            <stop offset="0%" stopColor={lightColor || "#00A6F5"} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>
      {/* Main Box */}
      <div className="absolute bottom-6 xs:bottom-8 sm:bottom-10 flex w-full flex-col items-center">
        {/* bottom shadow */}
        <div className="absolute -bottom-3 xs:-bottom-4 h-[80px] xs:h-[90px] sm:h-[100px] w-[70%] xs:w-[65%] sm:w-[62%] rounded-lg bg-accent/30" />
        {/* box title */}
        <div className="absolute -top-2 xs:-top-3 sm:-top-4 z-20 flex items-center justify-center rounded-lg border bg-[#101112] px-2 xs:px-3 py-1.5 xs:py-2">
          <SparklesIcon className="size-3 xs:size-4 text-white" />
          <span className="ml-1 xs:ml-2 text-xs xs:text-sm font-semibold text-white truncate max-w-[200px] xs:max-w-[250px] sm:max-w-none">
            {title ? title : "Enterprise REST API Architecture"}
          </span>
        </div>
        {/* box outter circle */}
        <div className="absolute -bottom-6 xs:-bottom-7 sm:-bottom-8 z-30 grid h-[50px] xs:h-[55px] sm:h-[60px] w-[50px] xs:w-[55px] sm:w-[60px] place-items-center rounded-full border-t bg-[#141516] font-bold text-sm xs:text-base sm:text-lg text-white">
          <span className="truncate px-1">
            {circleText ? circleText : "API"}
          </span>
        </div>
        {/* box content */}
        <div className="relative z-10 flex h-[120px] xs:h-[135px] sm:h-[150px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background shadow-md">
          {/* Badges */}
          <div className="absolute bottom-4 xs:bottom-6 sm:bottom-8 left-4 xs:left-8 sm:left-12 z-10 h-6 xs:h-7 sm:h-8 rounded-full bg-[#101112] px-2 xs:px-3 sm:px-4 text-xs xs:text-sm border flex items-center gap-1 xs:gap-2 max-w-[120px] xs:max-w-[140px] sm:max-w-none">
            <HeartHandshakeIcon className="size-3 xs:size-4 text-blue-400 flex-shrink-0" />
            <span className="text-white font-medium truncate">{buttonTexts?.first || "Aptivon"}</span>
          </div>
          <div className="absolute right-4 xs:right-8 sm:right-16 bottom-4 xs:bottom-6 sm:bottom-8 z-10 hidden xs:flex h-6 xs:h-7 sm:h-8 rounded-full bg-[#101112] px-2 xs:px-3 sm:px-4 text-xs xs:text-sm border items-center gap-1 xs:gap-2 max-w-[120px] xs:max-w-[140px] sm:max-w-none">
            <Folder className="size-3 xs:size-4 text-green-400 flex-shrink-0" />
            <span className="text-white font-medium truncate">{buttonTexts?.second || "v3_enterprise"}</span>
          </div>
          {/* Circles - Responsive Animation */}
          <motion.div
            className="absolute -bottom-10 xs:-bottom-12 sm:-bottom-14 h-[70px] xs:h-[85px] sm:h-[100px] w-[70px] xs:w-[85px] sm:w-[100px] rounded-full border-t bg-accent/5"
            animate={{
              scale: [0.98, 1.02, 0.98, 1, 1, 1, 1, 1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-14 xs:-bottom-16 sm:-bottom-20 h-[100px] xs:h-[120px] sm:h-[145px] w-[100px] xs:w-[120px] sm:w-[145px] rounded-full border-t bg-accent/5"
            animate={{
              scale: [1, 1, 1, 0.98, 1.02, 0.98, 1, 1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-[70px] xs:-bottom-[85px] sm:-bottom-[100px] h-[130px] xs:h-[160px] sm:h-[190px] w-[130px] xs:w-[160px] sm:w-[190px] rounded-full border-t bg-accent/5"
            animate={{
              scale: [1, 1, 1, 1, 1, 0.98, 1.02, 0.98, 1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-[90px] xs:-bottom-[105px] sm:-bottom-[120px] h-[160px] xs:h-[195px] sm:h-[235px] w-[160px] xs:w-[195px] sm:w-[235px] rounded-full border-t bg-accent/5"
            animate={{
              scale: [1, 1, 1, 1, 1, 1, 0.98, 1.02, 0.98, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  );
};

export default DatabaseWithRestApi;

const DatabaseIcon = ({ x = "0", y = "0" }: { x: string; y: string }) => {
  return (
    <svg
      x={x}
      y={y}
      xmlns="http://www.w3.org/2000/svg"
      width="5"
      height="5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
};