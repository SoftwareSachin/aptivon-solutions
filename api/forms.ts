import { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

// Form schemas
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  company: z.string().optional(),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required')
});

const jobApplicationSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email format'),
  phone: z.string().min(1, 'Phone number is required'),
  position: z.string().min(1, 'Position is required'),
  department: z.string().optional(),
  location: z.string().optional(),
  experience: z.string().optional(),
  coverLetter: z.string().optional()
});

const supportTicketSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  subject: z.string().min(1, 'Subject is required'),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Description is required'),
  attachments: z.array(z.string()).optional()
});

const webinarRegistrationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  company: z.string().optional(),
  position: z.string().optional(),
  webinarId: z.string().min(1, 'Webinar ID is required'),
  interests: z.array(z.string()).optional()
});

const newsletterSchema = z.object({
  email: z.string().email('Invalid email format'),
  name: z.string().optional(),
  interests: z.array(z.string()).optional()
});

// In-memory storage
let contacts: any[] = [];
let jobApplications: any[] = [];
let supportTickets: any[] = [];
let webinarRegistrations: any[] = [];
let newsletterSubscribers: any[] = [];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { method } = req;
  const { action } = req.query;

  try {
    switch (method) {
      case 'GET':
        return handleGet(req, res);
      case 'POST':
        return handlePost(req, res);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Forms API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function handleGet(req: VercelRequest, res: VercelResponse) {
  const { action } = req.query;

  switch (action) {
    case 'contacts':
      return res.json(contacts);
    case 'applications':
      return res.json(jobApplications);
    case 'tickets':
      return res.json(supportTickets);
    case 'registrations':
      return res.json(webinarRegistrations);
    case 'subscribers':
      return res.json(newsletterSubscribers);
    default:
      return res.status(400).json({ error: 'Invalid action' });
  }
}

async function handlePost(req: VercelRequest, res: VercelResponse) {
  const { action } = req.query;

  switch (action) {
    case 'contact':
      try {
        const contactData = contactSchema.parse(req.body);
        const contact = {
          id: contacts.length + 1,
          ...contactData,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        contacts.push(contact);
        return res.status(201).json(contact);
      } catch (error) {
        if (error instanceof z.ZodError) {
          return res.status(400).json({ error: fromZodError(error).toString() });
        }
        throw error;
      }
    
    case 'job-application':
      try {
        const applicationData = jobApplicationSchema.parse(req.body);
        const application = {
          id: jobApplications.length + 1,
          ...applicationData,
          status: 'pending',
          createdAt: new Date(),
          updatedAt: new Date()
        };
        jobApplications.push(application);
        
        // Return success response that matches frontend expectations
        return res.status(201).json({
          success: true,
          message: `Thank you for applying! We've received your application for the ${applicationData.position} position and will review it shortly. Our team will contact you within 2-3 business days.`,
          application: application
        });
      } catch (error) {
        if (error instanceof z.ZodError) {
          return res.status(400).json({ 
            success: false,
            error: fromZodError(error).toString() 
          });
        }
        throw error;
      }
    
    case 'support-ticket':
      try {
        const ticketData = supportTicketSchema.parse(req.body);
        const ticket = {
          id: supportTickets.length + 1,
          ...ticketData,
          status: 'open',
          createdAt: new Date(),
          updatedAt: new Date()
        };
        supportTickets.push(ticket);
        return res.status(201).json(ticket);
      } catch (error) {
        if (error instanceof z.ZodError) {
          return res.status(400).json({ error: fromZodError(error).toString() });
        }
        throw error;
      }
    
    case 'webinar-registration':
      try {
        const registrationData = webinarRegistrationSchema.parse(req.body);
        const registration = {
          id: webinarRegistrations.length + 1,
          ...registrationData,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        webinarRegistrations.push(registration);
        return res.status(201).json(registration);
      } catch (error) {
        if (error instanceof z.ZodError) {
          return res.status(400).json({ error: fromZodError(error).toString() });
        }
        throw error;
      }
    
    case 'newsletter':
      try {
        const subscriberData = newsletterSchema.parse(req.body);
        const subscriber = {
          id: newsletterSubscribers.length + 1,
          ...subscriberData,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        newsletterSubscribers.push(subscriber);
        return res.status(201).json(subscriber);
      } catch (error) {
        if (error instanceof z.ZodError) {
          return res.status(400).json({ error: fromZodError(error).toString() });
        }
        throw error;
      }
    
    default:
      return res.status(400).json({ error: 'Invalid action' });
  }
}