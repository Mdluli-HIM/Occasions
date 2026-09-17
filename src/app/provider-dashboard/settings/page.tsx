import Link from "next/link";
import {
  Bell,
  CreditCard,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { ProviderDashboardShell } from "@/components/provider-dashboard/provider-dashboard-shell";
import { apiServer } from "@/lib/api-server";

type SettingsResponse = {
  business: { name: string; category: string; location: string; activeSince: string };
  contact: { phone: string; email: string; responseTime: string; preferredContact: string };
  package: { code: string; status: string; visibility: string; renewal: string };
  notifications: {
    newLeadAlerts: boolean;
    weeklySummary: boolean;
    packageReminders: boolean;
    marketingTips: boolean;
  };
};

export default async function ProviderSettingsPage() {
  const settings = await apiServer<SettingsResponse>("/api/providers/me/settings");
  const { business, contact, package: pkg, notifications } = settings;

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
            ["Business", business.name],
            ["Category", business.category],
            ["Location", business.location],
            ["Active since", new Date(business.activeSince).toLocaleDateString("en-ZA", { month: "long", year: "numeric" })],
          ]}
        />

        <SettingsCard
          icon={<Phone size={22} />}
          title="Contact settings"
          description="These details are used for enquiries and provider notifications."
          rows={[
            ["Phone", contact.phone || "Not set"],
            ["Email", contact.email || "Not set"],
            ["Response time", contact.responseTime || "Not set"],
            ["Preferred contact", contact.preferredContact],
          ]}
        />

        <SettingsCard
          icon={<CreditCard size={22} />}
          title="Package"
          description="Current listing package and visibility configuration."
          rows={[
            ["Package", pkg.code],
            ["Status", pkg.status],
            ["Visibility", pkg.visibility],
            ["Renewal", pkg.renewal],
          ]}
        />

        <SettingsCard
          icon={<Bell size={22} />}
          title="Notifications"
          description="Choose what provider alerts should be sent when leads come in."
          rows={[
            ["New lead alerts", notifications.newLeadAlerts ? "Enabled" : "Disabled"],
            ["Weekly summary", notifications.weeklySummary ? "Enabled" : "Disabled"],
            ["Package reminders", notifications.packageReminders ? "Enabled" : "Disabled"],
            ["Marketing tips", notifications.marketingTips ? "Enabled" : "Disabled"],
          ]}
        />
      </div>

      <section className="mt-6 rounded-[28px] border border-[#ff5a40]/30 bg-[#fff8f6] p-6 shadow-sm">
        <ShieldCheck size={28} className="text-[#ff5a40]" />

        <h2 className="mt-4 text-2xl font-black">MVP note</h2>

        <p className="mt-3 max-w-3xl text-base font-semibold leading-8 text-[#596273]">
          Business, contact and package details above are live from your provider profile.
          Notification toggles are read from the API but not yet editable here — see the
          backend README for what&apos;s stubbed for v1.
        </p>

        <Link
          href="/provider-dashboard"
          className="mt-5 inline-flex min-h-[48px] items-center rounded-[14px] bg-[#ff5a40] px-5 text-sm font-black text-white transition hover:bg-[#ed422b]"
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
