"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import {
  ArrowRight,
  Check,
  ChevronRight,
  ChevronUp,
  Plus,
  X,
} from "lucide-react";

type ProviderPackage = {
  tag: string;
  name: string;
  price: string;
  period: string;
  subPrice: string;
  description: string;
  cta: string;
  featured: boolean;
  free: boolean;
  includes: string[];
  excludes: string[];
};

const packages: ProviderPackage[] = [
  {
    tag: "Free forever",
    name: "Free Provider Listing",
    price: "R0",
    period: "",
    subPrice: "",
    description:
      "A full business profile so customers can find, compare and contact you — no cost, no catch.",
    cta: "Create Free Listing",
    featured: false,
    free: true,
    includes: [
      "Provider profile",
      "Photo gallery",
      "Services and occasions",
      "Service areas",
      "Quote request inbox",
      "Provider dashboard",
    ],
    excludes: [
      "Featured search placement",
      "Homepage promotion",
    ],
  },
  {
    tag: "Coming soon",
    name: "Featured Provider",
    price: "R2 849",
    period: "setup",
    subPrice: "R199 / month",
    description:
      "Extra visibility for providers who want to stand out once they've got listings up and running.",
    cta: "Notify Me",
    featured: true,
    free: false,
    includes: [
      "Everything in Free",
      "Featured search placement",
      "Promoted provider badge",
      "Monthly enquiry summary",
      "Listing improvement support",
    ],
    excludes: [
      "Homepage campaign placement",
      "Dedicated account manager",
    ],
  },
  {
    tag: "Coming soon",
    name: "Premium Partner",
    price: "Custom",
    period: "monthly",
    subPrice: "Built around your goals",
    description:
      "For providers who eventually want stronger exposure and custom growth support.",
    cta: "Notify Me",
    featured: false,
    free: false,
    includes: [
      "Everything in Featured",
      "Top category placement",
      "Campaign visibility",
      "Priority support",
      "Custom profile improvements",
    ],
    excludes: [
      "Guaranteed bookings",
      "Payment processing",
    ],
  },
];

const reasons = [
  {
    title: "Reach people with real event needs",
    description:
      "Customers visit Occasions when they are already searching for catering, tents, décor, venues, sound, photography and event services.",
  },
  {
    title: "Turn visibility into quote requests",
    description:
      "Your listing gives customers the information they need before contacting you, which makes every enquiry more useful.",
 },
  {
    title: "Build trust before the first call",
    description:
      "Show your photos, services, areas served, pricing guidance and reviews so customers feel confident choosing you.",
  },
];

const faqs: { question: string; answer: string }[] = [
  {
    question: "Does my listing expire?",
    answer:
      "No. The free listing doesn't expire and isn't a trial — it's free for as long as you want to use it.",
  },
  {
    question: "What is the process to list my business?",
    answer:
      "Create your free listing in a few short steps — business details, services, occasions, areas, photos and contact info — and your profile publishes as soon as you finish.",
  },
  {
    question: "How do customers contact me?",
    answer:
      "Customers request a quote directly through your listing, which creates a lead in your provider dashboard. Call, email and WhatsApp details can also be added for customers who prefer to reach out directly.",
  },
  {
    question: "Can I edit my listing later?",
    answer:
      "Yes. The provider dashboard lets you update your services, photos, pricing guidance, areas served and contact details at any time.",
  },
  {
    question: "What information should I provide?",
    answer:
      "Business name, service category, photos, areas served, price guidance, capacity, contact details and a short description of what you offer.",
  },
  {
    question: "Can I promote my listing?",
    answer:
      "Featured and Premium placement are planned for providers who want stronger visibility in search results and category pages — free listings will always remain available alongside them.",
  },
];

export default function ListYourBusinessPage() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <Header />

      <section className="bg-[#ff5a40] px-5 py-16 text-center text-white md:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-white/85">
            100% free to join
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
            List Your Event Business — Free
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg font-semibold leading-8 text-white/95 md:text-xl">
            Get discovered by people planning weddings, funerals, parties,
            church events, corporate functions and traditional ceremonies —
            with no cost to create your listing.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/provider-onboarding"
              className="inline-flex min-h-[52px] min-w-[220px] items-center justify-center gap-2 rounded-[14px] bg-[#111111] px-7 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-black"
            >
              Create Free Listing
              <ArrowRight size={17} />
            </Link>

            <a href="#packages"
              className="inline-flex min-h-[52px] min-w-[160px] items-center justify-center rounded-[14px] border border-white/40 px-7 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              See what's included
            </a>
          </div>
        </div>
      </section>

      <section id="packages" className="bg-[#f4f5f8] px-5 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff5a40]">
              Provider listing
            </p>

            <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-light tracking-tight text-[#171436] md:text-5xl">
              Start free. Grow when you're ready.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base font-semibold leading-7 text-[#596273]">
              Every provider starts with a full free listing. Featured and
              Premium visibility are on the way for providers who want to
              stand out even more.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-7xl rounded-[34px] bg-[#e8ebf4] p-4 shadow-[0_24px_70px_rgba(17,17,17,0.06)] md:p-6">
            <div className="grid gap-4 lg:grid-cols-3">
              {packages.map((item) => (
                <article
                  key={item.name}
                  className={`flex min-h-[560px] flex-col rounded-[26px] p-7 transition hover:-translate-y-1 ${
                    item.free
                      ? "bg-white shadow-[0_16px_45px_rgba(17,17,17,0.08)]"
                      : "bg-white/60"
                  } ${
                    item.free
                      ? "border-2 border-[#ff5a40]"
                      : "border border-dashed border-[#c7cede]"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex size-12 shrink-0 items-center justify-center rounded-[16px] border ${
                        item.free
                          ? "border-[#ff5a40]/30 bg-white text-[#ff5a40]"
                          : "border-[#d8deea] bg-white text-[#9aa4b5]"
                      }`}
                    >
                      <Check size={20} />
                    </div>

                    <div>
                      <p className={`text-lg font-black ${item.free ? "text-[#171436]" : "text-[#7b8495]"}`}>
                        {item.name}
                      </p>

                      <p className={`mt-1 text-xs font-black uppercase tracking-[0.14em] ${
                          item.free ? "text-[#ff5a40]" : "text-[#9aa4b5]"
                        }`}
                      >
                        {item.tag}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <p className={`text-4xl font-light tracking-tight ${item.free ? "text-[#171436]" : "text-[#9aa4b5]"}`}>
                      <span className="font-black">{item.price}</span>
                      {item.period ? (
                        <span className="ml-2 text-base font-black">
                          {item.period}
                        </span>
                      ) : null}
                    </p>

                    {item.subPrice ? (
                      <p className={`mt-3 text-base font-black ${item.free ? "text-[#ff5a40]" : "text-[#9aa4b5]"}`}>
                        {item.subPrice}
                      </p>
                    ) : null}
                  </div>

                  <p className="mt-5 min-h-[56px] text-sm font-semibold leading-7 text-[#596273]">
                    {item.description}
                  </p>

                  <div className="mt-7">
                    <p className="text-sm font-black uppercase tracking-[0.14em] text-[#9aa4b5]">
                      Includes
                    </p>

                    <div className="mt-4 grid gap-3">
                      {item.includes.map((feature) => (
                        <div
                          key={feature}
                          className="grid grid-cols-[22px_minmax(0,1fr)] gap-3 text-sm font-black leading-6 text-[#171436]"
                        >
                          <Check size={17} className="mt-1 text-[#43c6a0]" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-7">
                    <p className="text-sm font-black uppercase tracking-[0.14em] text-[#9aa4b5]">
                      Not included
                    </p>

                    <div className="mt-4 grid gap-3">
                      {item.excludes.map((feature) => (
                        <div
                          key={feature}
                          className="grid grid-cols-[22px_minmax(0,1fr)] gap-3 text-sm font-bold leading-6 text-[#7b8495]"
                        >
                          <X size={16} className="mt-1 text-[#9aa4b5]" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto pt-9">
                    <Link
                      href={item.free ? "/provider-onboarding" : "/contact"}
                      className={`flex min-h-[52px] items-center justify-center gap-2 rounded-[14px] px-6 text-sm font-black transition hover:-translate-y-0.5 ${
                        item.free
                          ? "occasion-btn-primary bg-[#ff5a40] text-white hover:bg-[#ed422b]"
                          : "border border-[#d8deea] bg-white text-[#9aa4b5] hover:border-[#ff5a40] hover:text-[#ff5a40]"
                      }`}
                    >
                      {item.cta}
                      <ChevronRight size={17} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#e4e8ef] px-5 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff5a40]">
              Why list with us
            </p>

            <h2 className="mt-4 text-4xl font-light tracking-tight text-[#171436] md:text-5xl">
              Turn your services into better enquiries.
            </h2>

            <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-[#171436]">
              Occasions helps customers understand what you offer before they contact you, so your business receives clearer, more useful quote requests.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {reasons.map((reason, index) => (
              <article
                key={reason.title}
                className="rounded-[22px] border border-[#e1e6ee] bg-[#fbfcfe] p-7 text-left transition hover:-translate-y-1 hover:border-[#ff5a40] hover:shadow-[0_18px_45px_rgba(17,17,17,0.08)]"
              >
                <span className="flex size-12 items-center justify-center rounded-full border border-[#ff5a40]/30 bg-white text-sm font-black text-[#111111]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-7 text-xl font-black text-[#171436]">
                  {reason.title}
                </h3>

                <p className="mt-3 text-base font-medium leading-7 text-[#596273]">
                  {reason.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#e4e8ef] px-5 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-4xl font-light tracking-tight text-[#171436] md:text-5xl">
            Frequently Asked Questions
          </h2>

          <div className="mt-12">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div key={faq.question} className="border-b border-[#d9dee8]">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-6 py-7 text-left text-lg font-black text-[#596273] transition hover:text-[#ff5a40]"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp size={22} className="text-[#ff5a40]" />
                    ) : (
                      <Plus size={22} className="text-[#ff5a40]" />
                    )}
                  </button>

                  {isOpen ? (
                    <p className="pb-7 pr-10 text-base font-medium leading-8 text-[#171436]">
                      {faq.answer}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      

      <SiteFooter />
    </main>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#ece7e2] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-5 px-5 md:px-8">
        <Link href="/" className="text-3xl font-black tracking-tight !text-[#ff5a40]">
          Occasions
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-black text-[#171436] md:flex">
          <a href="#packages" className="transition hover:text-[#ff5a40]">
            Pricing
          </a>
          <Link href="/search" className="transition hover:text-[#ff5a40]">
            Browse Providers
          </Link>
        </nav>

        <Link
          href="/provider-onboarding"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[12px] occasion-btn-primary bg-[#ff5a40] px-5 text-sm font-black text-white transition hover:bg-[#ed422b]"
        >
          Get Started
          <ArrowRight size={17} className="text-current" />
        </Link>
      </div>
    </header>
  );
}
