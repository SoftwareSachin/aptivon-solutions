import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "wouter";
import { 
  Server, 
  Database, 
  Cloud, 
  Shield, 
  Layers, 
  Network,
  Cpu,
  Code,
  Globe,
  Zap,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Users,
  Calendar,
  ExternalLink
} from "lucide-react";

export default function Architecture() {
  const [, setLocation] = useLocation();

  const architectureExamples = [
    {
      title: "Microservices Cloud Architecture",
      category: "Cloud Infrastructure",
      icon: Cloud,
      description: "Scalable microservices architecture deployed on AWS with Kubernetes orchestration, API Gateway, and distributed databases.",
      technologies: ["AWS EKS", "Docker", "Kubernetes", "API Gateway", "PostgreSQL", "Redis", "Elasticsearch"],
      features: [
        "Auto-scaling based on demand",
        "Service mesh with Istio",
        "Centralized logging and monitoring",
        "CI/CD pipeline with GitOps",
        "Multi-region deployment"
      ],
      metrics: {
        scalability: "10,000+ concurrent users",
        availability: "99.99% uptime",
        performance: "<100ms response time"
      },
      useCase: "E-commerce platform handling millions of transactions"
    },
    {
      title: "Real-time Data Processing Pipeline",
      category: "Data Architecture",
      icon: Database,
      description: "Event-driven architecture for real-time data processing with stream processing, data lakes, and machine learning integration.",
      technologies: ["Apache Kafka", "Apache Spark", "AWS S3", "Apache Airflow", "TensorFlow", "Apache Superset"],
      features: [
        "Real-time stream processing",
        "Data lake storage architecture",
        "ML model serving pipeline",
        "Interactive data visualization",
        "Automated data quality checks"
      ],
      metrics: {
        throughput: "1M+ events/second",
        latency: "<50ms processing time",
        storage: "100TB+ data lake"
      },
      useCase: "Financial services real-time fraud detection"
    },
    {
      title: "Serverless Application Framework",
      category: "Serverless",
      icon: Zap,
      description: "Cost-effective serverless architecture using AWS Lambda, API Gateway, and managed services for optimal scalability.",
      technologies: ["AWS Lambda", "API Gateway", "DynamoDB", "S3", "CloudFront", "Cognito"],
      features: [
        "Pay-per-use pricing model",
        "Automatic scaling to zero",
        "Global CDN distribution",
        "Serverless authentication",
        "Event-driven processing"
      ],
      metrics: {
        cost: "90% cost reduction",
        scaling: "0 to 10K users instantly",
        deployment: "30-second deployments"
      },
      useCase: "SaaS application with variable traffic patterns"
    },
    {
      title: "Multi-tenant SaaS Architecture",
      category: "Enterprise",
      icon: Users,
      description: "Secure multi-tenant architecture with tenant isolation, shared resources optimization, and enterprise-grade security.",
      technologies: ["Node.js", "PostgreSQL", "Redis", "Docker", "Nginx", "Auth0"],
      features: [
        "Tenant data isolation",
        "Shared infrastructure optimization",
        "Role-based access control",
        "Custom branding per tenant",
        "Comprehensive audit logging"
      ],
      metrics: {
        tenants: "1000+ active tenants",
        isolation: "100% data separation",
        performance: "Sub-second queries"
      },
      useCase: "Enterprise SaaS platform serving multiple organizations"
    },
    {
      title: "IoT Data Collection & Analytics",
      category: "IoT",
      icon: Network,
      description: "Scalable IoT architecture for collecting, processing, and analyzing data from thousands of connected devices.",
      technologies: ["AWS IoT Core", "Apache Kafka", "InfluxDB", "Grafana", "Python", "MQTT"],
      features: [
        "Device management platform",
        "Time-series data storage",
        "Real-time analytics dashboard",
        "Predictive maintenance alerts",
        "Edge computing integration"
      ],
      metrics: {
        devices: "50K+ connected devices",
        data: "10GB+ daily ingestion",
        latency: "<5 second alerts"
      },
      useCase: "Smart manufacturing plant monitoring system"
    },
    {
      title: "High-Performance API Gateway",
      category: "API Management",
      icon: Globe,
      description: "Enterprise API gateway with rate limiting, authentication, caching, and comprehensive monitoring capabilities.",
      technologies: ["Kong", "Redis", "PostgreSQL", "Prometheus", "Grafana", "OAuth 2.0"],
      features: [
        "Advanced rate limiting",
        "Request/response transformation",
        "Circuit breaker patterns",
        "Comprehensive analytics",
        "Multi-protocol support"
      ],
      metrics: {
        throughput: "100K+ requests/second",
        latency: "<10ms overhead",
        availability: "99.99% SLA"
      },
      useCase: "Financial institution API platform"
    }
  ];

  const handleScheduleConsultation = () => {
    setLocation("/contact");
  };

  const handleViewCaseStudies = () => {
    setLocation("/case-studies");
  };

  return (
    <div className="min-h-screen bg-white pt-80">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Architecture Examples
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Explore proven architectural patterns and technical implementations that deliver 
              scalability, performance, and reliability for modern applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-slate-900 hover:bg-slate-800 text-white"
                onClick={handleScheduleConsultation}
              >
                <Calendar className="h-5 w-5 mr-2" />
                Schedule Architecture Review
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleViewCaseStudies}
              >
                View Implementation Cases
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Proven Architecture Patterns
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Battle-tested architectural solutions designed for scalability, maintainability, and performance.
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 mb-12">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="cloud">Cloud</TabsTrigger>
              <TabsTrigger value="data">Data</TabsTrigger>
              <TabsTrigger value="serverless">Serverless</TabsTrigger>
              <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
              <TabsTrigger value="iot">IoT</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {architectureExamples.map((arch, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow border-slate-200">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <arch.icon className="h-8 w-8 text-slate-700" />
                        <Badge variant="secondary" className="text-xs">
                          {arch.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{arch.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {arch.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Technologies */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-sm text-slate-900 mb-2">Technologies</h4>
                        <div className="flex flex-wrap gap-1">
                          {arch.technologies.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Key Features */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-sm text-slate-900 mb-2">Key Features</h4>
                        <ul className="space-y-1">
                          {arch.features.slice(0, 3).map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center text-xs text-slate-600">
                              <CheckCircle className="h-3 w-3 text-green-600 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Metrics */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-sm text-slate-900 mb-2">Performance Metrics</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {Object.entries(arch.metrics).map(([key, value], metricIndex) => (
                            <div key={metricIndex} className="text-xs">
                              <span className="text-slate-500 capitalize">{key}:</span>
                              <span className="text-slate-900 font-medium ml-1">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Use Case */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-sm text-slate-900 mb-1">Use Case</h4>
                        <p className="text-xs text-slate-600">{arch.useCase}</p>
                      </div>

                      <Button 
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white text-sm"
                        onClick={handleScheduleConsultation}
                      >
                        Discuss This Architecture
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Individual category tabs would filter the above content */}
            {["cloud", "data", "serverless", "enterprise", "iot", "api"].map((category) => (
              <TabsContent key={category} value={category} className="space-y-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {architectureExamples
                    .filter(arch => arch.category.toLowerCase().includes(category))
                    .map((arch, index) => (
                      <Card key={index} className="hover:shadow-lg transition-shadow border-slate-200">
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <arch.icon className="h-8 w-8 text-slate-700" />
                            <Badge variant="secondary" className="text-xs">
                              {arch.category}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg">{arch.title}</CardTitle>
                          <CardDescription className="text-sm">
                            {arch.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="mb-4">
                            <h4 className="font-semibold text-sm text-slate-900 mb-2">Technologies</h4>
                            <div className="flex flex-wrap gap-1">
                              {arch.technologies.map((tech, techIndex) => (
                                <Badge key={techIndex} variant="outline" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Button 
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white text-sm"
                            onClick={handleScheduleConsultation}
                          >
                            Discuss This Architecture
                            <ExternalLink className="ml-2 h-3 w-3" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Build Your Architecture?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how these proven architectural patterns can be adapted for your specific requirements and scale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleScheduleConsultation}
              className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 text-lg font-semibold rounded-lg"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Schedule Architecture Consultation
            </Button>
            <Button 
              variant="outline"
              onClick={handleViewCaseStudies}
              className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-slate-900 transition-all duration-300 px-8 py-4 text-lg font-semibold rounded-lg"
            >
              <TrendingUp className="h-5 w-5 mr-2" />
              View Implementation Results
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}