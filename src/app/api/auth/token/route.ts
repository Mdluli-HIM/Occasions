import { NextResponse } from "next/server";
import { getRawSessionToken } from "@/lib/server-auth-token";

// Client Components can't read the httpOnly NextAuth session cookie
// directly, so they call this same-origin route to get it, then send it to
// the Express backend as `Authorization: Bearer <token>`. Server Components
// skip this entirely and read the cookie straight from `next/headers`.
export async function GET() {
  const token = await getRawSessionToken();
  return NextResponse.json({ token });
}
