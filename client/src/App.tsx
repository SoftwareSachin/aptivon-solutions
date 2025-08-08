import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Suspense, lazy, useEffect } from "react";
import { initGA } from "../lib/analytics";
import { useAnalytics } from "../hooks/use-analytics";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import TetrisLoading from "@/components/tetris-loader";
import CookieBanner from "@/components/cookie-banner";

// Lazy load pages to reduce initial bundle size
const About = lazy(() => import("@/pages/about"));
const Services = lazy(() => import("@/pages/services"));
const Solutions = lazy(() => import("@/pages/solutions"));
const Industries = lazy(() => import("@/pages/industries"));
const CaseStudies = lazy(() => import("@/pages/case-studies"));
const Resources = lazy(() => import("@/pages/resources"));
const Support = lazy(() => import("@/pages/support"));
const Portfolio = lazy(() => import("@/pages/portfolio"));
const PortfolioProject = lazy(() => import("@/pages/portfolio-project"));
const Careers = lazy(() => import("@/pages/careers"));
const Blog = lazy(() => import("@/pages/blog"));
const BlogPost = lazy(() => import("@/pages/blog-post"));
const Contact = lazy(() => import("@/pages/contact"));
const Architecture = lazy(() => import("@/pages/architecture"));
const PortfolioDownload = lazy(() => import("@/pages/portfolio-download"));
const CollegeProjects = lazy(() => import("@/pages/college-projects"));

// Legal pages
const PrivacyPolicy = lazy(() => import("@/pages/privacy-policy"));
const TermsOfService = lazy(() => import("@/pages/terms-of-service"));
const CookiePolicy = lazy(() => import("@/pages/cookie-policy"));
const Security = lazy(() => import("@/pages/security"));

// Loading component
function Loading() {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <TetrisLoading 
          size="md"
          speed="normal"
          showLoadingText={true}
          loadingText="Loading page..."
        />
      </div>
    </div>
  );
}

function Router() {
  // Track page views when routes change
  useAnalytics();
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about">
        <Suspense fallback={<Loading />}>
          <About />
        </Suspense>
      </Route>
      <Route path="/services">
        <Suspense fallback={<Loading />}>
          <Services />
        </Suspense>
      </Route>
      <Route path="/solutions">
        <Suspense fallback={<Loading />}>
          <Solutions />
        </Suspense>
      </Route>
      <Route path="/industries">
        <Suspense fallback={<Loading />}>
          <Industries />
        </Suspense>
      </Route>
      <Route path="/case-studies">
        <Suspense fallback={<Loading />}>
          <CaseStudies />
        </Suspense>
      </Route>
      <Route path="/resources">
        <Suspense fallback={<Loading />}>
          <Resources />
        </Suspense>
      </Route>
      <Route path="/support">
        <Suspense fallback={<Loading />}>
          <Support />
        </Suspense>
      </Route>
      <Route path="/portfolio">
        <Suspense fallback={<Loading />}>
          <Portfolio />
        </Suspense>
      </Route>
      <Route path="/portfolio-project/:slug">
        <Suspense fallback={<Loading />}>
          <PortfolioProject />
        </Suspense>
      </Route>
      <Route path="/careers">
        <Suspense fallback={<Loading />}>
          <Careers />
        </Suspense>
      </Route>
      <Route path="/blog">
        <Suspense fallback={<Loading />}>
          <Blog />
        </Suspense>
      </Route>
      <Route path="/blog/:slug">
        <Suspense fallback={<Loading />}>
          <BlogPost />
        </Suspense>
      </Route>
      <Route path="/contact">
        <Suspense fallback={<Loading />}>
          <Contact />
        </Suspense>
      </Route>
      <Route path="/architecture">
        <Suspense fallback={<Loading />}>
          <Architecture />
        </Suspense>
      </Route>
      <Route path="/portfolio-download">
        <Suspense fallback={<Loading />}>
          <PortfolioDownload />
        </Suspense>
      </Route>
      <Route path="/college-projects">
        <Suspense fallback={<Loading />}>
          <CollegeProjects />
        </Suspense>
      </Route>
      <Route path="/privacy-policy">
        <Suspense fallback={<Loading />}>
          <PrivacyPolicy />
        </Suspense>
      </Route>
      <Route path="/terms-of-service">
        <Suspense fallback={<Loading />}>
          <TermsOfService />
        </Suspense>
      </Route>
      <Route path="/cookie-policy">
        <Suspense fallback={<Loading />}>
          <CookiePolicy />
        </Suspense>
      </Route>
      <Route path="/security">
        <Suspense fallback={<Loading />}>
          <Security />
        </Suspense>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Initialize Google Analytics when app loads
  useEffect(() => {
    // Verify required environment variable is present
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
      console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');
    } else {
      initGA();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <CookieBanner />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
