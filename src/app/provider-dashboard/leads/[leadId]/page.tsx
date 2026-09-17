import Link from "next/link";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  ArrowLeft,
  CalendarDays,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Users,
} from "lucide-react";
import { ProviderDashboardShell } from "@/components/provider-dashboard/provider-dashboard-shell";
import { type DashboardLead } from "@/lib/api";
import { apiServer } from "@/lib/api-server";

type LeadStatus = DashboardLead["status"];
type LeadUrgency = DashboardLead["urgency"];

async function updateStatus(formData: FormData) {
  "use server";
  const leadId = String(formData.get("leadId"));
  const status = String(formData.get("status"));
  await apiServer(`/api/providers/me/leads/${leadId}`, {
    method: "PATCH",
    body: { status },
  });
  revalidatePath(`/provider-dashboard/leads/${leadId}`);
  revalidatePath("/provider-dashboard/leads");
}

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ leadId: string }>;
}) {
  const { leadId } = await params;

  let lead: DashboardLead;
  try {
    lead = await apiServer<DashboardLead>(`/api/providers/me/leads/${leadId}`);
  } catch (error) {
    const status = (error as { status?: number })?.status;
    if (status === 404) {
      notFound();
    }
    throw error;
  }

  return (
    <ProviderDashboardShell
      title={lead.name}
      description="Everything the customer told you, in one place."
    >
      <Link
        href="/provider-dashboard/leads"
        className="inline-flex items-center gap-2 text-sm font-black text-[#596273] transition hover:text-[#ff5a40]"
      >
        <ArrowLeft size={16} />
        Back to leads
      </Link>

      <article className="mt-5 rounded-[28px] border border-[#deded9] bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={lead.status} />
              <UrgencyBadge urgency={lead.urgency} />
              <span className="rounded-full border border-[#deded9] px-3 py-1 text-xs font-black text-[#7b8495]">
                {lead.receivedAt}
              </span>
            </div>

            <h1 className="mt-5 text-2xl font-black md:text-3xl">{lead.name}</h1>
            <p className="mt-2 text-sm font-black text-[#596273]">
              {lead.serviceNeeded}
            </p>

            <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-[#343434]">
              {lead.message}
            </p>

            <div className="mt-6 grid gap-3 text-sm font-bold text-[#596273] sm:grid-cols-2">
              <LeadInfo icon={<CalendarDays size={18} />} label={lead.eventDate || "No date given"} />
              <LeadInfo icon={<MapPin size={18} />} label={lead.location || "No location given"} />
              <LeadInfo icon={<Users size={18} />} label={lead.guests || "Guest count not given"} />
              <LeadInfo icon={<MessageCircle size={18} />} label={lead.budget || "Budget not given"} />
            </div>

            <p className="mt-4 text-xs font-black uppercase tracking-[0.14em] text-[#9aa4b5]">
              Prefers to be contacted via {lead.contactMethod}
            </p>
          </div>

          <div className="grid min-w-[240px] gap-3">
            <a href={`tel:${lead.phone}`} className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[14px] bg-[#ff5a40] px-5 text-sm font-black text-white transition hover:bg-[#111111]">
              <Phone size={17} />
              Call lead
            </a>

            <a href={`mailto:${lead.email}`} className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[14px] border border-[#deded9] bg-white px-5 text-sm font-black transition hover:border-[#ff5a40] hover:text-[#ff5a40]">
              <Mail size={17} />
              Email lead
            </a>

            <div className="mt-2 grid gap-2">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[#9aa4b5]">
                Update status
              </p>
              <div className="flex flex-wrap gap-2">
                {(["New", "Viewed", "Contacted", "Quoted", "Accepted", "Completed", "Closed"] as LeadStatus[]).map((status) => (
                  <form action={updateStatus} key={status}>
                    <input type="hidden" name="leadId" value={lead.id} />
                    <input type="hidden" name="status" value={status} />
                    <button
                      type="submit"
                      disabled={lead.status === status}
                      className={`inline-flex min-h-[40px] items-center justify-center rounded-[12px] border px-3 text-xs font-black transition ${
                        lead.status === status
                          ? "border-[#ff5a40] bg-[#fff0ec] text-[#ff5a40]"
                          : "border-[#deded9] bg-white text-[#596273] hover:border-[#ff5a40] hover:text-[#ff5a40]"
                      }`}
                    >
                      {status}
                    </button>
                  </form>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </ProviderDashboardShell>
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

const STATUS_STYLES: Record<LeadStatus, string> = {
  New: "bg-[#fff0ec] text-[#ff5a40]",
  Viewed: "bg-[#f3f0ff] text-[#7c3aed]",
  Contacted: "bg-[#eef5ff] text-[#2563eb]",
  Quoted: "bg-[#ecfdf5] text-[#059669]",
  Accepted: "bg-[#ecfdf5] text-[#059669]",
  Completed: "bg-[#f6f6f4] text-[#111111]",
  Closed: "bg-[#f6f6f4] text-[#9aa4b5]",
};

function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-black ${STATUS_STYLES[status]}`}>
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
