export type ProviderDetail = {
  id: string;
  name: string;
  category: string;
  tagline: string;
  location: string;
  province: string;
  priceLabel: string;
  priceNote: string;
  rating: number;
  reviewCount: number;
  responseTime: string;
  yearsExperience: string;
  capacity: string;
  verified: boolean;
  promoted: boolean;
  images: string[];
  services: string[];
  eventTypes: string[];
  areasServed: string[];
  summary: string;
  description: string[];
  highlights: string[];
  overview: {
    title: string;
    rows: {
      label: string;
      value: string;
    }[];
  }[];
  reviews: {
    name: string;
    rating: number;
    date: string;
    comment: string;
  }[];
  contact: {
    person: string;
    phone: string;
    email: string;
    whatsapp: string;
  };
  similar: {
    id: string;
    name: string;
    image: string;
    priceLabel: string;
    location: string;
  }[];
};

const freshPlate: ProviderDetail = {
  id: "fresh-plate-catering",
  name: "Fresh Plate Catering",
  category: "Catering",
  tagline: "Full-service catering for weddings, funerals, parties and family functions.",
  location: "Polokwane",
  province: "Limpopo",
  priceLabel: "From R120 pp",
  priceNote: "estimated per guest",
  rating: 4.9,
  reviewCount: 52,
  responseTime: "Usually responds within 20 minutes",
  yearsExperience: "6+ years",
  capacity: "30 - 500 guests",
  verified: true,
  promoted: true,
  images: [
    "/images/services/chairs.jpg",
    "/images/providers/provider-1.jpg",
    "/images/providers/provider-3.jpg",
    "/images/services/chairs.jpg",
    "/images/providers/provider-2.jpg",
    "/images/services/decor.jpg",
    "/images/services/tents.jpg",
    "/images/hero/occasion-hero.jpg"
  ],
  services: [
    "Buffet catering",
    "Plated meals",
    "Serving staff",
    "Menu planning",
    "Traditional meals",
    "Corporate lunch",
    "Funeral catering",
    "Wedding catering"
  ],
  eventTypes: [
    "Weddings",
    "Funerals",
    "Birthday Parties",
    "Church Events",
    "Traditional Ceremonies",
    "Corporate Functions"
  ],
  areasServed: ["Polokwane", "Seshego", "Mankweng", "Lebowakgomo", "Mokopane"],
  summary:
    "Fresh Plate Catering helps families and event organisers serve reliable, well-presented meals without the stress of managing food service alone.",
  description: [
    "Fresh Plate Catering is a Limpopo-based catering provider offering food preparation, buffet setup and serving support for private and community functions.",
    "The team supports weddings, funerals, church gatherings, birthdays and corporate events with clear communication, flexible menu options and dependable delivery.",
    "Menus can be adjusted for traditional meals, formal meals, light refreshments and large guest counts."
  ],
  highlights: [
    "Verified provider profile",
    "Suitable for small and large functions",
    "Buffet setup and serving team available",
    "Traditional menu options available",
    "Fast response time"
  ],
  overview: [
    {
      title: "Service Overview",
      rows: [
        { label: "Main service", value: "Catering" },
        { label: "Price estimate", value: "From R120 per person" },
        { label: "Guest capacity", value: "30 - 500 guests" },
        { label: "Response time", value: "Within 20 minutes" }
      ]
    },
    {
      title: "Occasions Supported",
      rows: [
        { label: "Weddings", value: "Yes" },
        { label: "Funerals", value: "Yes" },
        { label: "Church events", value: "Yes" },
        { label: "Corporate functions", value: "Yes" }
      ]
    },
    {
      title: "Included Options",
      rows: [
        { label: "Serving staff", value: "Available" },
        { label: "Menu planning", value: "Available" },
        { label: "Buffet setup", value: "Available" },
        { label: "Custom menu", value: "On request" }
      ]
    }
  ],
  reviews: [
    {
      name: "Thato M.",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "The food was delivered on time and the serving team was professional. Our family function went smoothly."
    },
    {
      name: "Lerato K.",
      rating: 5,
      date: "1 month ago",
      comment:
        "Very clear communication and generous portions. I would use them again for a wedding or church event."
    },
    {
      name: "Mpho R.",
      rating: 4.8,
      date: "2 months ago",
      comment:
        "Good value for the price. They helped us choose a menu that worked for our guest count."
    }
  ],
  contact: {
    person: "Fresh Plate Team",
    phone: "068 036 4445",
    email: "hello@freshplate.co.za",
    whatsapp: "27680364445"
  },
  similar: [
    {
      id: "nkosi-catering-co",
      name: "Nkosi Catering Co.",
      image: "/images/services/catering.jpg",
      priceLabel: "From R85 pp",
      location: "Bushbuckridge"
    },
    {
      id: "mandlas-event-rentals",
      name: "Mandla’s Event Rentals",
      image: "/images/services/sound.jpg",
      priceLabel: "From R1,500",
      location: "Mbombela"
    }
  ]
};

const mandlas: ProviderDetail = {
  ...freshPlate,
  id: "mandlas-event-rentals",
  name: "Mandla’s Event Rentals",
  category: "Event Rentals",
  tagline: "Tents, chairs, tables and mobile fridges for family and community functions.",
  location: "Mbombela",
  province: "Mpumalanga",
  priceLabel: "From R1,500",
  priceNote: "estimated rental setup",
  rating: 4.8,
  reviewCount: 36,
  responseTime: "Usually responds within 35 minutes",
  yearsExperience: "8+ years",
  capacity: "50 - 800 guests",
  images: [
    "/images/services/fridges.jpg",
    "/images/providers/provider-1.jpg",
    "/images/providers/provider-2.jpg",
    "/images/services/toilets.jpg",
    "/images/providers/provider-3.jpg",
    "/images/hero/occasion-hero.jpg",
    "/images/services/photography.jpg",
    "/images/services/tents.jpg"
  ],
  services: [
    "Tents",
    "Chairs",
    "Tables",
    "Mobile fridges",
    "Outdoor setup",
    "Funeral setup",
    "Wedding setup"
  ],
  eventTypes: ["Funerals", "Weddings", "Church Events", "Traditional Ceremonies"],
  areasServed: ["Mbombela", "White River", "Hazyview", "Bushbuckridge"],
  summary:
    "Mandla’s Event Rentals provides reliable event equipment for large family functions, church gatherings and outdoor ceremonies."
};

const nkosi: ProviderDetail = {
  ...freshPlate,
  id: "nkosi-catering-co",
  name: "Nkosi Catering Co.",
  location: "Bushbuckridge",
  province: "Mpumalanga",
  priceLabel: "From R85 pp",
  rating: 4.7,
  reviewCount: 41,
  images: [
    "/images/services/catering.jpg",
    "/images/providers/provider-1.jpg",
    "/images/hero/occasion-hero.jpg",
    "/images/services/decor.jpg",
    "/images/providers/provider-2.jpg",
    "/images/services/tents.jpg"
  ]
};

export const providerDetails: Record<string, ProviderDetail> = {
  "fresh-plate-catering": freshPlate,
  "mandlas-event-rentals": mandlas,
  "nkosi-catering-co": nkosi,
  "nkosi-catering": nkosi
};

export const providerIds = Object.keys(providerDetails);

export function getProviderDetail(providerId: string) {
  return providerDetails[providerId] ?? freshPlate;
}
