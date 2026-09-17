import Link from "next/link";
import {
  ArrowRight,
  Handshake,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { apiServer } from "@/lib/api-server";

export const metadata = {
  title: "About | Occasions",
  description:
    "Occasions is the trusted marketplace for finding and comparing event service providers across South Africa.",
};

type PlatformStats = {
  providerCount: number;
  provinceCount: number;
  serviceCount: number;
  occasionCount: number;
  topAreas: string[];
};

// Marketing-style estimate: floors to a milestone and adds "+", e.g. 13 -> "10+".
// Always floors (never rounds up) so the "+" is never an overstatement —
// "10+" is true whether the real number is 10 or 19; "20+" would be a lie at 13.
function formatMilestone(value: number): string {
  if (value < 5) return String(value);
  if (value < 10) return "5+";
  if (value < 25) return `${Math.floor(value / 10) * 10}+`;
  if (value < 100) return `${Math.floor(value / 25) * 25}+`;
  if (value < 1000) return `${Math.floor(value / 100) * 100}+`;
  return `${Math.floor(value / 1000) * 1000}+`;
}

const values = [
  {
    icon: ShieldCheck,
    title: "Trust, verified",
    description:
      "Providers can be verified and their listings show real response times, ratings and reviews — no guesswork before you send a quote request.",
  },
  {
    icon: MapPin,
    title: "Built for South Africa",
    description:
      "From funerals to weddings to church events, Occasions is organised around the occasions and services South African families actually search for.",
  },
  {
    icon: Handshake,
    title: "Fair to providers",
    description:
      "Listing packages are simple and transparent, so small and growing service providers can compete for visibility alongside larger businesses.",
  },
];

export default async function AboutPage() {
  let platformStats: PlatformStats = {
    providerCount: 0,
    provinceCount: 0,
    serviceCount: 0,
    occasionCount: 0,
    topAreas: [],
  };

  try {
    platformStats = await apiServer<PlatformStats>("/api/stats");
  } catch (error) {
    console.error("Failed to load platform stats:", error);
  }

  const stats = [
    { value: formatMilestone(platformStats.providerCount), label: "Providers listed" },
    { value: formatMilestone(platformStats.provinceCount), label: "Provinces served" },
    { value: formatMilestone(platformStats.serviceCount), label: "Service categories" },
    { value: formatMilestone(platformStats.occasionCount), label: "Occasion types" },
  ];

  return (
    <div className="min-h-screen bg-[#f6f6f4] text-[#111111]">
      <SiteHeader />

      <main>
        <section className="border-b border-[#eee8e3] bg-white px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#ff5a40]">
              About Occasions
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
              Making it easy to plan life&apos;s biggest occasions
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#596273]">
              Occasions is the trusted marketplace for finding and comparing
              event service providers across South Africa — catering, tents,
              décor, sound, photography and more, all in one organised place.
            </p>
          </div>
        </section>

        <section className="px-5 py-14 md:px-8">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[24px] border border-[#eee8e3] bg-white p-6 text-center shadow-sm"
              >
                <p className="text-4xl font-black text-[#ff5a40]">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-bold text-[#596273]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white px-5 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[#ff5a40]">
                  Our story
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
                  Planning an occasion shouldn&apos;t mean forty phone calls
                </h2>

                <p className="mt-5 text-base leading-8 text-[#596273]">
                  Whether it&apos;s a wedding, a funeral, a birthday party or a
                  church gathering, finding reliable caterers, tent hire, décor
                  and equipment providers has traditionally meant word-of-mouth,
                  WhatsApp groups and a lot of uncertainty.
                </p>

                <p className="mt-4 text-base leading-8 text-[#596273]">
                  Occasions brings that search online: compare providers by
                  location, service, occasion, budget and guest count, see real
                  pricing estimates and reviews, and send a quote request
                  directly — all before you pick up the phone.
                </p>
              </div>

              <div className="rounded-[28px] border border-[#eee8e3] bg-[#f6f6f4] p-8">
                <Sparkles size={32} className="text-[#ff5a40]" />

                <h3 className="mt-5 text-xl font-black">For providers, too</h3>

                <p className="mt-3 text-base leading-7 text-[#596273]">
                  Providers get a real business listing, a dashboard to manage
                  leads, and visibility in front of customers actively searching
                  for their services — in the areas and occasions they actually
                  serve.
                </p>

                <Link
                  href="/list-your-business"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#ff5a40] transition hover:gap-3"
                >
                  List your business
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#ff5a40]">
                What we care about
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
                Built on trust, locality and fairness
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-[24px] border border-[#eee8e3] bg-white p-7 shadow-sm"
                >
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-[#fff0ec] text-[#ff5a40]">
                    <value.icon size={22} />
                  </div>

                  <h3 className="mt-5 text-lg font-black">{value.title}</h3>

                  <p className="mt-3 text-sm leading-7 text-[#596273]">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[#eee8e3] bg-white px-5 py-16 text-center md:px-8">
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            Ready to get started?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#596273]">
            Search trusted providers for your next occasion, or list your
            business and start receiving qualified leads.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/search"
              className="inline-flex min-h-14 items-center justify-center rounded-[16px] bg-[#ff5a40] px-7 text-sm font-black text-white transition hover:bg-[#111111]"
            >
              Find a provider
            </Link>

            <Link
              href="/list-your-business"
              className="inline-flex min-h-14 items-center justify-center rounded-[16px] border border-[#deded9] bg-white px-7 text-sm font-black text-[#111111] transition hover:border-[#ff5a40] hover:text-[#ff5a40]"
            >
              List your business
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
