# Backend Architecture & Standards (`apps/api`)

## 🧱 Core Stack
- **Nest.js:** Modular architecture.
- **Prisma:** Integrated via `PrismaModule` and `PrismaService`.
- **Config:** Using `@nestjs/config` for environment variable management.

## 📂 Directory Structure
- `src/modules`: Feature-based modules (e.g., `auth`, `users`).
- `src/common`: Global interceptors, filters, and decorators.
- `src/dto`: Shared Data Transfer Objects.

## 🔒 Security & Patterns
- **Validation:** Use `class-validator` and `class-transformer` (or Zod) for incoming requests.
- **Authentication:** JWT-based auth (Passport.js).
- **Logging:** Use Nest's built-in logger or a specialized one for production.
