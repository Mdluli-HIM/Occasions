import { SearchResultsPage } from "@/components/search/search-results-page";

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

  return (
    <SearchResultsPage
      initialFilters={{
        location: getParam(params, "location"),
        service: getParam(params, "service"),
        serviceType: getParam(params, "serviceType") || "any",
        eventType: getParam(params, "eventType") || "any",
        budget: getParam(params, "budget") || "any",
        guests: getParam(params, "guests") || "any",
      }}
    />
  );
}
