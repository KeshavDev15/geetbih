# Frontend Architecture & Standards (`apps/web`)

## 🎨 Visual Stack
- **Next.js 16:** Utilizing Turbopack for fast development and RSC for performance.
- **Tailwind CSS v4:** Using the `@theme inline` pattern. All colors map to CSS variables in `globals.css`.
- **GSAP & Framer Motion:** 
  - Use `useGSAP` hook for timelines.
  - Use `motion/react` for entry/exit animations and gestures.
- **Lenis:** Integrated in `RootLayout` for smooth scrolling.

## 📂 Directory Structure
- `src/app`: Routes and layouts.
- `src/components`: UI components.
  - `ui/`: shadcn/ui base components.
  - `shared/`: Reusable complex components.
- `src/hooks`: Custom React hooks.
- `src/lib`: Utilities (e.g., `cn`, GSAP setup).
- `src/store`: State management (Zustand).

## ⚡ Performance Rules
1. **Images:** Always use `next/image` with proper `priority` for LCP elements.
2. **Animations:** 
   - Never animate properties that trigger reflow (width, height, top, left).
   - Use `will-change` sparingly on complex animated elements.
3. **Hydration:** Be mindful of differences between server and client rendering, especially with animations.
