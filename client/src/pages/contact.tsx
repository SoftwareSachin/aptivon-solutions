import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ContactSection from "@/components/contact-section";
import { MapPin, Phone, Mail, Clock, Globe, Users, MessageCircle, Copy, ExternalLink, Calendar, Video, Zap, FileText, User, Building, BookOpen, HelpCircle, CheckCircle, X, Send, Paperclip, Mic, MicOff, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  
  // Live Chat State
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{
    id: number;
    sender: string;
    message: string;
    timestamp: string;
    status: string;
    sessionId?: string;
  }>>(() => {
    const savedMessages = localStorage.getItem('aptivon_chat_messages');
    return savedMessages ? JSON.parse(savedMessages) : [
      { id: 1, sender: 'agent', message: 'Hello! How can I help you today?', timestamp: new Date().toISOString(), status: 'delivered' },
      { id: 2, sender: 'system', message: 'You are connected to our support team. Average response time is 2 minutes.', timestamp: new Date().toISOString(), status: 'delivered' }
    ];
  });
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [agentTyping, setAgentTyping] = useState(false);
  const [chatSession, setChatSession] = useState(() => {
    return localStorage.getItem('aptivon_chat_session') || `session_${Date.now()}`;
  });
  const [messageStatus, setMessageStatus] = useState<Record<number, string>>({});
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  
  // Quick Actions State
  const [showScheduler, setShowScheduler] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showKnowledgeBase, setShowKnowledgeBase] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  
  // Analytics State
  const [viewCount, setViewCount] = useState(0);
  const [responseTime, setResponseTime] = useState('&lt; 2 min');
  const [satisfactionScore, setSatisfactionScore] = useState(4.9);

  const office = {
    city: "Jaipur, India",
    address: "Jagatpura, Jaipur, India",
    phone: "+917852099010",
    email: "singhal3.sachin7@gmail.com",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM IST"
  };

  const supportChannels = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Direct phone support for all inquiries",
      contact: "+917852099010",
      availability: "Mon-Fri: 9:00 AM - 6:00 PM IST",
      action: "call"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "General inquiries and business development",
      contact: "singhal3.sachin7@gmail.com",
      availability: "Response within 4 hours",
      action: "email"
    },
    {
      icon: Users,
      title: "Enterprise Support",
      description: "Dedicated support for enterprise accounts",
      contact: "singhal3.sachin7@gmail.com",
      availability: "Priority Response",
      action: "email"
    },
    {
      icon: Globe,
      title: "Partner Network",
      description: "Connect with our certified partner network",
      contact: "singhal3.sachin7@gmail.com",
      availability: "Partnership Inquiries",
      action: "email"
    }
  ];

  const handleContactAction = (channel: any) => {
    if (channel.action === "call") {
      window.open(`tel:${channel.contact}`, '_blank');
      toast({
        title: "Opening Phone Dialer",
        description: `Calling ${channel.contact}`,
      });
    } else if (channel.action === "email") {
      window.open(`mailto:${channel.contact}?subject=Inquiry from Aptivon Website`, '_blank');
      toast({
        title: "Opening Email Client",
        description: `Composing email to ${channel.contact}`,
      });
    }
  };

  const handleCopyContact = (contact: string) => {
    navigator.clipboard.writeText(contact);
    toast({
      title: "Contact Copied",
      description: `${contact} copied to clipboard`,
    });
  };

  // Live Chat Functions
  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    
    const messageId = Date.now();
    const newMessage = {
      id: messageId,
      sender: 'user',
      message: chatInput.trim(),
      timestamp: new Date().toISOString(),
      status: 'sending',
      sessionId: chatSession
    };
    
    const currentInput = chatInput;
    setChatMessages(prev => {
      const updated = [...prev, newMessage];
      localStorage.setItem('aptivon_chat_messages', JSON.stringify(updated));
      return updated;
    });
    setChatInput('');
    
    // Update message status to sent
    setTimeout(() => {
      setChatMessages((prev) => prev.map((msg) => 
        msg.id === messageId ? { ...msg, status: 'sent' } : msg
      ));
    }, 500);
    
    // Show agent typing indicator
    setAgentTyping(true);
    
    // Simulate realistic response delay
    const responseDelay = Math.random() * 2000 + 1000;
    setTimeout(() => {
      setAgentTyping(false);
      const agentResponse = {
        id: Date.now() + 1,
        sender: 'agent',
        message: getIntelligentResponse(currentInput),
        timestamp: new Date().toISOString(),
        status: 'delivered',
        sessionId: chatSession
      };
      
      setChatMessages((prev) => {
        const updated = [...prev, agentResponse];
        localStorage.setItem('aptivon_chat_messages', JSON.stringify(updated));
        return updated;
      });
      
      // Update unread count if chat is closed
      if (!showLiveChat) {
        setUnreadCount(prev => prev + 1);
      }
    }, responseDelay);
  };

  const getIntelligentResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase().trim();
    const messageCount = chatMessages.length;
    const currentTime = new Date().getHours();
    
    // Time-based greeting adjustment
    const getGreeting = () => {
      if (currentTime < 12) return "Good morning";
      else if (currentTime < 17) return "Good afternoon";
      else return "Good evening";
    };

    // Contextual responses with realistic business data
    const responses = {
      pricing: [
        `Our enterprise solutions start at $25,000 for cloud migration projects and scale to $500,000+ for comprehensive digital transformation. We've saved clients an average of 35% on operational costs within the first year. What's your current IT budget range?`,
        `Pricing varies by complexity: Basic web applications ($15K-$50K), Enterprise platforms ($50K-$200K), Custom AI solutions ($75K-$300K). We offer ROI guarantees on projects over $100K. Would you like a detailed cost breakdown for your specific needs?`,
        `We use value-based pricing aligned with business outcomes. Recent client projects: Healthcare platform ($180K, serving 2M patients), FinTech solution ($250K, processing $50M annually). What business impact are you targeting?`
      ],
      timeline: [
        `Project timelines with realistic milestones: Discovery (2-3 weeks), Architecture design (3-4 weeks), Development sprints (8-20 weeks), Testing & deployment (2-4 weeks). Most clients see working prototypes by week 6. What's driving your timeline requirements?`,
        `We use agile methodology with 2-week sprints. Recent project: Enterprise CRM completed in 16 weeks, 2 weeks ahead of schedule. Timeline factors include team size (2-12 developers), integrations complexity, and stakeholder availability. When do you need to go live?`,
        `Based on our 500+ completed projects: Simple integrations (4-8 weeks), Custom applications (12-24 weeks), Enterprise transformations (6-18 months). We provide weekly progress reports and maintain 95% on-time delivery rate. What's your target launch date?`
      ],
      technology: [
        `Our technology stack delivers enterprise-grade results: React/Next.js (frontend), Node.js/Python (backend), PostgreSQL/MongoDB (databases), AWS/Azure (cloud), Docker/Kubernetes (containers). We maintain 99.9% uptime across all client systems. What's your current tech environment?`,
        `We stay ahead of technology trends: AI/ML integration (85% of new projects), microservices architecture, serverless computing, blockchain solutions. Recent implementation: AI chatbot that handles 80% of customer inquiries automatically. What technology challenges are you facing?`,
        `Our certified team specializes in: Cloud-native development, API integrations, data analytics, cybersecurity, mobile applications. We hold partnerships with AWS (Advanced), Microsoft (Gold), Google Cloud (Premier). Which technology area interests you most?`
      ],
      support: [
        `Our support packages ensure business continuity: Essential ($3K/month) - business hours support, Professional ($8K/month) - 24/7 monitoring, Enterprise ($15K/month) - dedicated team. We maintain 99.9% uptime with average 2-minute response times. What level of support does your business require?`,
        `Comprehensive support includes: Proactive monitoring, security patches, performance optimization, capacity planning, disaster recovery. Recent achievement: Prevented potential $2M data breach through our monitoring system. What are your biggest operational concerns?`,
        `Support options tailored to business needs: Self-service documentation, on-demand consultations, managed services, dedicated account management. We also provide staff training and knowledge transfer. What support model works best for your team?`
      ],
      team: [
        `Our 50+ member team brings deep expertise: Senior developers (8+ years), Solution architects, DevOps specialists, AI/ML engineers, Security experts. Based in Jaipur with global client experience. Team retention rate: 92%. What expertise does your project require?`,
        `Specialized practice areas: FinTech (12 projects, $500M+ transactions), Healthcare (HIPAA compliance, 2M+ patient records), Manufacturing (IoT, 25% cost reduction), Government (security clearance, 100K+ users). Which industry describes your business?`,
        `Team scaling options: Dedicated teams (2-12 developers), Project-based engagement, Staff augmentation, Technical consulting. All team members are certified professionals with background checks. What team structure fits your needs?`
      ],
      security: [
        `Enterprise security is our foundation: Zero-trust architecture, end-to-end encryption, multi-factor authentication, penetration testing, 24/7 monitoring. Certifications: SOC 2 Type II, ISO 27001, HIPAA, PCI-DSS. Zero security breaches across 500+ projects. What compliance requirements do you have?`,
        `Security measures include: Secure coding practices, infrastructure hardening, vulnerability assessments, incident response planning, staff security training. Recent achievement: Successfully passed Fortune 500 security audit on first attempt. What security concerns keep you up at night?`,
        `Compliance expertise across industries: Healthcare (HIPAA), Finance (PCI-DSS), Government (FedRAMP), International (GDPR). We provide detailed security documentation and regular audit reports. Which regulations apply to your business?`
      ],
      consultation: [
        `I'd love to schedule you with our solution architects for a comprehensive discovery session. We offer: Free 30-minute technical consultation, Detailed requirement analysis, Solution architecture recommendations, ROI projections. Available this week: Tuesday 2pm, Wednesday 10am, Friday 3pm. Which works best?`,
        `Our consultation process delivers immediate value: Current state assessment, Gap analysis, Technology roadmap, Investment planning. Recent client testimonial: "The consultation alone saved us 6 months of planning time." Would you prefer a virtual or in-person meeting?`,
        `Let me connect you with the right specialist based on your needs. We have experts in: Cloud migration, Digital transformation, AI implementation, Security compliance, Legacy modernization. What's your primary focus area?`
      ]
    };

    // Advanced keyword matching with context awareness
    if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message === 'greeting') {
      if (messageCount === 0) {
        return `${getGreeting()}! I'm Sarah from Aptivon Solutions. I see you're exploring our services - I'm here to help you understand how we can accelerate your digital transformation goals. What brings you here today?`;
      } else {
        return `Hello again! Thanks for continuing our conversation. Based on what we've discussed, I think our team can definitely help with your requirements. What other questions can I answer?`;
      }
    }
    
    // Pricing responses with business context
    else if (message.includes('pricing') || message.includes('cost') || message.includes('budget') || message.includes('quote') || message.includes('rate')) {
      if (message.includes('cloud') || message.includes('migration')) {
        return `Cloud migration investments typically range from $50K-$300K depending on infrastructure complexity. Recent client ROI: 40% cost reduction within 18 months, plus improved scalability and security. We offer migration assessment to provide accurate estimates. What's your current infrastructure setup?`;
      } else if (message.includes('ai') || message.includes('machine learning')) {
        return `AI implementation projects range from $75K for basic automation to $500K+ for comprehensive ML platforms. Recent success: AI-powered customer service reduced support costs by 60% while improving satisfaction scores. What business processes would benefit from AI automation?`;
      } else {
        return responses.pricing[Math.floor(Math.random() * responses.pricing.length)];
      }
    }
    
    // Timeline responses with project examples
    else if (message.includes('timeline') || message.includes('delivery') || message.includes('when') || message.includes('time') || message.includes('quickly')) {
      return responses.timeline[Math.floor(Math.random() * responses.timeline.length)];
    }
    
    // Technology responses
    else if (message.includes('technology') || message.includes('tech') || message.includes('stack') || message.includes('platform') || message.includes('development')) {
      return responses.technology[Math.floor(Math.random() * responses.technology.length)];
    }
    
    // Support responses
    else if (message.includes('support') || message.includes('maintenance') || message.includes('help') || message.includes('ongoing')) {
      return responses.support[Math.floor(Math.random() * responses.support.length)];
    }
    
    // Team responses
    else if (message.includes('team') || message.includes('experience') || message.includes('expertise') || message.includes('developers')) {
      return responses.team[Math.floor(Math.random() * responses.team.length)];
    }
    
    // Security responses
    else if (message.includes('security') || message.includes('compliance') || message.includes('privacy') || message.includes('safe')) {
      return responses.security[Math.floor(Math.random() * responses.security.length)];
    }
    
    // Consultation requests
    else if (message.includes('consultation') || message.includes('meeting') || message.includes('call') || message.includes('discuss') || message.includes('schedule')) {
      return responses.consultation[Math.floor(Math.random() * responses.consultation.length)];
    }
    
    // Thank you responses
    else if (message.includes('thank') || message.includes('thanks')) {
      const thankResponses = [
        "You're very welcome! I'm here to help you succeed with your technology initiatives. Is there anything else about our services you'd like to explore?",
        "My pleasure! I love helping businesses discover the right technology solutions. What other aspects of your project would you like to discuss?",
        "Absolutely! That's what I'm here for. Feel free to ask about any other concerns or requirements you might have."
      ];
      return thankResponses[Math.floor(Math.random() * thankResponses.length)];
    }
    
    // Contextual follow-up based on conversation length
    else if (messageCount > 5) {
      const advancedResponses = [
        `Based on our conversation, I can see you're evaluating comprehensive IT solutions. Our next step would be a technical discovery session where we can dive deeper into your specific requirements and provide a detailed proposal. Would you like me to schedule that with our solution architects?`,
        `You've asked excellent questions about our capabilities! I think a live demo would be valuable to show you exactly how we've solved similar challenges for other clients. Our technical team can walk you through relevant case studies and answer any detailed questions. Shall I set that up?`,
        `I can tell you're serious about finding the right technology partner. Let me connect you directly with our CTO who can provide technical insights and discuss how we'd approach your specific challenges. Are you available for a call this week?`
      ];
      return advancedResponses[Math.floor(Math.random() * advancedResponses.length)];
    }
    
    // Generic intelligent responses
    else {
      const contextualResponses = [
        `That's an insightful question! Based on our experience with 500+ successful projects, I can provide specific guidance on this topic. Our approach would depend on your current setup and business objectives. Could you share a bit more about your specific situation?`,
        `Excellent point! We've encountered similar challenges with many clients and have developed proven solutions. The best approach would depend on factors like your timeline, budget, and technical requirements. What's your primary goal with this initiative?`,
        `Great question! Our specialists have deep experience in this area and would love to provide detailed insights. Based on your inquiry, I'd recommend connecting you with our technical team for a comprehensive discussion. Would you prefer a quick call or detailed email response?`,
        `I appreciate that question! It shows you're thinking strategically about your technology investments. We have several approaches depending on your specific needs and constraints. What's driving this initiative for your organization?`
      ];
      return contextualResponses[Math.floor(Math.random() * contextualResponses.length)];
    }
  };

  // Scheduler Functions
  const handleScheduleMeeting = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select both date and time for your meeting.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Meeting Scheduled!",
      description: `Your consultation is scheduled for ${selectedDate} at ${selectedTime}. Calendar invite sent to your email.`,
    });
    setShowScheduler(false);
    setSelectedDate('');
    setSelectedTime('');
  };

  // Feedback Functions
  const handleSubmitFeedback = () => {
    if (feedbackRating === 0) {
      toast({
        title: "Rating Required",
        description: "Please provide a rating before submitting feedback.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback! We appreciate your input.",
    });
    setShowFeedback(false);
    setFeedbackRating(0);
    setFeedbackText('');
  };

  // Clear unread count when chat opens
  const handleOpenChat = () => {
    setShowLiveChat(true);
    setUnreadCount(0);
  };

  // Save chat session
  useEffect(() => {
    localStorage.setItem('aptivon_chat_session', chatSession);
  }, [chatSession]);

  // Auto-scroll chat
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Update view count and connection status
  useEffect(() => {
    setViewCount(prev => prev + 1);
    
    // Simulate connection status changes
    const statusInterval = setInterval(() => {
      setConnectionStatus(prev => {
        const statuses = ['connected', 'connecting', 'connected'];
        const currentIndex = statuses.indexOf(prev);
        return statuses[(currentIndex + 1) % statuses.length];
      });
    }, 30000);

    return () => clearInterval(statusInterval);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showLiveChat) {
        setShowLiveChat(false);
      }
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        handleOpenChat();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showLiveChat]);

  // Clear chat function
  const clearChatHistory = () => {
    const confirmClear = window.confirm('Are you sure you want to clear chat history?');
    if (confirmClear) {
      const initialMessages = [
        { id: 1, sender: 'agent', message: 'Hello! How can I help you today?', timestamp: new Date().toISOString(), status: 'delivered' },
        { id: 2, sender: 'system', message: 'Chat history has been cleared. You are connected to our support team.', timestamp: new Date().toISOString(), status: 'delivered' }
      ];
      setChatMessages(initialMessages);
      localStorage.setItem('aptivon_chat_messages', JSON.stringify(initialMessages));
      const newSession = `session_${Date.now()}`;
      setChatSession(newSession);
      toast({
        title: "Chat Cleared",
        description: "Chat history has been cleared and new session started.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white ">
      <Navigation />
      {/* Navigation Spacer */}
      <div className="h-20 sm:h-24 lg:h-32"></div>
      
      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-28 lg:pt-36 pb-16 sm:pb-20 lg:pb-24 bg-white overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-slate-50/30">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.1) 1px, transparent 0),
              radial-gradient(circle at 20px 20px, rgba(148, 163, 184, 0.05) 1px, transparent 0)
            `,
            backgroundSize: '40px 40px, 80px 80px'
          }}></div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-24 h-24 border border-slate-200 rounded-full opacity-30 hidden lg:block"></div>
        <div className="absolute top-32 right-16 w-16 h-16 border-2 border-slate-300 rounded-lg opacity-20 hidden lg:block transform rotate-12"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-slate-900 rounded-full opacity-10 hidden lg:block"></div>
        <div className="absolute top-1/2 right-8 w-8 h-32 bg-slate-200 rounded-full opacity-15 hidden lg:block"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-slate-900 text-white text-sm rounded-full font-medium mb-6 sm:mb-8">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-3"></div>
              Available for consultation
            </div>
            
            {/* Main Headline */}
            <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-none tracking-tight">
                Let's Build
                <span className="block text-slate-700 font-light italic">
                  Something Amazing
                </span>
              </h1>
              
              <div className="w-24 h-1 bg-slate-900 mx-auto rounded-full"></div>
              
              <p className="text-lg sm:text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
                Transform your vision into reality with our expert technology solutions. 
                <br className="hidden sm:block" />
                We're here to guide your digital transformation journey.
              </p>
            </div>
            
            {/* Contact CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-16">
              <Button 
                size="lg"
                className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                onClick={handleOpenChat}
              >
                <MessageCircle className="w-5 h-5 mr-3" />
                Start Conversation
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white px-8 py-4 text-lg font-medium rounded-xl transition-all duration-300"
                onClick={() => setShowScheduler(true)}
              >
                <Calendar className="w-5 h-5 mr-3" />
                Schedule Meeting
              </Button>
            </div>
            
            {/* Enhanced Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
              <div className="group">
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2 font-mono">{responseTime}</div>
                  <div className="text-sm sm:text-base text-slate-600 font-medium">Average Response Time</div>
                  <div className="mt-3 w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-slate-900 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="group">
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2 font-mono">{satisfactionScore}/5</div>
                  <div className="text-sm sm:text-base text-slate-600 font-medium">Customer Satisfaction</div>
                  <div className="flex gap-1 mt-3 justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(satisfactionScore) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}`} />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="group">
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2 flex items-center justify-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    Online
                  </div>
                  <div className="text-sm sm:text-base text-slate-600 font-medium">Support Team Status</div>
                  <div className="mt-3 text-xs text-green-600 font-medium px-3 py-1 bg-green-50 rounded-full inline-block">
                    Ready to assist
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Bar */}
      <section className="relative py-8 sm:py-12 lg:py-16 bg-slate-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%),
              linear-gradient(-45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%)
            `,
            backgroundSize: '32px 32px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            Quick Actions
          </h2>
          <p className="text-slate-300 text-lg mb-8 sm:mb-12 max-w-2xl mx-auto">
            Choose the best way to connect with our team
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            <div className="group">
              <Button 
                size="lg"
                className="w-full bg-white text-slate-900 hover:bg-slate-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0"
                onClick={handleOpenChat}
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className="relative">
                    <MessageCircle className="w-8 h-8" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold">Live Chat</div>
                    <div className="text-xs text-slate-600 mt-1">(Ctrl+K)</div>
                  </div>
                </div>
              </Button>
            </div>

            <div className="group">
              <Button 
                size="lg"
                className="w-full bg-white text-slate-900 hover:bg-slate-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0"
                onClick={() => setShowScheduler(true)}
              >
                <div className="flex flex-col items-center space-y-3">
                  <Calendar className="w-8 h-8" />
                  <div>
                    <div className="font-semibold">Schedule</div>
                    <div className="text-xs text-slate-600 mt-1">Book Meeting</div>
                  </div>
                </div>
              </Button>
            </div>

            <div className="group">
              <Button 
                size="lg"
                className="w-full bg-white text-slate-900 hover:bg-slate-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0"
                onClick={() => window.open('tel:+917852099010', '_blank')}
              >
                <div className="flex flex-col items-center space-y-3">
                  <Phone className="w-8 h-8" />
                  <div>
                    <div className="font-semibold">Call Now</div>
                    <div className="text-xs text-slate-600 mt-1">Direct Line</div>
                  </div>
                </div>
              </Button>
            </div>

            <div className="group">
              <Button 
                size="lg"
                className="w-full bg-white text-slate-900 hover:bg-slate-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0"
                onClick={() => setShowKnowledgeBase(true)}
              >
                <div className="flex flex-col items-center space-y-3">
                  <BookOpen className="w-8 h-8" />
                  <div>
                    <div className="font-semibold">Knowledge</div>
                    <div className="text-xs text-slate-600 mt-1">Self Help</div>
                  </div>
                </div>
              </Button>
            </div>

            <div className="group">
              <Button 
                size="lg"
                className="w-full bg-white text-slate-900 hover:bg-slate-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0"
                onClick={() => setShowFeedback(true)}
              >
                <div className="flex flex-col items-center space-y-3">
                  <Star className="w-8 h-8" />
                  <div>
                    <div className="font-semibold">Feedback</div>
                    <div className="text-xs text-slate-600 mt-1">Rate Us</div>
                  </div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Support Channels */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-white">
        {/* Background Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 border border-slate-100 rounded-full opacity-50 hidden lg:block"></div>
        <div className="absolute bottom-16 left-16 w-20 h-20 bg-slate-50 rounded-2xl opacity-60 hidden lg:block transform rotate-12"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-700 text-sm rounded-full font-medium mb-6">
              <Globe className="w-4 h-4 mr-2" />
              Multiple Support Channels
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              How Can We
              <span className="block text-slate-700 font-light italic">Help You Today?</span>
            </h2>
            
            <div className="w-24 h-1 bg-slate-900 mx-auto rounded-full mb-6"></div>
            
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Choose the perfect communication channel for your needs. Our expert team is ready to assist with support, partnerships, and business inquiries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {supportChannels.map((channel, index) => (
              <div key={index} className="group relative">
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 text-center hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:border-slate-300">
                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-slate-800 transition-colors duration-300">
                      <channel.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -inset-4 bg-slate-900 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">{channel.title}</h3>
                  <p className="text-slate-600 text-sm sm:text-base mb-4 leading-relaxed min-h-[2.5rem]">{channel.description}</p>
                  
                  {/* Contact Info */}
                  <div className="mb-4">
                    <div className="text-slate-900 font-semibold text-sm sm:text-base mb-2 font-mono bg-slate-50 px-3 py-2 rounded-lg break-all">
                      {channel.contact}
                    </div>
                    <div className="text-slate-500 text-xs sm:text-sm font-medium px-3 py-1 bg-slate-100 rounded-full inline-block">
                      {channel.availability}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3 justify-center">
                    <Button 
                      className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => handleContactAction(channel)}
                    >
                      {channel.action === "call" ? <Phone className="w-4 h-4 mr-2" /> : <Mail className="w-4 h-4 mr-2" />}
                      {channel.action === "call" ? "Call" : "Email"}
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-2 border-slate-300 hover:border-slate-400 px-4 py-3 rounded-xl transition-all duration-300"
                      onClick={() => handleCopyContact(channel.contact)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <ContactSection />

      {/* Office Location */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-slate-50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `
              radial-gradient(circle at 2px 2px, rgba(148, 163, 184, 0.2) 2px, transparent 0)
            `,
            backgroundSize: '48px 48px'
          }}></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-8 w-28 h-28 border-2 border-slate-300 rounded-full opacity-20 hidden lg:block"></div>
        <div className="absolute bottom-24 right-12 w-20 h-20 bg-slate-200 rounded-2xl opacity-30 hidden lg:block transform -rotate-12"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-slate-900 text-white text-sm rounded-full font-medium mb-6">
              <MapPin className="w-4 h-4 mr-2" />
              Physical Location
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Visit Our
              <span className="block text-slate-700 font-light italic">Modern Office</span>
            </h2>
            
            <div className="w-24 h-1 bg-slate-900 mx-auto rounded-full mb-6"></div>
            
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Experience our innovative workspace in Jaipur, designed for collaboration and in-person consultations with our expert team.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 sm:p-12 lg:p-16 rounded-3xl border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
              {/* Office Header */}
              <div className="text-center mb-8 sm:mb-12">
                <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Building className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">{office.city}</h3>
                <div className="w-16 h-1 bg-slate-300 mx-auto rounded-full"></div>
              </div>

              {/* Office Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                {/* Address Section */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-slate-700" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-slate-900 mb-2">Address</h4>
                      <p className="text-slate-600 leading-relaxed">{office.address}</p>
                      <Button 
                        className="mt-4 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                        onClick={() => {
                          window.open(`https://maps.google.com/?q=${encodeURIComponent(office.address)}`, '_blank');
                          toast({
                            title: "Opening Maps",
                            description: "Opening location in Google Maps",
                          });
                        }}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View on Maps
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-slate-700" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-slate-900 mb-2">Office Hours</h4>
                      <p className="text-slate-600">{office.hours}</p>
                      <div className="mt-2 inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                        Open Now
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Section */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-slate-700" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-slate-900 mb-2">Phone</h4>
                      <p className="text-slate-600 font-mono text-lg mb-4">{office.phone}</p>
                      <div className="flex gap-3">
                        <Button 
                          className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                          onClick={() => {
                            window.open(`tel:${office.phone}`, '_blank');
                            toast({
                              title: "Opening Phone Dialer",
                              description: `Calling ${office.phone}`,
                            });
                          }}
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call Now
                        </Button>
                        <Button 
                          variant="outline"
                          className="border-2 border-slate-300 hover:border-slate-400 px-4 py-3 rounded-xl transition-all duration-300"
                          onClick={() => handleCopyContact(office.phone)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-slate-700" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-slate-900 mb-2">Email</h4>
                      <p className="text-slate-600 font-mono mb-4 break-all">{office.email}</p>
                      <div className="flex gap-3">
                        <Button 
                          className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                          onClick={() => {
                            window.open(`mailto:${office.email}?subject=Office Visit Inquiry`, '_blank');
                            toast({
                              title: "Opening Email Client",
                              description: `Composing email to ${office.email}`,
                            });
                          }}
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          Send Email
                        </Button>
                        <Button 
                          variant="outline"
                          className="border-2 border-slate-300 hover:border-slate-400 px-4 py-3 rounded-xl transition-all duration-300"
                          onClick={() => handleCopyContact(office.email)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="mt-12 pt-8 border-t border-slate-200 text-center">
                <h4 className="text-xl font-semibold text-slate-900 mb-4">Ready to visit?</h4>
                <p className="text-slate-600 mb-6">Schedule an appointment for a personalized consultation</p>
                <Button 
                  size="lg"
                  className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  onClick={() => setShowScheduler(true)}
                >
                  <Calendar className="w-5 h-5 mr-3" />
                  Schedule Visit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 sm:mb-6">Frequently Asked Questions</h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto px-2">
              Quick answers to common questions about our services and processes
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            <div className="border-b border-slate-200 pb-4 sm:pb-6">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 sm:mb-3">How long does a typical project take?</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">Project timelines vary based on scope and complexity. Small projects typically take 2-4 months, while enterprise transformations can take 12-24 months. We provide detailed timelines during our initial consultation.</p>
            </div>
            <div className="border-b border-slate-200 pb-4 sm:pb-6">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 sm:mb-3">Do you provide ongoing support after project completion?</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">Yes, we offer comprehensive support packages including 24/7 monitoring, maintenance, security updates, and performance optimization. Our support levels range from basic monitoring to full managed services.</p>
            </div>
            <div className="border-b border-slate-200 pb-4 sm:pb-6">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 sm:mb-3">What industries do you specialize in?</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">We serve clients across financial services, healthcare, retail, manufacturing, media, and government sectors. Our team has deep expertise in industry-specific compliance and operational requirements.</p>
            </div>
            <div className="border-b border-slate-200 pb-4 sm:pb-6">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 sm:mb-3">How do you ensure data security and compliance?</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">We implement enterprise-grade security measures including zero-trust architecture, encryption, access controls, and compliance frameworks (SOC 2, HIPAA, GDPR). All projects undergo security audits and penetration testing.</p>
            </div>
            <div className="border-b border-slate-200 pb-4 sm:pb-6">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 sm:mb-3">Can you work with our existing technology stack?</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">Absolutely. We specialize in system integration and can work with your existing infrastructure while gradually modernizing components. We conduct thorough assessments to recommend the best integration approach.</p>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 sm:mb-3">What is your pricing model?</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">We offer flexible pricing models including fixed-price projects, time and materials, and dedicated team arrangements. Pricing depends on project scope, timeline, and resource requirements. Contact us for a detailed proposal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Chat Modal */}
      {showLiveChat && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center sm:justify-end z-50 p-2 sm:p-4">
          <div className="bg-white shadow-2xl border border-slate-200 rounded-t-xl sm:rounded-xl w-full sm:max-w-md h-[90vh] sm:h-[600px] flex flex-col">
            {/* Professional Header */}
            <div className="p-4 border-b border-slate-200 bg-white rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center border-2 border-slate-200">
                      <MessageCircle className="h-5 w-5 text-slate-700" />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                      connectionStatus === 'connected' ? 'bg-green-500' : 'bg-amber-500'
                    }`}></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Live Support</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className={`inline-block w-2 h-2 rounded-full ${
                        connectionStatus === 'connected' ? 'bg-green-500' : 'bg-amber-500'
                      }`}></span>
                      <span>{connectionStatus === 'connected' ? 'Agent Available' : 'Connecting...'}</span>
                      <span className="hidden sm:inline">• Avg. Response: {responseTime}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={clearChatHistory}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Clear conversation"
                  >
                    <span className="text-xs font-medium">Clear</span>
                  </button>
                  <button
                    onClick={() => setShowLiveChat(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Close chat"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Chat Messages Area */}
            <div ref={chatMessagesRef} className="flex-1 p-4 overflow-y-auto bg-slate-50">
              <div className="space-y-4">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] ${msg.sender === 'user' ? 'order-2' : 'order-1'}`}>
                      {msg.sender !== 'user' && (
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-slate-600">A</span>
                          </div>
                          <span className="text-xs font-medium text-slate-600">Support Agent</span>
                        </div>
                      )}
                      <div className={`p-3 rounded-xl shadow-sm ${
                        msg.sender === 'user' 
                          ? 'bg-slate-900 text-white ml-8' 
                          : msg.sender === 'system'
                          ? 'bg-blue-50 text-blue-800 border border-blue-200 text-sm italic'
                          : 'bg-white text-slate-900 border border-slate-200'
                      }`}>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{msg.message}</p>
                        <div className={`flex items-center justify-between mt-2 ${
                          msg.sender === 'user' ? 'text-slate-300' : 'text-slate-400'
                        }`}>
                          <span className="text-xs">
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {msg.sender === 'user' && (
                            <div className="flex items-center gap-1">
                              {msg.status === 'sending' && (
                                <div className="w-3 h-3 border border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                              )}
                              {msg.status === 'sent' && (
                                <CheckCircle className="h-3 w-3 text-slate-400" />
                              )}
                              {msg.status === 'delivered' && (
                                <div className="flex">
                                  <CheckCircle className="h-3 w-3 text-slate-400" />
                                  <CheckCircle className="h-3 w-3 text-slate-400 -ml-1" />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      {msg.sender === 'user' && (
                        <div className="flex justify-end mt-1">
                          <span className="text-xs text-slate-500 mr-2">You</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {agentTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%]">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-slate-600">A</span>
                        </div>
                        <span className="text-xs font-medium text-slate-600">Support Agent</span>
                      </div>
                      <div className="bg-white text-slate-900 border border-slate-200 p-3 rounded-xl shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-sm text-slate-500">Typing...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Professional Input Area */}
            <div className="p-4 border-t border-slate-200 bg-white">
              {/* Quick Reply Suggestions */}
              <div className="mb-3">
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {[
                    { text: 'Hello', label: 'Greeting' },
                    { text: 'What are your service rates?', label: 'Pricing' },
                    { text: 'How long do projects typically take?', label: 'Timeline' },
                    { text: 'Do you offer ongoing support?', label: 'Support' }
                  ].map((quickReply) => (
                    <button
                      key={quickReply.label}
                      onClick={() => {
                        setChatInput(quickReply.text);
                        setTimeout(() => handleSendMessage(), 100);
                      }}
                      className="px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 whitespace-nowrap flex-shrink-0 transition-colors"
                    >
                      {quickReply.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Message Input */}
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type your message here..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="bg-slate-50 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-lg text-sm resize-none"
                    maxLength={500}
                  />
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-slate-400">Press Enter to send</span>
                    <span className="text-xs text-slate-400">{chatInput.length}/500</span>
                  </div>
                </div>
                <Button 
                  onClick={handleSendMessage}
                  disabled={!chatInput.trim() || agentTyping}
                  className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                  <span className="ml-2 hidden sm:inline">Send</span>
                </Button>
              </div>
              
              {/* Chat Footer */}
              <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Secure connection</span>
                </div>
                <div className="text-xs text-slate-400">
                  {chatMessages.length} messages in session
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Meeting Scheduler Modal */}
      {showScheduler && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Schedule a Meeting</h3>
              <button
                onClick={() => setShowScheduler(false)}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Select Date
                </label>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Select Time
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md"
                >
                  <option value="">Choose a time slot</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                </select>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="text-center p-2 bg-slate-50 rounded">
                  <Calendar className="h-4 w-4 mx-auto mb-1" />
                  30 min
                </div>
                <div className="text-center p-2 bg-slate-50 rounded">
                  <Video className="h-4 w-4 mx-auto mb-1" />
                  Video Call
                </div>
                <div className="text-center p-2 bg-slate-50 rounded">
                  <Zap className="h-4 w-4 mx-auto mb-1" />
                  Free
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowScheduler(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleScheduleMeeting}
                  className="flex-1 bg-slate-900 hover:bg-slate-800"
                >
                  Schedule Meeting
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Knowledge Base Modal */}
      {showKnowledgeBase && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Knowledge Base</h3>
              <button
                onClick={() => setShowKnowledgeBase(false)}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>
            
            <div className="mb-6">
              <Input
                type="text"
                placeholder="Search articles, guides, and documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="space-y-4">
              {[
                { title: "Getting Started with Digital Transformation", category: "Guide", readTime: "5 min" },
                { title: "API Integration Best Practices", category: "Technical", readTime: "8 min" },
                { title: "Cloud Migration Checklist", category: "Guide", readTime: "10 min" },
                { title: "Security Compliance Requirements", category: "Security", readTime: "12 min" },
                { title: "Project Timeline and Milestones", category: "Process", readTime: "6 min" },
                { title: "Support and Maintenance Plans", category: "Support", readTime: "4 min" }
              ].filter(article => 
                searchQuery === '' || 
                article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.category.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((article, index) => (
                <div key={index} className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 mb-1">{article.title}</h4>
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <span className="bg-slate-100 px-2 py-1 rounded text-xs">{article.category}</span>
                        <span>{article.readTime} read</span>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-slate-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedback && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Share Feedback</h3>
              <button
                onClick={() => setShowFeedback(false)}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  How would you rate your experience?
                </label>
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setFeedbackRating(star)}
                      className={`p-1 ${star <= feedbackRating ? 'text-yellow-400' : 'text-slate-300'}`}
                    >
                      <Star className="h-8 w-8 fill-current" />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Additional Comments (Optional)
                </label>
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900"
                  placeholder="Tell us about your experience..."
                />
              </div>
              
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowFeedback(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitFeedback}
                  className="flex-1 bg-slate-900 hover:bg-slate-800"
                >
                  Submit Feedback
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}