"use client";

import { useState } from "react";
import Link from "next/link";
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
  includes: string[];
  excludes: string[];
};

const packages: ProviderPackage[] = [
  {
    tag: "Starter",
    name: "Starter Listing",
    price: "R729",
    period: "once-off",
    subPrice: "",
    description:
      "A simple provider profile for businesses that want to be found and contacted directly.",
    cta: "List Your Business",
    featured: false,
    includes: [
      "Provider profile",
      "Photo gallery",
      "Service and area listing",
      "Call, email and WhatsApp enquiries",
    ],
    excludes: [
      "Featured search placement",
      "Monthly enquiry report",
    ],
  },
  {
    tag: "Most Popular",
    name: "Featured Provider",
    price: "R2 849",
    period: "setup",
    subPrice: "R199 / month",
    description:
      "Better visibility for providers who want more serious quote enquiries.",
    cta: "Choose Featured",
    featured: true,
    includes: [
      "Everything in Starter",
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
    tag: "Premium",
    name: "Premium Partner",
    price: "Custom",
    period: "monthly",
    subPrice: "Built around your goals",
    description:
      "For providers who want stronger exposure and custom growth support.",
    cta: "Talk to Us",
    featured: false,
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

const faqs = [
  {
    question: "How long will my business be advertised for?",
    answer:
      "Your listing stays active while your selected package is active. For the starter package, the listing is designed around a 3-month visibility period.",
  },
  {
    question: "What is the process to list my business?",
    answer:
      "Choose a package, send your business details, then Occasions reviews the listing information before publishing the provider profile.",
  },
  {
    question: "How do customers contact me?",
    answer:
      "Customers can request a quote, call, email or WhatsApp the provider depending on the contact options added to the listing.",
  },
  {
    question: "Can I edit my listing later?",
    answer:
      "Yes. The provider dashboard will later allow businesses to update services, photos, pricing, areas served and contact details.",
  },
  {
    question: "What information should I provide?",
    answer:
      "Business name, service category, photos, areas served, price guidance, capacity, contact details and a short description of what you offer.",
  },
  {
    question: "Can I promote my listing?",
    answer:
      "Yes. Featured placement is planned for businesses that want stronger visibility in search results and category pages.",
  },
];

export default function ListYourBusinessPage() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <Header />

      <section className="bg-[#ff5a40] px-5 py-16 text-center text-white md:py-20 !text-white [&_*]:!text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-black tracking-tight md:text-6xl">
            List Your Event Business
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg font-semibold leading-8 text-white/95 md:text-xl">
            Get discovered by people planning weddings, funerals, parties,
            church events, corporate functions and traditional ceremonies.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#packages"
              className="inline-flex min-h-[52px] min-w-[160px] items-center justify-center rounded-[14px] bg-[#111111] px-7 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-black"
            >
              View Packages
            </a>
          </div>
        </div>
      </section>

      <section id="packages" className="bg-[#f4f5f8] px-5 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff5a40]">
              Provider packages
            </p>

            <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-light tracking-tight text-[#171436] md:text-5xl">
              Choose the package that fits your business.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base font-semibold leading-7 text-[#596273]">
              Simple options for getting listed, getting seen, and receiving better enquiries.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-7xl rounded-[34px] bg-[#e8ebf4] p-4 shadow-[0_24px_70px_rgba(17,17,17,0.06)] md:p-6">
            <div className="grid gap-4 lg:grid-cols-3">
              {packages.map((item, index) => (
                <article
                  key={item.name}
                  className={`flex min-h-[560px] flex-col rounded-[26px] p-7 transition hover:-translate-y-1 ${
                    index === 0
                      ? "bg-transparent"
                      : "bg-white shadow-[0_16px_45px_rgba(17,17,17,0.06)]"
                  } ${
                    item.featured
                      ? "border border-[#ff5a40]/40"
                      : "border border-white/60"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex size-12 shrink-0 items-center justify-center rounded-[16px] border ${
                        item.featured
                          ? "border-[#ff5a40]/30 bg-white text-[#ff5a40]"
                          : "border-[#d8deea] bg-white text-[#171436]"
                      }`}
                    >
                      <Check size={20} />
                    </div>

                    <div>
                      <p className="text-lg font-black text-[#171436]">
                        {item.name}
                      </p>

                      <p
                        className={`mt-1 text-xs font-black uppercase tracking-[0.14em] ${
                          item.featured ? "text-[#ff5a40]" : "text-[#7b8495]"
                        }`}
                      >
                        {item.tag}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <p className="text-4xl font-light tracking-tight text-[#171436]">
                      <span className="font-black">{item.price}</span>
                      <span className="ml-2 text-base font-black">
                        {item.period}
                      </span>
                    </p>

                    {item.subPrice ? (
                      <p className="mt-3 text-base font-black text-[#ff5a40]">
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
                      href="/provider-onboarding"
                      className={`flex min-h-[52px] items-center justify-center gap-2 rounded-[14px] px-6 text-sm font-black transition hover:-translate-y-0.5 ${
                        item.featured
                          ? "bg-[#ff5a40] text-white hover:bg-[#ed422b]"
                          : "border border-[#d8deea] bg-white text-[#171436] hover:border-[#ff5a40] hover:text-[#ff5a40]"
                      } !text-white [&_*]:!text-white`}
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

      


      <Footer />
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
            Packages
          </a>
          <Link href="/search" className="transition hover:text-[#ff5a40]">
            Browse Providers
          </Link>
        </nav>

        <Link
          href="/provider-onboarding"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[12px] bg-[#ff5a40] px-5 text-sm font-black text-white transition hover:bg-[#ed422b] !text-white [&_*]:!text-white"
        >
          Get Started
          <ArrowRight size={17} className="text-current" />
        </Link>
      </div>
    </header>
  );
}

function Footer() {
  const footerGroups: Array<{
    title: string;
    links: Array<{
      label: string;
      href: string;
    }>;
  }> = [
    {
      title: "For Customers",
      links: [
        { label: "Browse Providers", href: "/search" },
        { label: "Catering Services", href: "/search" },
        { label: "Event Rentals", href: "/search" },
        { label: "Venues", href: "/search" },
        { label: "Photography", href: "/search" },
        { label: "Décor & Styling", href: "/search" },
      ],
    },
    {
      title: "For Providers",
      links: [
        { label: "List Your Business", href: "/list-your-business" },
        { label: "Provider Packages", href: "/list-your-business#packages" },
        { label: "Featured Listings", href: "/list-your-business#packages" },
        { label: "Provider Login", href: "/list-your-business" },
      ],
    },
    {
      title: "Occasions",
      links: [
        { label: "Weddings", href: "/search" },
        { label: "Funerals", href: "/search" },
        { label: "Birthday Parties", href: "/search" },
        { label: "Church Events", href: "/search" },
        { label: "Traditional Ceremonies", href: "/search" },
        { label: "Corporate Functions", href: "/search" },
      ],
    },
    {
      title: "Tools",
      links: [
        { label: "Budget Guide", href: "/search" },
        { label: "Guest Count Planner", href: "/search" },
        { label: "Service Checklist", href: "/search" },
        { label: "Provider Alerts", href: "/search" },
        { label: "Planning Tips", href: "/search" },
        { label: "Download the App", href: "/search" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/" },
        { label: "Careers", href: "/" },
        { label: "Help Centre", href: "/" },
        { label: "Terms & Conditions", href: "/" },
        { label: "Privacy Policy", href: "/" },
      ],
    },
  ];

  return (
    <footer className="min-h-[100svh] bg-[#0d1f29] px-5 py-14 text-white md:px-8 md:py-20">
      <div className="mx-auto flex min-h-[calc(100svh-112px)] max-w-7xl flex-col">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <Link
            href="/"
            className="flex size-14 items-center justify-center rounded-full bg-[#ff3158] text-2xl font-black text-white transition hover:scale-105"
            aria-label="Occasions home"
          >
            O
          </Link>

          <div className="flex flex-wrap items-center gap-5 text-sm font-black text-white">
            {["f", "𝕏", "in", "ig", "▶"].map((item) => (
              <a
                key={item}
                href="#"
                className="flex size-10 items-center justify-center rounded-full border border-white/10 text-white/90 transition hover:border-[#ff5a40] hover:bg-[#ff5a40] hover:text-white !text-white [&_*]:!text-white"
                aria-label={`Occasions social ${item}`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-blacpercase tracking-[0.08em] text-white">
                {group.title}
              </h3>

              <div className="mt-7 grid gap-4">
                {group.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-base font-medium leading-6 text-white/80 transition hover:text-[#ff5a40]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {group.title === "For Providers" || group.title === "Tools" ? (
                <div className="mt-7 h-px w-full bg-white/12" />
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-auto pt-16">
          <div className="flex flex-col gap-5 border-t border-white/10 pt-8 text-sm font-medium text-white/50 md:flex-row md:items-center md:justify-between">
            <p>© Copyright 2026 - Occasions South Africa. All Rights Reserved.</p>

           <div className="flex flex-wrap gap-x-6 gap-y-3">
              <Link href="/" className="transition hover:text-[#ff5a40]">
                Privacy Policy
              </Link>
              <Link href="/" className="transition hover:text-[#ff5a40]">
                Provider Terms
              </Link>
              <Link href="/" className="transition hover:text-[#ff5a40]">
                PAIA Manual
              </Link>
              <Link href="/" className="transition hover:text-[#ff5a40]">
                Cookie Preferences
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

