import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cookie, Settings, BarChart3, Target, Shield, CheckCircle, X } from "lucide-react";
import { useState } from "react";

export default function CookiePolicy() {
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true, // Always required
    analytics: true,
    marketing: false,
    functional: true
  });

  const handlePreferenceChange = (type: string, enabled: boolean) => {
    if (type === 'essential') return; // Essential cookies cannot be disabled
    
    setCookiePreferences(prev => ({
      ...prev,
      [type]: enabled
    }));
  };

  const savePreferences = () => {
    // Store preferences in localStorage
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
    
    // In a real implementation, you would also update your cookie management system
    alert('Cookie preferences saved successfully!');
  };

  const cookieTypes = [
    {
      type: 'essential',
      title: 'Essential Cookies',
      description: 'Required for basic website functionality and security',
      icon: Shield,
      color: 'green',
      required: true,
      examples: ['Session management', 'Security features', 'Load balancing', 'Form submissions']
    },
    {
      type: 'analytics',
      title: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our website',
      icon: BarChart3,
      color: 'blue',
      required: false,
      examples: ['Google Analytics', 'Page views', 'User behavior', 'Performance metrics']
    },
    {
      type: 'functional',
      title: 'Functional Cookies',
      description: 'Enable enhanced functionality and personalization',
      icon: Settings,
      color: 'purple',
      required: false,
      examples: ['Language preferences', 'Theme selection', 'Saved forms', 'Chat widget']
    },
    {
      type: 'marketing',
      title: 'Marketing Cookies',
      description: 'Used to deliver relevant advertisements and track campaigns',
      icon: Target,
      color: 'orange',
      required: false,
      examples: ['Ad targeting', 'Social media integration', 'Campaign tracking', 'Remarketing']
    }
  ];

  return (
    <div className="min-h-screen bg-white ">
      {/* Header */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full mb-6">
              <Cookie className="w-4 h-4" />
              <span className="text-sm font-medium">Cookie Management</span>
            </div>
            <h1 className="text-5xl font-bold text-slate-900 mb-6">Cookie Policy</h1>
            <p className="text-xl text-slate-600">
              Learn about how we use cookies and similar technologies to improve your experience on our website.
            </p>
            <div className="mt-8 text-sm text-slate-500">
              Last updated: July 7, 2025 | Effective Date: July 7, 2025
            </div>
          </div>
        </div>
      </section>

      {/* Cookie Preferences Manager */}
      <section className="py-12 bg-blue-50">
        <div className="max-w-4xl mx-auto px-6">
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Settings className="w-6 h-6 text-slate-700" />
                Manage Your Cookie Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-slate-600">
                Control which cookies you'd like to allow. You can change these settings at any time.
              </p>
              
              <div className="grid gap-4">
                {cookieTypes.map((cookie) => {
                  const isEnabled = cookiePreferences[cookie.type as keyof typeof cookiePreferences];
                  const IconComponent = cookie.icon;
                  
                  return (
                    <div key={cookie.type} className="flex items-start justify-between p-4 bg-white rounded-lg border border-slate-200">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          cookie.color === 'green' ? 'bg-green-100' :
                          cookie.color === 'blue' ? 'bg-blue-100' :
                          cookie.color === 'purple' ? 'bg-purple-100' :
                          'bg-orange-100'
                        }`}>
                          <IconComponent className={`w-6 h-6 ${
                            cookie.color === 'green' ? 'text-green-600' :
                            cookie.color === 'blue' ? 'text-blue-600' :
                            cookie.color === 'purple' ? 'text-purple-600' :
                            'text-orange-600'
                          }`} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-slate-900">{cookie.title}</h3>
                            {cookie.required && (
                              <Badge variant="secondary" className="bg-red-100 text-red-700 border-red-200">
                                Required
                              </Badge>
                            )}
                          </div>
                          <p className="text-slate-600 text-sm mb-3">{cookie.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {cookie.examples.map((example, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {example}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        <Button
                          variant={isEnabled ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePreferenceChange(cookie.type, !isEnabled)}
                          disabled={cookie.required}
                          className={`${
                            isEnabled 
                              ? 'bg-green-600 hover:bg-green-700 text-white' 
                              : 'border-slate-300 text-slate-600 hover:bg-slate-50'
                          } ${cookie.required ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {isEnabled ? (
                            <><CheckCircle className="w-4 h-4 mr-2" /> Enabled</>
                          ) : (
                            <><X className="w-4 h-4 mr-2" /> Disabled</>
                          )}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="flex justify-center pt-4">
                <Button onClick={savePreferences} size="lg" className="bg-slate-900 hover:bg-slate-800">
                  Save Cookie Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          
          {/* What Are Cookies */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Cookie className="w-6 h-6 text-slate-700" />
                What Are Cookies?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600">
                Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better browsing experience by remembering your preferences and enabling certain website features.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">How Cookies Work</h4>
                  <ul className="space-y-1 text-slate-600 text-sm">
                    <li>• Stored locally on your device</li>
                    <li>• Sent back to our server on subsequent visits</li>
                    <li>• Can be session-based or persistent</li>
                    <li>• Enable personalized experiences</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Types of Information</h4>
                  <ul className="space-y-1 text-slate-600 text-sm">
                    <li>• User preferences and settings</li>
                    <li>• Login status and session data</li>
                    <li>• Shopping cart contents</li>
                    <li>• Website analytics and usage patterns</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Cookies */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>How We Use Cookies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-slate-600">
                Aptivon Solutions uses cookies for various purposes to enhance your website experience and improve our services:
              </p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    Essential Website Functions
                  </h4>
                  <div className="pl-7">
                    <ul className="space-y-2 text-slate-600">
                      <li>• Maintaining your session and keeping you logged in</li>
                      <li>• Ensuring website security and preventing fraud</li>
                      <li>• Remembering your language and region preferences</li>
                      <li>• Managing load balancing and server performance</li>
                      <li>• Enabling form submissions and data validation</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    Analytics and Performance
                  </h4>
                  <div className="pl-7">
                    <ul className="space-y-2 text-slate-600">
                      <li>• Understanding how visitors use our website</li>
                      <li>• Measuring website performance and page load times</li>
                      <li>• Identifying popular content and user paths</li>
                      <li>• Detecting and fixing technical issues</li>
                      <li>• Improving website design and functionality</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-purple-600" />
                    Personalization and Functionality
                  </h4>
                  <div className="pl-7">
                    <ul className="space-y-2 text-slate-600">
                      <li>• Remembering your preferences and customizations</li>
                      <li>• Providing personalized content recommendations</li>
                      <li>• Enabling interactive features like chat widgets</li>
                      <li>• Saving form data to prevent loss during navigation</li>
                      <li>• Customizing user interface based on device type</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5 text-orange-600" />
                    Marketing and Advertising
                  </h4>
                  <div className="pl-7">
                    <ul className="space-y-2 text-slate-600">
                      <li>• Delivering relevant advertisements and content</li>
                      <li>• Measuring the effectiveness of marketing campaigns</li>
                      <li>• Enabling social media integration and sharing</li>
                      <li>• Tracking conversion rates and ROI</li>
                      <li>• Preventing ad fraud and ensuring quality traffic</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Third-Party Cookies */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Third-Party Cookies and Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-slate-600">
                We use several third-party services that may set their own cookies on your device. These services help us provide better functionality and insights:
              </p>
              
              <div className="grid gap-6">
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-slate-900">Google Analytics</h4>
                    <Badge variant="outline">Analytics</Badge>
                  </div>
                  <p className="text-slate-600 text-sm mb-3">
                    Helps us understand website usage patterns, visitor demographics, and content performance.
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-slate-500">Cookies: _ga, _ga_*, _gid</span>
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      Privacy Policy
                    </a>
                  </div>
                </div>
                
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-slate-900">Microsoft Clarity</h4>
                    <Badge variant="outline">User Experience</Badge>
                  </div>
                  <p className="text-slate-600 text-sm mb-3">
                    Provides session recordings and heatmaps to help us improve user experience and identify usability issues.
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-slate-500">Cookies: _clck, _clsk</span>
                    <a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      Privacy Policy
                    </a>
                  </div>
                </div>
                
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-slate-900">LinkedIn Insights</h4>
                    <Badge variant="outline">Marketing</Badge>
                  </div>
                  <p className="text-slate-600 text-sm mb-3">
                    Tracks conversions from LinkedIn ads and provides insights about our professional audience.
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-slate-500">Cookies: bcookie, lidc, UserMatchHistory</span>
                    <a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      Privacy Policy
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cookie Management */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Managing Your Cookie Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-slate-600">
                You have several options for managing cookies on our website and in your browser:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Website Cookie Manager</h4>
                  <ul className="space-y-2 text-slate-600 text-sm">
                    <li>• Use our cookie preference center above</li>
                    <li>• Enable or disable specific cookie categories</li>
                    <li>• Settings are saved for future visits</li>
                    <li>• Can be changed at any time</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Browser Settings</h4>
                  <ul className="space-y-2 text-slate-600 text-sm">
                    <li>• Block all cookies in browser settings</li>
                    <li>• Delete existing cookies</li>
                    <li>• Set cookie expiration preferences</li>
                    <li>• Configure third-party cookie blocking</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                <h4 className="font-semibold text-amber-800 mb-2">Important Note</h4>
                <p className="text-amber-700 text-sm">
                  Disabling certain cookies may impact website functionality. Essential cookies are required for basic site operation and cannot be disabled.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Browser-Specific Instructions</h4>
                <div className="grid gap-3">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="font-medium text-slate-900">Google Chrome</span>
                    <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm">
                      Manage Cookies →
                    </a>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="font-medium text-slate-900">Mozilla Firefox</span>
                    <a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm">
                      Manage Cookies →
                    </a>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="font-medium text-slate-900">Safari</span>
                    <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm">
                      Manage Cookies →
                    </a>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium text-slate-900">Microsoft Edge</span>
                    <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm">
                      Manage Cookies →
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Contact Us About Cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-6">
                If you have any questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">General Inquiries</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Email:</strong> privacy@aptivonsolutions.com</p>
                    <p><strong>Phone:</strong> +91 7852099010</p>
                    <p><strong>Response Time:</strong> 3-5 business days</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Technical Support</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Email:</strong> support@aptivonsolutions.com</p>
                    <p><strong>For:</strong> Cookie-related technical issues</p>
                    <p><strong>Response Time:</strong> 24-48 hours</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Updates */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Policy Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices or applicable laws. When we make updates:
              </p>
              <ul className="space-y-2 text-slate-600">
                <li>• We will post the updated policy on our website</li>
                <li>• The "Last Modified" date will be updated</li>
                <li>• Significant changes will be communicated via email</li>
                <li>• Your continued use constitutes acceptance of changes</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}