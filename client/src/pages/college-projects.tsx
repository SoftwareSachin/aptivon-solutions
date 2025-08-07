import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useState } from "react";
import { 
  ExternalLink, 
  Github, 
  Code, 
  Search,
  Filter,
  Star,
  Eye,
  Heart,
  BookOpen,
  Lightbulb,
  Target,
  Award,
  ImageIcon,
  Calendar,
  Monitor,
  Shield,
  Cloud,
  Zap,
  ChevronRight,
  Play
} from "lucide-react";

// Import Azure project screenshots
import complianceAuditImage from "@assets/compliance-audit_1752170702133.png";
import dashboardOverviewImage from "@assets/dashboard-overview_1752170711656.png";
import networkHealthImage from "@assets/network-health_1752170721168.png";
import networkMonitoringImage from "@assets/network-monitoring_1752170733521.png";
import networkTopologyImage from "@assets/network-topology_1752170742561.png";
import provisionSpokeImage from "@assets/provision-spoke_1752170752568.png";
import securityPoliciesImage from "@assets/security-policies_1752170762246.png";

interface Project {
  id: number;
  title: string;
  slug: string;
  client: string;
  industry: string;
  duration: string;
  team: string;
  description: string;
  image?: string;
  technologies: string[];
  results: string[];
  challenges: string;
  solution: string;
  featured: boolean;
  published: boolean;
  views: number;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

export default function CollegeProjects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterIndustry, setFilterIndustry] = useState("all");
  const [filterTechnology, setFilterTechnology] = useState("all");

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ['/api/portfolio', 'college-projects', 'updated-client'],
    queryFn: async () => {
      const response = await fetch('/api/portfolio?action=projects&type=college');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white ">
        <Navigation />
      {/* Navigation Spacer */}
      <div className="h-20 sm:h-24 lg:h-32"></div>
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-slate-300 border-t-slate-900 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600">Loading college projects...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Show all college projects from static data
  const filteredProjects = projects || [];

  // Get unique industries and technologies for filters (only from Azure project)
  const industries = [...new Set(filteredProjects?.map(p => p.industry) || [])];
  const technologies = [...new Set(filteredProjects?.flatMap(p => p.technologies) || [])];

  return (
    <div className="min-h-screen bg-white ">
      <Navigation />
      {/* Navigation Spacer */}
      <div className="h-20 sm:h-24 lg:h-32"></div>
      
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-600/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Icon with Glow Effect */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-50"></div>
                <div className="relative p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                  <BookOpen className="h-12 w-12 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-12 leading-tight">
              College Projects
            </h1>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-xl shadow-blue-500/25 px-8 py-4 text-lg font-semibold">
                <Target className="mr-3 h-6 w-6" />
                Explore Project
              </Button>
              <Button size="lg" className="bg-white/95 hover:bg-white text-slate-800 hover:text-slate-900 border border-white/50 shadow-xl backdrop-blur-sm px-8 py-4 text-lg font-semibold">
                <Award className="mr-3 h-6 w-6" />
                View Architecture
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Project Overview</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Comprehensive Azure infrastructure automation with enterprise-grade security and monitoring
            </p>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                  <Monitor className="h-6 w-6 text-white" />
                </div>
                <div className="text-sm text-slate-500 font-medium">ACTIVE</div>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                {filteredProjects?.length || 0}
              </div>
              <div className="text-slate-600 font-medium">Azure Project</div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                  <Cloud className="h-6 w-6 text-white" />
                </div>
                <div className="text-sm text-slate-500 font-medium">CLOUD</div>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">
                {industries.length}
              </div>
              <div className="text-slate-600 font-medium">Industry Focus</div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div className="text-sm text-slate-500 font-medium">TECH</div>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                {technologies.length}
              </div>
              <div className="text-slate-600 font-medium">Technologies</div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div className="text-sm text-slate-500 font-medium">SECURE</div>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                {filteredProjects?.filter(p => p.featured).length || 0}
              </div>
              <div className="text-slate-600 font-medium">Featured</div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <div className="flex items-center px-4 py-2 bg-slate-900 text-white rounded-full text-sm font-medium">
              <Play className="h-4 w-4 mr-2" />
              Live Demo Available
            </div>
            <div className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              <Github className="h-4 w-4 mr-2" />
              Source Code
            </div>
            <div className="flex items-center px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
              <Monitor className="h-4 w-4 mr-2" />
              Documentation
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Explore Project Details</h2>
            <p className="text-slate-600">Advanced search and filtering capabilities for comprehensive project analysis</p>
          </div>
          
          {/* Modern Search Interface */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              <div className="flex-1 relative group">
                <Search className="absolute left-4 top-4 h-5 w-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                <Input
                  placeholder="Search Azure infrastructure, monitoring, security, or compliance features..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 text-lg border-2 border-slate-200 focus:border-blue-500 rounded-xl bg-slate-50 focus:bg-white transition-all"
                />
              </div>
              <div className="flex gap-4">
                <Select value={filterIndustry} onValueChange={setFilterIndustry}>
                  <SelectTrigger className="w-56 h-12 border-2 border-slate-200 rounded-xl bg-slate-50 hover:bg-white transition-all">
                    <Filter className="mr-2 h-4 w-4 text-slate-500" />
                    <SelectValue placeholder="Filter by Industry" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2">
                    <SelectItem value="all">All Industries</SelectItem>
                    {industries.map(industry => (
                      <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterTechnology} onValueChange={setFilterTechnology}>
                  <SelectTrigger className="w-56 h-12 border-2 border-slate-200 rounded-xl bg-slate-50 hover:bg-white transition-all">
                    <Code className="mr-2 h-4 w-4 text-slate-500" />
                    <SelectValue placeholder="Filter by Technology" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2">
                    <SelectItem value="all">All Technologies</SelectItem>
                    {technologies.map(tech => (
                      <SelectItem key={tech} value={tech}>{tech}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <div className="p-6 bg-white rounded-lg shadow-sm max-w-md mx-auto">
                <Search className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No projects found</h3>
                <p className="text-slate-600 mb-4">
                  Try adjusting your search terms or filters to find projects.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setFilterIndustry("all");
                    setFilterTechnology("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
              {filteredProjects.map((project, index) => (
                <Card key={`${project.id}-${index}`} className="bg-white hover:shadow-2xl transition-all duration-500 border-2 border-slate-100 hover:border-blue-200 rounded-3xl overflow-hidden">
                  <CardHeader className="pb-6">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                            <Cloud className="h-6 w-6 text-white" />
                          </div>
                          <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                            Azure Enterprise Solution
                          </div>
                        </div>
                        <CardTitle className="text-3xl font-bold text-slate-900 mb-4 leading-tight">
                          {project.title}
                        </CardTitle>
                        <CardDescription className="text-lg text-slate-600 leading-relaxed">
                          {project.description}
                        </CardDescription>
                      </div>
                      {project.featured && (
                        <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 px-4 py-2 text-sm font-medium shadow-lg">
                          <Star className="h-4 w-4 mr-2" />
                          Featured Project
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="px-8 pb-8">
                    <div className="space-y-8">
                      {/* Industry & Status */}
                      <div className="flex items-center justify-between">
                        <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 px-4 py-2 text-sm font-medium">
                          {project.industry}
                        </Badge>
                        <div className="flex items-center space-x-2">
                          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium text-green-600">Production Ready</span>
                        </div>
                      </div>

                      {/* Technologies */}
                      <div>
                        <div className="flex items-center text-lg font-semibold text-slate-900 mb-4">
                          <Code className="h-5 w-5 mr-2" />
                          Technology Stack
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {project.technologies.slice(0, 8).map((tech, index) => (
                            <Badge key={index} variant="outline" className="justify-center py-2 px-4 text-sm font-medium border-2 hover:bg-slate-50 transition-colors">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 8 && (
                            <Badge variant="outline" className="justify-center py-2 px-4 text-sm font-medium border-2 border-dashed">
                              +{project.technologies.length - 8} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Azure Project Screenshots */}
                      {project.title === "Azure Hub-and-Spoke Network Automation Platform" && (
                        <div>
                          <div className="flex items-center text-lg font-semibold text-slate-900 mb-6">
                            <ImageIcon className="h-5 w-5 mr-2" />
                            Live Platform Screenshots
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                            {[
                              { src: dashboardOverviewImage, alt: "Dashboard Overview", title: "Hub & Spoke Overview", desc: "Centralized network management" },
                              { src: networkTopologyImage, alt: "Network Topology", title: "Network Topology", desc: "Visual infrastructure mapping" },
                              { src: networkMonitoringImage, alt: "Network Monitoring", title: "Real-time Monitoring", desc: "Performance analytics" },
                              { src: networkHealthImage, alt: "Network Health", title: "Health Dashboard", desc: "System status monitoring" },
                              { src: complianceAuditImage, alt: "Compliance Audit", title: "Compliance & Audit", desc: "Security compliance reports" },
                              { src: provisionSpokeImage, alt: "Provision Spoke", title: "Spoke Provisioning", desc: "Automated network deployment" },
                              { src: securityPoliciesImage, alt: "Security Policies", title: "Security Policies", desc: "Policy management system" }
                            ].map((screenshot, idx) => (
                              <div key={idx} className="group relative bg-slate-50 rounded-2xl overflow-hidden border-2 border-slate-200 hover:border-blue-300 transition-all duration-300">
                                <img 
                                  src={screenshot.src} 
                                  alt={screenshot.alt} 
                                  className="w-full h-20 sm:h-24 lg:h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                                  title={screenshot.title}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                  <div className="text-sm font-semibold">{screenshot.title}</div>
                                  <div className="text-xs opacity-90">{screenshot.desc}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Key Results */}
                      <div>
                        <div className="flex items-center text-lg font-semibold text-slate-900 mb-4">
                          <Lightbulb className="h-5 w-5 mr-2" />
                          Key Achievements
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {project.results.slice(0, 4).map((result, index) => (
                            <div key={index} className="flex items-start p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                              <div className="p-1 bg-green-500 rounded-full mr-3 mt-1">
                                <div className="h-2 w-2 bg-white rounded-full"></div>
                              </div>
                              <span className="text-slate-700 font-medium">{result}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Engagement Stats */}
                      <div className="flex items-center justify-between pt-6 border-t-2 border-slate-100">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center bg-blue-50 px-4 py-2 rounded-full">
                            <Eye className="h-5 w-5 mr-2 text-blue-600" />
                            <span className="font-semibold text-blue-700">{project.views}</span>
                            <span className="text-blue-600 ml-1">views</span>
                          </div>
                          <div className="flex items-center bg-red-50 px-4 py-2 rounded-full">
                            <Heart className="h-5 w-5 mr-2 text-red-600" />
                            <span className="font-semibold text-red-700">{project.likes}</span>
                            <span className="text-red-600 ml-1">likes</span>
                          </div>
                        </div>
                        <div className="text-sm text-slate-500 font-medium">
                          Updated: July 10, 2025
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4 pt-6">
                        <Button asChild size="lg" className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg">
                          <Link href={`/portfolio-project/${project.slug}`}>
                            <ExternalLink className="h-5 w-5 mr-2" />
                            Explore Project
                            <ChevronRight className="h-4 w-4 ml-2" />
                          </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="border-2 hover:bg-slate-50">
                          <Github className="h-5 w-5 mr-2" />
                          Source Code
                        </Button>
                        <Button size="lg" variant="outline" className="border-2 hover:bg-slate-50">
                          <Play className="h-5 w-5 mr-2" />
                          Live Demo
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-cyan-600/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Main Content */}
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-6">
              Ready to Build the Future?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience enterprise-grade Azure solutions with cutting-edge automation. 
              Join us in revolutionizing cloud infrastructure management.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-xl shadow-blue-500/25 px-8 py-4 text-lg font-semibold">
              <Link href="/contact" className="flex items-center">
                <Target className="mr-3 h-6 w-6" />
                Start Your Project
                <ChevronRight className="ml-3 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" className="bg-white/95 hover:bg-white text-slate-800 hover:text-slate-900 border border-white/50 shadow-xl backdrop-blur-sm px-8 py-4 text-lg font-semibold">
              <Link href="/portfolio" className="flex items-center">
                <Monitor className="mr-3 h-6 w-6" />
                View Full Portfolio
              </Link>
            </Button>
          </div>
          
          {/* Enhanced Powered By Footer */}
          <div className="border-t border-white/20 pt-16">
            <div className="flex flex-col items-center space-y-8">
              {/* Main Branding Card */}
              <div className="relative group">
                {/* Glowing background effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-all duration-500"></div>
                
                <div className="relative inline-flex items-center px-12 py-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
                  <div className="flex items-center space-x-6">
                    {/* Animated Logo */}
                    <div className="relative">
                      <img src="/logo.gif" alt="Aptivon Solutions" className="w-12 h-12" />
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 blur animate-pulse"></div>
                    </div>
                    
                    {/* Brand Text */}
                    <div className="flex flex-col">
                      <span className="text-white/80 text-sm font-medium tracking-[0.2em] uppercase">POWERED BY</span>
                      <span className="text-white font-bold text-3xl bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                        Aptivon Solutions
                      </span>
                    </div>
                    
                    {/* Status Indicator */}
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
                      <span className="text-emerald-300 text-sm font-semibold">LIVE</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-white/70 text-lg max-w-3xl mx-auto text-center leading-relaxed">
                Leading innovation in cloud infrastructure automation and enterprise solutions. 
                <span className="text-blue-300 font-semibold"> Transforming businesses since 2024</span> with cutting-edge Azure technology.
              </p>
              
              {/* Additional Stats */}
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full border border-white/10">
                  <Shield className="w-5 h-5 text-blue-300" />
                  <span className="text-white/80 font-medium">Enterprise Grade Security</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full border border-white/10">
                  <Zap className="w-5 h-5 text-purple-300" />
                  <span className="text-white/80 font-medium">99.9% Uptime Guaranteed</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full border border-white/10">
                  <Award className="w-5 h-5 text-cyan-300" />
                  <span className="text-white/80 font-medium">Award Winning Solutions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}