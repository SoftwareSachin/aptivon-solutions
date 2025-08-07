import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  TrendingUp, 
  Clock, 
  Users, 
  DollarSign,
  ArrowRight,
  CheckCircle,
  Building2,
  Stethoscope,
  ShoppingCart,
  Factory,
  Search,
  Filter,
  BookmarkPlus,
  BookmarkCheck,
  Share2,
  Download,
  ExternalLink,
  Star,
  Copy,
  SortAsc,
  SortDesc,
  ChevronDown,
  ChevronUp,
  Eye,
  MessageSquare,
  FileText,
  BarChart3,
  Target,
  Award,
  Zap,
  Calendar,
  Mail,
  Phone,
  Globe,
  X
} from "lucide-react";

const CASE_STUDIES_DATA = [
    {
      id: 1,
      industry: "Healthcare",
      icon: Stethoscope,
      client: "Regional Medical Center",
      title: "Digital Transformation of Patient Care System",
      challenge: "A 500-bed hospital system was struggling with outdated patient management systems, causing long wait times and inefficient care delivery.",
      solution: "Implemented a comprehensive Electronic Health Records (EHR) system with integrated patient scheduling, real-time monitoring, and telemedicine capabilities.",
      results: [
        { metric: "Patient wait time reduction", value: "45%" },
        { metric: "Operational efficiency increase", value: "60%" },
        { metric: "Patient satisfaction score", value: "4.8/5" },
        { metric: "System uptime improvement", value: "99.9%" }
      ],
      technologies: ["React Native", "Node.js", "PostgreSQL", "AWS", "HL7 FHIR"],
      timeline: "8 months",
      testimonial: "Aptivon transformed our entire patient care workflow. The new system has dramatically improved our efficiency and patient outcomes.",
      clientRole: "Chief Technology Officer",
      roi: "280%",
      projectValue: "$2.3M",
      complexity: "High",
      region: "North America"
    },
    {
      id: 2,
      industry: "E-commerce",
      icon: ShoppingCart,
      client: "National Retail Chain",
      title: "AI-Powered E-commerce Platform Modernization",
      challenge: "Legacy e-commerce platform couldn't handle peak traffic loads and lacked personalization features, resulting in lost sales and poor customer experience.",
      solution: "Built a cloud-native e-commerce platform with AI-powered recommendations, real-time inventory management, and scalable infrastructure.",
      results: [
        { metric: "Online sales increase", value: "150%" },
        { metric: "Site performance improvement", value: "300%" },
        { metric: "Customer engagement boost", value: "85%" },
        { metric: "Conversion rate improvement", value: "75%" }
      ],
      technologies: ["React", "Python", "TensorFlow", "MongoDB", "Kubernetes"],
      timeline: "12 months",
      testimonial: "The new platform exceeded all our expectations. Our customers love the personalized experience, and our sales have skyrocketed.",
      clientRole: "VP of Digital Commerce",
      roi: "450%",
      projectValue: "$15M",
      complexity: "High",
      region: "Global"
    },
    {
      id: 3,
      industry: "Manufacturing",
      icon: Factory,
      client: "Automotive Parts Manufacturer",
      title: "Smart Factory IoT Implementation",
      challenge: "Production inefficiencies and equipment downtime were costing millions annually due to lack of real-time monitoring and predictive maintenance.",
      solution: "Deployed IoT sensors and analytics platform for predictive maintenance, quality control, and production optimization across three manufacturing facilities.",
      results: [
        { metric: "Production downtime reduction", value: "60%" },
        { metric: "Quality defects decrease", value: "40%" },
        { metric: "Energy cost savings", value: "25%" },
        { metric: "ROI achieved", value: "280%" }
      ],
      technologies: ["Azure IoT", "Power BI", "Python", "Machine Learning", "Edge Computing"],
      timeline: "10 months",
      testimonial: "This IoT solution revolutionized our manufacturing process. We can now predict and prevent issues before they impact production.",
      clientRole: "Head of Operations",
      roi: "280%",
      projectValue: "$5.2M",
      complexity: "High",
      region: "North America"
    },
    {
      id: 4,
      industry: "Financial Services",
      icon: Building2,
      client: "Community Bank",
      title: "Core Banking System Modernization",
      challenge: "Outdated mainframe system was limiting growth opportunities and customer service capabilities while increasing operational costs.",
      solution: "Migrated to modern cloud-based core banking system with enhanced security, real-time processing, and improved customer portal.",
      results: [
        { metric: "Transaction processing speed", value: "300%" },
        { metric: "Operational cost reduction", value: "35%" },
        { metric: "Customer satisfaction increase", value: "90%" },
        { metric: "New product launch time", value: "75% faster" }
      ],
      technologies: ["Java Spring", "PostgreSQL", "AWS", "React", "Microservices"],
      timeline: "14 months",
      testimonial: "The new banking system has positioned us for future growth. We can now offer innovative services that compete with larger banks.",
      clientRole: "Chief Information Officer",
      roi: "320%",
      projectValue: "$8.7M",
      complexity: "Very High",
      region: "North America"
    }
];

const METRICS_DATA = [
    { icon: TrendingUp, value: "250%", label: "Average ROI Delivered" },
    { icon: Clock, value: "40%", label: "Time-to-Market Improvement" },
    { icon: Users, value: "98%", label: "Client Satisfaction Rate" },
    { icon: DollarSign, value: "5+", label: "Projects Delivered" }
];

export default function CaseStudies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [sortBy, setSortBy] = useState("timeline-desc");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [bookmarkedItems, setBookmarkedItems] = useState<number[]>([]);
  const [roiFilter, setRoiFilter] = useState("all");
  const [timelineFilter, setTimelineFilter] = useState("all");
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState<any>(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    studyInterest: ""
  });
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const { toast } = useToast();
  
  const industries = ["All", "Healthcare", "E-commerce", "Manufacturing", "Financial Services"];

  // Load bookmarks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('aptivon-bookmarked-case-studies');
    if (saved) {
      setBookmarkedItems(JSON.parse(saved));
    }
  }, []);

  // Save bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem('aptivon-bookmarked-case-studies', JSON.stringify(bookmarkedItems));
  }, [bookmarkedItems]);

  // Enhanced filtering and sorting
  const filteredAndSortedCaseStudies = useMemo(() => {
    let filtered = CASE_STUDIES_DATA.filter(study => {
      const matchesSearch = study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           study.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           study.challenge.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           study.solution.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesIndustry = selectedIndustry === "All" || study.industry === selectedIndustry;
      
      // ROI filtering (including bookmarked filter)
      const matchesROI = roiFilter === "all" ? true :
                        roiFilter === "bookmarked" ? bookmarkedItems.includes(study.id) :
                        (() => {
                          const roiValue = study.roi || study.results.find(r => 
                            r.metric.toLowerCase().includes('roi') || 
                            r.value.includes('$') || 
                            r.value.includes('%')
                          )?.value || "0%";
                          const numericROI = parseInt(roiValue.replace(/[^\d]/g, ''));
                          
                          switch(roiFilter) {
                            case "high": return numericROI > 200;
                            case "medium": return numericROI >= 100 && numericROI <= 200;
                            case "low": return numericROI < 100;
                            default: return true;
                          }
                        })();

      // Timeline filtering
      const matchesTimeline = timelineFilter === "all" || (() => {
        const months = parseInt(study.timeline.replace(/[^\d]/g, ''));
        switch(timelineFilter) {
          case "short": return months <= 6;
          case "medium": return months > 6 && months <= 12;
          case "long": return months > 12;
          default: return true;
        }
      })();
      
      return matchesSearch && matchesIndustry && matchesROI && matchesTimeline;
    });

    // Sorting
    filtered.sort((a, b) => {
      switch(sortBy) {
        case "client-asc": return a.client.localeCompare(b.client);
        case "client-desc": return b.client.localeCompare(a.client);
        case "industry-asc": return a.industry.localeCompare(b.industry);
        case "industry-desc": return b.industry.localeCompare(a.industry);
        case "timeline-asc": 
          return parseInt(a.timeline.replace(/[^\d]/g, '')) - parseInt(b.timeline.replace(/[^\d]/g, ''));
        case "timeline-desc":
        default:
          return parseInt(b.timeline.replace(/[^\d]/g, '')) - parseInt(a.timeline.replace(/[^\d]/g, ''));
      }
    });

    return filtered;
  }, [searchTerm, selectedIndustry, sortBy, roiFilter, timelineFilter]);

  // Interactive functions
  const toggleBookmark = (studyId: number) => {
    setBookmarkedItems(prev => 
      prev.includes(studyId) 
        ? prev.filter(id => id !== studyId)
        : [...prev, studyId]
    );
    
    toast({
      title: bookmarkedItems.includes(studyId) ? "Bookmark removed" : "Bookmark added",
      description: "Manage your bookmarks in the advanced filters.",
    });
  };

  const handleShare = async (study: any) => {
    const url = `${window.location.origin}/case-studies?id=${study.id}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: study.title,
          text: `${study.client}: ${study.title}`,
          url: url
        });
      } catch (err) {
        copyToClipboard(url, study.title);
      }
    } else {
      copyToClipboard(url, study.title);
    }
  };

  const copyToClipboard = (text: string, title: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Link copied!",
        description: `Case study "${title}" link copied to clipboard.`,
      });
    });
  };

  const requestSimilarProject = (study: any) => {
    setSelectedStudy(study);
    setContactForm(prev => ({
      ...prev,
      studyInterest: `${study.client} - ${study.title}`,
      message: `I'm interested in a similar project to your ${study.industry} case study with ${study.client}. Please contact me to discuss our requirements.`
    }));
    setShowContactModal(true);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingContact(true);

    try {
      const response = await fetch("/api/forms?action=contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...contactForm,
          type: "case-study-inquiry",
          source: "case-studies-page"
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Request submitted successfully!",
          description: "We'll contact you within 24 hours to discuss your project.",
        });
        setShowContactModal(false);
        setContactForm({
          name: "",
          email: "",
          company: "",
          phone: "",
          message: "",
          studyInterest: ""
        });
      } else {
        toast({
          title: "Error submitting request",
          description: data.message || "Please try again later.",
        });
      }
    } catch (error) {
      toast({
        title: "Error submitting request",
        description: "Please try again later.",
      });
    } finally {
      setIsSubmittingContact(false);
    }
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
              Real Results from Real Clients
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Discover how we've helped businesses across industries achieve digital transformation 
              and drive measurable growth through innovative technology solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Track Record</h2>
            <p className="text-lg text-slate-600">Proven results across all our client engagements</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {METRICS_DATA.map((metric: any, index: number) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <metric.icon className="h-8 w-8 text-slate-900" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">{metric.value}</div>
                <div className="text-slate-600">{metric.label}</div>
              </div>
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
                placeholder="Search case studies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {industries.map((industry) => (
                <Button
                  key={industry}
                  variant={selectedIndustry === industry ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedIndustry(industry)}
                  className="text-sm"
                >
                  {industry}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Advanced Filters */}
          <div className="mt-6">
            <Button
              variant="outline"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Advanced Filters
              {showAdvancedFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            
            {showAdvancedFilters && (
              <div className="mt-4 p-6 bg-slate-50 rounded-lg border">
                <div className="grid md:grid-cols-4 gap-4">
                  {/* Sort Options */}
                  <div>
                    <label className="text-sm font-medium text-slate-900 mb-2 block">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm"
                    >
                      <option value="timeline-desc">Timeline (Latest First)</option>
                      <option value="timeline-asc">Timeline (Oldest First)</option>
                      <option value="client-asc">Client (A-Z)</option>
                      <option value="client-desc">Client (Z-A)</option>
                      <option value="industry-asc">Industry (A-Z)</option>
                      <option value="industry-desc">Industry (Z-A)</option>
                    </select>
                  </div>
                  
                  {/* ROI Filter */}
                  <div>
                    <label className="text-sm font-medium text-slate-900 mb-2 block">ROI Range</label>
                    <select
                      value={roiFilter}
                      onChange={(e) => setRoiFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm"
                    >
                      <option value="all">All ROI</option>
                      <option value="high">High (200%+)</option>
                      <option value="medium">Medium (100-200%)</option>
                      <option value="low">Low (&lt;100%)</option>
                    </select>
                  </div>
                  
                  {/* Timeline Filter */}
                  <div>
                    <label className="text-sm font-medium text-slate-900 mb-2 block">Project Duration</label>
                    <select
                      value={timelineFilter}
                      onChange={(e) => setTimelineFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm"
                    >
                      <option value="all">All Durations</option>
                      <option value="short">Short (≤6 months)</option>
                      <option value="medium">Medium (6-12 months)</option>
                      <option value="long">Long (12+ months)</option>
                    </select>
                  </div>
                  
                  {/* Bookmarks Filter */}
                  <div>
                    <label className="text-sm font-medium text-slate-900 mb-2 block">Show</label>
                    <div className="flex gap-2">
                      <Button
                        variant={bookmarkedItems.length > 0 ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          // Toggle between showing all and showing only bookmarked
                          if (roiFilter === "bookmarked") {
                            setRoiFilter("all");
                          } else {
                            setRoiFilter("bookmarked");
                          }
                        }}
                        className="flex items-center gap-1 text-xs"
                      >
                        <BookmarkCheck className="h-3 w-3" />
                        Bookmarked ({bookmarkedItems.length})
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Clear Filters */}
                <div className="mt-4 pt-4 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedIndustry("All");
                      setSortBy("timeline-desc");
                      setRoiFilter("all");
                      setTimelineFilter("all");
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 text-sm text-slate-600">
            Showing {filteredAndSortedCaseStudies.length} of {CASE_STUDIES_DATA.length} case studies
            {bookmarkedItems.length > 0 && (
              <span className="ml-2 text-slate-500">
                • {bookmarkedItems.length} bookmarked
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Client Success Stories
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              See how our technology solutions have transformed businesses and delivered 
              exceptional results across different industries.
            </p>
          </div>

          {filteredAndSortedCaseStudies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 mb-4">No case studies found matching your criteria.</p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedIndustry("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="space-y-16">
              {filteredAndSortedCaseStudies.map((study: any, index: number) => (
                <div key={index} className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden relative">
                  {/* Bookmark and Share Actions */}
                  <div className="absolute top-4 right-4 flex gap-2 z-10">
                    <button
                      onClick={() => toggleBookmark(study.id)}
                      className={`p-2 rounded-lg border transition-colors ${
                        bookmarkedItems.includes(study.id) 
                          ? 'bg-slate-900 text-white border-slate-900' 
                          : 'bg-white/90 text-slate-600 border-slate-200 hover:bg-white'
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
                      className="p-2 rounded-lg border bg-white/90 text-slate-600 border-slate-200 hover:bg-white transition-colors"
                      title="Share case study"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-0">
                    {/* Left Column - Overview */}
                    <div className="lg:col-span-1 bg-slate-900 text-white p-8 pr-20">
                      <div className="flex items-center mb-4">
                        <study.icon className="h-8 w-8 mr-3" />
                        <span className="bg-white/20 text-white px-2 py-1 rounded text-sm">
                          {study.industry}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{study.client}</h3>
                      <h4 className="text-lg mb-4 text-slate-300">{study.title}</h4>
                      
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-semibold mb-2">Timeline</h5>
                          <p className="text-slate-300">{study.timeline}</p>
                        </div>
                        

                        
                        <div>
                          <h5 className="font-semibold mb-2">ROI Achieved</h5>
                          <p className="text-green-300 font-bold">{study.roi}</p>
                        </div>
                        
                        <div>
                          <h5 className="font-semibold mb-2">Technologies</h5>
                          <div className="flex flex-wrap gap-1">
                            {study.technologies.map((tech: string, idx: number) => (
                              <span key={idx} className="border border-white/30 text-white text-xs px-2 py-1 rounded">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Details */}
                    <div className="lg:col-span-2 p-8">
                      <div className="space-y-6">
                        <div>
                          <h5 className="font-semibold text-slate-900 mb-2">Challenge</h5>
                          <p className="text-slate-600">{study.challenge}</p>
                        </div>

                        <div>
                          <h5 className="font-semibold text-slate-900 mb-2">Solution</h5>
                          <p className="text-slate-600">{study.solution}</p>
                        </div>

                        <div>
                          <h5 className="font-semibold text-slate-900 mb-4">Results Achieved</h5>
                          <div className="grid grid-cols-2 gap-4">
                            {study.results.map((result: any, idx: number) => (
                              <div key={idx} className="bg-slate-50 p-4 rounded-lg border-l-4 border-slate-900">
                                <div className="text-2xl font-bold text-slate-900">{result.value}</div>
                                <div className="text-sm text-slate-600">{result.metric}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-slate-900">
                          <p className="text-slate-700 italic mb-3">"{study.testimonial}"</p>
                          <p className="text-sm font-semibold text-slate-900">- {study.clientRole}, {study.client}</p>
                        </div>

                        <div className="pt-4 border-t">
                          <div className="flex gap-2">
                            <Button 
                              className="flex-1"
                              onClick={() => requestSimilarProject(study)}
                            >
                              <Mail className="h-4 w-4 mr-2" />
                              Request Similar Project
                            </Button>
                            <Button 
                              variant="outline"
                              size="icon"
                              onClick={() => window.open(`/case-studies/${study.id}`, '_blank')}
                              title="View full case study"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Proven Success Methodology
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              Every success story follows our systematic approach to digital transformation.
            </p>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Strategic Assessment",
                  description: "Deep dive into business challenges and opportunities"
                },
                {
                  step: "02",
                  title: "Solution Design",
                  description: "Custom architecture tailored to your specific needs"
                },
                {
                  step: "03",
                  title: "Agile Implementation",
                  description: "Iterative development with continuous feedback"
                },
                {
                  step: "04",
                  title: "Optimization & Scale",
                  description: "Ongoing enhancement and performance optimization"
                }
              ].map((process, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {process.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{process.title}</h3>
                  <p className="text-gray-600">{process.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Industries We Transform
          </h2>
          <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto">
            Our proven methodologies work across diverse industries, delivering measurable results for businesses of all sizes.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Healthcare", icon: "🏥" },
              { name: "Financial Services", icon: "🏦" },
              { name: "E-commerce", icon: "🛒" },
              { name: "Manufacturing", icon: "🏭" },
              { name: "Education", icon: "🎓" },
              { name: "Logistics", icon: "🚛" },
              { name: "Real Estate", icon: "🏢" },
              { name: "Media & Entertainment", icon: "📺" }
            ].map((industry, index) => (
              <div key={index} className="text-center p-6 bg-slate-50 rounded-lg border hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">{industry.icon}</div>
                <h3 className="font-semibold text-slate-900">{industry.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Request Similar Project</h3>
                {selectedStudy && (
                  <p className="text-slate-600 mt-1">
                    Interested in: {selectedStudy.client} - {selectedStudy.title}
                  </p>
                )}
              </div>
              <button
                onClick={() => setShowContactModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Your full name"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your.email@company.com"
                    className="w-full"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Company *
                  </label>
                  <Input
                    type="text"
                    required
                    value={contactForm.company}
                    onChange={(e) => setContactForm(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="Your company name"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1 (555) 123-4567"
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Project Requirements *
                </label>
                <textarea
                  required
                  value={contactForm.message}
                  onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  placeholder="Tell us about your project requirements, timeline, and how we can help..."
                />
              </div>

              {selectedStudy && (
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-medium text-slate-900 mb-2">Case Study of Interest:</h4>
                  <div className="text-sm text-slate-600">
                    <p><strong>Client:</strong> {selectedStudy.client}</p>
                    <p><strong>Project:</strong> {selectedStudy.title}</p>
                    <p><strong>Industry:</strong> {selectedStudy.industry}</p>
                    <p><strong>Timeline:</strong> {selectedStudy.timeline}</p>
                    <p><strong>ROI Achieved:</strong> {selectedStudy.roi}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowContactModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmittingContact}
                  className="flex-1 bg-slate-900 hover:bg-slate-800"
                >
                  {isSubmittingContact ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Send Request
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}