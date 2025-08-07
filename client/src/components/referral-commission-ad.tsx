import { Button } from "@/components/ui/button";
import { Handshake, Gift, Users, ArrowRight, DollarSign, Star, TrendingUp, Coins } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function ReferralCommissionAd() {
  const { toast } = useToast();
  const [earnings] = useState(["₹5,000", "₹12,500", "₹8,750", "₹15,000"]);
  const [currentEarning] = useState(0);

  const handleReferralClick = () => {
    const emailSubject = "Referral Commission Program - Partner with Us";
    const emailBody = "Hello Aptivon Solutions,%0D%0A%0D%0AI'm interested in your referral commission program.%0D%0A%0D%0AClient Details:%0D%0A- Client Name: [Client's company/name]%0D%0A- Project Type: [Brief description]%0D%0A- Estimated Budget: [If known]%0D%0A%0D%0AMy Contact Details:%0D%0A- Name: [Your name]%0D%0A- Phone: [Your phone number]%0D%0A- Relationship with client: [How you know them]%0D%0A%0D%0APlease contact me to discuss the referral process and commission structure.%0D%0A%0D%0AThank you!";
    
    window.open(`mailto:singhal3.sachin7@gmail.com?subject=${emailSubject}&body=${emailBody}`, '_blank');
    toast({
      title: "Referral Program",
      description: "Opening email to start your referral partnership with us!",
    });
  };

  return (
    <section className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 mobile-padding-lg safe-area-padding overflow-hidden">
      
      <div className="relative max-w-7xl mx-auto mobile-container">
        <div className="text-center">
          {/* Enhanced Badge */}
          <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-3 bg-emerald-400/30 rounded-full mb-6 sm:mb-8 border border-emerald-300/50 flex-wrap justify-center">
            <Gift className="w-4 h-4 sm:w-6 sm:h-6 text-emerald-200 flex-shrink-0" />
            <span className="text-sm sm:text-base font-bold text-emerald-100 tracking-wide text-center">EARN MONEY BY REFERRING</span>
            <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-emerald-200 flex-shrink-0" />
          </div>
          
          {/* Main Title with Dynamic Earnings */}
          <div className="mb-6">
            <h2 className="mobile-text-5xl font-bold text-white mb-4 tracking-tight leading-tight px-2">
              Refer a client and earn a{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
                10% commission
              </span>
            </h2>
            
            {/* Dynamic earnings display */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-emerald-200 text-lg font-medium">Last payout:</span>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-emerald-300/30">
                <span className="text-2xl font-bold text-yellow-300">
                  {earnings[currentEarning]}
                </span>
              </div>
            </div>
          </div>
          
          <p className="text-2xl text-emerald-100 mb-10 max-w-4xl mx-auto leading-relaxed font-light">
            Join our referral program and earn substantial rewards for every successful project you refer to us.
            <span className="font-bold text-yellow-300 block mt-2"> Start building your passive income today!</span>
          </p>
          
          {/* Enhanced CTA Section */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-white to-emerald-50 text-emerald-700 hover:from-emerald-50 hover:to-white font-bold px-12 py-6 text-2xl shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-500 rounded-3xl border-2 border-emerald-300/40 hover:border-emerald-300/70 group relative overflow-hidden"
              onClick={handleReferralClick}
            >
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Handshake className="w-8 h-8 mr-4 relative z-10" />
              <span className="relative z-10">Start Referring Now</span>
              <ArrowRight className="w-6 h-6 ml-3 relative z-10" />
            </Button>
            
            <div className="flex items-center gap-3 text-emerald-200 text-lg bg-black/20 backdrop-blur-sm px-6 py-3 rounded-full border border-emerald-300/30">
              <DollarSign className="w-6 h-6" />
              <span className="font-semibold">Unlimited earning potential</span>
            </div>
          </div>

          {/* Enhanced Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-8">
            <div className="group bg-white/15 backdrop-blur-lg rounded-2xl p-8 border border-emerald-300/30 hover:border-emerald-300/50 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400/40 to-teal-400/40 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Gift className="w-8 h-8 text-emerald-200" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">10% Commission</h3>
              <p className="text-emerald-100 text-base leading-relaxed">Earn 10% of the total project value for every successful referral - no caps, no limits</p>
            </div>
            
            <div className="group bg-white/15 backdrop-blur-lg rounded-2xl p-8 border border-emerald-300/30 hover:border-emerald-300/50 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-400/40 to-cyan-400/40 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-teal-200" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Unlimited Referrals</h3>
              <p className="text-emerald-100 text-base leading-relaxed">Refer as many clients as you want and keep earning commissions on every project</p>
            </div>
            
            <div className="group bg-white/15 backdrop-blur-lg rounded-2xl p-8 border border-emerald-300/30 hover:border-emerald-300/50 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400/40 to-emerald-400/40 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Handshake className="w-8 h-8 text-cyan-200" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Quick Payout</h3>
              <p className="text-emerald-100 text-base leading-relaxed">Get paid within 30 days of project completion - fast, reliable, and transparent</p>
            </div>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-6">
            <div className="flex items-center gap-2 text-emerald-200">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">Trusted by 50+ partners</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-200">
              <DollarSign className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium">₹2.5L+ paid in commissions</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-200">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium">Growing network</span>
            </div>
          </div>
          
          <div className="text-sm text-emerald-200 opacity-90 bg-black/20 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
            *Commission paid after successful project completion and payment. Terms and conditions apply.
          </div>
        </div>
      </div>
    </section>
  );
}