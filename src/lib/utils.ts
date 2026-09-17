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


const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

/** Resolves a media URL that may be relative (local-disk storage, e.g.
 * "/uploads/providers/x.jpg") or already absolute (R2/CDN storage) into a
 * URL usable from the frontend origin. See src/lib/storage.ts on the
 * backend for the two shapes this needs to handle. */
export function resolveMediaUrl(url: string): string {
  if (!url) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${API_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}
