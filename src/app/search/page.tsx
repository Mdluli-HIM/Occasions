import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

type SearchPageProps = {
  searchParams: Promise<{
    location?: string;
    service?: string;
    serviceType?: string;
    eventType?: string;
    budget?: string;
    guests?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;

  return (
    <main>
      <SiteHeader />

      <section className="min-h-[65vh] bg-[#f3f5f8] px-5 py-16 md:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff0ec] text-[#ff5a40]">
            <Search size={30} />
          </div>

          <h1 className="mt-6 text-3xl font-black text-[#111111] md:text-5xl">
            Search results are next
          </h1>

          <p className="mt-4 text-lg leading-8 text-[#6f6f6f]">
            This placeholder confirms the homepage search is working. In Sprint
            2, we will build the full results page with filters, provider cards,
            featured listings and quote request actions.
          </p>

          <div className="mt-8 grid gap-3 rounded-2xl bg-[#f6f6f4] p-5 text-sm md:grid-cols-2">
            <p>
              <strong>Location:</strong> {params.location || "Not selected"}
            </p>
            <p>
              <strong>Service:</strong> {params.service || "Not selected"}
            </p>
            <p>
              <strong>Service Type:</strong>{" "}
              {params.serviceType || "Not selected"}
            </p>
            <p>
              <strong>Event Type:</strong> {params.eventType || "Not selected"}
            </p>
            <p>
              <strong>Budget:</strong> {params.budget || "Not selected"}
            </p>
            <p>
              <strong>Guests:</strong> {params.guests || "Not selected"}
            </p>
          </div>

          <Link href="/">
            <Button className="mt-8">Back to Homepage</Button>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
