import Link from "next/link";
import { serviceCategories } from "@/data/homepage";
import { SectionHeading } from "@/components/ui/section-heading";

export function PopularServices() {
  return (
    <section className="bg-white px-5 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Browse by service"
          title="Popular services"
          description="Start with the service you need and compare providers by location, photos, ratings and estimated prices."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCategories.map((service) => (
            <Link
              href={`/search?service=${service.id}`}
              key={service.id}
              className="group overflow-hidden rounded-3xl border border-[#deded9] bg-white shadow-sm transition-all duration-500 ease-out hover:border-[#ffb0a3] hover:shadow-[0_24px_70px_rgba(17,17,17,0.12)]"
            >
              <div className="relative h-40 overflow-hidden bg-[#f2f2f0]">
                <div
                  className="card-image absolute inset-0 scale-100 transform-gpu transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.065]"
                  style={{
                    backgroundImage: `url(${service.image})`,
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/0 to-black/25 opacity-70 transition-opacity duration-[1200ms] ease-out group-hover:opacity-90" />

                <div className="absolute inset-0 bg-[#ff5a40]/0 mix-blend-multiply transition-colors duration-[1200ms] ease-out group-hover:bg-[#ff5a40]/5" />
              </div>

              <div className="p-5">
                <h3 className="text-xl font-black text-[#111111] transition-colors duration-300 group-hover:text-[#ff5a40]">
                  {service.name}
                </h3>

                <p className="mt-2 text-sm font-bold text-[#ff5a40]">
                  {service.count} providers
                </p>

                <p className="mt-3 text-sm leading-6 text-[#6f6f6f]">
                  {service.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
