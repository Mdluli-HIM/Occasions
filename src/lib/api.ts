// Thin fetch wrapper around the Occasions backend (see BACKEND_HANDOFF.md
// section 7 for the route contract). Set NEXT_PUBLIC_API_URL in .env.local,
// e.g. NEXT_PUBLIC_API_URL=http://localhost:4000
//
// IMPORTANT: this file must stay client-safe (no `next/headers`, no
// `server-only`) because Client Components import it directly for
// `apiClient` and the shared types. Server Components should import
// `apiServer` from "@/lib/api-server" instead — that's the file allowed to
// touch server-only APIs.

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export type FetchOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  token?: string | null;
};

export async function apiRequest<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const { token, body, headers, ...rest } = options;

  // FormData (file uploads) must NOT get a JSON Content-Type or a
  // JSON.stringify'd body — the browser sets its own multipart boundary.
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  const response = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: isFormData ? (body as FormData) : body !== undefined ? JSON.stringify(body) : undefined,
    // Provider dashboard / search results should always be fresh.
    cache: options.cache ?? "no-store",
  });

  if (!response.ok) {
    let message = response.statusText;
    try {
      const data = await response.json();
      message = data.error ?? message;
    } catch {
      // response wasn't JSON — keep statusText
    }
    throw new ApiError(response.status, message);
  }

  if (response.status === 204) return undefined as T;

  return (await response.json()) as T;
}

/** Use from client ("use client") components — attaches the session token
 * by first calling the frontend's own /api/auth/token route. */
export async function apiClient<T>(path: string, options: FetchOptions = {}): Promise<T> {
  let token = options.token ?? null;

  if (token === null) {
    try {
      const tokenResponse = await fetch("/api/auth/token", { cache: "no-store" });
      if (tokenResponse.ok) {
        const data = (await tokenResponse.json()) as { token: string | null };
        token = data.token;
      }
    } catch {
      // Not signed in / route unavailable — proceed unauthenticated.
    }
  }

  return apiRequest<T>(path, { ...options, token });
}

// ---- Shared response shapes (mirrors the backend's serializers) ----

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

export type ProviderSearchResponse = {
  items: ProviderListing[];
  total: number;
  page: number;
  limit: number;
};

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
  overview: { title: string; rows: { label: string; value: string }[] }[];
  reviews: { name: string; rating: number; date: string; comment: string }[];
  contact: { person: string; phone: string; email: string; whatsapp: string };
  similar: { id: string; name: string; image: string; priceLabel: string; location: string }[];
};

export type EventBrief = {
  id: string;
  occasion: string;
  location: string;
  eventDate: string;
  guests: string;
  budget: string;
  notes: string;
  serviceSlugs: string[];
  createdAt: string;
};

export type EventBriefDetail = {
  brief: EventBrief;
  providersByService: Record<string, ProviderListing[]>;
};

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
  status: "New" | "Viewed" | "Contacted" | "Quoted" | "Accepted" | "Completed" | "Closed";
  urgency: "High" | "Medium" | "Low";
  receivedAt: string;
  contactMethod: "WhatsApp" | "Phone" | "Email";
};
