"use client";

import { Calendar, Code, FileText, User, Clock } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const timelineData = [
  {
    id: 1,
    title: "Planning",
    date: "Jan 2024",
    content: "Project planning and requirements gathering phase.",
    category: "Planning",
    icon: Calendar,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Design",
    date: "Feb 2024",
    content: "UI/UX design and system architecture.",
    category: "Design",
    icon: FileText,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 3,
    title: "Development",
    date: "Mar 2024",
    content: "Core features implementation and testing.",
    category: "Development",
    icon: Code,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 60,
  },
  {
    id: 4,
    title: "Testing",
    date: "Apr 2024",
    content: "User testing and bug fixes.",
    category: "Testing",
    icon: User,
    relatedIds: [3, 5],
    status: "pending" as const,
    energy: 30,
  },
  {
    id: 5,
    title: "Release",
    date: "May 2024",
    content: "Final deployment and release.",
    category: "Release",
    icon: Clock,
    relatedIds: [4],
    status: "pending" as const,
    energy: 10,
  },
];

export function RadialOrbitalTimelineDemo() {
  return (
    <>
      <RadialOrbitalTimeline timelineData={timelineData} />
    </>
  );
}

export default function OrbitalTimelineSection() {
  return (
    <section id="orbital-timeline" className="h-screen bg-black relative w-full overflow-hidden">
      {/* Debug header to make sure section is visible */}
      <div className="absolute top-4 left-4 z-50 text-white bg-red-600 px-4 py-2 rounded">
        ORBITAL TIMELINE SECTION
      </div>
      <RadialOrbitalTimelineDemo />
    </section>
  );
}