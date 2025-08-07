import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Database, Mail, Clock, CheckCircle } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white ">
      {/* Header */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full mb-6">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Privacy & Data Protection</span>
            </div>
            <h1 className="text-5xl font-bold text-slate-900 mb-6">Privacy Policy</h1>
            <p className="text-xl text-slate-600">
              Your privacy is our priority. Learn how we collect, use, and protect your personal information.
            </p>
            <div className="mt-8 text-sm text-slate-500">
              Last updated: July 7, 2025 | Effective Date: July 7, 2025
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          
          {/* Quick Overview */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Eye className="w-6 h-6 text-slate-700" />
                Privacy at a Glance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-900">Data Minimization</h4>
                    <p className="text-slate-600 text-sm">We only collect data necessary for our services</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-900">No Data Sales</h4>
                    <p className="text-slate-600 text-sm">We never sell your personal information to third parties</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-900">Secure Storage</h4>
                    <p className="text-slate-600 text-sm">Industry-standard encryption and security measures</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-900">Your Control</h4>
                    <p className="text-slate-600 text-sm">Request access, updates, or deletion anytime</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Database className="w-6 h-6 text-slate-700" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Information You Provide</h4>
                <ul className="space-y-2 text-slate-600">
                  <li>• Contact information (name, email, phone number)</li>
                  <li>• Company details when requesting business services</li>
                  <li>• Project requirements and specifications</li>
                  <li>• Communication preferences and feedback</li>
                  <li>• Job application details and resumes</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Automatically Collected Information</h4>
                <ul className="space-y-2 text-slate-600">
                  <li>• Website usage data and analytics</li>
                  <li>• IP address and browser information</li>
                  <li>• Page views, session duration, and click patterns</li>
                  <li>• Device information and screen resolution</li>
                  <li>• Referral sources and marketing campaign effectiveness</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Service Delivery</h4>
                  <ul className="space-y-1 text-slate-600 text-sm">
                    <li>• Respond to inquiries and consultations</li>
                    <li>• Deliver contracted services and projects</li>
                    <li>• Provide technical support and maintenance</li>
                    <li>• Process job applications and recruitment</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Communication</h4>
                  <ul className="space-y-1 text-slate-600 text-sm">
                    <li>• Send project updates and notifications</li>
                    <li>• Share relevant industry insights</li>
                    <li>• Provide newsletter content (with consent)</li>
                    <li>• Send important service announcements</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Improvement</h4>
                  <ul className="space-y-1 text-slate-600 text-sm">
                    <li>• Analyze website performance and usage</li>
                    <li>• Enhance user experience and functionality</li>
                    <li>• Develop new features and services</li>
                    <li>• Conduct market research and analysis</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Legal Compliance</h4>
                  <ul className="space-y-1 text-slate-600 text-sm">
                    <li>• Comply with applicable laws and regulations</li>
                    <li>• Protect against fraud and security threats</li>
                    <li>• Enforce our terms of service</li>
                    <li>• Respond to legal requests and court orders</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Sharing */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Information Sharing and Disclosure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-slate-700 font-medium mb-2">We do not sell, trade, or rent your personal information to third parties.</p>
                <p className="text-slate-600 text-sm">We may share information only in these limited circumstances:</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-900">Service Providers</h4>
                  <p className="text-slate-600 text-sm">Trusted third-party services that help us operate our business (hosting, analytics, email services) under strict confidentiality agreements.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900">Legal Requirements</h4>
                  <p className="text-slate-600 text-sm">When required by law, court order, or to protect our rights, safety, or the rights and safety of others.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900">Business Transfers</h4>
                  <p className="text-slate-600 text-sm">In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the business assets.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-slate-700" />
                Data Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600">We implement industry-standard security measures to protect your personal information:</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-slate-900">Technical Safeguards</h4>
                  <ul className="space-y-1 text-slate-600 text-sm">
                    <li>• SSL/TLS encryption for data transmission</li>
                    <li>• Encrypted data storage and backups</li>
                    <li>• Regular security updates and patches</li>
                    <li>• Access controls and authentication</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-slate-900">Administrative Safeguards</h4>
                  <ul className="space-y-1 text-slate-600 text-sm">
                    <li>• Limited access on need-to-know basis</li>
                    <li>• Regular security training for staff</li>
                    <li>• Incident response procedures</li>
                    <li>• Third-party security audits</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Your Privacy Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600">You have the following rights regarding your personal information:</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-slate-900">Access</h4>
                    <p className="text-slate-600 text-sm">Request a copy of your personal information we hold</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-900">Correction</h4>
                    <p className="text-slate-600 text-sm">Update or correct inaccurate personal information</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-900">Deletion</h4>
                    <p className="text-slate-600 text-sm">Request deletion of your personal information</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-slate-900">Portability</h4>
                    <p className="text-slate-600 text-sm">Receive your data in a portable format</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-900">Opt-out</h4>
                    <p className="text-slate-600 text-sm">Unsubscribe from marketing communications</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-900">Restriction</h4>
                    <p className="text-slate-600 text-sm">Limit how we process your information</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg mt-6">
                <p className="text-blue-800 font-medium">To exercise these rights, contact us at:</p>
                <p className="text-blue-700">Email: privacy@aptivonsolutions.com</p>
                <p className="text-blue-700">Phone: +91 7852099010</p>
              </div>
            </CardContent>
          </Card>

          {/* Data Retention */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-slate-700" />
                Data Retention
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600">We retain personal information only as long as necessary for the purposes outlined in this policy:</p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="font-medium text-slate-900">Contact inquiries</span>
                  <span className="text-slate-600">2 years from last contact</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="font-medium text-slate-900">Project data</span>
                  <span className="text-slate-600">5 years after project completion</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="font-medium text-slate-900">Job applications</span>
                  <span className="text-slate-600">1 year from application date</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="font-medium text-slate-900">Website analytics</span>
                  <span className="text-slate-600">26 months (Google Analytics standard)</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium text-slate-900">Marketing communications</span>
                  <span className="text-slate-600">Until unsubscribe or 3 years inactive</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Mail className="w-6 h-6 text-slate-700" />
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Privacy Questions</h4>
                  <p className="text-slate-600 text-sm mb-4">For any privacy-related questions or concerns, please contact our Data Protection Officer:</p>
                  <div className="space-y-2 text-sm">
                    <p><strong>Email:</strong> privacy@aptivonsolutions.com</p>
                    <p><strong>Phone:</strong> +91 7852099010</p>
                    <p><strong>Address:</strong> Aptivon Solutions Pvt. Ltd., India</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Response Time</h4>
                  <p className="text-slate-600 text-sm mb-4">We will respond to your privacy requests within:</p>
                  <div className="space-y-2 text-sm">
                    <p>• <strong>General inquiries:</strong> 3-5 business days</p>
                    <p>• <strong>Data access requests:</strong> 30 days</p>
                    <p>• <strong>Data deletion requests:</strong> 30 days</p>
                    <p>• <strong>Urgent security concerns:</strong> 24-48 hours</p>
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
                We may update this Privacy Policy from time to time. When we make changes, we will:
              </p>
              <ul className="space-y-2 text-slate-600">
                <li>• Post the updated policy on our website</li>
                <li>• Update the "Last Modified" date at the top of the policy</li>
                <li>• Notify you via email if changes are material</li>
                <li>• Provide additional notice as required by law</li>
              </ul>
              <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                <p className="text-slate-700 font-medium">Your continued use of our services after any changes constitutes acceptance of the updated Privacy Policy.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}