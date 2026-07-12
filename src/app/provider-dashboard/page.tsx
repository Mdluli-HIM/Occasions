import type { ReactNode } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ChevronRight,
  Clock,
  Eye,
  Inbox,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { ProviderDashboardShell } from "@/components/provider-dashboard/provider-dashboard-shell";
import { providerDashboard } from "@/data/provider-dashboard";

export default function ProviderDashboardPage() {
  const { provider, leads, profileTasks } = providerDashboard;
  const completedTasks = profileTasks.filter((task) => task.completed).length;

  return (
    <ProviderDashboardShell
      title="Dashboard Overview"
      description="Track your listing performance, quote requests, profile strength and provider package in one place."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<Eye size={22} />}
          label="Profile views"
          value={provider.profileViews.toLocaleString()}
          helper="Last 30 days"
        />
        <StatCard
          icon={<Inbox size={22} />}
          label="Quote requests"
          value={String(provider.quoteRequests)}
          helper="Total enquiries"
        />
        <StatCard
          icon={<TrendingUp size={22} />}
          label="Conversion"
          value={provider.conversionRate}
          helper="Views to enquiries"
        />
        <StatCard
          icon={<Clock size={22} />}
          label="Response time"
          value={provider.responseTime}
          helper="Average response"
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
        <section className="rounded-[26px] border border-[#deded9] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black">Recent leads</h2>
              <p className="mt-1 text-sm font-semibold text-[#7b8495]">
                Latest quote requests from customers.
              </p>
            </div>

            <Link
              href="/provider-dashboard/leads"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[14px] border border-[#ff5a40]/35 bg-white px-5 text-sm font-black text-[#ff5a40] transition hover:-translate-y-0.5 hover:border-[#ff5a40] hover:bg-[#fff0ec]"
            >
              View all leads
              <ChevronRight size={17} />
            </Link>
          </div>

          <div className="mt-6 grid gap-4">
            {leads.slice(0, 3).map((lead) => (
              <article
                key={lead.id}
                className="rounded-[20px] border border-[#eee8e3] bg-[#fbfbfa] p-5"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#fff0ec] px-3 py-1 text-xs font-black text-[#ff5a40]">
                        {lead.status}
                      </span>

                      <span className="rounded-full border border-[#deded9] bg-white px-3 py-1 text-xs font-black text-[#596273]">
                        {lead.urgency} priority
                      </span>
                    </div>

                    <h3 className="mt-4 text-lg font-black">{lead.name}</h3>
                    <p className="mt-1 text-sm font-bold text-[#596273]">
                      {lead.eventType} · {lead.guests} · {lead.location}
                    </p>
                    <p className="mt-3 text-sm font-semibold leading-6 text-[#343434]">
                      {lead.message}
                    </p>
                  </div>

                  <Link
                    href={`/provider-dashboard/leads#${lead.id}`}
                    className="inline-flex min-h-[42px] shrink-0 items-center justify-center rounded-[14px] border border-[#deded9] bg-white px-4 text-sm font-black transition hover:border-[#ff5a40] hover:text-[#ff5a40]"
                  >
                    Open
                </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-[26px] border border-[#deded9] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black">Listing health</h2>
              <span className="text-xl font-black text-[#ff5a40]">
                {provider.profileCompletion}%
              </span>
            </div>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#f1ece8]">
              <div
                className="h-full rounded-full bg-[#ff5a40] !text-white [&_*]:!text-white"
                style={{ width: `${provider.profileCompletion}%` }}
              />
            </div>

            <div className="mt-5 grid gap-3">
              {profileTasks.map((task) => (
                <div
                  key={task.label}
                  className="flex items-center gap-3 text-sm font-bold"
                >
                  <CheckCircle2
                    size={18}
                    className={task.completed ? "text-[#43c6a0]" : "text-[#b7bfcb]"}
                  />
                  <span className={task.completed ? "text-[#111111]" : "text-[#7b8495]"}>
                    {task.label}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-5 text-sm font-semibold text-[#7b8495]">
              {completedTasks} of {profileTasks.length} setup tasks complete.
            </p>
          </section>

          <section className="rounded-[26px] border border-[#ff5a40]/30 bg-[#fff8f6] p-6 shadow-sm">
            <ShieldCheck size={28} className="text-[#ff5a40]" />
            <h2 className="mt-4 text-xl font-black">{provider.packageName}</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-[#596273]">
              Your listing is currently active and visible in relevant search results.
            </p>

            <Link
              href="/list-your-business#packages"
              className="mt-5 inline-flex min-h-[44px] items-center rounded-[14px] bg-[#ff5a40] px-4 text-sm font-black text-white transition hover:bg-[#ed422b] !text-white [&_*]:!text-white"
            >
              Manage package
            </Link>
          </section>
        </aside>
      </div>
    </ProviderDashboardShell>
  );
}

function StatCard({
  icon,
  label,
  value,
  helper,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <section className="rounded-[26px] border border-[#deded9] bg-white p-6 shadow-sm">
      <div className="flex size-12 items-center justify-center rounded-[16px] bg-[#fff0ec] text-[#ff5a40]">
        {icon}
      </div>

      <p className="mt-5 text-sm font-black uppercase tracking-[0.14em] text-[#9aa4b5]">
        {label}
      </p>

      <p className="mt-2 text-3xl font-black text-[#111111]">{value}</p>

      <p className="mt-2 text-sm font-semibold text-[#7b8495]">{helper}</p>
    </section>
  );
}
