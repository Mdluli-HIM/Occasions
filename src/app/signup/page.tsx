"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { SiteFooter } from "@/components/layout/site-footer";
import { ApiError, apiClient } from "@/lib/api";

export default function SignupPage() {
  const router = useRouter();

  const [role, setRole] = useState<"customer" | "provider">("customer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await apiClient("/api/auth/register", {
        method: "POST",
        body: { name, email, phone, password, role },
      });

      const result = await signIn("credentials", { email, password, redirect: false });

      if (!result || result.error) {
        setError("Account created, but automatic login failed. Please log in.");
        router.push("/login");
        return;
      }

      router.push(role === "provider" ? "/provider-onboarding" : "/");
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <main className="flex min-h-screen items-center justify-center bg-[#f6f6f4] px-5 py-16">
      <div className="w-full max-w-md rounded-[28px] border border-[#deded9] bg-white p-8 shadow-sm">
        <Link href="/" className="text-3xl font-black tracking-tight !text-[#ff5a40]">
          Occasions
        </Link>

        <h1 className="mt-6 text-3xl font-black tracking-tight text-[#111111]">Create an account</h1>
        <p className="mt-2 text-sm font-semibold text-[#6b7280]">
          Sign up as a customer to save providers, or as a provider to list your business.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setRole("customer")}
            className={`min-h-[52px] rounded-[14px] border px-4 text-sm font-black transition ${
              role === "customer"
                ? "border-[#ff5a40] bg-[#ff5a40] text-white"
                : "border-[#deded9] bg-white text-[#111111]"
            }`}
          >
            I&apos;m a customer
          </button>
          <button
            type="button"
            onClick={() => setRole("provider")}
            className={`min-h-[52px] rounded-[14px] border px-4 text-sm font-black transition ${
              role === "provider"
                ? "border-[#ff5a40] bg-[#ff5a40] text-white"
                : "border-[#deded9] bg-white text-[#111111]"
            }`}
          >
            I&apos;m a provider
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#8a8a8a]">
              Full name
            </span>
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="min-h-[52px] w-full rounded-[14px] border border-[#deded9] bg-white px-4 text-sm font-bold outline-none transition focus:border-[#ff5a40] focus:ring-4 focus:ring-[#fff0ec]"
            />
          </label>

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
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#8a8a8a]">
              Phone
            </span>
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="068 000 0000"
              className="min-h-[52px] w-full rounded-[14px] border border-[#deded9] bg-white px-4 text-sm font-bold outline-none transition focus:border-[#ff5a40] focus:ring-4 focus:ring-[#fff0ec]"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#8a8a8a]">
              Password
            </span>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="min-h-[52px] w-full rounded-[14px] border border-[#deded9] bg-white px-4 text-sm font-bold outline-none transition focus:border-[#ff5a40] focus:ring-4 focus:ring-[#fff0ec]"
              placeholder="At least 8 characters"
            />
          </label>

          {error ? <p className="text-sm font-bold text-[#ff5a40]">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="min-h-[52px] w-full rounded-[14px] bg-[#111111] px-5 text-sm font-black text-white transition hover:bg-[#262626] disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm font-bold text-[#6b7280]">
          Already have an account?{" "}
          <Link href="/login" className="text-[#ff5a40]">
            Log in
          </Link>
        </p>
      </div>
      </main>

      <SiteFooter />
    </>
  );
}
