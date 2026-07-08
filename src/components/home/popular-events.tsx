import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { eventTypes } from "@/data/homepage";
import { SectionHeading } from "@/components/ui/section-heading";

export function PopularEvents() {
  return (
    <section id="events" className="px-5 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Browse by occasion"
          title="Plan by event type"
          description="Many customers start with the occasion they are planning. Occasions helps them discover the services usually needed for that function."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {eventTypes.map((event) => (
            <Link
              href={`/search?event=${event.id}`}
              key={event.id}
              className="group rounded-3xl border border-[#deded9] bg-white p-7 shadow-sm transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-[#ffb8ad] hover:shadow-[0_18px_45px_rgba(17,17,17,0.08)]"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff0ec] text-[#ff5a40] transition-all duration-500 ease-out group-hover:bg-[#ffe1da]">
                <CalendarDays size={27} />
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-black text-[#111111] transition-colors duration-500 group-hover:text-[#1a1a1a]">
                  {event.name}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#6f6f6f]">
                  {event.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
