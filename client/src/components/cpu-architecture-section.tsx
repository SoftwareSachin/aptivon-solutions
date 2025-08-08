"use client";

import { CpuArchitecture } from "@/components/ui/cpu-architecture";

export default function CpuArchitectureSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center justify-center">
          <div className="p-4 rounded-xl bg-accent/20 w-full max-w-[500px]">
            <CpuArchitecture 
              text="AI"
              showCpuConnections={true}
              animateText={true}
              animateLines={true}
              animateMarkers={true}
              lineMarkerSize={18}
              width="100%"
              height="350px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}