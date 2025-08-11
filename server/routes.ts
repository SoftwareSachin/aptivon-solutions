import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import sgMail from '@sendgrid/mail';
import path from "path";
import fs from "fs";
import { getStaticCollegeProjects, getStaticPortfolioProjects, getStaticProjectBySlug } from "@shared/static-data";

type DownloadRequest = {
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  position?: string;
  source: string;
};

function generateCompanyProfile(request: DownloadRequest & { id: number; createdAt: Date }) {
  const currentYear = new Date().getFullYear();
  
  const htmlDocument = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aptivon Solutions - Advanced Company Profile</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #1e293b;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      margin: 0;
      padding: 20px;
    }
    
    .document-container {
      max-width: 900px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    }
    
    .cover-page {
      background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%);
      color: white;
      padding: 80px 60px;
      text-align: center;
      position: relative;
    }
    
    .company-logo { 
      font-size: 3.5em;
      font-weight: 800;
      letter-spacing: -2px;
      margin-bottom: 20px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
    
    .page {
      padding: 50px;
    }
    
    .section {
      margin-bottom: 40px;
      padding: 30px;
      background: #f8fafc;
      border-radius: 12px;
      border-left: 4px solid #1e293b;
    }
    
    .metrics-grid { 
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin: 30px 0;
    }
    
    .metric-card { 
      background: white;
      padding: 25px;
      border-radius: 10px;
      text-align: center;
      border-top: 4px solid #1e293b;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .metric-number { 
      font-size: 2.5em;
      font-weight: 800;
      color: #1e293b;
      margin-bottom: 10px;
      line-height: 1;
    }
    
    .metric-label { 
      color: #64748b;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-size: 0.9em;
    }
    
    .contact-section {
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
      color: white;
      padding: 40px;
      border-radius: 12px;
      text-align: center;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="document-container">
    <div class="cover-page">
      <div class="company-logo">APTIVON SOLUTIONS</div>
      <p style="font-size: 1.3em; margin-bottom: 30px;">Transforming Enterprises Through Innovation</p>
      <p style="font-size: 1.1em; margin-bottom: 20px;">Advanced Company Profile ${currentYear}</p>
      
      <div style="text-align: center; padding: 20px; background: rgba(255,255,255,0.1); border-radius: 12px; margin-top: 40px;">
        <strong>Generated for:</strong> ${request.firstName} ${request.lastName}<br>
        ${request.company ? `Company: ${request.company}<br>` : ''}
        <em>Document ID: #${request.id} | Generated: ${new Date().toLocaleDateString()}</em>
      </div>
    </div>

    <div class="page">
      <div class="section">
        <h2>Company Overview</h2>
        <p style="font-size: 1.1em; margin-bottom: 20px;">
          Aptivon Solutions has emerged as a rapidly growing technology leader, transforming enterprises through innovative digital solutions since 2022. 
          In just 3 years, we've established ourselves as a trusted partner for organizations seeking competitive advantage through technology.
        </p>
      </div>

      <h2 style="color: #1e293b; margin: 30px 0 20px 0;">Key Performance Indicators</h2>
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-number">5+</div>
          <div class="metric-label">Projects Delivered</div>
        </div>
        <div class="metric-card">
          <div class="metric-number">3+</div>
          <div class="metric-label">Enterprise Clients</div>
        </div>
        <div class="metric-card">
          <div class="metric-number">2</div>
          <div class="metric-label">Team Members</div>
        </div>
        <div class="metric-card">
          <div class="metric-number">99.9%</div>
          <div class="metric-label">Uptime SLA</div>
        </div>
      </div>

      <div class="contact-section">
        <h2 style="margin-bottom: 20px;">Ready to Transform Your Business?</h2>
        <p style="font-size: 1.2em; margin-bottom: 30px; opacity: 0.9;">
          Contact us today for a free consultation and discover how we can help you achieve your technology goals.
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 25px; margin-top: 25px;">
          <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px;">
            <h3 style="margin-bottom: 15px;">Direct Contact</h3>
            <div style="font-size: 1.1em;">📧 singhal3.sachin7@gmail.com</div>
            <div style="font-size: 1.1em; margin-top: 10px;">📞 +917852099010</div>
          </div>
        </div>
      </div>

      <div style="text-align: center; margin-top: 40px; padding: 30px; background: #f8fafc; border-radius: 12px;">
        <p style="color: #64748b; font-size: 0.9em;">
          <strong>Document Generated:</strong> ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}<br>
          <strong>© ${currentYear} Aptivon Solutions Pvt. Ltd.</strong> - All rights reserved.
        </p>
      </div>
    </div>
  </div>
</body>
</html>`;

  return {
    document: htmlDocument,
    filename: `aptivon-solutions-company-profile-${currentYear}.html`,
    requestId: request.id
  };
}

// Support ticket schema
const supportTicketSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  priority: z.enum(['Low', 'Medium', 'High', 'Critical']),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().optional()
});

// Knowledge base data
const KNOWLEDGE_BASE = [
  {
    id: 1,
    title: "How long does a typical implementation take?",
    content: "Implementation timelines vary based on project complexity and scope. Typical timelines are: Small projects (1-2 weeks), Medium projects (3-6 weeks), Large enterprise projects (8-16 weeks). We provide detailed project timelines during the planning phase.",
    category: "Technical Implementation",
    tags: ["implementation", "timeline", "project", "planning"]
  },
  {
    id: 2,
    title: "What are the system requirements?",
    content: "Our solutions are cloud-native and platform agnostic. Minimum requirements include: Modern web browser (Chrome, Firefox, Safari, Edge), Stable internet connection (10+ Mbps recommended), Operating System: Windows 10+, macOS 10.14+, or Linux Ubuntu 18.04+.",
    category: "Technical Implementation",
    tags: ["requirements", "system", "browser", "operating system"]
  },
  {
    id: 3,
    title: "How do you handle data migration?",
    content: "We follow a comprehensive data migration process: Data assessment and mapping, Migration strategy development, Test migrations in staging environment, Validation and integrity checks, Scheduled production migration with minimal downtime, Post-migration verification and optimization.",
    category: "Technical Implementation",
    tags: ["data", "migration", "transfer", "process"]
  },
  {
    id: 4,
    title: "What security measures do you implement?",
    content: "Security is our top priority. We implement: End-to-end encryption (AES-256), Multi-factor authentication (MFA), Role-based access control (RBAC), Regular security audits and penetration testing, SOC 2 Type II compliance, GDPR and data privacy compliance.",
    category: "Technical Implementation",
    tags: ["security", "encryption", "compliance", "authentication"]
  },
  {
    id: 5,
    title: "How is pricing calculated?",
    content: "Our pricing is transparent and based on: Project scope and complexity, Required features and integrations, Number of users or transactions, Support level required, Implementation timeline. We provide detailed quotes with no hidden fees.",
    category: "Billing & Pricing",
    tags: ["pricing", "cost", "billing", "quote"]
  },
  {
    id: 6,
    title: "What payment methods do you accept?",
    content: "We accept multiple payment methods: Bank transfers (ACH/Wire), Credit cards (Visa, MasterCard, Amex), Corporate purchase orders, Annual prepayment (with discount), Milestone-based payments for large projects.",
    category: "Billing & Pricing",
    tags: ["payment", "methods", "billing", "credit card"]
  },
  {
    id: 7,
    title: "Are there any hidden costs?",
    content: "No, we believe in transparent pricing. All costs are outlined upfront including: Implementation fees, Licensing costs, Training expenses, Ongoing support costs, Third-party integrations (if any). Any changes to scope are discussed and approved before implementation.",
    category: "Billing & Pricing",
    tags: ["hidden costs", "transparent", "pricing", "fees"]
  },
  {
    id: 8,
    title: "Can I change my plan later?",
    content: "Yes, our solutions are flexible. You can: Upgrade to higher tiers anytime, Add additional users or features, Modify service levels, Downgrade at renewal periods. Changes are prorated and take effect immediately or at the next billing cycle.",
    category: "Billing & Pricing",
    tags: ["plan change", "upgrade", "flexible", "modification"]
  }
];

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Consolidated Forms API endpoint
  app.all("/api/forms", async (req, res) => {
    const { action } = req.query;
    
    try {
      switch (action) {
        case 'contact':
          if (req.method === 'POST') {
            try {
              const contactData = insertContactSchema.parse(req.body);
              const contact = await storage.createContact(contactData);
              console.log('Contact form submission:', contact);
              return res.status(201).json({ success: true, message: "Message sent successfully!", contact });
            } catch (validationError) {
              console.error('Contact form validation error:', validationError);
              return res.status(400).json({ success: false, error: 'Invalid contact data provided' });
            }
          }
          break;
          
        case 'newsletter':
          if (req.method === 'POST') {
            const { email, name } = req.body;
            console.log('Newsletter subscription:', { email, name });
            return res.status(200).json({ success: true, message: "Successfully subscribed to newsletter!" });
          }
          break;
          
        case 'job-application':
          if (req.method === 'POST') {
            console.log('Job application:', req.body);
            return res.status(200).json({ success: true, message: "Application submitted successfully!" });
          }
          break;
          
        case 'webinar-registration':
          if (req.method === 'POST') {
            console.log('Webinar registration:', req.body);
            return res.status(200).json({ success: true, message: "Successfully registered for webinar!" });
          }
          break;
          
        default:
          return res.status(400).json({ error: 'Invalid action' });
      }
    } catch (error) {
      console.error('Forms API error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Consolidated Blog API endpoint
  app.all("/api/blog", async (req, res) => {
    const { action } = req.query;
    
    try {
      switch (action) {
        case 'posts':
          if (req.method === 'GET') {
            const posts = await storage.getBlogPosts();
            return res.json(posts);
          }
          break;
          
        case 'post':
          if (req.method === 'GET') {
            const { slug } = req.query;
            const post = await storage.getBlogPost(slug as string);
            if (!post) return res.status(404).json({ error: 'Post not found' });
            return res.json(post);
          }
          break;
          
        case 'subscribe':
          if (req.method === 'POST') {
            const subscriberData = req.body;
            console.log('Blog subscription:', subscriberData);
            return res.status(200).json({ success: true, message: "Successfully subscribed!" });
          }
          break;
          
        case 'like':
          if (req.method === 'POST') {
            const { postId } = req.body;
            console.log('Blog post liked:', postId);
            return res.status(200).json({ success: true, likes: 10 });
          }
          break;
          
        case 'comment':
          if (req.method === 'POST') {
            console.log('Blog comment:', req.body);
            return res.status(200).json({ success: true, message: "Comment submitted for approval!" });
          }
          break;
          
        default:
          return res.status(400).json({ error: 'Invalid action' });
      }
    } catch (error) {
      console.error('Blog API error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Consolidated Portfolio API endpoint - Using static data
  app.all("/api/portfolio", async (req, res) => {
    const { action, type } = req.query;
    
    try {
      switch (action) {
        case 'projects':
          if (req.method === 'GET') {
            // Check if requesting college projects or portfolio projects
            if (type === 'college') {
              return res.json(getStaticCollegeProjects());
            } else {
              return res.json(getStaticPortfolioProjects());
            }
          }
          break;
          
        case 'project':
          if (req.method === 'GET') {
            const { slug } = req.query;
            const project = getStaticProjectBySlug(slug as string);
            if (!project) return res.status(404).json({ error: 'Project not found' });
            return res.json(project);
          }
          break;
          
        case 'inquiry':
          if (req.method === 'POST') {
            console.log('Portfolio inquiry:', req.body);
            return res.status(200).json({ success: true, message: "Inquiry submitted successfully!" });
          }
          break;
          
        case 'like':
          if (req.method === 'POST') {
            const { projectId } = req.body;
            console.log('Portfolio project liked:', projectId);
            return res.status(200).json({ success: true, likes: 15 });
          }
          break;
          
        default:
          return res.status(400).json({ error: 'Invalid action' });
      }
    } catch (error) {
      console.error('Portfolio API error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Consolidated Business API endpoint
  app.all("/api/business", async (req, res) => {
    const { action } = req.query;
    
    try {
      switch (action) {
        case 'about-inquiry':
          if (req.method === 'POST') {
            console.log('About inquiry:', req.body);
            return res.status(200).json({ success: true, message: "Inquiry submitted successfully!" });
          }
          break;
          
        case 'solution-inquiry':
          if (req.method === 'POST') {
            console.log('Solution inquiry:', req.body);
            return res.status(200).json({ success: true, message: "Solution inquiry submitted!" });
          }
          break;
          
        case 'consultation-request':
          if (req.method === 'POST') {
            console.log('Consultation request:', req.body);
            return res.status(200).json({ success: true, message: "Consultation scheduled successfully!" });
          }
          break;
          
        case 'company-profile':
          if (req.method === 'POST') {
            const profileData = req.body;
            console.log('Company profile request:', profileData);
            const htmlDocument = generateCompanyProfile({ ...profileData, id: 1, createdAt: new Date() });
            return res.status(200).json({ 
              success: true, 
              message: "Company profile generated successfully!",
              document: htmlDocument 
            });
          }
          break;
          
        default:
          return res.status(400).json({ error: 'Invalid action' });
      }
    } catch (error) {
      console.error('Business API error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Consolidated Resources API endpoint
  app.all("/api/resources", async (req, res) => {
    const { action } = req.query;
    
    try {
      switch (action) {
        case 'download':
          if (req.method === 'POST') {
            console.log('Resource download:', req.body);
            return res.status(200).json({ 
              success: true, 
              message: "Download link sent to your email!",
              downloadUrl: "/resources/sample.pdf"
            });
          }
          break;
          
        default:
          return res.status(400).json({ error: 'Invalid action' });
      }
    } catch (error) {
      console.error('Resources API error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Consolidated Search API endpoint
  app.all("/api/search", async (req, res) => {
    const { action, q } = req.query;
    
    try {
      switch (action) {
        case 'support':
          if (req.method === 'GET') {
            const results = [
              { id: 1, title: 'Getting Started', content: 'How to begin your project', relevance: 0.9 },
              { id: 2, title: 'Technical Support', content: 'Get technical assistance', relevance: 0.8 }
            ];
            return res.json(results);
          }
          break;
          
        default:
          return res.status(400).json({ error: 'Invalid action' });
      }
    } catch (error) {
      console.error('Search API error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  // Company Profile API route - placed first to ensure proper handling
  app.post("/api/company-profile", async (req, res) => {
    const downloadRequestSchema = z.object({
      email: z.string().email('Invalid email address'),
      firstName: z.string().min(1, 'First name is required'),
      lastName: z.string().min(1, 'Last name is required'),
      company: z.string().optional(),
      position: z.string().optional(),
      source: z.string().default('about-page')
    });

    try {
      const validationResult = downloadRequestSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: validationResult.error.errors,
          success: false
        });
      }

      const requestData = validationResult.data;
      const newRequest = {
        id: Date.now(),
        ...requestData,
        createdAt: new Date()
      };

      console.log('Company profile download request:', {
        id: newRequest.id,
        name: `${newRequest.firstName} ${newRequest.lastName}`,
        email: newRequest.email,
        company: newRequest.company,
        timestamp: newRequest.createdAt.toISOString()
      });

      // Generate comprehensive company profile document
      const companyProfile = generateCompanyProfile(newRequest);

      return res.status(200).json({
        message: 'Company profile generated successfully',
        downloadUrl: '/company-profile.html',
        profile: companyProfile,
        requestId: newRequest.id,
        success: true
      });
    } catch (error: any) {
      console.error('Company profile API error:', error);
      return res.status(500).json({ 
        message: 'Internal server error - failed to generate company profile',
        error: error.message,
        success: false
      });
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      
      // Here you could add email notification logic using Nodemailer
      console.log("New contact submission:", contact);
      
      res.status(201).json({ 
        message: "Contact form submitted successfully",
        contact 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid form data",
          errors: error.errors 
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({ 
          message: "Internal server error" 
        });
      }
    }
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Job application submission
  app.post("/api/job-application", async (req, res) => {
    const jobApplicationSchema = z.object({
      fullName: z.string().min(1, "Full name is required"),
      email: z.string().email("Valid email is required"),
      phone: z.string().min(1, "Phone number is required"),
      experience: z.string().optional(),
      coverLetter: z.string().min(1, "Cover letter is required"),
      position: z.string().min(1, "Position is required"),
      department: z.string().min(1, "Department is required"),
      location: z.string().min(1, "Location is required"),
    });

    try {
      // Validate the request body
      const validationResult = jobApplicationSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: 'Validation failed', 
          error: validationResult.error.errors,
          success: false 
        });
      }

      const applicationData = validationResult.data;

      // Try to send email using SendGrid if API key is available
      if (process.env.SENDGRID_API_KEY) {
        try {
          sgMail.setApiKey(process.env.SENDGRID_API_KEY);

          const emailSubject = `New Job Application - ${applicationData.position}`;
          const emailHtml = `
            <h2>New Job Application Received</h2>
            
            <h3>Position Details:</h3>
            <ul>
              <li><strong>Position:</strong> ${applicationData.position}</li>
              <li><strong>Department:</strong> ${applicationData.department}</li>
              <li><strong>Location:</strong> ${applicationData.location}</li>
            </ul>
            
            <h3>Applicant Details:</h3>
            <ul>
              <li><strong>Full Name:</strong> ${applicationData.fullName}</li>
              <li><strong>Email:</strong> ${applicationData.email}</li>
              <li><strong>Phone:</strong> ${applicationData.phone}</li>
              <li><strong>Experience:</strong> ${applicationData.experience || 'Fresher/Entry Level'}</li>
            </ul>
            
            <h3>Cover Letter:</h3>
            <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${applicationData.coverLetter}</p>
            
            <hr>
            <p><em>This application was submitted through the Aptivon Solutions careers page.</em></p>
          `;

          const emailText = `
New Job Application Received

Position: ${applicationData.position}
Department: ${applicationData.department}
Location: ${applicationData.location}

Applicant Details:
- Full Name: ${applicationData.fullName}
- Email: ${applicationData.email}
- Phone: ${applicationData.phone}
- Experience: ${applicationData.experience || 'Fresher/Entry Level'}

Cover Letter:
${applicationData.coverLetter}

This application was submitted through the Aptivon Solutions careers page.
          `.trim();

          const msg = {
            to: 'singhal3.sachin7@gmail.com',
            from: 'sachingupta1785209901@gmail.com', // Use the verified sender from SendGrid
            subject: emailSubject,
            text: emailText,
            html: emailHtml,
          };

          await sgMail.send(msg);
          console.log('✅ Email sent successfully via SendGrid to singhal3.sachin7@gmail.com');
        } catch (emailError: any) {
          console.error('❌ SendGrid email error:', emailError.message);
          if (emailError.response && emailError.response.body && emailError.response.body.errors) {
            console.error('SendGrid error details:', emailError.response.body.errors);
          }
        }
      } else {
        console.log('⚠️ SendGrid API key not configured - email not sent');
      }

      // Always log the application details for backup
      console.log('=== NEW JOB APPLICATION RECEIVED ===');
      console.log('To: singhal3.sachin7@gmail.com');
      console.log('Subject: New Job Application -', applicationData.position);
      console.log('');
      console.log('Position Details:');
      console.log('- Position:', applicationData.position);
      console.log('- Department:', applicationData.department);
      console.log('- Location:', applicationData.location);
      console.log('');
      console.log('Applicant Details:');
      console.log('- Full Name:', applicationData.fullName);
      console.log('- Email:', applicationData.email);
      console.log('- Phone:', applicationData.phone);
      console.log('- Experience:', applicationData.experience || 'Fresher/Entry Level');
      console.log('');
      console.log('Cover Letter:');
      console.log(applicationData.coverLetter);
      console.log('=====================================');

      return res.status(200).json({ 
        message: 'Application submitted successfully! We will review your application and get back to you soon.',
        success: true 
      });

    } catch (error) {
      console.error('Error processing job application:', error);
      return res.status(500).json({ 
        message: 'Internal server error. Please try again later.',
        success: false 
      });
    }
  });

  // Support ticket submission
  app.post("/api/support-ticket", async (req, res) => {
    try {
      const supportTicketSchema = z.object({
        fullName: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        subject: z.string().min(5, "Subject must be at least 5 characters"),
        priority: z.enum(['Low', 'Medium', 'High', 'Critical']),
        description: z.string().min(10, "Description must be at least 10 characters"),
      });

      const validationResult = supportTicketSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({
          message: 'Invalid form data',
          errors: validationResult.error.errors,
          success: false
        });
      }

      const ticketData = validationResult.data;
      const ticketId = `SUPT-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

      // Try to send email using SendGrid if API key is available
      if (process.env.SENDGRID_API_KEY) {
        try {
          sgMail.setApiKey(process.env.SENDGRID_API_KEY);

          const emailSubject = `Support Ticket [${ticketId}] - ${ticketData.priority} Priority: ${ticketData.subject}`;
          const emailHtml = `
            <h2>New Support Ticket Received</h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #495057;">Ticket Information</h3>
              <ul style="list-style: none; padding: 0;">
                <li><strong>Ticket ID:</strong> ${ticketId}</li>
                <li><strong>Priority:</strong> <span style="color: ${ticketData.priority === 'Critical' ? '#dc3545' : ticketData.priority === 'High' ? '#fd7e14' : ticketData.priority === 'Medium' ? '#ffc107' : '#28a745'};">${ticketData.priority}</span></li>
                <li><strong>Subject:</strong> ${ticketData.subject}</li>
              </ul>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #495057;">Customer Information</h3>
              <ul style="list-style: none; padding: 0;">
                <li><strong>Name:</strong> ${ticketData.fullName}</li>
                <li><strong>Email:</strong> ${ticketData.email}</li>
              </ul>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #495057;">Issue Description</h3>
              <p style="white-space: pre-wrap; line-height: 1.6;">${ticketData.description}</p>
            </div>
            
            <hr style="margin: 30px 0;">
            <p style="color: #6c757d; font-size: 14px;"><em>This support ticket was submitted through the Aptivon Solutions support portal.</em></p>
          `;

          const msg = {
            to: 'singhal3.sachin7@gmail.com',
            from: 'sachingupta1785209901@gmail.com',
            subject: emailSubject,
            html: emailHtml,
          };

          await sgMail.send(msg);
          console.log(`✅ Support ticket email sent successfully to singhal3.sachin7@gmail.com - ${ticketId}`);
        } catch (emailError: any) {
          console.error('❌ SendGrid email error:', emailError.message);
        }
      }

      // Always log the support ticket for backup
      console.log('=== NEW SUPPORT TICKET RECEIVED ===');
      console.log(`Ticket ID: ${ticketId}`);
      console.log(`Priority: ${ticketData.priority}`);
      console.log(`To: singhal3.sachin7@gmail.com`);
      console.log(`Subject: ${ticketData.subject}`);
      console.log('Customer Information:');
      console.log(`- Name: ${ticketData.fullName}`);
      console.log(`- Email: ${ticketData.email}`);
      console.log('Issue Description:');
      console.log(ticketData.description);
      console.log('=====================================');

      return res.status(200).json({ 
        message: `Support ticket ${ticketId} submitted successfully! We'll respond according to our SLA for ${ticketData.priority.toLowerCase()} priority issues.`,
        success: true,
        ticketId: ticketId
      });

    } catch (error) {
      console.error('Error processing support ticket:', error);
      return res.status(500).json({ 
        message: 'Internal server error. Please try again later.',
        success: false 
      });
    }
  });

  // Support search functionality
  app.get("/api/search-support", async (req, res) => {
    try {
      const query = req.query.q as string;
      
      if (!query || query.trim().length < 2) {
        return res.status(400).json({
          message: 'Search query must be at least 2 characters long',
          success: false
        });
      }

      const KNOWLEDGE_BASE = [
        {
          id: 1,
          title: "How long does a typical implementation take?",
          content: "Implementation timelines vary based on project complexity and scope. Typical timelines are: Small projects (1-2 weeks), Medium projects (3-6 weeks), Large enterprise projects (8-16 weeks). We provide detailed project timelines during the planning phase.",
          category: "Technical Implementation",
          tags: ["implementation", "timeline", "project", "planning"]
        },
        {
          id: 2,
          title: "What are the system requirements?",
          content: "Our solutions are cloud-native and platform agnostic. Minimum requirements include: Modern web browser (Chrome, Firefox, Safari, Edge), Stable internet connection (10+ Mbps recommended), Operating System: Windows 10+, macOS 10.14+, or Linux Ubuntu 18.04+.",
          category: "Technical Implementation",
          tags: ["requirements", "system", "browser", "operating system"]
        },
        {
          id: 3,
          title: "How do you handle data migration?",
          content: "We follow a comprehensive data migration process: Data assessment and mapping, Migration strategy development, Test migrations in staging environment, Validation and integrity checks, Scheduled production migration with minimal downtime, Post-migration verification and optimization.",
          category: "Technical Implementation",
          tags: ["data", "migration", "transfer", "process"]
        },
        {
          id: 4,
          title: "What security measures do you implement?",
          content: "Security is our top priority. We implement: End-to-end encryption (AES-256), Multi-factor authentication (MFA), Role-based access control (RBAC), Regular security audits and penetration testing, SOC 2 Type II compliance, GDPR and data privacy compliance.",
          category: "Technical Implementation",
          tags: ["security", "encryption", "compliance", "authentication"]
        },
        {
          id: 5,
          title: "How is pricing calculated?",
          content: "Our pricing is transparent and based on: Project scope and complexity, Required features and integrations, Number of users or transactions, Support level required, Implementation timeline. We provide detailed quotes with no hidden fees.",
          category: "Billing & Pricing",
          tags: ["pricing", "cost", "billing", "quote"]
        },
        {
          id: 6,
          title: "What payment methods do you accept?",
          content: "We accept multiple payment methods: Bank transfers (ACH/Wire), Credit cards (Visa, MasterCard, Amex), Corporate purchase orders, Annual prepayment (with discount), Milestone-based payments for large projects.",
          category: "Billing & Pricing",
          tags: ["payment", "methods", "billing", "credit card"]
        }
      ];

      // Search in title, content, and tags
      const searchTerm = query.toLowerCase().trim();
      const searchResults = KNOWLEDGE_BASE.filter(item => {
        const titleMatch = item.title.toLowerCase().includes(searchTerm);
        const contentMatch = item.content.toLowerCase().includes(searchTerm);
        const tagMatch = item.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        const categoryMatch = item.category.toLowerCase().includes(searchTerm);
        
        return titleMatch || contentMatch || tagMatch || categoryMatch;
      });

      // Sort by relevance (title matches first)
      const sortedResults = searchResults.sort((a, b) => {
        const aTitle = a.title.toLowerCase().includes(searchTerm);
        const bTitle = b.title.toLowerCase().includes(searchTerm);
        
        if (aTitle && !bTitle) return -1;
        if (!aTitle && bTitle) return 1;
        return 0;
      });

      return res.status(200).json({
        success: true,
        query: query,
        results: sortedResults,
        total: sortedResults.length
      });

    } catch (error) {
      console.error('Error processing search request:', error);
      return res.status(500).json({ 
        message: 'Internal server error. Please try again later.',
        success: false 
      });
    }
  });

  // Newsletter subscription endpoint
  app.post("/api/newsletter", async (req, res) => {
    try {
      const { email } = z.object({
        email: z.string().email("Invalid email address"),
      }).parse(req.body);

      console.log(`Newsletter subscription: ${email}`);

      return res.status(200).json({ 
        success: true, 
        message: "Successfully subscribed to newsletter!" 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: error.errors[0].message 
        });
      }

      return res.status(500).json({ 
        success: false, 
        message: "Failed to subscribe to newsletter" 
      });
    }
  });

  // Resources endpoint for downloads and search
  app.post("/api/resources", async (req, res) => {
    try {
      const { resourceId, email, firstName, lastName, company } = z.object({
        resourceId: z.string(),
        email: z.string().email("Valid email required for download"),
        firstName: z.string().min(1, "First name required"),
        lastName: z.string().min(1, "Last name required"),
        company: z.string().optional(),
      }).parse(req.body);

      console.log(`Download request: ${resourceId} by ${firstName} ${lastName} (${email})`);

      return res.status(200).json({ 
        success: true, 
        message: "Download link sent to your email!",
        downloadUrl: `/downloads/${resourceId}.pdf`
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: error.errors[0].message 
        });
      }

      return res.status(500).json({ 
        success: false, 
        message: "Failed to process download request" 
      });
    }
  });

  // Webinar registration endpoint
  app.post("/api/webinar-registration", async (req, res) => {
    try {
      const { webinarId, firstName, lastName, email, company, jobTitle, phone } = z.object({
        webinarId: z.string(),
        firstName: z.string().min(1, "First name required"),
        lastName: z.string().min(1, "Last name required"),
        email: z.string().email("Valid email required"),
        company: z.string().optional(),
        jobTitle: z.string().optional(),
        phone: z.string().optional(),
      }).parse(req.body);

      console.log(`Webinar registration: ${webinarId} by ${firstName} ${lastName} (${email})`);

      return res.status(200).json({ 
        success: true, 
        message: "Successfully registered for webinar! Check your email for the joining link.",
        webinarId,
        registrationConfirmation: `WB-${Date.now()}`
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: error.errors[0].message 
        });
      }

      return res.status(500).json({ 
        success: false, 
        message: "Failed to register for webinar" 
      });
    }
  });

  // Industry consultation endpoint
  app.post("/api/industry-consultation", async (req, res) => {
    try {
      const { firstName, lastName, email, company, industry, phone, message } = z.object({
        firstName: z.string().min(1, "First name required"),
        lastName: z.string().min(1, "Last name required"),
        email: z.string().email("Valid email required"),
        company: z.string().optional(),
        industry: z.string().optional(),
        phone: z.string().optional(),
        message: z.string().min(10, "Message must be at least 10 characters"),
      }).parse(req.body);

      console.log(`Industry consultation request: ${industry} - ${firstName} ${lastName} (${email})`);

      return res.status(200).json({ 
        success: true, 
        message: "Industry consultation request received! Our experts will contact you within 24 hours.",
        consultationId: `IC-${Date.now()}`
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: error.errors[0].message 
        });
      }

      return res.status(500).json({ 
        success: false, 
        message: "Failed to submit consultation request" 
      });
    }
  });

  // Blog API routes
  app.get("/api/blog-posts", async (req, res) => {
    try {
      const { category, featured, limit = 10, offset = 0 } = req.query;
      const posts = await storage.getBlogPosts({
        category: category as string,
        featured: featured === 'true',
        limit: parseInt(limit as string),
        offset: parseInt(offset as string)
      });
      return res.json(posts);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return res.status(500).json({ error: 'Failed to fetch blog posts' });
    }
  });

  app.get("/api/blog-post/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getBlogPost(slug);
      if (!post) {
        return res.status(404).json({ error: 'Blog post not found' });
      }
      // Increment view count
      await storage.incrementBlogViews(post.id);
      return res.json(post);
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return res.status(500).json({ error: 'Failed to fetch blog post' });
    }
  });

  app.post("/api/blog-like", async (req, res) => {
    try {
      const { postId } = req.body;
      if (!postId) {
        return res.status(400).json({ error: 'Post ID is required' });
      }
      await storage.likeBlogPost(postId);
      return res.json({ success: true });
    } catch (error) {
      console.error('Error liking blog post:', error);
      return res.status(500).json({ error: 'Failed to like blog post' });
    }
  });

  app.post("/api/blog-comments", async (req, res) => {
    try {
      const { postId, author, email, content } = req.body;
      if (!postId || !author || !email || !content) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      const comment = await storage.createBlogComment({
        postId,
        author,
        email,
        content
      });
      return res.json(comment);
    } catch (error) {
      console.error('Error creating blog comment:', error);
      return res.status(500).json({ error: 'Failed to create comment' });
    }
  });

  app.get("/api/blog-comments/:postId", async (req, res) => {
    try {
      const { postId } = req.params;
      const comments = await storage.getBlogComments(parseInt(postId));
      return res.json(comments);
    } catch (error) {
      console.error('Error fetching blog comments:', error);
      return res.status(500).json({ error: 'Failed to fetch comments' });
    }
  });

  app.post("/api/blog-subscribe", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }
      const subscriber = await storage.createBlogSubscriber({ email });
      return res.json({ success: true, subscriber });
    } catch (error) {
      console.error('Error subscribing to blog:', error);
      return res.status(500).json({ error: 'Failed to subscribe' });
    }
  });

  // Portfolio API routes
  app.get("/api/portfolio-projects", async (req, res) => {
    try {
      const { industry, featured, limit, offset } = req.query;
      const params = {
        industry: industry as string,
        featured: featured === 'true' ? true : featured === 'false' ? false : undefined,
        limit: limit ? parseInt(limit as string, 10) : undefined,
        offset: offset ? parseInt(offset as string, 10) : undefined
      };
      const projects = await storage.getPortfolioProjects(params);
      return res.json(projects);
    } catch (error) {
      console.error('Error fetching portfolio projects:', error);
      return res.status(500).json({ error: 'Failed to fetch portfolio projects' });
    }
  });

  app.get("/api/portfolio-project/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const project = await storage.getPortfolioProject(slug);
      if (!project) {
        return res.status(404).json({ error: 'Portfolio project not found' });
      }
      // Increment view count
      await storage.incrementPortfolioViews(project.id);
      return res.json(project);
    } catch (error) {
      console.error('Error fetching portfolio project:', error);
      return res.status(500).json({ error: 'Failed to fetch portfolio project' });
    }
  });

  app.post("/api/portfolio-like", async (req, res) => {
    try {
      const { projectId } = req.body;
      if (!projectId) {
        return res.status(400).json({ error: 'Project ID is required' });
      }
      await storage.likePortfolioProject(projectId);
      return res.json({ success: true });
    } catch (error) {
      console.error('Error liking portfolio project:', error);
      return res.status(500).json({ error: 'Failed to like portfolio project' });
    }
  });

  app.post("/api/portfolio-inquiry", async (req, res) => {
    try {
      const { name, email, company, phone, message, inquiryType, projectId } = req.body;
      if (!name || !email || !message || !inquiryType) {
        return res.status(400).json({ error: 'Name, email, message, and inquiry type are required' });
      }
      const inquiry = await storage.createPortfolioInquiry({
        name,
        email,
        company,
        phone,
        message,
        inquiryType,
        projectId
      });
      return res.json({ success: true, inquiry });
    } catch (error) {
      console.error('Error creating portfolio inquiry:', error);
      return res.status(500).json({ error: 'Failed to create portfolio inquiry' });
    }
  });

  // Solutions API routes
  app.get("/api/solutions", async (req, res) => {
    try {
      const { type, category, search } = req.query;

      // Solutions data (same as in api/solutions.ts)
      const SOLUTIONS_DATA = [
        {
          id: "cloud-migration",
          title: "Cloud Migration & Management",
          description: "Seamlessly migrate your infrastructure to cloud platforms with zero downtime and optimized costs.",
          features: ["AWS/Azure/GCP Migration", "Cloud Architecture Design", "Cost Optimization", "24/7 Monitoring"],
          benefits: "Reduce infrastructure costs by up to 40% while improving scalability and reliability.",
          category: "Infrastructure",
          pricing: "Starting from $15,000",
          timeline: "6-12 weeks",
          technologies: ["AWS", "Azure", "Google Cloud", "Kubernetes", "Docker", "Terraform"]
        },
        {
          id: "cybersecurity",
          title: "Cybersecurity Solutions",
          description: "Comprehensive security frameworks to protect your business from evolving cyber threats.",
          features: ["Security Audits", "Penetration Testing", "Compliance Management", "Incident Response"],
          benefits: "Achieve 99.9% threat detection rate with enterprise-grade security protocols.",
          category: "Security",
          pricing: "Starting from $12,000",
          timeline: "4-8 weeks",
          technologies: ["SIEM", "IAM", "VPN", "Firewall", "Encryption", "Compliance Tools"]
        },
        {
          id: "data-analytics",
          title: "Data Analytics & BI",
          description: "Transform raw data into actionable business insights with advanced analytics platforms.",
          features: ["Data Warehousing", "Real-time Analytics", "Predictive Modeling", "Custom Dashboards"],
          benefits: "Increase decision-making speed by 60% with real-time data visualization.",
          category: "Analytics",
          pricing: "Starting from $20,000",
          timeline: "8-16 weeks",
          technologies: ["Tableau", "Power BI", "Snowflake", "Apache Spark", "Python", "R"]
        },
        {
          id: "mobile-development",
          title: "Mobile App Development",
          description: "Native and cross-platform mobile applications that deliver exceptional user experiences.",
          features: ["iOS/Android Development", "Cross-platform Solutions", "UI/UX Design", "App Store Optimization"],
          benefits: "Launch mobile apps 50% faster with our proven development methodology.",
          category: "Development",
          pricing: "Starting from $25,000",
          timeline: "12-20 weeks",
          technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "GraphQL"]
        },
        {
          id: "ai-ml",
          title: "AI & Machine Learning",
          description: "Implement intelligent automation and predictive analytics to transform your business operations.",
          features: ["ML Model Development", "Natural Language Processing", "Computer Vision", "Process Automation"],
          benefits: "Automate 70% of repetitive tasks while improving accuracy and efficiency.",
          category: "AI/ML",
          pricing: "Starting from $30,000",
          timeline: "16-24 weeks",
          technologies: ["TensorFlow", "PyTorch", "OpenAI", "Hugging Face", "MLflow", "Kubernetes"]
        },
        {
          id: "digital-transformation",
          title: "Digital Transformation",
          description: "End-to-end digital transformation services to modernize your business processes and technology.",
          features: ["Process Digitization", "Legacy System Modernization", "API Integration", "Change Management"],
          benefits: "Achieve 3x faster business processes with complete digital transformation.",
          category: "Transformation",
          pricing: "Starting from $50,000",
          timeline: "20-32 weeks",
          technologies: ["Microservices", "API Gateway", "DevOps", "Agile", "Lean", "Design Thinking"]
        }
      ];

      if (type === 'solutions') {
        let filteredSolutions = SOLUTIONS_DATA;
        
        if (category && category !== 'all') {
          filteredSolutions = filteredSolutions.filter(
            solution => solution.category.toLowerCase() === (category as string).toLowerCase()
          );
        }
        
        if (search) {
          const searchTerm = (search as string).toLowerCase();
          filteredSolutions = filteredSolutions.filter(
            solution => 
              solution.title.toLowerCase().includes(searchTerm) ||
              solution.description.toLowerCase().includes(searchTerm) ||
              solution.technologies.some(tech => tech.toLowerCase().includes(searchTerm))
          );
        }

        return res.status(200).json({
          success: true,
          solutions: filteredSolutions,
          total: filteredSolutions.length
        });
      }

      // Default: return all solutions
      return res.status(200).json({
        success: true,
        solutions: SOLUTIONS_DATA,
        total: SOLUTIONS_DATA.length
      });
    } catch (error) {
      console.error('Error fetching solutions:', error);
      return res.status(500).json({ error: 'Failed to fetch solutions' });
    }
  });

  app.post("/api/solutions", async (req, res) => {
    try {
      const { type } = req.query;

      // Solution inquiry schema
      const solutionInquirySchema = z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        company: z.string().min(2, "Company name is required"),
        phone: z.string().optional(),
        solutionType: z.string().min(1, "Please select a solution type"),
        projectDescription: z.string().min(10, "Please provide more details about your project"),
        budget: z.string().optional(),
        timeline: z.string().optional(),
        currentChallenges: z.string().optional()
      });

      // Solution consultation schema
      const consultationRequestSchema = z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        company: z.string().min(2, "Company name is required"),
        phone: z.string().optional(),
        solutionType: z.string().min(1, "Please select a solution type"),
        preferredDate: z.string().optional(),
        preferredTime: z.string().optional(),
        message: z.string().optional()
      });

      if (type === 'inquiry') {
        const validationResult = solutionInquirySchema.safeParse(req.body);
        
        if (!validationResult.success) {
          return res.status(400).json({
            success: false,
            message: "Invalid data provided",
            errors: validationResult.error.flatten().fieldErrors
          });
        }

        const inquiryData = validationResult.data;

        // Log the inquiry (in production, you'd save to database and send emails)
        console.log('=== NEW SOLUTION INQUIRY RECEIVED ===');
        console.log('To: singhal3.sachin7@gmail.com');
        console.log('Type: Solution Inquiry');
        console.log('Solution Type:', inquiryData.solutionType);
        console.log('Customer Information:');
        console.log('- Name:', inquiryData.name);
        console.log('- Email:', inquiryData.email);
        console.log('- Company:', inquiryData.company);
        console.log('- Phone:', inquiryData.phone || 'Not provided');
        console.log('Project Details:');
        console.log('- Budget:', inquiryData.budget || 'Not specified');
        console.log('- Timeline:', inquiryData.timeline || 'Not specified');
        console.log('- Description:', inquiryData.projectDescription);
        console.log('- Current Challenges:', inquiryData.currentChallenges || 'None specified');
        console.log('=====================================');

        return res.status(201).json({
          success: true,
          message: "Solution inquiry submitted successfully! Our team will contact you within 24 hours with a tailored solution."
        });
      }

      if (type === 'consultation') {
        const validationResult = consultationRequestSchema.safeParse(req.body);
        
        if (!validationResult.success) {
          return res.status(400).json({
            success: false,
            message: "Invalid data provided",
            errors: validationResult.error.flatten().fieldErrors
          });
        }

        const consultationData = validationResult.data;

        // Log the consultation request
        console.log('=== NEW CONSULTATION REQUEST RECEIVED ===');
        console.log('To: singhal3.sachin7@gmail.com');
        console.log('Type: Consultation Request');
        console.log('Solution Type:', consultationData.solutionType);
        console.log('Customer Information:');
        console.log('- Name:', consultationData.name);
        console.log('- Email:', consultationData.email);
        console.log('- Company:', consultationData.company);
        console.log('- Phone:', consultationData.phone || 'Not provided');
        console.log('Consultation Details:');
        console.log('- Preferred Date:', consultationData.preferredDate || 'Flexible');
        console.log('- Preferred Time:', consultationData.preferredTime || 'Flexible');
        console.log('- Message:', consultationData.message || 'No additional message');
        console.log('=====================================');

        return res.status(201).json({
          success: true,
          message: "Consultation scheduled successfully! We'll send you a calendar invite shortly."
        });
      }

      return res.status(400).json({
        success: false,
        message: "Invalid request type"
      });

    } catch (error) {
      console.error('Error processing solutions request:', error);
      return res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  });

  // Services API routes
  app.post("/api/services", async (req, res) => {
    try {
      const { type } = req.query;

      if (type === 'inquiry') {
        const serviceInquirySchema = z.object({
          name: z.string().min(2, "Name must be at least 2 characters"),
          email: z.string().email("Invalid email address"),
          company: z.string().min(2, "Company name is required"),
          phone: z.string().optional(),
          serviceType: z.string().min(1, "Please select a service type"),
          projectDescription: z.string().min(10, "Please provide more details about your project"),
          budget: z.string().optional(),
          timeline: z.string().optional(),
          urgency: z.enum(['Low', 'Medium', 'High', 'Critical']),
          currentChallenges: z.string().optional()
        });

        const validationResult = serviceInquirySchema.safeParse(req.body);
        
        if (!validationResult.success) {
          return res.status(400).json({
            success: false,
            message: "Invalid data provided",
            errors: validationResult.error.flatten().fieldErrors
          });
        }

        const inquiryData = validationResult.data;

        // Log the service inquiry
        console.log('=== NEW SERVICE INQUIRY RECEIVED ===');
        console.log('To: singhal3.sachin7@gmail.com');
        console.log('Type: Service Inquiry');
        console.log('Service Type:', inquiryData.serviceType);
        console.log('Customer Information:');
        console.log('- Name:', inquiryData.name);
        console.log('- Email:', inquiryData.email);
        console.log('- Company:', inquiryData.company);
        console.log('- Phone:', inquiryData.phone || 'Not provided');
        console.log('Project Details:');
        console.log('- Budget:', inquiryData.budget || 'Not specified');
        console.log('- Timeline:', inquiryData.timeline || 'Not specified');
        console.log('- Urgency:', inquiryData.urgency);
        console.log('- Description:', inquiryData.projectDescription);
        console.log('- Current Challenges:', inquiryData.currentChallenges || 'None specified');
        console.log('=====================================');

        return res.status(201).json({
          success: true,
          message: "Service inquiry submitted successfully! Our team will contact you within 24 hours with a detailed proposal."
        });
      }

      if (type === 'consultation') {
        const consultationRequestSchema = z.object({
          name: z.string().min(2, "Name must be at least 2 characters"),
          email: z.string().email("Invalid email address"),
          company: z.string().min(2, "Company name is required"),
          phone: z.string().optional(),
          serviceType: z.string().min(1, "Please select a service type"),
          preferredDate: z.string().optional(),
          preferredTime: z.string().optional(),
          message: z.string().optional()
        });

        const validationResult = consultationRequestSchema.safeParse(req.body);
        
        if (!validationResult.success) {
          return res.status(400).json({
            success: false,
            message: "Invalid data provided",
            errors: validationResult.error.flatten().fieldErrors
          });
        }

        const consultationData = validationResult.data;

        // Log the consultation request
        console.log('=== NEW SERVICE CONSULTATION REQUEST RECEIVED ===');
        console.log('To: singhal3.sachin7@gmail.com');
        console.log('Type: Consultation Request');
        console.log('Service Type:', consultationData.serviceType);
        console.log('Customer Information:');
        console.log('- Name:', consultationData.name);
        console.log('- Email:', consultationData.email);
        console.log('- Company:', consultationData.company);
        console.log('- Phone:', consultationData.phone || 'Not provided');
        console.log('Consultation Details:');
        console.log('- Preferred Date:', consultationData.preferredDate || 'Flexible');
        console.log('- Preferred Time:', consultationData.preferredTime || 'Flexible');
        console.log('- Message:', consultationData.message || 'No additional message');
        console.log('=====================================');

        return res.status(201).json({
          success: true,
          message: "Consultation scheduled successfully! We'll send you a calendar invite shortly."
        });
      }

      return res.status(400).json({
        success: false,
        message: "Invalid request type"
      });

    } catch (error) {
      console.error('Error processing services request:', error);
      return res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  });

  // Add favicon routes to serve them with correct MIME types
  app.get('/favicon.ico', (req, res) => {
    const faviconPath = path.join(process.cwd(), 'public', 'favicon.ico');
    res.setHeader('Content-Type', 'image/x-icon');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.sendFile(faviconPath);
  });

  app.get('/favicon.gif', (req, res) => {
    const faviconPath = path.join(process.cwd(), 'public', 'favicon.gif');
    res.setHeader('Content-Type', 'image/gif');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.sendFile(faviconPath);
  });

  app.get('/logo.gif', (req, res) => {
    const logoPath = path.join(process.cwd(), 'public', 'logo.gif');
    res.setHeader('Content-Type', 'image/gif');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.sendFile(logoPath);
  });

  app.get('/new-logo.gif', (req, res) => {
    const logoPath = path.join(process.cwd(), 'public', 'new-logo.gif');
    res.setHeader('Content-Type', 'image/gif');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.sendFile(logoPath);
  });

  app.get('/favicon.png', (req, res) => {
    const faviconPath = path.join(process.cwd(), 'public', 'favicon.png');
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.sendFile(faviconPath);
  });

  app.get('/favicon.svg', (req, res) => {
    const faviconPath = path.join(process.cwd(), 'public', 'favicon.svg');
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.sendFile(faviconPath);
  });

  const httpServer = createServer(app);
  return httpServer;
}
