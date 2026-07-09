export type NavPanelLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavPanelGroup = {
  title: string;
  links: NavPanelLink[];
};

export type NavItem = {
  label: string;
  href: string;
  description: string;
  groups: NavPanelGroup[];
};

export const desktopNavItems: NavItem[] = [
  {
    label: "Find Services",
    href: "/search",
    description: "Browse trusted local services for weddings, funerals, parties, church events and more.",
    groups: [
      {
        title: "Popular Services",
        links: [
          { label: "Catering", href: "/search?service=catering", description: "Meals, serving staff and event food setup" },
          { label: "Tents", href: "/search?service=tents", description: "Tent hire for outdoor functions" },
          { label: "Chairs & Tables", href: "/search?service=chairs-tables", description: "Seating and table hire for every occasion" },
          { label: "Mobile Toilets", href: "/search?service=mobile-toilets", description: "Portable toilet hire for events" },
        ],
      },
      {
        title: "More Services",
        links: [
          { label: "Décor", href: "/search?service=decor", description: "Décor styling, flowers and backdrops" },
          { label: "Sound & DJ", href: "/search?service=sound-dj", description: "Sound systems and entertainment" },
          { label: "Photography", href: "/search?service=photography", description: "Photo and video coverage" },
          { label: "Mobile Fridges", href: "/search?service=mobile-fridges", description: "Cold storage and mobile fridges" },
        ],
      },
      {
        title: "Quick Browse",
        links: [
          { label: "Featured Providers", href: "#providers", description: "Browse boosted and promoted listings" },
          { label: "Near Me", href: "#near-me", description: "See providers close to your location" },
          { label: "Request a Quote", href: "/quote", description: "Submit a request to multiple provids" },
        ],
      },
    ],
  },
  {
    label: "Event Types",
    href: "#events",
    description: "Start by the type of function you are planning and discover the services usually needed.",
    groups: [
      {
        title: "Family & Community",
        links: [
          { label: "Funerals", href: "/search?event=funeral", description: "Catering, tents, chairs, toilets and more" },
          { label: "Weddings", href: "/search?event=wedding", description: "Décor, catering, photography and venues" },
          { label: "Birthday Parties", href: "/search?event=birthday-party", description: "Food, décor and entertainment" },
          { label: "Traditional Ceremonies", href: "/search?event=traditional-ceremony", description: "Trusted providers for cultural gatherings" },
        ],
      },
      {
        title: "Formal & Organised",
        links: [
          { label: "Church Events", href: "/search?event=church-event", description: "Sound, seating and function support" },
          { label: "Coorate Functions", href: "/search?event=corporate-function", description: "Professional event support services" },
          { label: "Graduations", href: "/search?event=graduation", description: "Celebration planning and setup" },
          { label: "Baby Showers", href: "/search?event=baby-shower", description: "Décor, catering and intimate setups" },
        ],
      },
    ],
  },
  {
    label: "Providers",
    href: "#providers",
    description: "Discover businesses, compare their listings and choose providers based on trust, photos and visibility.",
    groups: [
      {
        title: "Browse Providers",
        links: [
          { label: "Featured Providers", href: "#providers", description: "Promoted businesses with extra visibility" },
          { label: "Verified Providers", href: "/providers?verified=true", description: "Businesses with trusted profile signals" },
          { label: "Top Rated", href: "/providers?sort=top-rated", description: "Providers with strong reviews and activity" },
         { label: "Recently Added", href: "/providers?sort=recent", description: "Fresh listings added to the platform" },
        ],
      },
      {
        title: "Marketplace Tools",
        links: [
          { label: "Compare Listings", href: "/saved", description: "Save and compare providers side by side" },
          { label: "Saved Providers", href: "/saved", description: "Quickly return to providers you like" },
          { label: "Estimated Prices", href: "/search", description: "Browse listings with price guidance" },
        ],
      },
    ],
  },
  {
    label: "For Businesses",
    href: "/list-your-business",
    description: "Everything for service providers who want visibility, enquiries and a strong presence on Occasions.",
    groups: [
      {
        title: "Get Started",
        links: [
          { label: "List Your Business", href: "/list-your-business", description: "Create your provider profile" },
          { label: "Create Free Listing", href: "/list-your-business", description: "Launch your listing and get discovered" },
          { label: "Provider Dashboard", href: "/provider-dashboard", description: "Manage listings, leads and insights" },
        ],
      },
      {
        title: "Grow Visibility",
        links: [
          { label: "Featured Listings", href: "/provider-dashboard/featured", description: "Boost your position and visibility" },
          { label: "Lead Generation", href: "/provider-dashboard/leads", description: "Receive quote requests from customers" },
          { label: "Promote Your Services", href: "/provider-dashboard/marketing", description: "Marketing options for more exposure" },
        ],
      },
    ],
  },
  {
    label: "Pricing",
    href: "#pricing",
    description: "Simple plans for providers who want more visibility, better placement and stronger lead generation.",
    groups: [
      {
        title: "Plans",
        links: [
          { label: "Free Launch Listing", href: "#pricing", description: "Start with a basic public listing" },
          { label: "Standard Plan", href: "#pricing", description: "More visibility and lead tools" },
          { label: "Premium Placement", href: "#pricing", description: "Featured exposure across the marketplace" },
        ],
      },
      {
        title: "Advertising",
        links: [
          { label: "Homepage Promotion", href: "#pricing", description: "Appear in prime homepage positions" },
          { label: "Area Sponsorships", href: "#pricing", description: "Dominate a location or service page" },
          { label: "Compare Plans", href: "#pricing", description: "See what each package offers" },
        ],
      },
    ],
  },
];
