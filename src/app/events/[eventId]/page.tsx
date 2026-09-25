import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Check, MapPin, Users, Wallet } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { serviceOptions } from "@/data/search-results";
import { type EventBriefDetail } from "@/lib/api";
import { apiServer } from "@/lib/api-server";
import { EventBriefProviderSelector } from "@/components/events/event-brief-provider-selector";
import { EventQuoteComparison } from "@/components/events/event-quote-comparison";

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

  const { brief, providersByService, leadsByProviderId, progress } = data;

  const progressSteps: { key: keyof typeof progress; label: string }[] = [
    { key: "created", label: "Event created" },
    { key: "contacted", label: "Providers contacted" },
    { key: "quoted", label: "Quotes received" },
    { key: "booked", label: "Services booked" },
    { key: "completed", label: "Event completed" },
  ];

  return (
    <main className="min-h-screen bg-[#f6f6f4]">
      <SiteHeader />

      <section className="bg-[#ff5a40] px-5 py-12 text-white md:py-14">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-white/85">
            Your event
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
            {brief.title || brief.occasion}
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

      <section className="mx-auto max-w-5xl px-5 pt-8">
        <div className="rounded-[24px] border border-[#deded9] bg-white p-6 shadow-sm md:p-8">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.14em] text-[#8a8a8a]">
            Event progress
          </p>

          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {progressSteps.map((step, index) => {
              const done = progress[step.key];
              return (
                <div key={step.key} className="flex items-center gap-2.5">
                  <span
                    className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                      done ? "bg-[#ff5a40] text-white" : "border border-[#deded9] bg-white text-[#c7c7c7]"
                    }`}
                  >
                    {done ? <Check size={14} strokeWidth={3} /> : index + 1}
                  </span>
                  <span className={`text-sm font-black ${done ? "text-[#111111]" : "text-[#9aa4b5]"}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-10 md:py-14">
        <EventQuoteComparison
          providersByService={providersByService}
          leadsByProviderId={leadsByProviderId}
          serviceLabels={Object.fromEntries(brief.serviceSlugs.map((slug) => [slug, serviceLabel(slug)]))}
        />

        <EventBriefProviderSelector
          eventId={brief.id}
          providersByService={providersByService}
          leadsByProviderId={leadsByProviderId}
          serviceLabels={Object.fromEntries(brief.serviceSlugs.map((slug) => [slug, serviceLabel(slug)]))}
        />
      </section>

      <SiteFooter />
    </main>
  );
}
