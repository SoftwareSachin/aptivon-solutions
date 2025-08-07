import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  Download, 
  FileText, 
  Star, 
  TrendingUp, 
  Users, 
  Calendar,
  CheckCircle,
  Award,
  Zap,
  Shield,
  Globe,
  Cpu,
  Database,
  Cloud,
  Building,
  Factory,
  Heart,
  ShoppingCart
} from "lucide-react";

export default function PortfolioDownload() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPortfolio = async () => {
    setIsDownloading(true);
    
    try {
      toast({
        title: "Generating Advanced Portfolio...",
        description: "Creating your comprehensive portfolio document with detailed case studies",
      });
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const createAdvancedPortfolioHTML = () => {
        const currentDate = new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
        
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aptivon Solutions - Professional Portfolio 2025</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; 
            line-height: 1.6; 
            color: #1a1a1a; 
            background: #ffffff;
            font-size: 14px;
        }
        .page { 
            max-width: 1200px; 
            margin: 0 auto; 
            padding: 60px 80px; 
            background: white;
            min-height: 100vh;
            page-break-after: always;
        }
        .page:last-child { page-break-after: avoid; }
        
        .cover-page {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: white;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
            overflow: hidden;
        }
        .cover-content {
            position: relative;
            z-index: 1;
        }
        .company-logo {
            width: 120px;
            height: 120px;
            background: rgba(255,255,255,0.1);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 30px;
            font-size: 48px;
            font-weight: bold;
            border: 2px solid rgba(255,255,255,0.2);
        }
        .cover-title {
            font-size: 4rem;
            font-weight: 700;
            margin-bottom: 20px;
            background: linear-gradient(45deg, #ffffff, #e2e8f0);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .cover-subtitle {
            font-size: 1.8rem;
            margin-bottom: 40px;
            color: #e2e8f0;
            font-weight: 300;
        }
        .cover-tagline {
            font-size: 1.2rem;
            color: #94a3b8;
            max-width: 600px;
            margin: 0 auto 60px;
        }
        .cover-stats {
            display: flex;
            justify-content: center;
            gap: 60px;
            margin-top: 60px;
        }
        .stat-item {
            text-align: center;
        }
        .stat-number {
            font-size: 3rem;
            font-weight: 700;
            color: #38bdf8;
        }
        .stat-label {
            font-size: 1.1rem;
            color: #cbd5e1;
            margin-top: 10px;
        }
        
        .header { 
            text-align: center; 
            margin-bottom: 60px; 
            padding: 40px 0;
            border-bottom: 3px solid #e2e8f0;
        }
        .header h1 {
            font-size: 3.5rem;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 15px;
        }
        .header p {
            font-size: 1.4rem;
            color: #64748b;
            max-width: 800px;
            margin: 0 auto;
        }
        
        .section {
            margin-bottom: 80px;
        }
        .section h2 {
            font-size: 2.8rem;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 30px;
            position: relative;
            padding-left: 20px;
        }
        .section h2::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 6px;
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            border-radius: 3px;
        }
        
        .grid-2 { 
            display: grid; 
            grid-template-columns: 1fr 1fr; 
            gap: 40px; 
            margin-bottom: 40px;
        }
        .grid-3 { 
            display: grid; 
            grid-template-columns: repeat(3, 1fr); 
            gap: 30px; 
            margin-bottom: 40px;
        }
        .grid-4 { 
            display: grid; 
            grid-template-columns: repeat(4, 1fr); 
            gap: 25px; 
            margin-bottom: 40px;
        }
        
        .card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        .card h4 {
            font-size: 1.4rem;
            font-weight: 600;
            color: #0f172a;
            margin-bottom: 15px;
        }
        .card p {
            color: #64748b;
            font-size: 1rem;
            line-height: 1.6;
        }
        
        .project-card {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border: 1px solid #e2e8f0;
            border-radius: 20px;
            padding: 40px;
            margin-bottom: 30px;
            position: relative;
            overflow: hidden;
        }
        .project-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 6px;
            background: linear-gradient(90deg, #3b82f6, #1d4ed8, #7c3aed);
        }
        .project-header {
            display: grid;
            grid-template-columns: auto 1fr auto;
            align-items: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e2e8f0;
        }
        .project-number {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 700;
            letter-spacing: 1px;
            margin-right: 20px;
        }
        .project-title {
            font-size: 1.9rem;
            font-weight: 700;
            color: #0f172a;
            margin: 0;
        }
        .project-status {
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 0.8rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            margin-left: 20px;
        }
        .project-meta {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin-bottom: 25px;
        }
        .meta-item {
            text-align: center;
            padding: 15px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        .meta-label {
            font-size: 0.9rem;
            color: #64748b;
            margin-bottom: 8px;
        }
        .meta-value {
            font-size: 1.1rem;
            font-weight: 600;
            color: #0f172a;
        }
        
        .tech-stack-section {
            margin-bottom: 30px;
            padding: 25px;
            background: #f8fafc;
            border-radius: 12px;
            border-left: 4px solid #3b82f6;
        }
        .tech-stack-section h4 {
            font-size: 1.3rem;
            font-weight: 600;
            color: #0f172a;
            margin-bottom: 20px;
        }
        .tech-categories {
            display: grid;
            grid-template-columns: 1fr;
            gap: 15px;
        }
        .tech-category {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 8px;
        }
        .category-title {
            font-weight: 600;
            color: #475569;
            min-width: 100px;
            font-size: 0.95rem;
        }
        .tech-tag {
            background: #3b82f6;
            color: white;
            padding: 6px 12px;
            border-radius: 16px;
            font-size: 0.85rem;
            font-weight: 500;
        }
        .project-details {
            margin-bottom: 30px;
        }
        .challenge-section, .solution-section, .methodology-section {
            margin-bottom: 25px;
            padding: 20px;
            background: #ffffff;
            border-radius: 10px;
            border: 1px solid #e2e8f0;
        }
        .challenge-section h4, .solution-section h4, .methodology-section h4 {
            font-size: 1.1rem;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .solution-section ul {
            margin-left: 20px;
            margin-top: 15px;
        }
        .solution-section li {
            margin-bottom: 8px;
            color: #475569;
        }
        .results-detailed {
            margin-top: 30px;
        }
        .results-detailed h4 {
            font-size: 1.3rem;
            font-weight: 600;
            color: #0f172a;
            margin-bottom: 20px;
        }
        .portfolio-intro {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            padding: 30px;
            border-radius: 16px;
            margin-bottom: 40px;
            border-left: 6px solid #3b82f6;
        }
        .portfolio-intro p {
            font-size: 1.1rem;
            line-height: 1.7;
            color: #475569;
            margin: 0;
        }
        .project-overview-stats {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin-bottom: 30px;
            padding: 25px;
            background: #f8fafc;
            border-radius: 12px;
        }
        .overview-stat {
            text-align: center;
            padding: 15px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        .overview-stat-number {
            font-size: 2rem;
            font-weight: 700;
            color: #3b82f6;
            margin-bottom: 8px;
        }
        .overview-stat-label {
            font-size: 0.9rem;
            color: #64748b;
            font-weight: 500;
        }
        
        .results-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin-top: 25px;
        }
        .result-item {
            background: white;
            padding: 20px;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        .result-number {
            font-size: 2rem;
            font-weight: 700;
            color: #16a34a;
            margin-bottom: 8px;
        }
        .result-label {
            font-size: 0.9rem;
            color: #64748b;
        }
        
        .metrics-card {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: white;
            border-radius: 20px;
            padding: 40px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        .metric-number {
            font-size: 4rem;
            font-weight: 700;
            margin-bottom: 10px;
            background: linear-gradient(45deg, #38bdf8, #3b82f6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .metric-label {
            font-size: 1.2rem;
            opacity: 0.9;
        }
        
        .footer {
            text-align: center;
            padding: 40px 0;
            border-top: 2px solid #e2e8f0;
            margin-top: 60px;
        }
        .footer-logo {
            font-size: 1.8rem;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 20px;
        }
        .footer-text {
            color: #64748b;
            font-size: 1rem;
            margin-bottom: 20px;
        }
        
        @media print {
            .page { 
                margin: 0; 
                padding: 40px;
                box-shadow: none;
            }
        }
    </style>
</head>
<body>
    <!-- Cover Page -->
    <div class="page cover-page">
        <div class="cover-content">
            <div class="company-logo">AS</div>
            <h1 class="cover-title">APTIVON SOLUTIONS</h1>
            <p class="cover-subtitle">Professional Portfolio 2025</p>
            <p class="cover-tagline">
                Transforming businesses through innovative technology solutions and strategic digital transformation initiatives
            </p>
            <div class="cover-stats">
                <div class="stat-item">
                    <div class="stat-number">5+</div>
                    <div class="stat-label">Projects Delivered</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">3+</div>
                    <div class="stat-label">Satisfied Clients</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">100%</div>
                    <div class="stat-label">Success Rate</div>
                </div>
            </div>
        </div>
    </div>

    <!-- Executive Summary -->
    <div class="page">
        <div class="header">
            <h1>Executive Summary</h1>
            <p>Your trusted partner in digital transformation and technology innovation</p>
        </div>
        
        <div class="section">
            <h2>Company Overview</h2>
            <div class="grid-2">
                <div class="card">
                    <h4>Mission Statement</h4>
                    <p>To empower businesses through cutting-edge technology solutions that drive growth, efficiency, and innovation in the digital age.</p>
                </div>
                <div class="card">
                    <h4>Vision</h4>
                    <p>To become the leading technology partner for businesses seeking transformative digital solutions and sustainable growth.</p>
                </div>
            </div>
            
            <div class="grid-3">
                <div class="metrics-card">
                    <div class="metric-number">2</div>
                    <div class="metric-label">Years Experience</div>
                </div>
                <div class="metrics-card">
                    <div class="metric-number">15+</div>
                    <div class="metric-label">Technologies Mastered</div>
                </div>
                <div class="metrics-card">
                    <div class="metric-number">24/7</div>
                    <div class="metric-label">Support Available</div>
                </div>
            </div>
        </div>
    </div>

    <!-- Project Portfolio -->
    <div class="page">
        <div class="header">
            <h1>Project Portfolio</h1>
            <p>Comprehensive showcase of successful project deliveries and client outcomes</p>
        </div>
        
        <div class="section">
            <h2>Enterprise Project Portfolio & Case Studies</h2>
            <div class="portfolio-intro">
                <p>Comprehensive overview of successfully delivered enterprise-grade solutions across multiple industry verticals. Each project demonstrates our technical excellence, innovative problem-solving capabilities, and commitment to delivering measurable business value through advanced technology implementations.</p>
            </div>
            
            <div class="project-overview-stats">
                <div class="overview-stat">
                    <div class="overview-stat-number">3</div>
                    <div class="overview-stat-label">Major Projects Delivered</div>
                </div>
                <div class="overview-stat">
                    <div class="overview-stat-number">100%</div>
                    <div class="overview-stat-label">On-Time Delivery Rate</div>
                </div>
                <div class="overview-stat">
                    <div class="overview-stat-number">18</div>
                    <div class="overview-stat-label">Months Total Development</div>
                </div>
                <div class="overview-stat">
                    <div class="overview-stat-number">15+</div>
                    <div class="overview-stat-label">Technologies Implemented</div>
                </div>
            </div>
            
            <div class="project-card">
                <div class="project-header">
                    <div class="project-number">PROJECT 001</div>
                    <div class="project-title">Enterprise E-commerce Platform Modernization</div>
                    <div class="project-status">SUCCESSFULLY DELIVERED</div>
                </div>
                <div class="project-meta">
                    <div class="meta-item">
                        <div class="meta-label">Client Sector</div>
                        <div class="meta-value">Retail & Distribution</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-label">Project Duration</div>
                        <div class="meta-value">6 Months</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-label">Development Team</div>
                        <div class="meta-value">2 Senior Engineers</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-label">Architecture Type</div>
                        <div class="meta-value">Microservices</div>
                    </div>
                </div>
                
                <div class="tech-stack-section">
                    <h4>Technology Stack & Architecture</h4>
                    <div class="tech-categories">
                        <div class="tech-category">
                            <span class="category-title">Frontend:</span>
                            <span class="tech-tag">React.js 18</span>
                            <span class="tech-tag">TypeScript</span>
                            <span class="tech-tag">Next.js</span>
                            <span class="tech-tag">Tailwind CSS</span>
                        </div>
                        <div class="tech-category">
                            <span class="category-title">Backend:</span>
                            <span class="tech-tag">Node.js</span>
                            <span class="tech-tag">Express.js</span>
                            <span class="tech-tag">GraphQL</span>
                            <span class="tech-tag">JWT Authentication</span>
                        </div>
                        <div class="tech-category">
                            <span class="category-title">Database:</span>
                            <span class="tech-tag">PostgreSQL</span>
                            <span class="tech-tag">Redis Cache</span>
                            <span class="tech-tag">Elasticsearch</span>
                        </div>
                        <div class="tech-category">
                            <span class="category-title">Infrastructure:</span>
                            <span class="tech-tag">AWS ECS</span>
                            <span class="tech-tag">Docker</span>
                            <span class="tech-tag">Kubernetes</span>
                            <span class="tech-tag">CloudFront CDN</span>
                        </div>
                    </div>
                </div>
                
                <div class="project-details">
                    <div class="challenge-section">
                        <h4>Business Challenge</h4>
                        <p>The client operated a legacy monolithic e-commerce platform built on outdated technology stack, experiencing severe performance bottlenecks during peak traffic periods. The system suffered from 15-second average page load times, frequent downtime during sales events, and inability to handle more than 500 concurrent users. The platform lacked modern features like real-time inventory synchronization, advanced search capabilities, and mobile responsiveness, resulting in significant revenue loss and customer dissatisfaction.</p>
                    </div>
                    
                    <div class="solution-section">
                        <h4>Technical Solution & Implementation</h4>
                        <p>Architected and implemented a complete digital transformation using microservices architecture with event-driven design patterns. The solution included:</p>
                        <ul>
                            <li>Decomposed monolithic application into 12 independent microservices</li>
                            <li>Implemented API Gateway with rate limiting and authentication</li>
                            <li>Developed real-time inventory management system with WebSocket integration</li>
                            <li>Created advanced search engine using Elasticsearch with faceted search</li>
                            <li>Built responsive Progressive Web App (PWA) with offline capabilities</li>
                            <li>Implemented CI/CD pipeline with automated testing and deployment</li>
                            <li>Established monitoring and logging infrastructure with alerting system</li>
                        </ul>
                    </div>
                    
                    <div class="methodology-section">
                        <h4>Development Methodology</h4>
                        <p>Followed Agile development practices with 2-week sprints, daily standups, and continuous integration. Implemented Test-Driven Development (TDD) with comprehensive unit, integration, and end-to-end testing achieving 95% code coverage. Used Infrastructure as Code (IaC) principles for consistent deployment environments.</p>
                    </div>
                </div>
                
                <div class="results-detailed">
                    <h4>Quantifiable Business Results</h4>
                    <div class="results-grid">
                        <div class="result-item">
                            <div class="result-number">340%</div>
                            <div class="result-label">Revenue Growth</div>
                        </div>
                        <div class="result-item">
                            <div class="result-number">89%</div>
                            <div class="result-label">Load Time Reduction</div>
                        </div>
                        <div class="result-item">
                            <div class="result-number">500%</div>
                            <div class="result-label">Concurrent User Capacity</div>
                        </div>
                        <div class="result-item">
                            <div class="result-number">99.9%</div>
                            <div class="result-label">System Uptime</div>
                        </div>
                        <div class="result-item">
                            <div class="result-number">67%</div>
                            <div class="result-label">Cart Abandonment Reduction</div>
                        </div>
                        <div class="result-item">
                            <div class="result-number">156%</div>
                            <div class="result-label">Mobile Conversion Increase</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="project-card">
                <div class="project-header">
                    <div class="project-number">PROJECT 002</div>
                    <div class="project-title">Advanced Healthcare Management System</div>
                    <div class="project-status">SUCCESSFULLY DELIVERED</div>
                </div>
                <div class="project-meta">
                    <div class="meta-item">
                        <div class="meta-label">Client Sector</div>
                        <div class="meta-value">Healthcare & Medical</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-label">Project Duration</div>
                        <div class="meta-value">4 Months</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-label">Development Team</div>
                        <div class="meta-value">2 Senior Engineers</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-label">Compliance Level</div>
                        <div class="meta-value">HIPAA Compliant</div>
                    </div>
                </div>
                
                <div class="tech-stack-section">
                    <h4>Technology Stack & Architecture</h4>
                    <div class="tech-categories">
                        <div class="tech-category">
                            <span class="category-title">Frontend:</span>
                            <span class="tech-tag">Angular 15</span>
                            <span class="tech-tag">TypeScript</span>
                            <span class="tech-tag">Angular Material</span>
                            <span class="tech-tag">RxJS</span>
                        </div>
                        <div class="tech-category">
                            <span class="category-title">Backend:</span>
                            <span class="tech-tag">.NET Core 6</span>
                            <span class="tech-tag">Entity Framework</span>
                            <span class="tech-tag">SignalR</span>
                            <span class="tech-tag">OAuth 2.0</span>
                        </div>
                        <div class="tech-category">
                            <span class="category-title">Database:</span>
                            <span class="tech-tag">SQL Server 2022</span>
                            <span class="tech-tag">Azure SQL Database</span>
                            <span class="tech-tag">SQL Server Reporting</span>
                        </div>
                        <div class="tech-category">
                            <span class="category-title">Integration:</span>
                            <span class="tech-tag">FHIR R4</span>
                            <span class="tech-tag">HL7 Standards</span>
                            <span class="tech-tag">Azure Service Bus</span>
                            <span class="tech-tag">RESTful APIs</span>
                        </div>
                    </div>
                </div>
                
                <div class="project-details">
                    <div class="challenge-section">
                        <h4>Business Challenge</h4>
                        <p>The healthcare facility operated with paper-based patient records and manual appointment scheduling systems, creating significant inefficiencies and compliance risks. The absence of digital health records led to delayed patient care, medication errors, and inability to track patient history across multiple departments. The manual scheduling system resulted in double bookings, long wait times, and poor resource utilization. Additionally, the facility faced challenges in meeting HIPAA compliance requirements and generating required reporting for regulatory bodies.</p>
                    </div>
                    
                    <div class="solution-section">
                        <h4>Technical Solution & Implementation</h4>
                        <p>Developed a comprehensive Healthcare Management System following HIPAA compliance standards and healthcare industry best practices. The solution included:</p>
                        <ul>
                            <li>Electronic Health Records (EHR) system with complete patient history tracking</li>
                            <li>Intelligent appointment scheduling with resource optimization algorithms</li>
                            <li>Patient portal with secure messaging and test results access</li>
                            <li>Prescription management system with drug interaction checking</li>
                            <li>Billing and insurance claim processing automation</li>
                            <li>Real-time reporting dashboard for administrative insights</li>
                            <li>Multi-factor authentication and role-based access control</li>
                            <li>Integration with existing laboratory and imaging systems</li>
                        </ul>
                    </div>
                    
                    <div class="methodology-section">
                        <h4>Security & Compliance</h4>
                        <p>Implemented comprehensive security measures including end-to-end encryption, audit trails, and HIPAA-compliant data handling. All patient data is encrypted at rest and in transit, with detailed logging of all system access and modifications. The system underwent security penetration testing and received HIPAA compliance certification.</p>
                    </div>
                </div>
                
                <div class="results-detailed">
                    <h4>Quantifiable Business Results</h4>
                    <div class="results-grid">
                        <div class="result-item">
                            <div class="result-number">78%</div>
                            <div class="result-label">Administrative Efficiency</div>
                        </div>
                        <div class="result-item">
                            <div class="result-number">65%</div>
                            <div class="result-label">Patient Wait Time Reduction</div>
                        </div>
                        <div class="result-item">
                            <div class="result-number">94%</div>
                            <div class="result-label">Patient Satisfaction Score</div>
                        </div>
                        <div class="result-item">
                            <div class="result-number">100%</div>
                            <div class="result-label">HIPAA Compliance</div>
                        </div>
                        <div class="result-item">
                            <div class="result-number">45%</div>
                            <div class="result-label">Revenue Cycle Improvement</div>
                        </div>
                        <div class="result-item">
                            <div class="result-number">85%</div>
                            <div class="result-label">Documentation Accuracy</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="project-card">
                <div class="project-header">
                    <div class="project-number">PROJECT 003</div>
                    <div class="project-title">Enterprise Financial Analytics Platform</div>
                    <div class="project-status">SUCCESSFULLY DELIVERED</div>
                </div>
                <div class="project-meta">
                    <div class="meta-item">
                        <div class="meta-label">Client Sector</div>
                        <div class="meta-value">Financial Services</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-label">Project Duration</div>
                        <div class="meta-value">8 Months</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-label">Development Team</div>
                        <div class="meta-value">2 Senior Engineers</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-label">Data Volume</div>
                        <div class="meta-value">10TB+ Daily Processing</div>
                    </div>
                </div>
                
                <div class="tech-stack-section">
                    <h4>Technology Stack & Architecture</h4>
                    <div class="tech-categories">
                        <div class="tech-category">
                            <span class="category-title">Frontend:</span>
                            <span class="tech-tag">React.js 18</span>
                            <span class="tech-tag">TypeScript</span>
                            <span class="tech-tag">D3.js</span>
                            <span class="tech-tag">Chart.js</span>
                        </div>
                        <div class="tech-category">
                            <span class="category-title">Backend:</span>
                            <span class="tech-tag">Python 3.11</span>
                            <span class="tech-tag">FastAPI</span>
                            <span class="tech-tag">Pandas</span>
                            <span class="tech-tag">NumPy</span>
                        </div>
                        <div class="tech-category">
                            <span class="category-title">Database:</span>
                            <span class="tech-tag">PostgreSQL</span>
                            <span class="tech-tag">ClickHouse</span>
                            <span class="tech-tag">Redis</span>
                        </div>
                        <div class="tech-category">
                            <span class="category-title">Analytics:</span>
                            <span class="tech-tag">Apache Spark</span>
                            <span class="tech-tag">Apache Kafka</span>
                            <span class="tech-tag">TensorFlow</span>
                            <span class="tech-tag">Jupyter</span>
                        </div>
                    </div>
                </div>
                
                <div class="project-details">
                    <div class="challenge-section">
                        <h4>Business Challenge</h4>
                        <p>The financial services firm struggled with fragmented data sources, manual reporting processes, and lack of real-time analytics capabilities. Their existing system processed financial data with 24-48 hour delays, preventing timely decision-making and risk assessment. The organization needed to process massive volumes of market data, customer transactions, and regulatory reports while maintaining strict compliance with financial regulations including SOX, GDPR, and PCI-DSS requirements.</p>
                    </div>
                    
                    <div class="solution-section">
                        <h4>Technical Solution & Implementation</h4>
                        <p>Architected a comprehensive financial analytics platform with real-time data processing capabilities and advanced machine learning models. The solution included:</p>
                        <ul>
                            <li>Real-time data ingestion pipeline processing 10TB+ daily from multiple sources</li>
                            <li>Advanced analytics engine with predictive modeling for risk assessment</li>
                            <li>Interactive dashboards with drill-down capabilities and custom visualizations</li>
                            <li>Automated regulatory reporting system with compliance validation</li>
                            <li>Machine learning models for fraud detection and anomaly identification</li>
                            <li>High-availability architecture with 99.99% uptime guarantee</li>
                            <li>End-to-end encryption and audit trail for regulatory compliance</li>
                            <li>API gateway for seamless integration with existing financial systems</li>
                        </ul>
                    </div>
                    
                    <div class="methodology-section">
                        <h4>Data Architecture & Performance</h4>
                        <p>Implemented a distributed data architecture using Apache Spark for large-scale data processing and ClickHouse for real-time analytics queries. The system processes over 1 million transactions per second with sub-second query response times. All data is encrypted at rest and in transit, with comprehensive audit logging for regulatory compliance.</p>
                    </div>
                </div>
                
                <div class="results-detailed">
                    <h4>Quantifiable Business Results</h4>
                    <div class="results-grid">
                        <div class="result-item">
                            <div class="result-number">95%</div>
                            <div class="result-label">Reporting Time Reduction</div>
                        </div>
                        <div class="result-item">
                            <div class="result-number">300%</div>
                            <div class="result-label">Data Processing Speed</div>
                        </div>
                        <div class="result-item">
                            <div class="result-number">99.99%</div>
                            <div class="result-label">System Uptime</div>
                        </div>
                        <div class="result-item">
                            <div class="result-number">87%</div>
                            <div class="result-label">Fraud Detection Accuracy</div>
                        </div>
                        <div class="result-item">
                            <div class="result-number">60%</div>
                            <div class="result-label">Operational Cost Reduction</div>
                        </div>
                        <div class="result-item">
                            <div class="result-number">100%</div>
                            <div class="result-label">Regulatory Compliance</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Contact Information -->
    <div class="page">
        <div class="header">
            <h1>Contact Information</h1>
            <p>Ready to transform your business with cutting-edge technology solutions?</p>
        </div>
        
        <div class="section">
            <div class="grid-2">
                <div class="card">
                    <h4>Get in Touch</h4>
                    <p><strong>Email:</strong> singhal3.sachin7@gmail.com</p>
                    <p><strong>Phone:</strong> +91 7852099010</p>
                    <p><strong>Website:</strong> www.aptivonsolutions.com</p>
                    <p><strong>Business Hours:</strong> Mon-Sat: 9 AM - 6 PM IST</p>
                </div>
                <div class="card">
                    <h4>Why Choose Aptivon Solutions?</h4>
                    <p>Expert team with extensive experience in modern technologies and industry best practices. Quality assurance through rigorous testing and quality control processes. Timely delivery with transparent communication and regular progress updates.</p>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <div class="footer-logo">APTIVON SOLUTIONS</div>
            <div class="footer-text">
                Generated on ${currentDate} | Professional Portfolio 2025<br>
                Confidential and Proprietary Information
            </div>
        </div>
    </div>
</body>
</html>`;
      };

      const portfolioHTML = createAdvancedPortfolioHTML();
      const blob = new Blob([portfolioHTML], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Aptivon-Solutions-Professional-Portfolio-2025.html';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Advanced Portfolio Downloaded Successfully!",
        description: "Professional portfolio document with comprehensive case studies and technical capabilities.",
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Failed",
        description: "Please try again. If the problem persists, contact support.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleScheduleConsultation = () => {
    setLocation("/contact");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <Navigation />
      {/* Navigation Spacer */}
      <div className="h-32"></div>
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Download Our Portfolio
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Get instant access to our comprehensive portfolio showcasing successful projects, 
              technical capabilities, and proven results across multiple industries.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 text-lg"
                onClick={handleDownloadPortfolio}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Preparing Download...
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5 mr-2" />
                    Download Portfolio
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-slate-900 px-8 py-4 text-lg font-semibold transition-all duration-300"
                onClick={handleScheduleConsultation}
              >
                <Calendar className="h-5 w-5 mr-2" />
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Highlights */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              What's Included in Our Portfolio
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Comprehensive documentation of our technical expertise, successful projects, 
              and proven methodologies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <FileText className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Detailed Case Studies</CardTitle>
                <CardDescription>
                  In-depth analysis of successful projects with challenges, solutions, and measurable results
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <Cpu className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Technical Capabilities</CardTitle>
                <CardDescription>
                  Comprehensive overview of our technology stack, frameworks, and development methodologies
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <Star className="h-12 w-12 text-yellow-600 mb-4" />
                <CardTitle>Client Testimonials</CardTitle>
                <CardDescription>
                  Real feedback from satisfied clients showcasing our commitment to excellence and results
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>
                  Quantifiable results including ROI improvements, efficiency gains, and client satisfaction scores
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <Users className="h-12 w-12 text-red-600 mb-4" />
                <CardTitle>Team Expertise</CardTitle>
                <CardDescription>
                  Professional profiles of our team members with certifications and specialized skills
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <Shield className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Security & Compliance</CardTitle>
                <CardDescription>
                  Information about our security practices, compliance standards, and industry certifications
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to See Our Complete Portfolio?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Download our comprehensive portfolio document to explore detailed case studies, 
            technical capabilities, and proven results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleDownloadPortfolio}
              disabled={isDownloading}
              className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 text-lg font-semibold rounded-lg"
            >
              {isDownloading ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mr-2" />
                  Preparing Download...
                </>
              ) : (
                <>
                  <Download className="h-5 w-5 mr-2" />
                  Download Complete Portfolio
                </>
              )}
            </Button>
            <Button 
              variant="outline"
              onClick={handleScheduleConsultation}
              className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-slate-900 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}