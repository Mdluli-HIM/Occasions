"use client";

import type { FormEvent } from "react";
import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { SiteFooter } from "@/components/layout/site-footer";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (!result || result.error) {
      setError("Incorrect email or password.");
      return;
    }

    router.push(next);
    router.refresh();
  }

  return (
    <>
      <main className="flex min-h-screen items-center justify-center bg-[#f6f6f4] px-5 py-16">
      <div className="w-full max-w-md rounded-[28px] border border-[#deded9] bg-white p-8 shadow-sm">
        <Link href="/" className="text-3xl font-black tracking-tight !text-[#ff5a40]">
          Occasions
        </Link>

        <h1 className="mt-6 text-3xl font-black tracking-tight text-[#111111]">Log in</h1>
        <p className="mt-2 text-sm font-semibold text-[#6b7280]">
          Log in to manage your listing or your saved providers.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#8a8a8a]">
              Email
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="min-h-[52px] w-full rounded-[14px] border border-[#deded9] bg-white px-4 text-sm font-bold outline-none transition focus:border-[#ff5a40] focus:ring-4 focus:ring-[#fff0ec]"
              placeholder="name@example.com"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#8a8a8a]">
              Password
            </span>
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="min-h-[52px] w-full rounded-[14px] border border-[#deded9] bg-white px-4 text-sm font-bold outline-none transition focus:border-[#ff5a40] focus:ring-4 focus:ring-[#fff0ec]"
              placeholder="••••••••"
            />
          </label>

          {error ? <p className="text-sm font-bold text-[#ff5a40]">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="min-h-[52px] w-full rounded-[14px] bg-[#ff5a40] px-5 text-sm font-black text-white transition hover:bg-[#ed422b] disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm font-bold text-[#6b7280]">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[#ff5a40]">
            Sign up
          </Link>
        </p>
      </div>
      </main>

      <SiteFooter />
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
