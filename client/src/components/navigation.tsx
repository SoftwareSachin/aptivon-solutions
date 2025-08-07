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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white border-b border-slate-200 shadow-lg py-2 sm:py-3' 
        : 'bg-white py-3 sm:py-4'
    }`}>
      <div className="max-w-7xl mx-auto mobile-container">
        <div className="flex justify-between items-center">
          <a href="/" className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity cursor-pointer">
            <img 
              src={logoGif} 
              alt="Aptivon Solutions" 
              className={`w-auto transition-all duration-300 ${
                isScrolled ? 'h-6 sm:h-8' : 'h-8 sm:h-10'
              }`}
            />
            <div className="hidden sm:block">
              <div className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                Aptivon Solutions
              </div>
              <p className="text-xs text-slate-500 font-medium mobile-hide">Enterprise Technology</p>
            </div>
            <div className="block sm:hidden">
              <div className="text-base font-bold text-slate-900 tracking-tight">
                Aptivon
              </div>
            </div>
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-4">
            <a href="/about" className="text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium text-sm">About</a>
            <a href="/services" className="text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium text-sm">Services</a>
            <a href="/solutions" className="text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium text-sm">Solutions</a>
            <a href="/industries" className="text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium text-sm">Industries</a>
            <a href="/portfolio" className="text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium text-sm">Portfolio</a>
            <a href="/college-projects" className="text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium text-sm">College Projects</a>
            <a href="/blog" className="text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium text-sm">Blog</a>
            <a href="/case-studies" className="text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium text-sm">Cases</a>
            <a href="/resources" className="text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium text-sm">Resources</a>
            <a href="/support" className="text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium text-sm">Support</a>
            <a href="/careers" className="text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium text-sm">Careers</a>
            <a
              href="/contact"
              className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg text-sm"
            >
              Contact
            </a>
          </div>

          {/* Tablet Navigation - Compact */}
          <div className="hidden lg:flex xl:hidden items-center space-x-3">
            <a href="/about" className="text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium text-sm">About</a>
            <a href="/services" className="text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium text-sm">Services</a>
            <a href="/portfolio" className="text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium text-sm">Portfolio</a>
            <a href="/blog" className="text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium text-sm">Blog</a>
            <a href="/resources" className="text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium text-sm">Resources</a>
            <a
              href="/contact"
              className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg text-sm"
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
              className="touch-target"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 shadow-lg absolute left-0 right-0 top-full">
            <div className="mobile-container py-4 space-y-1 max-h-[80vh] overflow-y-auto">
              <a href="/about" className="block py-3 text-slate-700 hover:text-slate-900 font-medium touch-target border-b border-slate-100" onClick={() => setIsMenuOpen(false)}>About</a>
              <a href="/services" className="block py-3 text-slate-700 hover:text-slate-900 font-medium touch-target border-b border-slate-100" onClick={() => setIsMenuOpen(false)}>Services</a>
              <a href="/solutions" className="block py-3 text-slate-700 hover:text-slate-900 font-medium touch-target border-b border-slate-100" onClick={() => setIsMenuOpen(false)}>Solutions</a>
              <a href="/industries" className="block py-3 text-slate-700 hover:text-slate-900 font-medium touch-target border-b border-slate-100" onClick={() => setIsMenuOpen(false)}>Industries</a>
              <a href="/portfolio" className="block py-3 text-slate-700 hover:text-slate-900 font-medium touch-target border-b border-slate-100" onClick={() => setIsMenuOpen(false)}>Portfolio</a>
              <a href="/college-projects" className="block py-3 text-slate-700 hover:text-slate-900 font-medium touch-target border-b border-slate-100" onClick={() => setIsMenuOpen(false)}>College Projects</a>
              <a href="/blog" className="block py-3 text-slate-700 hover:text-slate-900 font-medium touch-target border-b border-slate-100" onClick={() => setIsMenuOpen(false)}>Blog</a>
              <a href="/case-studies" className="block py-3 text-slate-700 hover:text-slate-900 font-medium touch-target border-b border-slate-100" onClick={() => setIsMenuOpen(false)}>Case Studies</a>
              <a href="/resources" className="block py-3 text-slate-700 hover:text-slate-900 font-medium touch-target border-b border-slate-100" onClick={() => setIsMenuOpen(false)}>Resources</a>
              <a href="/support" className="block py-3 text-slate-700 hover:text-slate-900 font-medium touch-target border-b border-slate-100" onClick={() => setIsMenuOpen(false)}>Support</a>
              <a href="/careers" className="block py-3 text-slate-700 hover:text-slate-900 font-medium touch-target border-b border-slate-100" onClick={() => setIsMenuOpen(false)}>Careers</a>
              <a
                href="/contact"
                className="block w-full mt-4 bg-slate-900 hover:bg-slate-800 text-white py-4 font-medium text-center rounded-lg touch-target"
                onClick={() => setIsMenuOpen(false)}
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
