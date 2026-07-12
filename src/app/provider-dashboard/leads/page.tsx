import Link from "next/link";
import {
  CalendarDays,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Users,
} from "lucide-react";
import { ProviderDashboardShell } from "@/components/provider-dashboard/provider-dashboard-shell";
import type { LeadStatus, LeadUrgency } from "@/data/provider-dashboard";
import { providerDashboard } from "@/data/provider-dashboard";

export default function ProviderLeadsPage() {
  const { leads } = providerDashboard;

  return (
    <ProviderDashboardShell
      title="Quote Request Leads"
      description="Review customer enquiries, contact leads quickly and track which requests still need attention."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <LeadMetric label="New leads" value={String(leads.filter((lead) => lead.status === "New").length)} />
        <LeadMetric label="Contacted" value={String(leads.filter((lead) => lead.status === "Contacted").length)} />
        <LeadMetric label="Quoted" value={String(leads.filter((lead) => lead.status === "Quoted").length)} />
      </div>

      <div className="mt-6 grid gap-5">
        {leads.map((lead) => (
          <article
            key={lead.id}
            id={lead.id}
            className="rounded-[28px] border border-[#deded9] bg-white p-6 shadow-sm"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge status={lead.status as LeadStatus} />
                  <UrgencyBadge urgency={lead.urgency as LeadUrgency} />
                  <span className="rounded-full border border-[#deded9] px-3 py-1 text-xs font-black text-[#7b8495]">
                    {lead.receivedAt}
                  </span>
                </div>

                <h2 className="mt-5 text-2xl font-black">{lead.name}</h2>

                <p className="mt-2 text-sm font-black text-[#596273]">
                  {lead.serviceNeeded}
                </p>

                <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-[#343434]">
                  {lead.message}
                </p>

                <div className="mt-5 grid gap-3 text-sm font-bold text-[#596273] md:grid-cols-2">
                  <LeadInfo icon={<CalendarDays size={18} />} label={lead.eventDate} />
                  <LeadInfo icon={<MapPin size={18} />} label={lead.location} />
                  <LeadInfo icon={<Users size={18} />} label={lead.guests} />
                  <LeadInfo icon={<MessageCircle size={18} />} label={lead.budget} />
                </div>
              </div>

              <div className="grid min-w-[240px] gap-3">
                <a
                  href={`tel:${lead.phone}`}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[14px] bg-[#111111] px-5 text-sm font-black text-white transition hover:bg-[#ff5a40] !text-white [&_*]:!text-white"
                >
                  <Phone size={17} />
                  Call lead
                </a>

                <a
                  href={`mailto:${lead.email}`}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[14px] border border-[#deded9] bg-white px-5 text-sm font-black transition hover:border-[#ff5a40] hover:text-[#ff5a40]"
                >
                  <Mail size={17} />
                  Email lead
                </a>

                <Link
                  href="/provider-dashboard"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-[14px] border border-[#deded9] bg-[#f6f6f4] px-5 text-sm font-black text-[#596273] transition hover:border-[#ff5a40] hover:text-[#ff5a40]"
                >
                  Mark as followed up
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </ProviderDashboardShell>
  );
}

function LeadMetric({ label, value }: { label: string; value: string }) {
  return (
    <section className="rounded-[24px] border border-[#deded9] bg-white p-5 shadow-sm">
      <p className="text-sm font-black uppercase tracking-[0.14em] text-[#9aa4b5]">
        {label}
      </p>
      <p className="mt-2 text-3xl font-black">{value}</p>
    </section>
  );
}

function LeadInfo({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-[16px] bg-[#f6f6f4] p-3">
      <span className="text-[#ff5a40]">{icon}</span>
      {label}
    </div>
  );
}

function StatusBadge({ status }: { status: LeadStatus }) {
  const className =
    status === "New"
      ? "bg-[#fff0ec] text-[#ff5a40]"
      : status === "Contacted"
        ? "bg-[#eef5ff] text-[#2563eb]"
        : "bg-[#ecfdf5] text-[#059669]";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-black ${className}`}>
      {status}
    </span>
  );
}

function UrgencyBadge({ urgency }: { urgency: LeadUrgency }) {
  const className =
    urgency === "High"
      ? "border-[#ff5a40]/30 text-[#ff5a40]"
      : "border-[#deded9] text-[#7b8495]";

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-black ${className}`}>
      {urgency} priority
    </span>
  );
}
