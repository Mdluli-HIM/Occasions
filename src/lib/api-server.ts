import "server-only";
import { getRawSessionToken } from "./server-auth-token";
import { apiRequest, type FetchOptions } from "./api";

// Use from Server Components, Route Handlers, or Server Actions ONLY.
// Never import this file from a "use client" component — see the note at
// the top of src/lib/api.ts.
export async function apiServer<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const token = options.token ?? (await getRawSessionToken().catch(() => null));
  return apiRequest<T>(path, { ...options, token });
}
