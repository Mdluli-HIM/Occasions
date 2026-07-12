import Link from "next/link";
import {
  Bell,
  CreditCard,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { ProviderDashboardShell } from "@/components/provider-dashboard/provider-dashboard-shell";
import { providerDashboard } from "@/data/provider-dashboard";

export default function ProviderSettingsPage() {
  const { provider } = providerDashboard;

  return (
    <ProviderDashboardShell
      title="Provider Settings"
      description="Manage account details, package settings, notifications and provider preferences."
    >
      <div className="grid gap-6 xl:grid-cols-2">
        <SettingsCard
          icon={<UserRound size={22} />}
          title="Business account"
          description="Main business and owner details used for provider communication."
          rows={[
            ["Business", provider.name],
            ["Category", provider.category],
            ["Location", provider.location],
            ["Active since", provider.activeSince],
          ]}
        />

        <SettingsCard
          icon={<Phone size={22} />}
          title="Contact settings"
          description="These details are used for enquiries and provider notifications."
          rows={[
            ["Phone", "0861 000 724"],
            ["Email", "support@occasions.co.za"],
            ["Response time", provider.responseTime],
            ["Preferred contact", "WhatsApp + Email"],
          ]}
        />

        <SettingsCard
          icon={<CreditCard size={22} />}
          title="Package"
          description="Current listing package and visibility configuration."
          rows={[
            ["Package", provider.packageName],
            ["Status", provider.packageStatus],
            ["Visibility", "Featured search placement"],
            ["Renewal", "Monthly"],
          ]}
        />

        <SettingsCard
          icon={<Bell size={22} />}
          title="Notifications"
          description="Choose what provider alerts should be sent when leads come in."
          rows={[
            ["New lead alerts", "Enabled"],
            ["Weekly summary", "Enabled"],
            ["Package reminders", "Enabled"],
            ["Marketing tips", "Disabled"],
          ]}
        />
      </div>

      <section className="mt-6 rounded-[28px] border border-[#ff5a40]/30 bg-[#fff8f6] p-6 shadow-sm">
        <ShieldCheck size={28} className="text-[#ff5a40]" />

        <h2 className="mt-4 text-2xl font-black">MVP note</h2>

        <p className="mt-3 max-w-3xl text-base font-semibold leading-8 text-[#596273]">
          These settings are frontend mock data for now. When the backend is added,
          this page will save account details, notification preferences and package settings.
        </p>

        <Link
          href="/provider-dashboard"
          className="mt-5 inline-flex min-h-[48px] items-center rounded-[14px] bg-[#ff5a40] px-5 text-sm font-black text-white transition hover:bg-[#ed422b] !text-white [&_*]:!text-white"
        >
          Back to dashboard
        </Link>
      </section>
    </ProviderDashboardShell>
  );
}

function SettingsCard({
  icon,
  title,
  description,
  rows,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  rows: Array<[string, string]>;
}) {
  return (
    <section className="rounded-[28px] border border-[#deded9] bg-white p-6 shadow-sm">
      <div className="flex size-12 items-center justify-center rounded-[16px] bg-[#fff0ec] text-[#ff5a40]">
        {icon}
      </div>

      <h2 className="mt-5 text-2xl font-black">{title}</h2>

      <p className="mt-2 text-sm font-semibold leading-7 text-[#596273]">
        {description}
      </p>

      <div className="mt-6 divide-y divide-[#eee8e3] overflow-hidden rounded-[18px] border border-[#eee8e3]">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="grid grid-cols-[140px_minmax(0,1fr)] gap-4 bg-white px-4 py-4 text-sm"
          >
            <span className="font-bold text-[#7b8495]">{label}</span>
            <span className="font-black text-[#111111]">{value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
