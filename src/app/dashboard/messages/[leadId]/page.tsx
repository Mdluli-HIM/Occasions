import { redirect } from "next/navigation";
import { CustomerDashboardShell } from "@/components/customer-dashboard/customer-dashboard-shell";
import { MessageThread } from "@/components/messaging/message-thread";
import { apiServer } from "@/lib/api-server";

// Minimal shape we need to confirm the lead exists and show context — the
// full DashboardLead type lives on the provider side; customers only need
// enough to label the thread, so we keep this narrow rather than reusing it.
type CustomerLeadContext = {
  id: string;
  eventType: string;
  serviceNeeded: string;
};

export default async function CustomerMessagesPage({
  params,
}: {
  params: Promise<{ leadId: string }>;
}) {
  const { leadId } = await params;

  let context: CustomerLeadContext;
  try {
    // Reuses the same lead the customer already owns — GET is scoped to
    // customerId server-side, so a 404 here just means "not yours."
    context = await apiServer<CustomerLeadContext>(`/api/me/leads/${leadId}`);
  } catch (error) {
    const status = (error as { status?: number })?.status;
    if (status === 401) redirect(`/login?next=/dashboard/messages/${leadId}`);
    if (status === 404) redirect("/dashboard/events");
    throw error;
  }

  return (
    <CustomerDashboardShell
      title={context.serviceNeeded || "Conversation"}
      description={`Your conversation about this ${context.eventType || "enquiry"}.`}
    >
      <div className="flex h-[520px] flex-col rounded-[28px] border border-[#deded9] bg-white p-6 shadow-sm md:p-8">
        <MessageThread
          leadId={context.id}
          messagesEndpoint={`/api/me/leads/${context.id}/messages`}
          currentSender="customer"
        />
      </div>
    </CustomerDashboardShell>
  );
}
