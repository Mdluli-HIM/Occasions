"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { serviceOptions, eventOptions, budgetOptions, guestOptions } from "@/data/search-results";
import { apiClient, type EventBrief } from "@/lib/api";
import { Check } from "lucide-react";

const realServices = serviceOptions.filter((option) => option.value !== "any");
const realOccasions = eventOptions.filter((option) => option.value !== "any");

export default function NewEventBriefPage() {
  const router = useRouter();
  const [occasion, setOccasion] = useState("");
  const [location, setLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [guests, setGuests] = useState("any");
  const [budget, setBudget] = useState("any");
  const [notes, setNotes] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleService(slug: string) {
    setServices((current) =>
      current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug],
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!occasion) {
      setError("Please select what you're planning.");
      return;
    }
    if (!location.trim()) {
      setError("Please tell us where your event is.");
      return;
    }
    if (services.length === 0) {
      setError("Select at least one service you need.");
      return;
    }

    setSubmitting(true);

    try {
      const brief = await apiClient<EventBrief>("/api/events", {
        method: "POST",
        body: {
          occasion,
          location,
          eventDate,
          guests: guests === "any" ? "" : guests,
          budget: budget === "any" ? "" : budget,
          notes,
          serviceSlugs: services,
        },
      });

      router.push(`/events/${brief.id}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong creating your event. Please try again.",
      );
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f6f4]">
      <SiteHeader />

      <section className="bg-[#ff5a40] px-5 py-14 text-center text-white md:py-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-white/85">
            Plan your event
          </p>
          <h1 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
            Tell us what you're planning
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base font-semibold leading-7 text-white/95">
            One form, every service you need. We'll match you with relevant
            providers for each one.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-10 md:py-14">
        <form
          onSubmit={handleSubmit}
          className="grid gap-6 rounded-[28px] border border-[#deded9] bg-white p-6 shadow-sm md:p-8"
        >
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-[#8a8a8a]">
              What are you planning?
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {realOccasions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setOccasion(option.value)}
                  className={`min-h-12 rounded-[14px] border px-3 text-sm font-black transition ${
                    occasion === option.value
                      ? "border-[#ff5a40] bg-[#fff0ec] text-[#ff5a40]"
                      : "border-[#deded9] bg-white text-[#111111] hover:border-[#ff5a40] hover:text-[#ff5a40]"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#8a8a8a]">
              Where is the event?
            </span>
            <input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Example: Polokwane"
              className="min-h-14 w-full rounded-[16px] border border-[#deded9] bg-white px-4 text-sm font-bold text-[#111111] outline-none transition placeholder:text-[#8a8a8a] focus:border-[#ff5a40] focus:ring-4 focus:ring-[#fff0ec]"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#8a8a8a]">
                Event date
              </span>
              <input
                type="date"
                value={eventDate}
                onChange={(event) => setEventDate(event.target.value)}
                className="min-h-14 w-full rounded-[16px] border border-[#deded9] bg-white px-4 text-sm font-bold text-[#111111] outline-none transition focus:border-[#ff5a40] focus:ring-4 focus:ring-[#fff0ec]"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#8a8a8a]">
                Guest count
              </span>
              <select
                value={guests}
                onChange={(event) => setGuests(event.target.value)}
                className="min-h-14 w-full rounded-[16px] border border-[#deded9] bg-white px-4 text-sm font-bold text-[#111111] outline-none transition focus:border-[#ff5a40] focus:ring-4 focus:ring-[#fff0ec]"
              >
                {guestOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#8a8a8a]">
              Budget
            </span>
            <select
              value={budget}
              onChange={(event) => setBudget(event.target.value)}
              className="min-h-14 w-full rounded-[16px] border border-[#deded9] bg-white px-4 text-sm font-bold text-[#111111] outline-none transition focus:border-[#ff5a40] focus:ring-4 focus:ring-[#fff0ec]"
            >
              {budgetOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-[#8a8a8a]">
              Services you need
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {realServices.map((option) => {
                const isSelected = services.includes(option.value);
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => toggleService(option.value)}
                    className={`flex min-h-12 items-center justify-between gap-2 rounded-[14px] border px-3 text-sm font-black transition ${
                      isSelected
                        ? "border-[#ff5a40] bg-[#fff0ec] text-[#ff5a40]"
                        : "border-[#deded9] bg-white text-[#111111] hover:border-[#ff5a40] hover:text-[#ff5a40]"
                    }`}
                  >
                    {option.label}
                    {isSelected ? <Check size={16} /> : null}
                  </button>
                );
              })}
            </div>
          </div>

          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#8a8a8a]">
              Anything else providers should know?
            </span>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Example: outdoor venue, need setup by 2pm, vegetarian options required"
              className="min-h-32 w-full resize-none rounded-[16px] border border-[#deded9] bg-white p-4 text-sm font-bold leading-6 outline-none transition placeholder:text-[#8a8a8a] focus:border-[#ff5a40] focus:ring-4 focus:ring-[#fff0ec]"
            />
          </label>

          {error ? <p className="text-sm font-bold text-[#ff5a40]">{error}</p> : null}

          <button
            type="submit"
            disabled={submitting}
            className="min-h-14 w-full rounded-[16px] bg-[#ff5a40] px-5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#ed422b] hover:shadow-[0_14px_30px_rgba(255,90,64,0.28)] disabled:opacity-60"
          >
            {submitting ? "Finding providers..." : "Find Providers"}
          </button>
        </form>
      </section>

      <SiteFooter />
    </main>
  );
}
