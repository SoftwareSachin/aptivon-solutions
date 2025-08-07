import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Info, Settings, Briefcase, Code, BookOpen, FileText, Users, Phone, Folder } from "lucide-react";
import logoGif from "../assets/new-logo.gif";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const [activeTab, setActiveTab] = useState("Home");
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { name: "Home", url: "/", icon: Home },
    { name: "About", url: "/about", icon: Info },
    { name: "Services", url: "/services", icon: Settings },
    { name: "Portfolio", url: "/portfolio", icon: Briefcase },
    { name: "Blog", url: "/blog", icon: BookOpen },
    { name: "Contact", url: "/contact", icon: Phone }
  ];

  const moreItems = [
    { name: "Solutions", url: "/solutions" },
    { name: "Industries", url: "/industries" },
    { name: "College Projects", url: "/college-projects" },
    { name: "Case Studies", url: "/case-studies" },
    { name: "Resources", url: "/resources" },
    { name: "Support", url: "/support" },
    { name: "Careers", url: "/careers" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleScroll();
    handleResize();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/10 dark:bg-white/5 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Top Row - Logo and Company Name */}
        <div className="flex justify-center items-center mb-6">
          <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity" data-testid="link-home">
            <img 
              src={logoGif} 
              alt="Aptivon Solutions" 
              className="w-auto h-10"
            />
            <div>
              <div className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                Aptivon Solutions
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Enterprise Technology</p>
            </div>
          </a>
        </div>

        {/* Main Navigation */}
        <div className="flex justify-center mb-4">
          <div className="flex items-center gap-3 bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-lg py-2 px-2 rounded-full shadow-lg">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;

              return (
                <a
                  key={item.name}
                  href={item.url}
                  onClick={() => setActiveTab(item.name)}
                  className={cn(
                    "relative cursor-pointer text-sm font-semibold px-4 py-2 rounded-full transition-colors",
                    "text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400",
                    isActive && "text-purple-600 dark:text-purple-400"
                  )}
                  data-testid={`nav-${item.name.toLowerCase()}`}
                >
                  <span className="hidden sm:inline">{item.name}</span>
                  <span className="sm:hidden">
                    <Icon size={18} strokeWidth={2.5} />
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="lamp"
                      className="absolute inset-0 w-full bg-purple-500/10 dark:bg-purple-400/10 rounded-full -z-10"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-purple-500 dark:bg-purple-400 rounded-t-full">
                        <div className="absolute w-12 h-6 bg-purple-500/20 dark:bg-purple-400/20 rounded-full blur-md -top-2 -left-2" />
                        <div className="absolute w-8 h-6 bg-purple-500/20 dark:bg-purple-400/20 rounded-full blur-md -top-1" />
                        <div className="absolute w-4 h-4 bg-purple-500/20 dark:bg-purple-400/20 rounded-full blur-sm top-0 left-2" />
                      </div>
                    </motion.div>
                  )}
                </a>
              );
            })}
          </div>
        </div>

        {/* Secondary Navigation */}
        <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
          {moreItems.map((item) => (
            <a
              key={item.name}
              href={item.url}
              className="text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 bg-white/5 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white/20"
              data-testid={`nav-${item.name.toLowerCase().replace(' ', '-')}`}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
