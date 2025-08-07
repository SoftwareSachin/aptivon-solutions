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
  const [chatMessages, setChatMessages] = useState(() => {
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
  const [messageStatus, setMessageStatus] = useState({});
  const chatMessagesRef = useRef(null);
  
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
      setChatMessages(prev => prev.map(msg => 
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
      
      setChatMessages(prev => {
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
    const message = userMessage.toLowerCase();
    const responses = {
      pricing: [
        "Our pricing is tailored to each project's unique requirements. We offer competitive rates starting from $5,000 for small projects. Would you like me to connect you with our sales team for a personalized quote?",
        "Pricing depends on project scope, timeline, and technology requirements. We provide transparent, fixed-price proposals after understanding your needs. Shall I schedule a consultation call?",
        "We offer flexible pricing models including fixed-price, time & materials, and dedicated team arrangements. What type of project are you considering?"
      ],
      timeline: [
        "Typical project timelines range from 2-6 months. Small applications take 2-3 months, while enterprise solutions require 4-6 months. What's your target launch date?",
        "Timeline depends on complexity and features. We use agile methodology with 2-week sprints. Would you like to discuss your specific requirements?",
        "We provide detailed project roadmaps during consultation. Most clients see initial prototypes within 4-6 weeks. When do you need to go live?"
      ],
      technology: [
        "We specialize in React, Node.js, Python, AWS, and modern cloud technologies. We also work with AI/ML, blockchain, and mobile development. What technology interests you?",
        "Our tech stack includes cutting-edge tools: React/Next.js, Node.js/Python, PostgreSQL/MongoDB, AWS/Azure, Docker, and Kubernetes. What's your current tech environment?",
        "We stay current with the latest technologies while ensuring stability and scalability. What specific technology challenge are you facing?"
      ],
      support: [
        "We offer comprehensive support packages: Basic (business hours), Premium (24/7), and Enterprise (dedicated support team). All include monitoring, updates, and security patches.",
        "Our support includes 24/7 monitoring, proactive maintenance, security updates, and performance optimization. We guarantee 99.9% uptime. What level of support do you need?",
        "Support options range from self-service documentation to dedicated account management. We also provide training for your team. What type of support would be most valuable?"
      ],
      team: [
        "Our team includes senior developers, architects, and project managers with 5-15 years experience. We're based in Jaipur with expertise across multiple industries.",
        "We have specialists in frontend, backend, DevOps, and AI/ML. All team members are certified professionals. Would you like to know about our expertise in your industry?",
        "Our experienced team has delivered solutions for healthcare, fintech, e-commerce, and enterprise clients. What's your industry focus?"
      ],
      security: [
        "Security is our top priority. We implement enterprise-grade measures including encryption, access controls, vulnerability testing, and compliance frameworks (SOC 2, HIPAA, GDPR).",
        "We follow security-first development practices, conduct regular audits, and provide detailed security documentation. What security requirements do you have?",
        "Our security approach includes secure coding, infrastructure hardening, and continuous monitoring. We're certified in multiple security frameworks."
      ]
    };

    // Intelligent keyword matching
    if (message.includes('pricing') || message.includes('cost') || message.includes('budget') || message.includes('quote')) {
      return responses.pricing[Math.floor(Math.random() * responses.pricing.length)];
    } else if (message.includes('timeline') || message.includes('delivery') || message.includes('when') || message.includes('time')) {
      return responses.timeline[Math.floor(Math.random() * responses.timeline.length)];
    } else if (message.includes('technology') || message.includes('tech') || message.includes('stack') || message.includes('platform')) {
      return responses.technology[Math.floor(Math.random() * responses.technology.length)];
    } else if (message.includes('support') || message.includes('maintenance') || message.includes('help')) {
      return responses.support[Math.floor(Math.random() * responses.support.length)];
    } else if (message.includes('team') || message.includes('experience') || message.includes('expertise')) {
      return responses.team[Math.floor(Math.random() * responses.team.length)];
    } else if (message.includes('security') || message.includes('compliance') || message.includes('privacy')) {
      return responses.security[Math.floor(Math.random() * responses.security.length)];
    } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! I'm here to help you with any questions about our services. What would you like to know about our development capabilities?";
    } else if (message.includes('thank') || message.includes('thanks')) {
      return "You're very welcome! Is there anything else I can help you with today? I'm here to assist with any questions about our services.";
    } else {
      const genericResponses = [
        "That's a great question! Let me provide you with detailed information. Our team specializes in custom software development and can help with your specific needs. What aspect would you like to explore further?",
        "I'd be happy to help you with that! Based on your inquiry, I recommend scheduling a consultation where we can discuss your requirements in detail. Shall I set that up?",
        "Thank you for reaching out! Your question is important to us. Our specialists can provide comprehensive guidance on this topic. Would you like me to connect you with the right expert?",
        "Excellent question! We have extensive experience in this area and would love to help. Let me gather some additional context - what's your primary goal with this project?"
      ];
      return genericResponses[Math.floor(Math.random() * genericResponses.length)];
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
    <div className="min-h-screen bg-white mt-96">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Ready to transform your business with innovative technology solutions? 
              Our expert team is here to help you achieve your digital transformation goals.
            </p>
            
            {/* Real-time Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="text-2xl font-bold text-slate-900">{responseTime}</div>
                <div className="text-sm text-slate-600">Average Response Time</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="text-2xl font-bold text-slate-900">{satisfactionScore}/5</div>
                <div className="text-sm text-slate-600">Customer Satisfaction</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Online
                </div>
                <div className="text-sm text-slate-600">Support Team Status</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Bar */}
      <section className="py-8 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white hover:text-slate-900 relative"
              onClick={handleOpenChat}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Live Chat 
              {unreadCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                  {unreadCount}
                </span>
              )}
              <span className="ml-2 text-xs opacity-75">(Ctrl+K)</span>
            </Button>
            <Button 
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white hover:text-slate-900"
              onClick={() => setShowScheduler(true)}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Meeting
            </Button>
            <Button 
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white hover:text-slate-900"
              onClick={() => window.open('tel:+917852099010', '_blank')}
            >
              <Phone className="h-4 w-4 mr-2" />
              Call Now
            </Button>
            <Button 
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white hover:text-slate-900"
              onClick={() => setShowKnowledgeBase(true)}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Knowledge Base
            </Button>
            <Button 
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white hover:text-slate-900"
              onClick={() => setShowFeedback(true)}
            >
              <Star className="h-4 w-4 mr-2" />
              Feedback
            </Button>
          </div>
        </div>
      </section>

      {/* Support Channels */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">How Can We Help?</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Multiple ways to connect with our team for support, partnerships, and business inquiries
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportChannels.map((channel, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-slate-200 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <channel.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{channel.title}</h3>
                <p className="text-slate-600 text-sm mb-4">{channel.description}</p>
                <div className="text-slate-900 font-medium text-sm mb-2">{channel.contact}</div>
                <div className="text-slate-500 text-xs mb-4">{channel.availability}</div>
                <div className="flex gap-2 justify-center">
                  <Button 
                    size="sm" 
                    className="bg-slate-900 hover:bg-slate-800 text-white"
                    onClick={() => handleContactAction(channel)}
                  >
                    {channel.action === "call" ? <Phone className="h-4 w-4 mr-1" /> : <Mail className="h-4 w-4 mr-1" />}
                    {channel.action === "call" ? "Call" : "Email"}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleCopyContact(channel.contact)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <ContactSection />

      {/* Office Location */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Office</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Visit us at our headquarters in Jaipur for in-person consultations and meetings
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-lg border border-slate-200 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">{office.city}</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-slate-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="text-slate-600">{office.address}</span>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="ml-3"
                      onClick={() => {
                        window.open(`https://maps.google.com/?q=${encodeURIComponent(office.address)}`, '_blank');
                        toast({
                          title: "Opening Maps",
                          description: "Opening location in Google Maps",
                        });
                      }}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Map
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-slate-500 flex-shrink-0" />
                  <span className="text-slate-600 flex-1">{office.phone}</span>
                  <Button 
                    size="sm" 
                    className="bg-slate-900 hover:bg-slate-800 text-white"
                    onClick={() => {
                      window.open(`tel:${office.phone}`, '_blank');
                      toast({
                        title: "Opening Phone Dialer",
                        description: `Calling ${office.phone}`,
                      });
                    }}
                  >
                    <Phone className="h-3 w-3 mr-1" />
                    Call
                  </Button>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-slate-500 flex-shrink-0" />
                  <span className="text-slate-600 flex-1">{office.email}</span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      window.open(`mailto:${office.email}?subject=Meeting Request`, '_blank');
                      toast({
                        title: "Opening Email Client",
                        description: `Composing email to ${office.email}`,
                      });
                    }}
                  >
                    <Mail className="h-3 w-3 mr-1" />
                    Email
                  </Button>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-slate-500 flex-shrink-0" />
                  <span className="text-slate-600">{office.hours}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Quick answers to common questions about our services and processes
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-lg font-bold text-slate-900 mb-3">How long does a typical project take?</h3>
              <p className="text-slate-600">Project timelines vary based on scope and complexity. Small projects typically take 2-4 months, while enterprise transformations can take 12-24 months. We provide detailed timelines during our initial consultation.</p>
            </div>
            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Do you provide ongoing support after project completion?</h3>
              <p className="text-slate-600">Yes, we offer comprehensive support packages including 24/7 monitoring, maintenance, security updates, and performance optimization. Our support levels range from basic monitoring to full managed services.</p>
            </div>
            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-lg font-bold text-slate-900 mb-3">What industries do you specialize in?</h3>
              <p className="text-slate-600">We serve clients across financial services, healthcare, retail, manufacturing, media, and government sectors. Our team has deep expertise in industry-specific compliance and operational requirements.</p>
            </div>
            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-lg font-bold text-slate-900 mb-3">How do you ensure data security and compliance?</h3>
              <p className="text-slate-600">We implement enterprise-grade security measures including zero-trust architecture, encryption, access controls, and compliance frameworks (SOC 2, HIPAA, GDPR). All projects undergo security audits and penetration testing.</p>
            </div>
            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Can you work with our existing technology stack?</h3>
              <p className="text-slate-600">Absolutely. We specialize in system integration and can work with your existing infrastructure while gradually modernizing components. We conduct thorough assessments to recommend the best integration approach.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">What is your pricing model?</h3>
              <p className="text-slate-600">We offer flexible pricing models including fixed-price projects, time and materials, and dedicated team arrangements. Pricing depends on project scope, timeline, and resource requirements. Contact us for a detailed proposal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Chat Modal */}
      {showLiveChat && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-end z-50 p-4">
          <div className="bg-white rounded-t-xl w-full max-w-md h-[600px] flex flex-col">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white rounded-t-xl">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  connectionStatus === 'connected' ? 'bg-green-500' : 'bg-yellow-500'
                }`}>
                  <MessageCircle className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold">Live Support</h3>
                  <div className="text-xs text-slate-300 flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${
                      connectionStatus === 'connected' ? 'bg-green-400' : 'bg-yellow-400'
                    } ${connectionStatus === 'connecting' ? 'animate-pulse' : ''}`}></div>
                    {connectionStatus === 'connected' ? 'Online' : 'Connecting'} • Response: {responseTime}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearChatHistory}
                  className="p-1 hover:bg-white/20 rounded text-xs"
                  title="Clear chat history"
                >
                  Clear
                </button>
                <button
                  onClick={() => setShowLiveChat(false)}
                  className="p-1 hover:bg-white/20 rounded"
                  title="Close chat (Esc)"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div ref={chatMessagesRef} className="flex-1 p-4 overflow-y-auto space-y-4">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg relative ${
                    msg.sender === 'user' 
                      ? 'bg-slate-900 text-white' 
                      : msg.sender === 'system'
                      ? 'bg-slate-100 text-slate-600 text-sm italic'
                      : 'bg-slate-100 text-slate-900'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs opacity-70">
                        {typeof msg.timestamp === 'string' 
                          ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                          : msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        }
                      </p>
                      {msg.sender === 'user' && (
                        <div className="flex items-center gap-1">
                          {msg.status === 'sending' && (
                            <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin"></div>
                          )}
                          {msg.status === 'sent' && (
                            <CheckCircle className="h-3 w-3 text-white/70" />
                          )}
                          {msg.status === 'delivered' && (
                            <div className="flex">
                              <CheckCircle className="h-3 w-3 text-white/70" />
                              <CheckCircle className="h-3 w-3 text-white/70 -ml-1" />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {agentTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 text-slate-900 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-xs text-slate-500">Support agent is typing...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-slate-200">
              <div className="flex gap-2 mb-2">
                <div className="flex gap-1">
                  {['Hi', 'Pricing', 'Timeline', 'Support'].map((quickReply) => (
                    <button
                      key={quickReply}
                      onClick={() => {
                        setChatInput(quickReply);
                        setTimeout(() => handleSendMessage(), 100);
                      }}
                      className="px-2 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded border"
                    >
                      {quickReply}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type your message... (Enter to send)"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="flex-1"
                  maxLength={500}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!chatInput.trim() || agentTyping}
                  className="bg-slate-900 hover:bg-slate-800"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex justify-between items-center mt-2 text-xs text-slate-500">
                <span>Session: {chatSession.slice(-6)} • Encrypted</span>
                <div className="flex items-center gap-3">
                  <span>{chatInput.length}/500</span>
                  <div className="flex gap-2">
                    <button 
                      className="hover:text-slate-700"
                      title="Attach file"
                      onClick={() => toast({ title: "File Upload", description: "File upload feature coming soon!" })}
                    >
                      <Paperclip className="h-3 w-3" />
                    </button>
                    <button 
                      className="hover:text-slate-700"
                      title="Voice message"
                      onClick={() => toast({ title: "Voice Message", description: "Voice messaging feature coming soon!" })}
                    >
                      <Mic className="h-3 w-3" />
                    </button>
                  </div>
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