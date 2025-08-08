import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EvervaultCard } from "@/components/ui/evervault-card";
import { useLocation } from "wouter";
import { 
  Brain, 
  Zap, 
  Shield, 
  Rocket, 
  Star, 
  ArrowRight, 
  Sparkles,
  TrendingUp,
  Globe,
  Cpu,
  Database,
  Cloud
} from "lucide-react";

export default function AdvancedCapabilities() {
  const [, setLocation] = useLocation();

  const handleScheduleConsultation = () => {
    setLocation("/contact");
  };

  const handleViewCaseStudies = () => {
    setLocation("/case-studies");
  };

  const capabilities = [
    {
      icon: Brain,
      title: "AI & Machine Learning Excellence",
      description: "Transform your business with intelligent automation, predictive analytics, and cutting-edge AI solutions.",
      features: ["Deep Learning Models", "Natural Language Processing", "Computer Vision", "Predictive Analytics"],
      metrics: { value: "95%", label: "Accuracy Rate" }
    },
    {
      icon: Shield,
      title: "Zero-Trust Security Framework",
      description: "Enterprise-grade security architecture with advanced threat detection and comprehensive compliance.",
      features: ["Zero Trust Architecture", "Advanced Threat Detection", "SOC 2 Compliance", "Penetration Testing"],
      metrics: { value: "99.9%", label: "Uptime SLA" }
    },
    {
      icon: Rocket,
      title: "Cloud-Native Transformation",
      description: "Accelerate your digital journey with modern cloud architectures and DevOps excellence.",
      features: ["Kubernetes Orchestration", "CI/CD Pipelines", "Infrastructure as Code", "Auto-Scaling"],
      metrics: { value: "10x", label: "Faster Deployment" }
    },
    {
      icon: Zap,
      title: "Real-Time Data Intelligence",
      description: "Unlock insights from your data with real-time processing, analytics, and business intelligence.",
      features: ["Real-Time Processing", "Data Warehousing", "Business Intelligence", "ETL Pipelines"],
      metrics: { value: "&lt; 100ms", label: "Response Time" }
    }
  ];

  const stats = [
    { icon: TrendingUp, value: "5+", label: "Projects Delivered", color: "text-blue-600" },
    { icon: Globe, value: "5+", label: "Countries Served", color: "text-green-600" },
    { icon: Cpu, value: "99.9%", label: "System Reliability", color: "text-purple-600" },
    { icon: Database, value: "100 GB", label: "Data Processed", color: "text-orange-600" }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-black dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="font-medium text-sm">ADVANCED CAPABILITIES</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            Innovation at <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Scale</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Cutting-edge technologies and specialized expertise designed to give your business 
            a distinctive competitive advantage in today's digital landscape.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{stat.value}</div>
              <div className="text-slate-600 dark:text-slate-300 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {capabilities.map((capability, index) => (
            <div key={capability.title} className="relative">
              <Card className="bg-white dark:bg-slate-900 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group h-full">
                <CardContent className="p-0 h-full">
                  <div className="h-2 bg-slate-900 dark:bg-slate-100"></div>
                  <div className="p-8 h-full flex flex-col">
                    {/* Evervault Card Background */}
                    <div className="absolute inset-0 opacity-20">
                      <EvervaultCard text={capability.title.split(' ')[0]} />
                    </div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-slate-900 dark:bg-slate-100 rounded-xl flex items-center justify-center">
                            <capability.icon className="w-7 h-7 text-white dark:text-black" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{capability.title}</h3>
                            <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700">
                              {capability.metrics.label}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-slate-900 dark:text-white">
                            {capability.metrics.value}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                        {capability.description}
                      </p>

                      {/* Features */}
                      <div className="grid grid-cols-2 gap-3 mb-6 flex-grow">
                        {capability.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-slate-600 dark:bg-slate-400 rounded-full"></div>
                            <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <Button 
                        variant="ghost" 
                        className="w-full justify-between group-hover:bg-slate-50 dark:group-hover:bg-slate-800 transition-colors mt-auto"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-slate-900 dark:bg-slate-100 rounded-3xl p-12 text-white dark:text-black">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h3>
              <p className="text-slate-300 dark:text-slate-700 mb-8 text-lg">
                Let's discuss how our advanced capabilities can accelerate your digital transformation journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                  onClick={handleScheduleConsultation}
                >
                  Schedule Consultation
                  <Cloud className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  className="bg-slate-800/20 dark:bg-slate-800/20 border border-white dark:border-black text-white dark:text-black hover:bg-white hover:text-slate-900 dark:hover:bg-black dark:hover:text-white backdrop-blur-sm"
                  onClick={handleViewCaseStudies}
                >
                  View Case Studies
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
