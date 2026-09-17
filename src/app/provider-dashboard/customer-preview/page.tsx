import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Edit3,
  MapPin,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import { apiServer } from "@/lib/api-server";
import { resolveMediaUrl } from "@/lib/utils";
import type { ListingState } from "@/components/provider-dashboard/listing-editor-client";

export default async function ProviderCustomerPreviewPage() {
  // Same source of truth as the editor — GET /api/providers/me/listing.
  const listing = await apiServer<ListingState>("/api/providers/me/listing");

  return (
    <main className="min-h-screen bg-[#f6f6f4] text-[#111111]">
      <header className="sticky top-0 z-40 border-b border-[#eee8e3] bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between px-5 md:px-8">
          <Link
            href="/provider-dashboard/listing"
            className="inline-flex items-center gap-2 text-sm font-black text-[#111111] transition hover:text-[#ff5a40]"
          >
            <ArrowLeft size={18} />
            Back to editor
          </Link>

          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff5a40]">
            Customer preview
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="space-y-8">
            <section className="overflow-hidden rounded-[34px] bg-white p-3 shadow-sm">
              {listing.media.length > 0 ? (
                <div className="grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
                  <GalleryBlock src={resolveMediaUrl(listing.media[0].url)} large />

                  <div className="grid grid-cols-2 gap-3">
                    {listing.media.slice(1, 5).map((item) => (
                      <GalleryBlock key={item.id} src={resolveMediaUrl(item.url)} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex min-h-[220px] items-center justify-center rounded-[26px] bg-[#f6f6f4] text-sm font-bold text-[#7b8495]">
                  No photos yet.
                </div>
              )}
            </section>

            <section className="rounded-[34px] bg-white p-6 shadow-sm md:p-8">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff5a40]">
                Public listing
              </p>

              <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
                {listing.businessName}
              </h1>

              <p className="mt-3 flex items-center gap-2 text-base font-bold text-[#6b7280]">
                <MapPin size={18} className="text-[#ff5a40]" />
                {listing.category} · {listing.location}
              </p>

              <div className="mt-8 grid overflow-hidden rounded-[24px] border border-[#eee8e3] md:grid-cols-3">
                <InfoCard
                  icon={<Users size={21} />}
                  label="Capacity"
                  value={listing.capacity}
                />

                <InfoCard
                  icon={<MapPin size={21} />}
                  label="Areas"
                  value={listing.areas}
                />

                <InfoCard
                  icon={<Star size={21} />}
                  label="Rating"
                  value={listing.rating}
                />
              </div>
            </section>

            <CustomerSection title="About this provider">
              <p className="max-w-4xl text-base font-semibold leading-8 text-[#6b7280]">
                {listing.description}
              </p>
            </CustomerSection>

            <CustomerSection title="Services offered">
              <TagList items={listing.services} />
            </CustomerSection>

            <CustomerSection title="Occasions supported">
              <TagList items={listing.occasions} />
            </CustomerSection>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <section className="rounded-[30px] bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex size-12 items-center justify-center rounded-[16px] bg-[#fff0ec] text-[#ff5a40]">
                  <ShieldCheck size={23} />
                </div>

                <div>
                  <h2 className="text-xl font-black">Listing visibility</h2>
                  <p className="mt-2 text-sm font-bold leading-6 text-[#6b7280]">
                    Customers will use this page to understand your services
                    before sending an enquiry.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <StatusItem label="Profile active" />
                <StatusItem label="Quote form enabled" />
                <StatusItem label="Contact options visible" />
              </div>
            </section>

            <Link
              href="/provider-dashboard/listing"
              className="flex min-h-[56px] items-center justify-center gap-2 rounded-[16px] bg-[#111111] px-5 text-sm font-black !text-white transition hover:bg-[#262626]"
            >
              <Edit3 size={17} className="text-white" />
              <span className="text-white">Edit listing</span>
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}

function GalleryBlock({
  src,
  large = false,
}: {
  src: string;
  large?: boolean;
}) {
  return (
    <div
      className={`rounded-[26px] bg-[#f6f6f4] bg-cover bg-center ${
        large ? "min-h-[440px]" : "min-h-[214px]"
      }`}
      style={{ backgroundImage: `url(${src})` }}
    />
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="border-b border-[#eee8e3] p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
      <div className="text-[#ff5a40]">{icon}</div>

      <p className="mt-4 text-[11px] font-black uppercase tracking-[0.16em] text-[#9aa4b5]">
        {label}
      </p>

      <p className="mt-2 text-base font-black text-[#111111]">{value}</p>
    </div>
  );
}

function CustomerSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[30px] bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-2xl font-black">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function TagList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-[#ff5a40]/25 bg-white px-4 py-2 text-sm font-black text-[#111111]"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function StatusItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 text-sm font-black text-[#111111]">
      <CheckCircle2 size={18} className="text-emerald-500" />
      {label}
    </div>
  );
}
