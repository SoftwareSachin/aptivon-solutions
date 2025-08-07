import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap, Phone, Mail, CheckCircle, Clock, Trophy, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SKITStudentsAdProps {
  isVisible?: boolean;
}

export default function SKITStudentsAd({ isVisible = true }: SKITStudentsAdProps) {
  const { toast } = useToast();

  if (!isVisible) return null;

  const handleContactClick = () => {
    window.open(`mailto:singhal3.sachin7@gmail.com?subject=SKIT Student Special Discount - Academic Projects&body=Hello Aptivon Solutions,%0D%0A%0D%0AI am a SKIT student and would like to avail the special discount on academic projects.%0D%0A%0D%0AStudent Details:%0D%0AName: ________________%0D%0ACollege ID: ________________%0D%0ABranch: ________________%0D%0ASemester: ________________%0D%0APhone: ________________%0D%0A%0D%0AProject Requirements:%0D%0AProject Type: ________________%0D%0ADomain: ________________%0D%0ATitle: ________________%0D%0ADeadline: ________________%0D%0A%0D%0APlease confirm the special SKIT student pricing and provide project timeline.%0D%0A%0D%0AThank you!`, '_blank');
    
    toast({
      title: "SKIT Student Discount Email",
      description: "Email opened with special SKIT student discount inquiry",
    });
  };

  const handleCallClick = () => {
    if (navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile/i)) {
      window.location.href = "tel:+917852099010";
    } else {
      window.open("tel:+917852099010", '_blank');
    }
    
    toast({
      title: "Calling for SKIT Student Discount",
      description: "Connecting you for special SKIT student pricing",
    });
  };

  return (
    <section className="mobile-padding bg-gradient-to-r from-emerald-50 to-blue-50 safe-area-padding overflow-hidden">
      <div className="max-w-6xl mx-auto mobile-container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-emerald-100 rounded-full mb-3 sm:mb-4 flex-wrap justify-center">
            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
            <span className="text-emerald-800 font-semibold text-sm sm:text-base text-center">SKIT STUDENTS EXCLUSIVE</span>
          </div>
          
          <h2 className="mobile-text-4xl font-bold text-gray-900 mb-4 leading-tight px-2">
            Special SKIT Student Discount
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Exclusive 7.5% discount on all academic projects for SKIT College students
          </p>
        </div>

        <Card className="max-w-4xl mx-auto mobile-card-padding shadow-lg">
          <div className="grid md:grid-cols-2 mobile-gap">
            {/* Left side - Discount & Pricing */}
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white p-6 rounded-xl text-center">
                <div className="text-5xl font-bold mb-2">7.5%</div>
                <div className="text-xl font-semibold">SPECIAL DISCOUNT</div>
                <div className="text-emerald-100 text-sm mt-2">For SKIT College Students</div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-gray-900">Final Year/Minor/Major</div>
                    <div className="text-sm text-gray-600">Complete project with documentation</div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-500 text-sm line-through">₹2,500</div>
                    <div className="text-2xl font-bold text-emerald-600">₹2,313</div>
                    <div className="text-xs text-emerald-600 bg-emerald-100 px-2 py-1 rounded">Save ₹187</div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-gray-900">PPT Only</div>
                    <div className="text-sm text-gray-600">Professional presentation design</div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-500 text-sm line-through">₹500</div>
                    <div className="text-2xl font-bold text-blue-600">₹463</div>
                    <div className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">Save ₹37</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Benefits & Contact */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">SKIT Student Benefits</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-gray-700">7.5% exclusive discount</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-700">Fast delivery within deadline</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span className="text-gray-700">High-quality academic projects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-500" />
                    <span className="text-gray-700">Free consultation & support</span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="text-sm text-yellow-800 font-medium mb-2">Requirements:</div>
                <div className="text-sm text-yellow-700">Valid SKIT Student ID required for verification</div>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={handleContactClick}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Get SKIT Student Discount
                </Button>
                
                <Button 
                  onClick={handleCallClick}
                  variant="outline"
                  className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call for Instant Quote
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}