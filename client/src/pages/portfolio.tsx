import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import {
  Search,
  Eye,
  Heart,
  Share2,
  Download,
  Phone,
  Filter,
  Calendar,
  Users,
  CheckCircle2,
  Star,
  TrendingUp,
  ExternalLink,
  MapPin,
  Target,
  Briefcase,
  Clock,
  Award,
  Zap,
  ArrowRight,
  Globe,
  Building,
  Cpu,
  Code,
  Layers,
  ShoppingCart,
  DollarSign,
  BarChart3,
  Shield,
  Smartphone,
  Database,
  Cloud,
  MessageSquare,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Github,
  X,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  LoaderIcon,
  Loader2
} from 'lucide-react';

interface PortfolioProject {
  id: number;
  title: string;
  description: string;
  client: string;
  industry: string;
  duration: string;
  budget: string;
  teamSize: number;
  technologies: string[];
  features: string[];
  outcomes: string[];
  slug: string;
  imageUrl: string;
  featured: boolean;
  status: string;
  startDate: string;
  endDate: string;
  likes: number;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export default function Portfolio() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ['/api/portfolio-projects'],
    queryFn: async () => {
      const response = await fetch('/api/portfolio?action=projects&type=portfolio');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      return response.json();
    },
  });

  const likeMutation = useMutation({
    mutationFn: async (projectId: number) => {
      const response = await fetch('/api/portfolio?action=like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId }),
      });
      if (!response.ok) {
        throw new Error('Failed to like project');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/portfolio-projects'] });
      toast({
        title: "Success!",
        description: "Thanks for liking this project!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to like project. Please try again.",
        variant: "destructive",
      });
    },
  });

  const industries = ["All", "E-commerce & Retail", "Healthcare & Life Sciences", "Banking & Finance", "Manufacturing & Industrial", "Media & Entertainment"];

  const filteredProjects = projects.filter((project: PortfolioProject) => {
    const matchesSearch = searchQuery === "" || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesIndustry = selectedIndustry === "All" || project.industry === selectedIndustry;

    return matchesSearch && matchesIndustry;
  });

  const handleViewProject = (slug: string) => {
    setLocation(`/portfolio-project/${slug}`);
  };

  const handleLikeProject = (projectId: number) => {
    likeMutation.mutate(projectId);
  };

  const handleShareProject = (title: string, slug: string) => {
    const url = `${window.location.origin}/portfolio-project/${slug}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied!",
      description: `Portfolio project "${title}" link copied to clipboard.`,
    });
  };

  const handleContactForProject = () => {
    setLocation("/contact");
  };

  const portfolioInquiryMutation = useMutation({
    mutationFn: async (inquiryData: any) => {
      const response = await fetch('/api/portfolio?action=inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiryData),
      });
      if (!response.ok) {
        throw new Error('Failed to submit inquiry');
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Inquiry Submitted!",
        description: "We'll get back to you within 24 hours to discuss your project needs.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit inquiry. Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const handleQuickInquiry = (projectTitle: string) => {
    const inquiryData = {
      name: "Quick Inquiry",
      email: "inquiry@example.com",
      company: "Interested Client",
      projectType: "Similar to " + projectTitle,
      budget: "To be discussed",
      timeline: "To be discussed",
      description: `I'm interested in a project similar to "${projectTitle}". Please contact me to discuss requirements and timeline.`,
      preferredContact: "email"
    };
    
    portfolioInquiryMutation.mutate(inquiryData);
  };

  const handleIndustryFilter = (industry: string) => {
    setSelectedIndustry(industry);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Error Loading Portfolio</h1>
          <p className="text-slate-600 mb-6">We're having trouble loading our portfolio projects. Please try refreshing the page.</p>
          <Button onClick={() => window.location.reload()} className="bg-slate-900 hover:bg-slate-800">
            Refresh Page
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <Navigation />
      {/* Navigation Spacer */}
      <div className="h-32"></div>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our Portfolio
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Explore our comprehensive portfolio showcasing successful projects 
              delivered for leading enterprises across multiple industries.
            </p>
            
            {/* Download Portfolio Button */}
            <div className="mb-8">
              <Button 
                size="lg"
                className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 text-lg font-semibold"
                onClick={() => setLocation("/portfolio-download")}
              >
                <Download className="h-5 w-5 mr-2" />
                Download Complete Portfolio
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 border-slate-300 focus:border-slate-900"
                />
              </div>
              <Button 
                variant="outline"
                onClick={handleContactForProject}
                className="border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                <Phone className="h-4 w-4 mr-2" />
                Discuss Project
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Stats & Metrics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Portfolio Performance</h2>
            <p className="text-lg text-slate-600">Real metrics from our delivered projects</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer group">
              <div className="text-4xl font-bold text-slate-900 mb-2 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 mr-2 text-green-600 group-hover:scale-110 transition-transform" />
                5+
              </div>
              <div className="text-slate-600">Projects Delivered</div>
              <div className="text-xs text-slate-500 mt-1">100% Success Rate</div>
            </div>
            <div className="p-6 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer group">
              <div className="text-4xl font-bold text-slate-900 mb-2 flex items-center justify-center">
                <Users className="h-8 w-8 mr-2 text-blue-600 group-hover:scale-110 transition-transform" />
                3+
              </div>
              <div className="text-slate-600">Enterprise Clients</div>
              <div className="text-xs text-slate-500 mt-1">Across 5 Industries</div>
            </div>
            <div className="p-6 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer group">
              <div className="text-4xl font-bold text-slate-900 mb-2 flex items-center justify-center">
                <Star className="h-8 w-8 mr-2 text-yellow-500 group-hover:scale-110 transition-transform" />
                4.9/5
              </div>
              <div className="text-slate-600">Client Satisfaction</div>
              <div className="text-xs text-slate-500 mt-1">Based on Reviews</div>
            </div>
            <div className="p-6 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer group">
              <div className="text-4xl font-bold text-slate-900 mb-2 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 mr-2 text-green-600 group-hover:scale-110 transition-transform" />
                ₹5Cr+
              </div>
              <div className="text-slate-600">Value Generated</div>
              <div className="text-xs text-slate-500 mt-1">For Our Clients</div>
            </div>
          </div>
          
          {/* Quick Insights */}
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-0">
                <Clock className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900 mb-2">Avg Delivery Time</h3>
                <div className="text-2xl font-bold text-blue-600">3 Months</div>
                <p className="text-sm text-slate-600 mt-1">Faster than industry average</p>
              </CardContent>
            </Card>
            <Card className="p-6 text-center bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-0">
                <Shield className="h-10 w-10 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900 mb-2">Security Rating</h3>
                <div className="text-2xl font-bold text-green-600">A+</div>
                <p className="text-sm text-slate-600 mt-1">SOC 2 compliant</p>
              </CardContent>
            </Card>
            <Card className="p-6 text-center bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-0">
                <Award className="h-10 w-10 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900 mb-2">Client Retention</h3>
                <div className="text-2xl font-bold text-purple-600">100%</div>
                <p className="text-sm text-slate-600 mt-1">All clients come back</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Industry Filter */}
      <section className="py-8 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {industries.map((industry, index) => (
              <Button
                key={index}
                variant={selectedIndustry === industry ? "default" : "outline"}
                className={selectedIndustry === industry ? "bg-slate-900 hover:bg-slate-800 text-white" : "border-slate-300 text-slate-700 hover:bg-slate-50"}
                onClick={() => handleIndustryFilter(industry)}
              >
                <Filter className="h-4 w-4 mr-2" />
                {industry}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-16 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">What Our Clients Say</h2>
            <p className="text-slate-300 text-lg">Real feedback from real partnerships</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                </div>
                <p className="text-slate-200 mb-4 italic">
                  "Aptivon delivered our e-commerce platform ahead of schedule with exceptional quality. The team's expertise in cloud architecture was outstanding."
                </p>
                <div className="border-t border-white/20 pt-4">
                  <div className="font-semibold">Sarah Johnson</div>
                  <div className="text-sm text-slate-300">CTO, TechCorp</div>
                </div>
              </CardContent>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                </div>
                <p className="text-slate-200 mb-4 italic">
                  "The healthcare analytics solution transformed our patient care delivery. ROI was evident within 3 months of deployment."
                </p>
                <div className="border-t border-white/20 pt-4">
                  <div className="font-semibold">Dr. Michael Chen</div>
                  <div className="text-sm text-slate-300">Director, MedHealth Systems</div>
                </div>
              </CardContent>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                </div>
                <p className="text-slate-200 mb-4 italic">
                  "Professional, reliable, and innovative. Their fintech solution helped us scale to 100K+ users seamlessly."
                </p>
                <div className="border-t border-white/20 pt-4">
                  <div className="font-semibold">Alex Rodriguez</div>
                  <div className="text-sm text-slate-300">Founder, FinanceFlow</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Featured Case Studies</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Deep dive into our most impactful projects and the transformative results achieved
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-32 bg-slate-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-slate-200 rounded mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {filteredProjects.map((project: PortfolioProject) => (
                <Card 
                  key={project.id} 
                  className="overflow-hidden bg-white border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-300 cursor-pointer"
                  onClick={() => handleViewProject(project.slug)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                        {project.industry}
                      </Badge>
                      <Badge variant="outline" className="text-xs text-green-700 border-green-300">
                        {project.status}
                      </Badge>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{project.title}</h3>
                    <p className="text-slate-600 mb-4">{project.description}</p>
                    
                    <div className="mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-500" />
                        <span className="text-sm text-slate-600">{project.duration}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-slate-900 mb-2">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.technologies.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="bg-slate-900 hover:bg-slate-800 text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewProject(project.slug);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLikeProject(project.id);
                          }}
                        >
                          <Heart className="h-4 w-4 mr-1" />
                          {project.likes}
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuickInquiry(project.title);
                          }}
                          disabled={portfolioInquiryMutation.isPending}
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Similar Project
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShareProject(project.title, project.slug);
                          }}
                        >
                          <Share2 className="h-4 w-4" />
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
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Next Project?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help bring your vision to life with our proven expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-slate-900 hover:bg-slate-100"
              onClick={() => setLocation("/contact")}
            >
              <Phone className="h-5 w-5 mr-2" />
              Start a Project
            </Button>
            <Button 
              size="lg" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900 px-6 py-3 font-medium"
              style={{ color: 'white', borderColor: 'white' }}
              onClick={() => setLocation("/portfolio-download")}
            >
              <Download className="h-5 w-5 mr-2" style={{ color: 'white' }} />
              Download Portfolio
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}