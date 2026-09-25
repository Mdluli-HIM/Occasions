"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient, type Booking } from "@/lib/api";

export function BookButton({ leadId }: { leadId: string }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleBook() {
    setSubmitting(true);
    setError(null);
    try {
      await apiClient<Booking>(`/api/me/leads/${leadId}/book`, { method: "POST" });
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't book this provider.");
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={handleBook}
        disabled={submitting}
        className="inline-flex min-h-[38px] items-center justify-center rounded-[12px] bg-[#111111] px-4 text-xs font-black text-white transition hover:bg-[#ff5a40] disabled:opacity-60"
      >
        {submitting ? "Booking..." : "Book this provider"}
      </button>
      {error ? <p className="text-xs font-bold text-[#ff5a40]">{error}</p> : null}
    </div>
  );
}
