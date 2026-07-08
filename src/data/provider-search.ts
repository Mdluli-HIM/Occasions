export type ProviderSearchItem = {
  id: string;
  name: string;
  location: string;
  province: string;
  services: string[];
  eventTypes: string[];
  budgetLevel: "low" | "medium" | "high" | "premium";
  guestLevel: "small" | "medium" | "large" | "extra-large";
};

const providerNames = [
  "Mandla’s Event Rentals",
  "Nkosi Catering Co.",
  "Elegant Occasions Décor",
  "Ubuntu Tent Hire",
  "Royal Table Settings",
  "Siyanda Mobile Toilets",
  "Perfect Sound SA",
  "Luxe Wedding Décor",
  "Bushveld Catering",
  "Prime Cold Rooms",
  "Golden Chairs Hire",
  "Mkhonto Photography",
  "Blue Sky Events",
  "Legacy Funeral Catering",
  "Urban Event Co.",
  "Thando Décor Studio",
  "Velvet Sound & DJ",
  "Easy Function Hire",
  "Mabunda Mobile Fridges",
  "Heritage Event Services",
  "Blessed Gatherings",
  "North Star Venues",
  "Black Tie Functions",
  "Evergreen Tents",
  "The Setup Crew",
  "Pure Elegance Events",
  "Community Catering Hub",
  "Majestic C & Tables",
  "Elite Mobile Toilets",
  "Fresh Plate Catering",
  "Visionary Photography",
  "Sunset Event Rentals",
  "Amari Décor House",
  "Big Day Sound",
  "Family Function Hire",
  "Ndlovu Events",
  "Local Legends Catering",
  "Silverline Tents",
  "Graceful Gatherings",
  "One Stop Function Hire",
  "Premier Funeral Services",
  "Celebration Central",
  "The Occasion Company",
  "Mzansi Event Pros",
  "Signature Setups",
  "Reliable Rentals SA",
];

const locations = [
  { location: "Mbombela", province: "Mpumalanga" },
  { location: "Bushbuckridge", province: "Mpumalanga" },
  { location: "Acornhoek", province: "Mpumalanga" },
  { location: "Hazyview", province: "Mpumalanga" },
  { location: "Soweto", province: "Gauteng" },
  { location: "Pretoria", province: "Gauteng" },
  { location: "Polokwane", province: "Limpopo" },
  { location: "Tzaneen", province: "Limpopo" },
];

const serviceGroups = [
  ["Catering", "Chairs & Tables", "Tents"],
  ["Tents", "Mobile Toilets", "Mobile Fridges"],
  ["Décor", "Photography", "Sound & DJ"],
  ["Catering", "Décor", "Venues"],
  ["Chairs & Tables", "Tents", "Generators"],
  ["Mobile Toilets", "Cleaning", "Security"],
  ["Photography", "Sound & DJ", "Décor"],
  ["Mobile Fridges", "Catering", "Transport"],
];

const eventGroups = [
  ["Funeral", "Wedding", "Church Event"],
  ["Wedding", "Birthday Party", "Baby Shower"],
  ["Funeral", "Traditional Ceremony", "Family Gathering"],
  ["Corporate Function", "School Event", "Graduation"],
  ["Church Event", "Traditional Ceremony", "Funeral"],
  ["Birthday Party", "Wedding", "Corporate Function"],
];

const budgetLevels: ProviderSearchItem["budgetLevel"][] = [
  "low",
  "medium",
  "high",
  "premium",
];

const guestLevels: ProviderSearchItem["guestLevel"][] = [
  "small",
  "medium",
  "large",
  "extra-large",
];

export const providerSearchIndex: ProviderSearchItem[] = providerNames.map(
  (name, index) => {
    const place = locations[index % locations.length];

    return {
      id: name.toLowerCase().replace(/[^a0-9]+/g, "-").replace(/^-|-$/g, ""),
      name,
      location: place.location,
      province: place.province,
      services: serviceGroups[index % serviceGroups.length],
      eventTypes: eventGroups[index % eventGroups.length],
      budgetLevel: budgetLevels[index % budgetLevels.length],
      guestLevel: guestLevels[index % guestLevels.length],
    };
  },
);

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
  { label: "Fneral", value: "funeral" },
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

export function normaliseSearchValue(value: string) {
  return value.trim().toLowerCase();
}

export function slugToLabel(value: string) {
  return value.replace(/-/g, " ").toLowerCase();
}
