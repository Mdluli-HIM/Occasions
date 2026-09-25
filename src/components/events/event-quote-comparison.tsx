import { CheckCircle2 } from "lucide-react";
import { BookButton } from "./book-button";
import type { ProviderListing, EventProviderLead } from "@/lib/api";

type ProvidersByService = Record<string, ProviderListing[]>;

export function EventQuoteComparison({
  providersByService,
  leadsByProviderId,
  serviceLabels,
}: {
  providersByService: ProvidersByService;
  leadsByProviderId: Record<string, EventProviderLead>;
  serviceLabels: Record<string, string>;
}) {
  const serviceSlugs = Object.keys(providersByService);

  const sections = serviceSlugs
    .map((slug) => {
      const providers = providersByService[slug] ?? [];
      const quoted = providers
        .map((provider) => ({
          provider,
          lead: leadsByProviderId[provider.id] ?? null,
        }))
        .filter(
          (row): row is { provider: ProviderListing; lead: EventProviderLead & { quote: NonNullable<EventProviderLead["quote"]> } } =>
            Boolean(row.lead?.quote),
        )
        .sort((a, b) => a.lead.quote.price - b.lead.quote.price);

      return { slug, quoted };
    })
    .filter((section) => section.quoted.length >= 2);

  if (sections.length === 0) return null;

  return (
    <div className="mb-12">
      <h2 className="mb-2 text-2xl font-black text-[#111111]">Compare quotes</h2>
      <p className="mb-6 text-sm font-semibold text-[#6b7280]">
        Quotes you&apos;ve received so far, side by side.
      </p>

      <div className="grid gap-8">
        {sections.map(({ slug, quoted }) => (
          <div key={slug}>
            <h3 className="mb-3 text-lg font-black text-[#111111]">
              {serviceLabels[slug] ?? slug}
            </h3>

            <div className="overflow-hidden rounded-[20px] border border-[#deded9] bg-white">
              {quoted.map(({ provider, lead }, index) => (
                <div
                  key={provider.id}
                  className={`flex flex-wrap items-center justify-between gap-4 p-5 ${
                    index > 0 ? "border-t border-[#f0efec]" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="size-12 shrink-0 rounded-[12px] bg-cover bg-center"
                      style={{ backgroundImage: `url(${provider.image})` }}
                    />
                    <div>
                      <p className="text-sm font-black text-[#111111]">{provider.name}</p>
                      <p className="text-xs font-bold text-[#6b7280]">{provider.area}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-black text-[#111111]">
                      R{lead.quote.price.toLocaleString("en-ZA")}
                    </p>
                    {lead.quote.validUntil ? (
                      <p className="text-xs font-bold text-[#6b7280]">
                        Valid until {lead.quote.validUntil}
                      </p>
                    ) : null}
                  </div>

                  {index === 0 ? (
                    <span className="flex flex-col items-end gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ecfdf5] px-3 py-1 text-xs font-black text-[#059669]">
                        <CheckCircle2 size={14} />
                        Best price
                      </span>
                      <BookButton leadId={lead.leadId} />
                    </span>
                  ) : (
                    <a
                      href={`/dashboard/messages/${lead.leadId}`}
                      className="text-xs font-black text-[#ff5a40] hover:underline"
                    >
                      Message provider →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
