import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { MapPin, Clock, Users, Briefcase, Heart, Star, Code, Coffee, Search, X, Upload } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import teamCollaborationVideo from "@/assets/team-collaboration-video.mp4";
import teamImage from "@/assets/image_1755017151417.png";

export default function Careers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [applicationData, setApplicationData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    coverLetter: "",
    resume: null as File | null
  });
  
  // Animation states
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [loadingProgress, setLoadingProgress] = useState(0);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  const { toast } = useToast();

  const openPositions = [
    {
      title: "Client Acquisition Specialist",
      department: "Sales",
      location: "Remote / Hybrid",
      type: "Full-time",
      experience: "Freshers Welcome",
      description: "Join our growing team as a Client Acquisition Specialist and learn to build relationships with potential enterprise clients. This role offers comprehensive training in sales methodology, CRM systems, and client relationship management. You'll work directly with our leadership team to prospect new business opportunities, conduct initial client meetings, and support the sales process from lead generation to deal closure.",
      responsibilities: [
        "Identify and research potential enterprise clients in target industries",
        "Conduct outbound prospecting through calls, emails, and LinkedIn outreach", 
        "Schedule and participate in initial client discovery meetings",
        "Maintain accurate records of all client interactions in CRM system",
        "Support senior sales team with proposal preparation and client presentations",
        "Follow up with prospects and nurture long-term relationships",
        "Attend industry events and networking functions to generate leads",
        "Collaborate with marketing team on lead generation campaigns"
      ],
      requirements: [
        "Bachelor's degree in Business, Marketing, Sales, or related field",
        "Excellent communication and interpersonal skills",
        "Strong interest in technology and digital transformation",
        "Willingness to learn CRM systems (HubSpot, Salesforce) and sales automation tools",
        "Positive attitude with eagerness to learn and grow in sales career",
        "Professional phone presence and email communication skills",
        "Basic understanding of B2B sales processes preferred but not required",
        "Ability to work independently and as part of a collaborative team"
      ],
      skills: ["Communication", "Lead Generation", "CRM Management", "Client Outreach", "Relationship Building", "Sales Prospecting", "Market Research", "Data Analysis"],
      compensation: {
        base: "Competitive base salary",
        commission: "10% commission on each project",
        bonus: "2% performance bonus on each project"
      }
    }
  ];

  // Filter and search logic
  const filteredPositions = useMemo(() => {
    return openPositions.filter(position => {
      const matchesSearch = position.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          position.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          position.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesDepartment = departmentFilter === "all" || position.department === departmentFilter;
      const matchesLocation = locationFilter === "all" || position.location === locationFilter;
      
      return matchesSearch && matchesDepartment && matchesLocation;
    });
  }, [searchTerm, departmentFilter, locationFilter]);

  // Get unique departments and locations for filters
  const departments = ["all", ...Array.from(new Set(openPositions.map(pos => pos.department)))];
  const locations = ["all", ...Array.from(new Set(openPositions.map(pos => pos.location)))];

  // Handle application submission
  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!applicationData.fullName || !applicationData.email || !applicationData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (Name, Email, Phone).",
        variant: "destructive"
      });
      return;
    }

    try {
      // Submit application to API
      const response = await fetch('/api/forms?action=job-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: applicationData.fullName,
          email: applicationData.email,
          phone: applicationData.phone,
          experience: applicationData.experience || 'Fresher/Entry Level',
          coverLetter: applicationData.coverLetter,
          position: selectedJob?.title,
          department: selectedJob?.department,
          location: selectedJob?.location,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Application Submitted!",
          description: result.message,
        });
        
        // Reset form
        setApplicationData({
          fullName: "",
          email: "",
          phone: "",
          experience: "",
          coverLetter: "",
          resume: null
        });
        setSelectedJob(null);
        setIsDialogOpen(false);
      } else {
        throw new Error(result.message || 'Failed to submit application');
      }
    } catch (error: any) {
      console.error('Error submitting application:', error);
      let errorMessage = "There was an error submitting your application. Please try again.";
      
      if (error.message?.includes('Failed to fetch')) {
        errorMessage = "Network error. Please check your connection and try again.";
      } else if (error.message?.includes('500')) {
        errorMessage = "Server error. Please try again later or contact support.";
      } else if (error.message?.includes('400')) {
        errorMessage = "Invalid form data. Please check your information and try again.";
      }
      
      toast({
        title: "Submission Failed", 
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File Too Large",
          description: "Please upload a file smaller than 5MB.",
          variant: "destructive"
        });
        return;
      }
      setApplicationData(prev => ({ ...prev, resume: file }));
    }
  };

  // Scroll to positions
  const scrollToPositions = () => {
    document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Animation and scroll detection
  const setElementRef = useCallback((element: HTMLElement | null, sectionId: string) => {
    sectionRefs.current[sectionId] = element;
  }, []);

  useEffect(() => {
    // Simulate loading progress for dynamic feel
    const timer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Intersection Observer for scroll-triggered animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
            setVisibleSections(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: [0.1, 0.3, 0.5], rootMargin: '-50px 0px' }
    );

    Object.values(sectionRefs.current).forEach(element => {
      if (element) observerRef.current?.observe(element);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const isVisible = (sectionId: string) => visibleSections.has(sectionId);

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive medical, dental, and vision insurance plus wellness programs"
    },
    {
      icon: Star,
      title: "Professional Growth",
      description: "Annual learning budget, conference attendance, and certification support"
    },
    {
      icon: Coffee,
      title: "Work-Life Balance",
      description: "Flexible working hours, unlimited PTO, and remote work options"
    },
    {
      icon: Users,
      title: "Collaborative Culture",
      description: "Inclusive environment with team building events and mentorship programs"
    },
    {
      icon: Code,
      title: "Cutting-Edge Tech",
      description: "Work with latest technologies and contribute to open source projects"
    },
    {
      icon: Briefcase,
      title: "Competitive Package",
      description: "Market-competitive salary, equity options, and performance bonuses"
    }
  ];

  const companyValues = [
    {
      title: "Innovation First",
      description: "We encourage creative thinking and provide resources to turn ideas into reality."
    },
    {
      title: "Continuous Learning",
      description: "Growth mindset with ongoing education, training, and skill development opportunities."
    },
    {
      title: "Work-Life Integration",
      description: "Flexible schedules and remote work options to support personal and professional goals."
    },
    {
      title: "Diversity & Inclusion",
      description: "Building diverse teams and fostering an inclusive environment where everyone thrives."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Dynamic Loading Progress Bar */}
      {loadingProgress < 100 && (
        <div className="fixed top-0 left-0 w-full h-1 bg-slate-100 z-50">
          <div 
            className="h-full bg-gradient-to-r from-slate-900 via-slate-600 to-slate-900 transition-all duration-300"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
      )}
      
      <Navigation />
      {/* Navigation Spacer */}
      <div className="h-16 sm:h-20 lg:h-24 xl:h-32"></div>
      
      {/* Hero Section */}
      <section 
        id="hero-section"
        ref={(el) => setElementRef(el, 'hero-section')}
        className="pt-16 sm:pt-24 lg:pt-32 xl:pt-40 pb-20 sm:pb-32 lg:pb-40 bg-gradient-to-b from-white to-slate-50/30 relative overflow-hidden animate-fadeInUp"
      >
        <div className="absolute inset-0 opacity-40">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="5" cy="5" r="0.5" fill="#e2e8f0" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative">
          <div className="text-center">
            <div className="inline-flex items-center px-4 sm:px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-full text-xs sm:text-sm font-medium mb-8 shadow-sm hover:shadow-md transition-shadow">
              <Briefcase className="w-4 h-4 mr-2 text-slate-500" />
              <span className="font-semibold">Now Hiring</span>
              <span className="mx-2 text-slate-400">•</span>
              <span>Multiple Positions Available</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-slate-900 mb-8 leading-tight tracking-tight animate-fadeInUp animation-delay-200 px-4">
              Shape the Future of
              <span className="block bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent animate-shimmer">Enterprise Technology</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-600 max-w-6xl mx-auto leading-relaxed mb-16 font-light animate-fadeInUp animation-delay-400 px-4">
              Join a dynamic team where innovation meets opportunity. Build your career with comprehensive training, 
              industry-leading mentorship, and unlimited growth potential in cutting-edge technology solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-20 animate-fadeInUp animation-delay-600 px-4">
              <Button 
                onClick={scrollToPositions}
                className="bg-slate-900 hover:bg-slate-800 text-white px-8 sm:px-12 lg:px-16 py-4 sm:py-5 lg:py-6 text-lg sm:text-xl lg:text-2xl font-semibold rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-slate-900/25 transform hover:-translate-y-1 min-w-[300px] sm:min-w-[350px] lg:min-w-[400px]"
              >
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 mr-3" />
                Explore Career Opportunities
              </Button>
            </div>
            
            {/* Professional Video Showcase */}
            <div className="max-w-7xl mx-auto">
              <div className="relative bg-white rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl shadow-slate-900/10 border border-slate-100">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-transparent rounded-3xl"></div>
                <div className="relative">
                  <video 
                    className="w-full h-auto rounded-2xl shadow-2xl"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls={false}
                  >
                    <source src={teamCollaborationVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-slate-900/20 via-transparent to-transparent"></div>
                </div>
              </div>
              <div className="text-center mt-8">
                <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
                  Experience the dynamic, collaborative environment where innovation meets opportunity. 
                  At Aptivon Solutions, every day brings new challenges and growth opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section 
        id="company-culture" 
        ref={(el) => setElementRef(el, 'company-culture')}
        className={`py-20 sm:py-32 lg:py-40 bg-white relative overflow-hidden transition-all duration-1000 transform ${
          isVisible('company-culture') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-transparent to-transparent"></div>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative">
          <div className="text-center mb-16 sm:mb-20 lg:mb-24">
            <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-slate-100 text-slate-700 rounded-full text-sm sm:text-base font-medium mb-6 sm:mb-8">
              <Star className="w-4 h-4 mr-2" />
              Company Culture
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 mb-6 sm:mb-8 tracking-tight px-4">
              Why Top Talent Chooses
              <span className="block bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">Aptivon Solutions</span>
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-slate-600 max-w-6xl mx-auto leading-relaxed font-light px-4">
              Join a community of exceptional professionals dedicated to innovation, continuous growth, 
              and making a meaningful impact in the future of enterprise technology solutions.
            </p>
          </div>
          
          {/* Team Collaboration Image */}
          <div className="mb-16">
            <div className="bg-white rounded-3xl p-2 shadow-sm max-w-4xl mx-auto">
              <img 
                src={teamImage}
                alt="Team collaboration at Aptivon Solutions - diverse professionals working together in a modern office environment"
                className="w-full h-auto rounded-2xl object-cover"
              />
            </div>
            <div className="text-center mt-6">
              <p className="text-slate-600 text-sm italic max-w-2xl mx-auto">
                Our collaborative work environment fosters innovation and professional growth, where every team member contributes to our shared success
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 mb-16 sm:mb-20 lg:mb-24">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className={`group bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 hover:-translate-y-2 border border-slate-100 transform ${
                  isVisible('company-culture') 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-8 opacity-0'
                }`}
                style={{ 
                  transitionDelay: isVisible('company-culture') ? `${index * 150}ms` : '0ms' 
                }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-slate-900 to-slate-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-slate-700 transition-colors">{benefit.title}</h3>
                <p className="text-slate-600 leading-relaxed text-lg">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Company Values */}
          <div className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-12 md:p-16 shadow-xl border border-slate-100">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Core Values</h3>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                The principles that guide our work, relationships, and commitment to excellence
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {companyValues.map((value, index) => (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-white shadow-lg rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 border border-slate-100">
                    <div className="w-4 h-4 bg-gradient-to-br from-slate-900 to-slate-700 rounded-full"></div>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-slate-700 transition-colors">{value.title}</h4>
                  <p className="text-slate-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section 
        id="open-positions" 
        ref={(el) => setElementRef(el, 'open-positions')}
        className={`py-32 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden transition-all duration-1000 transform ${
          isVisible('open-positions') ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}
      >
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
            <defs>
              <pattern id="positions-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="#e2e8f0" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#positions-grid)" />
          </svg>
        </div>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative">
          <div className="text-center mb-16 sm:mb-20 lg:mb-24">
            <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-white border border-slate-200 text-slate-700 rounded-full text-sm sm:text-base font-medium mb-6 sm:mb-8 shadow-sm">
              <Briefcase className="w-4 h-4 mr-2" />
              Open Positions
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 mb-6 sm:mb-8 tracking-tight px-4">
              Your Next Career
              <span className="block bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">Opportunity Awaits</span>
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-slate-600 max-w-6xl mx-auto leading-relaxed font-light px-4">
              Start your career journey with comprehensive training, industry-leading mentorship, 
              competitive compensation, and unlimited growth potential in cutting-edge technology.
            </p>
          </div>

          {/* Search and Filter Controls */}
          <div className={`bg-white p-8 rounded-3xl shadow-xl border border-slate-100 mb-16 transition-all duration-700 transform ${
            isVisible('open-positions') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6" />
                  <Input
                    placeholder="Search positions, departments, or skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-14 h-14 bg-slate-50 border-slate-200 rounded-2xl focus:ring-2 focus:ring-slate-900 focus:border-transparent text-lg font-medium transition-all duration-200"
                  />
                </div>
              </div>
              
              <div>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="h-12 bg-white border-slate-200 rounded-xl">
                    <SelectValue placeholder="All Departments" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>
                        {dept === "all" ? "All Departments" : dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="h-12 bg-white border-slate-200 rounded-xl">
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map(loc => (
                      <SelectItem key={loc} value={loc}>
                        {loc === "all" ? "All Locations" : loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {(searchTerm || departmentFilter !== "all" || locationFilter !== "all") && (
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-200">
                <p className="text-sm text-slate-600 font-medium">
                  {filteredPositions.length} of {openPositions.length} positions match your criteria
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchTerm("");
                    setDepartmentFilter("all");
                    setLocationFilter("all");
                  }}
                  className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
          
          {filteredPositions.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-2xl">
              <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No matching positions</h3>
              <p className="text-slate-600 max-w-md mx-auto">Try adjusting your search criteria or check back later for new opportunities.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredPositions.map((position, index) => (
                <Card key={index} className="bg-white border-0 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-8 border-b border-slate-100">
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center">
                              <Briefcase className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold text-slate-900">{position.title}</h3>
                              <Badge variant="secondary" className="mt-1 bg-slate-100 text-slate-700 hover:bg-slate-100">
                                {position.department}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center gap-2 text-slate-600">
                              <MapPin className="w-4 h-4 text-slate-400" />
                              <span className="text-sm font-medium">{position.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                              <Clock className="w-4 h-4 text-slate-400" />
                              <span className="text-sm font-medium">{position.type}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                              <Users className="w-4 h-4 text-slate-400" />
                              <span className="text-sm font-medium">{position.experience}</span>
                            </div>
                          </div>
                          
                          <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">{position.description}</p>
                          
                          <div className="flex flex-wrap gap-2">
                            {position.skills.slice(0, 4).map((skill, skillIndex) => (
                              <Badge key={skillIndex} variant="outline" className="text-xs border-slate-200 text-slate-600">
                                {skill}
                              </Badge>
                            ))}
                            {position.skills.length > 4 && (
                              <Badge variant="outline" className="text-xs border-slate-200 text-slate-600">
                                +{position.skills.length - 4} more
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="mt-6 lg:mt-0 lg:ml-6 lg:flex-shrink-0">
                          <Dialog open={isDialogOpen && selectedJob?.title === position.title} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                              <Button 
                                onClick={() => {
                                  setSelectedJob(position);
                                  setIsDialogOpen(true);
                                }}
                                className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-md"
                              >
                                Apply Now
                              </Button>
                            </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-2xl">Apply for {position.title}</DialogTitle>
                            </DialogHeader>
                            
                            <form onSubmit={handleApplicationSubmit} className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="fullName">Full Name *</Label>
                                  <Input
                                    id="fullName"
                                    value={applicationData.fullName}
                                    onChange={(e) => setApplicationData(prev => ({ ...prev, fullName: e.target.value }))}
                                    placeholder="Enter your full name"
                                    required
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <Label htmlFor="email">Email Address *</Label>
                                  <Input
                                    id="email"
                                    type="email"
                                    value={applicationData.email}
                                    onChange={(e) => setApplicationData(prev => ({ ...prev, email: e.target.value }))}
                                    placeholder="Enter your email"
                                    required
                                  />
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="phone">Phone Number *</Label>
                                  <Input
                                    id="phone"
                                    value={applicationData.phone}
                                    onChange={(e) => setApplicationData(prev => ({ ...prev, phone: e.target.value }))}
                                    placeholder="Enter your phone number"
                                    required
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <Label htmlFor="experience">Experience Level (Optional)</Label>
                                  <Input
                                    id="experience"
                                    value={applicationData.experience}
                                    onChange={(e) => setApplicationData(prev => ({ ...prev, experience: e.target.value }))}
                                    placeholder="e.g., Fresher, 2 years, etc."
                                  />
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="resume">Resume/CV</Label>
                                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                                  <input
                                    type="file"
                                    id="resume"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                  />
                                  <Label htmlFor="resume" className="cursor-pointer">
                                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                                    <p className="text-sm text-slate-600">
                                      {applicationData.resume ? 
                                        `Selected: ${applicationData.resume.name}` :
                                        "Click to upload your resume (PDF, DOC, DOCX - Max 5MB)"
                                      }
                                    </p>
                                  </Label>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="coverLetter">Cover Letter (Optional)</Label>
                                <Textarea
                                  id="coverLetter"
                                  value={applicationData.coverLetter}
                                  onChange={(e) => setApplicationData(prev => ({ ...prev, coverLetter: e.target.value }))}
                                  placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                                  rows={4}
                                />
                              </div>
                              
                              <div className="flex gap-4 justify-end">
                                <Button 
                                  type="button" 
                                  variant="outline"
                                  onClick={() => setIsDialogOpen(false)}
                                >
                                  Cancel
                                </Button>
                                <Button type="submit" className="bg-slate-900 hover:bg-slate-800">
                                  Submit Application
                                </Button>
                              </div>
                            </form>
                          </DialogContent>
                        </Dialog>
                        </div>
                      </div>
                    </div>
                    
                    {/* Job Details Section */}
                    <div className="p-8">
                      <div className="space-y-8">
                        {/* Responsibilities Section */}
                        {position.responsibilities && (
                          <div>
                            <h4 className="text-lg font-semibold text-slate-900 mb-4">Key Responsibilities</h4>
                            <ul className="space-y-3">
                              {position.responsibilities.map((resp, idx) => (
                                <li key={idx} className="flex items-start">
                                  <div className="w-2 h-2 bg-slate-900 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                  <span className="text-slate-600 leading-relaxed">{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          <div>
                            <h4 className="text-lg font-semibold text-slate-900 mb-4">Requirements</h4>
                            <ul className="space-y-3">
                              {position.requirements.map((req, idx) => (
                                <li key={idx} className="flex items-start">
                                  <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                  <span className="text-slate-600 leading-relaxed">{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-lg font-semibold text-slate-900 mb-4">Key Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              {position.skills.map((skill, idx) => (
                                <Badge key={idx} variant="outline" className="border-slate-300 text-slate-700 bg-white">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Compensation Section */}
                        {position.compensation && (
                          <div className="bg-slate-50 p-6 rounded-xl">
                            <h4 className="text-lg font-semibold text-slate-900 mb-4">Compensation Package</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="bg-white p-4 rounded-lg border border-slate-200">
                                <div className="text-sm text-slate-600 mb-2">Base Salary</div>
                                <div className="font-semibold text-slate-900">{position.compensation.base}</div>
                              </div>
                              <div className="bg-white p-4 rounded-lg border border-slate-200">
                                <div className="text-sm text-slate-600 mb-2">Project Commission</div>
                                <div className="font-semibold text-slate-900">{position.compensation.commission}</div>
                              </div>
                              <div className="bg-white p-4 rounded-lg border border-slate-200">
                                <div className="text-sm text-slate-600 mb-2">Performance Bonus</div>
                                <div className="font-semibold text-slate-900">{position.compensation.bonus}</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 sm:py-20 lg:py-32 bg-slate-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="text-center mb-16 sm:mb-20 lg:mb-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 sm:mb-8 px-4">Our Hiring Process</h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed px-4">
              We've designed a straightforward, transparent process to help you understand what to expect and showcase your potential
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
            <div className="text-center bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl lg:text-2xl xl:text-3xl">1</span>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-900 mb-4">Application Review</h3>
              <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed">Submit your application and we'll review your qualifications and experience within 2-3 business days</p>
            </div>
            <div className="text-center bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl lg:text-2xl xl:text-3xl">2</span>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-900 mb-4">Initial Screening</h3>
              <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed">30-minute conversation to discuss your background, interests, and learn about the role</p>
            </div>
            <div className="text-center bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl lg:text-2xl xl:text-3xl">3</span>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-900 mb-4">Skills Assessment</h3>
              <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed">Practical discussion about your approach to sales, client relationships, and problem-solving</p>
            </div>
            <div className="text-center bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl lg:text-2xl xl:text-3xl">4</span>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-900 mb-4">Final Interview</h3>
              <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed">Meet with the leadership team to discuss company culture, goals, and your career aspirations</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 lg:py-40 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
            <defs>
              <pattern id="cta-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="15" cy="15" r="1.5" fill="#ffffff" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-grid)" />
          </svg>
        </div>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative">
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm font-medium mb-8">
              <Star className="w-4 h-4 mr-2" />
              Ready to Get Started?
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white mb-6 sm:mb-8 lg:mb-12 leading-tight tracking-tight px-4">
              Begin Your Journey to
              <span className="block bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">Professional Excellence</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-300 mb-12 sm:mb-16 lg:mb-20 max-w-6xl mx-auto leading-relaxed font-light px-4">
              Join a team where innovation meets opportunity, growth is unlimited, and your contributions 
              shape the future of enterprise technology. Your career transformation starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
              <Button 
                onClick={scrollToPositions}
                className="bg-white text-slate-900 hover:bg-slate-100 px-8 sm:px-12 lg:px-16 py-4 sm:py-5 lg:py-6 text-lg sm:text-xl lg:text-2xl font-semibold rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-white/25 transform hover:-translate-y-1 min-w-[300px] sm:min-w-[350px] lg:min-w-[400px]"
              >
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 mr-3" />
                Explore Career Opportunities
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}