import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin, Users, Wallet } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { serviceOptions } from "@/data/search-results";
import { type EventBriefDetail } from "@/lib/api";
import { apiServer } from "@/lib/api-server";
import { EventBriefProviderList } from "@/components/events/event-brief-provider-list";

function serviceLabel(slug: string) {
  return serviceOptions.find((option) => option.value === slug)?.label ?? slug;
}

export default async function EventBriefPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;

  let data: EventBriefDetail;
  try {
    data = await apiServer<EventBriefDetail>(`/api/events/${eventId}`);
  } catch (error) {
    const status = (error as { status?: number })?.status;
    if (status === 404) {
      notFound();
    }
    throw error;
  }

  const { brief, providersByService } = data;

  return (
    <main className="min-h-screen bg-[#f6f6f4]">
      <SiteHeader />

      <section className="bg-[#ff5a40] px-5 py-12 text-white md:py-14">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-white/85">
            Your event
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
            {brief.occasion}
          </h1>

          <div className="mt-5 flex flex-wrap gap-4 text-sm font-bold text-white/95">
            <span className="inline-flex items-center gap-2">
              <MapPin size={16} />
              {brief.location}
            </span>
            {brief.eventDate ? (
              <span className="inline-flex items-center gap-2">
                <CalendarDays size={16} />
                {brief.eventDate}
              </span>
            ) : null}
            {brief.guests ? (
              <span className="inline-flex items-center gap-2">
                <Users size={16} />
                {brief.guests}
              </span>
            ) : null}
            {brief.budget ? (
              <span className="inline-flex items-center gap-2">
                <Wallet size={16} />
                {brief.budget}
              </span>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-10 md:py-14">
        {brief.serviceSlugs.map((slug) => {
          const providers = providersByService[slug] ?? [];

          return (
            <div key={slug} className="mb-12">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-black text-[#111111]">
                  {serviceLabel(slug)}
                </h2>
                <Link
                  href={`/search?serviceType=${slug}&location=${encodeURIComponent(brief.location)}`}
                  className="text-sm font-black text-[#ff5a40] transition hover:text-[#ed422b]"
                >
                  See all
                </Link>
              </div>

              {providers.length > 0 ? (
                <EventBriefProviderList providers={providers} />
              ) : (
                <div className="mt-5 rounded-[20px] border border-dashed border-[#deded9] bg-white p-6 text-center text-sm font-bold text-[#7b8495]">
                  No providers found yet for {serviceLabel(slug).toLowerCase()} in {brief.location || "your area"}.
                </div>
              )}
            </div>
          );
        })}
      </section>

      <SiteFooter />
    </main>
  );
}
