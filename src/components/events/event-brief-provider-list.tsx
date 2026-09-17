"use client";

import { ProviderResultCard } from "@/components/search/provider-result-card";
import { type ProviderListing } from "@/lib/api";

export function EventBriefProviderList({ providers }: { providers: ProviderListing[] }) {
  return (
    <div className="mt-5 grid gap-5">
      {providers.map((provider) => (
        <ProviderResultCard
          key={provider.id}
          provider={provider}
          isSaved={false}
          onSave={() => {}}
        />
      ))}
    </div>
  );
}
