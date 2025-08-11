import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Info, Settings, Briefcase, Code, BookOpen, FileText, Users, Phone, Folder, Building, GraduationCap, FileSearch, HelpCircle, UserCheck } from "lucide-react";
import logoGif from "@assets/fetchpik.com-iconscout-uF5IrzRZx4_1754923363460.gif";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const [activeTab, setActiveTab] = useState("Home");
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileMenuOpen(false);
      }
    };

    handleScroll();
    handleResize();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener("resize", handleResize);
    
    // Close mobile menu on outside click
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && !(event.target as Element).closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Mobile Header */}
        <div className="flex items-center justify-between py-3 lg:hidden">
          {/* Mobile Logo */}
          <a href="/" className="flex items-center space-x-2" data-testid="link-home">
            <img 
              src={logoGif} 
              alt="Aptivon Solutions" 
              className="w-auto h-8"
            />
            <div>
              <div className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
                Aptivon Solutions
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Enterprise Technology</p>
            </div>
          </a>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block">
          {/* Desktop Logo */}
          <div className="flex justify-center items-center py-4 mb-4">
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

          {/* Desktop Navigation */}
          <div className="flex justify-center pb-4">
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
                      "relative cursor-pointer text-xs xl:text-sm font-semibold px-2 xl:px-3 py-2 rounded-full transition-colors whitespace-nowrap",
                      "text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400",
                      isActive && "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20"
                    )}
                    data-testid={`nav-${item.name.toLowerCase().replace(' ', '-')}`}
                  >
                    <span>{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="lamp"
                        className="absolute inset-0 w-full bg-purple-100/50 dark:bg-purple-900/30 rounded-full -z-10"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-200 overflow-hidden"
          >
            <div className="py-4 space-y-2 max-h-96 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.name;

                return (
                  <a
                    key={item.name}
                    href={item.url}
                    onClick={() => {
                      setActiveTab(item.name);
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                      "text-gray-700 dark:text-gray-200 hover:bg-gray-50 hover:text-purple-600",
                      isActive && "text-purple-600 bg-purple-50 dark:bg-purple-900/20"
                    )}
                    data-testid={`nav-mobile-${item.name.toLowerCase().replace(' ', '-')}`}
                  >
                    <Icon size={20} strokeWidth={2} />
                    <span className="font-medium">{item.name}</span>
                    {isActive && (
                      <div className="w-2 h-2 bg-purple-600 rounded-full ml-auto"></div>
                    )}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}