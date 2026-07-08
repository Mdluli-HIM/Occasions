import { ArrowRight, Megaphone, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProviderCta() {
  return (
    <section id="list-business" className="bg-white px-5 py-12 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-3xl bg-[#111111] p-7 text-white md:grid-cols-[1.2fr_0.8fr] md:p-12">
        <div>
          <p className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white/90">
            For service providers
          </p>

          <h2 className="text-3xl font-black tracking-tight md:text-5xl">
            List Your Business
          </h2>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-white/75">
            Get discovered by people planning weddings, funerals, parties,
            church events and more. Create a listing, showcase your work and
            receive qualified enquiries.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button className="gap-2">
              Create Free Listing
              <ArrowRight size={18} />
            </Button>

            <Button
              variant="outline"
              className="border-white/20 bg-white/10 text-white"
            >
              Promote Your Services
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-2xl bg-white/10 p-5">
            <Megaphone className="mb-4 text-[#ff5a40]" />
            <h3 className="text-lg font-black">Featured visibility</h3>
            <p className="mt-2 text-sm leading-6 text-white/70">
              Appear higher in search, service pages and location pages.
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 p-5">
            <TrendingUp className="mb-4 text-[#ff5a40]" />
            <h3 className="text-lg font-black">Lead generation</h3>
            <p className="mt-2 text-sm leading-6 text-white/70">
              Receive quote requests from people actively planning functions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
