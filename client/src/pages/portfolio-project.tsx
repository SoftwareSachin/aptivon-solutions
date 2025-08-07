import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";
import { 
  ArrowLeft, 
  Eye, 
  Heart, 
  Calendar, 
  Users, 
  Building,
  Phone,
  Mail,
  MessageSquare,
  Download,
  Share2,
  CheckCircle2,
  Target,
  Lightbulb,
  TrendingUp,
  ExternalLink
} from "lucide-react";

export default function PortfolioProject() {
  const { slug } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Check if this is the Azure college project by slug
  const isCollegeProject = slug === 'azure-hub-spoke-network-automation-platform';
  
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    inquiryType: "project_details"
  });

  // Fetch project details
  const { data: project, isLoading } = useQuery({
    queryKey: [`/api/portfolio?action=project&slug=${slug}`],
    enabled: !!slug
  });

  // Like project mutation
  const likeMutation = useMutation({
    mutationFn: async () => {
      if (!project) return;
      return apiRequest('POST', '/api/portfolio?action=like', {
        projectId: project.id
      });
    },
    onSuccess: () => {
      toast({
        title: "Project Liked!",
        description: "Thank you for your interest in this project.",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/portfolio-project/${slug}`] });
    }
  });

  // Inquiry submission mutation
  const inquiryMutation = useMutation({
    mutationFn: async (inquiryData: typeof inquiryForm) => {
      if (!project) return;
      return apiRequest('POST', '/api/portfolio-inquiry', {
        ...inquiryData,
        projectId: project.id
      });
    },
    onSuccess: () => {
      toast({
        title: "Inquiry Submitted!",
        description: "We'll get back to you within 24 hours.",
      });
      setInquiryForm({
        name: "",
        email: "",
        company: "",
        phone: "",
        message: "",
        inquiryType: "project_details"
      });
    }
  });

  const handleLike = () => {
    likeMutation.mutate();
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.name || !inquiryForm.email || !inquiryForm.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    inquiryMutation.mutate(inquiryForm);
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "Link Copied!",
        description: "Project URL has been copied to your clipboard.",
      });
    });
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Project case study is being prepared for download.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white mt-96">
        <Navigation />
        <div className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="animate-pulse">
              <div className="h-8 bg-slate-200 rounded mb-4"></div>
              <div className="h-4 bg-slate-200 rounded mb-2"></div>
              <div className="h-4 bg-slate-200 rounded mb-8"></div>
              <div className="h-64 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white mt-96">
        <Navigation />
        <div className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Project Not Found</h1>
            <p className="text-slate-600 mb-8">The project you're looking for doesn't exist.</p>
            <Button onClick={() => setLocation(isCollegeProject ? "/college-projects" : "/portfolio")} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {isCollegeProject ? "Back to College Projects" : "Back to Portfolio"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white mt-96">
      <Navigation />
      
      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              className="mb-4 -ml-4"
              onClick={() => setLocation(isCollegeProject ? "/college-projects" : "/portfolio")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {isCollegeProject ? "Back to College Projects" : "Back to Portfolio"}
            </Button>
            
            <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
              <Badge variant="secondary">{project.industry}</Badge>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {project.views} views
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                {project.likes} likes
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-slate-900 mb-4">{project.title}</h1>
            <p className="text-xl text-slate-600 mb-6">{project.description}</p>
            
            <div className="flex gap-4 mb-8">
              <Button onClick={handleLike} variant="outline">
                <Heart className="h-4 w-4 mr-2" />
                Like Project
              </Button>
              <Button onClick={handleShare} variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button onClick={handleDownload} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Case Study
              </Button>
            </div>
          </div>

          {/* Project Details */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Client
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{project.client}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Duration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{project.duration}</p>
              </CardContent>
            </Card>
          </div>

          {/* Technologies */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Challenge & Solution */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Challenge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">{project.challenges}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Solution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">{project.solution}</p>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Results & Impact</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {project.results.map((result, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-slate-700">{result}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Project Inquiry Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Interested in a Similar Project?
              </CardTitle>
              <CardDescription>
                Get in touch to discuss how we can help you achieve similar results.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={inquiryForm.company}
                      onChange={(e) => setInquiryForm(prev => ({ ...prev, company: e.target.value }))}
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={inquiryForm.phone}
                      onChange={(e) => setInquiryForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Your phone number"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="inquiryType">Inquiry Type</Label>
                  <Select 
                    value={inquiryForm.inquiryType} 
                    onValueChange={(value) => setInquiryForm(prev => ({ ...prev, inquiryType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="project_details">Project Details</SelectItem>
                      <SelectItem value="similar_project">Similar Project</SelectItem>
                      <SelectItem value="consultation">Consultation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={inquiryForm.message}
                    onChange={(e) => setInquiryForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Tell us about your project requirements..."
                    className="min-h-[120px]"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={inquiryMutation.isPending}
                >
                  {inquiryMutation.isPending ? "Submitting..." : "Send Inquiry"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}