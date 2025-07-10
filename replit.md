# PIP BLASTER - MT4 Trading Bot Landing Page

## Overview

This is a full-stack web application for a MT4 trading bot landing page. The application features a modern React frontend with a Node.js/Express backend, built using TypeScript throughout. It's designed as a marketing and lead generation platform for an automated forex trading bot service.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom trading-themed color palette
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Validation**: Zod schemas for request/response validation
- **API Integration**: OpenAI API for AI chat functionality

### Database Design
The application uses a PostgreSQL database with three main tables:
- `users`: User authentication (currently using in-memory storage)
- `reviews`: Customer testimonials and ratings
- `contact_submissions`: Lead capture form submissions

## Key Components

### Landing Page Sections
1. **Hero Section**: Main call-to-action with gradient background
2. **Features Section**: Six key selling points with icons and descriptions
3. **Proof Gallery**: Visual evidence of trading performance
4. **Testimonials Section**: Customer reviews with rating system
5. **Contact Section**: Lead generation form with experience levels
6. **AI Chat Widget**: Interactive assistant for customer support

### Core Functionality
- **Review System**: Users can submit ratings and comments
- **Contact Forms**: Multi-field lead capture with validation
- **AI Chat**: OpenAI-powered customer support widget
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## Data Flow

1. **Client Requests**: React components use TanStack Query for API calls
2. **API Routes**: Express handles `/api/reviews`, `/api/contact`, and `/api/chat` endpoints
3. **Data Validation**: Zod schemas validate incoming data on both client and server
4. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
5. **Response Handling**: JSON responses with proper error handling

## External Dependencies

### Core Technologies
- React ecosystem (React, React DOM, React Query)
- Express.js with TypeScript support
- Drizzle ORM with PostgreSQL driver
- Neon Database for serverless PostgreSQL
- OpenAI API for chat functionality

### UI Components
- Radix UI primitives for accessibility
- shadcn/ui component library
- Tailwind CSS for styling
- Lucide React for icons

### Development Tools
- Vite for build tooling
- TypeScript for type safety
- ESBuild for server bundling
- PostCSS with Autoprefixer

## Deployment Strategy

### Development
- Uses Vite dev server with HMR for frontend
- tsx for running TypeScript server in development
- Replit-specific plugins for development environment

### Production Build
1. Frontend: Vite builds optimized React bundle to `dist/public`
2. Backend: ESBuild bundles server code to `dist/index.js`
3. Database: Drizzle handles migrations via `drizzle-kit push`

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (required)
- `OPENAI_API_KEY`: OpenAI API key for chat functionality
- `NODE_ENV`: Environment setting (development/production)

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- July 05, 2025. Initial setup
- July 05, 2025. Changed brand name from "TradingBot Pro" to "PIP BLASTER" throughout the application