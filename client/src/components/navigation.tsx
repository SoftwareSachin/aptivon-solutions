import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Info, Settings, Briefcase, Code, BookOpen, FileText, Users, Phone, Folder, Building, GraduationCap, FileSearch, HelpCircle, UserCheck } from "lucide-react";
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
    { name: "Solutions", url: "/solutions", icon: Building },
    { name: "Portfolio", url: "/portfolio", icon: Briefcase },
    { name: "Industries", url: "/industries", icon: Building },
    { name: "College Projects", url: "/college-projects", icon: GraduationCap },
    { name: "Case Studies", url: "/case-studies", icon: FileSearch },
    { name: "Resources", url: "/resources", icon: BookOpen },
    { name: "Blog", url: "/blog", icon: BookOpen },
    { name: "Support", url: "/support", icon: HelpCircle },
    { name: "Careers", url: "/careers", icon: UserCheck },
    { name: "Contact", url: "/contact", icon: Phone }
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
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
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
        <div className="flex justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2 bg-gray-50/80 border border-gray-200/60 py-2 px-3 rounded-full shadow-sm max-w-6xl">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;

              return (
                <a
                  key={item.name}
                  href={item.url}
                  onClick={() => setActiveTab(item.name)}
                  className={cn(
                    "relative cursor-pointer text-xs font-semibold px-3 py-2 rounded-full transition-colors whitespace-nowrap",
                    "text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400",
                    isActive && "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20"
                  )}
                  data-testid={`nav-${item.name.toLowerCase().replace(' ', '-')}`}
                >
                  <span className="hidden md:inline">{item.name}</span>
                  <span className="md:hidden">
                    <Icon size={16} strokeWidth={2.5} />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}