# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` (runs on port 3000 with host binding)
- **Build**: `npm run build`
- **Test**: Currently no tests configured (shows error message)

### Docker Commands
- **Start all services**: `docker-compose up -d` (PostgreSQL + Frontend)
- **Stop all services**: `docker-compose down`
- **View logs**: `docker-compose logs -f [service-name]`
- **Rebuild containers**: `docker-compose up --build`

## Architecture Overview

This is a React application built with modern full-stack technologies:

### Core Stack
- **React 19** with TypeScript for the frontend
- **TanStack Router** for file-based routing with full-stack capabilities via `@tanstack/react-start`
- **Vite** as the build tool and development server
- **Tailwind CSS** with Vite plugin for styling
- **PostgreSQL** database integration (pg dependency)
- **better-auth** for authentication

### Project Structure
- `src/routes/` - File-based routing structure
  - `__root.tsx` - Root layout component with HTML document structure
  - `index.tsx` - Landing page with inline styles
  - `about.tsx` - About page with inline styles
- `src/router.tsx` - Router configuration with TanStack Router
- `src/routeTree.gen.ts` - Auto-generated route tree (do not edit manually)

### Key Configuration
- **TypeScript**: Uses modern ESNext modules with Bundler resolution, React JSX transform
- **Vite**: Configured with TanStack Start plugin, React plugin, and TypeScript path resolution
- **Development**: Server runs on port 3000 with host binding for external access

### Styling Approach
Currently uses inline styles throughout components rather than CSS files or Tailwind classes. The styling approach is consistent with a modern, clean aesthetic using:
- System fonts (`system-ui, sans-serif`)
- Card-based layouts with subtle shadows and borders
- Blue accent color (`#007bff`) for interactive elements
- Responsive grid layouts using CSS Grid

### Authentication
Uses `better-auth` library for authentication features (recently added dependency).

### Database
PostgreSQL integration available through the `pg` package for server-side data operations.
- **Connection**: Uses `DATABASE_URL` environment variable
- **Docker setup**: PostgreSQL 15 Alpine container with persistent volume
- **Default credentials**: postgres/postgres (configured in docker-compose.yml)
- **Sample schema**: Users table with basic structure (see init.sql)

## Development Notes

- Routes are auto-generated - the `routeTree.gen.ts` file should not be manually edited
- TanStack Start provides full-stack capabilities, so server-side features can be added to route files
- The application uses React 19 features and modern TypeScript configurations
- No testing framework is currently set up
- No linting or code formatting tools are configured

## Docker Setup

The project includes a complete Docker setup with:
- **PostgreSQL 15 Alpine** container with health checks
- **Frontend container** with hot reload support
- **Persistent data** storage for the database
- **Network connectivity** between containers
- **Environment variables** for database connection

Files:
- `docker-compose.yml` - Multi-container setup
- `frontend/Dockerfile` - Frontend container configuration
- `init.sql` - Database initialization with sample data
- `.env.example` - Environment variable template