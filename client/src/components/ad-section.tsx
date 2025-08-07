import { Button } from "@/components/ui/button";
import { Clock, Sparkles, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdSectionProps {
  isVisible?: boolean;
  title?: string;
  description?: string;
  offerText?: string;
  ctaText?: string;
  expiryText?: string;
  disclaimerText?: string;
  emailSubject?: string;
  emailBody?: string;
}

export default function AdSection({
  isVisible = true,
  title = "🚀 Get 25% OFF Your First Project!",
  description = "Transform your business with our enterprise-grade solutions.",
  offerText = "Free consultation included!",
  ctaText = "Claim 25% OFF Now",
  expiryText = "Offer expires in 7 days",
  disclaimerText = "*Applicable for new clients only. Minimum project value ₹50,000. Terms apply.",
  emailSubject = "25% OFF First Project - Consultation Request",
  emailBody = "Hello Aptivon Solutions,%0D%0A%0D%0AI'm interested in the 25% OFF offer for my first project.%0D%0A%0D%0AProject Requirements:%0D%0A- [Please describe your project]%0D%0A%0D%0APlease contact me to discuss further.%0D%0A%0D%0AThank you!"
}: AdSectionProps) {
  const { toast } = useToast();

  if (!isVisible) return null;

  const handleClaimOffer = () => {
    window.open(`mailto:singhal3.sachin7@gmail.com?subject=${emailSubject}&body=${emailBody}`, '_blank');
    toast({
      title: "Claiming Your Discount",
      description: "Email opened - mention the offer code to get your discount!",
    });
  };

  return (
    <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 mobile-padding-lg">
      
      <div className="relative max-w-7xl mx-auto mobile-container">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-yellow-400/30 rounded-full mb-4 sm:mb-6 border border-yellow-300/40">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-200" />
            <span className="text-xs sm:text-sm font-bold text-yellow-100 tracking-wide">LIMITED TIME OFFER</span>
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-200" />
          </div>
          
          <h2 className="mobile-text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
            {title}
          </h2>
          
          <p className="mobile-text-xl text-blue-100 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
            {description}
            <span className="font-bold text-yellow-300"> {offerText}</span>
          </p>
          
          <div className="flex mobile-flex-col mobile-gap justify-center items-center">
            <Button 
              size="lg" 
              className="mobile-button bg-white text-blue-600 hover:bg-yellow-50 font-bold px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-xl rounded-2xl border-2 border-yellow-300/30 touch-target w-full sm:w-auto"
              onClick={handleClaimOffer}
            >
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
              {ctaText}
            </Button>
            
            <div className="flex items-center gap-2 sm:gap-3 text-yellow-200 text-sm sm:text-base bg-black/20 px-3 sm:px-4 py-2 rounded-full border border-yellow-300/20">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-semibold text-xs sm:text-base">{expiryText}</span>
            </div>
          </div>
          
          <div className="mt-4 text-xs sm:text-sm text-blue-200 opacity-80 px-4 sm:px-0">
            {disclaimerText}
          </div>
        </div>
      </div>
    </section>
  );
}