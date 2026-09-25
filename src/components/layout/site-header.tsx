"use client";

import type { LucideIcon } from "lucide-react";
import {
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Sparkles,
  Store,
  Tag,
  UserRound,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { desktopNavItems, type NavItem } from "@/data/navigation";
import { apiClient, type ProviderListing } from "@/lib/api";

const mobileIcons: Record<string, LucideIcon> = {
  "Find Services": Search,
  "Event Types": CalendarDays,
  Providers: Store,
  "For Businesses": Sparkles,
  Pricing: Tag,
};

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const isProvider = session?.user && (session.user as { role?: string }).role === "provider";

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
            <Link href={isProvider ? "/provider-dashboard" : "/list-your-business"}>
              <Button
                variant="outline"
                className="min-h-11 rounded-2xl border-[#ece7e2] px-6"
              >
                {isProvider ? "Provider Dashboard" : "List Your Business"}
              </Button>
            </Link>

            {isProvider ? <NotificationMenu /> : null}
            {status === "authenticated" && !isProvider ? <SavedProvidersMenu /> : null}

            <AccountMenu session={session} status={status} isProvider={isProvider} />
          </div>

          <MobileAccountButton session={session} status={status} isProvider={isProvider} />
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        session={session}
        status={status}
        isProvider={isProvider}
      />
    </>
  );
}

type SessionLike = ReturnType<typeof useSession>["data"];
type StatusLike = ReturnType<typeof useSession>["status"];

function AccountMenu({
  session,
  status,
  isProvider,
}: {
  session: SessionLike;
  status: StatusLike;
  isProvider: boolean | undefined;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (status !== "authenticated") {
    return (
      <Link
        href="/login"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#ff5a40]/30 bg-white text-[#111111] transition hover:border-[#ff5a40]"
        aria-label="Log in"
      >
        <UserRound size={21} />
      </Link>
    );
  }

  const name = session?.user?.name || session?.user?.email || "Account";

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#ff5a40]/30 bg-white text-[#111111] transition hover:border-[#ff5a40]"
        aria-label="Account menu"
      >
        <UserRound size={21} />
      </button>

      {open ? (
        <div className="absolute right-0 top-14 w-64 overflow-hidden rounded-2xl border border-[#ece7e2] bg-white shadow-[0_20px_60px_rgba(17,17,17,0.14)]">
          <div className="border-b border-[#f1ece7] px-5 py-4">
            <p className="truncate text-sm font-black text-[#111111]">{name}</p>
            <p className="text-xs font-bold uppercase tracking-wide text-[#ff5a40]">
              {isProvider ? "Provider account" : "Customer account"}
            </p>
          </div>

          <div className="p-2">
            {isProvider ? (
              <Link
                href="/provider-dashboard"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-[#111111] transition hover:bg-[#fff0ec] hover:text-[#ff5a40]"
              >
                <LayoutDashboard size={17} />
                Provider Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-[#111111] transition hover:bg-[#fff0ec] hover:text-[#ff5a40]"
                >
                  <CalendarDays size={17} />
                  My Events
                </Link>
                <Link
                  href="/saved"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-[#111111] transition hover:bg-[#fff0ec] hover:text-[#ff5a40]"
                >
                  <Heart size={17} />
                  Saved Providers
                </Link>
              </>
            )}

            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold text-[#111111] transition hover:bg-[#fff0ec] hover:text-[#ff5a40]"
            >
              <LogOut size={17} />
              Log out
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

type NotificationLead = { id: string; name: string; eventType: string; receivedAt: string };

function NotificationMenu() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [items, setItems] = useState<NotificationLead[]>([]);
  const [loaded, setLoaded] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    apiClient<{ count: number; items: NotificationLead[] }>("/api/providers/me/notifications")
      .then((data) => {
        setCount(data.count);
        setItems(data.items);
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#ff5a40]/30 bg-white text-[#111111]"
        aria-label={count > 0 ? `${count} new leads` : "Notifications"}
      >
        <Bell size={20} />
        {count > 0 ? (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ff5a40] px-1 text-[11px] font-black text-white">
            {count > 9 ? "9+" : count}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="absolute right-0 top-14 w-80 overflow-hidden rounded-2xl border border-[#ece7e2] bg-white shadow-[0_20px_60px_rgba(17,17,17,0.14)]">
          <div className="flex items-center justify-between border-b border-[#f1ece7] px-5 py-4">
            <p className="text-sm font-black text-[#111111]">New leads</p>

            {items.length > 0 ? (
              <button
                type="button"
                onClick={async () => {
                  setItems([]);
                  setCount(0);
                  try {
                    await apiClient("/api/providers/me/notifications/mark-all-read", {
                      method: "POST",
                    });
                  } catch (error) {
                    console.error("Failed to mark all as read:", error);
                  }
                }}
                className="text-xs font-black text-[#ff5a40]"
              >
                Mark all as read
              </button>
            ) : null}
          </div>

          <div className="max-h-80 overflow-y-auto p-2">
            {!loaded ? (
              <p className="px-3 py-6 text-center text-sm font-bold text-[#9aa4b5]">
                Loading...
              </p>
            ) : items.length === 0 ? (
              <p className="px-3 py-6 text-center text-sm font-bold text-[#9aa4b5]">
                No new leads right now.
              </p>
            ) : (
              items.map((lead) => (
                <Link
                  key={lead.id}
                  href="/provider-dashboard/leads"
                  onClick={() => setOpen(false)}
                  className="flex flex-col gap-0.5 rounded-xl px-3 py-3 transition hover:bg-[#fff0ec]"
                >
                  <span className="text-sm font-black text-[#111111]">{lead.name}</span>
                  <span className="text-xs font-bold text-[#9aa4b5]">
                    {lead.eventType || "Quote request"}
                  </span>
                </Link>
              ))
            )}
          </div>

          <Link
            href="/provider-dashboard/leads"
            onClick={() => setOpen(false)}
            className="block border-t border-[#f1ece7] px-5 py-3 text-center text-sm font-black text-[#ff5a40] transition hover:bg-[#fff0ec]"
          >
            View all leads
          </Link>
        </div>
      ) : null}
    </div>
  );
}

function SavedProvidersMenu() {
  const [open, setOpen] = useState(false);
  const [providers, setProviders] = useState<ProviderListing[]>([]);
  const [loaded, setLoaded] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    apiClient<ProviderListing[]>("/api/me/saved-providers")
      .then(setProviders)
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function unsave(id: string) {
    setProviders((current) => current.filter((p) => p.id !== id));
    apiClient(`/api/me/saved-providers/${id}`, { method: "DELETE" }).catch(() => {});
  }

  const preview = providers.slice(0, 4);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#ff5a40]/30 bg-white text-[#111111]"
        aria-label={providers.length > 0 ? `${providers.length} saved providers` : "Saved providers"}
      >
        <Heart size={20} />
        {providers.length > 0 ? (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ff5a40] px-1 text-[11px] font-black text-white">
            {providers.length > 9 ? "9+" : providers.length}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="absolute right-0 top-14 w-80 overflow-hidden rounded-2xl border border-[#ece7e2] bg-white shadow-[0_20px_60px_rgba(17,17,17,0.14)]">
          <div className="flex items-center justify-between border-b border-[#f1ece7] px-5 py-4">
            <p className="text-sm font-black text-[#111111]">Saved providers</p>
            <Link
              href="/saved"
              onClick={() => setOpen(false)}
              className="text-xs font-black text-[#ff5a40]"
            >
              Manage
            </Link>
          </div>

          <div className="max-h-96 overflow-y-auto p-2">
            {!loaded ? (
              <p className="px-3 py-6 text-center text-sm font-bold text-[#9aa4b5]">
                Loading...
              </p>
            ) : preview.length === 0 ? (
              <p className="px-3 py-6 text-center text-sm font-bold text-[#9aa4b5]">
                Nothing saved yet — tap the heart on any listing.
              </p>
            ) : (
              preview.map((provider) => (
                <div
                  key={provider.id}
                  className="group flex items-center gap-3 rounded-xl p-2 transition hover:bg-[#fff0ec]"
                >
                  <Link
                    href={`/providers/${provider.id}`}
                    onClick={() => setOpen(false)}
                    className="flex min-w-0 flex-1 items-center gap-3"
                  >
                    <div
                      className="size-14 shrink-0 rounded-xl bg-cover bg-center"
                      style={{ backgroundImage: `url(${provider.image})` }}
                    />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-black text-[#111111]">
                        {provider.priceFrom}
                      </p>
                      <p className="truncate text-sm font-bold text-[#111111]">
                        {provider.name}
                      </p>
                      <p className="truncate text-xs font-bold text-[#9aa4b5]">
                        {provider.area}
                      </p>
                    </div>
                  </Link>

                  <button
                    type="button"
                    onClick={() => unsave(provider.id)}
                    className="flex size-9 shrink-0 items-center justify-center rounded-full text-[#ff5a40] opacity-0 transition group-hover:opacity-100"
                    aria-label={`Remove ${provider.name} from saved`}
                  >
                    <Heart size={17} className="fill-[#ff5a40]" />
                  </button>
                </div>
              ))
            )}
          </div>

          <Link
            href="/saved"
            onClick={() => setOpen(false)}
            className="block border-t border-[#f1ece7] px-5 py-3 text-center text-sm font-black text-[#ff5a40] transition hover:bg-[#fff0ec]"
          >
            View all saved
          </Link>
        </div>
      ) : null}
    </div>
  );
}

function MobileAccountButton({
  session,
  status,
  isProvider,
}: {
  session: SessionLike;
  status: StatusLike;
  isProvider: boolean | undefined;
}) {
  const href = status === "authenticated" ? (isProvider ? "/provider-dashboard" : "/dashboard") : "/login";

  return (
    <Link
      href={href}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#ff5a40]/30 bg-white text-[#111111] md:hidden"
      aria-label="Account"
    >
      <UserRound size={21} />
    </Link>
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
  session,
  status,
  isProvider,
}: {
  isOpen: boolean;
  onClose: () => void;
  session: SessionLike;
  status: StatusLike;
  isProvider: boolean | undefined;
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

        <MobileAccountButton session={session} status={status} isProvider={isProvider} />
      </div>

      <div className="h-[calc(100dvh-5rem)] overflow-y-auto px-5 py-4">
        {status === "authenticated" ? (
          <div className="mb-4 flex items-center justify-between rounded-2xl border border-[#ece7e2] bg-[#fcfaf8] px-4 py-4">
            <div className="min-w-0">
              <p className="truncate text-sm font-black text-[#111111]">
                {session?.user?.name || session?.user?.email}
              </p>
              <p className="text-xs font-bold uppercase tracking-wide text-[#ff5a40]">
                {isProvider ? "Provider account" : "Customer account"}
              </p>
            </div>

            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-[#deded9] bg-white px-3 py-2 text-xs font-black text-[#111111]"
            >
              <LogOut size={14} />
              Log out
            </button>
          </div>
        ) : (
          <div className="mb-4 grid grid-cols-2 gap-3">
            <Link
              href="/login"
              onClick={onClose}
              className="flex min-h-12 items-center justify-center rounded-2xl border border-[#deded9] bg-white text-sm font-black text-[#111111]"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              onClick={onClose}
              className="flex min-h-12 items-center justify-center rounded-2xl bg-[#111111] text-sm font-black text-white"
            >
              Sign up
            </Link>
          </div>
        )}

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
              href={isProvider ? "/provider-dashboard" : "/list-your-business"}
              onClick={onClose}
              className="flex min-h-14 items-center justify-center rounded-2xl bg-[#ff5a40] px-5 text-sm font-black text-white"
            >
              {isProvider ? "Provider Dashboard" : "List Your Business"}
            </Link>

            {!isProvider ? (
              <Link
                href="/dashboard"
                onClick={onClose}
                className="flex min-h-14 items-center justify-center rounded-2xl border border-[#deded9] bg-white px-5 text-sm font-black text-[#111111]"
              >
                My Events
              </Link>
            ) : null}

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
