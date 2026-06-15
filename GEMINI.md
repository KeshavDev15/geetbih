# GEETBIH LABS PVT LTD - Engineering Standards & Architecture

Welcome to the GEETBIH LABS monorepo. This document serves as the primary source of truth for our architectural decisions, coding standards, and engineering workflows.

## 🚀 The Stack
- **Monorepo:** [Turborepo](https://turbo.build/) + [pnpm](https://pnpm.io/)
- **Frontend:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, GSAP, Framer Motion, Lenis.
- **Backend:** Nest.js, TypeScript.
- **Database:** PostgreSQL + Prisma 7 (Shared package).
- **Infrastructure:** Vercel (Frontend), DigitalOcean (Backend/Database).

## 🏗️ System Architecture

### 1. Workspace Structure
- `apps/web`: Next.js frontend. Focuses on immersive UI and high-performance rendering.
- `apps/api`: Nest.js backend. Handles business logic, authentication, and data orchestration.
- `packages/database`: Shared Prisma client. Ensures type safety across the entire stack.

### 2. Data Flow
- **Frontend** communicates with **Backend** via RESTful APIs (or GraphQL/tRPC if decided later).
- Both apps use the `@geetbih/database` package to interact with PostgreSQL.
- **Prisma 7** is used with the new configuration model (moving connection URLs to `prisma.config.ts`).

## 🛠️ Engineering Principles

### 1. Visual Excellence (Frontend)
- **Performance First:** All animations must be GPU-accelerated (opacity, transforms).
- **Immersive Motion:** Use GSAP for complex timelines and Framer Motion for declarative component interactions.
- **Smooth Interaction:** Lenis is used for global smooth scrolling. Avoid blocking the main thread with heavy JS.
- **Tailwind v4:** Strictly follow the CSS variable-first architecture defined in the `tailwind-v4-shadcn` skill.

### 2. Backend Scalability
- **Modular Design:** Use Nest.js modules to encapsulate features.
- **Dependency Injection:** Leverage Nest.js DI for testability and clean separation of concerns.
- **Type Safety:** Always use DTOs (Data Transfer Objects) and Zod for validation.

### 3. Shared Database Package
- All schema changes MUST happen in `packages/database/prisma/schema.prisma`.
- Run `pnpm generate` from the root after schema changes to update the client in all apps.

## 📝 Coding Standards

### General
- **TypeScript:** Strict mode enabled. No `any`. Use interfaces for data structures.
- **Formatting:** Prettier is enforced project-wide.
- **Linting:** ESLint with Next.js and Nest.js presets.

### React / Next.js
- **Server Components:** Default to RSC. Use `'use client'` only when interaction or browser APIs are required.
- **File Naming:** PascalCase for components (`Hero.tsx`), camelCase for hooks and utils.
- **Styling:** Use the `cn()` utility for conditional classes. Avoid inline styles unless calculating values dynamically.

### Nest.js
- **Controllers:** Keep them thin. Logic belongs in Services.
- **Error Handling:** Use built-in `HttpException` classes.

## 🛰️ Deployment Strategy
- **Frontend:** Automatic deployments to Vercel on push to `main`.
- **Backend:** Containerized or App Platform deployment on DigitalOcean.
- **Database:** Managed PostgreSQL on DigitalOcean.

---

*Note: This file is a living document. Update it as the architecture evolves.*
