"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { apiClient } from "@/lib/api";

export function BookingReviewForm({ bookingId }: { bookingId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    if (!comment.trim()) {
      setError("Please write a few words about your experience.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await apiClient(`/api/me/bookings/${bookingId}/review`, {
        method: "POST",
        body: { rating, comment },
      });
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't submit your review.");
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-[44px] items-center justify-center rounded-[12px] border border-[#deded9] bg-white px-5 text-sm font-black text-[#596273] transition hover:border-[#ff5a40] hover:text-[#ff5a40]"
      >
        Leave a review
      </button>
    );
  }

  const displayRating = hoveredStar ?? rating;

  return (
    <div className="mt-2 rounded-[16px] border border-[#deded9] bg-[#f6f6f4] p-4">
      <p className="mb-2 text-xs font-black uppercase tracking-[0.1em] text-[#8a8a8a]">
        Your rating
      </p>

      <div className="flex gap-1" onMouseLeave={() => setHoveredStar(null)}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onMouseEnter={() => setHoveredStar(star)}
            onClick={() => setRating(star)}
            aria-label={`${star} star${star === 1 ? "" : "s"}`}
          >
            <Star
              size={24}
              className={star <= displayRating ? "fill-[#ff5a40] text-[#ff5a40]" : "text-[#deded9]"}
            />
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder="How was your experience with this provider?"
        rows={3}
        className="mt-3 w-full resize-none rounded-[12px] border border-[#deded9] bg-white p-3 text-sm font-semibold outline-none placeholder:text-[#c7c7c7] focus:border-[#ff5a40]"
      />

      {error ? <p className="mt-2 text-xs font-bold text-[#ff5a40]">{error}</p> : null}

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
          className="min-h-[40px] rounded-[12px] bg-[#ff5a40] px-4 text-xs font-black text-white transition hover:bg-[#111111] disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit review"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="min-h-[40px] rounded-[12px] border border-[#deded9] bg-white px-4 text-xs font-black text-[#596273]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
