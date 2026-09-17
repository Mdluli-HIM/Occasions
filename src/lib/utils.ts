import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createSearchUrl(params: {
  location: string;
  service: string;
  serviceType: string | string[];
  eventType: string | string[];
  budget: string;
  guests: string;
}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    const joined = Array.isArray(value) ? value.join(",") : value;

    if (joined.trim() && joined !== "any") {
      searchParams.set(key, joined);
    }
  });

  return `/search?${searchParams.toString()}`;
}
