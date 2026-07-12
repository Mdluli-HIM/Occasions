"use client";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  Bell,
  ClipboardList,
  LayoutDashboard,
  Settings,
  Store,
  UserRound,
} from "lucide-react";

const navItems: Array<{
  label: string;
  href: string;
  icon: LucideIcon;
}> = [
  {
    label: "Overview",
    href: "/provider-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Leads",
    href: "/provider-dashboard/leads",
    icon: ClipboardList,
  },
  {
    label: "Listing",
    href: "/provider-dashboard/listing",
    icon: Store,
  },
  {
    label: "Settings",
    href: "/provider-dashboard/settings",
    icon: Settings,
  },
];

export function ProviderDashboardShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const activeIndex = navItems.findIndex((item) => {
    const isOverview = item.href === "/provider-dashboard";

    return isOverview
      ? pathname === item.href
      : pathname.startsWith(item.href);
  });

  const safeActiveIndex = activeIndex === -1 ? 0 : activeIndex;
  const indicatorIndex = hoveredIndex ?? safeActiveIndex;

  return (
    <main className="min-h-screen bg-[#f6f6f4] text-[#111111]">
      <header className="sticky top-0 z-50 border-b border-[#e6e1dc] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-5 px-5 md:px-8">
          <div className="flex items-center gap-5">
            <Link
              href="/"
              className="text-3xl font-black tracking-tight !text-[#ff5a40]"
            >
              Occasions
            </Link>

            <span className="hidden h-8 w-px bg-[#deded9] md:block" />

            <p className="hidden text-sm font-black uppercase tracking-[0.16em] text-[#7b8495] md:block">
              Provider Dashboard
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/search"
              className="hidden min-h-[46px] items-center gap-2 rounded-[14px] border border-[#deded9] bg-white px-4 text-sm font-black transition hover:border-[#ff5a40] hover:text-[#ff5a40] md:inline-flex"
            >
              <ArrowLeft size={17} />
              Marketplace
            </Link>

            <button
              type="button"
              className="flex size-11 items-center justify-center rounded-full bg-[#fff0ec] text-[#ff5a40] transition hover:bg-[#ff5a40] hover:text-white !text-white [&_*]:!text-white"
              aria-label="Notifications"
            >
              <Bell size={19} />
            </button>

            <button
              type="button"
              className="flex size-11 items-center justify-center rounded-full bg-[#111111] text-white"
              aria-label="Provider account"
            >
              <UserRound size={19} />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-6 md:px-8 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <nav
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative grid gap-2 overflow-hidden rounded-[26px] border border-[#deded9] bg-white p-3 shadow-sm"
          >
            <span
              className="pointer-events-none absolute left-3 right-3 top-3 z-0 h-[52px] rounded-[18px] bg-[#ff5a40] shadow-[0_14px_30px_rgba(255,90,64,0.22)] transition-transform duration-300 ease-out !text-white [&_*]:!text-white"
              style={{
                transform: `translateY(${indicatorIndex * 60}px)`,
              }}
            />

            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isHighlighted = indicatorIndex === index;
              const isCurrent = safeActiveIndex === index;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onFocus={() => setHoveredIndex(index)}
                  onBlur={() => setHoveredIndex(null)}
                  className={`relative z-10 flex min-h-[52px] items-center gap-3 rounded-[18px] px-4 text-sm font-black transition-colors duration-200 ${
                    isHighlighted
                      ? "text-white"
                      : "text-[#111111] hover:text-white"
                  }`}
                >
                  <Icon size={18} />

                  <span className="min-w-0 flex-1">
                    {item.label}
                  </span>

                  {isCurrent ? (
                    <span
                      className={`shrink-0 text-[18px] font-normal leading-none transition-colors duration-200 ${
                        isHighlighted ? "text-white/90" : "text-[#ff5a40]"
                      }`}
                      aria-label="Current page"
                    >
                      ✓
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </aside>

        <section>
          <div className="mb-6 rounded-[30px] bg-[#111111] p-7 text-white md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff5a40]">
              Occasions Provider
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              {title}
            </h1>

            <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-white/65">
              {description}
            </p>
          </div>

          {children}
        </section>
      </div>
    </main>
  );
}
