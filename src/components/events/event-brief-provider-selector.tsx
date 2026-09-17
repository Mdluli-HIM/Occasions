"use client";

import { useState } from "react";
import { Check, MapPin, Star } from "lucide-react";
import { apiClient, type ProviderListing } from "@/lib/api";

type ProvidersByService = Record<string, ProviderListing[]>;

type BatchLeadResponse = {
  created: number;
  skipped: number;
  leads: { id: string }[];
};

export function EventBriefProviderSelector({
  eventId,
  providersByService,
  serviceLabels,
}: {
  eventId: string;
  providersByService: ProvidersByService;
  serviceLabels: Record<string, string>;
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [requested, setRequested] = useState<Set<string>>(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<{ created: number; skipped: number } | null>(null);

  function toggle(providerId: string) {
    if (requested.has(providerId)) return;

    setSelected((current) => {
      const next = new Set(current);
      if (next.has(providerId)) {
        next.delete(providerId);
      } else {
        next.add(providerId);
      }
      return next;
    });
  }

  async function handleSubmit() {
    if (selected.size === 0) return;

    setSubmitting(true);
    setError(null);
    setLastResult(null);

    try {
      const result = await apiClient<BatchLeadResponse>(`/api/events/${eventId}/leads`, {
        method: "POST",
        body: { providerIds: Array.from(selected) },
      });

      setRequested((current) => {
        const next = new Set(current);
        selected.forEach((id) => next.add(id));
        return next;
      });
      setSelected(new Set());
      setLastResult({ created: result.created, skipped: result.skipped });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong sending your requests.");
    } finally {
      setSubmitting(false);
    }
  }

  const serviceSlugs = Object.keys(providersByService);
  const hasAnyProviders = serviceSlugs.some((slug) => providersByService[slug]?.length > 0);

  return (
    <div className="pb-28">
      {lastResult ? (
        <div className="mb-8 rounded-[20px] border border-[#43c6a0]/30 bg-[#ecfdf5] p-5 text-sm font-bold text-[#059669]">
          Sent {lastResult.created} quote request{lastResult.created === 1 ? "" : "s"}
          {lastResult.skipped > 0 ? ` (${lastResult.skipped} already requested)` : ""}.
        </div>
      ) : null}

      {error ? (
        <div className="mb-8 rounded-[20px] border border-[#ff5a40]/30 bg-[#fff0ec] p-5 text-sm font-bold text-[#ff5a40]">
          {error}
        </div>
      ) : null}

      {!hasAnyProviders ? (
        <div className="rounded-[20px] border border-dashed border-[#deded9] bg-white p-6 text-center text-sm font-bold text-[#7b8495]">
          No providers found yet for your event's services.
        </div>
      ) : (
        serviceSlugs.map((slug) => {
          const providers = providersByService[slug] ?? [];
          if (providers.length === 0) return null;

          return (
            <div key={slug} className="mb-10">
              <h2 className="mb-4 text-2xl font-black text-[#111111]">
                {serviceLabels[slug] ?? slug}
              </h2>

              <div className="grid gap-3">
                {providers.map((provider) => (
                  <ProviderSelectCard
                    key={provider.id}
                    provider={provider}
                    eventId={eventId}
                    isSelected={selected.has(provider.id)}
                    isRequested={requested.has(provider.id)}
                    onToggle={() => toggle(provider.id)}
                  />
                ))}
              </div>
            </div>
          );
        })
      )}

      {selected.size > 0 ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#deded9] bg-white/95 px-5 py-4 shadow-[0_-10px_30px_rgba(17,17,17,0.08)] backdrop-blur-md">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
            <p className="text-sm font-black text-[#111111]">
              {selected.size} provider{selected.size === 1 ? "" : "s"} selected
            </p>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="inline-flex min-h-[52px] items-center justify-center rounded-[16px] bg-[#ff5a40] px-7 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#ed422b] hover:shadow-[0_14px_30px_rgba(255,90,64,0.28)] disabled:opacity-60"
            >
              {submitting
                ? "Sending..."
                : `Send Quote Request${selected.size === 1 ? "" : "s"}`}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ProviderSelectCard({
  provider,
  eventId,
  isSelected,
  isRequested,
  onToggle,
}: {
  provider: ProviderListing;
  eventId: string;
  isSelected: boolean;
  isRequested: boolean;
  onToggle: () => void;
}) {
  return (
    <article
      className={`grid overflow-hidden rounded-[24px] border bg-white transition md:grid-cols-[200px_minmax(0,1fr)] ${
        isRequested
          ? "border-[#deded9] opacity-70"
          : isSelected
            ? "border-[#ff5a40] shadow-[0_12px_32px_rgba(255,90,64,0.14)]"
            : "border-[#deded9] hover:border-[#ff5a40]/50"
      }`}
    >
      
      <a href={`/providers/${provider.id}?event=${eventId}`} onClick={(event) => event.stopPropagation()} className="relative min-h-[160px] overflow-hidden bg-[#deded9] md:min-h-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${provider.image})` }}
        />
      </a>

      <div className="relative p-5">
        <button
          type="button"
          onClick={onToggle}
          disabled={isRequested}
          className={`absolute right-4 top-4 flex size-10 shrink-0 items-center justify-center rounded-[12px] border transition ${
            isRequested
              ? "border-[#43c6a0] bg-[#ecfdf5] text-[#059669]"
              : isSelected
                ? "border-[#ff5a40] bg-[#ff5a40] text-white"
                : "border-[#deded9] bg-white text-transparent hover:border-[#ff5a40]"
          }`}
          aria-label={isRequested ? `Already requested ${provider.name}` : `Select ${provider.name}`}
        >
          <Check size={18} />
        </button>

        <div className="pr-14">
          <p className="text-xl font-black tracking-tight text-[#111111]">
            {provider.priceFrom}{" "}
            <span className="text-sm font-black text-[#6b7280]">estimate</span>
          </p>

          <h3 className="mt-2 text-lg font-black text-[#111111]">{provider.name}</h3>

          <p className="mt-1 text-sm font-black text-[#111111]">{provider.area}</p>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-black text-[#6b7280]">
            <span className="inline-flex items-center gap-1 text-[#111111]">
              <Star size={14} className="fill-[#ff5a40] text-[#ff5a40]" />
              {provider.rating}
            </span>
            <span>{provider.reviews} reviews</span>
          </div>

          <p className="mt-3 text-sm font-black leading-6 text-[#111111]">
            {provider.services.join(", ")}
          </p>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#343434]">
            {provider.description}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#eee8e3] pt-4">
          <span className="inline-flex items-center gap-2 text-xs font-black text-[#6b7280]">
            <MapPin size={14} />
            {provider.location}
          </span>

          
          <a href={`/providers/${provider.id}?event=${eventId}`} onClick={(event) => event.stopPropagation()} className="inline-flex items-center gap-1 text-xs font-black text-[#ff5a40] transition hover:text-[#ed422b]">
            View details &rarr;
          </a>
        </div>

        {isRequested ? (
          <span className="mt-3 inline-block rounded-full bg-[#ecfdf5] px-3 py-1 text-xs font-black text-[#059669]">
            Requested
          </span>
        ) : null}
      </div>
    </article>
  );
}
