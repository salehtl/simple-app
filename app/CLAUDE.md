# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository. You are running in a container. The app is running on the host machine port 3000.

## Development Commands

- `npm run dev` - Start development server on port 3000 with host binding. 
- `npm run build` - Build production bundle using Vite

## Architecture Overview

This is a full-stack React application built with modern technologies:

### Tech Stack
- **Frontend**: React 19, TanStack Start (file-based routing), TailwindCSS 4
- **Backend**: TanStack Start (full-stack React framework)
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth with email/password support
- **Build Tool**: Vite with TypeScript

### Key Architecture Patterns

**File-based Routing**: Uses TanStack Start with routes in `src/routes/`. The route tree is auto-generated in `src/routeTree.gen.ts`.

**Database Layer**:
- Schema defined in `src/db/schema.ts`
- Database connection in `src/db/index.ts`
- Drizzle migrations stored in `./drizzle/` directory
- Database URL configured via `DATABASE_URL` environment variable

**Authentication**:
- Better Auth configuration in `src/lib/auth.ts` with Drizzle adapter
- Client-side auth utilities in `src/lib/auth-client.ts`
- Auth API routes handled via `src/routes/api/auth/$.ts`
- Uses PostgreSQL for session storage

**Server Setup**: Entry point in `src/server.ts` using TanStack Start's handler system.

### Environment Variables
Required environment variables (see `.env`):
- `DATABASE_URL` - PostgreSQL connection string
- `BETTER_AUTH_SECRET` - Secret key for auth encryption
- `BETTER_AUTH_URL` - Base URL for auth callbacks

### Database Operations
- Run migrations: Use Drizzle Kit commands (configured in `drizzle.config.ts`)
- Schema changes: Modify `src/db/schema.ts` then generate migrations
- you do not need to run npm run dev it is already running
- This means Docker is already running the dev server, which is why port 3000 is occupied and my attempts to start npm run dev get
  switched to port 3001.

  You should NOT manually run npm run dev since Docker Compose is already handling this automatically. The app is accessible at
  http://localhost:3000 on the host machine (as mentioned in the CLAUDE.md).

  The authentication should work at the endpoints I mentioned earlier:
  - http://localhost:3000/api/auth/* (from host machine perspective)