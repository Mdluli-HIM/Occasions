// The homepage hero's live "Search N Providers" count now comes from
// GET /api/providers (see src/lib/api.ts and src/components/home/hero-search.tsx).
// This file keeps only the static filter option labels used by the hero's dropdowns.

export const serviceTypeOptions = [
  { label: "Any service type", value: "any" },
  { label: "Catering", value: "catering" },
  { label: "Tents", value: "tents" },
  { label: "Chairs & Tables", value: "chairs-tables" },
  { label: "Mobile Toilets", value: "mobile-toilets" },
  { label: "Mobile Fridges", value: "mobile-fridges" },
  { label: "Décor", value: "decor" },
  { label: "Sound & DJ", value: "sound-dj" },
  { label: "Photography", value: "photography" },
  { label: "Venues", value: "venues" },
  { label: "Generators", value: "generators" },
];

export const eventTypeOptions = [
  { label: "Any event type", value: "any" },
  { label: "Funeral", value: "funeral" },
  { label: "Wedding", value: "wedding" },
  { label: "Birthday Party", value: "birthday-party" },
  { label: "Church Event", value: "church-event" },
  { label: "Traditional Ceremony", value: "traditional-ceremony" },
  { label: "Corporate Function", value: "corporate-function" },
  { label: "Graduation", value: "graduation" },
  { label: "Baby Shower", value: "baby-shower" },
  { label: "School Event", value: "school-event" },
];

export const budgetOptions = [
  { label: "Any budget", value: "any" },
  { label: "Under R5,000", value: "low" },
  { label: "R5,000 - R15,000", value: "medium" },
  { label: "R15,000 - R40,000", value: "high" },
  { label: "R40,000+", value: "premium" },
];

export const guestOptions = [
  { label: "Any guest count", value: "any" },
  { label: "Under 50 guests", value: "small" },
  { label: "50 - 150 guests", value: "medium" },
  { label: "150 - 300 guests", value: "large" },
  { label: "300+ guests", value: "extra-large" },
];
