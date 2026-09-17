import { SearchResultsPage } from "@/components/search/search-results-page";
import { type ProviderSearchResponse } from "@/lib/api";
import { apiServer } from "@/lib/api-server";

type SearchPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getParam(
  params: Record<string, string | string[] | undefined>,
  key: string,
) {
  const value = params[key];

  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;

  const filters = {
    location: getParam(params, "location"),
    service: getParam(params, "service"),
    serviceType: getParam(params, "serviceType") || "any",
    eventType: getParam(params, "eventType") || "any",
    budget: getParam(params, "budget") || "any",
    guests: getParam(params, "guests") || "any",
  };

  const query = new URLSearchParams({
    location: filters.location,
    q: filters.service,
    serviceType: filters.serviceType,
    eventType: filters.eventType,
    budget: filters.budget,
    guests: filters.guests,
  });

  let initialResults: ProviderSearchResponse = { items: [], total: 0, page: 1, limit: 20 };
  let nearbyAreas: string[] = [];

  try {
    initialResults = await apiServer<ProviderSearchResponse>(`/api/providers?${query.toString()}`);
  } catch (error) {
    console.error("Failed to load initial search results:", error);
  }

  try {
    const stats = await apiServer<{ topAreas: string[] }>("/api/stats");
    nearbyAreas = stats.topAreas.filter((area) => area !== filters.location);
  } catch (error) {
    console.error("Failed to load nearby areas:", error);
  }

  return (
    <SearchResultsPage
      initialFilters={filters}
      initialResults={initialResults}
      nearbyAreas={nearbyAreas}
    />
  );
}
