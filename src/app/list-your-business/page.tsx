"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronUp,
  Phone,
  Plus,
  X,
} from "lucide-react";

const packages = [
  {
    name: "Occasions Starter Listing",
    price: "R729",
    priceNote: "once-off",
    monthlyPrice: "",
    monthlyNote: "",
    description:
      "Create a polished provider profile that helps customers understand what you offer before they contact you. Add your services, event types, areas served, price guidance, capacity, photos and contact options so people planning occasions can find and enquire with you directly.",
    cta: "List Your Business",
    features: [
      "Create a searchable provider profile for your business",
      "Show your service categories, event types, areas served and capacity",
      "Add a photo gallery that helps customers trust your work",
      "Display price guidance so customers understand your starting range",
      "Appear in relevant service and location searches for 3 months",
      "Receive direct quote enquiries through call, email or WhatsApp",
      "Manage your listing details from a simple provider dashboard",
    ],
    footnote: "",
    highlighted: false,
  },
  {
    name: "Occasions Featured Partner",
    price: "R2 849",
    priceNote: "once-off setup",
    monthlyPrice: "R199",
    monthlyNote: "pm",
    description:
      "Built for providers who want stronger visibility, better trust signals and a more serious lead pipeline. Your business gets featured placement, improved listing support, enquiry tracking and guidance to help turn customer interest into real bookings.",
    cta: "Enquire",
    features: [
      "Everything included in the Starter Listing",
      "Featured placement in relevant service and area results",
      "Promoted provider badge to improve trust and visibility",
      "Priority visibility during high-demand event seasons",
      "Monthly enquiry summary with views, contact actions and quote activity",
      "Lead follow-up support so important enquiries do not get missed",
      "Listing improvement guidance for photos, wording and service presentation",
      "Access to future partner opportunities across the Occasions network",
    ],
    footnote:
      "*Monthly fee keeps featured visibility, enquiry tracking and partner tools active. Lead performance depends on service category, area, seasonality, pricing and customer demand.",
    highlighted: true,
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
  const [submitted, setSubmitted] = useState(false);

  function handleCallbackSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <Header />

      <section className="bg-[#ff5a40] px-5 py-16 text-center text-white md:py-20">
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

            <a
              href="#callback"
              className="inline-flex min-h-[52px] min-w-[180px] items-center justify-center rounded-[14px] bg-[#111111] px-7 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-black"
            >
              Request Call Back
            </a>
          </div>
        </div>
      </section>

      <section id="packages" className="px-5 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-4xl font-light tracking-tight text-[#171436] md:text-5xl">
              Provider Listing Packages
            </h2>

            <a
              href="#callback"
              className="mt-4 inline-flex text-sm font-black text-[#ff5a40] hover:underline"
            >
              Need help choosing?
            </a>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-2">
            {packages.map((item) => (
              <article
                key={item.name}
                className={`flex min-h-[760px] flex-col rounded-[16px] border bg-white p-8 text-center shadow-[0_24px_70px_rgba(17,17,17,0.06)] ${
                  item.highlighted ? "border-[#ff5a40]" : "border-[#b9c0cc]"
                }`}
              >
                {item.highlighted ? (
                  <div className="mx-auto mb-5 rounded-full border border-[#ff5a40]/30 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#111111]">
                    Recommended
                  </div>
                ) : null}

                <h3 className="text-2xl font-semibold text-[#171436]">
                  {item.name}
                </h3>

                <div className="mt-10">
                  <p className="text-3xl font-black text-[#171436]">
                    {item.price}{" "}
                    <span className="text-lg font-black">{item.priceNote}</span>
                  </p>

                  {item.monthlyPrice ? (
                    <>
                      <p className="mt-4 text-3xl font-black text-[#171436]">
                        {item.monthlyPrice}{" "}
                        <span className="text-lg font-black">
                          {item.monthlyNote}
                        </span>
                      </p>

                      <p className="mt-3 text-sm font-semibold text-[#171436]">
                        Featured visibility and lead tools
                      </p>
                    </>
                  ) : null}
                </div>

                <p className="mx-auto mt-10 max-w-sm text-base font-medium leading-7 text-[#171436]">
                  {item.description}
                </p>

                <div className="mt-10 space-y-4 text-left">
                  {item.features.map((feature) => (
                    <div
                      key={feature}
                      className="grid grid-cols-[22px_minmax(0,1fr)] gap-3 text-base font-medium leading-6 text-[#171436]"
                    >
                      <Check size={18} className="mt-1 text-[#43c6a0]" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-10">
                  <a
                    href="#callback"
                    className={`flex min-h-[52px] items-center justify-center rounded-[10px] px-6 text-base font-black text-white transition hover:-translate-y-0.5 ${
                      item.highlighted
                        ? "bg-[#ff5a40] hover:bg-[#ed422b]"
                        : "bg-[#43c6a0] hover:bg-[#34b08d]"
                    }`}
                  >
                    {item.cta}
                  </a>

                  {item.footnote ? (
                    <p className="mt-6 text-left text-xs font-semibold leading-5 text-[#596273]">
                      {item.footnote}
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
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

      <section id="callback" className="bg-[#f7f7f7] px-5 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 rounded-[18px] bg-white p-8 shadow-[0_28px_80px_rgba(17,17,17,0.08)] md:grid-cols-2 md:p-14">
          <div>
            <h2 className="text-3xl font-black text-[#171436]">
              Request a Call Back
            </h2>

            <form onSubmit={handleCallbackSubmit} className="mt-8 space-y-5">
              <input
                required
                placeholder="Name"
                className="min-h-14 w-full rounded-[8px] border border-[#d2d9e4] px-4 text-base font-semibold outline-none transition placeholder:text-[#9ca6b5] focus:border-[#ff5a40] focus:ring-4 focus:ring-[#fff0ec]"
              />

              <input
                required
                type="email"
                placeholder="Email"
                className="min-h-14 w-full rounded-[8px] border border-[#d2d9e4] px-4 text-base font-semibold outline-none transition placeholder:text-[#9ca6b5] focus:border-[#ff5a40] focus:ring-4 focus:ring-[#fff0ec]"
              />

              <input
                required
                placeholder="Mobile"
                className="min-h-14 w-full rounded-[8px] border border-[#d2d9e4] px-4 text-base font-semibold outline-none transition placeholder:text-[#9ca6b5] focus:border-[#ff5a40] focus:ring-4 focus:ring-[#fff0ec]"
              />

              <button
                type="submit"
                className="min-h-14 w-full rounded-[8px] bg-[#43c6a0] px-6 text-base font-black text-white transition hover:-translate-y-0.5 hover:bg-[#34b08d]"
              >
                Send
              </button>
            </form>
          </div>

          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex size-28 items-center justify-center rounded-full border border-[#ff5a40]/30 bg-white text-[#111111]">
              <Phone size={42} />
            </div>

            <h3 className="mt-8 text-3xl font-medium text-[#171436]">
              Speak to an Occasions Consultant
            </h3>

            <p className="mt-5 text-5xl font-black tracking-tight text-[#171436]">
              0861 000 724
            </p>

            <p className="mt-5 text-base font-semibold text-[#171436]">
              Weekdays 8am - 5pm
            </p>
          </div>
        </div>
      </section>

      <Footer />

      {submitted ? <SuccessModal onClose={() => setSubmitted(false)} /> : null}
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
          <a href="#callback" className="transition hover:text-[#ff5a40]">
            Call Back
          </a>
          <Link href="/search" className="transition hover:text-[#ff5a40]">
            Browse Providers
          </Link>
        </nav>

        <a
          href="#callback"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[12px] bg-[#ff5a40] px-5 text-sm font-black text-white transition hover:bg-[#ed422b]"
        >
          Get Started
          <ArrowRight size={17} />
        </a>
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
        { label: "Quote Requests", href: "/list-your-business#callback" },
        { label: "Provider Login", href: "/list-your-business" },
        { label: "Advertise Your Service", href: "/list-your-business#callback" },
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
        { label: "Contact Us", href: "/list-your-business#callback" },
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
                className="flex size-10 items-center justify-center rounded-full border border-white/10 text-white/90 transition hover:border-[#ff5a40] hover:bg-[#ff5a40] hover:text-white"
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

function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/55 px-5 backdrop-blur-md">
      <div className="w-full max-w-md overflow-hidden rounded-[24px] bg-white shadow-[0_30px_90px_rgba(17,17,17,0.35)]">
        <div className="bg-[#ff5a40] p-7 text-white">
          <div className="flex items-start justify-between gap-5">
            <div>
              <div className="flex size-14 items-center justify-center rounded-full bg-white text-[#ff5a40]">
                <Check size={28} strokeWidth={3} />
              </div>

              <h3 className="mt-5 text-2xl font-black">Request received</h3>

              <p className="mt-2 text-sm font-bold leading-6 text-white/90">
                An Occasions consultant will contact you about listing your business.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white hover:text-[#111111]"
              aria-label="Close success modal"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        <div className="space-y-4 p-7">
          <p className="text-sm font-semibold leading-7 text-[#596273]">
            In the final version, this will create a provider onboarding lead and send it to the admin dashboard.
          </p>

          <button
            type="button"
            onClick={onClose}
            className="min-h-12 w-full rounded-[12px] bg-[#ff5a40] px-5 text-sm font-black text-white transition hover:bg-[#ed422b]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
