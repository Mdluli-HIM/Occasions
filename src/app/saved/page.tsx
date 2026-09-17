"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Search } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ProviderResultCard } from "@/components/search/provider-result-card";
import { apiClient, type ProviderListing } from "@/lib/api";

export default function SavedPage() {
  const [providers, setProviders] = useState<ProviderListing[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiClient<ProviderListing[]>("/api/me/saved-providers")
      .then(setProviders)
      .catch(() => setError("We couldn't load your saved providers. Try refreshing."));
  }, []);

  function handleUnsave(id: string) {
    setProviders((current) => current?.filter((p) => p.id !== id) ?? null);
    apiClient(`/api/me/saved-providers/${id}`, { method: "DELETE" }).catch((err) => {
      console.error("Failed to unsave provider:", err);
    });
  }

  return (
    <div className="min-h-screen bg-[#f6f6f4]">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-5 py-10 md:px-8 md:py-14">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#ff5a40]">
          Your account
        </p>

        <h1 className="mt-3 text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
          Saved providers
        </h1>

        <p className="mt-3 max-w-xl text-base font-semibold text-[#6b7280]">
          Providers you&apos;ve saved while browsing. Tap the heart on any
          listing to save or remove it.
        </p>

        {error ? (
          <p className="mt-8 rounded-[16px] border border-[#ff5a40]/30 bg-[#fff0ec] px-5 py-4 text-sm font-bold text-[#ff5a40]">
            {error}
          </p>
        ) : null}

        {providers === null && !error ? (
          <div className="mt-10 grid gap-5">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-[24px] border border-[#deded9] bg-white"
              />
            ))}
          </div>
        ) : null}

        {providers && providers.length === 0 ? (
          <div className="mt-10 rounded-[24px] border border-[#deded9] bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-[#ff5a40]/30 bg-white text-[#ff5a40]">
              <Heart size={26} />
            </div>

            <h2 className="mt-5 text-2xl font-black text-[#111111]">
              Nothing saved yet
            </h2>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#6f6f6f]">
              Browse providers and tap the heart icon on any listing to save
              it here for later.
            </p>

            <Link
              href="/search"
              className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-2xl bg-[#ff5a40] px-6 text-sm font-black text-white transition hover:bg-[#ed422b]"
            >
              <Search size={17} />
              Find providers
            </Link>
          </div>
        ) : null}

        {providers && providers.length > 0 ? (
          <div className="mt-10 grid gap-5">
            {providers.map((provider) => (
              <ProviderResultCard
                key={provider.id}
                provider={provider}
                isSaved
                onSave={() => handleUnsave(provider.id)}
              />
            ))}
          </div>
        ) : null}
      </main>

      <SiteFooter />
    </div>
  );
}
