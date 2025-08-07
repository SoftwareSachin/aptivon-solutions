import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Video, 
  BookOpen, 
  Download,
  ArrowRight,
  Search,
  Calendar,
  Clock,
  Users,
  TrendingUp,
  Shield,
  Cloud,
  Cpu,
  Database
} from "lucide-react";

const WHITEPAPERS_DATA = [
    {
      title: "Digital Transformation Roadmap for Healthcare",
      description: "A comprehensive guide to implementing technology solutions in healthcare organizations while maintaining HIPAA compliance.",
      category: "Healthcare",
      downloadCount: "2.3K",
      pages: "24 pages",
      date: "December 2024"
    },
    {
      title: "Cloud Migration Strategy Guide",
      description: "Best practices for migrating legacy systems to cloud infrastructure with minimal downtime and maximum cost savings.",
      category: "Cloud Computing",
      downloadCount: "3.1K",
      pages: "32 pages",
      date: "November 2024"
    },
    {
      title: "AI Implementation Framework for SMBs",
      description: "Step-by-step framework for small and medium businesses to successfully implement AI and machine learning solutions.",
      category: "Artificial Intelligence",
      downloadCount: "1.8K",
      pages: "28 pages",
      date: "October 2024"
    }
];

const WEBINARS_DATA = [
    {
      title: "Cybersecurity Trends 2025: What Every CTO Should Know",
      description: "Join our cybersecurity experts as they discuss emerging threats and protective strategies for the coming year.",
      speaker: "Sarah Chen, Head of Security",
      duration: "45 minutes",
      attendees: "450+",
      date: "January 15, 2025",
      status: "upcoming"
    },
    {
      title: "Building Scalable E-commerce Platforms",
      description: "Learn how to design and implement e-commerce solutions that can handle millions of transactions.",
      speaker: "Marcus Rodriguez, Lead Architect",
      duration: "60 minutes",
      attendees: "320+",
      date: "December 10, 2024",
      status: "recorded"
    },
    {
      title: "Data Analytics for Business Growth",
      description: "Discover how to leverage data analytics to drive business decisions and accelerate growth.",
      speaker: "Priya Sharma, Data Scientist",
      duration: "50 minutes",
      attendees: "280+",
      date: "November 22, 2024",
      status: "recorded"
    }
  ];

  const caseStudies = [
    {
      title: "250% ROI: Hospital System Digital Transformation",
      industry: "Healthcare",
      metric: "250% ROI",
      description: "How a regional medical center reduced patient wait times by 45% and achieved remarkable ROI.",
      icon: Shield
    },
    {
      title: "E-commerce Platform: 150% Sales Increase",
      industry: "Retail",
      metric: "150% Growth",
      description: "AI-powered recommendation engine drives massive sales growth for national retail chain.",
      icon: TrendingUp
    },
    {
      title: "Smart Factory: 60% Downtime Reduction",
      industry: "Manufacturing",
      metric: "60% Reduction",
      description: "IoT implementation transforms manufacturing efficiency and predictive maintenance.",
      icon: Cpu
    }
  ];

  const tools = [
    {
      title: "Cloud Readiness Assessment",
      description: "Evaluate your organization's readiness for cloud migration with our comprehensive assessment tool.",
      icon: Cloud,
      category: "Assessment Tool"
    },
    {
      title: "ROI Calculator for Digital Transformation",
      description: "Calculate the potential return on investment for your digital transformation initiatives.",
      icon: TrendingUp,
      category: "Calculator"
    },
    {
      title: "Security Audit Checklist",
      description: "Comprehensive checklist to assess your organization's cybersecurity posture.",
      icon: Shield,
      category: "Checklist"
    },
    {
      title: "Database Performance Analyzer",
      description: "Analyze and optimize your database performance with our free diagnostic tool.",
      icon: Database,
      category: "Diagnostic Tool"
    }
];

export default function Resources() {
  return (
    <div className="min-h-screen bg-white pt-80">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Technology Resources & Insights
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Access our comprehensive library of whitepapers, webinars, case studies, 
              and tools to accelerate your digital transformation journey.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input 
                placeholder="Search resources..." 
                className="pl-10 pr-4 py-3 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: FileText, label: "Whitepapers", count: "25+" },
              { icon: Video, label: "Webinars", count: "40+" },
              { icon: BookOpen, label: "Case Studies", count: "50+" },
              { icon: Download, label: "Tools", count: "15+" }
            ].map((category, index) => (
              <div key={index} className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                <category.icon className="h-8 w-8 text-indigo-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">{category.label}</h3>
                <p className="text-gray-600">{category.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Whitepapers Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest Whitepapers
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              In-depth research and insights on the latest technology trends and best practices.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHITEPAPERS_DATA.map((paper: any, index: number) => (
              <div key={index} className="bg-white p-8 rounded-xl border border-slate-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded border">{paper.category}</span>
                  <div className="flex items-center text-sm text-slate-500">
                    <Download className="h-4 w-4 mr-1" />
                    {paper.downloadCount}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{paper.title}</h3>
                <p className="text-slate-600 mb-4">{paper.description}</p>
                
                <div className="flex justify-between items-center text-sm text-slate-500 mb-4">
                  <span>{paper.pages}</span>
                  <span>{paper.date}</span>
                </div>
                <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                  Download PDF
                  <Download className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Webinars Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Expert Webinars
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Learn from our technology experts through live and recorded sessions.
            </p>
          </div>

          <div className="space-y-6">
            {WEBINARS_DATA.map((webinar: any, index: number) => (
              <div key={index} className="bg-white rounded-xl border border-slate-200 shadow-lg">
                <div className="grid md:grid-cols-4 gap-0">
                  <div className="md:col-span-3 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-2 py-1 rounded text-sm ${webinar.status === 'upcoming' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}>
                        {webinar.status === 'upcoming' ? 'Upcoming' : 'Recorded'}
                      </span>
                      <div className="flex items-center text-sm text-slate-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {webinar.date}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{webinar.title}</h3>
                    <p className="text-slate-600 mb-4">{webinar.description}</p>
                    <div className="flex items-center gap-6 text-sm text-slate-500">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {webinar.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {webinar.attendees} attendees
                      </div>
                    </div>
                    <p className="text-sm text-slate-700 mt-2">Speaker: {webinar.speaker}</p>
                  </div>
                  <div className="p-6 bg-slate-50 flex items-center justify-center">
                    <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                      {webinar.status === 'upcoming' ? 'Register Now' : 'Watch Recording'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Real results from real clients across different industries.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                metric: "250% ROI",
                title: "Hospital System Digital Transformation",
                industry: "Healthcare",
                description: "How a regional medical center reduced patient wait times by 45% and achieved remarkable ROI."
              },
              {
                icon: TrendingUp,
                metric: "150% Growth",
                title: "E-commerce Platform: 150% Sales Increase",
                industry: "Retail",
                description: "AI-powered recommendation engine drives massive sales growth for national retail chain."
              },
              {
                icon: Cpu,
                metric: "60% Reduction",
                title: "Smart Factory: 60% Downtime Reduction",
                industry: "Manufacturing",
                description: "IoT implementation transforms manufacturing efficiency and predictive maintenance."
              }
            ].map((study: any, index: number) => (
              <div key={index} className="bg-white p-8 rounded-xl border border-slate-200 hover:shadow-lg transition-shadow cursor-pointer text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <study.icon className="h-8 w-8 text-slate-900" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">{study.metric}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{study.title}</h3>
                <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded border">{study.industry}</span>
                <p className="text-slate-600 text-center mt-4">{study.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              View All Case Studies
            </Button>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Free Tools & Resources
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Practical tools to help you assess, plan, and implement technology solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Cloud Readiness Assessment",
                description: "Evaluate your organization's readiness for cloud migration with our comprehensive assessment tool.",
                icon: Cloud,
                category: "Assessment Tool"
              },
              {
                title: "ROI Calculator for Digital Transformation",
                description: "Calculate the potential return on investment for your digital transformation initiatives.",
                icon: TrendingUp,
                category: "Calculator"
              },
              {
                title: "Security Audit Checklist", 
                description: "Comprehensive checklist to assess your organization's cybersecurity posture.",
                icon: Shield,
                category: "Checklist"
              },
              {
                title: "Database Performance Analyzer",
                description: "Analyze and optimize your database performance with our free diagnostic tool.",
                icon: Database,
                category: "Diagnostic Tool"
              }
            ].map((tool: any, index: number) => (
              <div key={index} className="bg-white p-8 rounded-xl border border-slate-200 hover:shadow-lg transition-shadow cursor-pointer text-center">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <tool.icon className="h-6 w-6 text-slate-900" />
                </div>
                <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded border mb-2 inline-block">{tool.category}</span>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{tool.title}</h3>
                <p className="text-slate-600 text-center mb-4">{tool.description}</p>
                <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                  Access Tool
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Stay Updated with Latest Insights
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest whitepapers, webinars, and technology insights.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <Input 
              placeholder="Enter your email" 
              className="flex-1 bg-white"
            />
            <Button className="bg-white text-slate-900 hover:bg-slate-100">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}