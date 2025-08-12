import { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

// Static blog data for Vercel serverless functions
const staticBlogPosts = [
  {
    id: 1,
    title: "The Future of AI in Enterprise Software Development",
    slug: "future-ai-enterprise-software-development",
    excerpt: "Explore how artificial intelligence is transforming enterprise software development, from automated code generation to intelligent testing and deployment strategies.",
    content: "# The Future of AI in Enterprise Software Development\n\nArtificial Intelligence is revolutionizing how we approach enterprise software development. From automated code generation to intelligent testing frameworks, AI is becoming an integral part of the modern development lifecycle.\n\n## Key Areas of AI Integration\n\n### 1. Code Generation and Assistance\n- AI-powered IDEs that suggest code completions\n- Automated documentation generation\n- Code review and optimization suggestions\n\n### 2. Testing and Quality Assurance\n- Intelligent test case generation\n- Automated bug detection and fixing\n- Performance optimization recommendations\n\n### 3. Deployment and Operations\n- Predictive scaling based on usage patterns\n- Automated incident response\n- Continuous optimization of system performance\n\n## Benefits for Enterprise Development\n\n**Increased Productivity**: Developers can focus on high-level architecture and business logic while AI handles routine tasks.\n\n**Improved Quality**: AI-powered testing tools can identify edge cases and potential issues that might be missed by manual testing.\n\n**Faster Time-to-Market**: Automated processes reduce development cycles and accelerate product delivery.\n\nThe future of enterprise software development is not about replacing developers—it's about augmenting their capabilities and enabling them to build better software faster.",
    author: "Sarah Chen",
    category: "Artificial Intelligence",
    tags: ["AI", "Enterprise", "Software Development", "Automation"],
    readTime: "8 min read",
    published: true,
    featured: true,
    views: 1245,
    likes: 89,
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-01-15")
  },
  {
    id: 2,
    title: "Cloud Migration Strategies for Enterprise Applications",
    slug: "cloud-migration-strategies-enterprise-applications",
    excerpt: "A comprehensive guide to successfully migrating enterprise applications to the cloud, covering planning, execution, and optimization strategies.",
    content: "# Cloud Migration Strategies for Enterprise Applications\n\nMigrating enterprise applications to the cloud is a complex undertaking that requires careful planning, execution, and ongoing optimization. This comprehensive guide covers the key strategies and best practices for successful cloud migration.\n\n## Understanding Cloud Migration\n\nCloud migration involves moving digital assets, services, databases, IT resources, and applications from on-premises infrastructure to cloud-based environments. For enterprises, this transition offers numerous benefits including cost optimization, scalability, and enhanced security.\n\n## Migration Strategies\n\n### 1. Lift and Shift (Rehosting)\n- **Approach**: Move applications to the cloud with minimal changes\n- **Benefits**: Quick migration, low initial cost\n- **Best For**: Legacy applications that work well as-is\n\n### 2. Refactoring\n- **Approach**: Modify applications to better leverage cloud services\n- **Benefits**: Improved performance and cost optimization\n- **Best For**: Applications that need modernization\n\nSuccessful cloud migration requires careful planning, the right expertise, and a systematic approach. By learning from the experiences of others and following proven best practices, enterprises can achieve successful cloud transformations that deliver significant business value.",
    author: "Marcus Rodriguez",
    category: "Cloud Computing",
    tags: ["Cloud", "Migration", "AWS", "Azure"],
    readTime: "6 min read",
    published: true,
    featured: false,
    views: 892,
    likes: 67,
    createdAt: new Date("2025-01-12"),
    updatedAt: new Date("2025-01-12")
  },
  {
    id: 3,
    title: "Cybersecurity Best Practices for Remote Work Environments",
    slug: "cybersecurity-best-practices-remote-work",
    excerpt: "Essential cybersecurity measures and protocols for organizations operating in hybrid and remote work environments, protecting against modern threats.",
    content: "# Cybersecurity Best Practices for Remote Work Environments\n\nThe shift to remote and hybrid work models has fundamentally changed the cybersecurity landscape. Organizations must now protect distributed workforces while maintaining productivity and collaboration.\n\n## Core Security Challenges in Remote Work\n\n### Network Security\n- Unsecured home networks\n- Public Wi-Fi vulnerabilities\n- Lack of enterprise-grade firewalls\n\n### Device Management\n- Personal devices accessing corporate data\n- Inconsistent security updates\n- Physical device security\n\n### Human Factor\n- Social engineering attacks\n- Phishing targeting remote workers\n- Reduced IT support visibility\n\n## Essential Security Measures\n\n### 1. Zero Trust Architecture\nImplement a zero-trust model where no user or device is automatically trusted, regardless of location.\n\n### 2. Multi-Factor Authentication (MFA)\nMandatory MFA for all corporate applications and services.\n\n### 3. VPN and Secure Connections\nEnterprise-grade VPN solutions for secure remote access to corporate resources.\n\n### 4. Endpoint Detection and Response (EDR)\nAdvanced endpoint protection across all devices accessing corporate data.\n\n### 5. Regular Security Training\nContinuous cybersecurity awareness training tailored for remote work scenarios.\n\nSecuring remote work environments requires a holistic approach combining technology, processes, and people. Organizations that invest in comprehensive remote work security strategies will be better positioned to protect their assets and maintain business continuity.",
    author: "David Thompson",
    category: "Cybersecurity",
    tags: ["Cybersecurity", "Remote Work", "Zero Trust", "MFA", "VPN"],
    readTime: "7 min read",
    published: true,
    featured: false,
    views: 756,
    likes: 54,
    createdAt: new Date("2025-01-10"),
    updatedAt: new Date("2025-01-10")
  },
  {
    id: 4,
    title: "Digital Transformation Roadmap for Healthcare Organizations",
    slug: "digital-transformation-healthcare-organizations",
    excerpt: "A strategic approach to healthcare digital transformation, covering patient care systems, compliance requirements, and technology integration.",
    content: "# Digital Transformation Roadmap for Healthcare Organizations\n\nHealthcare organizations face unique challenges in their digital transformation journeys, balancing patient care improvements with strict regulatory requirements and data security concerns.\n\n## Key Drivers of Healthcare Digital Transformation\n\n### Patient Experience Enhancement\n- Telemedicine and remote monitoring\n- Patient portals and mobile applications\n- Streamlined appointment scheduling and billing\n\n### Operational Efficiency\n- Electronic Health Records (EHR) optimization\n- Automated clinical workflows\n- Predictive analytics for resource planning\n\n### Regulatory Compliance\n- HIPAA compliance automation\n- Audit trail management\n- Data governance frameworks\n\n## Core Technology Components\n\n### 1. Cloud-First Infrastructure\n**Benefits**: Scalability, cost optimization, and enhanced security\n**Considerations**: Data residency requirements and compliance certifications\n\n### 2. Interoperability Solutions\n**Focus**: FHIR standards implementation and API-first architecture\n**Impact**: Seamless data exchange between systems and providers\n\n### 3. Advanced Analytics and AI\n**Applications**: Clinical decision support, fraud detection, and population health management\n**Requirements**: High-quality data and robust governance frameworks\n\n### 4. Cybersecurity Framework\n**Essential**: Multi-layered security approach with endpoint protection\n**Critical**: Regular security assessments and incident response planning\n\nSuccessful healthcare digital transformation requires a patient-centric approach, robust technology foundation, and unwavering commitment to data security and regulatory compliance.",
    author: "Dr. Jennifer Martinez",
    category: "Healthcare Technology",
    tags: ["Healthcare", "Digital Transformation", "EHR", "Telemedicine", "HIPAA"],
    readTime: "9 min read",
    published: true,
    featured: false,
    views: 623,
    likes: 41,
    createdAt: new Date("2025-01-08"),
    updatedAt: new Date("2025-01-08")
  },
  {
    id: 5,
    title: "DevOps Culture Transformation: From Traditional IT to Agile Operations",
    slug: "devops-culture-transformation-agile-operations",
    excerpt: "Guide to successfully transforming organizational culture from traditional IT operations to modern DevOps practices, focusing on collaboration and automation.",
    content: "# DevOps Culture Transformation: From Traditional IT to Agile Operations\n\nTransforming from traditional IT operations to a DevOps culture requires more than just implementing new tools—it demands a fundamental shift in mindset, processes, and organizational structure.\n\n## Understanding DevOps Culture\n\nDevOps is not merely a set of tools or practices; it's a cultural philosophy that emphasizes collaboration, shared responsibility, and continuous improvement across development and operations teams.\n\n### Core DevOps Principles\n\n1. **Collaboration Over Silos**: Breaking down barriers between development and operations teams\n2. **Automation First**: Automating repetitive tasks to reduce errors and increase efficiency\n3. **Continuous Learning**: Embracing failure as a learning opportunity and continuously improving processes\n4. **Customer Focus**: Aligning all activities with customer value delivery\n5. **Measurement and Feedback**: Data-driven decision making and continuous monitoring\n\n## Best Practices for Success\n\n**Start Small**: Begin with pilot projects to demonstrate value and build momentum\n\n**Invest in People**: Provide comprehensive training and support for team members\n\n**Measure Everything**: Establish baseline metrics and track progress continuously\n\n**Celebrate Wins**: Recognize and celebrate both small and large successes\n\n**Learn from Failures**: Treat failures as learning opportunities without blame\n\nDevOps transformation is a journey, not a destination. Success requires sustained commitment, continuous learning, and a willingness to adapt as the organization evolves.",
    author: "Michael Chen",
    category: "DevOps",
    tags: ["DevOps", "Culture Transformation", "Agile", "CI/CD", "Automation"],
    readTime: "10 min read",
    published: true,
    featured: false,
    views: 934,
    likes: 72,
    createdAt: new Date("2025-01-05"),
    updatedAt: new Date("2025-01-05")
  },
  {
    id: 6,
    title: "Blockchain Technology in Supply Chain Management",
    slug: "blockchain-technology-supply-chain-management",
    excerpt: "Exploring the practical applications of blockchain technology in supply chain management, including transparency, traceability, and fraud prevention.",
    content: "# Blockchain Technology in Supply Chain Management\n\nBlockchain technology offers unprecedented opportunities for supply chain transparency, traceability, and security. This comprehensive analysis explores practical implementations and real-world benefits.\n\n## Supply Chain Challenges\n\n### Lack of Transparency\n- Limited visibility into multi-tier supply chains\n- Difficulty tracking products from origin to consumer\n- Challenges in verifying authenticity and quality\n\n### Fraud and Counterfeiting\n- Counterfeit products entering legitimate supply chains\n- Document forgery and false certifications\n- Grey market and unauthorized distribution\n\n### Compliance and Regulation\n- Complex regulatory requirements across jurisdictions\n- Difficulty proving compliance with environmental standards\n- Challenges in managing product recalls\n\n## Blockchain Solutions\n\n### Immutable Record Keeping\n**Benefit**: Permanent, tamper-proof records of all supply chain transactions\n**Implementation**: Digital certificates and provenance tracking\n\n### Smart Contracts\n**Benefit**: Automated execution of agreements based on predefined conditions\n**Applications**: Automatic payments, compliance verification, quality assurance\n\n### Decentralized Verification\n**Benefit**: Multiple parties can verify transactions without central authority\n**Impact**: Reduced need for intermediaries and faster dispute resolution\n\nBlockchain technology represents a transformative opportunity for supply chain management. Organizations that strategically implement blockchain solutions will gain competitive advantages through enhanced transparency, reduced costs, and improved customer trust.",
    author: "Lisa Wang",
    category: "Blockchain",
    tags: ["Blockchain", "Supply Chain", "Transparency", "Smart Contracts", "Traceability"],
    readTime: "11 min read",
    published: true,
    featured: false,
    views: 567,
    likes: 38,
    createdAt: new Date("2025-01-03"),
    updatedAt: new Date("2025-01-03")
  }
];

function getStaticBlogPosts() {
  return staticBlogPosts;
}

function getStaticBlogPostBySlug(slug: string) {
  return staticBlogPosts.find(post => post.slug === slug);
}

// Blog post schema
const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  coverImage: z.string().optional(),
  readTime: z.number().min(1, 'Read time is required')
});

const blogCommentSchema = z.object({
  postId: z.number().min(1, 'Post ID is required'),
  author: z.string().min(1, 'Author name is required'),
  email: z.string().email('Invalid email format'),
  content: z.string().min(1, 'Comment content is required'),
  website: z.string().optional()
});

const blogSubscriberSchema = z.object({
  email: z.string().email('Invalid email format'),
  name: z.string().min(1, 'Name is required').optional()
});

// Static data is now imported from shared/static-data.ts

let blogComments: any[] = [];
let blogSubscribers: any[] = [];

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
    console.error('Blog API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function handleGet(req: VercelRequest, res: VercelResponse) {
  const { action, slug, postId } = req.query;

  switch (action) {
    case 'posts':
      return res.json(getStaticBlogPosts());
    
    case 'post':
      if (!slug) {
        return res.status(400).json({ error: 'Slug is required' });
      }
      const post = getStaticBlogPostBySlug(slug as string);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      return res.json(post);
    
    case 'comments':
      if (!postId) {
        return res.status(400).json({ error: 'Post ID is required' });
      }
      const comments = blogComments.filter(c => c.postId === parseInt(postId as string));
      return res.json(comments);
    
    default:
      return res.status(400).json({ error: 'Invalid action' });
  }
}

async function handlePost(req: VercelRequest, res: VercelResponse) {
  const { action } = req.query;

  switch (action) {
    case 'comment':
      try {
        const commentData = blogCommentSchema.parse(req.body);
        const comment = {
          id: blogComments.length + 1,
          ...commentData,
          approved: false,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        blogComments.push(comment);
        return res.status(201).json(comment);
      } catch (error) {
        if (error instanceof z.ZodError) {
          return res.status(400).json({ error: fromZodError(error).toString() });
        }
        throw error;
      }
    
    case 'subscribe':
      try {
        const subscriberData = blogSubscriberSchema.parse(req.body);
        const subscriber = {
          id: blogSubscribers.length + 1,
          ...subscriberData,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        blogSubscribers.push(subscriber);
        return res.status(201).json(subscriber);
      } catch (error) {
        if (error instanceof z.ZodError) {
          return res.status(400).json({ error: fromZodError(error).toString() });
        }
        throw error;
      }
    
    case 'like':
      try {
        const { postId } = req.body;
        const post = staticBlogPosts.find(p => p.id === parseInt(postId));
        if (!post) {
          return res.status(404).json({ error: 'Post not found' });
        }
        post.likes += 1;
        return res.json({ likes: post.likes });
      } catch (error) {
        return res.status(400).json({ error: 'Invalid request' });
      }
    
    default:
      return res.status(400).json({ error: 'Invalid action' });
  }
}