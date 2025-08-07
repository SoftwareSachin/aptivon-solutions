import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  Cloud, 
  Server, 
  Brain, 
  Smartphone, 
  Shield, 
  Database, 
  Cpu, 
  Code,
  CheckCircle,
  Calendar,
  Phone,
  Mail,
  Download,
  TrendingUp,
  Users,
  Target,
  Search,
  Filter,
  Play,
  FileText,
  Send,
  Star,
  Activity,
  Timer,
  Zap,
  BarChart3,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Award,
  Clock,
  Globe,
  Lightbulb,
  Settings,
  PieChart
} from "lucide-react";

// Enhanced services data without pricing
const SERVICES_DATA = [
  {
    id: "cloud-infrastructure",
    icon: Cloud,
    title: "Cloud Infrastructure & Migration",
    description: "Complete cloud transformation services with enterprise-grade security and cost optimization.",
    shortDescription: "Enterprise cloud solutions and migration services",
    features: [
      "Multi-cloud strategy and architecture design",
      "AWS, Azure, GCP migration services", 
      "Infrastructure as Code (IaC) implementation",
      "Cloud cost optimization and monitoring",
      "Disaster recovery and backup solutions",
      "Performance monitoring and scaling"
    ],
    benefits: "Reduce infrastructure costs by 40% while improving scalability and reliability",
    duration: "2-6 months",
    category: "Infrastructure",
    technologies: ["AWS", "Azure", "Google Cloud", "Kubernetes", "Docker", "Terraform"],
    deliverables: [
      "Cloud architecture blueprints",
      "Migration roadmap and timeline",
      "Cost optimization report",
      "Security compliance documentation",
      "24/7 monitoring setup"
    ],
    caseStudy: {
      client: "Enterprise Manufacturing Company",
      challenge: "Legacy infrastructure causing scalability issues",
      solution: "Complete AWS migration with microservices architecture",
      result: "60% cost reduction and 99.9% uptime achieved"
    }
  },
  {
    id: "devops-automation",
    icon: Server,
    title: "DevOps & Automation", 
    description: "Streamline development and operations with automated CI/CD pipelines and infrastructure management.",
    shortDescription: "Automated deployment and infrastructure management",
    features: [
      "CI/CD pipeline design and implementation",
      "Container orchestration with Kubernetes",
      "Infrastructure automation and monitoring", 
      "Release management and deployment strategies",
      "Configuration management",
      "Security scanning and compliance automation"
    ],
    benefits: "Accelerate deployment cycles by 75% and reduce manual errors significantly",
    duration: "1-3 months",
    category: "DevOps",
    technologies: ["Jenkins", "GitLab CI", "Docker", "Kubernetes", "Ansible", "Terraform"],
    deliverables: [
      "Automated CI/CD pipelines",
      "Infrastructure as Code templates",
      "Monitoring and alerting setup",
      "Documentation and training",
      "Security and compliance automation"
    ],
    caseStudy: {
      client: "FinTech Startup",
      challenge: "Manual deployments causing delays and errors",
      solution: "Automated CI/CD with Kubernetes orchestration",
      result: "90% faster deployments with zero downtime"
    }
  },
  {
    id: "ai-machine-learning",
    icon: Brain,
    title: "AI & Machine Learning Solutions",
    description: "Data-driven insights and intelligent automation through custom AI/ML implementations.",
    shortDescription: "Custom AI/ML models and intelligent automation",
    features: [
      "Custom machine learning model development",
      "Predictive analytics and forecasting",
      "Natural language processing solutions",
      "Computer vision and image recognition",
      "Recommendation systems",
      "MLOps and model deployment pipelines"
    ],
    benefits: "Improve decision-making accuracy by 60% with data-driven insights",
    duration: "3-8 months",
    category: "AI/ML",
    technologies: ["TensorFlow", "PyTorch", "Scikit-learn", "OpenAI", "Hugging Face", "MLflow"],
    deliverables: [
      "Custom ML models and algorithms",
      "Data preprocessing pipelines",
      "Model training and validation reports",
      "Deployment and monitoring systems",
      "API integrations and documentation"
    ],
    caseStudy: {
      client: "E-commerce Platform",
      challenge: "Low conversion rates and poor personalization",
      solution: "AI-powered recommendation engine and customer analytics",
      result: "45% increase in conversion rates and customer engagement"
    }
  },
  {
    id: "application-development",
    icon: Smartphone,
    title: "Application Development",
    description: "Modern web and mobile applications built with scalable architectures and user-centric design.",
    shortDescription: "Full-stack web and mobile application development",
    features: [
      "Progressive web applications (PWA)",
      "Native iOS and Android development",
      "Cross-platform mobile solutions",
      "API design and microservices architecture",
      "Real-time applications",
      "E-commerce and marketplace platforms"
    ],
    benefits: "Launch products 50% faster with scalable, maintainable code architecture",
    duration: "2-5 months",
    category: "Development",
    technologies: ["React", "React Native", "Node.js", "Python", "Swift", "Kotlin"],
    deliverables: [
      "Full-featured applications",
      "API documentation and integration",
      "User interface and experience design",
      "Testing and quality assurance",
      "App store deployment and optimization"
    ],
    caseStudy: {
      client: "Healthcare Provider",
      challenge: "Outdated patient management system",
      solution: "Modern web application with mobile companion app",
      result: "70% improvement in patient satisfaction and operational efficiency"
    }
  },
  {
    id: "cybersecurity",
    icon: Shield,
    title: "Cybersecurity & Compliance",
    description: "Comprehensive security frameworks to protect your business from evolving cyber threats.",
    shortDescription: "Enterprise security and compliance solutions",
    features: [
      "Security audits and penetration testing",
      "Identity and access management (IAM)",
      "Compliance frameworks (SOC 2, GDPR, HIPAA)",
      "Security incident response planning",
      "Vulnerability assessment and management",
      "Security awareness training programs"
    ],
    benefits: "Achieve 99.9% threat detection rate with enterprise-grade security protocols",
    duration: "2-4 months",
    category: "Security",
    technologies: ["SIEM Tools", "Identity Providers", "Firewall Systems", "Encryption", "PKI"],
    deliverables: [
      "Security assessment reports",
      "Compliance certification documentation",
      "Incident response procedures",
      "Security monitoring systems",
      "Employee training programs"
    ],
    caseStudy: {
      client: "Financial Services Company",
      challenge: "Meeting strict regulatory compliance requirements",
      solution: "Complete security framework with SOC 2 compliance",
      result: "100% compliance achievement and zero security incidents"
    }
  },
  {
    id: "data-analytics",
    icon: Database,
    title: "Data Analytics & Business Intelligence",
    description: "Transform raw data into actionable business insights with advanced analytics platforms.",
    shortDescription: "Advanced data analytics and business intelligence",
    features: [
      "Data warehouse design and implementation",
      "Real-time analytics and dashboards",
      "Predictive modeling and forecasting",
      "ETL pipeline development",
      "Business intelligence reporting",
      "Data visualization and storytelling"
    ],
    benefits: "Increase decision-making speed by 65% with real-time data visualization",
    duration: "2-6 months",
    category: "Analytics",
    technologies: ["Tableau", "Power BI", "Snowflake", "Apache Spark", "Python", "SQL"],
    deliverables: [
      "Data warehouse and lake implementation",
      "Interactive dashboards and reports",
      "Automated data pipelines",
      "Predictive models and forecasts",
      "Training and documentation"
    ],
    caseStudy: {
      client: "Retail Chain",
      challenge: "Fragmented data across multiple systems",
      solution: "Centralized data platform with real-time analytics",
      result: "35% improvement in inventory management and sales forecasting"
    }
  }
];

// Service categories for filtering
const SERVICE_CATEGORIES = [
  "All Services",
  "Infrastructure", 
  "DevOps",
  "AI/ML",
  "Development",
  "Security",
  "Analytics"
];

// Service inquiry form interface
interface ServiceInquiry {
  name: string;
  email: string;
  company: string;
  phone?: string;
  serviceType: string;
  projectDescription: string;
  budget?: string;
  timeline?: string;
  urgency: string;
  currentChallenges?: string;
}

// Consultation request interface
interface ConsultationRequest {
  name: string;
  email: string;
  company: string;
  phone?: string;
  serviceType: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
}

export default function Services() {
  const [, setLocation] = useLocation();
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Services");
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState<any>(null);
  
  // Live metrics
  const [metrics, setMetrics] = useState({
    activeProjects: 5,
    clientSatisfaction: 98,
    responseTime: "< 2 hours",
    successRate: 100
  });

  // Form states
  const [inquiryForm, setInquiryForm] = useState<ServiceInquiry>({
    name: "",
    email: "",
    company: "",
    phone: "",
    serviceType: "",
    projectDescription: "",
    budget: "",
    timeline: "",
    urgency: "Medium",
    currentChallenges: ""
  });
  
  const [consultationForm, setConsultationForm] = useState<ConsultationRequest>({
    name: "",
    email: "",
    company: "",
    phone: "",
    serviceType: "",
    preferredDate: "",
    preferredTime: "",
    message: ""
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Simulate live metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        activeProjects: Math.max(3, Math.min(8, prev.activeProjects + (Math.random() > 0.5 ? 1 : -1))),
        clientSatisfaction: Math.max(95, Math.min(100, prev.clientSatisfaction + (Math.random() * 2 - 1)))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Submit service inquiry
  const inquiryMutation = useMutation({
    mutationFn: async (data: ServiceInquiry) => {
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
        description: "Our team will contact you within 24 hours with a detailed proposal."
      });
      setShowInquiryModal(false);
      setInquiryForm({
        name: "",
        email: "",
        company: "",
        phone: "",
        serviceType: "",
        projectDescription: "",
        budget: "",
        timeline: "",
        urgency: "Medium",
        currentChallenges: ""
      });
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
        serviceType: "",
        preferredDate: "",
        preferredTime: "",
        message: ""
      });
    },
    onError: () => {
      toast({
        title: "Scheduling Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    }
  });

  // Filter services based on search and category
  const filteredServices = SERVICES_DATA.filter(service => {
    const matchesSearch = searchTerm === "" || 
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All Services" || 
      service.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleServiceInquiry = (service?: any) => {
    if (service) {
      setSelectedServiceForInquiry(service);
      setInquiryForm(prev => ({ ...prev, serviceType: service.title }));
    }
    setShowInquiryModal(true);
  };

  const handleScheduleConsultation = (service?: any) => {
    if (service) {
      setSelectedServiceForInquiry(service);
      setConsultationForm(prev => ({ ...prev, serviceType: service.title }));
    }
    setShowConsultationModal(true);
  };

  const handleDownloadPortfolio = () => {
    // Generate and download service portfolio document
    const portfolioContent = generateServicePortfolioDocument();
    const blob = new Blob([portfolioContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Aptivon-Solutions-Service-Portfolio.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Portfolio Downloaded!",
      description: "Service portfolio document has been saved to your downloads."
    });
  };

  const generateServicePortfolioDocument = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aptivon Solutions - Service Portfolio</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #333;
        }
        .container {
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            min-height: 100vh;
        }
        .header {
            background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
            color: white;
            padding: 40px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 2.5rem;
            font-weight: bold;
        }
        .header p {
            margin: 10px 0 0 0;
            font-size: 1.2rem;
            opacity: 0.9;
        }
        .content {
            padding: 40px;
        }
        .intro {
            text-align: center;
            margin-bottom: 50px;
        }
        .intro h2 {
            color: #1e293b;
            font-size: 2rem;
            margin-bottom: 20px;
        }
        .metrics {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 40px 0;
        }
        .metric {
            text-align: center;
            padding: 20px;
            background: #f8fafc;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
        }
        .metric-value {
            font-size: 2rem;
            font-weight: bold;
            color: #1e293b;
            margin-bottom: 5px;
        }
        .metric-label {
            color: #64748b;
            font-size: 0.9rem;
        }
        .service {
            margin-bottom: 50px;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            overflow: hidden;
            background: white;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .service-header {
            background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
            color: white;
            padding: 25px;
        }
        .service-title {
            font-size: 1.5rem;
            font-weight: bold;
            margin: 0 0 10px 0;
        }
        .service-description {
            margin: 0;
            opacity: 0.9;
        }
        .service-content {
            padding: 25px;
        }
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            margin: 20px 0;
        }
        .feature-list {
            list-style: none;
            padding: 0;
        }
        .feature-list li {
            padding: 8px 0;
            padding-left: 20px;
            position: relative;
        }
        .feature-list li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #10b981;
            font-weight: bold;
        }
        .technologies {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin: 15px 0;
        }
        .tech-tag {
            background: #f1f5f9;
            color: #475569;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 500;
        }
        .case-study {
            background: #f8fafc;
            border-radius: 12px;
            padding: 20px;
            margin: 20px 0;
            border-left: 4px solid #3b82f6;
        }
        .case-study h4 {
            color: #1e293b;
            margin: 0 0 15px 0;
        }
        .case-study-item {
            margin: 10px 0;
        }
        .case-study-label {
            font-weight: 600;
            color: #374151;
        }
        .footer {
            background: #1e293b;
            color: white;
            padding: 40px;
            text-align: center;
        }
        .contact-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 30px;
            margin-top: 30px;
        }
        .contact-item {
            text-align: center;
        }
        .contact-item h4 {
            margin: 0 0 10px 0;
            color: #e2e8f0;
        }
        @media print {
            body { background: white; }
            .container { box-shadow: none; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Aptivon Solutions</h1>
            <p>Enterprise Technology Services Portfolio</p>
        </div>

        <div class="content">
            <div class="intro">
                <h2>Transforming Businesses Through Technology</h2>
                <p>We deliver comprehensive technology solutions that drive growth, optimize operations, and accelerate digital transformation for businesses of all sizes.</p>
            </div>

            <div class="metrics">
                <div class="metric">
                    <div class="metric-value">${metrics.activeProjects}+</div>
                    <div class="metric-label">Active Projects</div>
                </div>
                <div class="metric">
                    <div class="metric-value">${Math.round(metrics.clientSatisfaction)}%</div>
                    <div class="metric-label">Client Satisfaction</div>
                </div>
                <div class="metric">
                    <div class="metric-value">${metrics.responseTime}</div>
                    <div class="metric-label">Response Time</div>
                </div>
                <div class="metric">
                    <div class="metric-value">${metrics.successRate}%</div>
                    <div class="metric-label">Project Success Rate</div>
                </div>
            </div>

            ${SERVICES_DATA.map(service => `
                <div class="service">
                    <div class="service-header">
                        <h3 class="service-title">${service.title}</h3>
                        <p class="service-description">${service.description}</p>
                    </div>
                    <div class="service-content">
                        <div class="features">
                            <div>
                                <h4>Key Features</h4>
                                <ul class="feature-list">
                                    ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                                </ul>
                            </div>
                            <div>
                                <h4>Deliverables</h4>
                                <ul class="feature-list">
                                    ${service.deliverables.map(deliverable => `<li>${deliverable}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                        
                        <div>
                            <h4>Technologies</h4>
                            <div class="technologies">
                                ${service.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                            </div>
                        </div>

                        <div class="case-study">
                            <h4>Case Study Success</h4>
                            <div class="case-study-item">
                                <span class="case-study-label">Client:</span> ${service.caseStudy.client}
                            </div>
                            <div class="case-study-item">
                                <span class="case-study-label">Challenge:</span> ${service.caseStudy.challenge}
                            </div>
                            <div class="case-study-item">
                                <span class="case-study-label">Solution:</span> ${service.caseStudy.solution}
                            </div>
                            <div class="case-study-item">
                                <span class="case-study-label">Result:</span> ${service.caseStudy.result}
                            </div>
                        </div>

                        <div style="text-align: center; margin-top: 20px; padding: 15px; background: #eff6ff; border-radius: 8px;">
                            <strong>Timeline:</strong> ${service.duration} | <strong>Benefits:</strong> ${service.benefits}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="footer">
            <h3>Ready to Get Started?</h3>
            <p>Contact us today to discuss your project and discover how we can help transform your business.</p>
            
            <div class="contact-info">
                <div class="contact-item">
                    <h4>Email</h4>
                    <p>singhal3.sachin7@gmail.com</p>
                </div>
                <div class="contact-item">
                    <h4>Location</h4>
                    <p>Jaipur, India</p>
                </div>
                <div class="contact-item">
                    <h4>Response Time</h4>
                    <p>&lt; 2 hours</p>
                </div>
                <div class="contact-item">
                    <h4>Consultation</h4>
                    <p>Free initial assessment</p>
                </div>
            </div>
            
            <p style="margin-top: 30px; opacity: 0.8;">
                © 2025 Aptivon Solutions Pvt. Ltd. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>`;
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    inquiryMutation.mutate(inquiryForm);
  };

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    consultationMutation.mutate(consultationForm);
  };

  return (
    <div className="min-h-screen bg-white ">
      <Navigation />
      {/* Navigation Spacer */}
      <div className="h-48"></div>
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Enterprise Technology Services
            </h1>
            <p className="text-xl opacity-90 max-w-4xl mx-auto leading-relaxed mb-8">
              Comprehensive technology solutions that transform your business operations, 
              accelerate growth, and deliver measurable results across all industries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="bg-white text-slate-900 hover:bg-slate-100"
                onClick={() => handleScheduleConsultation()}
              >
                <Calendar className="h-5 w-5 mr-2" />
                Schedule Free Consultation
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-slate-900 bg-transparent"
                style={{ color: 'white', borderColor: 'white' }}
                onClick={handleDownloadPortfolio}
              >
                <Download className="h-5 w-5 mr-2" style={{ color: 'white' }} />
                Download Service Portfolio
              </Button>
            </div>

            {/* Live Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{metrics.activeProjects}+</div>
                <div className="opacity-80">Active Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{Math.round(metrics.clientSatisfaction)}%</div>
                <div className="opacity-80">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{metrics.responseTime}</div>
                <div className="opacity-80">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{metrics.successRate}%</div>
                <div className="opacity-80">Success Rate</div>
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
                  placeholder="Search services, technologies, or features..."
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
                    <SelectValue placeholder="All Services" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICE_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button 
                variant="outline" 
                onClick={() => handleServiceInquiry()}
                className="flex items-center gap-2"
              >
                <Target className="h-4 w-4" />
                Custom Quote
              </Button>
            </div>
          </div>
          
          {filteredServices.length > 0 && (
            <div className="mt-4 text-sm text-slate-600">
              Found {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} 
              {selectedCategory !== 'All Services' && ` in ${selectedCategory}`}
              {searchTerm && ` matching "${searchTerm}"`}
            </div>
          )}
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Comprehensive Service Portfolio
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              End-to-end technology services designed to meet the unique challenges 
              of modern businesses across all industries.
            </p>
          </div>

          {filteredServices.length === 0 ? (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No services found</h3>
              <p className="text-slate-600">Try adjusting your search query or filter category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {filteredServices.map((service, index) => {
                const IconComponent = service.icon;
                const isSelected = selectedService === index;
                return (
                  <Card 
                    key={service.id} 
                    className={`cursor-pointer transition-all duration-300 hover:shadow-xl group ${
                      isSelected 
                        ? 'border-slate-900 shadow-xl scale-105' 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                    onClick={() => setSelectedService(isSelected ? null : index)}
                  >
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center group-hover:bg-slate-800 transition-colors">
                            <IconComponent className="text-white w-6 h-6" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                              {service.duration}
                            </span>
                          </div>
                          <p className="text-slate-600 mb-4 leading-relaxed">{service.description}</p>
                          
                          {/* Features Preview */}
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-slate-900 mb-2">Key Features:</h4>
                            <ul className="space-y-1">
                              {service.features.slice(0, 3).map((feature, idx) => (
                                <li key={idx} className="flex items-center text-sm text-slate-600">
                                  <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                                  {feature}
                                </li>
                              ))}
                              {service.features.length > 3 && (
                                <li className="text-sm text-slate-500">
                                  +{service.features.length - 3} more features
                                </li>
                              )}
                            </ul>
                          </div>

                          {/* Technologies */}
                          <div className="mb-6">
                            <h4 className="text-sm font-semibold text-slate-900 mb-2">Technologies:</h4>
                            <div className="flex flex-wrap gap-1">
                              {service.technologies.slice(0, 4).map((tech, idx) => (
                                <span key={idx} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                                  {tech}
                                </span>
                              ))}
                              {service.technologies.length > 4 && (
                                <span className="text-xs text-slate-500">
                                  +{service.technologies.length - 4} more
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Expanded Content */}
                          {isSelected && (
                            <div className="border-t pt-6 mt-6 space-y-6">
                              {/* All Features */}
                              <div>
                                <h4 className="text-sm font-semibold text-slate-900 mb-3">Complete Feature Set:</h4>
                                <div className="grid md:grid-cols-2 gap-2">
                                  {service.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center text-sm text-slate-600">
                                      <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                                      {feature}
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Deliverables */}
                              <div>
                                <h4 className="text-sm font-semibold text-slate-900 mb-3">Project Deliverables:</h4>
                                <div className="grid md:grid-cols-2 gap-2">
                                  {service.deliverables.map((deliverable, idx) => (
                                    <div key={idx} className="flex items-center text-sm text-slate-600">
                                      <FileText className="w-3 h-3 text-blue-500 mr-2 flex-shrink-0" />
                                      {deliverable}
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Case Study */}
                              <div className="bg-slate-50 rounded-lg p-4">
                                <h4 className="text-sm font-semibold text-slate-900 mb-3">Success Story:</h4>
                                <div className="space-y-2 text-sm">
                                  <div><span className="font-medium">Client:</span> {service.caseStudy.client}</div>
                                  <div><span className="font-medium">Challenge:</span> {service.caseStudy.challenge}</div>
                                  <div><span className="font-medium">Solution:</span> {service.caseStudy.solution}</div>
                                  <div className="text-green-700"><span className="font-medium">Result:</span> {service.caseStudy.result}</div>
                                </div>
                              </div>

                              {/* Benefits */}
                              <div className="bg-blue-50 rounded-lg p-4">
                                <h4 className="text-sm font-semibold text-slate-900 mb-2">Expected Benefits:</h4>
                                <p className="text-sm text-slate-700">{service.benefits}</p>
                              </div>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex gap-3 mt-6">
                            <Button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleServiceInquiry(service);
                              }}
                              className="flex-1 bg-slate-900 hover:bg-slate-800 text-white"
                              size="sm"
                            >
                              <Send className="h-4 w-4 mr-2" />
                              Get Quote
                            </Button>
                            <Button 
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleScheduleConsultation(service);
                              }}
                              size="sm"
                            >
                              <Calendar className="h-4 w-4 mr-2" />
                              Consult
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Get a free consultation and discover how our services can accelerate your growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-slate-900 hover:bg-slate-800 text-white"
              onClick={() => handleScheduleConsultation()}
            >
              <Calendar className="h-5 w-5 mr-2" />
              Schedule Free Consultation
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleDownloadPortfolio}
            >
              <Download className="h-5 w-5 mr-2" />
              Download Complete Portfolio
            </Button>
          </div>
        </div>
      </section>

      {/* Service Inquiry Modal */}
      <Dialog open={showInquiryModal} onOpenChange={setShowInquiryModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Request Service Quote</DialogTitle>
            <DialogDescription>
              Tell us about your project and we'll provide a detailed proposal with timeline and recommendations.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleInquirySubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={inquiryForm.name}
                  onChange={(e) => setInquiryForm(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={inquiryForm.email}
                  onChange={(e) => setInquiryForm(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company">Company Name *</Label>
                <Input
                  id="company"
                  value={inquiryForm.company}
                  onChange={(e) => setInquiryForm(prev => ({ ...prev, company: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={inquiryForm.phone}
                  onChange={(e) => setInquiryForm(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="serviceType">Service of Interest *</Label>
              <Select value={inquiryForm.serviceType} onValueChange={(value) => setInquiryForm(prev => ({ ...prev, serviceType: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICES_DATA.map((service) => (
                    <SelectItem key={service.id} value={service.title}>
                      {service.title}
                    </SelectItem>
                  ))}
                  <SelectItem value="Multiple Services">Multiple Services</SelectItem>
                  <SelectItem value="Custom Solution">Custom Solution</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="projectDescription">Project Description *</Label>
              <Textarea
                id="projectDescription"
                value={inquiryForm.projectDescription}
                onChange={(e) => setInquiryForm(prev => ({ ...prev, projectDescription: e.target.value }))}
                rows={4}
                placeholder="Describe your project requirements, goals, and current challenges..."
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="budget">Budget Range</Label>
                <Select value={inquiryForm.budget} onValueChange={(value) => setInquiryForm(prev => ({ ...prev, budget: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Under ₹50,000">Under ₹50,000</SelectItem>
                    <SelectItem value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</SelectItem>
                    <SelectItem value="₹1,00,000 - ₹5,00,000">₹1,00,000 - ₹5,00,000</SelectItem>
                    <SelectItem value="₹5,00,000 - ₹10,00,000">₹5,00,000 - ₹10,00,000</SelectItem>
                    <SelectItem value="Above ₹10,00,000">Above ₹10,00,000</SelectItem>
                    <SelectItem value="To be discussed">To be discussed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="timeline">Project Timeline</Label>
                <Select value={inquiryForm.timeline} onValueChange={(value) => setInquiryForm(prev => ({ ...prev, timeline: value }))}>
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
              <div>
                <Label htmlFor="urgency">Priority Level *</Label>
                <Select value={inquiryForm.urgency} onValueChange={(value) => setInquiryForm(prev => ({ ...prev, urgency: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="currentChallenges">Current Challenges</Label>
              <Textarea
                id="currentChallenges"
                value={inquiryForm.currentChallenges}
                onChange={(e) => setInquiryForm(prev => ({ ...prev, currentChallenges: e.target.value }))}
                rows={3}
                placeholder="What specific challenges are you facing that this project would solve?"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={inquiryMutation.isPending} className="flex-1">
                {inquiryMutation.isPending ? 'Submitting...' : 'Submit Inquiry'}
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowInquiryModal(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Consultation Modal */}
      <Dialog open={showConsultationModal} onOpenChange={setShowConsultationModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Schedule Free Consultation</DialogTitle>
            <DialogDescription>
              Book a free 30-minute consultation to discuss your project requirements and get expert recommendations.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleConsultationSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="consultName">Full Name *</Label>
                <Input
                  id="consultName"
                  value={consultationForm.name}
                  onChange={(e) => setConsultationForm(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="consultEmail">Email Address *</Label>
                <Input
                  id="consultEmail"
                  type="email"
                  value={consultationForm.email}
                  onChange={(e) => setConsultationForm(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="consultCompany">Company Name *</Label>
                <Input
                  id="consultCompany"
                  value={consultationForm.company}
                  onChange={(e) => setConsultationForm(prev => ({ ...prev, company: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="consultPhone">Phone Number</Label>
                <Input
                  id="consultPhone"
                  value={consultationForm.phone}
                  onChange={(e) => setConsultationForm(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="consultServiceType">Service of Interest *</Label>
              <Select value={consultationForm.serviceType} onValueChange={(value) => setConsultationForm(prev => ({ ...prev, serviceType: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICES_DATA.map((service) => (
                    <SelectItem key={service.id} value={service.title}>
                      {service.title}
                    </SelectItem>
                  ))}
                  <SelectItem value="General Consultation">General Consultation</SelectItem>
                  <SelectItem value="Multiple Services">Multiple Services</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="preferredDate">Preferred Date</Label>
                <Input
                  id="preferredDate"
                  type="date"
                  value={consultationForm.preferredDate}
                  onChange={(e) => setConsultationForm(prev => ({ ...prev, preferredDate: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <Label htmlFor="preferredTime">Preferred Time</Label>
                <Select value={consultationForm.preferredTime} onValueChange={(value) => setConsultationForm(prev => ({ ...prev, preferredTime: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</SelectItem>
                    <SelectItem value="Afternoon (12 PM - 5 PM)">Afternoon (12 PM - 5 PM)</SelectItem>
                    <SelectItem value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</SelectItem>
                    <SelectItem value="Flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="consultMessage">Additional Message</Label>
              <Textarea
                id="consultMessage"
                value={consultationForm.message}
                onChange={(e) => setConsultationForm(prev => ({ ...prev, message: e.target.value }))}
                rows={3}
                placeholder="Tell us about your project or any specific questions you'd like to discuss..."
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={consultationMutation.isPending} className="flex-1">
                {consultationMutation.isPending ? 'Scheduling...' : 'Schedule Consultation'}
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowConsultationModal(false)}>
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