import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Building2, 
  Stethoscope, 
  GraduationCap, 
  ShoppingCart, 
  Banknote, 
  Factory,
  Truck,
  Gamepad2,
  ArrowRight,
  TrendingUp,
  Users,
  Shield,
  Search,
  Filter,
  Calendar,
  MessageSquare,
  Phone,
  Mail,
  X,
  Globe,
  Award,
  BarChart3,
  Clock,
  CheckCircle,
  Star,
  Target,
  Zap,
  ChevronRight,
  Download,
  Eye,
  Heart,
  Share2,
  Lightbulb,
  PieChart,
  Activity,
  Database,
  CloudSnow,
  Cpu,
  Smartphone,
  Wifi,
  Lock,
  Briefcase,
  FileText,
  Video,
  Headphones,
  MapPin,
  Coffee,
  Bookmark,
  ThumbsUp,
  MessageCircle,
  TrendingDown,
  AlertTriangle,
  Info,
  Bell,
  Settings,
  ExternalLink
} from "lucide-react";

const INDUSTRIES_DATA = [
    {
      icon: Stethoscope,
      title: "Healthcare & Life Sciences",
      description: "HIPAA-compliant solutions for hospitals, clinics, and pharmaceutical companies.",
      challenges: ["Patient data security", "Regulatory compliance", "System integration", "Telemedicine platforms"],
      solutions: ["Electronic Health Records", "Patient Management Systems", "Telehealth Applications", "Medical Device Integration"],
      caseStudy: "Reduced patient wait times by 45% for a 500-bed hospital system"
    },
    {
      icon: Banknote,
      title: "Financial Services",
      description: "Secure, scalable fintech solutions for banks, credit unions, and investment firms.",
      challenges: ["Regulatory compliance", "Fraud detection", "Real-time processing", "Customer experience"],
      solutions: ["Core Banking Systems", "Payment Processing", "Risk Management", "Mobile Banking Apps"],
      caseStudy: "Increased transaction processing speed by 300% for regional bank"
    },
    {
      icon: ShoppingCart,
      title: "Retail & E-commerce",
      description: "Omnichannel retail solutions that enhance customer experience and drive sales.",
      challenges: ["Inventory management", "Customer personalization", "Multi-channel integration", "Supply chain optimization"],
      solutions: ["E-commerce Platforms", "POS Systems", "Inventory Management", "Customer Analytics"],
      caseStudy: "Boosted online sales by 150% with AI-powered recommendation engine"
    },
    {
      icon: Factory,
      title: "Manufacturing",
      description: "Industry 4.0 solutions for smart manufacturing and operational excellence.",
      challenges: ["Production optimization", "Quality control", "Supply chain visibility", "Equipment monitoring"],
      solutions: ["MES Systems", "IoT Sensors", "Predictive Maintenance", "Quality Management"],
      caseStudy: "Reduced production downtime by 60% through predictive analytics"
    },
    {
      icon: GraduationCap,
      title: "Education",
      description: "Digital learning platforms and administrative systems for educational institutions.",
      challenges: ["Remote learning", "Student engagement", "Administrative efficiency", "Data security"],
      solutions: ["Learning Management Systems", "Student Information Systems", "Virtual Classrooms", "Assessment Tools"],
      caseStudy: "Improved student engagement by 80% with interactive learning platform"
    },
    {
      icon: Truck,
      title: "Logistics & Transportation",
      description: "Supply chain optimization and fleet management solutions for logistics companies.",
      challenges: ["Route optimization", "Fleet tracking", "Inventory visibility", "Cost management"],
      solutions: ["Fleet Management Systems", "Route Optimization", "Warehouse Management", "Supply Chain Analytics"],
      caseStudy: "Reduced delivery costs by 35% through route optimization algorithms"
    },
    {
      icon: Building2,
      title: "Real Estate",
      description: "Property management and real estate technology solutions for modern markets.",
      challenges: ["Property management", "Market analysis", "Customer acquisition", "Document management"],
      solutions: ["Property Management Systems", "CRM Platforms", "Market Analytics", "Virtual Tours"],
      caseStudy: "Increased property sales by 120% with virtual reality showcasing"
    },
    {
      icon: Gamepad2,
      title: "Entertainment & Media",
      description: "Content management and distribution platforms for media and entertainment companies.",
      challenges: ["Content delivery", "Audience engagement", "Rights management", "Monetization"],
      solutions: ["Content Management Systems", "Streaming Platforms", "Analytics Dashboards", "Digital Rights Management"],
      caseStudy: "Scaled video streaming to 1M+ concurrent users with 99.9% uptime"
    }
];

const STATS_DATA = [
    { icon: Users, value: "5+", label: "Enterprise Clients", growth: "+15%" },
    { icon: TrendingUp, value: "95%", label: "Project Success Rate", growth: "+5%" },
    { icon: Shield, value: "100%", label: "Security Compliance", growth: "100%" },
    { icon: Building2, value: "15+", label: "Industries Served", growth: "+3%" }
];

const INDUSTRY_TESTIMONIALS = [
    {
      client: "Sarah Johnson",
      position: "CTO, HealthTech Solutions",
      industry: "Healthcare",
      testimonial: "Aptivon transformed our patient management system with HIPAA-compliant solutions that improved efficiency by 45%.",
      rating: 5,
      projectValue: "$150k",
      timeline: "3 months"
    },
    {
      client: "Michael Chen",
      position: "VP Operations, ManuTech Corp",
      industry: "Manufacturing",
      testimonial: "Their IoT implementation reduced our downtime by 60% and increased productivity across all production lines.",
      rating: 5,
      projectValue: "$200k",
      timeline: "4 months"
    },
    {
      client: "Jessica Rodriguez",
      position: "Head of Digital, RetailMax",
      industry: "Retail",
      testimonial: "The e-commerce platform they built increased our online sales by 150% with seamless inventory management.",
      rating: 5,
      projectValue: "$120k",
      timeline: "2 months"
    }
];

const INDUSTRY_ANALYTICS = {
  "Healthcare & Life Sciences": {
    projects: 12,
    avgROI: "285%",
    satisfactionScore: 4.8,
    technologies: ["React", "Node.js", "HIPAA", "AWS"],
    compliance: ["HIPAA", "HITECH", "FDA"],
    successMetrics: {
      "Patient Wait Time": { value: 45, unit: "% reduction" },
      "System Uptime": { value: 99.9, unit: "%" },
      "Data Security": { value: 100, unit: "% compliance" }
    }
  },
  "Financial Services": {
    projects: 8,
    avgROI: "320%",
    satisfactionScore: 4.9,
    technologies: ["Java", "Spring", "PostgreSQL", "AWS"],
    compliance: ["SOX", "PCI-DSS", "GDPR"],
    successMetrics: {
      "Transaction Speed": { value: 300, unit: "% faster" },
      "Fraud Detection": { value: 95, unit: "% accuracy" },
      "Cost Reduction": { value: 25, unit: "%" }
    }
  },
  "Retail & E-commerce": {
    projects: 15,
    avgROI: "245%",
    satisfactionScore: 4.7,
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    compliance: ["PCI-DSS", "GDPR", "CCPA"],
    successMetrics: {
      "Sales Growth": { value: 150, unit: "% increase" },
      "Page Load Time": { value: 40, unit: "% faster" },
      "Customer Retention": { value: 35, unit: "% increase" }
    }
  },
  "Manufacturing": {
    projects: 10,
    avgROI: "412%",
    satisfactionScore: 4.9,
    technologies: ["Python", "IoT", "Machine Learning", "AWS"],
    compliance: ["ISO 27001", "SOC 2", "GDPR"],
    successMetrics: {
      "Downtime Reduction": { value: 60, unit: "%" },
      "Production Efficiency": { value: 35, unit: "% increase" },
      "Quality Control": { value: 25, unit: "% better" }
    }
  },
  "Education": {
    projects: 6,
    avgROI: "180%",
    satisfactionScore: 4.6,
    technologies: ["React", "Node.js", "PostgreSQL", "Zoom API"],
    compliance: ["FERPA", "COPPA", "GDPR"],
    successMetrics: {
      "Student Engagement": { value: 80, unit: "% increase" },
      "Admin Efficiency": { value: 50, unit: "% improvement" },
      "Learning Outcomes": { value: 25, unit: "% better" }
    }
  }
};

export default function Industries() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedIndustry, setSelectedIndustry] = useState<any>(null);
  const [consultationForm, setConsultationForm] = useState({
    firstName: "",
    lastName: "", 
    email: "",
    company: "",
    industry: "",
    phone: "",
    message: ""
  });
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [selectedAnalyticsIndustry, setSelectedAnalyticsIndustry] = useState<string>("");
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [likedIndustries, setLikedIndustries] = useState<string[]>([]);
  const [bookmarkedIndustries, setBookmarkedIndustries] = useState<string[]>([]);
  
  const { toast } = useToast();

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % INDUSTRY_TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  const categories = ["All", "Technology", "Traditional", "Service"];
  
  const getIndustryCategory = (industry: any) => {
    const techIndustries = ["Entertainment & Media"];
    const serviceIndustries = ["Healthcare & Life Sciences", "Financial Services", "Education"];
    if (techIndustries.includes(industry.title)) return "Technology";
    if (serviceIndustries.includes(industry.title)) return "Service";
    return "Traditional";
  };
  
  const filteredIndustries = INDUSTRIES_DATA.filter(industry => {
    const matchesSearch = industry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         industry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         industry.challenges.some(c => c.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         industry.solutions.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || getIndustryCategory(industry) === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const consultationMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/business?action=consultation-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || result.error || 'Failed to submit consultation request');
      }
      
      return result;
    },
    onSuccess: () => {
      toast({
        title: "Consultation Request Sent!",
        description: "Our industry experts will contact you within 24 hours to discuss your specific needs.",
      });
      setConsultationForm({
        firstName: "", lastName: "", email: "", company: "", industry: "", phone: "", message: ""
      });
      setShowConsultationForm(false);
    },
    onError: (error: any) => {
      console.error('Consultation submission error:', error);
      const errorMessage = error?.message || "Failed to send consultation request. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    }
  });

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields before submission
    if (!consultationForm.firstName.trim()) {
      toast({
        title: "Missing Information",
        description: "First name is required.",
        variant: "destructive",
      });
      return;
    }
    
    if (!consultationForm.lastName.trim()) {
      toast({
        title: "Missing Information", 
        description: "Last name is required.",
        variant: "destructive",
      });
      return;
    }
    
    if (!consultationForm.email.trim()) {
      toast({
        title: "Missing Information",
        description: "Email address is required.",
        variant: "destructive",
      });
      return;
    }
    
    if (!consultationForm.message.trim()) {
      toast({
        title: "Missing Information",
        description: "Message is required.",
        variant: "destructive",
      });
      return;
    }

    const submissionData = {
      firstName: consultationForm.firstName.trim(),
      lastName: consultationForm.lastName.trim(),
      email: consultationForm.email.trim(),
      company: consultationForm.company.trim(),
      industry: selectedIndustry?.title || consultationForm.industry.trim(),
      phone: consultationForm.phone.trim(),
      message: consultationForm.message.trim()
    };

    console.log('Submitting consultation data:', submissionData);
    consultationMutation.mutate(submissionData);
  };

  const handleLikeIndustry = (industryTitle: string) => {
    setLikedIndustries(prev => 
      prev.includes(industryTitle) 
        ? prev.filter(title => title !== industryTitle)
        : [...prev, industryTitle]
    );
    toast({
      title: likedIndustries.includes(industryTitle) ? "Removed from favorites" : "Added to favorites",
      description: `${industryTitle} has been ${likedIndustries.includes(industryTitle) ? 'removed from' : 'added to'} your favorites.`,
    });
  };

  const handleBookmarkIndustry = (industryTitle: string) => {
    setBookmarkedIndustries(prev => 
      prev.includes(industryTitle) 
        ? prev.filter(title => title !== industryTitle)
        : [...prev, industryTitle]
    );
    toast({
      title: bookmarkedIndustries.includes(industryTitle) ? "Bookmark removed" : "Bookmarked",
      description: `${industryTitle} has been ${bookmarkedIndustries.includes(industryTitle) ? 'removed from' : 'added to'} your bookmarks.`,
    });
  };

  const handleShareIndustry = (industryTitle: string) => {
    const url = `${window.location.origin}/industries#${industryTitle.toLowerCase().replace(/\s+/g, '-')}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied!",
      description: `Industry "${industryTitle}" link copied to clipboard.`,
    });
  };

  const handleViewAnalytics = (industryTitle: string) => {
    setSelectedAnalyticsIndustry(industryTitle);
    setShowAnalytics(true);
  };

  return (
    <div className="min-h-screen bg-white ">
      <Navigation />
      {/* Navigation Spacer */}
      <div className="h-32"></div>
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Technology Solutions for Every Industry
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-8">
              We understand the unique challenges of your industry and deliver tailored 
              technology solutions that drive measurable business outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-slate-900 hover:bg-slate-800 text-white"
                onClick={() => document.getElementById('industries-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Your Industry
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setShowConsultationForm(true)}
              >
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS_DATA.map((stat: any, index: number) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-slate-900 transition-colors">
                  <stat.icon className="h-8 w-8 text-slate-900 group-hover:text-white transition-colors" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1 flex items-center justify-center gap-2">
                  {stat.value}
                  <span className="text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                    {stat.growth}
                  </span>
                </div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What Our Industry Clients Say
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Real feedback from industry leaders who've transformed their operations with our solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {INDUSTRY_TESTIMONIALS.map((testimonial, index) => (
              <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    "{testimonial.testimonial}"
                  </p>
                  <div className="border-t pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-slate-900">{testimonial.client}</h4>
                        <p className="text-sm text-slate-600">{testimonial.position}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {testimonial.industry}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-center text-sm text-slate-500">
                      <span>Timeline: {testimonial.timeline}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search industries, solutions, challenges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="text-sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          <div className="mt-4 text-sm text-slate-600">
            Showing {filteredIndustries.length} of {INDUSTRIES_DATA.length} industries
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section id="industries-section" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Industries We Serve
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Our deep industry expertise enables us to deliver solutions that address 
              specific challenges and drive innovation across diverse sectors.
            </p>
          </div>

          {filteredIndustries.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 mb-4">No industries found matching your criteria.</p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredIndustries.map((industry: any, index: number) => (
                <div key={index} className="bg-white rounded-xl border border-slate-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
                  {/* Industry Header */}
                  <div className="p-8 pb-6">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                        <industry.icon className="h-6 w-6 text-slate-900" />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleLikeIndustry(industry.title)}
                          className="p-2 h-8 w-8"
                        >
                          <Heart className={`h-4 w-4 ${likedIndustries.includes(industry.title) ? 'fill-current text-red-500' : ''}`} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleBookmarkIndustry(industry.title)}
                          className="p-2 h-8 w-8"
                        >
                          <Bookmark className={`h-4 w-4 ${bookmarkedIndustries.includes(industry.title) ? 'fill-current text-blue-500' : ''}`} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleShareIndustry(industry.title)}
                          className="p-2 h-8 w-8"
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{industry.title}</h3>
                    <p className="text-slate-600 mb-6">{industry.description}</p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Key Challenges:</h4>
                        <div className="flex flex-wrap gap-1">
                          {industry.challenges.map((challenge: string, idx: number) => (
                            <span key={idx} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded border">
                              {challenge}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Our Solutions:</h4>
                        <ul className="space-y-1">
                          {industry.solutions.map((solution: string, idx: number) => (
                            <li key={idx} className="text-sm text-slate-600 flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              {solution}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-lg border-l-4 border-slate-900">
                        <p className="text-sm text-slate-700 font-medium">
                          Success Story: {industry.caseStudy}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="px-8 pb-8 pt-4 border-t bg-slate-50">
                    <div className="flex gap-3">
                      <Button 
                        className="flex-1"
                        onClick={() => {
                          setSelectedIndustry(industry);
                          setShowConsultationForm(true);
                        }}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Get Consultation
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => handleViewAnalytics(industry.title)}
                        className="flex-1"
                      >
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View Analytics
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Why Industry Leaders Choose Aptivon
              </h2>
              <p className="text-lg text-slate-600">
                Our industry-specific expertise and proven track record make us the trusted partner 
                for digital transformation across all sectors.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Deep Industry Knowledge",
                  description: "Our team includes former industry professionals who understand your unique challenges and regulatory requirements."
                },
                {
                  title: "Proven Methodologies",
                  description: "Industry-tested frameworks and best practices that ensure successful project delivery and measurable ROI."
                },
                {
                  title: "Compliance Expertise",
                  description: "Complete understanding of industry regulations including HIPAA, SOX, PCI-DSS, and other compliance standards."
                }
              ].map((item: any, index: number) => (
                <div key={index} className="text-center">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industry Analytics Modal */}
      {showAnalytics && selectedAnalyticsIndustry && INDUSTRY_ANALYTICS[selectedAnalyticsIndustry as keyof typeof INDUSTRY_ANALYTICS] && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900">
                  {selectedAnalyticsIndustry} Analytics
                </h2>
                <button 
                  onClick={() => setShowAnalytics(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X size={24} />
                </button>
              </div>
              <p className="text-slate-600 mt-2">Comprehensive performance metrics and insights</p>
            </div>

            <div className="p-6 space-y-8">
              {(() => {
                const analytics = INDUSTRY_ANALYTICS[selectedAnalyticsIndustry as keyof typeof INDUSTRY_ANALYTICS];
                return (
                  <>
                    {/* Key Performance Indicators */}
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Key Performance Indicators</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card>
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-blue-600">{analytics.avgROI}</div>
                            <div className="text-sm text-slate-600">Average ROI</div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-green-600">
                              {analytics.satisfactionScore}/5.0
                            </div>
                            <div className="text-sm text-slate-600">Client Satisfaction</div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-yellow-600">
                              {analytics.compliance.length}
                            </div>
                            <div className="text-sm text-slate-600">Compliance Standards</div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-purple-600">100%</div>
                            <div className="text-sm text-slate-600">Success Rate</div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* Success Metrics */}
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Success Metrics</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        {Object.entries(analytics.successMetrics).map(([metric, data]) => (
                          <Card key={metric}>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-slate-900">{metric}</h4>
                                <TrendingUp className="h-4 w-4 text-green-500" />
                              </div>
                              <div className="text-2xl font-bold text-slate-900 mb-1">
                                {data.value}{data.unit}
                              </div>
                              <Progress 
                                value={typeof data.value === 'number' ? Math.min(data.value, 100) : 85} 
                                className="h-2"
                              />
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Technology Stack */}
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Technology Stack</h3>
                      <div className="flex flex-wrap gap-2">
                        {analytics.technologies.map((tech, index) => (
                          <Badge key={index} variant="outline" className="px-3 py-1">
                            <Cpu className="h-3 w-3 mr-1" />
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Compliance Standards */}
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Compliance & Standards</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        {analytics.compliance.map((standard, index) => (
                          <Card key={index}>
                            <CardContent className="p-4 flex items-center gap-3">
                              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <Shield className="h-4 w-4 text-green-600" />
                              </div>
                              <div>
                                <div className="font-medium text-slate-900">{standard}</div>
                                <div className="text-sm text-slate-600">Certified</div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-6 border-t">
                      <Button 
                        onClick={() => {
                          setShowAnalytics(false);
                          setSelectedIndustry({ title: selectedAnalyticsIndustry });
                          setShowConsultationForm(true);
                        }}
                        className="flex-1"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Consultation
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          toast({
                            title: "Report Generated",
                            description: "Industry analytics report has been prepared for download.",
                          });
                        }}
                        className="flex-1"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Report
                      </Button>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Consultation Form Modal */}
      {showConsultationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                Industry Consultation Request
              </h2>
              <button 
                onClick={() => setShowConsultationForm(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={24} />
              </button>
            </div>

            {selectedIndustry && (
              <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600">
                  Industry: <span className="font-semibold text-slate-900">{selectedIndustry.title}</span>
                </p>
              </div>
            )}

            <form onSubmit={handleConsultationSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    First Name *
                  </label>
                  <Input
                    type="text"
                    required
                    value={consultationForm.firstName}
                    onChange={(e) => setConsultationForm(prev => ({ ...prev, firstName: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Last Name *
                  </label>
                  <Input
                    type="text"
                    required
                    value={consultationForm.lastName}
                    onChange={(e) => setConsultationForm(prev => ({ ...prev, lastName: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email Address *
                </label>
                <Input
                  type="email"
                  required
                  value={consultationForm.email}
                  onChange={(e) => setConsultationForm(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Company
                </label>
                <Input
                  type="text"
                  value={consultationForm.company}
                  onChange={(e) => setConsultationForm(prev => ({ ...prev, company: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  value={consultationForm.phone}
                  onChange={(e) => setConsultationForm(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  placeholder="Tell us about your specific industry challenges and requirements..."
                  value={consultationForm.message}
                  onChange={(e) => setConsultationForm(prev => ({ ...prev, message: e.target.value }))}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowConsultationForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={consultationMutation.isPending}
                  className="flex-1"
                >
                  {consultationMutation.isPending ? "Sending..." : "Request Consultation"}
                </Button>
              </div>
            </form>

            <p className="text-xs text-slate-500 mt-4 text-center">
              By submitting this form, you agree to receive updates about our services.
            </p>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}