import { ProviderDashboardShell } from "@/components/provider-dashboard/provider-dashboard-shell";
import { ListingEditorClient, type ListingState } from "@/components/provider-dashboard/listing-editor-client";
import { apiServer } from "@/lib/api-server";

export default async function ProviderDashboardListingPage() {
  const listing = await apiServer<ListingState>("/api/providers/me/listing");

  return (
    <ProviderDashboardShell
      title="Manage your listing preview"
      description="Edit your listing in the same visual layout customers will see."
    >
      <ListingEditorClient initialListing={listing} />
    </ProviderDashboardShell>
  );
}
