export type LeadStatus = "New" | "Contacted" | "Quoted";
export type LeadUrgency = "High" | "Medium" | "Low";

export type DashboardLead = {
  id: string;
  name: string;
  eventType: string;
  serviceNeeded: string;
  eventDate: string;
  location: string;
  guests: string;
  budget: string;
  phone: string;
  email: string;
  message: string;
  status: LeadStatus;
  urgency: LeadUrgency;
  receivedAt: string;
  contactMethod: "WhatsApp" | "Phone" | "Email";
};

export const providerDashboard = {
  provider: {
    name: "Fresh Plate Catering",
    category: "Catering",
    packageName: "Featured Provider",
    packageStatus: "Active",
    location: "Polokwane, Limpopo",
    profileCompletion: 82,
    rating: 4.8,
    reviews: 24,
    responseTime: "Under 2 hours",
    profileViews: 1248,
    quoteRequests: 36,
    conversionRate: "18%",
    activeSince: "January 2026",
  },

  profileTasks: [
    { label: "Business details added", completed: true },
    { label: "Contact details verified", completed: true },
    { label: "Service areas added", completed: true },
    { label: "Gallery uploaded", completed: true },
    { label: "Pricing guidance added", completed: true },
    { label: "Reviews imported", completed: false },
    { label: "Banking/payment setup", completed: false },
  ],

  listing: {
    services: [
      "Buffet catering",
      "Plated meals",
      "Serving staff",
      "Menu planning",
      "Traditional meals",
      "Corporate lunch",
      "Funeral catering",
      "Wedding catering",
    ],
    occasions: [
      "Weddings",
      "Funerals",
      "Birthday Parties",
      "Church Events",
      "Traditional Ceremonies",
      "Corporate Functions",
    ],
    areas: ["Polokwane", "Mankweng", "Mokopane", "Tzaneen", "Bela-Bela"],
    priceFrom: "From R120 pp",
    capacity: "50 - 350 guests",
    visibility: "Featured in Catering + Limpopo searches",
  },

  leads: [
    {
      id: "lead-001",
      name: "Mpho Mdluli",
      eventType: "Wedding",
      serviceNeeded: "Buffet catering + serving staff",
      eventDate: "2026-08-14",
      location: "Polokwane",
      guests: "150 guests",
      budget: "R18,000 - R25,000",
      phone: "082 555 0182",
      email: "mpho@example.com",
      message:
        "I am planning a wedding and need catering for 150 guests. Please send availability and menu options.",
      status: "New",
      urgency: "High",
      receivedAt: "Today, 09:42",
      contactMethod: "WhatsApp",
    },
    {
      id: "lead-002",
      name: "Thabo Nkuna",
      eventType: "Funeral",
      serviceNeeded: "Traditional meals",
      eventDate: "2026-07-28",
      location: "Mankweng",
      guests: "220 guests",
      budget: "R12,000 - R18,000",
      phone: "073 222 7710",
      email: "thabo@example.com",
      message:
        "We need funeral catering urgently. Please confirm if you can assist and what is included.",
      status: "Contacted",
      urgency: "High",
      receivedAt: "Yesterday, 16:10",
      contactMethod: "Phone",
    },
    {
      id: "lead-003",
      name: "Lerato Radebe",
      eventType: "Corporate Function",
      serviceNeeded: "Corporate lunch",
      eventDate: "2026-09-02",
      location: "Polokwane",
      guests: "80 guests",
      budget: "R8,000 - R12,000",
      phone: "071 444 9022",
      email: "lerato@example.com",
      message:
        "We need lunch catering for a business event. Please send package options.",
      status: "Quoted",
      urgency: "Medium",
      receivedAt: "2 days ago",
      contactMethod: "Email",
    },
  ],
};
