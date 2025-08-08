'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, Cookie, Shield, Settings } from 'lucide-react';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    localStorage.setItem('cookieAcceptedDate', new Date().toISOString());
    setIsVisible(false);
  };

  const rejectCookies = () => {
    localStorage.setItem('cookiesAccepted', 'false');
    localStorage.setItem('cookieAcceptedDate', new Date().toISOString());
    setIsVisible(false);
  };

  const acceptEssentialOnly = () => {
    localStorage.setItem('cookiesAccepted', 'essential');
    localStorage.setItem('cookieAcceptedDate', new Date().toISOString());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        data-testid="cookie-banner"
      >
        <div className="mx-auto max-w-7xl">
          <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl backdrop-blur-xl bg-opacity-95 dark:bg-opacity-95">
            {/* Close Button */}
            <button
              onClick={rejectCookies}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
              data-testid="button-close-cookie-banner"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                {/* Cookie Icon */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <Cookie className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    We value your privacy
                  </h3>
                  
                  {!showDetails ? (
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                        By clicking "Accept All", you consent to our use of cookies. You can manage your preferences or learn more about our cookie policy.
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                          onClick={acceptCookies}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                          data-testid="button-accept-all-cookies"
                        >
                          Accept All
                        </Button>
                        
                        <Button
                          onClick={acceptEssentialOnly}
                          variant="outline"
                          className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-6 py-2 rounded-lg transition-colors"
                          data-testid="button-accept-essential-cookies"
                        >
                          Essential Only
                        </Button>
                        
                        <Button
                          onClick={() => setShowDetails(true)}
                          variant="ghost"
                          className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 px-6 py-2 rounded-lg transition-colors"
                          data-testid="button-customize-cookies"
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Customize
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="space-y-4 mb-6">
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                              <Shield className="w-4 h-4 text-green-600" />
                              Essential Cookies
                            </h4>
                            <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-2 py-1 rounded">
                              Always Active
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            These cookies are necessary for the website to function and cannot be switched off. They include session management, security, and accessibility features.
                          </p>
                        </div>

                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              Analytics Cookies
                            </h4>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Help us understand how visitors interact with our website by collecting and reporting information anonymously.
                          </p>
                        </div>

                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              Marketing Cookies
                            </h4>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Used to track visitors across websites to display relevant advertisements and measure campaign effectiveness.
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                          onClick={acceptCookies}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                          data-testid="button-save-preferences"
                        >
                          Save Preferences
                        </Button>
                        
                        <Button
                          onClick={() => setShowDetails(false)}
                          variant="outline"
                          className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-6 py-2 rounded-lg transition-colors"
                          data-testid="button-back-to-simple"
                        >
                          Back
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      By continuing to use our website, you agree to our{' '}
                      <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                        Privacy Policy
                      </a>{' '}
                      and{' '}
                      <a href="/cookies" className="text-blue-600 dark:text-blue-400 hover:underline">
                        Cookie Policy
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default CookieBanner;