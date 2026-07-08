import type {
  EventType,
  FeaturedProvider,
  ServiceCategory,
} from "@/types/homepage";

export const serviceCategories: ServiceCategory[] = [
  {
    id: "catering",
    name: "Catering",
    count: 42,
    image: "/images/services/catering.jpg",
    description: "Food services for funerals, weddings and private functions.",
  },
  {
    id: "tents",
    name: "Tents",
    count: 31,
    image: "/images/services/tents.jpg",
    description: "Tent hire for outdoor and large community events.",
  },
  {
    id: "chairs-tables",
    name: "Chairs & Tables",
    count: 58,
    image: "/images/services/chairs.jpg",
    description: "Seating and table hire for all occasion sizes.",
  },
  {
    id: "mobile-toilets",
    name: "Mobile Toilets",
    count: 18,
    image: "/images/services/toilets.jpg",
    description: "Portable toilet hire for outdoor events.",
  },
  {
    id: "mobile-fridges",
    name: "Mobile Fridges",
    count: 16,
    image: "/images/services/fridges.jpg",
    description: "Cold-room and mobile fridge rentals.",
  },
  {
    id: "decor",
    name: "Décor",
    count: 27,
    image: "/images/services/decor.jpg",
    description: "Event styling, flowers, backdrops and table setups.",
  },
  {
    id: "sound-dj",
    name: "Sound & DJ",
    count: 24,
    image: "/images/services/sound.jpg",
    description: "Sound systems, DJs and entertainment setup.",
  },
  {
    id: "photography",
    name: "Photography",
    count: 22,
    image: "/images/services/photography.jpg",
    description: "Event photography and video coverage.",
  },
];

export const eventTypes: EventType[] = [
  {
    id: "funerals",
    name: "Funerals",
    description: "Find catering, tents, chairs, toilets and more.",
  },
  {
    id: "weddings",
    name: "Weddings",
    description: "Compare décor, venues, catering, sound and photography.",
  },
  {
    id: "birthdays",
    name: "Birthday Parties",
    description: "Plan parties with food, décor, entertainment and equipment.",
  },
  {
    id: "church-events",
    name: "Church Events",
    description: "Hire tents, chairs, sound systems and catering providers.",
  },
  {
    id: "traditional-ceremonies",
    name: "Traditional Ceremonies",
    description: "Find trusted providers for cultural and family gatherings.",
  },
  {
    id: "corporate-functions",
    name: "Corporate Functions",
    description: "Book professional services for business functions.",
  },
];

export const featuredProviders: FeaturedProvider[] = [
  {
    id: "mandlas-event-rentals",
    name: "Mandla’s Event Rentals",
    location: "Mbombela, Mpumalanga",
    services: ["Tents", "Chairs", "Tables", "Mobile Fridges"],
    eventTypes: ["Funerals", "Weddings", "Church Events"],
    priceFrom: "From R1,500",
    rating: 4.8,
    reviews: 36,
    image: "/images/providers/provider-1.jpg",
    isVerified: true,
    isFeatured: true,
  },
  {
    id: "nkosi-catering-co",
    name: "Nkosi Catering Co.",
    location: "Bushbuckridge, Mpumalanga",
    services: ["Catering", "Serving Staff", "Full Setup"],
    eventTypes: ["Funerals", "Weddings", "Parties"],
    priceFrom: "From R85 pp",
    rating: 4.7,
    reviews: 29,
    image: "/images/providers/provider-2.jpg",
    isVerified: true,
    isFeatured: true,
  },
  {
    id: "elegant-occasions-decor",
    name: "Elegant Occasions Décor",
    location: "Pretoria, Gauteng",
    services: ["Décor", "Flowers", "Backdrops", "Table Styling"],
    eventTypes: ["Weddings", "Baby Showers", "Corporate"],
    priceFrom: "From R2,800",
    rating: 4.9,
    reviews: 41,
    image: "/images/providers/provider-3.jpg",
    isVerified: true,
    isFeatured: false,
  },
];
