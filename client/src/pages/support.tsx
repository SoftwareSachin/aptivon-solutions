import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock,
  HelpCircle,
  FileText,
  Video,
  Users,
  ArrowRight,
  Search,
  CheckCircle,
  AlertCircle,
  Info,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Loader2,
  X,
  Send,
  Minimize2,
  Maximize2,
  Download,
  Star,
  Filter,
  Calendar,
  MapPin,
  Globe,
  Shield,
  Zap,
  Headphones,
  FileCheck,
  Clock3,
  MessageSquare,
  Lightbulb,
  AlertTriangle,
  ThumbsUp,
  Copy,
  Share2,
  Bookmark,
  PriorityIcon,
  Settings,
  Database,
  Code,
  Gamepad2
} from "lucide-react";

// Form validation schema
const supportTicketSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  priority: z.enum(['Low', 'Medium', 'High', 'Critical']),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type SupportTicketForm = z.infer<typeof supportTicketSchema>;

const SUPPORT_CHANNELS = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our technical experts",
      availability: "24/7 for Enterprise clients",
      response: "Immediate",
      contact: "+917852099010"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send detailed queries to our support team",
      availability: "Monday - Friday, 9 AM - 6 PM EST",
      response: "Within 4 hours",
      contact: "singhal3.sachin7@gmail.com"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Real-time assistance for quick questions",
      availability: "Monday - Friday, 9 AM - 6 PM EST",
      response: "Within 5 minutes",
      contact: "Chat Now"
    },
    {
      icon: Users,
      title: "Dedicated Account Manager",
      description: "Personal support for Enterprise accounts",
      availability: "Business hours",
      response: "Same day",
      contact: "Contact assigned manager"
    }
  ];

  const faqCategories = [
    {
      title: "Technical Implementation",
      questions: [
        "How long does a typical implementation take?",
        "What are the system requirements?",
        "How do you handle data migration?",
        "What security measures do you implement?"
      ]
    },
    {
      title: "Billing & Pricing",
      questions: [
        "How is pricing calculated?",
        "What payment methods do you accept?",
        "Are there any hidden costs?",
        "Can I change my plan later?"
      ]
    },
    {
      title: "Training & Onboarding",
      questions: [
        "What training is included?",
        "How long is the onboarding process?",
        "Do you provide user documentation?",
        "Is ongoing training available?"
      ]
    },
    {
      title: "Maintenance & Support",
      questions: [
        "What's included in maintenance?",
        "How do you handle system updates?",
        "What are your SLA guarantees?",
        "How do you provide ongoing support?"
      ]
    }
  ];

  const resources = [
    {
      icon: FileText,
      title: "Documentation",
      description: "Comprehensive guides and API documentation",
      link: "/resources"
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step video guides for common tasks",
      link: "/resources"
    },
    {
      icon: HelpCircle,
      title: "Knowledge Base",
      description: "Searchable articles and troubleshooting guides",
      link: "/resources"
    }
];

export default function Support() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const { toast } = useToast();

  // Form handling
  const { register, handleSubmit, formState: { errors }, reset } = useForm<SupportTicketForm>({
    resolver: zodResolver(supportTicketSchema),
    defaultValues: {
      priority: 'Medium'
    }
  });

  // Support ticket submission
  const supportMutation = useMutation({
    mutationFn: async (data: SupportTicketForm) => {
      return await apiRequest("POST", "/api/support-ticket", data);
    },
    onSuccess: (data) => {
      toast({
        title: "Support ticket submitted successfully!",
        description: data.message,
      });
      reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error submitting support ticket",
        description: error.message || "Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  // Search functionality
  const searchSupport = async (query: string) => {
    if (!query || query.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`/api/search?action=support&q=${encodeURIComponent(query.trim())}`);
      const data = await response.json();
      
      if (data.success) {
        setSearchResults(data.results);
      } else {
        toast({
          title: "Search error",
          description: "Unable to search at this time. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search error",
        description: "Unable to search at this time. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery) {
        searchSupport(searchQuery);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery]);

  // Contact actions
  const handlePhoneCall = () => {
    window.open('tel:+917852099010', '_self');
  };

  const handleEmailSupport = () => {
    window.open('mailto:singhal3.sachin7@gmail.com?subject=Support Request', '_self');
  };

  const handleLiveChat = () => {
    setChatOpen(true);
    toast({
      title: "Chat feature coming soon!",
      description: "For immediate assistance, please call us or send an email.",
    });
  };

  const onSubmitTicket = (data: SupportTicketForm) => {
    supportMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-white ">
      <Navigation />
      {/* Navigation Spacer */}
      <div className="h-48"></div>
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              We're Here to Help You Succeed
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Get the support you need, when you need it. Our expert team is ready to assist 
              with technical questions, implementation guidance, and ongoing support.
            </p>
            
            {/* Quick Search */}
            <div className="max-w-md mx-auto relative mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input 
                placeholder="Search help articles..." 
                className="pl-10 pr-4 py-3 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {isSearching && (
                <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5 animate-spin" />
              )}
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="max-w-2xl mx-auto mb-8">
                <div className="bg-white rounded-lg border border-slate-200 shadow-lg">
                  <div className="p-4 border-b border-slate-200">
                    <h3 className="font-semibold text-slate-900">Search Results ({searchResults.length})</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {searchResults.map((result: any) => (
                      <div key={result.id} className="p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer">
                        <h4 className="font-medium text-slate-900 mb-2">{result.title}</h4>
                        <p className="text-slate-600 text-sm mb-2">{result.content.substring(0, 150)}...</p>
                        <span className="inline-block px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">{result.category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white" onClick={handleLiveChat}>
                Start Live Chat
                <MessageCircle className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" onClick={handlePhoneCall}>
                Call Support
                <Phone className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Support Channels */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Multiple Ways to Get Support
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Choose the support channel that works best for your needs and urgency.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SUPPORT_CHANNELS.map((channel: any, index: number) => (
              <div key={index} className="bg-white p-8 rounded-xl border border-slate-200 hover:shadow-lg transition-shadow text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <channel.icon className="h-8 w-8 text-slate-900" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{channel.title}</h3>
                <p className="text-slate-600 mb-6">{channel.description}</p>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-center">
                    <Clock className="h-4 w-4 text-slate-400 mr-2" />
                    <span className="text-slate-600">{channel.availability}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-slate-900 mr-2" />
                    <span className="text-slate-600">Response: {channel.response}</span>
                  </div>
                  <Button 
                    className="w-full mt-4 bg-slate-900 hover:bg-slate-800 text-white"
                    onClick={() => {
                      if (channel.title === "Phone Support") handlePhoneCall();
                      else if (channel.title === "Email Support") handleEmailSupport();
                      else if (channel.title === "Live Chat") handleLiveChat();
                      else toast({ title: "Feature coming soon!", description: "This feature will be available soon." });
                    }}
                  >
                    {channel.contact}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find quick answers to common questions about our services and processes.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                id: 1,
                question: "How long does a typical implementation take?",
                answer: "Implementation timelines vary based on project complexity and scope. Typical timelines are: Small projects (1-2 weeks), Medium projects (3-6 weeks), Large enterprise projects (8-16 weeks). We provide detailed project timelines during the planning phase.",
                category: "Technical Implementation"
              },
              {
                id: 2,
                question: "What are the system requirements?",
                answer: "Our solutions are cloud-native and platform agnostic. Minimum requirements include: Modern web browser (Chrome, Firefox, Safari, Edge), Stable internet connection (10+ Mbps recommended), Operating System: Windows 10+, macOS 10.14+, or Linux Ubuntu 18.04+.",
                category: "Technical Implementation"
              },
              {
                id: 3,
                question: "How is pricing calculated?",
                answer: "Our pricing is transparent and based on: Project scope and complexity, Required features and integrations, Number of users or transactions, Support level required, Implementation timeline. We provide detailed quotes with no hidden fees.",
                category: "Billing & Pricing"
              },
              {
                id: 4,
                question: "What training is included?",
                answer: "Comprehensive training is included with all implementations: Initial administrator training (4-8 hours), End-user training sessions, Video tutorials and documentation, Live Q&A sessions, Train-the-trainer programs for large organizations, Ongoing training for new features.",
                category: "Training & Onboarding"
              },
              {
                id: 5,
                question: "What are your SLA guarantees?",
                answer: "Our Service Level Agreements include: 99.9% uptime guarantee, Response times: Critical (1 hour), High (4 hours), Medium/Low (24 hours), Resolution times based on priority, Financial credits for SLA breaches, 24/7 monitoring and alerting.",
                category: "Maintenance & Support"
              },
              {
                id: 6,
                question: "How do you handle data migration?",
                answer: "We follow a comprehensive data migration process: Data assessment and mapping, Migration strategy development, Test migrations in staging environment, Validation and integrity checks, Scheduled production migration with minimal downtime, Post-migration verification and optimization.",
                category: "Technical Implementation"
              }
            ].map((faq) => (
              <div key={faq.id} className="bg-white rounded-xl border border-slate-200 shadow-sm">
                <button
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 mb-1">{faq.question}</h3>
                    <span className="text-sm text-slate-500">{faq.category}</span>
                  </div>
                  {expandedFaq === faq.id ? (
                    <ChevronUp className="h-5 w-5 text-slate-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === faq.id && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-slate-200 pt-4">
                      <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Self-Service Resources */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Self-Service Resources
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Access our comprehensive library of resources to find answers and learn more.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Documentation",
                description: "Comprehensive guides and API documentation",
                link: "/resources"
              },
              {
                icon: Video,
                title: "Video Tutorials",
                description: "Step-by-step video guides for common tasks",
                link: "/resources"
              },
              {
                icon: HelpCircle,
                title: "Knowledge Base",
                description: "Searchable articles and troubleshooting guides",
                link: "/resources"
              }
            ].map((resource: any, index: number) => (
              <div key={index} className="bg-white p-8 rounded-xl border border-slate-200 hover:shadow-lg transition-shadow cursor-pointer text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <resource.icon className="h-8 w-8 text-slate-900" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{resource.title}</h3>
                <p className="text-slate-600 mb-6">{resource.description}</p>
                <Button variant="outline" className="w-full">
                  Access Resource
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Submit a Support Request
              </h2>
              <p className="text-lg text-gray-600">
                Can't find what you're looking for? Send us a detailed message and we'll get back to you.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-xl">
              <div className="p-8">
                <form onSubmit={handleSubmit(onSubmitTicket)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <Input 
                        placeholder="Your full name" 
                        {...register("fullName")}
                        className={errors.fullName ? "border-red-500" : ""}
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input 
                        type="email" 
                        placeholder="your@email.com" 
                        {...register("email")}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <Input 
                      placeholder="Brief description of your issue" 
                      {...register("subject")}
                      className={errors.subject ? "border-red-500" : ""}
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority Level
                    </label>
                    <select 
                      className="w-full p-3 border border-gray-300 rounded-md"
                      {...register("priority")}
                    >
                      <option value="Low">Low - General question</option>
                      <option value="Medium">Medium - Non-urgent issue</option>
                      <option value="High">High - Urgent issue affecting work</option>
                      <option value="Critical">Critical - System down or security issue</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Detailed Description *
                    </label>
                    <Textarea 
                      placeholder="Please provide as much detail as possible about your issue or question..."
                      rows={6}
                      {...register("description")}
                      className={errors.description ? "border-red-500" : ""}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                    )}
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                    <div className="flex items-start">
                      <Info className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900 mb-1">Response Time Expectations</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Critical issues: Within 1 hour</li>
                          <li>• High priority: Within 4 hours</li>
                          <li>• Medium/Low priority: Within 24 hours</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={supportMutation.isPending}
                  >
                    {supportMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Support Request
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support SLA */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Support Commitment
              </h2>
              <p className="text-lg text-gray-600">
                We're committed to providing exceptional support with guaranteed response times.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: CheckCircle,
                  title: "99.9% Uptime SLA",
                  description: "Enterprise-grade reliability with guaranteed uptime and performance monitoring."
                },
                {
                  icon: Clock,
                  title: "24/7 Monitoring",
                  description: "Round-the-clock system monitoring with proactive issue detection and resolution."
                },
                {
                  icon: Users,
                  title: "Expert Team",
                  description: "Certified professionals with deep expertise in your technology stack and industry."
                }
              ].map((commitment, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <commitment.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{commitment.title}</h3>
                  <p className="text-gray-600">{commitment.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}