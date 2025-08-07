import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white ">
      <Navigation />
      {/* Navigation Spacer */}
      <div className="h-48"></div>
      
      <div className="pt-32 pb-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center mb-8">
              <AlertCircle className="h-16 w-16 text-slate-400" />
            </div>
            
            <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
            <h2 className="text-2xl font-bold text-slate-700 mb-4">Page Not Found</h2>
            <p className="text-lg text-slate-600 mb-8 max-w-md">
              The page you're looking for doesn't exist or has been moved.
            </p>
            
            <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white">
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
