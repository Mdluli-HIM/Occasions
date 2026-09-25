import { revalidatePath } from "next/cache";
import { CalendarDays, MapPin } from "lucide-react";
import { ProviderDashboardShell } from "@/components/provider-dashboard/provider-dashboard-shell";
import { apiServer } from "@/lib/api-server";
import type { ProviderBooking } from "@/lib/api";

const STATUS_STYLES: Record<ProviderBooking["status"], string> = {
  Requested: "bg-[#fff0ec] text-[#ff5a40]",
  Confirmed: "bg-[#ecfdf5] text-[#059669]",
  Declined: "bg-[#fef2f2] text-[#dc2626]",
  Completed: "bg-[#f6f6f4] text-[#111111]",
  Cancelled: "bg-[#f6f6f4] text-[#9aa4b5]",
};

async function updateBookingStatus(formData: FormData) {
  "use server";
  const bookingId = String(formData.get("bookingId"));
  const status = String(formData.get("status"));
  await apiServer(`/api/providers/me/bookings/${bookingId}`, {
    method: "PATCH",
    body: { status },
  });
  revalidatePath("/provider-dashboard/bookings");
}

export default async function ProviderBookingsPage() {
  const bookings = await apiServer<ProviderBooking[]>("/api/providers/me/bookings");

  return (
    <ProviderDashboardShell
      title="Bookings"
      description="Customers who've accepted your quote — confirm or decline each one."
    >
      {bookings.length === 0 ? (
        <div className="rounded-[26px] border border-dashed border-[#deded9] bg-white p-10 text-center text-sm font-bold text-[#7b8495]">
          No bookings yet — they'll appear here once a customer accepts one of your quotes.
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
                    {booking.customerName}
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
                </div>
              </div>

              {booking.status === "Requested" ? (
                <div className="mt-5 flex gap-3 border-t border-[#eee8e3] pt-5">
                  <form action={updateBookingStatus}>
                    <input type="hidden" name="bookingId" value={booking.id} />
                    <input type="hidden" name="status" value="Confirmed" />
                    <button
                      type="submit"
                      className="inline-flex min-h-[44px] items-center justify-center rounded-[12px] bg-[#111111] px-5 text-sm font-black text-white transition hover:bg-[#ff5a40]"
                    >
                      Confirm booking
                    </button>
                  </form>
                  <form action={updateBookingStatus}>
                    <input type="hidden" name="bookingId" value={booking.id} />
                    <input type="hidden" name="status" value="Declined" />
                    <button
                      type="submit"
                      className="inline-flex min-h-[44px] items-center justify-center rounded-[12px] border border-[#deded9] bg-white px-5 text-sm font-black text-[#596273] transition hover:border-[#ff5a40] hover:text-[#ff5a40]"
                    >
                      Decline
                    </button>
                  </form>
                </div>
              ) : booking.status === "Confirmed" ? (
                <div className="mt-5 border-t border-[#eee8e3] pt-5">
                  <form action={updateBookingStatus}>
                    <input type="hidden" name="bookingId" value={booking.id} />
                    <input type="hidden" name="status" value="Completed" />
                    <button
                      type="submit"
                      className="inline-flex min-h-[44px] items-center justify-center rounded-[12px] border border-[#deded9] bg-white px-5 text-sm font-black text-[#596273] transition hover:border-[#ff5a40] hover:text-[#ff5a40]"
                    >
                      Mark as completed
                    </button>
                  </form>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </ProviderDashboardShell>
  );
}
