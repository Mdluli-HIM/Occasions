import { notFound } from "next/navigation";
import { ProviderDetailPage } from "@/components/providers/provider-detail-page";
import { ApiError, type ProviderDetail } from "@/lib/api";
import { apiServer } from "@/lib/api-server";

type ProviderPageProps = {
  params: Promise<{
    providerId: string;
  }>;
  searchParams: Promise<{ event?: string }>;
};

async function loadProvider(providerId: string): Promise<ProviderDetail | null> {
  try {
    return await apiServer<ProviderDetail>(`/api/providers/${providerId}`);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

export async function generateMetadata({ params }: ProviderPageProps) {
  const { providerId } = await params;
  const provider = await loadProvider(providerId);

  if (!provider) {
    return { title: "Provider not found | Occasions" };
  }

  return {
    title: `${provider.name} | Occasions`,
    description: provider.summary,
  };
}

export default async function ProviderPage({ params, searchParams }: ProviderPageProps) {
  const { providerId } = await params;
  const { event: eventId } = await searchParams;
  const provider = await loadProvider(providerId);

  if (!provider) {
    notFound();
  }

  return <ProviderDetailPage provider={provider} eventId={eventId} />;
}
