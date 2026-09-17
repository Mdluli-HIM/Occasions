"use client";

import { Heart, MapPin, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ProviderListing } from "@/lib/api";

export function ProviderResultCard({
  provider,
  isSaved,
  onSave,
}: {
  provider: ProviderListing;
  isSaved: boolean;
  onSave: () => void;
}) {
  const router = useRouter();
  const href = `/providers/${provider.id}`;

  function openProvider() {
    router.push(href);
  }

  const listingStatus =
    provider.isSponsored || provider.isFeatured
      ? "Promoted"
      : provider.isVerified
        ? "Verified provider"
        : "Listed provider";

  return (
    <article
      role="link"
      tabIndex={0}
      onClick={openProvider}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openProvider();
        }
      }}
      className="group grid cursor-pointer overflow-hidden rounded-[24px] border border-[#deded9] bg-white shadow-[0_8px_24px_rgba(17,17,17,0.06)] transition duration-300 hover:-translate-y-0.5 hover:border-[#ff5a40] hover:shadow-[0_20px_45px_rgba(17,17,17,0.12)] md:grid-cols-[360px_minmax(0,1fr)]"
      aria-label={`Open ${provider.name}`}
    >
      <div className="relative min-h-[260px] overflow-hidden bg-[#deded9] md:min-h-full">
        <div
          className="absolute inset-0 bg-cover bg-center transition duration-[1200ms] group-hover:scale-[1.045]"
          style={{ backgroundImage: `url(${provider.image})` }}
        />
      </div>

      <div className="relative p-6 md:p-8">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onSave();
          }}
          className={`absolute right-5 top-5 flex size-12 items-center justify-center rounded-[16px] border transition ${
            isSaved
              ? "border-[#ff5a40] bg-[#ff5a40] text-white"
              : "border-[#deded9] bg-white text-[#ff5a40] hover:border-[#ff5a40] hover:bg-[#fff0ec]"
          }`}
          aria-label={`Save ${provider.name}`}
        >
          <Heart size={21} className={isSaved ? "fill-white" : ""} />
        </button>

        <div className="pr-14">
          <p className="text-3xl font-black tracking-tight text-[#111111] md:text-4xl">
            {provider.priceFrom}{" "}
            <span className="text-base font-black text-[#6b7280]">estimate</span>
          </p>

          <h2 className="mt-4 text-2xl font-black text-[#111111]">
            {provider.name}
          </h2>

          <p className="mt-1 text-base font-black text-[#111111]">
            {provider.area}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm font-black text-[#6b7280]">
            <span className="inline-flex items-center gap-2 text-[#111111]">
              <Star size={18} className="fill-[#ff5a40] text-[#ff5a40]" />
              {provider.rating}
            </span>

            <span>{provider.reviews} reviews</span>

            <span>{provider.eventTypes[0]}</span>
          </div>

          <p className="mt-6 text-base font-black leading-7 text-[#111111]">
            {provider.services.join(", ")}
          </p>

          <p className="mt-4 line-clamp-2 text-base leading-7 text-[#343434]">
            {provider.description}
          </p>
        </div>

        <div className="mt-7 flex items-center justify-between border-t border-[#eee8e3] pt-5 text-sm font-black text-[#6b7280]">
          <span className="inline-flex items-center gap-2">
            <MapPin size={17} />
            {provider.location}
          </span>

          <span className="text-[#ff5a40]">{listingStatus}</span>
        </div>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            router.push(`${href}#contact`);
          }}
          className="mt-5 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[16px] bg-[#ff5a40] px-5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#ed422b] hover:shadow-[0_14px_30px_rgba(255,90,64,0.28)]"
        >
          Request Quote
        </button>

      </div>
    </article>
  );
}
