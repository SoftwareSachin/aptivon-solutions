import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AdSection from "@/components/ad-section";
import ReferralCommissionAd from "@/components/referral-commission-ad";
import StarProjectSection from "@/components/star-project-section";
import PortfolioAdSection from "@/components/portfolio-ad-section";
import AcademicProjectsAd from "@/components/academic-projects-ad";
import SKITStudentsAd from "@/components/skit-students-ad";
import ServicesSection from "@/components/services-section";
import TechnologySection from "@/components/technology-section";
import IndustriesSection from "@/components/industries-section";
import AdvancedCapabilities from "@/components/advanced-capabilities";
import ApproachSection from "@/components/approach-section";
import TeamSection from "@/components/team-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import { currentAd } from "@/config/ad-config";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Input } from "@/components/ui/input";
import {
  TrendingUp,
  Users,
  Trophy,
  Clock,
  Search,
  Filter,
  ArrowRight,
  Star,
  Calendar,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Play,
  Download,
  ChevronDown,
  Zap,
  Sparkles,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  // Add static content for SEO crawlers at the top of the page
  const seoContent = (
    <div className="sr-only">
      <h2>
        Leading IT Consulting Firm with Cloud Migration, AI/ML Implementation,
        DevOps Automation
      </h2>
      <p>
        Our comprehensive services include cloud infrastructure migration,
        artificial intelligence and machine learning implementation, DevOps
        pipeline automation, custom web and mobile application development,
        cybersecurity solutions, and data analytics. With over 5 successful
        projects delivered and a 98% client satisfaction rate, we have
        consistently delivered enterprise-grade solutions that drive business
        growth and operational efficiency.
      </p>
      <p>
        We follow agile development methodologies with sprint-based development,
        continuous integration, and iterative delivery to ensure rapid
        time-to-market and flexible adaptation to changing requirements. Our
        quality assurance processes include comprehensive testing strategies
        such as unit testing, integration testing, performance testing, and
        security audits to ensure robust, scalable, and secure enterprise
        solutions.
      </p>
      <p>
        Our technology stack excellence leverages modern technologies including
        React for frontend development, Node.js for backend services, Python for
        AI/ML applications, AWS and Azure for cloud infrastructure, Google Cloud
        Platform for scalable solutions, Docker for containerization, Kubernetes
        for orchestration, TensorFlow for machine learning, and PyTorch for deep
        learning applications.
      </p>
    </div>
  );

  const [liveMetrics, setLiveMetrics] = useState({
    activeProjects: 5,
    clientsSatisfied: 3,
    teamMembers: 2,
    completionRate: 98.5,
  });

  // Simulate live metric updates every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics((prev) => ({
        ...prev,
        // Small random fluctuations to simulate real-time data
        activeProjects: Math.max(
          3,
          prev.activeProjects + Math.floor(Math.random() * 3) - 1,
        ),
        clientsSatisfied: prev.clientsSatisfied + (Math.random() > 0.9 ? 1 : 0),
      }));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const [quickActions] = useState([
    {
      title: "Free Consultation",
      description: "Get expert advice for your project",
      icon: Phone,
      action: () => {
        // Try to make actual phone call on mobile, otherwise show contact options
        if (
          navigator.userAgent.match(
            /Android|iPhone|iPad|iPod|BlackBerry|IEMobile/i,
          )
        ) {
          window.location.href = "tel:+917852099010";
        } else {
          // Show contact options for desktop users
          const contactOptions = confirm(
            "Free Consultation Available!\n\n" +
              "Choose your preferred contact method:\n" +
              "• Phone: +91 7852099010 (Click OK)\n" +
              "• Email: singhal3.sachin7@gmail.com (Click Cancel)\n\n" +
              "Available: 9 AM to 6 PM IST, Monday to Saturday",
          );

          if (contactOptions) {
            window.open("tel:+917852099010", "_blank");
          } else {
            window.open(
              "mailto:singhal3.sachin7@gmail.com?subject=Free Consultation Request&body=Hello Aptivon Solutions,%0D%0A%0D%0AI would like to schedule a free consultation to discuss my project requirements.%0D%0A%0D%0APlease contact me at your earliest convenience.%0D%0A%0D%0AThank you!",
              "_blank",
            );
          }
        }
        toast({
          title: "Free Consultation",
          description:
            "Connecting you with our experts for personalized advice",
        });
      },
    },
    {
      title: "Download Portfolio",
      description: "View our complete project portfolio",
      icon: Download,
      action: () => {
        setLocation("/portfolio-download");
      },
    },
    {
      title: "Schedule Meeting",
      description: "Book a meeting with our experts",
      icon: Calendar,
      action: () => {
        window.open(
          `mailto:singhal3.sachin7@gmail.com?subject=Meeting Request&body=I would like to schedule a meeting to discuss my project requirements.`,
          "_blank",
        );
        toast({
          title: "Meeting Request",
          description: "Opening email to schedule your meeting",
        });
      },
    },
  ]);

  const [featuredProjects] = useState([
    {
      title: "E-commerce Platform Modernization",
      client: "Rajasthan Retail Chain",
      duration: "6 months",
      technology: "React, Node.js, PostgreSQL",
      status: "Completed",
      rating: 5,
    },
    {
      title: "Healthcare Management System",
      client: "Jaipur Medical Center",
      duration: "4 months",
      technology: "Angular, .NET, SQL Server",
      status: "In Progress",
      rating: 5,
    },
    {
      title: "Financial Analytics Dashboard",
      client: "Investment Firm India",
      duration: "8 months",
      technology: "Python, React, MongoDB",
      status: "Completed",
      rating: 5,
    },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredProjects = featuredProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      activeFilter === "all" || project.status.toLowerCase() === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* SEO Content for Crawlers */}
      {seoContent}


      <HeroSection />

      {/* Promotional Ad Section */}
      <AdSection {...currentAd} />

      {/* Referral Commission Ad */}
      <ReferralCommissionAd />

      {/* Portfolio Service Ad */}
      <PortfolioAdSection />

      {/* Academic Projects Ad */}
      <AcademicProjectsAd />

      {/* SKIT Students Special Discount Ad */}
      <SKITStudentsAd />

      {/* Star Project Section */}
      <StarProjectSection />

      {/* Enhanced Interactive Dashboard Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full mb-6 border border-slate-200/60">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-slate-700">
                Real-Time Analytics
              </span>
            </div>
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-slate-900 to-blue-600 bg-clip-text text-transparent">
                Live Project Dashboard
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Experience transparency like never before with our comprehensive
              analytics dashboard
            </p>
          </div>

          {/* Enhanced Live Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="group relative overflow-hidden bg-white/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="pb-2 relative z-10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-slate-600">
                    Active Projects
                  </CardTitle>
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  {liveMetrics.activeProjects}
                </div>
                <div className="flex items-center text-emerald-600 text-sm font-medium">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
                  +3 this month
                </div>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden bg-white/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="pb-2 relative z-10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-slate-600">
                    Satisfied Clients
                  </CardTitle>
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-emerald-600" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  {liveMetrics.clientsSatisfied}+
                </div>
                <div className="flex items-center text-emerald-600 text-sm font-medium">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
                  Growing daily
                </div>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden bg-white/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="pb-2 relative z-10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-slate-600">
                    Team Members
                  </CardTitle>
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-purple-600" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  {liveMetrics.teamMembers}
                </div>
                <div className="flex items-center text-purple-600 text-sm font-medium">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></div>
                  Expert professionals
                </div>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden bg-white/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="pb-2 relative z-10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-slate-600">
                    Success Rate
                  </CardTitle>
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Star className="w-4 h-4 text-amber-600" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  {liveMetrics.completionRate}%
                </div>
                <div className="flex items-center text-amber-600 text-sm font-medium">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mr-2 animate-pulse"></div>
                  Industry leading
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Quick Actions Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full mb-6">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">Instant Actions</span>
            </div>
            <h2 className="text-5xl font-bold mb-6">
              <span className="text-slate-900">Quick Actions</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Get started with Aptivon Solutions instantly with our
              comprehensive service offerings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer"
              >
                <div className="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative z-10 text-center pb-4">
                  <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:bg-slate-800">
                    <action.icon className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-900 mb-2">
                    {action.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600 text-lg">
                    {action.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10 text-center">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      action.action();
                    }}
                    className="w-full py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 bg-slate-900 hover:bg-slate-800 text-white"
                  >
                    {action.title}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Interactive Featured Projects */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full mb-6 border border-slate-200/60">
              <Trophy className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-slate-700">
                Success Stories
              </span>
            </div>
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-slate-900 to-emerald-600 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Explore our recent successes and innovative solutions across
              various industries
            </p>
          </div>

          {/* Enhanced Search and Filter Controls */}
          <div className="flex flex-col md:flex-row gap-6 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Search projects by name or client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg bg-white/80 backdrop-blur-sm border-slate-200/60 rounded-xl shadow-lg focus:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div className="flex gap-3">
              <Button
                variant={activeFilter === "all" ? "default" : "outline"}
                onClick={() => setActiveFilter("all")}
                className={`px-6 py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  activeFilter === "all"
                    ? "bg-gradient-to-r from-slate-900 to-slate-800 text-white"
                    : "bg-white/80 backdrop-blur-sm border-slate-200/60 text-slate-700 hover:bg-slate-50"
                }`}
              >
                All ({featuredProjects.length})
              </Button>
              <Button
                variant={activeFilter === "completed" ? "default" : "outline"}
                onClick={() => setActiveFilter("completed")}
                className={`px-6 py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  activeFilter === "completed"
                    ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white"
                    : "bg-white/80 backdrop-blur-sm border-slate-200/60 text-slate-700 hover:bg-slate-50"
                }`}
              >
                Completed (
                {
                  featuredProjects.filter((p) => p.status === "Completed")
                    .length
                }
                )
              </Button>
              <Button
                variant={activeFilter === "in progress" ? "default" : "outline"}
                onClick={() => setActiveFilter("in progress")}
                className={`px-6 py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  activeFilter === "in progress"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                    : "bg-white/80 backdrop-blur-sm border-slate-200/60 text-slate-700 hover:bg-slate-50"
                }`}
              >
                In Progress (
                {
                  featuredProjects.filter((p) => p.status === "In Progress")
                    .length
                }
                )
              </Button>
            </div>
          </div>

          {/* Enhanced Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProjects.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  No Projects Found
                </h3>
                <p className="text-slate-600 mb-6">
                  Try adjusting your search terms or filter options.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setActiveFilter("all");
                  }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              filteredProjects.map((project, index) => (
                <Card
                  key={index}
                  className="group relative overflow-hidden bg-white/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardHeader className="relative z-10">
                    <div className="flex justify-between items-start mb-3">
                      <Badge
                        variant={
                          project.status === "Completed"
                            ? "default"
                            : "secondary"
                        }
                        className={`text-sm px-3 py-1 font-semibold ${
                          project.status === "Completed"
                            ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white"
                            : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                        }`}
                      >
                        {project.status}
                      </Badge>
                      <div className="flex items-center bg-amber-50 px-2 py-1 rounded-lg">
                        {[...Array(project.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-slate-600 font-medium">
                      {project.client}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-slate-50 rounded-lg p-3">
                          <span className="text-slate-500 text-xs uppercase tracking-wide">
                            Duration
                          </span>
                          <div className="font-bold text-slate-900 mt-1">
                            {project.duration}
                          </div>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-3">
                          <span className="text-slate-500 text-xs uppercase tracking-wide">
                            Tech Stack
                          </span>
                          <div className="font-bold text-slate-900 mt-1 text-xs">
                            {project.technology}
                          </div>
                        </div>
                      </div>

                      <Button
                        className="w-full py-3 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Open beautifully styled project details window
                          const newWindow = window.open(
                            "",
                            "_blank",
                            "width=700,height=600,scrollbars=yes,resizable=yes",
                          );
                          if (newWindow) {
                            newWindow.document.write(`
                              <!DOCTYPE html>
                              <html>
                                <head>
                                  <title>Project Details - ${project.title}</title>
                                  <style>
                                    body { 
                                      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                                      padding: 0; margin: 0; 
                                      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                                      min-height: 100vh;
                                      display: flex;
                                      align-items: center;
                                      justify-content: center;
                                    }
                                    .container { 
                                      background: white; 
                                      padding: 40px; 
                                      border-radius: 20px; 
                                      box-shadow: 0 20px 40px rgba(0,0,0,0.3); 
                                      max-width: 600px; 
                                      margin: 20px;
                                      line-height: 1.6;
                                    }
                                    h1 { 
                                      color: #4f46e5; 
                                      margin-bottom: 10px; 
                                      font-size: 28px; 
                                      text-align: center;
                                    }
                                    h2 { 
                                      color: #1e293b; 
                                      margin-bottom: 30px; 
                                      font-size: 22px; 
                                      text-align: center;
                                      border-bottom: 2px solid #e2e8f0;
                                      padding-bottom: 15px;
                                    }
                                    .section { 
                                      margin-bottom: 25px; 
                                      padding: 20px; 
                                      background: #f8fafc; 
                                      border-radius: 12px; 
                                      border-left: 4px solid #4f46e5; 
                                    }
                                    .section h3 { 
                                      color: #1e293b; 
                                      margin-bottom: 15px; 
                                      font-size: 18px; 
                                    }
                                    .highlight { 
                                      color: #059669; 
                                      font-weight: bold; 
                                    }
                                    .info-grid {
                                      display: grid;
                                      grid-template-columns: 1fr 1fr;
                                      gap: 15px;
                                      margin-bottom: 15px;
                                    }
                                    .info-item {
                                      padding: 12px;
                                      background: white;
                                      border-radius: 8px;
                                      border: 1px solid #e2e8f0;
                                    }
                                    .info-label {
                                      font-size: 12px;
                                      color: #64748b;
                                      text-transform: uppercase;
                                      letter-spacing: 0.5px;
                                      margin-bottom: 5px;
                                    }
                                    .info-value {
                                      font-weight: bold;
                                      color: #1e293b;
                                    }
                                    ul { 
                                      padding-left: 20px; 
                                    }
                                    li { 
                                      margin-bottom: 8px; 
                                    }
                                    .contact-section {
                                      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
                                      color: white;
                                      text-align: center;
                                    }
                                    .contact-section h3 {
                                      color: white;
                                    }
                                    .contact-links a {
                                      color: #fbbf24;
                                      text-decoration: none;
                                      font-weight: bold;
                                    }
                                    .contact-links a:hover {
                                      text-decoration: underline;
                                    }
                                    button { 
                                      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                                      color: white; 
                                      border: none; 
                                      padding: 15px 30px; 
                                      border-radius: 10px; 
                                      cursor: pointer; 
                                      font-size: 16px; 
                                      font-weight: bold;
                                      margin: 20px auto 0; 
                                      display: block;
                                      transition: transform 0.2s; 
                                    }
                                    button:hover { 
                                      transform: scale(1.05); 
                                    }
                                    .emoji { 
                                      font-size: 20px; 
                                      margin-right: 10px; 
                                    }
                                  </style>
                                </head>
                                <body>
                                  <div class="container">
                                    <h1>PROJECT SHOWCASE</h1>
                                    <h2>${project.title}</h2>
                                    
                                    <div class="section">
                                      <h3><span class="emoji">📋</span>Project Information</h3>
                                      <div class="info-grid">
                                        <div class="info-item">
                                          <div class="info-label">Client</div>
                                          <div class="info-value">${project.client}</div>
                                        </div>
                                        <div class="info-item">
                                          <div class="info-label">Duration</div>
                                          <div class="info-value">${project.duration}</div>
                                        </div>
                                        <div class="info-item">
                                          <div class="info-label">Status</div>
                                          <div class="info-value highlight">${project.status}</div>
                                        </div>
                                        <div class="info-item">
                                          <div class="info-label">Rating</div>
                                          <div class="info-value">${project.rating}/5 ⭐</div>
                                        </div>
                                      </div>
                                      <div class="info-item">
                                        <div class="info-label">Technology Stack</div>
                                        <div class="info-value">${project.technology}</div>
                                      </div>
                                    </div>
                                    
                                    <div class="section">
                                      <h3><span class="emoji">💼</span>Project Overview</h3>
                                      <p>This project represents our commitment to delivering cutting-edge technology solutions that drive real business value. Our expert team utilized industry-leading technologies and best practices to create a robust, scalable, and user-friendly solution.</p>
                                    </div>
                                    
                                    <div class="section">
                                      <h3>Key Achievements</h3>
                                      <ul>
                                        <li>✅ On-time project delivery with zero delays</li>
                                        <li>✅ Exceeded client expectations and requirements</li>
                                        <li>✅ Scalable architecture for future growth</li>
                                        <li>✅ Enhanced operational efficiency by 40%</li>
                                        <li>✅ Modern technology integration and best practices</li>
                                        <li>✅ Comprehensive testing and quality assurance</li>
                                      </ul>
                                    </div>
                                    
                                    <div class="section contact-section">
                                      <h3><span class="emoji">📞</span>Start Your Next Project!</h3>
                                      <p><strong>Ready for similar results? Contact Aptivon Solutions today:</strong></p>
                                      <div class="contact-links">
                                        <p>📱 <strong>Phone:</strong> <a href="tel:+917852099010">+91 7852099010</a></p>
                                        <p>✉️ <strong>Email:</strong> <a href="mailto:singhal3.sachin7@gmail.com">singhal3.sachin7@gmail.com</a></p>
                                        <p>🕒 <strong>Available:</strong> 9 AM - 6 PM IST (Monday - Saturday)</p>
                                      </div>
                                      <p class="highlight" style="color: #fbbf24; margin-top: 20px; font-size: 18px;">Let's transform your business with innovative technology solutions!</p>
                                    </div>
                                    
                                    <button onclick="window.close()">Close Window</button>
                                  </div>
                                </body>
                              </html>
                            `);
                            newWindow.document.close();
                          }

                          toast({
                            title: "Project Details Opened",
                            description: `Viewing comprehensive details for ${project.title}`,
                          });
                        }}
                      >
                        View Full Details
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      <ServicesSection />
      <TechnologySection />
      <IndustriesSection />
      <AdvancedCapabilities />
      <ApproachSection />
      <TeamSection />

      <div id="contact">
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
}
