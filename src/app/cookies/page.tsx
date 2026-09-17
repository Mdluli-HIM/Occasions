"use client";

import { useState } from "react";
import { Cookie } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

const cookieCategories = [
  {
    id: "essential",
    title: "Essential",
    description:
      "Required for the site to function — keeping you logged in and remembering your session. These can't be turned off.",
    locked: true,
    defaultOn: true,
  },
  {
    id: "preferences",
    title: "Preferences",
    description:
      "Remembers choices like your last search filters, so the site feels more tailored on return visits.",
    locked: false,
    defaultOn: true,
  },
  {
    id: "analytics",
    title: "Analytics",
    description:
      "Helps us understand how the platform is used so we can improve search, listings and the overall experience.",
    locked: false,
    defaultOn: false,
  },
];

export default function CookiesPage() {
  const [prefs, setPrefs] = useState<Record<string, boolean>>(
    Object.fromEntries(cookieCategories.map((c) => [c.id, c.defaultOn])),
  );
  const [saved, setSaved] = useState(false);

  function toggle(id: string) {
    setPrefs((current) => ({ ...current, [id]: !current[id] }));
    setSaved(false);
  }

  return (
    <div className="min-h-screen bg-[#f6f6f4] text-[#111111]">
      <SiteHeader />

      <main className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-[#fff0ec] text-[#ff5a40]">
            <Cookie size={26} />
          </div>

          <p className="mt-6 text-xs font-black uppercase tracking-[0.24em] text-[#ff5a40]">
            Legal
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
            Cookie Preferences
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-8 text-[#43494f]">
            Occasions uses cookies to keep the platform working and to
            understand how it&apos;s used. Choose what you&apos;re comfortable
            with below — essential cookies can&apos;t be disabled since the
            site won&apos;t function correctly without them.
          </p>

          <div className="mt-10 grid gap-4">
            {cookieCategories.map((category) => (
              <div
                key={category.id}
                className="flex items-start justify-between gap-6 rounded-[20px] border border-[#eee8e3] bg-white p-6 shadow-sm"
              >
                <div>
                  <h2 className="text-base font-black text-[#111111]">
                    {category.title}
                    {category.locked ? (
                      <span className="ml-2 text-xs font-bold uppercase tracking-[0.1em] text-[#8a8a8a]">
                        Always on
                      </span>
                    ) : null}
                  </h2>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-[#596273]">
                    {category.description}
                  </p>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={prefs[category.id]}
                  disabled={category.locked}
                  onClick={() => toggle(category.id)}
                  className={`relative h-8 w-14 shrink-0 rounded-full transition ${
                    prefs[category.id] ? "bg-[#ff5a40]" : "bg-[#deded9]"
                  } ${category.locked ? "cursor-not-allowed opacity-70" : ""}`}
                >
                  <span
                    className={`absolute top-1 size-6 rounded-full bg-white shadow transition-transform ${
                      prefs[category.id] ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSaved(true)}
              className="min-h-14 rounded-[16px] bg-[#ff5a40] px-7 text-sm font-black text-white transition hover:bg-[#ed422b]"
            >
              Save preferences
            </button>

            {saved ? (
              <p className="text-sm font-bold text-[#596273]">
                Saved for this session.
              </p>
            ) : null}
          </div>

          <p className="mt-6 text-xs leading-6 text-[#8a8a8a]">
            These preferences are stored for this browser session only. See
            our{" "}
            <a href="/privacy" className="font-bold text-[#ff5a40]">
              Privacy Policy
            </a>{" "}
            for more on how we use cookies and other data.
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
