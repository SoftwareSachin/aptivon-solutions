import { contacts, type Contact, type InsertContact, type BlogPost, type InsertBlogPost, type BlogComment, type InsertBlogComment, type BlogSubscriber, type InsertBlogSubscriber, type PortfolioProject, type InsertPortfolioProject, type PortfolioInquiry, type InsertPortfolioInquiry } from "@shared/schema";

export interface IStorage {
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  getContact(id: number): Promise<Contact | undefined>;
  
  // Blog Posts
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  getBlogPosts(params?: { category?: string; featured?: boolean; limit?: number; offset?: number }): Promise<BlogPost[]>;
  getBlogPost(slug: string): Promise<BlogPost | undefined>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  incrementBlogViews(id: number): Promise<void>;
  likeBlogPost(id: number): Promise<void>;
  
  // Blog Comments
  createBlogComment(comment: InsertBlogComment): Promise<BlogComment>;
  getBlogComments(postId: number): Promise<BlogComment[]>;
  approveBlogComment(id: number): Promise<void>;
  
  // Blog Subscribers
  createBlogSubscriber(subscriber: InsertBlogSubscriber): Promise<BlogSubscriber>;
  getBlogSubscribers(): Promise<BlogSubscriber[]>;
  unsubscribeBlogSubscriber(email: string): Promise<void>;
  
  // Portfolio Projects
  createPortfolioProject(project: InsertPortfolioProject): Promise<PortfolioProject>;
  getPortfolioProjects(params?: { industry?: string; featured?: boolean; limit?: number; offset?: number }): Promise<PortfolioProject[]>;
  getPortfolioProject(slug: string): Promise<PortfolioProject | undefined>;
  updatePortfolioProject(id: number, project: Partial<InsertPortfolioProject>): Promise<PortfolioProject | undefined>;
  incrementPortfolioViews(id: number): Promise<void>;
  likePortfolioProject(id: number): Promise<void>;
  
  // Portfolio Inquiries
  createPortfolioInquiry(inquiry: InsertPortfolioInquiry): Promise<PortfolioInquiry>;
  getPortfolioInquiries(): Promise<PortfolioInquiry[]>;
  getPortfolioInquiry(id: number): Promise<PortfolioInquiry | undefined>;
  updatePortfolioInquiry(id: number, inquiry: Partial<InsertPortfolioInquiry>): Promise<PortfolioInquiry | undefined>;
}

export class MemStorage implements IStorage {
  private contacts: Map<number, Contact>;
  private blogPosts: Map<number, BlogPost>;
  private blogComments: Map<number, BlogComment>;
  private blogSubscribers: Map<number, BlogSubscriber>;
  private portfolioProjects: Map<number, PortfolioProject>;
  private portfolioInquiries: Map<number, PortfolioInquiry>;
  private currentId: number;
  private currentBlogId: number;
  private currentCommentId: number;
  private currentSubscriberId: number;
  private currentPortfolioId: number;
  private currentInquiryId: number;

  constructor() {
    this.contacts = new Map();
    this.blogPosts = new Map();
    this.blogComments = new Map();
    this.blogSubscribers = new Map();
    this.portfolioProjects = new Map();
    this.portfolioInquiries = new Map();
    this.currentId = 1;
    this.currentBlogId = 1;
    this.currentCommentId = 1;
    this.currentSubscriberId = 1;
    this.currentPortfolioId = 1;
    this.currentInquiryId = 1;
    this.initializeBlogPosts();
    this.initializePortfolioProjects();
  }

  private initializeBlogPosts() {
    // Add sample blog posts for demo
    const samplePosts = [
      {
        title: "The Future of Enterprise AI: Transforming Business Operations in 2025",
        slug: "future-enterprise-ai-transforming-business-operations-2025",
        excerpt: "Explore how artificial intelligence is revolutionizing enterprise operations, from predictive analytics to automated decision-making, and what leaders need to know to stay competitive.",
        content: `# The Future of Enterprise AI: Transforming Business Operations in 2025

Artificial Intelligence is no longer a futuristic concept—it's a present reality reshaping how enterprises operate, compete, and deliver value. As we navigate through 2025, the convergence of advanced AI technologies, cloud computing, and data analytics is creating unprecedented opportunities for businesses to transform their operations fundamentally.

## The AI Revolution in Enterprise Operations

The enterprise AI landscape has evolved dramatically over the past few years. What once required teams of data scientists and months of development can now be accomplished in days with the right AI platforms and tools. This democratization of AI technology is enabling organizations of all sizes to harness the power of machine learning, natural language processing, and predictive analytics.

### Key Areas of AI Impact

**1. Predictive Analytics and Forecasting**
Modern AI systems can analyze vast amounts of historical data to predict future trends, customer behavior, and market conditions with remarkable accuracy. This capability is transforming supply chain management, inventory optimization, and strategic planning.

**2. Automated Decision-Making**
AI-powered systems can now make complex decisions in real-time, from pricing strategies to resource allocation. This automation not only reduces human error but also enables 24/7 operations and faster response times.

**3. Customer Experience Enhancement**
AI chatbots, personalization engines, and recommendation systems are creating more engaging and tailored customer experiences. These technologies can understand customer preferences, predict needs, and provide proactive support.

## Implementation Strategies for Success

Successfully implementing AI in enterprise operations requires careful planning and execution. Here are key strategies we've observed in successful AI transformations:

### 1. Start with Clear Business Objectives
Define specific, measurable goals for your AI initiatives. Whether it's reducing operational costs by 20% or improving customer satisfaction scores, having clear objectives ensures focused implementation.

### 2. Invest in Data Quality
AI systems are only as good as the data they're trained on. Establish robust data governance practices, ensure data quality, and create unified data platforms that can feed your AI models.

### 3. Build AI-Ready Teams
Successful AI adoption requires teams with the right skills. This doesn't mean hiring only data scientists—it means training existing employees and creating cross-functional teams that understand both the business and the technology.

## Emerging Trends to Watch

As we look ahead, several trends are shaping the future of enterprise AI:

- **Edge AI**: Processing data closer to its source for real-time insights
- **Explainable AI**: Making AI decisions more transparent and understandable
- **AI Ethics and Governance**: Ensuring responsible AI deployment
- **Autonomous Operations**: Fully self-managing business processes

## Conclusion

The future of enterprise AI is not just about technology—it's about reimagining how businesses operate. Organizations that embrace AI thoughtfully, with clear strategies and proper implementation, will find themselves with significant competitive advantages in the digital economy.

Ready to explore how AI can transform your business operations? Our team of experts is here to help you navigate this exciting journey.`,
        author: "Sarah Chen",
        category: "Artificial Intelligence",
        tags: ["AI", "Enterprise", "Digital Transformation", "Strategy"],
        readTime: "8 min read",
        published: true,
        featured: true,
        views: 1247,
        likes: 89,
        createdAt: new Date("2025-01-15"),
        updatedAt: new Date("2025-01-15")
      },
      {
        title: "Cloud Migration Best Practices: Lessons from 5+ Enterprise Deployments",
        slug: "cloud-migration-best-practices-enterprise-deployments",
        excerpt: "Key insights and proven strategies for successful cloud migration, including common pitfalls to avoid and optimization techniques.",
        content: `# Cloud Migration Best Practices: Lessons from 5+ Enterprise Deployments

Cloud migration has become a strategic imperative for enterprises seeking to modernize their IT infrastructure, reduce costs, and improve scalability. Through our experience with numerous enterprise deployments, we've identified key patterns that distinguish successful migrations from those that struggle with delays, cost overruns, and performance issues.

## The Migration Landscape

Enterprise cloud migration is more than just moving applications from on-premises to the cloud. It's a comprehensive transformation that touches every aspect of IT operations, from application architecture to security protocols, from data management to team workflows.

### Common Migration Challenges

**1. Legacy System Complexity**
Many enterprises operate complex, interconnected systems that have evolved over decades. These systems often have undocumented dependencies and custom configurations that make migration challenging.

**2. Data Migration Risks**
Moving large volumes of enterprise data while maintaining integrity, security, and availability requires careful planning and execution.

**3. Security and Compliance**
Ensuring that migrated systems meet regulatory requirements and maintain security standards is critical but often overlooked in migration planning.

## Proven Migration Strategies

### 1. Assessment and Planning Phase

**Comprehensive Discovery**
Start with a thorough assessment of your current environment. Document all applications, dependencies, data flows, and integration points. This discovery phase is crucial for avoiding surprises during migration.

**Migration Strategy Selection**
Choose the right migration approach for each application:
- **Rehost (Lift and Shift)**: Quick migration with minimal changes
- **Refactor**: Modify applications to leverage cloud-native features
- **Rebuild**: Complete application redesign for cloud optimization

### 2. Phased Migration Approach

**Pilot Projects**
Begin with non-critical applications to test your migration processes and build team expertise. This approach allows you to refine your methodology before tackling mission-critical systems.

**Wave-Based Migration**
Group applications into migration waves based on complexity, dependencies, and business criticality. This structured approach ensures systematic progress and manageable risk.

### 3. Security and Compliance First

**Cloud Security Framework**
Implement comprehensive security measures from day one:
- Identity and Access Management (IAM)
- Network security and segmentation
- Data encryption at rest and in transit
- Continuous monitoring and threat detection

**Compliance Validation**
Ensure your cloud architecture meets all regulatory requirements before migration begins. This proactive approach prevents costly remediation later.

## Performance Optimization Techniques

### Right-Sizing Resources

**Initial Sizing**
Start with conservative resource allocation based on current usage patterns, then optimize based on actual cloud performance metrics.

**Continuous Optimization**
Implement monitoring and automation to continuously right-size resources based on actual usage patterns.

### Cost Management

**Resource Tagging**
Implement comprehensive tagging strategies to track costs by department, project, and application.

**Reserved Instances**
Use reserved instances for predictable workloads to achieve significant cost savings.

## Lessons Learned

Through our enterprise migration projects, we've identified several critical success factors:

### 1. Executive Sponsorship
Strong leadership support is essential for overcoming organizational resistance and ensuring adequate resource allocation.

### 2. Change Management
Invest in training and change management to ensure your teams can effectively operate in the new cloud environment.

### 3. Automation from Day One
Implement Infrastructure as Code (IaC) and automated deployment pipelines to ensure consistency and reduce manual errors.

### 4. Monitoring and Observability
Establish comprehensive monitoring before migration to quickly identify and resolve issues.

## Common Pitfalls to Avoid

**1. Underestimating Complexity**
Legacy systems often have hidden dependencies that can cause migration delays.

**2. Neglecting Performance Testing**
Always conduct thorough performance testing in the cloud environment before production deployment.

**3. Inadequate Training**
Ensure your teams are properly trained on cloud technologies and best practices.

**4. Ignoring Cost Optimization**
Implement cost monitoring and optimization practices from the beginning to avoid budget overruns.

## Conclusion

Successful cloud migration requires careful planning, the right expertise, and a systematic approach. By learning from the experiences of others and following proven best practices, enterprises can achieve successful cloud transformations that deliver significant business value.

Ready to start your cloud migration journey? Our team has the experience and expertise to guide you through every step of the process.`,
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
      }
    ];

    samplePosts.forEach(post => {
      const id = this.currentBlogId++;
      const blogPost: BlogPost = {
        ...post,
        id,
      };
      this.blogPosts.set(id, blogPost);
    });
    
    // Add additional blog posts to ensure we have more content
    const additionalPosts = [
      {
        title: "DevOps Automation: Building Scalable CI/CD Pipelines",
        slug: "devops-automation-scalable-cicd-pipelines",
        excerpt: "Learn how to implement robust DevOps practices that accelerate development cycles and improve software quality through automated testing and deployment.",
        content: `# DevOps Automation: Building Scalable CI/CD Pipelines\n\nModern software development demands speed, quality, and reliability. DevOps automation, particularly through well-designed CI/CD pipelines, provides the foundation for achieving these goals while maintaining high standards of code quality and system stability.\n\n## The Evolution of DevOps\n\nDevOps has transformed from a cultural movement to a set of proven practices and tools that enable organizations to deliver software faster and more reliably. The key to successful DevOps implementation lies in automation—removing manual processes that introduce delays and errors.\n\n## Building Effective CI/CD Pipelines\n\n### Continuous Integration (CI)\n\nEffective CI practices include:\n- Automated code quality checks\n- Comprehensive testing at multiple levels\n- Security vulnerability scanning\n- Performance benchmarking\n\n### Continuous Deployment (CD)\n\nStreamlined deployment processes ensure:\n- Consistent environment configuration\n- Rollback capabilities\n- Blue-green deployment strategies\n- Automated monitoring and alerting\n\n## Best Practices for Success\n\n1. **Infrastructure as Code**: Version control your infrastructure\n2. **Monitoring and Observability**: Implement comprehensive logging\n3. **Security Integration**: Build security into every step\n4. **Team Collaboration**: Foster communication between development and operations\n\n## Conclusion\n\nSuccessful DevOps automation requires thoughtful planning, the right tools, and a commitment to continuous improvement. The investment in building robust CI/CD pipelines pays dividends in reduced deployment time, fewer production issues, and increased team productivity.`,
        author: "Sarah Chen",
        category: "DevOps",
        tags: ["DevOps", "CI/CD", "Automation", "Infrastructure"],
        readTime: "7 min read",
        published: true,
        featured: false,
        views: 654,
        likes: 42,
        createdAt: new Date("2025-01-10"),
        updatedAt: new Date("2025-01-10")
      },
      {
        title: "Cybersecurity in the Cloud: Essential Protection Strategies",
        slug: "cybersecurity-cloud-essential-protection-strategies",
        excerpt: "Comprehensive guide to securing cloud infrastructure, including identity management, network security, and compliance requirements for enterprise environments.",
        content: `# Cybersecurity in the Cloud: Essential Protection Strategies\n\nAs organizations increasingly migrate to cloud environments, cybersecurity has become more complex and critical than ever. The shared responsibility model of cloud security requires a new approach to protecting digital assets and ensuring compliance with industry regulations.\n\n## Understanding Cloud Security Challenges\n\nCloud environments introduce unique security considerations:\n- Shared responsibility between cloud providers and customers\n- Dynamic and scalable infrastructure\n- Multi-tenant environments\n- Diverse access patterns and devices\n\n## Core Security Pillars\n\n### 1. Identity and Access Management (IAM)\n\n- Multi-factor authentication (MFA)\n- Role-based access control (RBAC)\n- Principle of least privilege\n- Regular access reviews and audits\n\n### 2. Network Security\n\n- Virtual private clouds (VPCs)\n- Network segmentation\n- Firewall rules and security groups\n- Intrusion detection and prevention\n\n### 3. Data Protection\n\n- Encryption at rest and in transit\n- Data classification and labeling\n- Backup and disaster recovery\n- Data loss prevention (DLP)\n\n## Compliance and Governance\n\nMaintaining compliance in cloud environments requires:\n- Understanding regulatory requirements\n- Implementing security frameworks\n- Regular security assessments\n- Documentation and audit trails\n\n## Best Practices for Implementation\n\n1. **Security by Design**: Build security into every layer\n2. **Continuous Monitoring**: Implement real-time threat detection\n3. **Regular Updates**: Keep systems and security tools current\n4. **Team Training**: Ensure security awareness across all teams\n\n## Conclusion\n\nCloud security is an ongoing process that requires vigilance, proper tools, and a comprehensive strategy. By implementing these essential protection strategies, organizations can confidently leverage cloud technologies while maintaining robust security postures.`,
        author: "Marcus Rodriguez",
        category: "Cybersecurity",
        tags: ["Security", "Cloud", "Compliance", "Data Protection"],
        readTime: "9 min read",
        published: true,
        featured: false,
        views: 987,
        likes: 78,
        createdAt: new Date("2025-01-08"),
        updatedAt: new Date("2025-01-08")
      },
      {
        title: "Modern Web Development: React, TypeScript, and Performance Optimization",
        slug: "modern-web-development-react-typescript-performance",
        excerpt: "Explore the latest trends in frontend development, from React hooks and TypeScript best practices to advanced performance optimization techniques.",
        content: `# Modern Web Development: React, TypeScript, and Performance Optimization\n\nThe frontend development landscape continues to evolve rapidly, with new tools, frameworks, and best practices emerging regularly. This comprehensive guide covers the essential aspects of modern web development, focusing on React, TypeScript, and performance optimization strategies.\n\n## The Modern Development Stack\n\n### React Ecosystem\n\nReact remains the dominant frontend framework, offering:\n- Component-based architecture\n- Virtual DOM for efficient updates\n- Rich ecosystem of libraries and tools\n- Strong community support\n\n### TypeScript Advantages\n\nTypeScript enhances JavaScript development with:\n- Static type checking\n- Enhanced IDE support\n- Better code documentation\n- Reduced runtime errors\n\n## Performance Optimization Strategies\n\n### Code Splitting and Lazy Loading\n\n- Dynamic imports for route-based splitting\n- Component-level code splitting\n- Resource prioritization\n- Progressive loading strategies\n\n### State Management\n\n- Choosing the right state management solution\n- Optimizing re-renders\n- Memoization techniques\n- Context optimization\n\n### Bundle Optimization\n\n- Tree shaking for dead code elimination\n- Module federation for micro-frontends\n- Asset optimization and compression\n- CDN utilization\n\n## Development Best Practices\n\n1. **Component Design**: Create reusable, testable components\n2. **Testing Strategy**: Implement comprehensive testing at all levels\n3. **Performance Monitoring**: Use tools to track real user performance\n4. **Accessibility**: Ensure applications are accessible to all users\n\n## Future Trends\n\nEmerging trends in frontend development:\n- Server-side rendering (SSR) and static generation\n- Edge computing and distributed architectures\n- WebAssembly for performance-critical applications\n- Progressive Web Apps (PWAs) for mobile-first experiences\n\n## Conclusion\n\nModern web development requires a balanced approach that prioritizes both developer experience and user performance. By leveraging React, TypeScript, and proven optimization techniques, developers can build applications that are both maintainable and performant.`,
        author: "Sarah Chen",
        category: "Web Development",
        tags: ["React", "TypeScript", "Performance", "Frontend"],
        readTime: "8 min read",
        published: true,
        featured: false,
        views: 1156,
        likes: 94,
        createdAt: new Date("2025-01-06"),
        updatedAt: new Date("2025-01-06")
      }
    ];
    
    additionalPosts.forEach(post => {
      const id = this.currentBlogId++;
      const blogPost: BlogPost = {
        ...post,
        id,
      };
      this.blogPosts.set(id, blogPost);
    });
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentId++;
    const contact: Contact = {
      ...insertContact,
      id,
      createdAt: new Date(),
      company: insertContact.company || null,
      service: insertContact.service || null,
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort((a, b) => 
      new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
  }

  async getContact(id: number): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }

  // Blog Post Methods
  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogId++;
    const post: BlogPost = {
      ...insertPost,
      id,
      views: 0,
      likes: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: insertPost.tags || [],
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async getBlogPosts(params?: { category?: string; featured?: boolean; limit?: number; offset?: number }): Promise<BlogPost[]> {
    let posts = Array.from(this.blogPosts.values()).filter(post => post.published);
    
    if (params?.category && params.category !== "All Posts") {
      posts = posts.filter(post => post.category === params.category);
    }
    
    if (params?.featured !== undefined) {
      posts = posts.filter(post => post.featured === params.featured);
    }
    
    posts.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    
    const offset = params?.offset || 0;
    const limit = params?.limit || posts.length;
    
    return posts.slice(offset, offset + limit);
  }

  async getBlogPost(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  async updateBlogPost(id: number, updates: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const post = this.blogPosts.get(id);
    if (!post) return undefined;
    
    const updatedPost = { ...post, ...updates, updatedAt: new Date() };
    this.blogPosts.set(id, updatedPost);
    return updatedPost;
  }

  async incrementBlogViews(id: number): Promise<void> {
    const post = this.blogPosts.get(id);
    if (post) {
      post.views = (post.views || 0) + 1;
      this.blogPosts.set(id, post);
    }
  }

  async likeBlogPost(id: number): Promise<void> {
    const post = this.blogPosts.get(id);
    if (post) {
      post.likes = (post.likes || 0) + 1;
      this.blogPosts.set(id, post);
    }
  }

  // Blog Comment Methods
  async createBlogComment(insertComment: InsertBlogComment): Promise<BlogComment> {
    const id = this.currentCommentId++;
    const comment: BlogComment = {
      ...insertComment,
      id,
      approved: false,
      createdAt: new Date(),
    };
    this.blogComments.set(id, comment);
    return comment;
  }

  async getBlogComments(postId: number): Promise<BlogComment[]> {
    return Array.from(this.blogComments.values())
      .filter(comment => comment.postId === postId && comment.approved)
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  }

  async approveBlogComment(id: number): Promise<void> {
    const comment = this.blogComments.get(id);
    if (comment) {
      comment.approved = true;
      this.blogComments.set(id, comment);
    }
  }

  // Blog Subscriber Methods
  async createBlogSubscriber(insertSubscriber: InsertBlogSubscriber): Promise<BlogSubscriber> {
    // Check if subscriber already exists
    const existingSubscriber = Array.from(this.blogSubscribers.values())
      .find(sub => sub.email === insertSubscriber.email);
    
    if (existingSubscriber) {
      existingSubscriber.subscribed = true;
      this.blogSubscribers.set(existingSubscriber.id, existingSubscriber);
      return existingSubscriber;
    }

    const id = this.currentSubscriberId++;
    const subscriber: BlogSubscriber = {
      ...insertSubscriber,
      id,
      subscribed: true,
      createdAt: new Date(),
    };
    this.blogSubscribers.set(id, subscriber);
    return subscriber;
  }

  async getBlogSubscribers(): Promise<BlogSubscriber[]> {
    return Array.from(this.blogSubscribers.values())
      .filter(sub => sub.subscribed)
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  }

  async unsubscribeBlogSubscriber(email: string): Promise<void> {
    const subscriber = Array.from(this.blogSubscribers.values())
      .find(sub => sub.email === email);
    
    if (subscriber) {
      subscriber.subscribed = false;
      this.blogSubscribers.set(subscriber.id, subscriber);
    }
  }

  // Portfolio Project initialization
  private initializePortfolioProjects() {
    const projects = [
      {
        title: "Global E-commerce Platform Modernization",
        slug: "global-ecommerce-platform-modernization",
        client: "Fortune 500 Retail Company",
        industry: "E-commerce & Retail",
        duration: "18 months",
        team: "25 developers",
        description: "Complete modernization of legacy e-commerce platform handling 2M+ daily transactions with microservices architecture.",
        image: "/api/placeholder/600/400",
        technologies: ["React", "Node.js", "PostgreSQL", "Redis", "Docker", "AWS", "Kubernetes"],
        results: [
          "60% improvement in page load times",
          "99.9% uptime achievement",
          "40% increase in conversion rates",
          "Supported 300% traffic growth during peak season"
        ],
        challenges: "Legacy system migration, zero-downtime deployment, peak traffic handling",
        solution: "Microservices architecture with event-driven design and comprehensive monitoring",
        featured: true,
        published: true,
        views: 1250,
        likes: 89
      },
      {
        title: "Healthcare Data Analytics Platform",
        slug: "healthcare-data-analytics-platform",
        client: "Leading Healthcare Provider",
        industry: "Healthcare & Life Sciences",
        duration: "12 months",
        team: "18 data engineers",
        description: "HIPAA-compliant data analytics platform processing 500TB+ healthcare data for predictive analytics and reporting.",
        image: "/api/placeholder/600/400",
        technologies: ["Python", "Apache Spark", "MongoDB", "Tableau", "AWS", "TensorFlow"],
        results: [
          "75% faster data processing",
          "HIPAA compliance achieved",
          "Predictive models with 95% accuracy",
          "Real-time analytics for 100+ hospitals"
        ],
        challenges: "HIPAA compliance, real-time processing, data security, scalability",
        solution: "Event-driven architecture with comprehensive security and audit frameworks",
        featured: true,
        published: true,
        views: 980,
        likes: 72
      },
      {
        title: "Financial Risk Management System",
        slug: "financial-risk-management-system",
        client: "Global Investment Bank",
        industry: "Banking & Finance",
        duration: "24 months",
        team: "30 engineers",
        description: "Real-time risk assessment system processing millions of transactions with advanced fraud detection capabilities.",
        image: "/api/placeholder/600/400",
        technologies: ["Java", "Apache Kafka", "Elasticsearch", "React", "PostgreSQL", "Machine Learning"],
        results: [
          "99.7% fraud detection accuracy",
          "Sub-millisecond transaction processing",
          "50% reduction in false positives",
          "Regulatory compliance achieved"
        ],
        challenges: "Real-time processing, regulatory compliance, fraud detection accuracy",
        solution: "Event-driven architecture with comprehensive security and audit frameworks",
        featured: false,
        published: true,
        views: 756,
        likes: 54
      },
      {
        title: "Smart Manufacturing IoT Platform",
        slug: "smart-manufacturing-iot-platform",
        client: "Global Manufacturing Corporation",
        industry: "Manufacturing & Industrial",
        duration: "15 months",
        team: "22 engineers",
        description: "Industrial IoT platform for predictive maintenance and supply chain optimization across 5+ facilities.",
        image: "/api/placeholder/600/400",
        technologies: ["Node.js", "InfluxDB", "Azure IoT", "Power BI", "React", "Python"],
        results: [
          "35% reduction in equipment downtime",
          "50% improvement in supply chain efficiency",
          "Real-time monitoring of 1,000+ sensors",
          "$2M+ cost savings through predictive maintenance"
        ],
        challenges: "Industrial protocol integration, edge computing, real-time analytics at scale",
        solution: "Edge-to-cloud architecture with AI-powered predictive analytics",
        featured: true,
        published: true,
        views: 1150,
        likes: 91
      },
      {
        title: "Digital Media Streaming Platform",
        slug: "digital-media-streaming-platform",
        client: "Entertainment Media Company",
        industry: "Media & Entertainment",
        duration: "10 months",
        team: "20 developers",
        description: "High-performance video streaming platform with global CDN and personalized content delivery.",
        image: "/api/placeholder/600/400",
        technologies: ["React Native", "Node.js", "AWS CloudFront", "ElasticSearch", "Redis", "FFmpeg"],
        results: [
          "5M+ concurrent users supported",
          "99.99% streaming uptime",
          "75% improvement in content discovery",
          "Global expansion to 5+ countries"
        ],
        challenges: "Global content delivery, adaptive bitrate streaming, personalization at scale",
        solution: "Microservices with ML-powered recommendation engine and global CDN",
        featured: false,
        published: true,
        views: 890,
        likes: 63
      },
      {
        title: "Azure Hub-and-Spoke Network Automation Platform",
        slug: "azure-hub-spoke-network-automation-platform",
        client: "Aptivon Solutions",
        industry: "Cloud Infrastructure",
        duration: "8 months",
        team: "12 engineers",
        description: "Turnkey web-based network management platform that automates design, deployment, security enforcement, and monitoring of Azure hub-and-spoke architectures with policy-driven provisioning.",
        image: "/api/placeholder/600/400",
        technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Azure Functions", "ARM Templates", "Terraform", "Azure DevOps", "Azure Key Vault", "Cosmos DB", "Azure Monitor", "Grafana"],
        results: [
          "50% faster deployment of new regional networks",
          "100% policy compliance through automated audits",
          "30% cost savings by centralizing shared services"
        ],
        challenges: "Manual ARM/CLI workflows, strict compliance requirements, cost control, policy-driven provisioning",
        solution: "Self-service portal with Infrastructure as Code, centralized security orchestration, and automated compliance scanning",
        featured: true,
        published: true,
        views: 245,
        likes: 18
      }
    ];

    projects.forEach(project => {
      const portfolioProject: PortfolioProject = {
        ...project,
        id: this.currentPortfolioId++,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.portfolioProjects.set(portfolioProject.id, portfolioProject);
    });
  }

  // Portfolio Project Methods
  async createPortfolioProject(insertProject: InsertPortfolioProject): Promise<PortfolioProject> {
    const id = this.currentPortfolioId++;
    const project: PortfolioProject = {
      ...insertProject,
      id,
      image: insertProject.image || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.portfolioProjects.set(id, project);
    return project;
  }

  async getPortfolioProjects(params?: { industry?: string; featured?: boolean; limit?: number; offset?: number }): Promise<PortfolioProject[]> {
    let projects = Array.from(this.portfolioProjects.values())
      .filter(project => project.published);

    if (params?.industry && params.industry !== "All") {
      projects = projects.filter(project => project.industry === params.industry);
    }

    if (params?.featured !== undefined) {
      projects = projects.filter(project => project.featured === params.featured);
    }

    projects = projects.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());

    if (params?.offset) {
      projects = projects.slice(params.offset);
    }

    if (params?.limit) {
      projects = projects.slice(0, params.limit);
    }

    return projects;
  }

  async getPortfolioProject(slug: string): Promise<PortfolioProject | undefined> {
    return Array.from(this.portfolioProjects.values())
      .find(project => project.slug === slug && project.published);
  }

  async updatePortfolioProject(id: number, updates: Partial<InsertPortfolioProject>): Promise<PortfolioProject | undefined> {
    const project = this.portfolioProjects.get(id);
    if (project) {
      const updatedProject = { ...project, ...updates, updatedAt: new Date() };
      this.portfolioProjects.set(id, updatedProject);
      return updatedProject;
    }
    return undefined;
  }

  async incrementPortfolioViews(id: number): Promise<void> {
    const project = this.portfolioProjects.get(id);
    if (project) {
      project.views = (project.views || 0) + 1;
      this.portfolioProjects.set(id, project);
    }
  }

  async likePortfolioProject(id: number): Promise<void> {
    const project = this.portfolioProjects.get(id);
    if (project) {
      project.likes = (project.likes || 0) + 1;
      this.portfolioProjects.set(id, project);
    }
  }

  // Portfolio Inquiry Methods
  async createPortfolioInquiry(insertInquiry: InsertPortfolioInquiry): Promise<PortfolioInquiry> {
    const id = this.currentInquiryId++;
    const inquiry: PortfolioInquiry = {
      ...insertInquiry,
      id,
      company: insertInquiry.company || null,
      phone: insertInquiry.phone || null,
      projectId: insertInquiry.projectId || null,
      createdAt: new Date()
    };
    this.portfolioInquiries.set(id, inquiry);
    return inquiry;
  }

  async getPortfolioInquiries(): Promise<PortfolioInquiry[]> {
    return Array.from(this.portfolioInquiries.values())
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  }

  async getPortfolioInquiry(id: number): Promise<PortfolioInquiry | undefined> {
    return this.portfolioInquiries.get(id);
  }

  async updatePortfolioInquiry(id: number, updates: Partial<InsertPortfolioInquiry>): Promise<PortfolioInquiry | undefined> {
    const inquiry = this.portfolioInquiries.get(id);
    if (!inquiry) return undefined;
    
    const updatedInquiry = {
      ...inquiry,
      ...updates,
      updatedAt: new Date()
    };
    
    this.portfolioInquiries.set(id, updatedInquiry);
    return updatedInquiry;
  }
}

export const storage = new MemStorage();
