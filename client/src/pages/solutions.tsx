import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { 
  Cloud, 
  Shield, 
  Database, 
  Smartphone, 
  Cpu, 
  Globe,
  CheckCircle,
  Phone,
  Mail,
  Calendar,
  Search,
  Filter,
  Clock,
  DollarSign,
  Users,
  Zap,
  Star,
  ArrowRight,
  Target,
  TrendingUp
} from "lucide-react";

const SOLUTIONS_DATA = [
    {
      icon: Cloud,
      title: "Cloud Migration & Management",
      description: "Seamlessly migrate your infrastructure to cloud platforms with zero downtime and optimized costs.",
      features: ["AWS/Azure/GCP Migration", "Cloud Architecture Design", "Cost Optimization", "24/7 Monitoring"],
      benefits: "Reduce infrastructure costs by up to 40% while improving scalability and reliability."
    },
    {
      icon: Shield,
      title: "Cybersecurity Solutions",
      description: "Comprehensive security frameworks to protect your business from evolving cyber threats.",
      features: ["Security Audits", "Penetration Testing", "Compliance Management", "Incident Response"],
      benefits: "Achieve 99.9% threat detection rate with enterprise-grade security protocols."
    },
    {
      icon: Database,
      title: "Data Analytics & BI",
      description: "Transform raw data into actionable business insights with advanced analytics platforms.",
      features: ["Data Warehousing", "Real-time Analytics", "Predictive Modeling", "Custom Dashboards"],
      benefits: "Increase decision-making speed by 60% with real-time data visualization."
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications that deliver exceptional user experiences.",
      features: ["iOS/Android Development", "Cross-platform Solutions", "UI/UX Design", "App Store Optimization"],
      benefits: "Launch mobile apps 50% faster with our proven development methodology."
    },
    {
      icon: Cpu,
      title: "AI & Machine Learning",
      description: "Implement intelligent automation and predictive analytics to transform your business operations.",
      features: ["ML Model Development", "Natural Language Processing", "Computer Vision", "Process Automation"],
      benefits: "Automate 70% of repetitive tasks while improving accuracy and efficiency."
    },
    {
      icon: Globe,
      title: "Digital Transformation",
      description: "End-to-end digital transformation services to modernize your business processes and technology.",
      features: ["Process Digitization", "Legacy System Modernization", "API Integration", "Change Management"],
      benefits: "Achieve 3x faster business processes with complete digital transformation."
    }
];

interface Solution {
  id: string;
  title: string;
  description: string;
  features: string[];
  benefits: string;
  category: string;
  pricing: string;
  timeline: string;
  technologies: string[];
}

interface SolutionInquiry {
  name: string;
  email: string;
  company: string;
  phone?: string;
  solutionType: string;
  projectDescription: string;
  budget?: string;
  timeline?: string;
  currentChallenges?: string;
}

interface ConsultationRequest {
  name: string;
  email: string;
  company: string;
  phone?: string;
  solutionType: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
}

export default function Solutions() {
  const [, setLocation] = useLocation();
  const [selectedSolution, setSelectedSolution] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [selectedSolutionForInquiry, setSelectedSolutionForInquiry] = useState<Solution | null>(null);
  
  // Form states
  const [inquiryForm, setInquiryForm] = useState<SolutionInquiry>({
    name: "",
    email: "",
    company: "",
    phone: "",
    solutionType: "",
    projectDescription: "",
    budget: "",
    timeline: "",
    currentChallenges: ""
  });
  
  const [consultationForm, setConsultationForm] = useState<ConsultationRequest>({
    name: "",
    email: "",
    company: "",
    phone: "",
    solutionType: "",
    preferredDate: "",
    preferredTime: "",
    message: ""
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch solutions from API
  const { data: solutionsData, isLoading, error } = useQuery({
    queryKey: ['/api/business?action=solution-inquiries', { category: selectedCategory, search: searchTerm }],
    queryFn: async () => {
      const params = new URLSearchParams({
        type: 'solutions',
        ...(selectedCategory !== 'all' && { category: selectedCategory }),
        ...(searchTerm && { search: searchTerm })
      });
      
      const response = await fetch(`/api/business?action=solution-inquiries&${params}`);
      if (!response.ok) throw new Error('Failed to fetch solutions');
      return response.json();
    }
  });

  // Submit solution inquiry
  const inquiryMutation = useMutation({
    mutationFn: async (data: SolutionInquiry) => {
      const response = await fetch('/api/business?action=solution-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to submit inquiry');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Inquiry Submitted!",
        description: "Our team will contact you within 24 hours with a tailored solution."
      });
      setShowInquiryModal(false);
      setInquiryForm({
        name: "",
        email: "",
        company: "",
        phone: "",
        solutionType: "",
        projectDescription: "",
        budget: "",
        timeline: "",
        currentChallenges: ""
      });
      queryClient.invalidateQueries({ queryKey: ['/api/business?action=solution-inquiries'] });
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    }
  });

  // Submit consultation request
  const consultationMutation = useMutation({
    mutationFn: async (data: ConsultationRequest) => {
      const response = await fetch('/api/business?action=consultation-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to schedule consultation');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Consultation Scheduled!",
        description: "We'll send you a calendar invite shortly."
      });
      setShowConsultationModal(false);
      setConsultationForm({
        name: "",
        email: "",
        company: "",
        phone: "",
        solutionType: "",
        preferredDate: "",
        preferredTime: "",
        message: ""
      });
      queryClient.invalidateQueries({ queryKey: ['/api/business?action=solution-inquiries'] });
    },
    onError: () => {
      toast({
        title: "Scheduling Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    }
  });

  const handleScheduleConsultation = (solution?: Solution) => {
    if (solution) {
      setSelectedSolutionForInquiry(solution);
      setConsultationForm(prev => ({ ...prev, solutionType: solution.title }));
      setShowConsultationModal(true);
    } else {
      setLocation("/contact");
    }
  };

  const handleViewCaseStudies = () => {
    setLocation("/case-studies");
  };

  const handleContactExperts = () => {
    setLocation("/contact");
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    inquiryMutation.mutate(inquiryForm);
  };

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    consultationMutation.mutate(consultationForm);
  };

  const solutions = solutionsData?.solutions || SOLUTIONS_DATA;
  const categories = ["all", "Infrastructure", "Security", "Analytics", "Development", "AI/ML", "Transformation"];

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
              Technology Solutions That Drive Results
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-8">
              From cloud infrastructure to AI implementation, we deliver comprehensive 
              technology solutions that transform your business operations and accelerate growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="bg-slate-900 hover:bg-slate-800 text-white"
                onClick={() => handleScheduleConsultation()}
              >
                <Calendar className="h-5 w-5 mr-2" />
                Schedule Consultation
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleViewCaseStudies}
              >
                View Case Studies
              </Button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900 mb-2">5+</div>
                <div className="text-slate-600">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900 mb-2">99%</div>
                <div className="text-slate-600">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900 mb-2">24/7</div>
                <div className="text-slate-600">Support Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900 mb-2">15+</div>
                <div className="text-slate-600">Industries Served</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search solutions, technologies, or features..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-slate-600" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setShowInquiryModal(true)}
                className="flex items-center gap-2"
              >
                <Target className="h-4 w-4" />
                Custom Solution
              </Button>
            </div>
          </div>
          
          {solutions.length > 0 && (
            <div className="mt-4 text-sm text-slate-600">
              Found {solutions.length} solution{solutions.length !== 1 ? 's' : ''} 
              {selectedCategory !== 'all' && ` in ${selectedCategory}`}
              {searchTerm && ` matching "${searchTerm}"`}
            </div>
          )}
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Comprehensive Technology Solutions
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We provide end-to-end technology solutions designed to meet the unique 
              challenges of modern businesses across all industries.
            </p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white p-8 rounded-xl border animate-pulse">
                  <div className="w-12 h-12 bg-slate-200 rounded-lg mb-6"></div>
                  <div className="h-6 bg-slate-200 rounded mb-3"></div>
                  <div className="h-16 bg-slate-200 rounded mb-6"></div>
                  <div className="space-y-2">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="h-4 bg-slate-200 rounded"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {solutions.map((solution: any, index: number) => {
                const IconComponent = SOLUTIONS_DATA.find(s => s.title === solution.title)?.icon || Cloud;
                return (
                  <div 
                    key={solution.id || index} 
                    className={`bg-white p-8 rounded-xl border transition-all duration-300 cursor-pointer hover:shadow-xl group ${
                      selectedSolution === index 
                        ? 'border-slate-900 shadow-xl scale-105' 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                    onClick={() => setSelectedSolution(selectedSolution === index ? null : index)}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-colors">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                        {solution.category || 'Solution'}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-800 transition-colors">
                      {solution.title}
                    </h3>
                    <p className="text-slate-600 mb-6 line-clamp-3">{solution.description}</p>
                    
                    {/* Enhanced solution details */}
                    <div className="space-y-4 mb-6">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-slate-400" />
                          <span className="text-slate-600">{solution.pricing || 'Custom pricing'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-slate-400" />
                          <span className="text-slate-600">{solution.timeline || '8-12 weeks'}</span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2 text-sm">Key Features:</h4>
                        <ul className="space-y-1">
                          {solution.features.slice(0, 3).map((feature: string, idx: number) => (
                            <li key={idx} className="flex items-start text-xs text-slate-600">
                              <CheckCircle className="h-3 w-3 text-slate-400 mr-2 flex-shrink-0 mt-0.5" />
                              {feature}
                            </li>
                          ))}
                          {solution.features.length > 3 && (
                            <li className="text-xs text-slate-500">
                              +{solution.features.length - 3} more features
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-slate-50 rounded-lg border-l-4 border-slate-900 mb-4">
                      <p className="text-xs text-slate-700 font-medium">
                        {solution.benefits}
                      </p>
                    </div>

                    {/* Technology tags */}
                    {solution.technologies && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {solution.technologies.slice(0, 4).map((tech: string) => (
                            <span key={tech} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                              {tech}
                            </span>
                          ))}
                          {solution.technologies.length > 4 && (
                            <span className="text-xs text-slate-500">
                              +{solution.technologies.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-slate-900 hover:bg-slate-800 text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleScheduleConsultation(solution);
                        }}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Consult
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSolutionForInquiry(solution);
                          setInquiryForm(prev => ({ ...prev, solutionType: solution.title }));
                          setShowInquiryModal(true);
                        }}
                      >
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Inquire
                      </Button>
                    </div>

                    {selectedSolution === index && (
                      <div className="mt-4 pt-4 border-t border-slate-200 animate-in slide-in-from-top-2">
                        <div className="space-y-2 text-sm">
                          <p className="font-medium text-slate-900">Why choose this solution?</p>
                          <ul className="space-y-1 text-slate-600">
                            <li className="flex items-center gap-2">
                              <Star className="h-3 w-3 text-yellow-500" />
                              Proven track record with 50+ implementations
                            </li>
                            <li className="flex items-center gap-2">
                              <TrendingUp className="h-3 w-3 text-green-500" />
                              Average 40% efficiency improvement
                            </li>
                            <li className="flex items-center gap-2">
                              <Users className="h-3 w-3 text-blue-500" />
                              Dedicated support team included
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {!isLoading && solutions.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No solutions found</h3>
              <p className="text-slate-600 mb-4">
                Try adjusting your search terms or category filter.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Implementation Process */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Implementation Process
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              A proven methodology that ensures successful project delivery and measurable business outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery & Analysis",
                description: "Comprehensive assessment of your current technology landscape and business requirements."
              },
              {
                step: "02",
                title: "Solution Design",
                description: "Custom solution architecture tailored to your specific needs and growth objectives."
              },
              {
                step: "03",
                title: "Implementation",
                description: "Agile development and deployment with continuous testing and quality assurance."
              },
              {
                step: "04",
                title: "Support & Optimization",
                description: "Ongoing monitoring, maintenance, and optimization to ensure peak performance."
              }
            ].map((process: any, index: number) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{process.title}</h3>
                <p className="text-slate-600">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Contact Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Need a Custom Solution?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Our experts are ready to design a tailored technology solution for your unique business needs.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-slate-50 rounded-lg">
              <Phone className="h-8 w-8 text-slate-900 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">Call Us</h3>
              <p className="text-slate-600">+917852099010</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-lg">
              <Mail className="h-8 w-8 text-slate-900 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">Email Us</h3>
              <p className="text-slate-600">singhal3.sachin7@gmail.com</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-lg">
              <Calendar className="h-8 w-8 text-slate-900 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">Schedule Call</h3>
              <p className="text-slate-600">Book a free consultation</p>
            </div>
          </div>
          <Button 
            size="lg" 
            className="bg-slate-900 hover:bg-slate-800 text-white"
            onClick={handleScheduleConsultation}
          >
            Start Your Project Today
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how our technology solutions can drive your business forward.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-slate-900 hover:bg-slate-100"
              onClick={handleScheduleConsultation}
            >
              <Calendar className="h-5 w-5 mr-2" />
              Get Free Consultation
            </Button>
            <Button 
              size="lg" 
              className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-slate-900 transition-all duration-300 font-semibold"
              onClick={handleContactExperts}
            >
              <Mail className="h-5 w-5 mr-2" />
              Contact Our Experts
            </Button>
          </div>
        </div>
      </section>
      
      {/* Solution Inquiry Modal */}
      <Dialog open={showInquiryModal} onOpenChange={setShowInquiryModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Request Custom Solution</DialogTitle>
            <DialogDescription>
              Tell us about your project and we'll design a tailored solution for your needs.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleInquirySubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="inquiry-name">Full Name *</Label>
                <Input
                  id="inquiry-name"
                  value={inquiryForm.name}
                  onChange={(e) => setInquiryForm(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="inquiry-email">Email Address *</Label>
                <Input
                  id="inquiry-email"
                  type="email"
                  value={inquiryForm.email}
                  onChange={(e) => setInquiryForm(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="inquiry-company">Company Name *</Label>
                <Input
                  id="inquiry-company"
                  value={inquiryForm.company}
                  onChange={(e) => setInquiryForm(prev => ({ ...prev, company: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="inquiry-phone">Phone Number</Label>
                <Input
                  id="inquiry-phone"
                  value={inquiryForm.phone}
                  onChange={(e) => setInquiryForm(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="inquiry-solution-type">Solution Type *</Label>
              <Select 
                value={inquiryForm.solutionType} 
                onValueChange={(value) => setInquiryForm(prev => ({ ...prev, solutionType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select solution type" />
                </SelectTrigger>
                <SelectContent>
                  {SOLUTIONS_DATA.map((solution) => (
                    <SelectItem key={solution.title} value={solution.title}>
                      {solution.title}
                    </SelectItem>
                  ))}
                  <SelectItem value="Custom Solution">Custom Solution</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="inquiry-description">Project Description *</Label>
              <Textarea
                id="inquiry-description"
                placeholder="Describe your project requirements, goals, and current challenges..."
                value={inquiryForm.projectDescription}
                onChange={(e) => setInquiryForm(prev => ({ ...prev, projectDescription: e.target.value }))}
                required
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="inquiry-budget">Budget Range</Label>
                <Select 
                  value={inquiryForm.budget} 
                  onValueChange={(value) => setInquiryForm(prev => ({ ...prev, budget: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Under $10k">Under $10,000</SelectItem>
                    <SelectItem value="$10k-$25k">$10,000 - $25,000</SelectItem>
                    <SelectItem value="$25k-$50k">$25,000 - $50,000</SelectItem>
                    <SelectItem value="$50k-$100k">$50,000 - $100,000</SelectItem>
                    <SelectItem value="$100k+">$100,000+</SelectItem>
                    <SelectItem value="Discuss">Let's discuss</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="inquiry-timeline">Project Timeline</Label>
                <Select 
                  value={inquiryForm.timeline} 
                  onValueChange={(value) => setInquiryForm(prev => ({ ...prev, timeline: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Urgent (&lt; 1 month)">Urgent (&lt; 1 month)</SelectItem>
                    <SelectItem value="1-3 months">1-3 months</SelectItem>
                    <SelectItem value="3-6 months">3-6 months</SelectItem>
                    <SelectItem value="6+ months">6+ months</SelectItem>
                    <SelectItem value="Flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="inquiry-challenges">Current Challenges</Label>
              <Textarea
                id="inquiry-challenges"
                placeholder="What specific challenges are you facing that this solution should address?"
                value={inquiryForm.currentChallenges}
                onChange={(e) => setInquiryForm(prev => ({ ...prev, currentChallenges: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="flex gap-3">
              <Button 
                type="submit" 
                className="flex-1 bg-slate-900 hover:bg-slate-800 text-white"
                disabled={inquiryMutation.isPending}
              >
                {inquiryMutation.isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Submit Inquiry
                  </>
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowInquiryModal(false)}
                disabled={inquiryMutation.isPending}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Consultation Booking Modal */}
      <Dialog open={showConsultationModal} onOpenChange={setShowConsultationModal}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Schedule Free Consultation</DialogTitle>
            <DialogDescription>
              Book a 30-minute consultation to discuss your project requirements.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleConsultationSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="consultation-name">Full Name *</Label>
                <Input
                  id="consultation-name"
                  value={consultationForm.name}
                  onChange={(e) => setConsultationForm(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="consultation-email">Email Address *</Label>
                <Input
                  id="consultation-email"
                  type="email"
                  value={consultationForm.email}
                  onChange={(e) => setConsultationForm(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="consultation-company">Company Name *</Label>
                <Input
                  id="consultation-company"
                  value={consultationForm.company}
                  onChange={(e) => setConsultationForm(prev => ({ ...prev, company: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="consultation-phone">Phone Number</Label>
                <Input
                  id="consultation-phone"
                  value={consultationForm.phone}
                  onChange={(e) => setConsultationForm(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="consultation-solution-type">Solution Interest *</Label>
              <Select 
                value={consultationForm.solutionType} 
                onValueChange={(value) => setConsultationForm(prev => ({ ...prev, solutionType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select solution of interest" />
                </SelectTrigger>
                <SelectContent>
                  {SOLUTIONS_DATA.map((solution) => (
                    <SelectItem key={solution.title} value={solution.title}>
                      {solution.title}
                    </SelectItem>
                  ))}
                  <SelectItem value="General Discussion">General Discussion</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="consultation-date">Preferred Date</Label>
                <Input
                  id="consultation-date"
                  type="date"
                  value={consultationForm.preferredDate}
                  onChange={(e) => setConsultationForm(prev => ({ ...prev, preferredDate: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <Label htmlFor="consultation-time">Preferred Time</Label>
                <Select 
                  value={consultationForm.preferredTime} 
                  onValueChange={(value) => setConsultationForm(prev => ({ ...prev, preferredTime: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                    <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                    <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                    <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                    <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                    <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                    <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="consultation-message">Additional Notes</Label>
              <Textarea
                id="consultation-message"
                placeholder="Any specific topics you'd like to discuss during the consultation?"
                value={consultationForm.message}
                onChange={(e) => setConsultationForm(prev => ({ ...prev, message: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-slate-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-slate-900 mb-1">What to Expect</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• 30-minute video consultation</li>
                    <li>• Technical assessment of your requirements</li>
                    <li>• Preliminary solution recommendations</li>
                    <li>• Project timeline and budget discussion</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                type="submit" 
                className="flex-1 bg-slate-900 hover:bg-slate-800 text-white"
                disabled={consultationMutation.isPending}
              >
                {consultationMutation.isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Scheduling...
                  </>
                ) : (
                  <>
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Consultation
                  </>
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowConsultationModal(false)}
                disabled={consultationMutation.isPending}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}