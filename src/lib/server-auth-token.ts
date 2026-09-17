import "server-only";
import { cookies } from "next/headers";

// NextAuth stores its encrypted JWT session directly in a cookie. Server
// Components / Route Handlers / Server Actions can read it straight from
// the request — no round trip needed (that round trip only exists for
// client components, see src/app/api/auth/token/route.ts).
const COOKIE_NAMES = ["__Secure-next-auth.session-token", "next-auth.session-token"];

export async function getRawSessionToken(): Promise<string | null> {
  const store = await cookies();

  for (const name of COOKIE_NAMES) {
    const value = store.get(name)?.value;
    if (value) return value;
  }

  return null;
}
