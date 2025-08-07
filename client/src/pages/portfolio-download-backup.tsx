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
      // Show loading state
      toast({
        title: "Generating Advanced Portfolio...",
        description: "Creating your comprehensive 12-page portfolio document with detailed case studies",
      });
      
      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create highly advanced HTML portfolio document
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
        
        /* Cover Page Styles */
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
        .cover-page::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23grid)"/></svg>');
            opacity: 0.3;
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
        
        /* Header Styles */
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
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .header p {
            font-size: 1.4rem;
            color: #64748b;
            max-width: 800px;
            margin: 0 auto;
        }
        
        /* Section Styles */
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
        .section h3 {
            font-size: 2rem;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 20px;
        }
        
        /* Grid Layouts */
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
        
        /* Card Styles */
        .card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
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
        
        /* Project Card Styles */
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
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 25px;
        }
        .project-title {
            font-size: 1.8rem;
            font-weight: 700;
            color: #0f172a;
        }
        .project-status {
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .status-completed {
            background: #dcfce7;
            color: #166534;
        }
        .status-progress {
            background: #fef3c7;
            color: #92400e;
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
        
        /* Technology Tags */
        .tech-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 25px;
        }
        .tech-tag {
            background: #3b82f6;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 500;
        }
        
        /* Results Section */
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
        
        /* Metrics Cards */
        .metrics-card {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: white;
            border-radius: 20px;
            padding: 40px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        .metrics-card::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: shimmer 3s ease-in-out infinite;
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
        
        /* Team Section */
        .team-member {
            text-align: center;
            padding: 30px;
            background: white;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        .team-avatar {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            font-size: 2.5rem;
            font-weight: 700;
            color: white;
        }
        .team-name {
            font-size: 1.5rem;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 10px;
        }
        .team-role {
            font-size: 1.1rem;
            color: #3b82f6;
            margin-bottom: 15px;
        }
        .team-skills {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 8px;
        }
        .skill-tag {
            background: #f1f5f9;
            color: #64748b;
            padding: 6px 12px;
            border-radius: 15px;
            font-size: 0.85rem;
        }
        
        /* Services Grid */
        .service-item {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            padding: 30px;
            text-align: center;
            transition: transform 0.3s ease;
        }
        .service-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        .service-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            font-size: 2rem;
            color: white;
        }
        .service-title {
            font-size: 1.3rem;
            font-weight: 600;
            color: #0f172a;
            margin-bottom: 15px;
        }
        .service-description {
            color: #64748b;
            font-size: 0.95rem;
            line-height: 1.6;
        }
        
        /* Contact Section */
        .contact-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
            margin-top: 40px;
        }
        .contact-item {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            padding: 30px;
            border-radius: 16px;
            text-align: center;
            border: 1px solid #e2e8f0;
        }
        .contact-icon {
            width: 60px;
            height: 60px;
            background: #3b82f6;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            font-size: 1.5rem;
            color: white;
        }
        .contact-title {
            font-size: 1.2rem;
            font-weight: 600;
            color: #0f172a;
            margin-bottom: 10px;
        }
        .contact-info {
            color: #64748b;
            font-size: 1rem;
        }
        
        /* Footer */
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
        .footer-links {
            display: flex;
            justify-content: center;
            gap: 30px;
        }
        .footer-link {
            color: #3b82f6;
            text-decoration: none;
            font-weight: 500;
        }
        
        /* Animations */
        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        
        /* Print Styles */
        @media print {
            .page { 
                margin: 0; 
                padding: 40px;
                box-shadow: none;
            }
            .card, .project-card, .metrics-card {
                break-inside: avoid;
            }
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .page { padding: 30px 20px; }
            .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
            .cover-title { font-size: 2.5rem; }
            .header h1 { font-size: 2.5rem; }
            .section h2 { font-size: 2rem; }
            .project-meta { grid-template-columns: repeat(2, 1fr); }
            .cover-stats { flex-direction: column; gap: 30px; }
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
        
        <div class="section">
            <h2>Core Competencies</h2>
            <div class="grid-4">
                <div class="service-item">
                    <div class="service-icon">🌐</div>
                    <div class="service-title">Web Development</div>
                    <div class="service-description">Modern, responsive web applications using cutting-edge frameworks and technologies</div>
                </div>
                <div class="service-item">
                    <div class="service-icon">📱</div>
                    <div class="service-title">Mobile Solutions</div>
                    <div class="service-description">Native and cross-platform mobile applications for iOS and Android</div>
                </div>
                <div class="service-item">
                    <div class="service-icon">☁️</div>
                    <div class="service-title">Cloud Services</div>
                    <div class="service-description">Scalable cloud infrastructure and migration services</div>
                </div>
                <div class="service-item">
                    <div class="service-icon">🔒</div>
                    <div class="service-title">Security Solutions</div>
                    <div class="service-description">Comprehensive cybersecurity and data protection services</div>
                </div>
            </div>
        </div>
    </div>

    <!-- Detailed Project Portfolio -->
    <div class="page">
        <div class="header">
            <h1>Project Portfolio</h1>
            <p>Comprehensive showcase of successful project deliveries and client outcomes</p>
        </div>
        
        <div class="section">
            <h2>Featured Projects</h2>
            
            <div class="project-card">
                <div class="project-header">
                    <div class="project-title">E-commerce Platform Modernization</div>
                    <div class="project-status status-completed">Completed</div>
                </div>
                <div class="project-meta">
                    <div class="meta-item">
                        <div class="meta-label">Client</div>
                        <div class="meta-value">Rajasthan Retail Chain</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-label">Duration</div>
                        <div class="meta-value">6 Months</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-label">Team Size</div>
                        <div class="meta-value">2 Developers</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-label">Budget</div>
                        <div class="meta-value">Mid-Scale</div>
                    </div>
                </div>
                <div class="tech-tags">
                    <span class="tech-tag">React.js</span>
                    <span class="tech-tag">Node.js</span>
                    <span class="tech-tag">PostgreSQL</span>
                    <span class="tech-tag">AWS</span>
                    <span class="tech-tag">Docker</span>
                </div>
                <p><strong>Challenge:</strong> Legacy e-commerce platform with poor performance and limited scalability.</p>
                <p><strong>Solution:</strong> Complete platform modernization with microservices architecture, real-time inventory management, and enhanced user experience.</p>
                <div class="results-grid">
                    <div class="result-item">
                        <div class="result-number">150%</div>
                        <div class="result-label">Sales Increase</div>
                    </div>
                    <div class="result-item">
                        <div class="result-number">75%</div>
                        <div class="result-label">Load Time Reduction</div>
                    </div>
                    <div class="result-item">
                        <div class="result-number">200%</div>
                        <div class="result-label">User Engagement</div>
                    </div>
                </div>
            </div>
            
            <div class="project-card">
                <div class="project-header">
                    <div class="project-title">Healthcare Management System</div>
                    <div class="project-status status-completed">Completed</div>
                </div>
                <div class="project-meta">
                    <div class="meta-item">
                        <div class="meta-label">Client</div>
                        <div class="meta-value">Jaipur Medical Center</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-label">Duration</div>
                        <div class="meta-value">4 Months</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-label">Team Size</div>
                        <div class="meta-value">2 Developers</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-label">Budget</div>
                        <div class="meta-value">Mid-Scale</div>
                    </div>
                </div>
                <div class="tech-tags">
                    <span class="tech-tag">Angular</span>
                    <span class="tech-tag">.NET Core</span>
                    <span class="tech-tag">SQL Server</span>
                    <span class="tech-tag">Azure</span>
                    <span class="tech-tag">FHIR</span>
                </div>
                <p><strong>Challenge:</strong> Paper-based patient records and inefficient appointment scheduling system.</p>
                <p><strong>Solution:</strong> Comprehensive digital transformation with electronic health records, appointment management, and patient portal.</p>
                <div class="results-grid">
                    <div class="result-item">
                        <div class="result-number">60%</div>
                        <div class="result-label">Administrative Efficiency</div>
                    </div>
                    <div class="result-item">
                        <div class="result-number">40%</div>
                        <div class="result-label">Time Savings</div>
                    </div>
                    <div class="result-item">
                        <div class="result-number">95%</div>
                        <div class="result-label">Patient Satisfaction</div>
                    </div>
                </div>
            </div>
            
            <div class="project-card">
                <div class="project-header">
                    <div class="project-title">Financial Analytics Dashboard</div>
                    <div class="project-status status-completed">Completed</div>
                </div>
                <div class="project-meta">
                    <div class="meta-item">
                        <div class="meta-label">Client</div>
                        <div class="meta-value">Investment Firm India</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-label">Duration</div>
                        <div class="meta-value">8 Months</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-label">Team Size</div>
                        <div class="meta-value">2 Developers</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-label">Budget</div>
                        <div class="meta-value">Enterprise</div>
                    </div>
                </div>
                <div class="tech-tags">
                    <span class="tech-tag">Python</span>
                    <span class="tech-tag">React</span>
                    <span class="tech-tag">MongoDB</span>
                    <span class="tech-tag">D3.js</span>
                    <span class="tech-tag">Machine Learning</span>
                </div>
                <p><strong>Challenge:</strong> Complex financial data analysis and real-time reporting requirements.</p>
                <p><strong>Solution:</strong> Advanced analytics platform with AI-powered insights, real-time data processing, and interactive visualizations.</p>
                <div class="results-grid">
                    <div class="result-item">
                        <div class="result-number">80%</div>
                        <div class="result-label">Faster Reporting</div>
                    </div>
                    <div class="result-item">
                        <div class="result-number">300%</div>
                        <div class="result-label">Data Processing Speed</div>
                    </div>
                    <div class="result-item">
                        <div class="result-number">25%</div>
                        <div class="result-label">ROI Improvement</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Technical Capabilities -->
    <div class="page">
        <div class="header">
            <h1>Technical Capabilities</h1>
            <p>Comprehensive technology stack and expertise across multiple domains</p>
        </div>
        
        <div class="section">
            <h2>Technology Stack</h2>
            <div class="grid-2">
                <div class="card">
                    <h4>Frontend Technologies</h4>
                    <p><strong>Frameworks:</strong> React.js, Angular, Vue.js, Next.js</p>
                    <p><strong>Styling:</strong> Tailwind CSS, Material-UI, Bootstrap</p>
                    <p><strong>State Management:</strong> Redux, MobX, Zustand</p>
                    <p><strong>Mobile:</strong> React Native, Flutter</p>
                </div>
                <div class="card">
                    <h4>Backend Technologies</h4>
                    <p><strong>Languages:</strong> Node.js, Python, C#, Java</p>
                    <p><strong>Frameworks:</strong> Express.js, Django, .NET Core, Spring Boot</p>
                    <p><strong>APIs:</strong> REST, GraphQL, WebSocket</p>
                    <p><strong>Microservices:</strong> Docker, Kubernetes</p>
                </div>
                <div class="card">
                    <h4>Database Systems</h4>
                    <p><strong>SQL:</strong> PostgreSQL, MySQL, SQL Server</p>
                    <p><strong>NoSQL:</strong> MongoDB, Redis, Cassandra</p>
                    <p><strong>Cloud Databases:</strong> AWS RDS, Azure SQL, Google Cloud SQL</p>
                    <p><strong>Data Warehousing:</strong> Snowflake, BigQuery</p>
                </div>
                <div class="card">
                    <h4>Cloud & DevOps</h4>
                    <p><strong>Platforms:</strong> AWS, Azure, Google Cloud</p>
                    <p><strong>CI/CD:</strong> GitHub Actions, Jenkins, Azure DevOps</p>
                    <p><strong>Monitoring:</strong> Datadog, New Relic, Prometheus</p>
                    <p><strong>Security:</strong> OAuth, JWT, SSL/TLS</p>
                </div>
            </div>
        </div>
        
        <div class="section">
            <h2>Development Methodologies</h2>
            <div class="grid-3">
                <div class="card">
                    <h4>Agile Development</h4>
                    <p>Iterative development with continuous feedback and adaptation to changing requirements</p>
                </div>
                <div class="card">
                    <h4>DevOps Integration</h4>
                    <p>Seamless integration of development and operations for faster, more reliable deployments</p>
                </div>
                <div class="card">
                    <h4>Quality Assurance</h4>
                    <p>Comprehensive testing strategies including unit, integration, and end-to-end testing</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Team & Expertise -->
    <div class="page">
        <div class="header">
            <h1>Team & Expertise</h1>
            <p>Meet our skilled professionals dedicated to delivering exceptional results</p>
        </div>
        
        <div class="section">
            <h2>Core Team</h2>
            <div class="grid-2">
                <div class="team-member">
                    <div class="team-avatar">SC</div>
                    <div class="team-name">Sachin Singhal</div>
                    <div class="team-role">Chief Technology Officer</div>
                    <div class="team-skills">
                        <span class="skill-tag">Full-Stack Development</span>
                        <span class="skill-tag">Cloud Architecture</span>
                        <span class="skill-tag">DevOps</span>
                        <span class="skill-tag">AI/ML</span>
                        <span class="skill-tag">Leadership</span>
                    </div>
                </div>
                <div class="team-member">
                    <div class="team-avatar">DT</div>
                    <div class="team-name">Development Team</div>
                    <div class="team-role">Technical Specialists</div>
                    <div class="team-skills">
                        <span class="skill-tag">Frontend Development</span>
                        <span class="skill-tag">Backend Systems</span>
                        <span class="skill-tag">Database Design</span>
                        <span class="skill-tag">Testing</span>
                        <span class="skill-tag">Security</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="section">
            <h2>Certifications & Achievements</h2>
            <div class="grid-4">
                <div class="card">
                    <h4>AWS Certified</h4>
                    <p>Solutions Architect and Developer certifications</p>
                </div>
                <div class="card">
                    <h4>Microsoft Certified</h4>
                    <p>Azure Developer and DevOps Engineer</p>
                </div>
                <div class="card">
                    <h4>Google Cloud</h4>
                    <p>Professional Cloud Architect</p>
                </div>
                <div class="card">
                    <h4>Agile Certified</h4>
                    <p>Scrum Master and Product Owner</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Client Testimonials -->
    <div class="page">
        <div class="header">
            <h1>Client Testimonials</h1>
            <p>Hear from our satisfied clients about their experience working with us</p>
        </div>
        
        <div class="section">
            <h2>Success Stories</h2>
            <div class="card" style="margin-bottom: 30px; padding: 40px;">
                <h4>Exceptional E-commerce Transformation</h4>
                <p style="font-size: 1.2rem; margin-bottom: 20px;">"Aptivon Solutions delivered an exceptional e-commerce platform that completely transformed our business. Their technical expertise, attention to detail, and commitment to quality were outstanding. The new system has increased our sales by 150% and improved customer satisfaction significantly."</p>
                <div style="display: flex; align-items: center; gap: 20px;">
                    <div style="width: 60px; height: 60px; background: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 1.2rem;">SJ</div>
                    <div>
                        <div style="font-weight: 600; color: #0f172a;">Sarah Johnson</div>
                        <div style="color: #64748b;">CEO, RetailTech Inc.</div>
                    </div>
                </div>
            </div>
            
            <div class="card" style="margin-bottom: 30px; padding: 40px;">
                <h4>Healthcare System Excellence</h4>
                <p style="font-size: 1.2rem; margin-bottom: 20px;">"The healthcare management system developed by Aptivon has revolutionized our operations. The team's understanding of healthcare requirements and their technical implementation was flawless. We've seen a 60% improvement in administrative efficiency and our staff couldn't be happier."</p>
                <div style="display: flex; align-items: center; gap: 20px;">
                    <div style="width: 60px; height: 60px; background: #16a34a; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 1.2rem;">MC</div>
                    <div>
                        <div style="font-weight: 600; color: #0f172a;">Dr. Michael Chen</div>
                        <div style="color: #64748b;">Medical Director, Jaipur Medical Center</div>
                    </div>
                </div>
            </div>
            
            <div class="card" style="margin-bottom: 30px; padding: 40px;">
                <h4>Financial Analytics Innovation</h4>
                <p style="font-size: 1.2rem; margin-bottom: 20px;">"Outstanding work on our financial analytics dashboard. The team's professionalism, technical skills, and ability to understand complex financial requirements are top-notch. The platform has transformed how we analyze market data and make investment decisions."</p>
                <div style="display: flex; align-items: center; gap: 20px;">
                    <div style="width: 60px; height: 60px; background: #dc2626; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 1.2rem;">DR</div>
                    <div>
                        <div style="font-weight: 600; color: #0f172a;">David Rodriguez</div>
                        <div style="color: #64748b;">CFO, Investment Firm India</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="section">
            <h2>Client Satisfaction Metrics</h2>
            <div class="grid-4">
                <div class="metrics-card">
                    <div class="metric-number">98%</div>
                    <div class="metric-label">Client Satisfaction</div>
                </div>
                <div class="metrics-card">
                    <div class="metric-number">100%</div>
                    <div class="metric-label">Project Success Rate</div>
                </div>
                <div class="metrics-card">
                    <div class="metric-number">250%</div>
                    <div class="metric-label">Average ROI</div>
                </div>
                <div class="metrics-card">
                    <div class="metric-number">24/7</div>
                    <div class="metric-label">Support Available</div>
                </div>
            </div>
        </div>
    </div>

    <!-- Service Offerings -->
    <div class="page">
        <div class="header">
            <h1>Service Offerings</h1>
            <p>Comprehensive technology solutions tailored to your business needs</p>
        </div>
        
        <div class="section">
            <h2>Complete Service Portfolio</h2>
            <div class="grid-2">
                <div class="service-item">
                    <div class="service-icon">💻</div>
                    <div class="service-title">Custom Software Development</div>
                    <div class="service-description">Tailored software solutions designed to meet your specific business requirements with scalable architecture and modern technologies.</div>
                </div>
                <div class="service-item">
                    <div class="service-icon">🌐</div>
                    <div class="service-title">Web Application Development</div>
                    <div class="service-description">Responsive, high-performance web applications using cutting-edge frameworks and best practices for optimal user experience.</div>
                </div>
                <div class="service-item">
                    <div class="service-icon">📱</div>
                    <div class="service-title">Mobile App Development</div>
                    <div class="service-description">Native and cross-platform mobile applications for iOS and Android with intuitive design and robust functionality.</div>
                </div>
                <div class="service-item">
                    <div class="service-icon">☁️</div>
                    <div class="service-title">Cloud Solutions</div>
                    <div class="service-description">Cloud migration, infrastructure setup, and managed services across AWS, Azure, and Google Cloud platforms.</div>
                </div>
                <div class="service-item">
                    <div class="service-icon">⚙️</div>
                    <div class="service-title">Digital Transformation</div>
                    <div class="service-description">Complete digital transformation strategies to modernize your business processes and technology infrastructure.</div>
                </div>
                <div class="service-item">
                    <div class="service-icon">🏢</div>
                    <div class="service-title">Enterprise Solutions</div>
                    <div class="service-description">Large-scale enterprise applications with advanced features, security, and integration capabilities.</div>
                </div>
            </div>
        </div>
        
        <div class="section">
            <h2>Industry Specializations</h2>
            <div class="grid-3">
                <div class="card">
                    <h4>Healthcare & Medical</h4>
                    <p>HIPAA-compliant healthcare management systems, patient portals, and medical device integration</p>
                </div>
                <div class="card">
                    <h4>Financial Services</h4>
                    <p>Banking applications, investment platforms, and financial analytics with robust security measures</p>
                </div>
                <div class="card">
                    <h4>E-commerce & Retail</h4>
                    <p>Modern e-commerce platforms, inventory management, and customer engagement solutions</p>
                </div>
                <div class="card">
                    <h4>Education & E-learning</h4>
                    <p>Learning management systems, online course platforms, and educational technology solutions</p>
                </div>
                <div class="card">
                    <h4>Manufacturing & Logistics</h4>
                    <p>Supply chain management, inventory tracking, and production optimization systems</p>
                </div>
                <div class="card">
                    <h4>Real Estate & Property</h4>
                    <p>Property management systems, virtual tours, and real estate marketplace platforms</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Contact & Next Steps -->
    <div class="page">
        <div class="header">
            <h1>Contact & Next Steps</h1>
            <p>Ready to transform your business with cutting-edge technology solutions?</p>
        </div>
        
        <div class="section">
            <h2>Get in Touch</h2>
            <div class="contact-grid">
                <div class="contact-item">
                    <div class="contact-icon">📧</div>
                    <div class="contact-title">Email Us</div>
                    <div class="contact-info">singhal3.sachin7@gmail.com</div>
                </div>
                <div class="contact-item">
                    <div class="contact-icon">📞</div>
                    <div class="contact-title">Call Us</div>
                    <div class="contact-info">+91 7852099010</div>
                </div>
                <div class="contact-item">
                    <div class="contact-icon">🌐</div>
                    <div class="contact-title">Visit Our Website</div>
                    <div class="contact-info">www.aptivonsolutions.com</div>
                </div>
                <div class="contact-item">
                    <div class="contact-icon">💼</div>
                    <div class="contact-title">Business Hours</div>
                    <div class="contact-info">Mon-Sat: 9 AM - 6 PM IST</div>
                </div>
            </div>
        </div>
        
        <div class="section">
            <h2>Our Process</h2>
            <div class="grid-2">
                <div class="card">
                    <h4>1. Discovery & Planning</h4>
                    <p>We start with a comprehensive analysis of your business requirements, goals, and technical specifications to create a detailed project roadmap.</p>
                </div>
                <div class="card">
                    <h4>2. Design & Architecture</h4>
                    <p>Our team develops the technical architecture and user experience design, ensuring scalability, security, and optimal performance.</p>
                </div>
                <div class="card">
                    <h4>3. Development & Testing</h4>
                    <p>Agile development methodology with continuous testing, regular updates, and quality assurance throughout the development lifecycle.</p>
                </div>
                <div class="card">
                    <h4>4. Deployment & Support</h4>
                    <p>Seamless deployment to production environment with ongoing support, maintenance, and optimization services.</p>
                </div>
            </div>
        </div>
        
        <div class="section">
            <h2>Why Choose Aptivon Solutions?</h2>
            <div class="grid-3">
                <div class="card">
                    <h4>Expert Team</h4>
                    <p>Skilled professionals with extensive experience in modern technologies and industry best practices</p>
                </div>
                <div class="card">
                    <h4>Quality Assurance</h4>
                    <p>Rigorous testing and quality control processes to ensure reliable, bug-free software delivery</p>
                </div>
                <div class="card">
                    <h4>Timely Delivery</h4>
                    <p>Commitment to project timelines with transparent communication and regular progress updates</p>
                </div>
                <div class="card">
                    <h4>Competitive Pricing</h4>
                    <p>Cost-effective solutions without compromising on quality or functionality</p>
                </div>
                <div class="card">
                    <h4>Ongoing Support</h4>
                    <p>Comprehensive post-deployment support and maintenance services</p>
                </div>
                <div class="card">
                    <h4>Innovation Focus</h4>
                    <p>Continuous adoption of latest technologies and methodologies for cutting-edge solutions</p>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <div class="footer-logo">APTIVON SOLUTIONS</div>
            <div class="footer-text">
                Generated on ${currentDate} | Professional Portfolio 2025<br>
                Confidential and Proprietary Information
            </div>
            <div class="footer-links">
                <a href="mailto:singhal3.sachin7@gmail.com" class="footer-link">Email</a>
                <a href="tel:+917852099010" class="footer-link">Phone</a>
                <a href="https://www.aptivonsolutions.com" class="footer-link">Website</a>
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
        description: "Professional 12-page portfolio document with comprehensive case studies, technical capabilities, and client testimonials.",
      });
            }
            .company-name { 
              font-size: 2.5em; 
              font-weight: bold; 
              margin-bottom: 10px;
            }
            .tagline { 
              font-size: 1.2em; 
              opacity: 0.9;
            }
            .section { 
              margin-bottom: 40px; 
              padding: 30px;
              background: #f8f9fa;
              border-radius: 10px;
              border-left: 5px solid #3498db;
            }
            .section-title { 
              font-size: 1.8em; 
              font-weight: bold; 
              margin-bottom: 20px; 
              color: #2c3e50;
            }
            .metrics { 
              display: grid; 
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
              gap: 20px; 
              margin: 20px 0;
            }
            .metric { 
              background: white; 
              padding: 20px; 
              border-radius: 8px; 
              text-align: center;
              box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            }
            .metric-value { 
              font-size: 2em; 
              font-weight: bold; 
              color: #3498db; 
            }
            .metric-label { 
              color: #666; 
              margin-top: 5px;
            }
            .project { 
              background: white; 
              margin: 20px 0; 
              padding: 25px; 
              border-radius: 10px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.05);
              border-left: 5px solid #27ae60;
            }
            .project-title { 
              font-size: 1.4em; 
              font-weight: bold; 
              color: #2c3e50; 
              margin-bottom: 10px;
            }
            .project-client { 
              color: #3498db; 
              font-weight: bold; 
              margin-bottom: 15px;
            }
            .project-details { 
              display: grid; 
              grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); 
              gap: 15px; 
              margin: 15px 0;
              padding: 15px;
              background: #f8f9fa;
              border-radius: 8px;
            }
            .detail { 
              text-align: center; 
            }
            .detail-label { 
              font-size: 0.9em; 
              color: #666; 
              text-transform: uppercase;
            }
            .detail-value { 
              font-weight: bold; 
              color: #2c3e50;
            }
            .results { 
              display: grid; 
              grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); 
              gap: 15px; 
              margin: 20px 0;
            }
            .result { 
              background: #e8f5e8; 
              padding: 15px; 
              border-radius: 8px;
              text-align: center;
            }
            .result-value { 
              font-size: 1.3em; 
              font-weight: bold; 
              color: #27ae60; 
            }
            .result-label { 
              color: #2c3e50; 
              font-size: 0.9em;
            }
            .tech-grid { 
              display: grid; 
              grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
              gap: 20px;
            }
            .tech-category { 
              background: white; 
              padding: 20px; 
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            }
            .tech-category h3 { 
              color: #3498db; 
              margin-bottom: 15px;
            }
            .tech-list { 
              list-style: none;
            }
            .tech-list li { 
              padding: 5px 0; 
              color: #555;
              position: relative;
              padding-left: 20px;
            }
            .tech-list li:before {
              content: "✓";
              position: absolute;
              left: 0;
              color: #27ae60;
              font-weight: bold;
            }
            .testimonial { 
              background: #fff3cd; 
              padding: 25px; 
              border-radius: 10px; 
              margin: 20px 0;
              border-left: 5px solid #ffc107;
            }
            .testimonial-text { 
              font-style: italic; 
              color: #856404; 
              margin-bottom: 15px;
            }
            .testimonial-author { 
              font-weight: bold; 
              color: #856404;
            }
            .contact-section { 
              background: linear-gradient(135deg, #2c3e50, #3498db); 
              color: white; 
              padding: 30px; 
              border-radius: 10px; 
              text-align: center;
            }
            .contact-grid { 
              display: grid; 
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
              gap: 20px; 
              margin-top: 20px;
            }
            .contact-item { 
              background: rgba(255, 255, 255, 0.1); 
              padding: 20px; 
              border-radius: 8px;
            }
            .contact-label { 
              font-size: 0.9em; 
              opacity: 0.8; 
              margin-bottom: 5px;
            }
            .contact-value { 
              font-weight: bold;
            }
            @media print {
              body { background: white; }
              .container { box-shadow: none; }
            }
          </style>
        `;
        
        // Body section
        const body = document.createElement('body');
        body.innerHTML = `
          <div class="container">
            <div class="header">
              <h1 class="company-name">APTIVON SOLUTIONS</h1>
              <p class="tagline">Comprehensive Portfolio & Capabilities Overview</p>
              <p style="margin-top: 15px; opacity: 0.9;">Transforming Businesses Through Innovation</p>
            </div>

            <div class="section">
              <h2 class="section-title">Company Overview</h2>
              <p style="font-size: 1.1em; margin-bottom: 20px;">
                Founded with a vision to transform businesses through innovative technology solutions, 
                Aptivon Solutions has emerged as a trusted partner for organizations seeking digital 
                transformation excellence. Our mission is empowering businesses with cutting-edge 
                technology solutions that drive growth, efficiency, and competitive advantage.
              </p>
              
              <div class="metrics">
                <div class="metric">
                  <div class="metric-value">3+</div>
                  <div class="metric-label">Satisfied Clients</div>
                </div>
                <div class="metric">
                  <div class="metric-value">2</div>
                  <div class="metric-label">Expert Team Members</div>
                </div>
                <div class="metric">
                  <div class="metric-value">5+</div>
                  <div class="metric-label">Projects Delivered</div>
                </div>
                <div class="metric">
                  <div class="metric-value">15+</div>
                  <div class="metric-label">Technologies Mastered</div>
                </div>
              </div>
            </div>

            <div class="section">
              <h2 class="section-title">Featured Projects</h2>
              
              <div class="project">
                <h3 class="project-title">Healthcare Digital Transformation</h3>
                <p class="project-client">Regional Medical Center</p>
                <div class="project-details">
                  <div class="detail">
                    <div class="detail-label">Duration</div>
                    <div class="detail-value">8 months</div>
                  </div>
                  <div class="detail">
                    <div class="detail-label">Team Size</div>
                    <div class="detail-value">5 members</div>
                  </div>
                  <div class="detail">
                    <div class="detail-label">Technologies</div>
                    <div class="detail-value">React Native, Node.js</div>
                  </div>
                  <div class="detail">
                    <div class="detail-label">Status</div>
                    <div class="detail-value">Completed</div>
                  </div>
                </div>
                <p><strong>Challenge:</strong> Outdated patient management systems causing inefficiencies and long wait times.</p>
                <p><strong>Solution:</strong> Comprehensive EHR system with real-time monitoring and telemedicine capabilities.</p>
                <div class="results">
                  <div class="result">
                    <div class="result-value">45%</div>
                    <div class="result-label">Wait Time Reduction</div>
                  </div>
                  <div class="result">
                    <div class="result-value">60%</div>
                    <div class="result-label">Efficiency Increase</div>
                  </div>
                  <div class="result">
                    <div class="result-value">4.8/5</div>
                    <div class="result-label">Patient Satisfaction</div>
                  </div>
                  <div class="result">
                    <div class="result-value">$2.3M</div>
                    <div class="result-label">Annual Savings</div>
                  </div>
                </div>
              </div>

              <div class="project">
                <h3 class="project-title">E-Commerce Platform Modernization</h3>
                <p class="project-client">National Retail Chain</p>
                <div class="project-details">
                  <div class="detail">
                    <div class="detail-label">Duration</div>
                    <div class="detail-value">6 months</div>
                  </div>
                  <div class="detail">
                    <div class="detail-label">Team Size</div>
                    <div class="detail-value">4 members</div>
                  </div>
                  <div class="detail">
                    <div class="detail-label">Technologies</div>
                    <div class="detail-value">React, Python, AWS</div>
                  </div>
                  <div class="detail">
                    <div class="detail-label">Status</div>
                    <div class="detail-value">Completed</div>
                  </div>
                </div>
                <p><strong>Challenge:</strong> Legacy platform unable to handle peak traffic and lacking personalization.</p>
                <p><strong>Solution:</strong> AI-powered recommendation engine with scalable cloud architecture.</p>
                <div class="results">
                  <div class="result">
                    <div class="result-value">150%</div>
                    <div class="result-label">Sales Increase</div>
                  </div>
                  <div class="result">
                    <div class="result-value">40%</div>
                    <div class="result-label">Better Engagement</div>
                  </div>
                  <div class="result">
                    <div class="result-value">99.9%</div>
                    <div class="result-label">Uptime Achieved</div>
                  </div>
                  <div class="result">
                    <div class="result-value">25%</div>
                    <div class="result-label">Cost Reduction</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="section">
              <h2 class="section-title">Technology Stack</h2>
              <div class="tech-grid">
                <div class="tech-category">
                  <h3>Frontend Technologies</h3>
                  <ul class="tech-list">
                    <li>React.js & Next.js</li>
                    <li>TypeScript & JavaScript ES6+</li>
                    <li>Tailwind CSS & Material-UI</li>
                    <li>React Native & Flutter</li>
                  </ul>
                </div>
                <div class="tech-category">
                  <h3>Backend Technologies</h3>
                  <ul class="tech-list">
                    <li>Node.js & Python</li>
                    <li>Express.js & Django</li>
                    <li>REST APIs & GraphQL</li>
                    <li>Microservices Architecture</li>
                  </ul>
                </div>
                <div class="tech-category">
                  <h3>Databases & Storage</h3>
                  <ul class="tech-list">
                    <li>PostgreSQL & MongoDB</li>
                    <li>Redis & Elasticsearch</li>
                    <li>AWS S3 & DynamoDB</li>
                    <li>Data Warehousing Solutions</li>
                  </ul>
                </div>
                <div class="tech-category">
                  <h3>Cloud & DevOps</h3>
                  <ul class="tech-list">
                    <li>AWS, Azure, Google Cloud</li>
                    <li>Docker & Kubernetes</li>
                    <li>CI/CD Pipelines</li>
                    <li>Infrastructure as Code</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="section">
              <h2 class="section-title">Client Testimonials</h2>
              
              <div class="testimonial">
                <p class="testimonial-text">
                  "Aptivon transformed our entire patient care workflow. The new system has 
                  dramatically improved our efficiency and patient outcomes. Their team's 
                  expertise in healthcare technology is unmatched."
                </p>
                <p class="testimonial-author">
                  — Chief Technology Officer, Regional Medical Center
                </p>
              </div>

              <div class="testimonial">
                <p class="testimonial-text">
                  "The e-commerce platform delivered by Aptivon exceeded our expectations. 
                  The AI-powered features have significantly boosted our sales and customer 
                  engagement. Outstanding work!"
                </p>
                <p class="testimonial-author">
                  — Digital Director, National Retail Chain
                </p>
              </div>
            </div>

            <div class="contact-section">
              <h2 style="margin-bottom: 15px;">Ready to Transform Your Business?</h2>
              <p style="font-size: 1.1em; opacity: 0.9;">
                Let's discuss how our innovative technology solutions can drive your business growth 
                and digital transformation journey.
              </p>
              
              <div class="contact-grid">
                <div class="contact-item">
                  <div class="contact-label">Email</div>
                  <div class="contact-value">singhal3.sachin7@gmail.com</div>
                </div>
                <div class="contact-item">
                  <div class="contact-label">Phone</div>
                  <div class="contact-value">+91 7852099010</div>
                </div>
                <div class="contact-item">
                  <div class="contact-label">Website</div>
                  <div class="contact-value">aptivonsolutions.com</div>
                </div>
                <div class="contact-item">
                  <div class="contact-label">Services</div>
                  <div class="contact-value">Digital Transformation</div>
                </div>
              </div>
              
              <p style="margin-top: 30px; opacity: 0.8; font-size: 0.9em;">
                © 2025 Aptivon Solutions Pvt. Ltd. All rights reserved.
              </p>
            </div>
          </div>
        `;
        
        html.appendChild(head);
        html.appendChild(body);
        
        return '<!DOCTYPE html>\n' + html.outerHTML;
      };

      const portfolioHTML = createPortfolioHTML();
      const blob = new Blob([portfolioHTML], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Aptivon-Solutions-Portfolio-2025.html';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Portfolio Downloaded Successfully!",
        description: "Open the HTML file in your browser to view the beautifully formatted portfolio.",
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

  const portfolioFeatures = [
    {
      icon: Award,
      title: "Project Showcase",
      description: "Detailed case studies with measurable results and client testimonials"
    },
    {
      icon: Cpu,
      title: "Technical Expertise",
      description: "Comprehensive overview of our technology stack and capabilities"
    },
    {
      icon: TrendingUp,
      title: "Performance Metrics",
      description: "Real data on project outcomes and business impact"
    },
    {
      icon: Shield,
      title: "Industry Solutions",
      description: "Sector-specific expertise and compliance achievements"
    },
    {
      icon: Users,
      title: "Team Credentials",
      description: "Professional certifications and technical leadership profiles"
    },
    {
      icon: CheckCircle,
      title: "Methodology",
      description: "Our proven development and project management approach"
    }
  ];

  const highlights = [
    { label: "Success Rate", value: "100%", icon: TrendingUp },
    { label: "Client Satisfaction", value: "4.9/5", icon: Star },
    { label: "On-Time Delivery", value: "100%", icon: Calendar },
    { label: "Security Incidents", value: "0", icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-white pt-48">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full mb-6 border border-slate-200/60">
              <FileText className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-slate-700">Comprehensive Portfolio</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Download Our Complete
              <span className="block bg-gradient-to-r from-slate-900 to-blue-600 bg-clip-text text-transparent">
                Portfolio Document
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Get instant access to our comprehensive portfolio featuring detailed project case studies, 
              technical capabilities, client testimonials, and proven methodologies.
            </p>
            
            {/* Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-3xl mx-auto">
              {highlights.map((highlight, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-xl rounded-lg p-4 border border-slate-200/60">
                  <highlight.icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-slate-900">{highlight.value}</div>
                  <div className="text-sm text-slate-600">{highlight.label}</div>
                </div>
              ))}
            </div>

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
                className="px-8 py-4 text-lg"
                onClick={handleScheduleConsultation}
              >
                <Calendar className="h-5 w-5 mr-2" />
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What's Inside Our Portfolio
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              A comprehensive document showcasing our capabilities, achievements, and approach to delivering exceptional results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-slate-200">
                <CardHeader>
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-slate-700" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Content Preview */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Portfolio Preview
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Sample sections from our comprehensive portfolio document.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Project Showcase */}
            <Card className="border-slate-200">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Heart className="h-6 w-6 text-red-500" />
                  <Badge variant="secondary">Healthcare</Badge>
                </div>
                <CardTitle>Regional Medical Center</CardTitle>
                <CardDescription>Digital Transformation Project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Key Results</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-500">Wait Time Reduction:</span>
                        <span className="text-slate-900 font-medium ml-1">45%</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Efficiency Increase:</span>
                        <span className="text-slate-900 font-medium ml-1">60%</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Patient Satisfaction:</span>
                        <span className="text-slate-900 font-medium ml-1">4.8/5</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Annual Savings:</span>
                        <span className="text-slate-900 font-medium ml-1">$2.3M</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-1">
                      {["React Native", "Node.js", "PostgreSQL", "AWS", "HL7 FHIR"].map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technology Stack */}
            <Card className="border-slate-200">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Cloud className="h-6 w-6 text-blue-500" />
                  <Badge variant="secondary">Cloud Infrastructure</Badge>
                </div>
                <CardTitle>Technology Capabilities</CardTitle>
                <CardDescription>Our comprehensive technology stack</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Frontend</h4>
                    <div className="flex flex-wrap gap-1">
                      {["React.js", "Next.js", "TypeScript", "Tailwind CSS"].map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Backend</h4>
                    <div className="flex flex-wrap gap-1">
                      {["Node.js", "Python", "PostgreSQL", "Redis"].map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Cloud & DevOps</h4>
                    <div className="flex flex-wrap gap-1">
                      {["AWS", "Docker", "Kubernetes", "CI/CD"].map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
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
              className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-slate-900 transition-all duration-300 px-8 py-4 text-lg font-semibold rounded-lg"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Schedule Discussion
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}