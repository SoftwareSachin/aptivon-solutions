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
    <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 mobile-padding-lg safe-area-padding overflow-hidden">
      
      <div className="relative max-w-7xl mx-auto mobile-container">
        <div className="text-center">
          <div className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-yellow-400/30 rounded-full mb-3 sm:mb-4 md:mb-6 border border-yellow-300/40 flex-wrap justify-center">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-yellow-200 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-bold text-yellow-100 tracking-wide whitespace-nowrap">LIMITED TIME OFFER</span>
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-yellow-200 flex-shrink-0" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 tracking-tight leading-tight px-2">
            {title}
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 mb-4 sm:mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
            {description}
            <span className="font-bold text-yellow-300 block sm:inline"> {offerText}</span>
          </p>
          
          <div className="flex mobile-flex-col mobile-gap justify-center items-center px-2">
            <Button 
              size="lg" 
              className="mobile-button bg-white text-blue-600 hover:bg-yellow-50 font-bold px-4 sm:px-6 md:px-10 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-xl rounded-2xl border-2 border-yellow-300/30 touch-target w-full sm:w-auto min-h-[44px] flex items-center justify-center"
              onClick={handleClaimOffer}
            >
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-1.5 sm:mr-2 md:mr-3 flex-shrink-0" />
              <span className="truncate">{ctaText}</span>
            </Button>
            
            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 text-yellow-200 text-xs sm:text-sm md:text-base bg-black/20 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full border border-yellow-300/20 max-w-full">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
              <span className="font-semibold text-xs sm:text-sm md:text-base truncate">{expiryText}</span>
            </div>
          </div>
          
          <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-blue-200 opacity-80 px-2 sm:px-4 md:px-0 max-w-full break-words">
            {disclaimerText}
          </div>
        </div>
      </div>
    </section>
  );
}