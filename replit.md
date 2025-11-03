# WOS Calc

## Overview

WOS Calc is a web-based calculator application designed for Whiteout Survival players. The application provides specialized calculators for game mechanics including healing wounded troops and armament competition planning. Built as a full-stack React application, it features a modern UI with dark/light theme support and responsive design optimized for both desktop and mobile gameplay scenarios.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for component-based UI development
- **Vite** as the build tool and development server for fast hot module replacement
- **Wouter** for lightweight client-side routing instead of React Router
- **TanStack Query** for server state management and caching
- **shadcn/ui** component library built on Radix UI primitives for accessible, customizable components
- **Tailwind CSS** for utility-first styling with custom design tokens for game theming
- **Custom theme system** supporting light/dark modes with localStorage persistence

### Component Structure
- Modular page-based architecture with dedicated calculator components
- Reusable UI components following atomic design principles
- Context-based theme management for consistent styling
- Mobile-responsive navigation with collapsible menu system

### Backend Architecture
- **Express.js** server with TypeScript for API endpoints
- **Modular route registration** system for scalable API organization
- **Memory-based storage** implementation with interface for future database integration
- **Development/production environment** handling with Vite integration
- **Error handling middleware** for consistent API responses

### Data Management
- **Drizzle ORM** configured for PostgreSQL with schema-first approach
- **Zod validation** integrated with Drizzle for type-safe data operations
- **Database migrations** managed through Drizzle Kit
- **Shared schema** between client and server for type consistency
- **Modular data architecture** with separate files for each calculator:
  - `client/src/data/types.ts` - shared type definitions (`CalculatorItem` interface)
  - `client/src/data/armamentData.ts` - Armament Calculator data
  - `client/src/data/officerProjectData.ts` - Officer Project Calculator data
  - `client/src/data/allianceShowdownData.ts` - Alliance Showdown Calculator data

### Game-Specific Features
- **Healing Calculator**: Calculates optimal troop healing batches with alliance helper support
- **Armament Competition Calculator**: Two-stage point calculation with resource optimization
- **Officer Project Calculator**: Two-stage calculator with chief charm and troop training optimization, features selectable troop levels
- **Alliance Showdown Calculator**: Six-stage competition calculator with troop level selection in Stage IV
- **King of Icefield Calculator**: Seven-stage event calculator with troop training and resource management (design reference for all multi-stage calculators)
- **State of Power Calculator**: Five-stage power competition calculator with Beast Slay (beast level selection in Stage III) and Hero Development optimization (troop level selection in Stage IV)
- **Safe expression evaluation** for user input calculations
- **Modular modal components** for reusable help dialogs and information display
- **Unified color system** with CSS variables for game rarity levels (rare, epic, mythic, legendary)
- **Goal achievement visualization** with green highlighting when targets are reached

#### Multi-Stage Calculator Design System
All multi-stage calculators (Armament, Officer Project, Alliance Showdown, King of Icefield, State of Power) follow a unified design pattern:
- **Chrome-style tab interface** using shadcn Tabs component with overlapping border effect (`mb-[-2px]`)
- **Roman numeral tab labels** (I, II, III, IV, V, VI, VII) for stage identification
- **Per-stage state management**: Each stage maintains its own `includePlanned` toggle via a "+" button
- **Consistent layout**: `grid-cols-9` input panel with Goal, My points, +, Expected, and Remaining fields
- **Reset button** positioned beside stage title for quick clearing of stage data
- **Uniform table styling**: `bg-wos-gray-50` headers with hover states
- **Transparent overall total card**: No border or shadow for clean visual hierarchy
- No global switches - all controls are stage-specific for better user experience

### Development Tools
- **ESBuild** for production server bundling
- **PostCSS** with Autoprefixer for CSS processing
- **TypeScript strict mode** for enhanced type safety
- **Path mapping** for clean import statements
- **Development hot reload** with error overlay integration

## External Dependencies

### UI and Styling
- **@radix-ui/react-*** components for accessible UI primitives (accordion, dialog, dropdown, etc.)
- **Tailwind CSS** for utility-first styling
- **Lucide React** for consistent iconography
- **class-variance-authority** for component variant management
- **clsx** and **tailwind-merge** for conditional styling

### State Management and Data Fetching
- **@tanstack/react-query** for server state management
- **React Hook Form** with **@hookform/resolvers** for form handling
- **Zod** for runtime type validation and schema definition

### Database and Backend
- **Drizzle ORM** with **drizzle-zod** integration for database operations
- **@neondatabase/serverless** for PostgreSQL connectivity
- **connect-pg-simple** for session storage (configured but not actively used)

### Development and Build Tools
- **Vite** with **@vitejs/plugin-react** for development and building
- **@replit/vite-plugin-runtime-error-modal** for enhanced development experience
- **@replit/vite-plugin-cartographer** for development environment integration
- **tsx** for TypeScript execution in development
- **esbuild** for production server bundling

### Utility Libraries
- **date-fns** for date manipulation and formatting
- **nanoid** for unique ID generation
- **cmdk** for command palette functionality
- **embla-carousel-react** for carousel components