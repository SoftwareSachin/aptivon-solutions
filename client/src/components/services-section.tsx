import { Card, CardContent } from "@/components/ui/card";
import { Cloud, Server, Brain, Smartphone, ArrowRight } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: Cloud,
      title: "Cloud Infrastructure",
      description: "Scalable cloud solutions with enterprise-grade security, multi-region deployment, and cost optimization strategies.",
      features: ["AWS, Azure, GCP", "Infrastructure as Code", "Disaster Recovery"],
      metrics: "99.9% Uptime"
    },
    {
      icon: Server,
      title: "DevOps & Automation",
      description: "Streamlined development operations with automated CI/CD pipelines, container orchestration, and monitoring.",
      features: ["CI/CD Pipelines", "Kubernetes", "Infrastructure Automation"],
      metrics: "75% Faster Deployments"
    },
    {
      icon: Brain,
      title: "AI & Analytics",
      description: "Data-driven insights through machine learning, predictive analytics, and intelligent automation solutions.",
      features: ["Machine Learning", "Data Analytics", "Process Automation"],
      metrics: "40% Efficiency Gain"
    },
    {
      icon: Smartphone,
      title: "Application Development",
      description: "Modern web and mobile applications built with scalable architectures and user-centric design principles.",
      features: ["Web Applications", "Mobile Apps", "API Development"],
      metrics: "50% Time-to-Market"
    }
  ];

  return (
    <section id="services" className="mobile-padding-lg bg-white">
      <div className="max-w-7xl mx-auto mobile-container">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full mb-6">
            <span className="text-slate-700 font-medium text-sm">Enterprise Services</span>
          </div>
          <h2 className="mobile-text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Technology Solutions That Drive Results
          </h2>
          <p className="mobile-text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Comprehensive enterprise technology services designed to accelerate growth and optimize operations. Our expert team delivers cloud migration, AI/ML implementation, DevOps automation, and custom software development solutions that transform businesses and drive measurable results.
          </p>
          
          {/* Internal Navigation Links */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 text-sm">
            <a href="/about" className="text-blue-600 hover:text-blue-800 font-medium touch-target px-2 py-1">About Us</a>
            <span className="text-slate-300 mobile-hide">|</span>
            <a href="/services" className="text-blue-600 hover:text-blue-800 font-medium touch-target px-2 py-1">Our Services</a>
            <span className="text-slate-300 mobile-hide">|</span>
            <a href="/portfolio" className="text-blue-600 hover:text-blue-800 font-medium touch-target px-2 py-1">Portfolio</a>
            <span className="text-slate-300 mobile-hide">|</span>
            <a href="/contact" className="text-blue-600 hover:text-blue-800 font-medium touch-target px-2 py-1">Contact</a>
            <span className="text-slate-300 mobile-hide">|</span>
            <a href="/careers" className="text-blue-600 hover:text-blue-800 font-medium touch-target px-2 py-1">Careers</a>
            <span className="text-slate-300 mobile-hide">|</span>
            <a href="/blog" className="text-blue-600 hover:text-blue-800 font-medium touch-target px-2 py-1">Blog</a>
          </div>
        </div>
        
        <div className="grid mobile-grid-2 mobile-gap">
          {services.map((service, index) => (
            <Card key={service.title} className="bg-white border border-slate-200 hover:border-slate-300 transition-all duration-300 group">
              <CardContent className="mobile-card-padding">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-900 rounded-lg flex items-center justify-center">
                      <service.icon className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                      <h3 className="mobile-text-xl font-bold text-slate-900">{service.title}</h3>
                      <span className="text-xs sm:text-sm font-medium text-slate-600 bg-slate-100 px-2 sm:px-3 py-1 rounded-full self-start">
                        {service.metrics}
                      </span>
                    </div>
                    <p className="text-slate-600 mb-4 leading-relaxed text-sm sm:text-base">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-xs sm:text-sm text-slate-600">
                          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400 mr-2 flex-shrink-0" />
                          <span className="break-words">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
