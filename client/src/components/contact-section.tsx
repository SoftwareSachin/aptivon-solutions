import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { MagnetLines } from "@/components/ui/magnet-lines";

export default function ContactSection() {
  const { toast } = useToast();
  const [selectedService, setSelectedService] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(insertContactSchema),
  });

  const contactMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest("POST", "/api/forms?action=contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      reset();
      setSelectedService("");
    },
    onError: () => {
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: any) => {
    contactMutation.mutate({ ...data, service: selectedService });
  };

  return (
    <section id="contact" className="relative mobile-padding-lg bg-slate-50 overflow-hidden">
      {/* MagnetLines Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <MagnetLines
          rows={12}
          columns={12}
          containerSize="100%"
          lineColor="#64748b"
          lineWidth="2px"
          lineHeight="20px"
          baseAngle={-10}
          className="w-full h-full"
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto mobile-container">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full mb-6">
            <Send className="w-4 h-4" />
            <span className="font-medium text-sm">Contact Us</span>
          </div>
          <h2 className="mobile-text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Ready to Get Started?
          </h2>
          <p className="mobile-text-xl text-slate-600 max-w-3xl mx-auto">
            Connect with our team to discuss your technology requirements and explore how we can help accelerate your business growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 mobile-gap">
          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="mobile-text-2xl font-bold text-slate-900 mb-4 sm:mb-6">Get in Touch</h3>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-slate-900 font-medium text-sm sm:text-base">Email</p>
                    <p className="text-slate-600 text-sm sm:text-base break-all">singhal3.sachin7@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-slate-900 font-medium text-sm sm:text-base">Phone</p>
                    <p className="text-slate-600 text-sm sm:text-base">+917852099010</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-slate-900 font-medium text-sm sm:text-base">Location</p>
                    <p className="text-slate-600 text-sm sm:text-base">India & Global Operations</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div>
              <h3 className="mobile-text-2xl font-bold text-slate-900 mb-4 sm:mb-6">Why Choose Aptivon?</h3>
              <div className="space-y-3 sm:space-y-4">
                {[
                  "Enterprise-grade solutions",
                  "24/7 dedicated support", 
                  "Proven track record",
                  "Scalable architecture",
                  "Cost-effective delivery"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-slate-900 rounded-full flex-shrink-0"></div>
                    <span className="text-slate-600 text-sm sm:text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-white border border-slate-200 shadow-lg">
            <CardContent className="mobile-card-padding">
              <h3 className="mobile-text-2xl font-bold text-slate-900 mb-4 sm:mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 mobile-gap">
                  <div>
                    <Label htmlFor="firstName" className="text-slate-700 mb-2 block font-medium text-sm">First Name *</Label>
                    <Input
                      id="firstName"
                      {...register("firstName")}
                      className="mobile-input border-slate-300 focus:border-slate-500 focus:ring-slate-500 touch-target"
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{String(errors.firstName.message)}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-slate-700 mb-2 block font-medium text-sm">Last Name *</Label>
                    <Input
                      id="lastName"
                      {...register("lastName")}
                      className="mobile-input border-slate-300 focus:border-slate-500 focus:ring-slate-500 touch-target"
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{String(errors.lastName.message)}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-slate-700 mb-2 block font-medium text-sm">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="mobile-input border-slate-300 focus:border-slate-500 focus:ring-slate-500 touch-target"
                    placeholder="your@company.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{String(errors.email.message)}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 mobile-gap">
                  <div>
                    <Label htmlFor="company" className="text-slate-700 mb-2 block font-medium text-sm">Company</Label>
                    <Input
                      id="company"
                      {...register("company")}
                      className="mobile-input border-slate-300 focus:border-slate-500 focus:ring-slate-500 touch-target"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-700 mb-2 block font-medium text-sm">Service Interest</Label>
                    <Select value={selectedService} onValueChange={setSelectedService}>
                      <SelectTrigger className="mobile-input border-slate-300 focus:border-slate-500 focus:ring-slate-500 touch-target">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cloud">Cloud Infrastructure</SelectItem>
                        <SelectItem value="devops">DevOps & Automation</SelectItem>
                        <SelectItem value="ai">AI & Analytics</SelectItem>
                        <SelectItem value="development">Application Development</SelectItem>
                        <SelectItem value="consulting">Technology Consulting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-slate-700 mb-2 block font-medium text-sm">Message *</Label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    rows={4}
                    className="mobile-input border-slate-300 focus:border-slate-500 focus:ring-slate-500 resize-none"
                    placeholder="Tell us about your project requirements and objectives..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{String(errors.message.message)}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="mobile-button w-full bg-slate-900 hover:bg-slate-800 text-white py-4 text-base sm:text-lg font-semibold transition-all duration-300 shadow-lg touch-target"
                >
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                  <Send className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}