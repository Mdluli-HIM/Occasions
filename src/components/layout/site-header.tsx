"use client";

import type { LucideIcon } from "lucide-react";
import {
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Menu,
  Search,
  Sparkles,
  Store,
  Tag,
  UserRound,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { desktopNavItems, type NavItem } from "@/data/navigation";

const mobileIcons: Record<string, LucideIcon> = {
  "Find Services": Search,
  "Event Types": CalendarDays,
  Providers: Store,
  "For Businesses": Sparkles,
  Pricing: Tag,
};

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#ece7e2] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-[#111111] transition hover:bg-[#fff0ec] md:hidden"
            aria-label="Open menu"
          >
            <Menu size={30} />
          </button>

          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 text-2xl font-black tracking-tight md:static md:translate-x-0 md:text-3xl"
          >
            <span className="text-[#ff5a40]">Occasions</span>
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            {desktopNavItems.map((item) => (
              <DesktopNavItem key={item.label} item={item} />
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <Link href="/list-your-business">
              <Button
                variant="outline"
                className="min-h-11 rounded-2xl border-[#ece7e2] px-6"
              >
                List Your Business
              </Button>
            </Link>

            <button
              type="button"
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#ff5a40]/30 bg-white text-[#111111]"
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span className="absolute -right-1 -top-1 rounded-full bg-[#ff5a40] px-1.5 py-0.5 text-[10px] font-bold text-white !text-white [&_*]:!text-white">
                9+
              </span>
            </button>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#ff5a40]/30 bg-white text-[#111111]"
              aria-label="Account"
            >
              <UserRound size={21} />
            </button>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#ff5a40]/30 bg-white text-[#111111] md:hidden"
            aria-label="Account"
          >
            <UserRound size={21} />
          </button>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}

function DesktopNavItem({ item }: { item: NavItem }) {
  return (
    <div className="group relative">
      <Link
        href={item.href}
        className="inline-flex items-center rounded-xl px-4 py-3 text-sm font-bold text-[#111111] transition duration-200 hover:bg-[#fff0ec] hover:text-[#ff5a40]"
      >
        {item.label}
      </Link>

      <div className="pointer-events-none invisible absolute left-1/2 top-full z-[70] w-[920px] -translate-x-1/2 pt-4 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100">
        <div className="overflow-hidden rounded-[28px] border border-[#ece7e2] bg-white shadow-[0_28px_90px_rgba(17,17,17,0.12)]">
          <div className="grid grid-cols-[280px_1fr]">
            <div className="border-r border-[#f1ece7] bg-[#fcfaf8] p-7">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ff5a40]">
                {item.label}
              </p>

              <h3 className="mt-3 text-2xl font-black tracking-tight text-[#111111]">
                Explore {item.label.toLowerCase()}
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#6f6f6f]">
                {item.description}
              </p>

              <Link
                href={item.href}
                className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#ff5a40] transition hover:gap-3"
              >
                View all
                <ChevronRight size={16} />
              </Link>
            </div>

            <div
              className="grid gap-8 p-7"
              style={{
                gridTemplateColumns: `repeat(${Math.min(
                  item.groups.length,
                  3,
                )}, minmax(0, 1fr))`,
              }}
            >
              {item.groups.map((group) => (
                <div key={group.title}>
                  <p className="mb-4 text-sm font-black text-[#111111]">
                    {group.title}
                  </p>

                  <div className="grid gap-2">
                    {group.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="rounded-2xl border border-transparent px-4 py-3 transition hover:border-[#ffe1d8] hover:bg-[#fff6f3]"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-bold text-[#111111]">
                              {link.label}
                            </p>

                            {link.description ? (
                              <p className="mt-1 text-xs leading-5 text-[#6f6f6f]">
                                {link.description}
                              </p>
                            ) : null}
                          </div>

                          <ChevronRight
                            size={15}
                            className="mt-0.5 shrink-0 text-[#c7b9ae]"
                          />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [openItem, setOpenItem] = useState<string>("");

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] bg-white md:hidden">
      <div className="sticky top-0 z-10 flex h-20 items-center justify-between border-b border-[#ece7e2] bg-white px-5 shadow-sm">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-[#111111] transition hover:bg-[#fff0ec]"
          aria-label="Close menu"
        >
          <X size={30} />
        </button>

        <Link
          href="/"
          onClick={onClose}
          className="text-3xl font-black tracking-tight text-[#ff5a40]"
        >
          Occasions
        </Link>

        <button
          type="button"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#ff5a40]/30 bg-white text-[#111111]"
          aria-label="Account"
        >
          <UserRound size={23} />
        </button>
      </div>

      <div className="h-[calc(100dvh-5rem)] overflow-y-auto px-5 py-4">
        <div className="divide-y divide-[#ece7e2]">
          {desktopNavItems.map((item) => (
            <MobileMenuItem
              key={item.label}
              item={item}
              isOpen={openItem === item.label}
              onToggle={() =>
                setOpenItem(openItem === item.label ? "" : item.label)
              }
              onClose={onClose}
            />
          ))}
        </div>

        <div className="sticky bottom-0 mt-8 border-t border-[#ece7e2] bg-white/95 py-4 backdrop-blur">
          <div className="grid gap-3">
            <Link
              href="/list-your-business"
              onClick={onClose}
              className="flex min-h-14 items-center justify-center rounded-2xl bg-[#ff5a40] px-5 text-sm font-black text-white !text-white [&_*]:!text-white"
            >
              List Your Business
            </Link>

            <Link
              href="/saved"
              onClick={onClose}
              className="flex min-h-14 items-center justify-center rounded-2xl border border-[#deded9] bg-white px-5 text-sm font-black text-[#111111]"
            >
              Saved Providers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileMenuItem({
  item,
  isOpen,
  onToggle,
  onClose,
}: {
  item: NavItem;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const Icon = mobileIcons[item.label] ?? Sparkles;

  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className="flex min-h-[74px] w-full items-center gap-4 py-4 text-left"
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#ff5a40]/30 bg-white text-[#111111]">
          <Icon size={23} />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-xl font-black text-[#111111]">
            {item.label}
          </span>
        </span>

        <ChevronDown
          size={22}
          className={`shrink-0 text-[#ff5a40] transition ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen ? (
        <div className="pb-5 pl-16">
          <div className="grid gap-4">
            {item.groups.map((group) => (
              <div key={group.title}>
                <p className="mb-2 text-xs font-black uppercase tracking-[0.16em] text-[#ff5a40]">
                  {group.title}
                </p>

                <div className="grid gap-1">
                  {group.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={onClose}
                      className="block rounded-2xl px-3 py-3 text-base font-bold text-[#111111] transition hover:bg-[#fff0ec] hover:text-[#ff5a40]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
