import Link from "next/link";
import { redirect } from "next/navigation";
import { CalendarDays, MapPin } from "lucide-react";
import { CustomerDashboardShell } from "@/components/customer-dashboard/customer-dashboard-shell";
import { BookingReviewForm } from "@/components/bookings/booking-review-form";
import { apiServer } from "@/lib/api-server";
import type { CustomerBooking } from "@/lib/api";

const STATUS_STYLES: Record<CustomerBooking["status"], string> = {
  Requested: "bg-[#fff0ec] text-[#ff5a40]",
  Confirmed: "bg-[#ecfdf5] text-[#059669]",
  Declined: "bg-[#fef2f2] text-[#dc2626]",
  Completed: "bg-[#f6f6f4] text-[#111111]",
  Cancelled: "bg-[#f6f6f4] text-[#9aa4b5]",
};

export default async function DashboardBookingsPage() {
  let bookings: CustomerBooking[];

  try {
    bookings = await apiServer<CustomerBooking[]>("/api/me/bookings");
  } catch (error) {
    const status = (error as { status?: number })?.status;
    if (status === 401) redirect("/login?next=/dashboard/bookings");
    throw error;
  }

  return (
    <CustomerDashboardShell
      title="My Bookings"
      description="Providers you've booked for your events, and where each one stands."
    >
      {bookings.length === 0 ? (
        <div className="rounded-[26px] border border-dashed border-[#deded9] bg-white p-10 text-center">
          <p className="text-base font-bold text-[#111111]">
            No bookings yet.
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm font-semibold text-[#6b7280]">
            Once you accept a quote on one of your events, it&apos;ll show up here.
          </p>
          <Link
            href="/dashboard/events"
            className="mt-5 inline-flex min-h-[48px] items-center gap-2 rounded-[14px] bg-[#ff5a40] px-5 text-sm font-black text-white transition hover:bg-[#ed422b]"
          >
            View my events
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <article
              key={booking.id}
              className="rounded-[24px] border border-[#deded9] bg-white p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-black ${STATUS_STYLES[booking.status]}`}
                  >
                    {booking.status}
                  </span>

                  <p className="mt-3 text-lg font-black text-[#111111]">
                    {booking.providerName}
                  </p>
                  <p className="text-sm font-bold text-[#6b7280]">
                    {booking.service} · {booking.eventTitle || booking.eventOccasion}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-4 text-xs font-bold text-[#6b7280]">
                    {booking.eventDate ? (
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays size={14} />
                        {booking.eventDate}
                      </span>
                    ) : null}
                    {booking.location ? (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={14} />
                        {booking.location}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-black text-[#111111]">
                    R{booking.price.toLocaleString("en-ZA")}
                  </p>
                  <Link
                    href={`/events/${booking.eventId}`}
                    className="mt-2 inline-block text-xs font-black text-[#ff5a40] hover:underline"
                  >
                    View event →
                  </Link>
                </div>
              </div>

              {booking.status === "Completed" && !booking.hasReview ? (
                <div className="mt-4 border-t border-[#eee8e3] pt-4">
                  <BookingReviewForm bookingId={booking.id} />
                </div>
              ) : booking.status === "Completed" && booking.hasReview ? (
                <p className="mt-4 border-t border-[#eee8e3] pt-4 text-xs font-black text-[#059669]">
                  ✓ You reviewed this booking
                </p>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </CustomerDashboardShell>
  );
}
