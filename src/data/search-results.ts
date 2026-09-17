// Provider search results now come from GET /api/providers (see src/lib/api.ts
// and src/components/search/search-results-page.tsx). This file keeps only the
// static filter option labels used to render the search dropdowns.
export type { ProviderListing } from "@/lib/api";

export const serviceOptions = [
  { label: "Any service", value: "any" },
  { label: "Catering", value: "catering" },
  { label: "Tents", value: "tents" },
  { label: "Chairs & Tables", value: "chairs-tables" },
  { label: "Mobile Toilets", value: "mobile-toilets" },
  { label: "Mobile Fridges", value: "mobile-fridges" },
  { label: "Décor", value: "decor" },
  { label: "Sound & DJ", value: "sound-dj" },
  { label: "Photography", value: "photography" },
];

export const eventOptions = [
  { label: "Any occasion", value: "any" },
  { label: "Funeral", value: "funeral" },
  { label: "Wedding", value: "wedding" },
  { label: "Birthday Party", value: "birthday-party" },
  { label: "Church Event", value: "church-event" },
  { label: "Traditional Ceremony", value: "traditional-ceremony" },
  { label: "Corporate Function", value: "corporate-function" },
  { label: "Baby Shower", value: "baby-shower" },
];

export const budgetOptions = [
  { label: "Any budget", value: "any" },
  { label: "Under R5,000", value: "low" },
  { label: "R5,000 - R15,000", value: "medium" },
  { label: "R15,000 - R40,000", value: "high" },
  { label: "R40,000+", value: "premium" },
];

export const guestOptions = [
  { label: "Any guests", value: "any" },
  { label: "Under 50 guests", value: "small" },
  { label: "50 - 150 guests", value: "medium" },
  { label: "150 - 300 guests", value: "large" },
  { label: "300+ guests", value: "extra-large" },
];

export const sortOptions = [
  { label: "Recommended", value: "recommended" },
  { label: "Featured first", value: "featured" },
  { label: "Highest rated", value: "rating" },
  { label: "Most reviewed", value: "reviews" },
  { label: "Lowest estimated price", value: "price-low" },
];
