# Aptivon Solutions - Company Website

## Overview

This is a modern, responsive company website for Aptivon Solutions Pvt. Ltd., an IT services and consulting firm. The application is built as a full-stack web application, featuring a contact form system and comprehensive information about the company's services, solutions, industries, and resources. The business vision is to provide enterprise-grade IT services, achieve top search engine rankings, and ensure AI accessibility.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing
- **Animations**: Framer Motion for smooth animations and transitions (selectively used for performance)
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and production builds
- **UI/UX Decisions**: Professional monochrome design, glassmorphism effects, enhanced typography, consistent branding with company logo, removal of heavy animations and excessive blur for performance. Focus on clean, modern layouts with improved contrast and readability.

### Backend Architecture
- **Runtime**: Vercel Serverless Functions (@vercel/node)
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Routes**: Serverless functions in `/api` folder for contact forms, job applications, blog, services, and other dynamic content.
- **Data Handling**: Primarily uses static data for projects (college and portfolio), blog posts, and resources for Vercel deployment optimization. Dynamic data for contact and job applications.
- **Server**: Express.js for local development.

### Feature Specifications
- **Contact Form System**: Validated forms, data submission to backend, toast notifications.
- **Portfolio System**: Advanced portfolio download system generating comprehensive HTML documents with case studies, technical breakdowns, and statistics. Categorization of college vs. general projects.
- **Blog System**: Comprehensive blog with posts, comments, subscriptions, search, filtering, and like functionality.
- **Careers Page**: Fresher-friendly job listings with application forms and email notifications.
- **Legal Pages**: Comprehensive Privacy Policy, Terms of Service, Cookie Policy, and Security pages.
- **Service Pages**: Detailed service offerings with inquiry forms and consultation scheduling. Pricing information is removed.
- **About Page**: Company profile, real-time metrics (scaled to realistic startup figures), recruitment, partnership, and investment inquiry modals.
- **Resources Page**: Authentic industry whitepapers, webinars, and case studies with download/registration forms.
- **SEO Optimization**: Extensive HTML meta tags, structured data (JSON-LD), robots.txt, sitemap.xml, Open Graph/Twitter Card meta tags, and performance optimizations (Core Web Vitals). Aim for top Google rankings and AI accessibility.
- **Branding**: Consistent use of animated company logo across navigation, footer, and promotional elements. Professional icon usage (Lucide React icons).
- **Security**: Robust security practices, email obfuscation, and compliance with industry standards.
- **Dynamic Content**: Promotional ad sections with configurable offers (e.g., discounts, referral programs).

## External Dependencies

### Frontend Dependencies
- **UI Components**: Radix UI primitives with shadcn/ui
- **Icons**: Lucide React icon library
- **Animations**: Framer Motion
- **HTTP Client**: Native fetch API with TanStack Query
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: Wouter

### Backend Dependencies
- **Database**: Neon Database (serverless PostgreSQL)
- **ORM**: Drizzle ORM with PostgreSQL adapter
- **Session Storage**: connect-pg-simple for PostgreSQL sessions (used in Express setup)
- **Development**: tsx for TypeScript execution

### Build & Development
- **Bundler**: Vite for frontend, esbuild for backend
- **CSS Processing**: PostCSS with Tailwind CSS
- **Deployment**: Vercel for serverless deployment