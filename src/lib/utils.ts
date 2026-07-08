import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createSearchUrl(params: {
  location: string;
  service: string;
  serviceType: string;
  eventType: string;
  budget: string;
  guests: string;
}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value.trim()) {
      searchParams.set(key, value);
    }
  });

  return `/search?${searchParams.toString()}`;
}
