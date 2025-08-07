import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Shield, AlertTriangle, Users, CreditCard, Gavel } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white pt-80">
      {/* Header */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full mb-6">
              <FileText className="w-4 h-4" />
              <span className="text-sm font-medium">Legal Terms</span>
            </div>
            <h1 className="text-5xl font-bold text-slate-900 mb-6">Terms of Service</h1>
            <p className="text-xl text-slate-600">
              Please read these terms carefully before using our services. By using Aptivon Solutions services, you agree to these terms.
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
          
          {/* Acceptance of Terms */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-slate-700" />
                Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600">
                These Terms of Service ("Terms") govern your access to and use of Aptivon Solutions Pvt. Ltd. ("Company," "we," "our," or "us") website, services, and products. By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms.
              </p>
              
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-amber-800">Important Notice</h4>
                    <p className="text-amber-700 text-sm">If you do not agree to these Terms, please do not use our services. Your continued use of our services constitutes acceptance of any updates to these Terms.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Services Description */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Our Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600">
                Aptivon Solutions provides IT consulting, software development, and technology services including but not limited to:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Development Services</h4>
                  <ul className="space-y-1 text-slate-600 text-sm">
                    <li>• Custom software development</li>
                    <li>• Web and mobile application development</li>
                    <li>• API development and integration</li>
                    <li>• Database design and optimization</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Consulting Services</h4>
                  <ul className="space-y-1 text-slate-600 text-sm">
                    <li>• Technology strategy consulting</li>
                    <li>• Digital transformation guidance</li>
                    <li>• Cloud migration services</li>
                    <li>• Security and compliance consulting</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Support Services</h4>
                  <ul className="space-y-1 text-slate-600 text-sm">
                    <li>• Technical support and maintenance</li>
                    <li>• System monitoring and optimization</li>
                    <li>• Training and documentation</li>
                    <li>• Emergency support services</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Additional Services</h4>
                  <ul className="space-y-1 text-slate-600 text-sm">
                    <li>• Project management</li>
                    <li>• Quality assurance and testing</li>
                    <li>• DevOps and deployment services</li>
                    <li>• Technology audits and assessments</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Responsibilities */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Users className="w-6 h-6 text-slate-700" />
                User Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Account Security</h4>
                <ul className="space-y-2 text-slate-600">
                  <li>• Maintain the confidentiality of your account credentials</li>
                  <li>• Notify us immediately of any unauthorized access</li>
                  <li>• Use strong, unique passwords for your accounts</li>
                  <li>• Enable two-factor authentication when available</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Acceptable Use</h4>
                <p className="text-slate-600 mb-2">You agree not to:</p>
                <ul className="space-y-2 text-slate-600">
                  <li>• Use our services for any illegal or unauthorized purpose</li>
                  <li>• Interfere with or disrupt our services or servers</li>
                  <li>• Attempt to gain unauthorized access to our systems</li>
                  <li>• Upload malicious code, viruses, or harmful content</li>
                  <li>• Violate any applicable laws or regulations</li>
                  <li>• Infringe on intellectual property rights</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Data and Content</h4>
                <ul className="space-y-2 text-slate-600">
                  <li>• Provide accurate and complete information</li>
                  <li>• Ensure you have rights to any content you provide</li>
                  <li>• Maintain backups of your important data</li>
                  <li>• Comply with data protection and privacy laws</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Payment Terms */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-slate-700" />
                Payment Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Pricing and Billing</h4>
                <ul className="space-y-2 text-slate-600">
                  <li>• All prices are quoted in Indian Rupees (INR) unless otherwise specified</li>
                  <li>• Prices are subject to change with 30 days notice</li>
                  <li>• Custom project pricing will be provided in detailed proposals</li>
                  <li>• Recurring services are billed according to agreed schedules</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Payment Schedule</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-slate-900 mb-2">Project-Based Services</h5>
                    <ul className="space-y-1 text-slate-600 text-sm">
                      <li>• 50% advance payment upon contract signing</li>
                      <li>• Milestone-based payments as agreed</li>
                      <li>• Final payment upon project completion</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-slate-900 mb-2">Ongoing Services</h5>
                    <ul className="space-y-1 text-slate-600 text-sm">
                      <li>• Monthly billing for recurring services</li>
                      <li>• Payment due within 30 days of invoice</li>
                      <li>• Late fees may apply after grace period</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Refund Policy</h4>
                <ul className="space-y-2 text-slate-600">
                  <li>• Refunds for unused services may be considered on case-by-case basis</li>
                  <li>• No refunds for completed work or delivered services</li>
                  <li>• Disputes must be raised within 30 days of service delivery</li>
                  <li>• Refund requests require written notice and justification</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Intellectual Property Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Our Intellectual Property</h4>
                <p className="text-slate-600 mb-2">
                  The Company retains all rights, title, and interest in:
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li>• Our website, software, and proprietary technologies</li>
                  <li>• Trademarks, service marks, and trade names</li>
                  <li>• Methodologies, frameworks, and best practices</li>
                  <li>• Pre-existing intellectual property and improvements</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Client Intellectual Property</h4>
                <ul className="space-y-2 text-slate-600">
                  <li>• Clients retain ownership of their data and content</li>
                  <li>• Custom development work ownership as specified in contracts</li>
                  <li>• Client grants us license to use data for service delivery</li>
                  <li>• Confidential information remains property of disclosing party</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Third-Party Content</h4>
                <ul className="space-y-2 text-slate-600">
                  <li>• Open-source software used under applicable licenses</li>
                  <li>• Third-party services subject to their terms</li>
                  <li>• Client responsible for licensing third-party content they provide</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Liability and Warranties */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-slate-700" />
                Liability and Warranties
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Service Warranties</h4>
                <ul className="space-y-2 text-slate-600">
                  <li>• We warrant that services will be performed with professional skill and care</li>
                  <li>• Services will conform to specifications outlined in service agreements</li>
                  <li>• We will remedy any non-conforming services at no additional cost</li>
                  <li>• Warranty period: 90 days from service delivery</li>
                </ul>
              </div>
              
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">Limitation of Liability</h4>
                <p className="text-red-700 text-sm">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING FROM OR RELATED TO THESE TERMS OR OUR SERVICES SHALL NOT EXCEED THE AMOUNT PAID BY YOU FOR THE SPECIFIC SERVICE GIVING RISE TO THE CLAIM IN THE 12 MONTHS PRECEDING THE CLAIM.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Indemnification</h4>
                <p className="text-slate-600">
                  You agree to indemnify and hold harmless Aptivon Solutions from any claims, damages, or expenses arising from your use of our services, violation of these Terms, or infringement of any third-party rights.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Confidentiality */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Confidentiality</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600">
                We understand the importance of protecting confidential information. Both parties agree to:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Our Commitments</h4>
                  <ul className="space-y-1 text-slate-600 text-sm">
                    <li>• Protect client confidential information</li>
                    <li>• Use information only for service delivery</li>
                    <li>• Limit access to authorized personnel</li>
                    <li>• Return or destroy confidential information upon request</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Mutual Obligations</h4>
                  <ul className="space-y-1 text-slate-600 text-sm">
                    <li>• Identify confidential information clearly</li>
                    <li>• Use reasonable security measures</li>
                    <li>• Notify of any unauthorized disclosure</li>
                    <li>• Obligations survive termination of agreement</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Note:</strong> Confidentiality obligations do not apply to information that is publicly available, independently developed, or required to be disclosed by law.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Termination Rights</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-slate-900 mb-2">By Client</h5>
                    <ul className="space-y-1 text-slate-600 text-sm">
                      <li>• 30 days written notice for ongoing services</li>
                      <li>• Immediate termination for material breach</li>
                      <li>• Payment due for completed work</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-slate-900 mb-2">By Aptivon Solutions</h5>
                    <ul className="space-y-1 text-slate-600 text-sm">
                      <li>• 30 days written notice</li>
                      <li>• Immediate termination for non-payment</li>
                      <li>• Immediate termination for breach of terms</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Effect of Termination</h4>
                <ul className="space-y-2 text-slate-600">
                  <li>• All outstanding payments become immediately due</li>
                  <li>• We will provide reasonable transition assistance</li>
                  <li>• Client data will be returned or securely destroyed</li>
                  <li>• Confidentiality and intellectual property terms survive</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Gavel className="w-6 h-6 text-slate-700" />
                Governing Law and Dispute Resolution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Governing Law</h4>
                <p className="text-slate-600">
                  These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or our services shall be subject to the exclusive jurisdiction of the courts in India.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Dispute Resolution Process</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</div>
                    <div>
                      <h5 className="font-medium text-slate-900">Direct Negotiation</h5>
                      <p className="text-slate-600 text-sm">Parties will attempt to resolve disputes through good faith negotiations for 30 days.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</div>
                    <div>
                      <h5 className="font-medium text-slate-900">Mediation</h5>
                      <p className="text-slate-600 text-sm">If negotiation fails, disputes will be submitted to mediation before a neutral mediator.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</div>
                    <div>
                      <h5 className="font-medium text-slate-900">Arbitration/Litigation</h5>
                      <p className="text-slate-600 text-sm">Unresolved disputes may proceed to binding arbitration or court proceedings as appropriate.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Miscellaneous */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Miscellaneous Provisions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Severability</h4>
                  <p className="text-slate-600 text-sm">If any provision is found unenforceable, the remainder of these Terms remains in effect.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Entire Agreement</h4>
                  <p className="text-slate-600 text-sm">These Terms constitute the entire agreement between parties regarding the subject matter.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Modifications</h4>
                  <p className="text-slate-600 text-sm">Terms may only be modified in writing, signed by both parties, or as posted on our website.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Assignment</h4>
                  <p className="text-slate-600 text-sm">You may not assign these Terms without our written consent. We may assign these Terms freely.</p>
                </div>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold text-slate-900 mb-2">Contact Information</h4>
                <p className="text-slate-600 text-sm mb-2">For questions about these Terms of Service, contact us:</p>
                <div className="space-y-1 text-sm">
                  <p><strong>Email:</strong> legal@aptivonsolutions.com</p>
                  <p><strong>Phone:</strong> +91 7852099010</p>
                  <p><strong>Address:</strong> Aptivon Solutions Pvt. Ltd., India</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}