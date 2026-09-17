import { ClipboardCheck, SearchCheck, Store } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const items = [
  {
    title: "Browse trusted services",
    description:
      "Find catering, tents, chairs, décor, toilets, fridges and more in one organised place.",
    icon: SearchCheck,
  },
  {
    title: "Compare local providers",
    description:
      "View photos, reviews, locations and estimated prices before requesting a quote.",
    icon: ClipboardCheck,
  },
  {
    title: "List your business",
    description:
      "Create a provider profile and receive enquiries from people planning events.",
    icon: Store,
  },
];

export function DiscoverSection() {
  return (
    <section className="px-5 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Discover services for every occasion"
          description="Occasions helps customers search for free while giving local service providers a professional place to market their businesses."
        />

        <div className="mt-10 grid gap-5 rounded-3xl bg-white p-5 shadow-sm md:grid-cols-3 md:p-8">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-100 p-6 text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#ff5a40]/30 bg-white text-[#111111]">
                  <Icon size={30} />
                </div>

                <h3 className="mt-5 text-xl font-black text-[#111111]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#6f6f6f]">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
