"use client";

import { type FormEvent, useState } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

const contactDetails = [
  {
    icon: Mail,
    label: "Support",
    value: "support@occasions.co.za",
    href: "mailto:support@occasions.co.za",
  },
  {
    icon: Phone,
    label: "Sales",
    value: "0861 000 724",
    href: "tel:0861000724",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon - Fri (08:00 - 17:00)",
  },
  {
    icon: MapPin,
    label: "Based in",
    value: "South Africa",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // MVP note: this form isn't wired to a backend endpoint yet — it just
    // confirms receipt client-side. Wire to a real POST /api/contact (or
    // similar) when that's built.
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-[#f6f6f4] text-[#111111]">
      <SiteHeader />

      <main className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#ff5a40]">
              Contact us
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
              We&apos;re happy to help
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#596273]">
              Questions about finding a provider, listing your business, or
              anything else — reach out and our team will get back to you.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-[1fr_1.3fr]">
            <div className="grid gap-4">
              {contactDetails.map((detail) => (
                <div
                  key={detail.label}
                  className="flex items-start gap-4 rounded-[20px] border border-[#eee8e3] bg-white p-5 shadow-sm"
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#fff0ec] text-[#ff5a40]">
                    <detail.icon size={19} />
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-[#8a8a8a]">
                      {detail.label}
                    </p>

                    {detail.href ? (
                      <a href={detail.href}
                        className="mt-1 block text-base font-black text-[#111111] transition hover:text-[#ff5a40]"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-base font-black text-[#111111]">
                        {detail.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-[28px] border border-[#eee8e3] bg-white p-7 shadow-sm md:p-9">
              {submitted ? (
                <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
                  <div className="flex size-16 items-center justify-center rounded-full bg-[#fff0ec] text-[#ff5a40]">
                    <Mail size={28} />
                  </div>

                  <h2 className="mt-5 text-2xl font-black">
                    Message received
                  </h2>

                  <p className="mt-2 max-w-sm text-sm leading-6 text-[#596273]">
                    Thanks for reaching out — our team will get back to you at{" "}
                    {form.email || "the email you provided"} soon.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", message: "" });
                    }}
                    className="mt-6 text-sm font-black text-[#ff5a40]"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-4">
                  <label className="block">
                    <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#8a8a8a]">
                      Name
                    </span>
                    <input
                      required
                      value={form.name}
                      onChange={(event) => updateField("name", event.target.value)}
                      className="min-h-[52px] w-full rounded-[14px] border border-[#deded9] bg-white px-4 text-sm font-bold outline-none transition focus:border-[#ff5a40] focus:ring-4 focus:ring-[#fff0ec]"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#8a8a8a]">
                      Email
                    </span>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(event) => updateField("email", event.target.value)}
                      className="min-h-[52px] w-full rounded-[14px] border border-[#deded9] bg-white px-4 text-sm font-bold outline-none transition focus:border-[#ff5a40] focus:ring-4 focus:ring-[#fff0ec]"
                      placeholder="name@example.com"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#8a8a8a]">
                      Message
                    </span>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={(event) => updateField("message", event.target.value)}
                      className="w-full resize-none rounded-[14px] border border-[#deded9] bg-white px-4 py-3 text-sm font-bold leading-6 outline-none transition focus:border-[#ff5a40] focus:ring-4 focus:ring-[#fff0ec]"
                      placeholder="How can we help?"
                    />
                  </label>

                  <button
                    type="submit"
                    className="mt-2 min-h-14 rounded-[16px] bg-[#ff5a40] px-6 text-sm font-black text-white transition hover:bg-[#ed422b]"
                  >
                    Send message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
