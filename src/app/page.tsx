import { DiscoverSection } from "@/components/home/discover-section";
import { FeaturedProviders } from "@/components/home/featured-providers";
import { HeroSearch } from "@/components/home/hero-search";
import { PopularEvents } from "@/components/home/popular-events";
import { PopularServices } from "@/components/home/popular-services";
import { ProviderCta } from "@/components/home/provider-cta";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <HeroSearch />
      <ProviderCta />
      <DiscoverSection />
      <PopularServices />
      <PopularEvents />
      <FeaturedProviders />
      <SiteFooter />
    </main>
  );
}
