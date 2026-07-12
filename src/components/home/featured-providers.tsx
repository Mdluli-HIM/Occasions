import { MapPin, Star } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { featuredProviders } from "@/data/homepage";
import { SectionHeading } from "@/components/ui/section-heading";

export function FeaturedProviders() {
  return (
    <section id="providers" className="bg-white px-5 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Featured listings"
          title="Featured providers"
          description="Showcase how paid visibility will work: featured providers can appear higher in search, category pages and location pages."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {featuredProviders.map((provider) => (
            <article
              key={provider.id}
              className="group overflow-hidden rounded-3xl border border-[#deded9] bg-white shadow-sm transition-all duration-500 ease-out hover:border-[#ffb0a3] hover:shadow-[0_24px_70px_rgba(17,17,17,0.12)]"
            >
              <div className="relative h-56 overflow-hidden bg-[#f2f2f0]">
                <div
                  className="card-image absolute inset-0 scale-100 transform-gpu transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  style={{
                    backgroundImage: `url(${provider.image})`,
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/20 to-black/72 transition-opacity duration-[1200ms] ease-out group-hover:opacity-95" />

                <div className="absolute inset-0 bg-[#ff5a40]/0 mix-blend-multiply transition-colors duration-[1200ms] ease-out group-hover:bg-[#ff5a40]/5 !text-white [&_*]:!text-white" />

                <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
                  {provider.isFeatured ? <Badge tone="red">Featured</Badge> : null}
                  {provider.isVerified ? <Badge tone="green">Verified</Badge> : null}
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <p className="text-sm font-bold text-white/80">
                    {provider.priceFrom}
                  </p>
                  <h3 className="mt-1 text-2xl font-black text-white">
                    {provider.name}
                  </h3>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 text-sm font-bold text-[#6f6f6f]">
                  <MapPin size={17} />
                  {provider.location}
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <Star size={18} className="fill-[#ffb703] text-[#ffb703]" />
                  <span className="font-black text-[#111111]">
                    {provider.rating}
                  </span>
                  <span className="text-sm text-[#6f6f6f]">
                    ({provider.reviews} reviews)
                  </span>
                </div>

                <p className="mt-4 text-sm font-bold text-[#111111]">
                  {provider.services.join(", ")}
                </p>

                <p className="mt-2 text-sm leading-6 text-[#6f6f6f]">
                  Suitable for: {provider.eventTypes.join(", ")}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <Link href={`/providers/${provider.id}`}>
                    <Button variant="outline" className="w-full">
                      View Listing
                    </Button>
                  </Link>

                  <Link href={`/search?provider=${provider.id}`}>
                    <Button className="w-full">Request Quote</Button>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
