import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Phone, Code, BookOpen, Zap, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import academicProjectsImage from "@assets/Poster - Aptivon Solutions_1752236135540.png";
import AcademicFormModal from "./academic-form-modal";
import logoGif from "../assets/new-logo.gif";

interface AcademicProjectsAdProps {
  isVisible?: boolean;
}

export default function AcademicProjectsAd({ isVisible = true }: AcademicProjectsAdProps) {
  const { toast } = useToast();
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  if (!isVisible) return null;

  const handleContactClick = () => {
    setIsFormModalOpen(true);
    toast({
      title: "Academic Projects Form",
      description: "Fill out the detailed form for your project requirements",
    });
  };

  const handleEmailClick = () => {
    window.open(`mailto:singhal3.sachin7@gmail.com?subject=Academic Projects - Final Year & Internship Projects&body=Hello Aptivon Solutions,%0D%0A%0D%0AI'm interested in your academic project services:%0D%0A%0D%0AProject Type:%0D%0A☐ Final Year Project (₹2,500)%0D%0A☐ Internship Project (₹2,500)%0D%0A☐ Custom Project (₹2,500)%0D%0A☐ PowerPoint Presentation (₹500)%0D%0A%0D%0AProject Domain: ________________%0D%0A%0D%0APlease provide more details about timeline, features, and delivery.%0D%0A%0D%0AThank you!`, '_blank');
  };

  const services = [
    { name: "Final Year Projects", price: "₹2,500", pptPrice: "₹500" },
    { name: "Internship Projects", price: "₹2,500", pptPrice: "₹500" },
    { name: "Custom Projects", price: "₹2,500", pptPrice: "₹500" }
  ];

  return (
    <section className="mobile-padding bg-blue-50 safe-area-padding overflow-hidden">
      
      <div className="relative max-w-7xl mx-auto mobile-container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-3 bg-blue-100 rounded-full mb-4 sm:mb-6 border border-blue-300/50 flex-wrap justify-center">
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
            <span className="text-sm sm:text-base font-bold text-blue-800 tracking-wide text-center">ACADEMIC PROJECT SERVICES</span>
            <Code className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 flex-shrink-0" />
          </div>
          <h2 className="mobile-text-5xl font-bold text-slate-900 mb-4 tracking-tight leading-tight px-2">
            Academic <span className="text-blue-600">Excellence</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Professional project development for students and academic institutions
          </p>
        </div>

        <Card 
          className="max-w-6xl mx-auto bg-white border-0 shadow-lg rounded-3xl overflow-hidden cursor-pointer"
          onClick={handleContactClick}
        >
          <div className="grid lg:grid-cols-2 gap-8 p-8">
            {/* Left side - Image */}
            <div className="relative">
              <img 
                src={academicProjectsImage} 
                alt="Aptivon Solutions Academic Projects Pricing" 
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
              <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                Starting ₹500
              </div>
            </div>

            {/* Right side - Content */}
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <img src={logoGif} alt="Aptivon Solutions" className="w-8 h-8" />
                  <span className="text-2xl font-bold text-blue-600">Aptivon Solutions</span>
                </div>
                
                <h3 className="text-3xl font-bold text-slate-900 mb-4">
                  Academic Project Services
                </h3>
                
                <div className="space-y-3 mb-6">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Code className="w-5 h-5 text-blue-500" />
                        <span className="font-medium text-slate-700">{service.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">{service.price}</div>
                        <div className="text-sm text-slate-500">PPT: {service.pptPrice}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-red-50 p-6 rounded-2xl border border-red-200 mb-6">
                  <p className="text-slate-800 font-medium text-lg leading-relaxed">
                    <span className="text-red-600 font-bold">Get projects from every domain</span> for ₹2,500 
                    and their <span className="text-red-600 font-bold">PPT from just ₹500</span>
                  </p>
                </div>

                <div className="space-y-2 text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Full source code delivered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span>On-time delivery guaranteed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-purple-500" />
                    <span>24/7 support available</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 text-lg shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-500 rounded-2xl group"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleContactClick();
                    }}
                  >
                    <BookOpen className="w-5 h-5 mr-3" />
                    Fill Project Form
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEmailClick();
                    }}
                  >
                    <Mail className="w-5 h-5 mr-3" />
                    Get Quote
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-6 pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">singhal3.sachin7@gmail.com</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 text-slate-600 hover:text-blue-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile/i)) {
                        window.location.href = "tel:+917852099010";
                      } else {
                        window.open("tel:+917852099010", '_blank');
                      }
                    }}
                  >
                    <Phone className="w-4 h-4" />
                    <span>+91 7852099010</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="text-center mt-6">
          <p className="text-slate-600 text-sm font-medium">
            Contact Aptivon Solutions now for immediate project assistance!
          </p>
        </div>
      </div>

      {/* Academic Form Modal */}
      <AcademicFormModal 
        isOpen={isFormModalOpen} 
        onClose={() => setIsFormModalOpen(false)} 
      />
    </section>
  );
}