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
      {/* Cosmic Void - Ultramarine-tinged black background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 animate-gradient-x">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/30 via-transparent to-purple-950/20"></div>
        {/* Cosmic floating elements with vibrant colors */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-cyan-400/15 rounded-full animate-float blur-sm"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/10 rounded-full animate-float-delayed blur-md"></div>
        <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-cyan-300/20 rounded-full animate-float-slow"></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-violet-400/12 rounded-full animate-float blur-sm"></div>
        <div className="absolute bottom-20 right-10 w-12 h-12 bg-cyan-500/25 rounded-full animate-float-delayed"></div>
        <div className="absolute top-60 left-1/3 w-28 h-28 bg-purple-400/8 rounded-full animate-float-slow blur-lg"></div>
        {/* Subtle star field effect */}
        <div className="absolute top-10 left-1/4 w-1 h-1 bg-cyan-300 rounded-full animate-pulse opacity-70"></div>
        <div className="absolute top-32 right-1/3 w-1 h-1 bg-purple-300 rounded-full animate-pulse opacity-80"></div>
        <div className="absolute bottom-32 left-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-1/2 right-20 w-1 h-1 bg-violet-300 rounded-full animate-pulse opacity-75"></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center h-full">
        {/* Enhanced Content Column */}
        <div className="flex-1 text-center lg:text-left space-y-6">
          {/* Cosmic premium badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900/80 backdrop-blur-lg rounded-full border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-100 text-sm font-medium">Next-Gen Enterprise Solutions</span>
          </div>
          
          {/* Cosmic typewriter headline */}
          <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            <span className="block">Building Intelligent</span>
            <span className="bg-gradient-to-r from-cyan-300 via-purple-400 to-violet-300 bg-clip-text text-transparent">
              {typewriterText}
              <span className="animate-pulse text-cyan-400">|</span>
            </span>
            <span className="block text-slate-300">Software Solutions</span>
          </h1>
          
          <p className="text-lg lg:text-xl text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            We craft AI-driven solutions that automate workflows, boost efficiency, and drive exponential growth for modern enterprises.
          </p>
          
          {/* Enhanced CTA buttons */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
            <Button
              onClick={() => scrollToSection("services")}
              className="group px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25"
            >
              Our Services
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              onClick={() => scrollToSection("contact")}
              variant="outline"
              className="group px-8 py-4 border-2 border-cyan-400 hover:border-purple-400 text-cyan-300 hover:text-white hover:bg-cyan-500/20 font-medium rounded-2xl transition-all backdrop-blur-sm"
            >
              <Play className="mr-2 w-5 h-5" />
              Let's Talk
            </Button>
          </div>
        </div>
        
        {/* Enhanced 3D Visual Column */}
        <div className="flex-1 mt-12 lg:mt-0 flex justify-center lg:justify-end">
          <div className="relative">
            {/* Cosmic glassmorphism card with floating animation */}
            <div className="bg-slate-900/60 backdrop-blur-lg rounded-3xl p-8 space-y-6 max-w-md border border-cyan-500/30 animate-float shadow-xl shadow-purple-900/20">
              {/* Cosmic animated accent line */}
              <div className="w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-pulse shadow-lg shadow-cyan-400/30"></div>
              
              {/* Feature cards */}
              <div className="space-y-4">
                <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-4 border border-cyan-500/20 hover:bg-slate-700/40 hover:border-cyan-400/30 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                      <img 
                        src={lightningFastGif} 
                        alt="Lightning Fast" 
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm">Lightning Fast</h3>
                      <p className="text-cyan-200 text-xs">Deploy in minutes</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20 hover:bg-slate-700/40 hover:border-purple-400/30 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
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
                
                <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-4 border border-cyan-500/20 hover:bg-slate-700/40 hover:border-cyan-400/30 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-400/25">
                      <img 
                        src={globalReachGif} 
                        alt="Global Reach" 
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm">Global Scale</h3>
                      <p className="text-cyan-200 text-xs">Worldwide infrastructure</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Cosmic stats grid */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-cyan-500/30">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <IconComponent className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-slate-300 text-xs">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cosmic Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <ChevronDown 
          className="w-8 h-8 text-cyan-300 animate-bounce cursor-pointer hover:text-purple-300 transition-colors drop-shadow-lg" 
          onClick={() => scrollToSection("services")}
        />
      </div>
    </section>
  );
}
