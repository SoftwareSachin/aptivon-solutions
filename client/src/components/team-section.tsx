import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Cpu, 
  Target, 
  Users,
  ArrowRight,
  Award,
  Briefcase,
  TrendingUp,
  Star,
  CheckCircle,
  Globe,
  Linkedin,
  Mail,
  Calendar,
  Code
} from "lucide-react";
import sachinCtoImage from "@/assets/sachin-cto.gif";

const teamMembers = [
  {
    id: 1,
    name: "Sachin",
    role: "Developer",
    title: "Technical Lead",
    avatar: "S",
    expertise: ["Full-Stack Development", "Cloud Architecture", "System Design"],
    experience: "8+ years",
    icon: Cpu,
    achievements: ["AWS Solutions Architect", "Full-Stack Development Expert", "Enterprise System Architecture"],
    background: "Experienced technology leader with expertise in building scalable web applications and cloud infrastructure. Specialized in modern web technologies and enterprise solution architecture.",
    specialization: "Full-Stack & Cloud Solutions",
    gradient: "from-blue-500 to-cyan-600",
    accentColor: "blue",
    metrics: { projects: "5+", teams: "2+", systems: "10+" }
  },
];



export default function TeamSection() {
  return (
    <section id="team" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full mb-6">
            <Users className="w-4 h-4" />
            <span className="font-medium text-sm">LEADERSHIP TEAM</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Meet Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Leadership</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Industry veterans with proven track records in delivering exceptional technology solutions 
            for enterprise clients worldwide.
          </p>
        </div>



        {/* Team grid */}
        <div className="grid grid-cols-1 gap-8 max-w-2xl mx-auto">
          {teamMembers.map((member) => {
            const IconComponent = member.icon;
            return (
              <Card 
                key={member.id} 
                className="group relative overflow-hidden border-0 bg-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-3xl"
              >
                <CardContent className="p-10">
                  {/* Profile header */}
                  <div className="text-center mb-6">
                    <div className="relative mx-auto mb-4">
                      <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white text-xl font-bold shadow-xl mx-auto overflow-hidden ring-4 ring-white`}>
                        {member.id === 1 ? (
                          <img 
                            src={sachinCtoImage} 
                            alt={`${member.name} - ${member.role}`} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          member.avatar
                        )}
                      </div>
                      <div className={`absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br ${member.gradient} rounded-2xl shadow-xl flex items-center justify-center border-2 border-white`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-semibold text-lg mb-6">
                      {member.role}
                    </p>
                  </div>

                  {/* Content */}
                  <div className="space-y-6">
                    {/* Specialization */}
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
                        <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-semibold">{member.specialization}</span>
                      </div>
                    </div>
                    
                    {/* Background */}
                    <div>
                      <p className="text-gray-600 leading-relaxed text-center text-base">
                        {member.background}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom section */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="flex -space-x-2">
              {teamMembers.map((member) => (
                <div 
                  key={member.id}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-bold border-2 border-white"
                >
                  {member.avatar}
                </div>
              ))}
            </div>
            <div className="h-4 w-px bg-gray-200"></div>
            <span className="text-gray-700 font-medium">Leading technology innovation</span>
          </div>
        </div>
      </div>
    </section>
  );
}