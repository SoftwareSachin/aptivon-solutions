"use client";

import DatabaseWithRestApi from "@/components/ui/database-with-rest-api";

export default function DatabaseRestApiSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center justify-center">
          <div className="p-4 rounded-xl bg-accent/20 w-full max-w-[500px]">
            <DatabaseWithRestApi 
              title="Enterprise REST API Architecture"
              circleText="API"
              badgeTexts={{
                first: "GET",
                second: "POST", 
                third: "PUT",
                fourth: "DELETE"
              }}
              buttonTexts={{
                first: "Aptivon",
                second: "v3_enterprise"
              }}
              lightColor="#3b82f6"
            />
          </div>
        </div>
      </div>
    </section>
  );
}