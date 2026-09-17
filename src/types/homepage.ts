export type ServiceCategory = {
  id: string;
  name: string;
  count: number;
  image: string;
  description: string;
};

export type EventType = {
  id: string;
  name: string;
  description: string;
};

export type FeaturedProvider = {
  id: string;
  name: string;
  location: string;
  services: string[];
  eventTypes: string[];
  priceFrom: string;
  rating: number;
  reviews: number;
  image: string;
  isVerified: boolean;
  isFeatured: boolean;
};
