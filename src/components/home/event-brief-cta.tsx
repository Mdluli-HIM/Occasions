import Link from "next/link";
import { ArrowRight, CalendarCheck } from "lucide-react";

export function EventBriefCta() {
  return (
    <section className="border-y border-[#deded9] bg-white px-5 py-12 md:py-14">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 rounded-[28px] border border-[#deded9] bg-[#f6f6f4] p-8 text-center md:flex-row md:justify-between md:p-10 md:text-left">
        <div className="flex items-start gap-4">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-[18px] bg-[#fff0ec] text-[#ff5a40]">
            <CalendarCheck size={28} />
          </span>

          <div>
            <h2 className="text-xl font-black text-[#111111] md:text-2xl">
              Planning a whole event?
            </h2>
            <p className="mt-2 max-w-md text-sm font-semibold leading-6 text-[#596273]">
              Tell us what you need once — catering, tents, décor, sound and
              more — and we'll match you with providers for each one.
            </p>
          </div>
        </div>

        <Link
          href="/events/new"
          className="inline-flex min-h-14 w-full shrink-0 items-center justify-center gap-2 rounded-[16px] bg-[#ff5a40] px-7 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#ed422b] hover:shadow-[0_14px_30px_rgba(255,90,64,0.28)] md:w-auto"
        >
          Plan Your Event
          <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
}
