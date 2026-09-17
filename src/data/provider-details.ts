// Provider detail data now comes from GET /api/providers/:slug (see
// src/lib/api.ts and src/app/providers/[providerId]/page.tsx). Kept as a
// type-only re-export for any remaining imports.
export type { ProviderDetail } from "@/lib/api";
