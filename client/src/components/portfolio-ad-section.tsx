import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Phone, ExternalLink, Code, Globe, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import portfolioAdImage from "@assets/Poster - Live Software Developer Portfolio at just ₹499_1752235282968.png";

interface PortfolioAdSectionProps {
  isVisible?: boolean;
}

export default function PortfolioAdSection({ isVisible = true }: PortfolioAdSectionProps) {
  const { toast } = useToast();

  if (!isVisible) return null;

  const handleContactClick = () => {
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    toast({
      title: "Portfolio Service Inquiry",
      description: "Scrolling to contact section for portfolio service details",
    });
  };

  const handleEmailClick = () => {
    window.open(`mailto:singhal3.sachin7@gmail.com?subject=Live Portfolio Service - ₹499 Package&body=Hello Aptivon Solutions,%0D%0A%0D%0AI'm interested in your Live Software Developer Portfolio service at ₹499.%0D%0A%0D%0APlease provide more details about:%0D%0A- Portfolio features and customization options%0D%0A- Timeline for development%0D%0A- Domain setup process%0D%0A- Additional services available%0D%0A%0D%0AThank you!`, '_blank');
  };

  const handlePhoneClick = () => {
    if (navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile/i)) {
      window.location.href = "tel:+917852099010";
    } else {
      window.open("tel:+917852099010", '_blank');
    }
    toast({
      title: "Portfolio Service Call",
      description: "Calling for portfolio service consultation",
    });
  };

  return (
    <section className="mobile-padding bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 safe-area-padding overflow-hidden">
      
      <div className="relative max-w-7xl mx-auto mobile-container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-3 bg-blue-500/30 rounded-full mb-4 sm:mb-6 border border-blue-400/40 flex-wrap justify-center">
            <Code className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300 flex-shrink-0" />
            <span className="text-sm sm:text-base font-bold text-blue-100 tracking-wide text-center">PROFESSIONAL PORTFOLIO SERVICE</span>
            <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300 flex-shrink-0" />
          </div>
          <h2 className="mobile-text-5xl font-bold text-white mb-4 tracking-tight leading-tight px-2">
            Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Dream Portfolio</span>
          </h2>
        </div>

        <Card 
          className="max-w-5xl mx-auto bg-white border-0 shadow-lg rounded-3xl overflow-hidden cursor-pointer touch-target"
          onClick={handleContactClick}
        >
          <div className="grid md:grid-cols-2 mobile-gap mobile-card-padding">
            {/* Left side - Image */}
            <div className="relative">
              <img 
                src={portfolioAdImage} 
                alt="Live Software Developer Portfolio at ₹499" 
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
              <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                Only ₹499
              </div>
            </div>

            {/* Right side - Content */}
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-slate-900 mb-3">
                  Live Software Developer Portfolio
                </h3>
                <div className="text-4xl font-bold text-blue-600 mb-4">
                  Just ₹499
                </div>
                
                <p className="text-slate-600 mb-4">
                  Get your professional portfolio website with responsive modern UI/UX, 
                  showcase projects, skills & contact info, with optional custom domain.
                </p>

                <div className="space-y-2 text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-green-500" />
                    <span>Responsive modern UI/UX design</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-blue-500" />
                    <span>Showcase projects, skills & contact info</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-purple-500" />
                    <span>Optional custom domain setup</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleContactClick();
                    }}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Get Portfolio Now
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEmailClick();
                    }}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email Us
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
                      handlePhoneClick();
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
          <p className="text-blue-200 text-sm">
            For more custom software development inquiries, visit our main website
          </p>
        </div>
      </div>
    </section>
  );
}