import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Globe, Sparkles, Award, Users, TrendingUp, ChevronDown, Play } from "lucide-react";
import { useState, useEffect } from "react";
import lightningFastGif from "@assets/fetchpik.com-iconscout-NSEC10nAzj_1751913193156.gif";
import fortKnoxSecurityGif from "@assets/fetchpik.com-iconscout-83wO1kiIYP_1751913411852.gif";
import globalReachGif from "@assets/fetchpik.com-iconscout-agj3wec09D_1751913432099.gif";

export default function HeroSection() {
  const [currentStat, setCurrentStat] = useState(0);
  const [typewriterText, setTypewriterText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  
  const stats = [
    { icon: Award, value: "5+", label: "Projects Delivered" },
    { icon: Users, value: "3+", label: "Happy Clients" },
    { icon: TrendingUp, value: "98%", label: "Success Rate" },
    { icon: Globe, value: "15+", label: "Technologies" }
  ];

  const typewriterWords = ["Automate", "Optimize", "Innovate"];
  
  // Enhanced typewriter effect
  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    const type = () => {
      const currentWord = typewriterWords[wordIndex];
      
      if (!isDeleting) {
        if (charIndex <= currentWord.length) {
          setTypewriterText(currentWord.slice(0, charIndex));
          charIndex++;
        }
        
        if (charIndex > currentWord.length) {
          setTimeout(() => {
            isDeleting = true;
          }, 2000);
        }
      } else {
        if (charIndex > 0) {
          setTypewriterText(currentWord.slice(0, charIndex));
          charIndex--;
        }
        
        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % typewriterWords.length;
        }
      }
    };
    
    const timer = setInterval(type, isDeleting ? 100 : 200);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-screen flex items-center overflow-hidden pt-20">
      {/* Enhanced animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-700 animate-gradient-x">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-purple-600/10"></div>
        {/* Animated floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-400/20 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-green-400/20 rounded-full animate-float-slow"></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-indigo-400/15 rounded-full animate-float"></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center h-full">
        {/* Enhanced Content Column */}
        <div className="flex-1 text-center lg:text-left space-y-6">
          {/* Premium badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20">
            <Sparkles className="w-5 h-5 text-blue-300" />
            <span className="text-blue-100 text-sm font-medium">Next-Gen Enterprise Solutions</span>
          </div>
          
          {/* Typewriter headline */}
          <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            <span className="block">Building Intelligent</span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {typewriterText}
              <span className="animate-pulse text-blue-400">|</span>
            </span>
            <span className="block text-indigo-200">Software Solutions</span>
          </h1>
          
          <p className="text-lg lg:text-xl text-indigo-200 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            We craft AI-driven solutions that automate workflows, boost efficiency, and drive exponential growth for modern enterprises.
          </p>
          
          {/* Enhanced CTA buttons */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
            <Button
              onClick={() => scrollToSection("services")}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-2xl transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25"
            >
              Our Services
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              onClick={() => scrollToSection("contact")}
              variant="outline"
              className="group px-8 py-4 border-2 border-blue-500 hover:border-blue-400 text-blue-300 hover:text-white hover:bg-blue-500/20 font-medium rounded-2xl transition-all backdrop-blur-sm"
            >
              <Play className="mr-2 w-5 h-5" />
              Let's Talk
            </Button>
          </div>
        </div>
        
        {/* Enhanced 3D Visual Column */}
        <div className="flex-1 mt-12 lg:mt-0 flex justify-center lg:justify-end">
          <div className="relative">
            {/* Glassmorphism card with floating animation */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 space-y-6 max-w-md border border-white/20 animate-float">
              {/* Animated accent line */}
              <div className="w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
              
              {/* Feature cards */}
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                      <img 
                        src={lightningFastGif} 
                        alt="Lightning Fast" 
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm">Lightning Fast</h3>
                      <p className="text-blue-200 text-xs">Deploy in minutes</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                      <img 
                        src={fortKnoxSecurityGif} 
                        alt="Fort Knox Security" 
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm">Enterprise Security</h3>
                      <p className="text-purple-200 text-xs">Zero-trust architecture</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center">
                      <img 
                        src={globalReachGif} 
                        alt="Global Reach" 
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm">Global Scale</h3>
                      <p className="text-green-200 text-xs">Worldwide infrastructure</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <IconComponent className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-indigo-200 text-xs">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <ChevronDown 
          className="w-8 h-8 text-white animate-bounce cursor-pointer hover:text-blue-300 transition-colors" 
          onClick={() => scrollToSection("services")}
        />
      </div>
    </section>
  );
}
