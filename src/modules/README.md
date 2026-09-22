# Module conventions

Each domain gets its own folder here. Business logic lives in modules —
API routes stay thin and just call into these.

Standard files per module:
- `types.ts` — domain types/interfaces
- `schema.ts` — Zod schemas for input validation
- `repository.ts` — Prisma queries only, no business rules
- `service.ts` — business logic, calls repository, throws domain errors
- `index.ts` — the only file other modules/routes are allowed to import from

Cross-module calls go through another module's `index.ts` exports —
never reach into another module's repository directly.