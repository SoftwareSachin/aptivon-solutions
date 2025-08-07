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
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 flex flex-col items-center justify-center h-full text-center">
        {/* Enhanced Content Column */}
        <div className="space-y-8">
          {/* Professional enterprise badge */}
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-cyan-400/40 shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all duration-300">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-slate-100 text-sm font-semibold tracking-wide uppercase">Enterprise AI Solutions</span>
          </div>
          
          {/* Professional typewriter headline */}
          <h1 className="text-6xl lg:text-7xl font-black text-white leading-none tracking-tight">
            <span className="block mb-2">Transform Your Business with</span>
            <span className="block bg-gradient-to-r from-cyan-200 via-purple-300 to-violet-200 bg-clip-text text-transparent text-7xl lg:text-8xl">
              {typewriterText}
              <span className="animate-pulse text-cyan-300 ml-1">|</span>
            </span>
            <span className="block text-slate-200 text-5xl lg:text-6xl mt-2 font-bold">AI Solutions</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
            <span className="text-white font-medium">Aptivon Solutions</span> delivers enterprise-grade AI automation, 
            cloud infrastructure, and digital transformation services that <span className="text-cyan-300 font-medium">scale your operations</span> and 
            <span className="text-purple-300 font-medium">accelerate growth</span>.
          </p>
          
          {/* Professional CTA buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8">
            <Button
              onClick={() => scrollToSection("services")}
              className="group relative px-10 py-5 bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/40 text-lg shadow-lg"
            >
              <span className="relative z-10">Explore Solutions</span>
              <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-2" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-teal-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
            </Button>
            <Button
              onClick={() => scrollToSection("contact")}
              className="group px-10 py-5 bg-white/95 hover:bg-white text-slate-800 hover:text-slate-900 font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-white/30 text-lg"
            >
              <Shield className="mr-3 w-6 h-6 text-slate-700 group-hover:text-slate-800 transition-colors" />
              Get Consultation
            </Button>
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
