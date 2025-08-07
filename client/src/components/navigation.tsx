import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoGif from "../assets/new-logo.gif";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.querySelector('nav');
      if (isMenuOpen && nav && !nav.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 safe-area-padding ${
      isScrolled 
        ? 'bg-white border-b border-slate-200 shadow-lg py-2 sm:py-3' 
        : 'bg-white py-3 sm:py-4'
    }`}>
      <div className="max-w-7xl mx-auto mobile-container">
        <div className="flex justify-between items-center min-h-[44px]">
          <a href="/" className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3 hover:opacity-80 transition-opacity cursor-pointer touch-target" data-testid="link-home">
            <img 
              src={logoGif} 
              alt="Aptivon Solutions" 
              className={`w-auto transition-all duration-300 ${
                isScrolled ? 'h-5 sm:h-6 md:h-8' : 'h-6 sm:h-8 md:h-10'
              }`}
            />
            <div className="hidden sm:block">
              <div className="text-base sm:text-lg md:text-xl font-bold text-slate-900 tracking-tight">
                Aptivon Solutions
              </div>
              <p className="text-xs text-slate-500 font-medium mobile-hide">Enterprise Technology</p>
            </div>
            <div className="block sm:hidden">
              <div className="text-sm font-bold text-slate-900 tracking-tight">
                Aptivon
              </div>
            </div>
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-3 lg:space-x-4">
            <a href="/about" className="text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium text-sm touch-target" data-testid="link-about">About</a>
            <a href="/services" className="text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium text-sm touch-target" data-testid="link-services">Services</a>
            <a href="/solutions" className="text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium text-sm touch-target" data-testid="link-solutions">Solutions</a>
            <a href="/industries" className="text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium text-sm touch-target" data-testid="link-industries">Industries</a>
            <a href="/portfolio" className="text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium text-sm touch-target" data-testid="link-portfolio">Portfolio</a>
            <a href="/college-projects" className="text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium text-sm touch-target hidden 2xl:inline" data-testid="link-college-projects">College Projects</a>
            <a href="/blog" className="text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium text-sm touch-target" data-testid="link-blog">Blog</a>
            <a href="/case-studies" className="text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium text-sm touch-target" data-testid="link-case-studies">Cases</a>
            <a href="/resources" className="text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium text-sm touch-target hidden 2xl:inline" data-testid="link-resources">Resources</a>
            <a href="/support" className="text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium text-sm touch-target hidden 2xl:inline" data-testid="link-support">Support</a>
            <a href="/careers" className="text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium text-sm touch-target hidden 2xl:inline" data-testid="link-careers">Careers</a>
            <a
              href="/contact"
              className="bg-slate-900 hover:bg-slate-800 text-white px-3 lg:px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg text-sm touch-target"
              data-testid="button-contact"
            >
              Contact
            </a>
          </div>

          {/* Tablet Navigation - More Compact */}
          <div className="hidden lg:flex xl:hidden items-center space-x-2">
            <a href="/about" className="text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium text-sm touch-target" data-testid="link-about">About</a>
            <a href="/services" className="text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium text-sm touch-target" data-testid="link-services">Services</a>
            <a href="/portfolio" className="text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium text-sm touch-target" data-testid="link-portfolio">Portfolio</a>
            <a href="/blog" className="text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium text-sm touch-target" data-testid="link-blog">Blog</a>
            <a href="/resources" className="text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium text-sm touch-target" data-testid="link-resources">Resources</a>
            <a
              href="/contact"
              className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg text-sm touch-target"
              data-testid="button-contact"
            >
              Contact
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="touch-target min-w-[44px] min-h-[44px] p-2"
              data-testid="button-mobile-menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 shadow-lg absolute left-0 right-0 top-full z-50 safe-area-padding">
            <div className="mobile-container py-3 sm:py-4 space-y-0 max-h-[80vh] overflow-y-auto">
              <a href="/about" className="block py-3 sm:py-4 text-slate-700 hover:text-slate-900 font-medium touch-target border-b border-slate-100 text-base" onClick={() => setIsMenuOpen(false)} data-testid="mobile-link-about">About</a>
              <a href="/services" className="block py-3 sm:py-4 text-slate-700 hover:text-slate-900 font-medium touch-target border-b border-slate-100 text-base" onClick={() => setIsMenuOpen(false)} data-testid="mobile-link-services">Services</a>
              <a href="/solutions" className="block py-3 sm:py-4 text-slate-700 hover:text-slate-900 font-medium touch-target border-b border-slate-100 text-base" onClick={() => setIsMenuOpen(false)} data-testid="mobile-link-solutions">Solutions</a>
              <a href="/industries" className="block py-3 sm:py-4 text-slate-700 hover:text-slate-900 font-medium touch-target border-b border-slate-100 text-base" onClick={() => setIsMenuOpen(false)} data-testid="mobile-link-industries">Industries</a>
              <a href="/portfolio" className="block py-3 sm:py-4 text-slate-700 hover:text-slate-900 font-medium touch-target border-b border-slate-100 text-base" onClick={() => setIsMenuOpen(false)} data-testid="mobile-link-portfolio">Portfolio</a>
              <a href="/college-projects" className="block py-3 sm:py-4 text-slate-700 hover:text-slate-900 font-medium touch-target border-b border-slate-100 text-base" onClick={() => setIsMenuOpen(false)} data-testid="mobile-link-college-projects">College Projects</a>
              <a href="/blog" className="block py-3 sm:py-4 text-slate-700 hover:text-slate-900 font-medium touch-target border-b border-slate-100 text-base" onClick={() => setIsMenuOpen(false)} data-testid="mobile-link-blog">Blog</a>
              <a href="/case-studies" className="block py-3 sm:py-4 text-slate-700 hover:text-slate-900 font-medium touch-target border-b border-slate-100 text-base" onClick={() => setIsMenuOpen(false)} data-testid="mobile-link-case-studies">Case Studies</a>
              <a href="/resources" className="block py-3 sm:py-4 text-slate-700 hover:text-slate-900 font-medium touch-target border-b border-slate-100 text-base" onClick={() => setIsMenuOpen(false)} data-testid="mobile-link-resources">Resources</a>
              <a href="/support" className="block py-3 sm:py-4 text-slate-700 hover:text-slate-900 font-medium touch-target border-b border-slate-100 text-base" onClick={() => setIsMenuOpen(false)} data-testid="mobile-link-support">Support</a>
              <a href="/careers" className="block py-3 sm:py-4 text-slate-700 hover:text-slate-900 font-medium touch-target border-b border-slate-100 text-base" onClick={() => setIsMenuOpen(false)} data-testid="mobile-link-careers">Careers</a>
              <a
                href="/contact"
                className="block w-full mt-3 sm:mt-4 bg-slate-900 hover:bg-slate-800 text-white py-3 sm:py-4 font-medium text-center rounded-lg touch-target text-base min-h-[44px] flex items-center justify-center"
                onClick={() => setIsMenuOpen(false)}
                data-testid="mobile-button-contact"
              >
                Contact Us
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
