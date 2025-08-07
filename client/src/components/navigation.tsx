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
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-4">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img 
          src={logoGif} 
          alt="Aptivon Solutions" 
          className="w-auto h-8 sm:h-10"
        />
        <div className="hidden sm:block">
          <div className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
            Aptivon Solutions
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Enterprise Technology</p>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex items-center gap-2 bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-3 sm:px-4 py-2 rounded-full transition-colors",
                "text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400",
                isActive && "text-purple-600 dark:text-purple-400"
              )}
              data-testid={`nav-${item.name.toLowerCase()}`}
            >
              <span className="hidden lg:inline">{item.name}</span>
              <span className="lg:hidden">
                <Icon size={16} strokeWidth={2.5} />
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
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-1 bg-purple-500 dark:bg-purple-400 rounded-t-full">
                    <div className="absolute w-8 h-4 bg-purple-500/20 dark:bg-purple-400/20 rounded-full blur-md -top-1 -left-1" />
                    <div className="absolute w-6 h-4 bg-purple-500/20 dark:bg-purple-400/20 rounded-full blur-md -top-0.5" />
                  </div>
                </motion.div>
              )}
            </a>
          );
        })}
      </div>

      {/* Secondary Navigation */}
      <div className="flex flex-wrap justify-center gap-1.5 max-w-3xl">
        {moreItems.map((item) => (
          <a
            key={item.name}
            href={item.url}
            className="text-xs text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 bg-white/5 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white/20"
            data-testid={`nav-${item.name.toLowerCase().replace(' ', '-')}`}
          >
            {item.name}
          </a>
        ))}
      </div>
    </div>
  );
}
