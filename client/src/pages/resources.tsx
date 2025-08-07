import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DownloadModal from "@/components/download-modal";
import WebinarModal from "@/components/webinar-modal";
import { useState, useMemo, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Video, 
  BookOpen, 
  Download,
  Search,
  Calendar,
  Clock,
  Users,
  TrendingUp,
  Shield,
  Cloud,
  Cpu,
  Database,
  Filter,
  X,
  ExternalLink,
  Star,
  StarOff,
  Share2,
  Copy,
  CheckCircle,
  SortAsc,
  SortDesc,
  Grid3X3,
  List,
  Tag,
  Eye,
  ThumbsUp,
  MessageSquare,
  BookmarkPlus,
  BookmarkCheck,
  ChevronUp,
  ChevronDown
} from "lucide-react";

const WHITEPAPERS_DATA = [
  {
    id: 1,
    title: "Evaluating Large Language Models—Principles, Approaches, and Applications",
    description: "This comprehensive whitepaper from Neurips 2024 tutorial provides an overview of the challenges and methods for evaluating large language models (LLMs) in enterprise environments.",
    category: "Artificial Intelligence",
    downloadCount: "4.2K",
    pages: "45 pages",
    date: "December 2024",
    type: "whitepaper",
    downloadUrl: "https://services.google.com/fh/files/blogs/neurips_evaluation.pdf"
  },
  {
    id: 2,
    title: "A Platform Approach to Scaling Generative AI in the Enterprise",
    description: "Explore why AI platforms, not just models are important for scaling generative AI for enterprises. Learn how to build robust AI infrastructure for your organization.",
    category: "Artificial Intelligence",
    downloadCount: "3.8K",
    pages: "32 pages",
    date: "November 2024",
    type: "whitepaper",
    downloadUrl: "https://services.google.com/fh/files/misc/a_platform-centric_approach_to_scaling_generative_ai_in_the_enterprise.pdf"
  },
  {
    id: 3,
    title: "Understanding Cloud Migration Frameworks",
    description: "Devise your migration strategy that empowers both the business and IT. This whitepaper provides comprehensive evaluation of cloud migration options and best practices.",
    category: "Cloud Computing",
    downloadCount: "5.1K",
    pages: "38 pages",
    date: "January 2025",
    type: "whitepaper",
    downloadUrl: "/resources/cloud-migration-frameworks.pdf"
  },
  {
    id: 4,
    title: "Principles of Cost Optimization in Cloud Computing",
    description: "Discover five essential ways to reduce overall cloud spend with a strategic cost optimization approach. Includes real-world case studies and implementation frameworks.",
    category: "Cloud Computing",
    downloadCount: "3.2K",
    pages: "28 pages",
    date: "December 2024",
    type: "whitepaper",
    downloadUrl: "/resources/cost-optimization-principles.pdf"
  },
  {
    id: 5,
    title: "Google's Guide to Innovation: How to Unlock Strategy, Resources, and Technology",
    description: "Learn how Google developed a work culture that fosters creative thinking and drives technological innovation. Essential insights for digital transformation leaders.",
    category: "Digital Transformation",
    downloadCount: "2.9K",
    pages: "24 pages",
    date: "November 2024",
    type: "whitepaper",
    downloadUrl: "/resources/guide-to-innovation.pdf"
  },
  {
    id: 6,
    title: "Delivering Software Securely: Industry Standards and Best Practices",
    description: "Learn industry standards and best practices to secure every stage in your software supply chain. Comprehensive guide to DevSecOps implementation.",
    category: "Cybersecurity",
    downloadCount: "4.7K",
    pages: "42 pages",
    date: "January 2025",
    type: "whitepaper",
    downloadUrl: "/resources/delivering-software-securely.pdf"
  },
  {
    id: 7,
    title: "Machine Learning Operations (MLOps) for Generative AI",
    description: "This whitepaper details how to operationalize GenAI deployments in production by adapting MLOps to GenAI and foundational models.",
    category: "Artificial Intelligence",
    downloadCount: "3.6K",
    pages: "35 pages",
    date: "December 2024",
    type: "whitepaper",
    downloadUrl: "/resources/mlops-generative-ai.pdf"
  },
  {
    id: 8,
    title: "Build a Modern, Unified Analytics Data Platform",
    description: "This paper discusses the decision points necessary in creating a modern, unified analytics data platform built on cloud infrastructure with real-time capabilities.",
    category: "Data Analytics",
    downloadCount: "2.8K",
    pages: "31 pages",
    date: "October 2024",
    type: "whitepaper",
    downloadUrl: "/resources/unified-analytics-platform.pdf"
  },
  {
    id: 9,
    title: "The Google Cloud Adoption Framework",
    description: "Is your organization ready for the cloud? Use Google's comprehensive cloud adoption framework as a guide to assess readiness and plan your transformation journey.",
    category: "Cloud Computing",
    downloadCount: "4.5K",
    pages: "29 pages",
    date: "November 2024",
    type: "whitepaper",
    downloadUrl: "https://services.google.com/fh/files/misc/google_cloud_adoption_framework_whitepaper.pdf"
  },
  {
    id: 10,
    title: "Predictions 2024: Executive Edition - AI and Digital Resilience",
    description: "From resilience to board priorities, tech executives weigh in on what to expect in the era of AI. Comprehensive analysis of AI business impact and transformation strategies.",
    category: "Digital Transformation",
    downloadCount: "6.2K",
    pages: "40 pages",
    date: "January 2024",
    type: "whitepaper",
    downloadUrl: "/resources/predictions-2024-executive-edition.pdf"
  }
];

const WEBINARS_DATA = [
  {
    id: 11,
    title: "AI-Powered Cybersecurity: Defending Against Emerging Threats in 2025",
    description: "Join cybersecurity experts as they explore how AI and machine learning are revolutionizing threat detection, response automation, and vulnerability management in the modern security landscape.",
    speaker: "Dr. Sarah Chen, Head of AI Security Research",
    duration: "50 minutes",
    attendees: "750+",
    date: "February 12, 2025",
    status: "upcoming",
    type: "webinar",
    category: "Cybersecurity",
    registrationUrl: "/webinar-registration/ai-cybersecurity-2025"
  },
  {
    id: 12,
    title: "Cloud Migration Strategies: From Planning to Production",
    description: "Learn proven methodologies for successful cloud migration including assessment frameworks, cost optimization, and risk mitigation strategies used by Fortune 500 companies.",
    speaker: "Marcus Rodriguez, Principal Cloud Architect",
    duration: "65 minutes",
    attendees: "520+",
    date: "January 28, 2025",
    status: "recorded",
    type: "webinar",
    category: "Cloud Computing",
    recordingUrl: "/webinar-recordings/cloud-migration-strategies"
  },
  {
    id: 13,
    title: "Scaling Generative AI in Enterprise: Platform Architecture and Best Practices",
    description: "Discover how to build robust AI platforms that can scale generative AI applications across your organization. Real case studies from enterprise implementations.",
    speaker: "Priya Sharma, AI Platform Engineering Lead",
    duration: "55 minutes",
    attendees: "640+",
    date: "December 15, 2024",
    status: "recorded",
    type: "webinar",
    category: "Artificial Intelligence",
    recordingUrl: "/webinar-recordings/scaling-generative-ai"
  },
  {
    id: 14,
    title: "Digital Transformation ROI: Measuring Success Beyond Cost Savings",
    description: "Learn how leading organizations measure and optimize the return on investment from digital transformation initiatives. Includes frameworks and KPI strategies.",
    speaker: "Dr. James Wilson, Digital Strategy Consultant",
    duration: "45 minutes",
    attendees: "410+",
    date: "March 5, 2025",
    status: "upcoming",
    type: "webinar",
    category: "Digital Transformation",
    registrationUrl: "/webinar-registration/digital-transformation-roi"
  },
  {
    id: 15,
    title: "MLOps for Generative AI: Production Deployment Strategies",
    description: "Explore how to operationalize GenAI deployments in production environments. Learn about monitoring, versioning, and governance for AI models at scale.",
    speaker: "Alex Kumar, MLOps Engineering Manager",
    duration: "60 minutes",
    attendees: "380+",
    date: "January 20, 2025",
    status: "recorded",
    type: "webinar",
    category: "Artificial Intelligence",
    recordingUrl: "/webinar-recordings/mlops-generative-ai"
  },
  {
    id: 16,
    title: "Data Governance in the Cloud Era: Compliance and Security",
    description: "Master the principles and best practices for data governance in cloud environments. Learn how to maintain compliance while enabling innovation.",
    speaker: "Lisa Thompson, Data Governance Specialist",
    duration: "50 minutes",
    attendees: "290+",
    date: "February 25, 2025",
    status: "upcoming",
    type: "webinar",
    category: "Data Analytics",
    registrationUrl: "/webinar-registration/data-governance-cloud"
  }
];

const CASE_STUDIES_DATA = [
  {
    id: 17,
    title: "Global Manufacturing Company's AI-Driven Quality Control Transformation",
    description: "How a Fortune 500 manufacturing company implemented AI-powered quality control systems across 15 global facilities, reducing defects by 65% and improving production efficiency.",
    category: "Manufacturing",
    industry: "Manufacturing",
    results: "65% defect reduction, $12M annual savings, 23% efficiency gain",
    type: "case-study",
    readTime: "12 min read",
    date: "January 2025"
  },
  {
    id: 18,
    title: "Healthcare Network's Cloud Migration: 2M+ Patient Records Modernized",
    description: "Complete digital transformation of a regional healthcare network serving 2M+ patients, implementing cloud-native EHR systems with HIPAA compliance and 99.9% uptime.",
    category: "Healthcare",
    industry: "Healthcare",
    results: "40% faster patient processing, 99.9% uptime, HIPAA compliant",
    type: "case-study",
    readTime: "10 min read",
    date: "December 2024"
  },
  {
    id: 19,
    title: "Fintech Startup's Scalable Infrastructure: From 1K to 1M Users",
    description: "How a fintech startup built a cloud-native infrastructure that scaled from 1,000 to 1 million users in 18 months while maintaining PCI DSS compliance and sub-100ms response times.",
    category: "Financial Technology",
    industry: "Financial Services",
    results: "1000x user scaling, <100ms response time, PCI DSS compliance",
    type: "case-study",
    readTime: "8 min read",
    date: "November 2024"
  },
  {
    id: 20,
    title: "Retail Giant's Real-Time Analytics Platform: Processing 50TB Daily",
    description: "Implementation of a real-time analytics platform for a major retailer processing 50TB of customer data daily, enabling personalized experiences and increasing conversion rates.",
    category: "Retail Analytics",
    industry: "Retail",
    results: "50TB daily processing, 35% conversion increase, real-time insights",
    type: "case-study",
    readTime: "9 min read",
    date: "October 2024"
  },
  {
    id: 21,
    title: "Educational Institution's Remote Learning Infrastructure",
    description: "Rapid deployment of cloud-based learning management system supporting 100,000+ students during pandemic transition with 99.95% availability and integrated AI tutoring.",
    category: "Education Technology",
    industry: "Education",
    results: "100K+ students supported, 99.95% availability, AI-powered tutoring",
    type: "case-study",
    readTime: "7 min read",
    date: "September 2024"
  },
  {
    id: 22,
    title: "Energy Company's IoT Data Platform: Smart Grid Implementation",
    description: "Deployment of IoT-enabled smart grid platform processing data from 500,000+ sensors, reducing energy waste by 28% and improving grid reliability.",
    category: "Energy & Utilities",
    industry: "Energy",
    results: "28% energy waste reduction, 500K+ sensors managed, improved reliability",
    type: "case-study",
    readTime: "11 min read",
    date: "August 2024"
  }
];

const TOOLS_DATA = [
  {
    id: 13,
    title: "Cloud Readiness Assessment",
    description: "Evaluate your organization's readiness for cloud migration with our comprehensive assessment tool.",
    icon: Cloud,
    category: "Assessment Tool",
    type: "tool",
    accessUrl: "/tools/cloud-readiness-assessment"
  },
  {
    id: 14,
    title: "ROI Calculator for Digital Transformation",
    description: "Calculate the potential return on investment for your digital transformation initiatives.",
    icon: TrendingUp,
    category: "Calculator",
    type: "tool",
    accessUrl: "/tools/roi-calculator"
  },
  {
    id: 15,
    title: "Security Audit Checklist", 
    description: "Comprehensive checklist to assess your organization's cybersecurity posture.",
    icon: Shield,
    category: "Checklist",
    type: "tool",
    accessUrl: "/tools/security-audit-checklist"
  },
  {
    id: 16,
    title: "Database Performance Analyzer",
    description: "Analyze and optimize your database performance with our free diagnostic tool.",
    icon: Database,
    category: "Diagnostic Tool",
    type: "tool",
    accessUrl: "/tools/database-performance-analyzer"
  }
];

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");
  const [viewMode, setViewMode] = useState("grid");
  const [bookmarkedItems, setBookmarkedItems] = useState<number[]>([]);
  const [downloadModal, setDownloadModal] = useState<{isOpen: boolean; resource: any}>({isOpen: false, resource: null});
  const [webinarModal, setWebinarModal] = useState<{isOpen: boolean; webinar: any}>({isOpen: false, webinar: null});
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [dateFilter, setDateFilter] = useState("all");
  const [popularityFilter, setPopularityFilter] = useState("all");
  const { toast } = useToast();

  // Load bookmarks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('aptivon-bookmarked-resources');
    if (saved) {
      setBookmarkedItems(JSON.parse(saved));
    }
  }, []);

  // Save bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem('aptivon-bookmarked-resources', JSON.stringify(bookmarkedItems));
  }, [bookmarkedItems]);

  // Combine all data sources
  const allResources = [...WHITEPAPERS_DATA, ...WEBINARS_DATA, ...CASE_STUDIES_DATA, ...TOOLS_DATA];

  // Get unique categories for filtering
  const categories = ["all", ...new Set(allResources.map(item => item.category))];
  const types = ["all", "whitepaper", "webinar", "case-study", "tool"];

  // Enhanced filtering with advanced options
  const filteredAndSortedResources = useMemo(() => {
    let filtered = allResources.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
      
      // Handle bookmarked filter specially
      const matchesType = selectedType === "all" ? true : 
                         selectedType === "bookmarked" ? bookmarkedItems.includes(resource.id) :
                         resource.type === selectedType;
      
      // Date filtering
      const matchesDate = dateFilter === "all" || (() => {
        const resourceDate = new Date(resource.date || "2024-01-01");
        const now = new Date();
        const monthsAgo = new Date();
        
        switch(dateFilter) {
          case "recent": 
            monthsAgo.setMonth(monthsAgo.getMonth() - 3);
            return resourceDate >= monthsAgo;
          case "year":
            monthsAgo.setFullYear(monthsAgo.getFullYear() - 1);
            return resourceDate >= monthsAgo;
          default: return true;
        }
      })();

      // Popularity filtering
      const matchesPopularity = popularityFilter === "all" || (() => {
        const downloads = parseInt(resource.downloadCount?.replace(/[^\d]/g, '') || '0');
        const attendees = parseInt(resource.attendees?.replace(/[^\d]/g, '') || '0');
        const popularity = Math.max(downloads, attendees);
        
        switch(popularityFilter) {
          case "high": return popularity > 1000;
          case "medium": return popularity > 500 && popularity <= 1000;
          case "low": return popularity <= 500;
          default: return true;
        }
      })();
      
      return matchesSearch && matchesCategory && matchesType && matchesDate && matchesPopularity;
    });

    // Sorting
    filtered.sort((a, b) => {
      switch(sortBy) {
        case "title-asc": return a.title.localeCompare(b.title);
        case "title-desc": return b.title.localeCompare(a.title);
        case "category-asc": return a.category.localeCompare(b.category);
        case "category-desc": return b.category.localeCompare(a.category);
        case "popularity-desc": 
          const aPopularity = Math.max(
            parseInt(a.downloadCount?.replace(/[^\d]/g, '') || '0'),
            parseInt(a.attendees?.replace(/[^\d]/g, '') || '0')
          );
          const bPopularity = Math.max(
            parseInt(b.downloadCount?.replace(/[^\d]/g, '') || '0'),
            parseInt(b.attendees?.replace(/[^\d]/g, '') || '0')
          );
          return bPopularity - aPopularity;
        case "date-desc":
        default:
          const aDate = new Date(a.date || "2024-01-01");
          const bDate = new Date(b.date || "2024-01-01");
          return bDate.getTime() - aDate.getTime();
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, selectedType, sortBy, dateFilter, popularityFilter, bookmarkedItems]);

  // Handle bookmark toggle
  const toggleBookmark = (resourceId: number) => {
    setBookmarkedItems(prev => 
      prev.includes(resourceId) 
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId]
    );
    
    toast({
      title: bookmarkedItems.includes(resourceId) ? "Bookmark removed" : "Bookmark added",
      description: "You can find your bookmarks in the filters.",
    });
  };

  // Handle share functionality
  const handleShare = async (resource: any) => {
    const url = `${window.location.origin}/resources?type=${resource.type}&id=${resource.id}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: resource.title,
          text: resource.description,
          url: url
        });
      } catch (err) {
        // Fallback to copy to clipboard
        copyToClipboard(url);
      }
    } else {
      copyToClipboard(url);
    }
  };

  // Copy to clipboard functionality
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Link copied!",
        description: "Resource link copied to clipboard.",
      });
    });
  };

  // Handle download action
  const handleDownload = (resource: any) => {
    setDownloadModal({isOpen: true, resource});
    
    // Track download attempt
    console.log(`Download attempted: ${resource.title} (ID: ${resource.id})`);
  };

  // Handle webinar registration/access
  const handleWebinarAccess = (webinar: any) => {
    setWebinarModal({isOpen: true, webinar});
    
    // Track webinar access
    console.log(`Webinar access: ${webinar.title} (ID: ${webinar.id})`);
  };

  // Handle tool access
  const handleToolAccess = (tool: any) => {
    // Track tool access
    console.log(`Tool accessed: ${tool.title} (ID: ${tool.id})`);
    
    toast({
      title: "Accessing tool...",
      description: `Opening ${tool.title} in a new tab.`,
    });
    
    // For tools, we can directly navigate or show in new tab
    window.open(tool.accessUrl, '_blank');
  };

  // Handle newsletter subscription
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    setNewsletterMessage("");

    try {
      const response = await fetch("/api/forms?action=newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      const data = await response.json();

      if (data.success) {
        setNewsletterMessage("Successfully subscribed to newsletter!");
        setNewsletterEmail("");
      } else {
        setNewsletterMessage(data.message || "Failed to subscribe");
      }
    } catch (error) {
      setNewsletterMessage("An error occurred. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-48">
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
            
            {/* Search and Filters */}
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Search Bar */}
              <div className="max-w-md mx-auto relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <Input 
                  placeholder="Search resources..." 
                  className="pl-10 pr-4 py-3 text-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Enhanced Filters Row */}
              <div className="flex flex-wrap justify-center gap-3">
                {/* Type Filter */}
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-slate-600" />
                  <span className="text-sm font-medium text-slate-600">Type:</span>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="border border-slate-300 rounded-md px-3 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-500"
                  >
                    {types.map(type => (
                      <option key={type} value={type}>
                        {type === "all" ? "All Types" : type.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category Filter */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-600">Category:</span>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-slate-300 rounded-md px-3 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-600">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-slate-300 rounded-md px-3 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-500"
                  >
                    <option value="date-desc">Latest First</option>
                    <option value="title-asc">Title A-Z</option>
                    <option value="title-desc">Title Z-A</option>
                    <option value="category-asc">Category A-Z</option>
                    <option value="popularity-desc">Most Popular</option>
                  </select>
                </div>

                {/* Advanced Filters Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="text-slate-600"
                >
                  Advanced Filters
                  {showAdvancedFilters ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                </Button>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-1 border border-slate-300 rounded-md">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-l-md ${viewMode === "grid" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"}`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-r-md ${viewMode === "list" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Advanced Filters Panel */}
              {showAdvancedFilters && (
                <div className="bg-white p-6 rounded-lg border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Advanced Filters</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {/* Date Filter */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Date Range:</label>
                      <select
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-500"
                      >
                        <option value="all">All Time</option>
                        <option value="recent">Last 3 Months</option>
                        <option value="year">Last Year</option>
                      </select>
                    </div>

                    {/* Popularity Filter */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Popularity:</label>
                      <select
                        value={popularityFilter}
                        onChange={(e) => setPopularityFilter(e.target.value)}
                        className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-500"
                      >
                        <option value="all">All Levels</option>
                        <option value="high">High (1000+ views)</option>
                        <option value="medium">Medium (500-1000 views)</option>
                        <option value="low">Low (&lt;500 views)</option>
                      </select>
                    </div>

                    {/* Bookmarked Filter */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Show Only:</label>
                      <Button
                        variant={bookmarkedItems.length > 0 && selectedType === "bookmarked" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedType(selectedType === "bookmarked" ? "all" : "bookmarked")}
                        className="w-full"
                      >
                        <BookmarkCheck className="mr-2 h-4 w-4" />
                        Bookmarked Items ({bookmarkedItems.length})
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Clear Filters & Results */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <p className="text-sm text-slate-600">
                    Showing {filteredAndSortedResources.length} of {allResources.length} resources
                  </p>
                  {bookmarkedItems.length > 0 && (
                    <p className="text-sm text-slate-500">
                      • {bookmarkedItems.length} bookmarked
                    </p>
                  )}
                </div>
                
                {(selectedType !== "all" || selectedCategory !== "all" || searchTerm || dateFilter !== "all" || popularityFilter !== "all") && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedType("all");
                      setSelectedCategory("all");
                      setSearchTerm("");
                      setDateFilter("all");
                      setPopularityFilter("all");
                    }}
                    className="text-slate-600"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Clear all filters
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: FileText, label: "Whitepapers", count: WHITEPAPERS_DATA.length.toString(), type: "whitepaper" },
              { icon: Video, label: "Webinars", count: WEBINARS_DATA.length.toString(), type: "webinar" },
              { icon: BookOpen, label: "Case Studies", count: CASE_STUDIES_DATA.length.toString(), type: "case-study" },
              { icon: Download, label: "Tools", count: TOOLS_DATA.length.toString(), type: "tool" }
            ].map((category: any, index: number) => (
              <div 
                key={index} 
                className={`text-center p-6 border border-slate-200 rounded-lg hover:shadow-lg transition-all cursor-pointer ${
                  selectedType === category.type ? 'border-slate-900 bg-slate-50' : ''
                }`}
                onClick={() => setSelectedType(selectedType === category.type ? "all" : category.type)}
              >
                <category.icon className="h-8 w-8 text-slate-900 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900 mb-1">{category.label}</h3>
                <p className="text-slate-600">{category.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filtered Resources Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          {filteredAndSortedResources.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">No resources found</h2>
              <p className="text-slate-600 mb-6">Try adjusting your search terms or filters</p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedType("all");
                }}
                variant="outline"
              >
                Clear all filters
              </Button>
            </div>
          ) : (
            <div className="space-y-16">
              {/* Whitepapers */}
              {filteredAndSortedResources.some(r => r.type === "whitepaper") && (
                <div>
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                      Whitepapers
                    </h2>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                      In-depth research and insights on the latest technology trends and best practices.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAndSortedResources.filter(r => r.type === "whitepaper").map((paper: any) => (
                      <div key={paper.id} className="bg-white p-8 rounded-xl border border-slate-200 hover:shadow-lg transition-shadow relative">
                        {/* Bookmark and Share Actions */}
                        <div className="absolute top-4 right-4 flex gap-2">
                          <button
                            onClick={() => toggleBookmark(paper.id)}
                            className={`p-2 rounded-lg border transition-colors ${
                              bookmarkedItems.includes(paper.id) 
                                ? 'bg-slate-900 text-white border-slate-900' 
                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                            }`}
                            title={bookmarkedItems.includes(paper.id) ? "Remove bookmark" : "Add bookmark"}
                          >
                            {bookmarkedItems.includes(paper.id) ? 
                              <BookmarkCheck className="h-4 w-4" /> : 
                              <BookmarkPlus className="h-4 w-4" />
                            }
                          </button>
                          <button
                            onClick={() => handleShare(paper)}
                            className="p-2 rounded-lg border bg-white text-slate-600 border-slate-200 hover:bg-slate-50 transition-colors"
                            title="Share resource"
                          >
                            <Share2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mb-4 pr-20">
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
                        <Button 
                          className="w-full bg-slate-900 hover:bg-slate-800 text-white"
                          onClick={() => handleDownload(paper)}
                        >
                          Download PDF
                          <Download className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Webinars */}
              {filteredAndSortedResources.some(r => r.type === "webinar") && (
                <div>
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                      Expert Webinars
                    </h2>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                      Learn from our technology experts through live and recorded sessions.
                    </p>
                  </div>
                  <div className="space-y-6">
                    {filteredAndSortedResources.filter(r => r.type === "webinar").map((webinar: any) => (
                      <div key={webinar.id} className="bg-white rounded-xl border border-slate-200 shadow-lg relative">
                        {/* Bookmark and Share Actions */}
                        <div className="absolute top-4 right-4 flex gap-2 z-10">
                          <button
                            onClick={() => toggleBookmark(webinar.id)}
                            className={`p-2 rounded-lg border transition-colors ${
                              bookmarkedItems.includes(webinar.id) 
                                ? 'bg-slate-900 text-white border-slate-900' 
                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                            }`}
                            title={bookmarkedItems.includes(webinar.id) ? "Remove bookmark" : "Add bookmark"}
                          >
                            {bookmarkedItems.includes(webinar.id) ? 
                              <BookmarkCheck className="h-4 w-4" /> : 
                              <BookmarkPlus className="h-4 w-4" />
                            }
                          </button>
                          <button
                            onClick={() => handleShare(webinar)}
                            className="p-2 rounded-lg border bg-white text-slate-600 border-slate-200 hover:bg-slate-50 transition-colors"
                            title="Share resource"
                          >
                            <Share2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="grid md:grid-cols-4 gap-0">
                          <div className="md:col-span-3 p-6 pr-20">
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
                            <Button 
                              className="w-full bg-slate-900 hover:bg-slate-800 text-white"
                              onClick={() => handleWebinarAccess(webinar)}
                            >
                              {webinar.status === 'upcoming' ? 'Register Now' : 'Watch Recording'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Case Studies */}
              {filteredAndSortedResources.some(r => r.type === "case-study") && (
                <div>
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                      Success Stories
                    </h2>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                      Real-world examples of how we've helped organizations transform their operations.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAndSortedResources.filter(r => r.type === "case-study").map((study: any) => (
                      <div key={study.id} className="bg-white p-8 rounded-xl border border-slate-200 hover:shadow-lg transition-shadow relative">
                        {/* Bookmark and Share Actions */}
                        <div className="absolute top-4 right-4 flex gap-2">
                          <button
                            onClick={() => toggleBookmark(study.id)}
                            className={`p-2 rounded-lg border transition-colors ${
                              bookmarkedItems.includes(study.id) 
                                ? 'bg-slate-900 text-white border-slate-900' 
                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                            }`}
                            title={bookmarkedItems.includes(study.id) ? "Remove bookmark" : "Add bookmark"}
                          >
                            {bookmarkedItems.includes(study.id) ? 
                              <BookmarkCheck className="h-4 w-4" /> : 
                              <BookmarkPlus className="h-4 w-4" />
                            }
                          </button>
                          <button
                            onClick={() => handleShare(study)}
                            className="p-2 rounded-lg border bg-white text-slate-600 border-slate-200 hover:bg-slate-50 transition-colors"
                            title="Share resource"
                          >
                            <Share2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mb-4 pr-20">
                          <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded border">{study.industry}</span>
                          <span className="text-sm text-slate-500">{study.readTime}</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-3">{study.title}</h3>
                        <p className="text-slate-600 mb-4">{study.description}</p>
                        
                        <div className="bg-slate-50 p-4 rounded-lg mb-4">
                          <p className="text-sm font-medium text-slate-900 mb-1">Key Results:</p>
                          <p className="text-sm text-slate-700">{study.results}</p>
                        </div>
                        
                        <div className="flex justify-between items-center text-sm text-slate-500 mb-4">
                          <span>{study.date}</span>
                        </div>
                        <Button 
                          className="w-full bg-slate-900 hover:bg-slate-800 text-white"
                          onClick={() => window.open(`/case-studies/${study.id}`, '_blank')}
                        >
                          Read Case Study
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tools */}
              {filteredAndSortedResources.some(r => r.type === "tool") && (
                <div>
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                      Free Tools & Resources
                    </h2>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                      Practical tools to help you assess, plan, and implement technology solutions.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredAndSortedResources.filter(r => r.type === "tool").map((tool: any) => (
                      <div key={tool.id} className="bg-white p-8 rounded-xl border border-slate-200 hover:shadow-lg transition-shadow cursor-pointer text-center relative">
                        {/* Bookmark and Share Actions */}
                        <div className="absolute top-4 right-4 flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBookmark(tool.id);
                            }}
                            className={`p-2 rounded-lg border transition-colors ${
                              bookmarkedItems.includes(tool.id) 
                                ? 'bg-slate-900 text-white border-slate-900' 
                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                            }`}
                            title={bookmarkedItems.includes(tool.id) ? "Remove bookmark" : "Add bookmark"}
                          >
                            {bookmarkedItems.includes(tool.id) ? 
                              <BookmarkCheck className="h-4 w-4" /> : 
                              <BookmarkPlus className="h-4 w-4" />
                            }
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare(tool);
                            }}
                            className="p-2 rounded-lg border bg-white text-slate-600 border-slate-200 hover:bg-slate-50 transition-colors"
                            title="Share resource"
                          >
                            <Share2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <tool.icon className="h-6 w-6 text-slate-900" />
                        </div>
                        <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded border mb-2 inline-block">{tool.category}</span>
                        <h3 className="text-lg font-bold text-slate-900 mb-3">{tool.title}</h3>
                        <p className="text-slate-600 text-center mb-4">{tool.description}</p>
                        <Button 
                          className="w-full bg-slate-900 hover:bg-slate-800 text-white"
                          onClick={() => handleToolAccess(tool)}
                        >
                          Access Tool
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
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
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
            <div className="flex gap-4 mb-4">
              <Input 
                placeholder="Enter your email" 
                className="flex-1 bg-white"
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
              />
              <Button 
                type="submit"
                className="bg-white text-slate-900 hover:bg-slate-100"
                disabled={isSubscribing}
              >
                {isSubscribing ? "..." : "Subscribe"}
              </Button>
            </div>
            {newsletterMessage && (
              <div className={`text-sm text-center p-2 rounded ${
                newsletterMessage.includes("Success") ? "text-green-300" : "text-red-300"
              }`}>
                {newsletterMessage}
              </div>
            )}
          </form>
          <p className="text-sm text-slate-400 mt-4">
            Join 5,000+ professionals already receiving our weekly insights
          </p>
        </div>
      </section>
      
      <Footer />
      
      {/* Modals */}
      <DownloadModal 
        isOpen={downloadModal.isOpen}
        onClose={() => setDownloadModal({isOpen: false, resource: null})}
        resource={downloadModal.resource}
      />
      
      <WebinarModal 
        isOpen={webinarModal.isOpen}
        onClose={() => setWebinarModal({isOpen: false, webinar: null})}
        webinar={webinarModal.webinar}
      />
    </div>
  );
}