# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Container Environment

This application runs in a Docker container with the development server automatically started. **DO NOT** manually run `npm run dev` - the dev server is already running via Docker Compose and accessible at http://localhost:3000 on the host machine.

## Development Commands

- `npm run dev` - Start development server (handled automatically by Docker)
- `npm run build` - Build production bundle using Vite
- `npm run db:generate` - Generate Drizzle migrations from schema changes
- `npm run db:migrate` - Apply pending database migrations
- `npm run db:studio` - Launch Drizzle Studio for database management

## Architecture Overview

This is a full-stack React application with the following stack:

### Tech Stack
- **Frontend**: React 19, TanStack Start (full-stack framework), TailwindCSS 4
- **Backend**: TanStack Start server with file-based API routes
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth with email/password and email verification
- **Build Tool**: Vite with TypeScript

### Key Architecture Patterns

**File-based Routing**: TanStack Start uses routes in `src/routes/`. The route tree is auto-generated in `src/routeTree.gen.ts`. Root layout defined in `src/routes/__root.tsx`.

**Database Layer**:
- Schema: `src/db/schema.ts` (user, session, account, verification tables)
- Connection: `src/db/index.ts`
- Migrations: `./drizzle/` directory
- Configuration: `drizzle.config.ts`

**Authentication System**:
- Configuration: `src/lib/auth.ts` with Drizzle adapter and email features
- Client utilities: `src/lib/auth-client.ts`
- API routes: `src/routes/api/auth/$.ts`
- Email service: `src/lib/email.ts` for verification and password reset

**Server Setup**: Entry point `src/server.ts` uses TanStack Start's handler system.

### Environment Configuration

Required variables in `.env`:
- `DATABASE_URL` - PostgreSQL connection (pre-configured for Docker)
- `BETTER_AUTH_SECRET` - Auth encryption secret
- `BETTER_AUTH_URL` - Base URL (http://localhost:3000)
- Email settings: `EMAIL_USER`, `EMAIL_APP_PASSWORD`, `EMAIL_FROM`

### Database Workflow

1. Modify schema in `src/db/schema.ts`
2. Generate migration: `npm run db:generate`
3. Apply migration: `npm run db:migrate`
4. Use Drizzle Studio for inspection: `npm run db:studio`

### Authentication Flow

- Sign up/login routes available
- Email verification enabled with custom templates
- Password reset functionality
- Session management via PostgreSQL
- Trusted origins configured for localhost development