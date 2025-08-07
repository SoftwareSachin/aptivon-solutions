import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Globe, Sparkles, Award, Users, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import lightningFastGif from "@assets/fetchpik.com-iconscout-NSEC10nAzj_1751913193156.gif";
import fortKnoxSecurityGif from "@assets/fetchpik.com-iconscout-83wO1kiIYP_1751913411852.gif";
import globalReachGif from "@assets/fetchpik.com-iconscout-agj3wec09D_1751913432099.gif";

export default function HeroSection() {
  const [currentStat, setCurrentStat] = useState(0);
  
  const stats = [
    { icon: Award, value: "5+", label: "Projects Delivered" },
    { icon: Users, value: "3+", label: "Happy Clients" },
    { icon: TrendingUp, value: "98%", label: "Success Rate" },
    { icon: Globe, value: "15+", label: "Technologies" }
  ];

  // Removed timer to eliminate lag
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentStat((prev) => (prev + 1) % stats.length);
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative viewport-height flex items-center overflow-hidden pt-16 sm:pt-20 lg:pt-24 safe-area-padding">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 via-transparent to-purple-600/5"></div>
        {/* Static background elements - responsive positioning */}
        <div className="absolute top-20 left-4 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 bg-blue-500/10 rounded-full"></div>
        <div className="absolute top-32 sm:top-40 right-4 sm:right-20 w-20 h-20 sm:w-32 sm:h-32 bg-purple-500/10 rounded-full"></div>
        <div className="absolute bottom-40 left-1/4 w-12 h-12 sm:w-16 sm:h-16 bg-green-500/10 rounded-full"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto mobile-container z-10">
        <div className="grid lg:grid-cols-2 mobile-gap items-center min-h-0">
          {/* Content */}
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white rounded-full mb-6 sm:mb-8 border border-slate-200">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-slate-700 text-xs sm:text-sm font-medium">Next-Gen Enterprise Solutions</span>
            </div>
            
            <h1 className="mobile-text-6xl font-bold mb-6 sm:mb-8 leading-tight">
              <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Enterprise IT Services & Technology Consulting
              </span>
            </h1>
            
            <p className="mobile-text-xl text-slate-600 mb-8 sm:mb-10 leading-relaxed max-w-lg">
              <strong>Aptivon Solutions</strong> is a leading enterprise technology consulting firm specializing in <strong>cloud migration</strong>, <strong>AI/ML implementation</strong>, <strong>DevOps automation</strong>, and <strong>custom software development</strong>. We deliver proven technology solutions that transform operations and drive business growth.
            </p>
            
            <div className="flex mobile-flex-col mobile-gap mb-8 sm:mb-12">
              <Button
                onClick={() => scrollToSection("contact")}
                className="mobile-button bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg font-semibold rounded-xl touch-target"
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                onClick={() => scrollToSection("services")}
                variant="outline"
                className="mobile-button border-2 border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400 text-base sm:text-lg font-semibold rounded-xl touch-target"
              >
                Explore Services
              </Button>
            </div>
            
            {/* Animated Stats */}
            <div className="grid mobile-grid-3 mobile-gap">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div 
                    key={index}
                    className={`text-center mobile-card-padding rounded-xl transition-all duration-500 ${
                      currentStat === index 
                        ? 'bg-white/80 backdrop-blur-sm border border-blue-200/60 shadow-lg transform scale-105' 
                        : 'bg-white/40 backdrop-blur-sm'
                    }`}
                  >
                    <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 ${
                      currentStat === index ? 'text-blue-600' : 'text-slate-500'
                    }`} />
                    <div className={`mobile-text-2xl font-bold mb-1 ${
                      currentStat === index ? 'text-blue-600' : 'text-slate-900'
                    }`}>
                      {stat.value}
                    </div>
                    <div className="text-slate-600 text-xs sm:text-sm">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Enhanced Visual Content - Show on mobile too but simplified */}
          <div className="relative lg:block mt-8 lg:mt-0">
            <div className="relative">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
              
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl mobile-card-padding shadow-2xl border border-white/20">
                <div className="grid mobile-grid-2 mobile-gap mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl mobile-card-padding shadow-lg transform hover:scale-105 transition-all duration-300">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl flex items-center justify-center mb-3 sm:mb-4 shadow-md flex-shrink-0">
                      <img 
                        src={lightningFastGif} 
                        alt="Lightning Fast" 
                        className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                      />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2 text-sm sm:text-base">Lightning Fast</h3>
                    <p className="text-slate-600 text-xs sm:text-sm">Deploy in minutes, not months with our automated solutions</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl mobile-card-padding shadow-lg transform hover:scale-105 transition-all duration-300">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl flex items-center justify-center mb-3 sm:mb-4 shadow-md flex-shrink-0">
                      <img 
                        src={fortKnoxSecurityGif} 
                        alt="Fort Knox Security" 
                        className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                      />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2 text-sm sm:text-base">Fort Knox Security</h3>
                    <p className="text-slate-600 text-xs sm:text-sm">Enterprise-grade security with zero-trust architecture</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl mobile-card-padding shadow-lg transform hover:scale-105 transition-all duration-300">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl flex items-center justify-center mb-3 sm:mb-4 shadow-md flex-shrink-0">
                    <img 
                      src={globalReachGif} 
                      alt="Global Reach" 
                      className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                    />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 text-sm sm:text-base">Global Reach</h3>
                  <p className="text-slate-600 text-xs sm:text-sm">Scalable infrastructure spanning multiple regions worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
