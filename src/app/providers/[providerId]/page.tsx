import { getProviderDetail, providerIds } from "@/data/provider-details";
import { ProviderDetailPage } from "@/components/providers/provider-detail-page";

type ProviderPageProps = {
  params: Promise<{
    providerId: string;
  }>;
};

export function generateStaticParams() {
  return providerIds.map((providerId) => ({
    providerId,
  }));
}

export async function generateMetadata({ params }: ProviderPageProps) {
  const { providerId } = await params;
  const provider = getProviderDetail(providerId);

  return {
    title: `${provider.name} | Occasions`,
    description: provider.summary,
  };
}

export default async function ProviderPage({ params }: ProviderPageProps) {
  const { providerId } = await params;
  const provider = getProviderDetail(providerId);

  return <ProviderDetailPage provider={provider} />;
}
