import { Star } from "lucide-react";
import { ProviderDashboardShell } from "@/components/provider-dashboard/provider-dashboard-shell";
import { apiServer } from "@/lib/api-server";

type ProviderReview = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  service: string;
  createdAt: string;
};

export default async function ProviderReviewsPage() {
  const reviews = await apiServer<ProviderReview[]>("/api/providers/me/reviews");

  const average =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "0.0";

  return (
    <ProviderDashboardShell
      title="Reviews"
      description="What customers are saying after a completed booking — every review here is tied to a real transaction."
    >
      <div className="mb-6 flex items-center gap-4 rounded-[26px] border border-[#deded9] bg-white p-6 shadow-sm">
        <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[#fff0ec] text-2xl font-black text-[#ff5a40]">
          {average}
        </div>
        <div>
          <p className="text-lg font-black text-[#111111]">
            {reviews.length} review{reviews.length === 1 ? "" : "s"}
          </p>
          <p className="text-sm font-semibold text-[#6b7280]">
            All verified against a completed Occasions booking.
          </p>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="rounded-[26px] border border-dashed border-[#deded9] bg-white p-10 text-center text-sm font-bold text-[#7b8495]">
          No reviews yet — they'll appear here once a customer reviews a completed booking.
        </div>
      ) : (
        <div className="grid gap-4">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="rounded-[24px] border border-[#deded9] bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-black text-[#111111]">{review.name}</p>
                  <p className="text-sm font-bold text-[#8a8a8a]">{review.service}</p>
                </div>

                <div className="flex items-center gap-1 font-black text-[#111111]">
                  <Star size={16} className="fill-[#ff5a40] text-[#ff5a40]" />
                  {review.rating}
                </div>
              </div>

              <p className="mt-4 leading-7 text-[#343434]">{review.comment}</p>

              <p className="mt-3 text-xs font-bold text-[#9aa4b5]">
                {new Date(review.createdAt).toLocaleDateString("en-ZA", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </article>
          ))}
        </div>
      )}
    </ProviderDashboardShell>
  );
}
