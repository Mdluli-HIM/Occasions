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

export function SiteFooter() {
  const pathname = usePathname();

  return (
    <footer className="site-footer bg-[#0b0b0b] px-5 py-14 text-white md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_repeat(4,1fr)]">
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

      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-sm text-[#777777]">
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
