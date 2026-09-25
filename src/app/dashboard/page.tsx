import Link from "next/link";
import { redirect } from "next/navigation";
import { CalendarDays, MapPin, Plus, FileText, MessageCircle, CheckCircle2, PartyPopper } from "lucide-react";
import { CustomerDashboardShell } from "@/components/customer-dashboard/customer-dashboard-shell";
import { apiServer } from "@/lib/api-server";
import type { EventSummary, ActivityItem } from "@/lib/api";

const ACTIVITY_ICON: Record<ActivityItem["type"], typeof FileText> = {
  quote: FileText,
  message: MessageCircle,
  booking_confirmed: CheckCircle2,
  booking_completed: PartyPopper,
};

function activityHref(item: ActivityItem): string {
  if (item.type === "booking_confirmed" || item.type === "booking_completed") {
    return "/dashboard/bookings";
  }
  if (item.type === "quote" && item.eventId) {
    return `/events/${item.eventId}`;
  }
  return `/dashboard/messages/${item.leadId}`;
}

export default async function DashboardPage() {
  let events: EventSummary[];

  let activity: ActivityItem[] = [];

  try {
    events = await apiServer<EventSummary[]>("/api/events/me");
  } catch (error) {
    const status = (error as { status?: number })?.status;
    if (status === 401) redirect("/login?next=/dashboard");
    throw error;
  }

  try {
    activity = await apiServer<ActivityItem[]>("/api/me/activity");
  } catch {
    // Non-critical — the dashboard still works without the activity feed.
  }

  const recentEvents = events.slice(0, 3);

  return (
    <CustomerDashboardShell
      title="My Occasions"
      description="Everything you're planning, and everyone helping you plan it, in one place."
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-black tracking-tight text-[#111111]">
          Your events
        </h2>
        <Link
          href="/events/new"
          className="inline-flex min-h-[46px] items-center gap-2 rounded-[14px] bg-[#ff5a40] px-4 text-sm font-black text-white transition hover:bg-[#ed422b]"
        >
          <Plus size={16} />
          Plan a new event
        </Link>
      </div>

      {recentEvents.length === 0 ? (
        <div className="rounded-[26px] border border-dashed border-[#deded9] bg-white p-10 text-center">
          <p className="text-base font-bold text-[#111111]">
            You haven&apos;t planned an event yet.
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm font-semibold text-[#6b7280]">
            Tell us what you&apos;re planning and we&apos;ll match you with
            providers for every service you need.
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
          {recentEvents.map((event) => (
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
              </div>

              <p className="mt-4 text-xs font-black uppercase tracking-[0.1em] text-[#ff5a40]">
                {event.serviceCount} service{event.serviceCount === 1 ? "" : "s"} ·{" "}
                {event.enquiryCount} enquir{event.enquiryCount === 1 ? "y" : "ies"}
              </p>
            </Link>
          ))}
        </div>
      )}

      {events.length > 3 ? (
        <div className="mt-6 text-center">
          <Link
            href="/dashboard/events"
            className="text-sm font-black text-[#ff5a40] hover:underline"
          >
            View all {events.length} events →
          </Link>
        </div>
      ) : null}

      {activity.length > 0 ? (
        <div className="mt-10">
          <h2 className="mb-4 text-xl font-black tracking-tight text-[#111111]">
            Recent activity
          </h2>

          <div className="grid gap-3">
            {activity.map((item) => {
              const Icon = ACTIVITY_ICON[item.type];
              return (
                <Link
                  key={`${item.type}-${item.id}`}
                  href={activityHref(item)}
                  className="flex items-center gap-4 rounded-[18px] border border-[#deded9] bg-white p-4 transition hover:border-[#ff5a40] hover:shadow-sm"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#fff0ec] text-[#ff5a40]">
                    <Icon size={18} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-black text-[#111111]">
                      {item.providerName}
                    </span>
                    <span className="block truncate text-xs font-semibold text-[#6b7280]">
                      {item.detail}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </CustomerDashboardShell>
  );
}
