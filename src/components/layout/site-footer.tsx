"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const footerGroups = [
  {
    title: "Browse",
    links: [
      { label: "Catering", href: "/search?service=catering" },
      { label: "Tents", href: "/search?service=tents" },
      { label: "Décor", href: "/search?service=decor" },
      { label: "Photography", href: "/search?service=photography" },
    ],
  },
  {
    title: "Occasions",
    links: [
      { label: "Funerals", href: "/search?event=funeral" },
      { label: "Weddings", href: "/search?event=wedding" },
      { label: "Parties", href: "/search?event=birthday-party" },
      { label: "Church Events", href: "/search?event=church-event" },
    ],
  },
  {
    title: "Providers",
    links: [
      { label: "List Your Business", href: "/list-your-business" },
      { label: "Pricing", href: "#pricing" },
      { label: "Featured Listings", href: "#providers" },
      { label: "Leads", href: "/prvider-dashboard/leads" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Cookie Preferences", href: "/cookies" },
];

const socialLinks = [
  { label: "Facebook", href: "#", glyph: "f" },
  { label: "Instagram", href: "#", glyph: "ig" },
  { label: "LinkedIn", href: "#", glyph: "in" },
  { label: "YouTube", href: "#", glyph: "yt" },
];

export function SiteFooter({ immersive = false }: { immersive?: boolean }) {
  const pathname = usePathname();

  if (immersive) {
    return (
      <footer className="site-footer min-h-screen bg-[#081a28] px-5 py-16 text-white md:px-8 md:py-20">
        <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-7xl flex-col justify-between">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_3fr]">
            <div>
              <Link href="/" className="site-footer-logo">
                Occasions
              </Link>

              <p className="mt-6 max-w-md text-base leading-8 text-[#9eb0be]">
                The trusted marketplace for finding and comparing event service
                providers across South Africa.
              </p>

              <div className="mt-7 grid gap-3 text-sm text-[#9eb0be]">
                <p>
                  <span className="font-black text-white">Support:</span>{" "}
                  support@occasions.co.za
                </p>
                <p>
                  <span className="font-black text-white">Sales:</span> 0861 000
                  724
                </p>
                <p>
                  <span className="font-black text-white">Hours:</span> Mon - Fri
                  (08:00 - 17:00)
                </p>
              </div>
            </div>

            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {footerGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="text-xs font-black uppercase tracking-[0.12em] text-[#d4dde4]">
                    {group.title}
                  </h3>

                  <div className="mt-5 grid gap-3 text-sm">
                    {group.links.map((link) => (
                      <FooterLink
                        key={link.label}
                        href={link.href}
                        label={link.label}
                        pathname={pathname}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 border-t border-white/10 pt-7">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                {socialLinks.map((item) => {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 text-[#c7d3dc] transition hover:border-[#ff5a40] hover:text-[#ff5a40]"
                      aria-label={item.label}
                    >
                      <span className="text-[11px] font-black uppercase tracking-[0.08em]">
                        {item.glyph}
                      </span>
                    </a>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-5 text-sm text-[#9eb0be]">
                {legalLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="transition hover:text-[#ff5a40]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <p className="mt-6 text-sm text-[#7f94a4]">
              © 2026 Occasions South Africa (Pty) Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer
      className={`site-footer bg-[#081a28] px-5 text-white md:px-8 ${
        immersive ? "min-h-screen py-16 md:py-20" : "py-14"
      }`}
    >
      <div
        className={`mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_repeat(4,1fr)] ${
          immersive ? "content-center" : ""
        }`}
      >
        <div>
          <Link href="/" className="site-footer-logo">
            Occasions
          </Link>

          <p className="mt-5 max-w-sm text-sm leading-8 text-[#a8a8a8]">
            A South African listing, visibility and lead-generation marketplace
            for event and function service providers.
          </p>
        </div>

        {footerGroups.map((group) => (
          <div key={group.title}>
            <h3 className="font-black text-white">{group.title}</h3>

            <div className="mt-5 grid gap-3 text-sm">
              {group.links.map((link) => (
                <FooterLink
                  key={link.label}
                  href={link.href}
                  label={link.label}
                  pathname={pathname}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        className={`mx-auto max-w-7xl border-t border-white/10 pt-6 text-sm text-[#93a2b0] ${
          immersive ? "mt-14" : "mt-12"
        }`}
      >
        © 2026 Occasions. All rights reserved.
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  label,
  pathname,
}: {
  href: string;
  label: string;
  pathname: string;
}) {
  const isHashLink = href.startsWith("#");
  const isSearchLink = href.startsWith("/search?");

  const isActive =
    !isHashLink &&
    (pathname === href ||
      (!isSearchLink && href !== "/" && pathname.startsWith(href)));

  return (
    <Link
      href={href}
      className={isActive ? "site-footer-link is-active" : "site-footer-link"}
    >
      {label}
   </Link>
  );
}
