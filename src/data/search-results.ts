export type ProviderListing = {
  id: string;
  name: string;
  image: string;
  location: string;
  province: string;
  area: string;
  priceFrom: string;
  priceValue: number;
  rating: number;
  reviews: number;
  services: string[];
  serviceSlugs: string[];
  eventTypes: string[];
  eventSlugs: string[];
  budgetLevel: "low" | "medium" | "high" | "premium";
  guestLevel: "small" | "medium" | "large" | "extra-large";
  description: string;
  isFeatured: boolean;
  isVerified: boolean;
  isSponsored: boolean;
};

export const providerListings: ProviderListing[] = [
  {
    id: "mandla-event-rentals",
    name: "Mandla’s Event Rentals",
    image: "/images/providers/provider-1.jpg",
    location: "Mbombela, Mpumalanga",
    province: "Mpumalanga",
    area: "Mbombela",
    priceFrom: "From R1,500",
    priceValue: 1500,
    rating: 4.8,
    reviews: 36,
    services: ["Tents", "Chairs", "Tables", "Mobile Fridges"],
    serviceSlugs: ["tents", "chairs-tables", "mobile-fridges"],
    eventTypes: ["Funerals", "Weddings", "Church Events"],
    eventSlugs: ["funeral", "wedding", "church-event"],
    budgetLevel: "medium",
    guestLevel: "large",
    description:
      "Reliable event rental setup for family functions, church gatherings and large outdoor occasions.",
    isFeatured: true,
    isVerified: true,
    isSponsored: true,
  },
  {
    id: "nkosi-catering-co",
    name: "Nkosi Catering Co.",
    image: "/images/providers/provider-2.jpg",
    location: "Bushbuckridge, Mpumalanga",
    province: "Mpumalanga",
    area: "Bushbuckridge",
    priceFrom: "From R85 pp",
    priceValue: 85,
    rating: 4.7,
    reviews: 29,
    services: ["Catering", "Serving Staff", "Full Setup"],
    serviceSlugs: ["catering"],
    eventTypes: ["Funerals", "Weddings", "Parties"],
    eventSlugs: ["funeral", "wedding", "birthday-party"],
    budgetLevel: "low",
    guestLevel: "medium",
    description:
      "Traditional and modern catering packages for funerals, weddings, birthdays and family gatherings.",
    isFeatured: true,
    isVerified: true,
    isSponsored: false,
  },
  {
    id: "elegant-occasions-decor",
    name: "Elegant Occasions Décor",
    image: "/images/providers/provider-3.jpg",
    location: "Pretoria, Gauteng",
    province: "Gauteng",
    area: "Pretoria",
    priceFrom: "From R2,800",
    priceValue: 2800,
    rating: 4.9,
    reviews: 41,
    services: ["Décor", "Flowers", "Backdrops", "Table Styling"],
    serviceSlugs: ["decor"],
    eventTypes: ["Weddings", "Baby Showers", "Corporate Functions"],
    eventSlugs: ["wedding", "baby-shower", "corporate-function"],
    budgetLevel: "high",
    guestLevel: "medium",
    description:
      "Premium event styling for weddings, intimate celebrations and professional functions.",
    isFeatured: false,
    isVerified: true,
    isSponsored: false,
  },
  {
    id: "siyanda-mobile-toilets",
    name: "Siyanda Mobile Toilets",
    image: "/images/services/toilets.jpg",
    location: "Hazyview, Mpumalanga",
    province: "Mpumalanga",
    area: "Hazyview",
    priceFrom: "From R900",
    priceValue: 900,
    rating: 4.5,
    reviews: 18,
    services: ["Mobile Toilets", "Cleaning Support"],
    serviceSlugs: ["mobile-toilets"],
    eventTypes: ["Funerals", "Church Events", "Traditional Ceremonies"],
    eventSlugs: ["funeral", "church-event", "traditional-ceremony"],
    budgetLevel: "low",
    guestLevel: "large",
    description:
      "Portable toilet hire for outdoor functions, rural ceremonies and community gatherings.",
    isFeatured: false,
    isVerified: true,
    isSponsored: true,
  },
  {
    id: "perfect-sound-sa",
    name: "Perfect Sound SA",
    image: "/images/services/sound.jpg",
    location: "Soweto, Gauteng",
    province: "Gauteng",
    area: "Soweto",
    priceFrom: "From R1,200",
    priceValue: 1200,
    rating: 4.6,
    reviews: 24,
    services: ["Sound & DJ", "Lighting", "Microphones"],
    serviceSlugs: ["sound-dj"],
    eventTypes: ["Parties", "Weddings", "Corporate Functions"],
    eventSlugs: ["birthday-party", "wedding", "corporate-function"],
    budgetLevel: "medium",
    guestLevel: "medium",
    description:
      "Sound systems, DJ services and event audio setup for private and public functions.",
    isFeatured: false,
    isVerified: false,
    isSponsored: false,
  },
  {
    id: "fresh-plate-catering",
    name: "Fresh Plate Catering",
    image: "/images/services/catering.jpg",
    location: "Polokwane, Limpopo",
    province: "Limpopo",
    area: "Polokwane",
    priceFrom: "From R120 pp",
    priceValue: 120,
    rating: 4.9,
    reviews: 52,
    services: ["Catering", "Buffet Setup", "Serving Staff"],
    serviceSlugs: ["catering"],
    eventTypes: ["Weddings", "Funerals", "Corporate Functions"],
    eventSlugs: ["wedding", "funeral", "corporate-function"],
    budgetLevel: "medium",
    guestLevel: "extra-large",
    description:
      "Full-service catering team with menu planning, buffet setup and serving staff.",
    isFeatured: true,
    isVerified: true,
    isSponsored: true,
  },
];

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
