import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Lock, 
  Eye, 
  Server, 
  UserCheck, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Globe,
  Database,
  Key,
  FileCheck,
  Monitor,
  Phone
} from "lucide-react";

export default function Security() {
  return (
    <div className="min-h-screen bg-white pt-80">
      {/* Header */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full mb-6">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Security & Compliance</span>
            </div>
            <h1 className="text-5xl font-bold text-slate-900 mb-6">Security Measures</h1>
            <p className="text-xl text-slate-600">
              Your security is our top priority. Learn about our comprehensive security measures and compliance standards.
            </p>
            <div className="mt-8">
              <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                <CheckCircle className="w-4 h-4 mr-2" />
                ISO 27001 Compliant Security Framework
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Security Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">99.9%</h3>
                <p className="text-slate-600 text-sm">Security Uptime</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">256-bit</h3>
                <p className="text-slate-600 text-sm">SSL Encryption</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Monitor className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">24/7</h3>
                <p className="text-slate-600 text-sm">Security Monitoring</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileCheck className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">SOC 2</h3>
                <p className="text-slate-600 text-sm">Type II Certified</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          
          {/* Data Protection */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Database className="w-6 h-6 text-slate-700" />
                Data Protection & Encryption
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-slate-600">
                We implement multiple layers of security to protect your data at every stage of processing, storage, and transmission.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-blue-600" />
                    Data in Transit
                  </h4>
                  <ul className="space-y-2 text-slate-600 text-sm">
                    <li>• TLS 1.3 encryption for all data transmission</li>
                    <li>• Perfect Forward Secrecy (PFS) enabled</li>
                    <li>• HSTS (HTTP Strict Transport Security)</li>
                    <li>• Certificate pinning for mobile applications</li>
                    <li>• End-to-end encryption for sensitive communications</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <Database className="w-5 h-5 text-green-600" />
                    Data at Rest
                  </h4>
                  <ul className="space-y-2 text-slate-600 text-sm">
                    <li>• AES-256 encryption for all stored data</li>
                    <li>• Encrypted database storage with key rotation</li>
                    <li>• Secure backup encryption and versioning</li>
                    <li>• Hardware Security Modules (HSM) for key management</li>
                    <li>• Zero-knowledge architecture for sensitive data</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Encryption Standards</h4>
                <p className="text-blue-700 text-sm">
                  All encryption implementations follow NIST standards and are regularly audited by third-party security experts to ensure compliance with industry best practices.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Access Controls */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <UserCheck className="w-6 h-6 text-slate-700" />
                Access Control & Authentication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Multi-Factor Authentication</h4>
                  <ul className="space-y-2 text-slate-600 text-sm">
                    <li>• Required for all administrative access</li>
                    <li>• Support for TOTP, SMS, and hardware tokens</li>
                    <li>• Biometric authentication where available</li>
                    <li>• Risk-based adaptive authentication</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Role-Based Access Control</h4>
                  <ul className="space-y-2 text-slate-600 text-sm">
                    <li>• Principle of least privilege enforcement</li>
                    <li>• Regular access reviews and audits</li>
                    <li>• Automated provisioning and deprovisioning</li>
                    <li>• Segregation of duties for critical operations</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Session Management</h4>
                  <ul className="space-y-2 text-slate-600 text-sm">
                    <li>• Secure session token generation</li>
                    <li>• Automatic session timeout policies</li>
                    <li>• Concurrent session monitoring</li>
                    <li>• Secure logout and session invalidation</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Password Security</h4>
                  <ul className="space-y-2 text-slate-600 text-sm">
                    <li>• Bcrypt hashing with adaptive rounds</li>
                    <li>• Password complexity requirements</li>
                    <li>• Breach detection and forced resets</li>
                    <li>• Password policy enforcement</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Infrastructure Security */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Server className="w-6 h-6 text-slate-700" />
                Infrastructure & Network Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Cloud Security</h4>
                  <ul className="space-y-2 text-slate-600 text-sm">
                    <li>• Multi-cloud architecture for redundancy</li>
                    <li>• AWS/Azure security best practices</li>
                    <li>• Private cloud for sensitive workloads</li>
                    <li>• Regular vulnerability assessments</li>
                    <li>• Automated security patching</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Network Protection</h4>
                  <ul className="space-y-2 text-slate-600 text-sm">
                    <li>• Web Application Firewall (WAF)</li>
                    <li>• DDoS protection and mitigation</li>
                    <li>• Intrusion Detection Systems (IDS)</li>
                    <li>• Network segmentation and micro-segmentation</li>
                    <li>• VPN access for remote connections</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Container Security</h4>
                  <ul className="space-y-2 text-slate-600 text-sm">
                    <li>• Secure container image scanning</li>
                    <li>• Runtime security monitoring</li>
                    <li>• Kubernetes security hardening</li>
                    <li>• Container isolation and sandboxing</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Monitoring & Logging</h4>
                  <ul className="space-y-2 text-slate-600 text-sm">
                    <li>• Real-time security event monitoring</li>
                    <li>• Centralized log management and analysis</li>
                    <li>• Automated threat detection and response</li>
                    <li>• Security Information and Event Management (SIEM)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compliance & Standards */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <FileCheck className="w-6 h-6 text-slate-700" />
                Compliance & Standards
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-slate-600">
                We maintain compliance with international security standards and regulations to ensure the highest level of data protection.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-green-800">ISO 27001:2013</h4>
                      <p className="text-green-700 text-sm">Information Security Management Systems</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-800">SOC 2 Type II</h4>
                      <p className="text-blue-700 text-sm">Service Organization Control</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-purple-800">GDPR Compliant</h4>
                      <p className="text-purple-700 text-sm">General Data Protection Regulation</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-orange-800">HIPAA Ready</h4>
                      <p className="text-orange-700 text-sm">Healthcare Information Protection</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-red-800">PCI DSS</h4>
                      <p className="text-red-700 text-sm">Payment Card Industry Standards</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-teal-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-teal-800">NIST Framework</h4>
                      <p className="text-teal-700 text-sm">Cybersecurity Framework</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Testing */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Eye className="w-6 h-6 text-slate-700" />
                Security Testing & Audits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Regular Testing</h4>
                  <ul className="space-y-2 text-slate-600 text-sm">
                    <li>• Weekly automated vulnerability scans</li>
                    <li>• Monthly penetration testing</li>
                    <li>• Quarterly security code reviews</li>
                    <li>• Annual third-party security audits</li>
                    <li>• Continuous security monitoring</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Testing Methodologies</h4>
                  <ul className="space-y-2 text-slate-600 text-sm">
                    <li>• OWASP Top 10 security testing</li>
                    <li>• Static Application Security Testing (SAST)</li>
                    <li>• Dynamic Application Security Testing (DAST)</li>
                    <li>• Interactive Application Security Testing (IAST)</li>
                    <li>• Red team exercises</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold text-slate-900 mb-2">Security Audit Schedule</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">Weekly</div>
                    <div className="text-slate-600 text-sm">Vulnerability Scans</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">Monthly</div>
                    <div className="text-slate-600 text-sm">Penetration Tests</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">Annually</div>
                    <div className="text-slate-600 text-sm">Third-party Audits</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Incident Response */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-slate-700" />
                Incident Response & Recovery
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-slate-600">
                We have a comprehensive incident response plan to quickly identify, contain, and resolve security incidents.
              </p>
              
              <div className="grid gap-6">
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold text-sm">1</span>
                    </div>
                    <h4 className="font-semibold text-slate-900">Detection & Alert</h4>
                    <Badge variant="secondary" className="bg-red-50 text-red-700 border-red-200">&lt; 15 minutes</Badge>
                  </div>
                  <p className="text-slate-600 text-sm ml-11">
                    Automated monitoring systems detect security incidents and immediately alert our security team.
                  </p>
                </div>
                
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 font-bold text-sm">2</span>
                    </div>
                    <h4 className="font-semibold text-slate-900">Assessment & Containment</h4>
                    <Badge variant="secondary" className="bg-orange-50 text-orange-700 border-orange-200">&lt; 1 hour</Badge>
                  </div>
                  <p className="text-slate-600 text-sm ml-11">
                    Security team assesses the scope of the incident and implements immediate containment measures.
                  </p>
                </div>
                
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">3</span>
                    </div>
                    <h4 className="font-semibold text-slate-900">Investigation & Eradication</h4>
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">&lt; 4 hours</Badge>
                  </div>
                  <p className="text-slate-600 text-sm ml-11">
                    Root cause analysis is performed and the source of the incident is eliminated from the environment.
                  </p>
                </div>
                
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">4</span>
                    </div>
                    <h4 className="font-semibold text-slate-900">Recovery & Communication</h4>
                    <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">&lt; 24 hours</Badge>
                  </div>
                  <p className="text-slate-600 text-sm ml-11">
                    Systems are restored to normal operation and affected parties are notified according to legal requirements.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Training */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Security Awareness & Training</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-slate-600">
                All Aptivon Solutions team members undergo comprehensive security training to ensure they understand and follow security best practices.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Employee Training</h4>
                  <ul className="space-y-2 text-slate-600 text-sm">
                    <li>• Mandatory security awareness training</li>
                    <li>• Phishing simulation and testing</li>
                    <li>• Regular security policy updates</li>
                    <li>• Role-specific security training</li>
                    <li>• Annual security certification requirements</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Security Culture</h4>
                  <ul className="space-y-2 text-slate-600 text-sm">
                    <li>• Security-first development practices</li>
                    <li>• Regular security team meetings</li>
                    <li>• Incident response drills</li>
                    <li>• Security metrics and KPIs tracking</li>
                    <li>• Continuous improvement mindset</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Contact */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Phone className="w-6 h-6 text-slate-700" />
                Security Contact & Reporting
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">Security Emergency</h4>
                <p className="text-red-700 text-sm mb-3">
                  If you discover a security vulnerability or incident, please contact us immediately:
                </p>
                <div className="space-y-1 text-sm">
                  <p><strong>Email:</strong> security@aptivonsolutions.com</p>
                  <p><strong>Phone:</strong> +91 7852099010 (24/7 Emergency Line)</p>
                  <p><strong>Response Time:</strong> Within 1 hour for critical issues</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Security Questions</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Email:</strong> security@aptivonsolutions.com</p>
                    <p><strong>For:</strong> General security inquiries</p>
                    <p><strong>Response Time:</strong> 24-48 hours</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Vulnerability Reporting</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Email:</strong> security@aptivonsolutions.com</p>
                    <p><strong>PGP Key:</strong> Available upon request</p>
                    <p><strong>Bounty Program:</strong> Contact for details</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button size="lg" className="bg-slate-900 hover:bg-slate-800">
                  Download Security Whitepaper
                  <FileCheck className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}