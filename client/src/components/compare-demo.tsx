import React from "react";
import { Compare } from "@/components/ui/compare";
import { ArrowRight, Code, Zap } from "lucide-react";

export function CompareDemo() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full mb-6">
            <Zap className="w-4 h-4" />
            <span className="font-medium text-sm">TRANSFORMATION</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Before vs <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">After</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            See how we transform legacy systems into modern, scalable solutions. Hover over the comparison to see the dramatic difference our expertise makes.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Compare Component */}
          <div className="flex justify-center">
            <div className="p-4 border rounded-3xl bg-neutral-100 border-neutral-200 px-4">
              <Compare
                firstImage="https://assets.aceternity.com/code-problem.png"
                secondImage="https://assets.aceternity.com/code-solution.png"
                firstImageClassName="object-cover object-left-top"
                secondImageClassname="object-cover object-left-top"
                className="h-[250px] w-[200px] md:h-[500px] md:w-[500px]"
                slideMode="hover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Code className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Legacy Systems</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Outdated infrastructure, security vulnerabilities, poor performance, and high maintenance costs holding your business back.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center py-4">
                <ArrowRight className="w-8 h-8 text-slate-400" />
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Modern Solutions</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Cloud-native architecture, enhanced security, optimal performance, and automated workflows that scale with your growth.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <h4 className="text-xl font-bold text-slate-900 mb-6">Transformation Results</h4>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">90%</div>
                  <div className="text-sm text-slate-600">Performance Improvement</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">75%</div>
                  <div className="text-sm text-slate-600">Cost Reduction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">99.9%</div>
                  <div className="text-sm text-slate-600">Uptime Achieved</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                  <div className="text-sm text-slate-600">Monitoring</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}