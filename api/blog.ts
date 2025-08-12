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
  },
  {
    id: 7,
    title: "Microservices Architecture: Design Patterns and Best Practices",
    slug: "microservices-architecture-design-patterns-best-practices",
    excerpt: "Master the art of microservices architecture with proven design patterns, implementation strategies, and operational best practices for scalable enterprise systems.",
    content: "# Microservices Architecture: Design Patterns and Best Practices\n\nMicroservices architecture has become the backbone of modern enterprise applications, enabling organizations to build scalable, maintainable, and resilient systems. This comprehensive guide explores the essential design patterns and best practices for successful microservices implementation.\n\n## Understanding Microservices Architecture\n\nMicroservices architecture is an approach to building applications as a collection of loosely coupled, independently deployable services. Each service is responsible for a specific business capability and communicates with other services through well-defined APIs.\n\n### Key Benefits\n\n**Scalability**: Individual services can be scaled independently based on demand\n**Technology Diversity**: Teams can choose the best technology stack for each service\n**Fault Isolation**: Failures in one service don't cascade to others\n**Team Autonomy**: Small teams can own and develop services independently\n\n## Essential Design Patterns\n\n### 1. API Gateway Pattern\n**Purpose**: Provides a single entry point for client requests\n**Benefits**: Handles cross-cutting concerns like authentication, logging, and rate limiting\n**Implementation**: Use tools like Kong, Zuul, or AWS API Gateway\n\n### 2. Service Discovery Pattern\n**Purpose**: Enables services to find and communicate with each other\n**Solutions**: Consul, Eureka, or Kubernetes service discovery\n**Benefits**: Dynamic service registration and health checking\n\n### 3. Circuit Breaker Pattern\n**Purpose**: Prevents cascading failures in distributed systems\n**Implementation**: Use libraries like Hystrix or implement custom circuit breakers\n**Benefits**: Improved system resilience and faster failure recovery\n\n### 4. Saga Pattern\n**Purpose**: Manages distributed transactions across multiple services\n**Types**: Choreography vs. Orchestration\n**Benefits**: Maintains data consistency without distributed transactions\n\n## Data Management Strategies\n\n### Database per Service\n**Principle**: Each microservice owns its data and database\n**Benefits**: Loose coupling and independent scaling\n**Challenges**: Data consistency and complex queries across services\n\n### Event Sourcing\n**Approach**: Store all changes as a sequence of events\n**Benefits**: Complete audit trail and ability to reconstruct state\n**Use Cases**: Financial systems and compliance-heavy applications\n\n### CQRS (Command Query Responsibility Segregation)\n**Pattern**: Separate read and write models\n**Benefits**: Optimized performance for different access patterns\n**Implementation**: Use different databases for commands and queries\n\n## Communication Patterns\n\n### Synchronous Communication\n**Methods**: REST APIs, GraphQL, gRPC\n**Use Cases**: Real-time interactions and immediate responses\n**Considerations**: Latency and availability dependencies\n\n### Asynchronous Communication\n**Methods**: Message queues, event streams, pub/sub\n**Benefits**: Better fault tolerance and decoupling\n**Technologies**: Apache Kafka, RabbitMQ, AWS SQS\n\n## Operational Excellence\n\n### Monitoring and Observability\n**Distributed Tracing**: Track requests across multiple services\n**Metrics Collection**: Monitor service performance and health\n**Log Aggregation**: Centralized logging for troubleshooting\n\n### Deployment Strategies\n**Blue-Green Deployment**: Zero-downtime deployments\n**Canary Releases**: Gradual rollout to minimize risk\n**Rolling Updates**: Sequential service updates\n\n### Security Considerations\n**Service-to-Service Authentication**: mTLS, JWT tokens\n**API Security**: Rate limiting, input validation\n**Network Security**: Service mesh, network policies\n\nMicroservices architecture offers tremendous benefits but requires careful planning and implementation. Success depends on choosing the right patterns, maintaining operational excellence, and building a culture that supports distributed development.",
    author: "Alex Johnson",
    category: "Software Architecture",
    tags: ["Microservices", "Architecture", "Design Patterns", "Scalability", "API Gateway"],
    readTime: "12 min read",
    published: true,
    featured: false,
    views: 1123,
    likes: 95,
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-01")
  },
  {
    id: 8,
    title: "Data Analytics and Business Intelligence: Driving Decision-Making",
    slug: "data-analytics-business-intelligence-decision-making",
    excerpt: "Transform your organization's decision-making process with advanced data analytics, business intelligence tools, and data-driven strategies.",
    content: "# Data Analytics and Business Intelligence: Driving Decision-Making\n\nIn today's data-driven business landscape, organizations that effectively leverage analytics and business intelligence gain significant competitive advantages. This guide explores how to build robust analytics capabilities that drive informed decision-making.\n\n## The Analytics Maturity Journey\n\n### Level 1: Descriptive Analytics\n**Focus**: What happened?\n**Tools**: Dashboards, reports, KPI tracking\n**Value**: Historical insights and performance monitoring\n\n### Level 2: Diagnostic Analytics\n**Focus**: Why did it happen?\n**Tools**: Drill-down analysis, root cause analysis\n**Value**: Understanding factors behind performance\n\n### Level 3: Predictive Analytics\n**Focus**: What is likely to happen?\n**Tools**: Machine learning, statistical modeling\n**Value**: Forecasting and risk assessment\n\n### Level 4: Prescriptive Analytics\n**Focus**: What should we do?\n**Tools**: Optimization algorithms, simulation\n**Value**: Actionable recommendations and automated decisions\n\n## Building a Data Analytics Platform\n\n### Data Infrastructure\n**Data Warehouses**: Centralized storage for structured data\n**Data Lakes**: Flexible storage for all data types\n**Data Pipelines**: Automated data ingestion and transformation\n**Real-time Processing**: Stream processing for immediate insights\n\n### Analytics Tools and Technologies\n**Self-Service BI**: Tableau, Power BI, Looker\n**Advanced Analytics**: Python, R, SAS\n**Big Data Processing**: Spark, Hadoop, Databricks\n**Cloud Platforms**: AWS, Azure, Google Cloud\n\n## Key Performance Indicators (KPIs)\n\n### Financial Metrics\n- Revenue growth and profitability\n- Cost per acquisition and lifetime value\n- Return on investment (ROI)\n\n### Operational Metrics\n- Process efficiency and cycle times\n- Quality metrics and error rates\n- Resource utilization\n\n### Customer Metrics\n- Customer satisfaction and Net Promoter Score\n- Retention and churn rates\n- Engagement and usage patterns\n\n## Data Governance and Quality\n\n### Data Governance Framework\n**Data Stewardship**: Assign ownership and accountability\n**Data Policies**: Establish standards and procedures\n**Data Lineage**: Track data flow and transformations\n\n### Data Quality Management\n**Accuracy**: Ensure data correctness\n**Completeness**: Minimize missing data\n**Consistency**: Maintain uniform data standards\n**Timeliness**: Ensure data freshness\n\n## Advanced Analytics Use Cases\n\n### Customer Analytics\n**Segmentation**: Group customers by behavior and characteristics\n**Lifetime Value**: Predict customer value over time\n**Churn Prediction**: Identify at-risk customers\n\n### Operations Analytics\n**Demand Forecasting**: Predict future resource needs\n**Supply Chain Optimization**: Optimize inventory and logistics\n**Predictive Maintenance**: Prevent equipment failures\n\n### Financial Analytics\n**Risk Management**: Assess and mitigate financial risks\n**Fraud Detection**: Identify suspicious transactions\n**Budget Planning**: Data-driven budget allocation\n\n## Implementation Best Practices\n\n### Start with Business Objectives\n**Align with Strategy**: Connect analytics to business goals\n**Define Success Metrics**: Establish clear measurement criteria\n**Prioritize Use Cases**: Focus on high-impact opportunities\n\n### Build Analytics Capabilities\n**Skill Development**: Train teams in analytics tools and techniques\n**Data Literacy**: Promote data-driven thinking across the organization\n**Center of Excellence**: Establish analytics expertise hub\n\n### Technology Considerations\n**Scalable Architecture**: Design for growth and changing requirements\n**Security and Privacy**: Protect sensitive data and ensure compliance\n**Integration**: Connect analytics tools with existing systems\n\nSuccessful data analytics and business intelligence initiatives require a combination of technology, processes, and people. Organizations that invest in building comprehensive analytics capabilities will be better positioned to make informed decisions and drive business success.",
    author: "Rachel Kim",
    category: "Data Analytics",
    tags: ["Data Analytics", "Business Intelligence", "KPIs", "Data Governance", "Machine Learning"],
    readTime: "11 min read",
    published: true,
    featured: false,
    views: 845,
    likes: 67,
    createdAt: new Date("2024-12-30"),
    updatedAt: new Date("2024-12-30")
  },
  {
    id: 9,
    title: "API Design and Management: Building Scalable Integration Ecosystems",
    slug: "api-design-management-scalable-integration-ecosystems",
    excerpt: "Master the principles of API design, implementation, and management to create robust integration ecosystems that scale with your business.",
    content: "# API Design and Management: Building Scalable Integration Ecosystems\n\nAPIs (Application Programming Interfaces) have become the backbone of modern digital ecosystems, enabling seamless integration between systems, applications, and services. This comprehensive guide covers the essential principles of API design and management.\n\n## API Design Principles\n\n### RESTful Design\n**Resource-Based**: Design around business entities\n**HTTP Methods**: Use appropriate verbs (GET, POST, PUT, DELETE)\n**Stateless**: Each request contains all necessary information\n**Uniform Interface**: Consistent interaction patterns\n\n### GraphQL Approach\n**Single Endpoint**: One URL for all operations\n**Flexible Queries**: Clients specify exactly what data they need\n**Strong Type System**: Schema-first development\n**Real-time Subscriptions**: Built-in support for live data\n\n## API Architecture Patterns\n\n### Gateway Pattern\n**Centralized Entry Point**: Single point of access for all APIs\n**Cross-cutting Concerns**: Authentication, rate limiting, monitoring\n**Service Abstraction**: Hide internal service complexity\n\n### Backend for Frontend (BFF)\n**Client-Specific APIs**: Tailored endpoints for different clients\n**Reduced Over-fetching**: Optimized data delivery\n**Independent Evolution**: Separate backend changes from frontend\n\n### Event-Driven APIs\n**Asynchronous Processing**: Non-blocking operations\n**Event Sourcing**: Capture all changes as events\n**CQRS Integration**: Separate command and query responsibilities\n\n## Security Best Practices\n\n### Authentication and Authorization\n**OAuth 2.0**: Industry-standard authorization framework\n**JWT Tokens**: Stateless authentication mechanism\n**API Keys**: Simple authentication for service-to-service calls\n**mTLS**: Mutual certificate-based authentication\n\n### Data Protection\n**HTTPS Everywhere**: Encrypt all communications\n**Input Validation**: Prevent injection attacks\n**Rate Limiting**: Protect against abuse and DDoS\n**CORS Configuration**: Control cross-origin requests\n\n## API Documentation and Developer Experience\n\n### Interactive Documentation\n**OpenAPI Specification**: Standard API description format\n**Swagger UI**: Interactive API documentation\n**Code Examples**: Multi-language implementation samples\n**Try-it-out Features**: Live API testing capabilities\n\n### Developer Onboarding\n**Getting Started Guides**: Step-by-step tutorials\n**SDK Generation**: Auto-generated client libraries\n**Sandbox Environment**: Safe testing environment\n**Developer Portal**: Centralized developer resources\n\n## API Lifecycle Management\n\n### Design Phase\n**API-First Approach**: Design APIs before implementation\n**Stakeholder Collaboration**: Involve consumers in design\n**Mock Services**: Create prototypes for early testing\n**Design Reviews**: Peer review and validation\n\n### Development Phase\n**Code Generation**: Auto-generate server stubs and client SDKs\n**Testing Strategy**: Unit, integration, and contract testing\n**Continuous Integration**: Automated testing and deployment\n**Version Control**: Track API changes and evolution\n\n### Deployment and Operations\n**Blue-Green Deployment**: Zero-downtime deployments\n**Canary Releases**: Gradual rollout of new versions\n**Monitoring and Alerting**: Real-time performance tracking\n**Analytics**: Usage patterns and performance metrics\n\n## Versioning Strategies\n\n### URL Versioning\n**Path-based**: `/v1/users`, `/v2/users`\n**Subdomain**: `v1.api.example.com`, `v2.api.example.com`\n**Query Parameter**: `/users?version=1`\n\n### Header Versioning\n**Accept Header**: `Accept: application/vnd.api+json;version=1`\n**Custom Header**: `API-Version: 1`\n**Content-Type**: `Content-Type: application/vnd.api.v1+json`\n\n## Performance Optimization\n\n### Caching Strategies\n**Response Caching**: Cache API responses at various levels\n**CDN Integration**: Global content distribution\n**ETags**: Conditional requests for unchanged resources\n**Cache-Control Headers**: Fine-grained caching policies\n\n### Pagination and Filtering\n**Offset-based**: Simple page-based pagination\n**Cursor-based**: Efficient pagination for large datasets\n**Filtering**: Allow clients to specify data subsets\n**Sorting**: Flexible result ordering\n\n## Monitoring and Analytics\n\n### Key Metrics\n**Response Time**: API performance measurement\n**Throughput**: Requests per second\n**Error Rates**: 4xx and 5xx error percentages\n**Availability**: Uptime and reliability metrics\n\n### Advanced Analytics\n**Usage Patterns**: Popular endpoints and methods\n**Client Analysis**: Consumer behavior insights\n**Geographic Distribution**: Request origin analysis\n**Trend Analysis**: Growth and adoption patterns\n\n## API Governance\n\n### Standards and Guidelines\n**Naming Conventions**: Consistent resource and field naming\n**Error Handling**: Standardized error response formats\n**Data Formats**: JSON, XML, or binary format standards\n**Security Policies**: Organization-wide security requirements\n\n### Quality Assurance\n**API Reviews**: Peer review processes\n**Compliance Checking**: Automated standard validation\n**Performance Testing**: Load and stress testing\n**Security Scanning**: Vulnerability assessment\n\nBuilding scalable API ecosystems requires careful planning, robust design principles, and ongoing management. Organizations that invest in comprehensive API strategies will create more flexible, maintainable, and scalable integration architectures.",
    author: "James Rodriguez",
    category: "API Development",
    tags: ["API Design", "REST", "GraphQL", "API Security", "Integration"],
    readTime: "13 min read",
    published: true,
    featured: false,
    views: 982,
    likes: 76,
    createdAt: new Date("2024-12-28"),
    updatedAt: new Date("2024-12-28")
  },
  {
    id: 10,
    title: "Machine Learning Operations (MLOps): Productionizing AI Systems",
    slug: "machine-learning-operations-mlops-productionizing-ai",
    excerpt: "Learn how to successfully deploy, monitor, and maintain machine learning models in production environments with proven MLOps practices.",
    content: "# Machine Learning Operations (MLOps): Productionizing AI Systems\n\nMLOps bridges the gap between machine learning research and production deployment, enabling organizations to reliably deliver AI-powered solutions at scale. This guide covers the essential practices for successful ML model deployment and operations.\n\n## Understanding MLOps\n\nMLOps combines machine learning, software engineering, and DevOps practices to automate and streamline the ML lifecycle. It addresses the unique challenges of deploying and maintaining AI systems in production environments.\n\n### Key Challenges in ML Production\n**Model Drift**: Performance degradation over time\n**Data Quality**: Ensuring consistent input data\n**Scalability**: Handling varying loads and requirements\n**Reproducibility**: Consistent results across environments\n**Monitoring**: Tracking model performance and behavior\n\n## MLOps Lifecycle\n\n### 1. Data Engineering\n**Data Collection**: Automated data ingestion pipelines\n**Data Validation**: Quality checks and schema validation\n**Feature Engineering**: Scalable feature computation\n**Data Versioning**: Track data changes and lineage\n\n### 2. Model Development\n**Experiment Tracking**: Log experiments and results\n**Model Versioning**: Version control for models\n**Hyperparameter Tuning**: Automated optimization\n**Model Selection**: Automated model comparison\n\n### 3. Model Deployment\n**Containerization**: Package models with dependencies\n**Serving Infrastructure**: Scalable model serving\n**A/B Testing**: Compare model performance\n**Gradual Rollout**: Safe deployment strategies\n\n### 4. Model Monitoring\n**Performance Monitoring**: Track accuracy and latency\n**Data Drift Detection**: Monitor input data changes\n**Model Drift Detection**: Identify performance degradation\n**Alerting**: Automated issue detection and notification\n\n## Infrastructure and Tools\n\n### Model Serving Platforms\n**TensorFlow Serving**: High-performance serving system\n**MLflow**: End-to-end ML lifecycle management\n**Kubeflow**: Kubernetes-native ML workflows\n**Seldon Core**: Cloud-native model deployment\n\n### Experiment Tracking\n**Weights & Biases**: Experiment tracking and visualization\n**Neptune**: ML metadata store\n**MLflow Tracking**: Open-source experiment management\n**TensorBoard**: TensorFlow visualization toolkit\n\n### Data Management\n**DVC**: Data version control\n**Feast**: Feature store for ML\n**Great Expectations**: Data validation framework\n**Apache Airflow**: Workflow orchestration\n\n## Deployment Strategies\n\n### Batch Inference\n**Use Cases**: Periodic predictions, large-scale processing\n**Benefits**: High throughput, cost-effective\n**Implementation**: Scheduled jobs, data pipelines\n\n### Real-time Inference\n**Use Cases**: Interactive applications, immediate responses\n**Requirements**: Low latency, high availability\n**Technologies**: REST APIs, gRPC, message queues\n\n### Edge Deployment\n**Benefits**: Reduced latency, privacy preservation\n**Challenges**: Resource constraints, model optimization\n**Tools**: TensorFlow Lite, ONNX Runtime, Edge TPU\n\n## Model Monitoring and Maintenance\n\n### Performance Metrics\n**Accuracy Metrics**: Precision, recall, F1-score\n**Business Metrics**: Revenue impact, user satisfaction\n**System Metrics**: Latency, throughput, resource usage\n**Data Quality Metrics**: Completeness, consistency, validity\n\n### Drift Detection\n**Statistical Tests**: Chi-square, Kolmogorov-Smirnov\n**Distance Metrics**: Wasserstein distance, KL divergence\n**Machine Learning Approaches**: Autoencoder-based detection\n**Business Rule Monitoring**: Custom business logic validation\n\n### Automated Retraining\n**Trigger Conditions**: Performance thresholds, data drift\n**Retraining Pipelines**: Automated model updates\n**Validation Gates**: Quality checks before deployment\n**Rollback Mechanisms**: Safe fallback to previous versions\n\n## Security and Compliance\n\n### Model Security\n**Adversarial Attacks**: Robust model design\n**Data Privacy**: Differential privacy, federated learning\n**Access Control**: Role-based permissions\n**Audit Trails**: Complete operation logging\n\n### Regulatory Compliance\n**Model Explainability**: Interpretable AI techniques\n**Bias Detection**: Fairness assessment and mitigation\n**Documentation**: Comprehensive model documentation\n**Governance**: Model approval workflows\n\n## Best Practices\n\n### Start Simple\n**MVP Approach**: Begin with basic deployment\n**Incremental Complexity**: Gradually add advanced features\n**Baseline Establishment**: Set performance benchmarks\n\n### Automation First\n**CI/CD Pipelines**: Automated testing and deployment\n**Infrastructure as Code**: Reproducible environments\n**Monitoring Automation**: Self-healing systems\n\n### Team Collaboration\n**Cross-functional Teams**: Data scientists, engineers, operations\n**Shared Responsibility**: Collective ownership of ML systems\n**Knowledge Sharing**: Documentation and training\n\n### Continuous Improvement\n**Feedback Loops**: Learn from production performance\n**Experimentation**: A/B testing and gradual rollouts\n**Iteration**: Regular model updates and improvements\n\nMLOps is essential for organizations serious about deploying machine learning at scale. By implementing robust MLOps practices, teams can ensure their AI systems are reliable, maintainable, and deliver consistent business value.",
    author: "Dr. Priya Patel",
    category: "Machine Learning",
    tags: ["MLOps", "Machine Learning", "AI Operations", "Model Deployment", "Data Science"],
    readTime: "14 min read",
    published: true,
    featured: false,
    views: 756,
    likes: 89,
    createdAt: new Date("2024-12-25"),
    updatedAt: new Date("2024-12-25")
  },
  {
    id: 11,
    title: "Enterprise Software Testing: Quality Assurance Strategies",
    slug: "enterprise-software-testing-quality-assurance-strategies",
    excerpt: "Comprehensive guide to building robust testing strategies for enterprise software, covering automated testing, quality metrics, and continuous quality practices.",
    content: "# Enterprise Software Testing: Quality Assurance Strategies\n\nQuality assurance is critical for enterprise software success, where failures can have significant business impact. This guide covers comprehensive testing strategies that ensure software reliability, performance, and user satisfaction.\n\n## Testing Strategy Framework\n\n### Test Pyramid\n**Unit Tests (70%)**: Fast, isolated component testing\n**Integration Tests (20%)**: Service and API testing\n**End-to-End Tests (10%)**: Complete user journey validation\n\n### Risk-Based Testing\n**High-Risk Areas**: Critical business functions\n**Medium-Risk Areas**: Important but non-critical features\n**Low-Risk Areas**: Nice-to-have functionality\n\n## Types of Enterprise Testing\n\n### Functional Testing\n**Unit Testing**: Individual component validation\n**Integration Testing**: Module interaction testing\n**System Testing**: Complete system validation\n**User Acceptance Testing**: Business requirement verification\n\n### Non-Functional Testing\n**Performance Testing**: Load, stress, and volume testing\n**Security Testing**: Vulnerability and penetration testing\n**Usability Testing**: User experience validation\n**Compatibility Testing**: Cross-platform and browser testing\n\n### Specialized Testing\n**API Testing**: Service interface validation\n**Database Testing**: Data integrity and performance\n**Mobile Testing**: Mobile application validation\n**Accessibility Testing**: WCAG compliance verification\n\n## Automated Testing Implementation\n\n### Test Automation Strategy\n**Test Selection**: Identify automation candidates\n**Tool Selection**: Choose appropriate testing tools\n**Framework Design**: Scalable automation architecture\n**Maintenance Plan**: Ongoing test maintenance strategy\n\n### Testing Tools and Frameworks\n**Unit Testing**: JUnit, NUnit, pytest, Jest\n**UI Testing**: Selenium, Cypress, Playwright\n**API Testing**: Postman, RestAssured, Insomnia\n**Performance Testing**: JMeter, LoadRunner, K6\n\n### Continuous Integration Testing\n**Pipeline Integration**: Tests in CI/CD workflows\n**Parallel Execution**: Faster feedback through parallelization\n**Test Reporting**: Comprehensive result analysis\n**Quality Gates**: Automated deployment decisions\n\n## Performance Testing\n\n### Load Testing\n**Objective**: Verify system behavior under expected load\n**Metrics**: Response time, throughput, resource utilization\n**Scenarios**: Normal business operations simulation\n\n### Stress Testing\n**Objective**: Determine system breaking points\n**Approach**: Gradually increase load beyond normal capacity\n**Analysis**: System behavior under extreme conditions\n\n### Volume Testing\n**Objective**: Test with large amounts of data\n**Scenarios**: Database performance, memory usage\n**Validation**: System stability with production-like data volumes\n\n## Security Testing\n\n### Static Application Security Testing (SAST)\n**Code Analysis**: Source code vulnerability scanning\n**Tools**: SonarQube, Checkmarx, Veracode\n**Integration**: IDE and CI/CD pipeline integration\n\n### Dynamic Application Security Testing (DAST)\n**Runtime Testing**: Running application security testing\n**Tools**: OWASP ZAP, Burp Suite, Acunetix\n**Coverage**: Web application security assessment\n\n### Penetration Testing\n**External Testing**: Simulated external attacks\n**Internal Testing**: Insider threat simulation\n**Compliance**: Regulatory requirement fulfillment\n\n## Test Data Management\n\n### Test Data Strategy\n**Data Classification**: Sensitive vs. non-sensitive data\n**Data Masking**: Privacy protection in test environments\n**Data Generation**: Synthetic test data creation\n**Data Refresh**: Regular test data updates\n\n### Data Privacy Compliance\n**GDPR Compliance**: European data protection requirements\n**CCPA Compliance**: California privacy regulations\n**Data Anonymization**: Remove personally identifiable information\n**Access Controls**: Restrict test data access\n\n## Quality Metrics and Reporting\n\n### Testing Metrics\n**Test Coverage**: Code and requirement coverage\n**Defect Density**: Bugs per unit of code\n**Test Execution**: Pass/fail rates and trends\n**Defect Escape Rate**: Production issues from testing gaps\n\n### Quality Dashboards\n**Real-time Monitoring**: Live quality metrics\n**Trend Analysis**: Quality improvements over time\n**Risk Assessment**: Quality-based risk indicators\n**Stakeholder Reporting**: Executive quality summaries\n\n## Defect Management\n\n### Defect Lifecycle\n**Discovery**: Bug identification and logging\n**Triage**: Severity and priority assessment\n**Assignment**: Developer allocation and tracking\n**Resolution**: Fix implementation and verification\n**Closure**: Final validation and documentation\n\n### Root Cause Analysis\n**Pattern Identification**: Common defect sources\n**Process Improvement**: Prevention-focused changes\n**Training Needs**: Skill gap identification\n**Tool Enhancement**: Technology solution improvements\n\n## Quality Culture and Practices\n\n### Shift-Left Testing\n**Early Testing**: Requirements and design phase testing\n**Developer Testing**: Enhanced unit testing practices\n**Continuous Feedback**: Rapid issue identification\n**Collaboration**: Cross-functional quality ownership\n\n### Quality Engineering\n**Embedded Quality**: Quality built into development\n**Automation Focus**: Efficiency through automation\n**Continuous Learning**: Skill development and innovation\n**Risk Management**: Proactive quality risk mitigation\n\n## Compliance and Standards\n\n### Industry Standards\n**ISO 25010**: Software quality characteristics\n**IEEE 829**: Software test documentation\n**ISTQB**: Testing certification standards\n**Agile Testing**: Agile-specific quality practices\n\n### Regulatory Compliance\n**SOX Compliance**: Financial reporting controls\n**HIPAA Compliance**: Healthcare data protection\n**PCI DSS**: Payment card security standards\n**FDA Validation**: Medical device software requirements\n\nEffective enterprise software testing requires a comprehensive strategy that combines automated testing, robust processes, and a quality-focused culture. Organizations that invest in systematic quality assurance practices deliver more reliable software and achieve better business outcomes.",
    author: "Mark Thompson",
    category: "Software Testing",
    tags: ["Software Testing", "Quality Assurance", "Test Automation", "Performance Testing", "Security Testing"],
    readTime: "15 min read",
    published: true,
    featured: false,
    views: 634,
    likes: 52,
    createdAt: new Date("2024-12-22"),
    updatedAt: new Date("2024-12-22")
  },
  {
    id: 12,
    title: "Edge Computing: Bringing Processing Closer to Data Sources",
    slug: "edge-computing-processing-closer-data-sources",
    excerpt: "Explore the transformative potential of edge computing for reducing latency, improving performance, and enabling new applications in distributed environments.",
    content: "# Edge Computing: Bringing Processing Closer to Data Sources\n\nEdge computing represents a paradigm shift in how we process and analyze data, moving computation from centralized cloud data centers to locations closer to where data is generated. This approach addresses the growing need for real-time processing, reduced latency, and improved bandwidth efficiency.\n\n## Understanding Edge Computing\n\nEdge computing extends cloud computing capabilities to the edge of the network, processing data near its source rather than in distant data centers. This distributed computing model enables faster response times, reduced bandwidth usage, and improved user experiences.\n\n### Key Drivers\n**Latency Requirements**: Real-time applications need immediate responses\n**Bandwidth Limitations**: Reducing data transmission costs and constraints\n**Privacy Concerns**: Processing sensitive data locally\n**Reliability Needs**: Reducing dependence on network connectivity\n\n## Edge Computing Architecture\n\n### Edge Devices\n**IoT Sensors**: Data collection endpoints\n**Smart Cameras**: Video processing and analysis\n**Industrial Controllers**: Manufacturing and automation systems\n**Mobile Devices**: Smartphones and tablets with edge capabilities\n\n### Edge Infrastructure\n**Edge Servers**: Local processing and storage capacity\n**Micro Data Centers**: Containerized computing resources\n**CDN Extensions**: Content delivery with compute capabilities\n**5G Base Stations**: Network infrastructure with processing power\n\n### Cloud Integration\n**Hybrid Architecture**: Seamless cloud and edge integration\n**Data Synchronization**: Consistent data across environments\n**Centralized Management**: Unified control and monitoring\n**Workload Orchestration**: Dynamic task distribution\n\n## Use Cases and Applications\n\n### Autonomous Vehicles\n**Real-time Decision Making**: Split-second navigation decisions\n**Sensor Fusion**: Processing multiple data streams simultaneously\n**Safety Systems**: Immediate response to hazardous conditions\n**Traffic Optimization**: Local traffic pattern analysis\n\n### Industrial IoT\n**Predictive Maintenance**: Equipment failure prediction\n**Quality Control**: Real-time manufacturing inspection\n**Process Optimization**: Dynamic production adjustments\n**Safety Monitoring**: Immediate hazard detection\n\n### Smart Cities\n**Traffic Management**: Real-time traffic flow optimization\n**Environmental Monitoring**: Air quality and pollution tracking\n**Public Safety**: Video surveillance and incident detection\n**Energy Management**: Smart grid optimization\n\n### Healthcare\n**Remote Patient Monitoring**: Continuous health tracking\n**Medical Imaging**: Real-time diagnostic processing\n**Emergency Response**: Immediate medical alert processing\n**Telemedicine**: Low-latency video consultations\n\n## Technical Considerations\n\n### Processing Capabilities\n**CPU Performance**: Sufficient processing power for local tasks\n**GPU Acceleration**: Machine learning and video processing\n**Memory Requirements**: Adequate RAM for data processing\n**Storage Capacity**: Local data storage and caching\n\n### Connectivity Options\n**5G Networks**: High-speed, low-latency connectivity\n**Wi-Fi 6**: Enhanced wireless performance\n**Fiber Connections**: High-bandwidth wired connectivity\n**Satellite Links**: Remote location connectivity\n\n### Power Management\n**Energy Efficiency**: Optimized power consumption\n**Battery Backup**: Uninterrupted operation during outages\n**Solar Power**: Renewable energy for remote locations\n**Power Optimization**: Dynamic power scaling\n\n## Edge Computing Platforms\n\n### Commercial Platforms\n**AWS IoT Greengrass**: Amazon's edge computing platform\n**Azure IoT Edge**: Microsoft's edge solution\n**Google Cloud IoT Edge**: Google's distributed computing platform\n**IBM Edge Application Manager**: Enterprise edge management\n\n### Open Source Solutions\n**KubeEdge**: Kubernetes-based edge computing\n**OpenFaaS**: Functions-as-a-Service for edge\n**Apache EdgeX Foundry**: IoT edge platform\n**LF Edge**: Linux Foundation edge projects\n\n## Security and Privacy\n\n### Edge Security Challenges\n**Physical Security**: Protecting edge devices from tampering\n**Network Security**: Securing distributed communications\n**Data Protection**: Safeguarding sensitive information\n**Device Management**: Secure device provisioning and updates\n\n### Privacy Benefits\n**Data Localization**: Processing sensitive data locally\n**Reduced Data Transfer**: Minimizing data exposure\n**Compliance**: Meeting regional data regulations\n**User Control**: Enhanced privacy controls\n\n## Implementation Strategies\n\n### Assessment Phase\n**Use Case Identification**: Determine edge computing candidates\n**Cost-Benefit Analysis**: Evaluate economic viability\n**Technical Requirements**: Define performance and capacity needs\n**Risk Assessment**: Identify potential challenges\n\n### Pilot Implementation\n**Proof of Concept**: Small-scale validation\n**Performance Testing**: Latency and throughput measurement\n**Integration Testing**: Compatibility with existing systems\n**User Acceptance**: Stakeholder validation\n\n### Scale-Out Phase\n**Infrastructure Deployment**: Edge device installation\n**Application Migration**: Moving workloads to edge\n**Monitoring Setup**: Performance and health monitoring\n**Support Processes**: Maintenance and troubleshooting\n\n## Future Trends\n\n### Technology Evolution\n**AI at the Edge**: Machine learning inference on edge devices\n**Quantum Edge**: Quantum computing capabilities at the edge\n**Neuromorphic Computing**: Brain-inspired edge processors\n**Optical Computing**: Light-based edge processing\n\n### Market Developments\n**Edge-as-a-Service**: Managed edge computing offerings\n**Industry Specialization**: Vertical-specific edge solutions\n**Standards Development**: Interoperability standards\n**Ecosystem Growth**: Expanding partner networks\n\nEdge computing is transforming how organizations process and analyze data, enabling new applications and improving existing ones. As technology continues to evolve, edge computing will play an increasingly important role in delivering responsive, efficient, and privacy-preserving computing solutions.",
    author: "Dr. Elena Vasquez",
    category: "Edge Computing",
    tags: ["Edge Computing", "IoT", "Real-time Processing", "Distributed Systems", "5G"],
    readTime: "12 min read",
    published: true,
    featured: false,
    views: 523,
    likes: 44,
    createdAt: new Date("2024-12-20"),
    updatedAt: new Date("2024-12-20")
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
  // Add CORS headers for production
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

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
      const posts = getStaticBlogPosts();
      console.log('Returning posts:', posts.length);
      return res.status(200).json(posts);
    
    case 'post':
      if (!slug) {
        return res.status(400).json({ error: 'Slug is required' });
      }
      const post = getStaticBlogPostBySlug(slug as string);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      return res.status(200).json(post);
    
    case 'comments':
      if (!postId) {
        return res.status(400).json({ error: 'Post ID is required' });
      }
      const comments = blogComments.filter(c => c.postId === parseInt(postId as string));
      return res.status(200).json(comments);
    
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