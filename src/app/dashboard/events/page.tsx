import Link from "next/link";
import { redirect } from "next/navigation";
import { CalendarDays, MapPin, Plus } from "lucide-react";
import { CustomerDashboardShell } from "@/components/customer-dashboard/customer-dashboard-shell";
import { apiServer } from "@/lib/api-server";
import type { EventSummary } from "@/lib/api";

export default async function DashboardEventsPage() {
  let events: EventSummary[];

  try {
    events = await apiServer<EventSummary[]>("/api/events/me");
  } catch (error) {
    const status = (error as { status?: number })?.status;
    if (status === 401) redirect("/login?next=/dashboard/events");
    throw error;
  }

  return (
    <CustomerDashboardShell
      title="My Events"
      description="Every event you're planning, with the services and enquiries attached to each one."
    >
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm font-black uppercase tracking-[0.14em] text-[#8a8a8a]">
          {events.length} event{events.length === 1 ? "" : "s"}
        </p>
        <Link
          href="/events/new"
          className="inline-flex min-h-[46px] items-center gap-2 rounded-[14px] bg-[#ff5a40] px-4 text-sm font-black text-white transition hover:bg-[#ed422b]"
        >
          <Plus size={16} />
          Plan a new event
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="rounded-[26px] border border-dashed border-[#deded9] bg-white p-10 text-center">
          <p className="text-base font-bold text-[#111111]">
            You haven&apos;t planned an event yet.
          </p>
          <Link
            href="/events/new"
            className="mt-5 inline-flex min-h-[48px] items-center gap-2 rounded-[14px] bg-[#ff5a40] px-5 text-sm font-black text-white transition hover:bg-[#ed422b]"
          >
            <Plus size={16} />
            Plan your first event
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="group rounded-[24px] border border-[#deded9] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#ff5a40] hover:shadow-md"
            >
              <p className="text-lg font-black text-[#111111]">
                {event.title || event.occasion}
              </p>

              <div className="mt-3 flex flex-wrap gap-3 text-xs font-bold text-[#6b7280]">
                {event.eventDate ? (
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays size={14} />
                    {event.eventDate}
                  </span>
                ) : null}
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={14} />
                  {event.location}
                </span>
                {event.guests ? <span>{event.guests}</span> : null}
              </div>

              <p className="mt-4 text-xs font-black uppercase tracking-[0.1em] text-[#ff5a40]">
                {event.serviceCount} service{event.serviceCount === 1 ? "" : "s"} ·{" "}
                {event.enquiryCount} enquir{event.enquiryCount === 1 ? "y" : "ies"}
              </p>

              <p className="mt-4 text-sm font-black text-[#111111] group-hover:text-[#ff5a40]">
                View event →
              </p>
            </Link>
          ))}
        </div>
      )}
    </CustomerDashboardShell>
  );
}
