"use client";

import {
  Bell,
  ChevronDown,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  budgetOptions,
  eventOptions,
  guestOptions,
  serviceOptions,
  sortOptions,
} from "@/data/search-results";
import { apiClient, type ProviderListing, type ProviderSearchResponse } from "@/lib/api";
import { MultiSelectDropdown, toggleMultiSelectValue } from "@/components/search/multi-select-dropdown";
import { ProviderResultCard } from "@/components/search/provider-result-card";

type InitialFilters = {
  location?: string;
  service?: string;
  serviceType?: string;
  eventType?: string;
  budget?: string;
  guests?: string;
};

type SearchResultsPageProps = {
  initialFilters: InitialFilters;
  // Fetched server-side in src/app/search/page.tsx for a fast first paint;
  // the client re-fetches from GET /api/providers whenever filters change.
  initialResults: ProviderSearchResponse;
  // Real areas computed from live provider data (GET /api/stats) — not a
  // hardcoded list.
  nearbyAreas: string[];
};

function parseMultiValue(raw: string | undefined): string[] {
  const value = (raw ?? "").trim();
  if (!value || value === "any") return ["any"];
  return value.split(",").map((v) => v.trim()).filter(Boolean);
}

export function SearchResultsPage({ initialFilters, initialResults, nearbyAreas }: SearchResultsPageProps) {
  const { data: session } = useSession();

  const [location, setLocation] = useState(initialFilters.location ?? "");
  const [service, setService] = useState(initialFilters.service ?? "");
  const [serviceTypes, setServiceTypes] = useState<string[]>(
    parseMultiValue(initialFilters.serviceType),
  );
  const [eventTypes, setEventTypes] = useState<string[]>(
    parseMultiValue(initialFilters.eventType),
  );
  const [budget, setBudget] = useState(initialFilters.budget ?? "any");
  const [guests, setGuests] = useState(initialFilters.guests ?? "any");
  const [sortBy, setSortBy] = useState("recommended");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [savedSearch, setSavedSearch] = useState(false);
  const [savedProviders, setSavedProviders] = useState<string[]>([]);
  const [providers, setProviders] = useState<ProviderListing[]>(initialResults.items);
  const [isLoading, setIsLoading] = useState(false);
  const isFirstRender = useRef(true);

  // Re-fetch from the API whenever a filter or the sort order changes.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => {
      setIsLoading(true);

      const params = new URLSearchParams({
        location,
        q: service,
        serviceType: serviceTypes.join(","),
        eventType: eventTypes.join(","),
        budget,
        guests,
        sort: sortBy,
      });

      apiClient<ProviderSearchResponse>(`/api/providers?${params.toString()}`, {
        signal: controller.signal,
      })
        .then((response) => setProviders(response.items))
        .catch((error) => {
          if ((error as Error).name !== "AbortError") console.error(error);
        })
        .finally(() => setIsLoading(false));
    }, 250); // debounce free-text typing

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [location, service, serviceTypes, eventTypes, budget, guests, sortBy]);

  // Load the signed-in customer's saved providers so hearts start filled in.
  useEffect(() => {
    if (session?.user) {
      apiClient<ProviderListing[]>("/api/me/saved-providers")
        .then((items) => setSavedProviders(items.map((item) => item.id)))
        .catch(() => {});
    }
  }, [session?.user]);

  const filteredProviders = providers;

  const title = getResultsTitle({
    location,
    service,
    serviceTypes,
    eventTypes,
  });

  function clearFilters() {
    setLocation("");
    setService("");
    setServiceTypes(["any"]);
    setEventTypes(["any"]);
    setBudget("any");
    setGuests("any");
  }

  function toggleSavedProvider(id: string) {
    const alreadySaved = savedProviders.includes(id);

    setSavedProviders((current) =>
      alreadySaved ? current.filter((providerId) => providerId !== id) : [...current, id],
    );

    if (!session?.user) return; // guests: local-only heart, matches previous MVP behaviour

    const request = alreadySaved
      ? apiClient(`/api/me/saved-providers/${id}`, { method: "DELETE" })
      : apiClient(`/api/me/saved-providers/${id}`, { method: "POST" });

    request.catch((error) => console.error("Failed to update saved provider:", error));
  }

  return (
    <div className="min-h-screen bg-[#f6f6f4]">
      <SiteHeader />

      <DesktopSearchBar
        location={location}
        service={service}
        serviceTypes={serviceTypes}
        eventTypes={eventTypes}
        budget={budget}
        guests={guests}
        savedSearch={savedSearch}
        onLocationChange={setLocation}
        onServiceChange={setService}
        onServiceTypesChange={setServiceTypes}
        onEventTypesChange={setEventTypes}
        onBudgetChange={setBudget}
        onGuestsChange={setGuests}
        onSaveSearch={() => setSavedSearch((value) => !value)}
      />

      <main>
        <section className="border-b border-[#deded9] bg-white px-5 py-5 md:hidden">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#ff5a40]">
                Search results
              </p>

              <h1 className="mt-2 text-2xl font-black leading-tight text-[#111111]">
                {title}
              </h1>

              <p className="mt-1 text-sm text-[#6f6f6f]">
                {filteredProviders.length}{" "}
                {filteredProviders.length === 1 ? "provider" : "providers"}{" "}
                found
              </p>
            </div>

            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#deded9] bg-white text-[#ff5a40]"
              aria-label="Open filters"
            >
              <SlidersHorizontal size={22} />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-[1fr_auto] gap-3">
            <SelectField
              label="Sort"
              value={sortBy}
              options={sortOptions}
              onChange={setSortBy}
              compact
            />

            <button
              type="button"
              onClick={() => setSavedSearch((value) => !value)}
              className={`min-h-12 rounded-2xl px-4 text-sm font-black ${
                savedSearch
                  ? "bg-[#111111] text-white"
                  : "border border-[#deded9] bg-white text-[#111111]"
              }`}
            >
              {savedSearch ? "Saved" : "Save"}
            </button>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-7 px-5 py-6 md:grid-cols-[minmax(0,780px)_1fr] md:px-8 md:py-8 lg:grid-cols-[minmax(0,820px)_360px]">
          <div>
            <div className="hidden md:block">
              <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-[#6f6f6f]">
                <span>South Africa</span>
                <span>/</span>
                <span>Providers</span>
                {location ? (
                  <>
                    <span>/</span>
                    <span className="font-bold text-[#111111]">{location}</span>
                  </>
                ) : null}
              </div>

              <div className="flex items-end justify-between gap-5">
                <div>
                  <h1 className="text-3xl font-black text-[#111111]">
                    {title}
                  </h1>

                  <p className="mt-3 text-base text-[#111111]">
                    <span className="font-black">
                      1-{filteredProviders.length}
                    </span>{" "}
                    of {filteredProviders.length} results
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-[#6f6f6f]">
                    Sort by
                  </span>
                  <div className="w-52">
                    <SelectField
                      label="Sort"
                      value={sortBy}
                      options={sortOptions}
                      onChange={setSortBy}
                      compact
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={`mt-5 grid gap-5 transition-opacity ${isLoading ? "opacity-60" : "opacity-100"}`}>
              {filteredProviders.length > 0 ? (
                filteredProviders.map((provider) => (
                  <ProviderResultCard
                    key={provider.id}
                    provider={provider}
                    isSaved={savedProviders.includes(provider.id)}
                    onSave={() => toggleSavedProvider(provider.id)}
                  />
                ))
              ) : (
                <EmptyState onClear={clearFilters} />
              )}
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-[162px] grid gap-5">
              <ProviderAlertsPanel />

              <NearbyAreasPanel areas={nearbyAreas} />
            </div>
          </aside>
        </section>
      </main>

      {mobileFiltersOpen ? (
        <MobileFiltersDrawer
          location={location}
          service={service}
          serviceTypes={serviceTypes}
          eventTypes={eventTypes}
          budget={budget}
          guests={guests}
          resultCount={filteredProviders.length}
          onLocationChange={setLocation}
          onServiceChange={setService}
          onServiceTypesChange={setServiceTypes}
          onEventTypesChange={setEventTypes}
          onBudgetChange={setBudget}
          onGuestsChange={setGuests}
          onClose={() => setMobileFiltersOpen(false)}
          onClear={clearFilters}
        />
      ) : null}

      <SiteFooter />
    </div>
  );
}

function DesktopSearchBar({
  location,
  serviceTypes,
  eventTypes,
  budget,
  guests,
  savedSearch,
  onLocationChange,
  onServiceTypesChange,
  onEventTypesChange,
  onBudgetChange,
  onGuestsChange,
  onSaveSearch,
}: {
  location: string;
  service: string;
  serviceTypes: string[];
  eventTypes: string[];
  budget: string;
  guests: string;
  savedSearch: boolean;
  onLocationChange: (value: string) => void;
  onServiceChange: (value: string) => void;
  onServiceTypesChange: (values: string[]) => void;
  onEventTypesChange: (values: string[]) => void;
  onBudgetChange: (value: string) => void;
  onGuestsChange: (value: string) => void;
  onSaveSearch: () => void;
}) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <section className="sticky top-20 z-40 hidden border-y border-[#ed422b] bg-[#ff5a40] px-5 py-5 shadow-[0_10px_30px_rgba(17,17,17,0.12)] md:block">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[30px] bg-white/15 p-2.5">
          <div className="grid grid-cols-[minmax(220px,1.4fr)_repeat(4,minmax(132px,0.8fr))_136px_112px] gap-3">
            <SearchInput
              value={location}
              placeholder="Location"
              onChange={onLocationChange}
            />

            <MultiSelectDropdown
              label="Service"
              placeholder="Any service"
              values={serviceTypes}
              options={serviceOptions}
              onChange={onServiceTypesChange}
              skin="compact"
              isOpen={openDropdown === "service"}
              onOpen={() => setOpenDropdown("service")}
              onClose={() => setOpenDropdown(null)}
            />

            <MultiSelectDropdown
              label="Occasion"
              placeholder="Any occasion"
              values={eventTypes}
              options={eventOptions}
              onChange={onEventTypesChange}
              skin="compact"
              isOpen={openDropdown === "occasion"}
              onOpen={() => setOpenDropdown("occasion")}
              onClose={() => setOpenDropdown(null)}
            />

            <SelectField
              label="Budget"
              value={budget}
              options={budgetOptions}
              onChange={onBudgetChange}
              compact
              isOpen={openDropdown === "budget"}
              onOpenChange={(nextOpen) =>
                setOpenDropdown(nextOpen ? "budget" : null)
              }
            />

            <SelectField
              label="Guests"
              value={guests}
              options={guestOptions}
              onChange={onGuestsChange}
              compact
              isOpen={openDropdown === "guests"}
              onOpenChange={(nextOpen) =>
                setOpenDropdown(nextOpen ? "guests" : null)
              }
            />

            <button
              type="button"
              onClick={onSaveSearch}
              className={`min-h-14 rounded-[20px] border px-5 text-sm font-black transition ${
                savedSearch
                  ? "border-[#111111] bg-[#111111] text-white hover:bg-black"
                  : "border-white bg-white text-[#111111] hover:bg-[#fff0ec] hover:text-[#ff5a40]"
              }`}
            >
              {savedSearch ? "Saved" : "Save Search"}
            </button>

            <button
              type="button"
              onClick={() => setOpenDropdown(null)}
              className="min-h-14 rounded-[20px] bg-[#111111] px-5 text-sm font-black text-white transition hover:bg-black"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
function ProviderAlertsPanel() {
  return (
    <div className="overflow-hidden rounded-[24px] border border-[#deded9] bg-white shadow-sm">
      <div className="border-b border-[#ff5a40]/20 bg-white px-6 py-7">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#ff5a40]/30 bg-white text-[#111111]">
          <Bell size={28} />
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-black text-[#111111]">
          Get provider alerts
        </h2>

        <p className="mt-3 text-sm leading-6 text-[#6f6f6f]">
          Be the first to know when new providers are added in your selected
          area or service category.
        </p>

        <button
          type="button"
          className="mt-5 min-h-12 w-full rounded-2xl occasion-btn-primary bg-[#ff5a40] px-5 text-sm font-black text-white transition hover:bg-[#ed422b]"
        >
          Manage alerts
        </button>
      </div>
    </div>
  );
}

function NearbyAreasPanel({ areas }: { areas: string[] }) {
  if (areas.length === 0) {
    return null;
  }

  return (
    <div className="rounded-[24px] border border-[#deded9] bg-white p-6 shadow-sm">
      <h2 className="text-lg font-black text-[#111111]">Add nearby areas</h2>

      <div className="mt-4 grid gap-3">
        {areas.map((area) => (
          <label
            key={area}
            className="flex items-center gap-3 text-sm font-semibold text-[#4f4f4f]"
          >
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-[#deded9] accent-[#ff5a40]"
            />
            {area}
          </label>
        ))}
      </div>
    </div>
  );
}

function MobileFiltersDrawer({
  location,
  service,
  serviceTypes,
  eventTypes,
  budget,
  guests,
  resultCount,
  onLocationChange,
  onServiceChange,
  onServiceTypesChange,
  onEventTypesChange,
  onBudgetChange,
  onGuestsChange,
  onClose,
  onClear,
}: {
  location: string;
  service: string;
  serviceTypes: string[];
  eventTypes: string[];
  budget: string;
  guests: string;
  resultCount: number;
  onLocationChange: (value: string) => void;
  onServiceChange: (value: string) => void;
  onServiceTypesChange: (values: string[]) => void;
  onEventTypesChange: (values: string[]) => void;
  onBudgetChange: (value: string) => void;
  onGuestsChange: (value: string) => void;
  onClose: () => void;
  onClear: () => void;
}) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 z-[120] bg-black/45 md:hidden">
      <div className="absolute inset-x-0 bottom-0 max-h-[90dvh] overflow-hidden rounded-t-[32px] bg-white">
        <div className="sticky top-0 flex items-center justify-between border-b border-[#deded9] bg-white px-5 py-5">
          <h2 className="text-2xl font-black text-[#111111]">Filters</h2>

          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#ff5a40]/30 bg-white text-[#111111]"
          >
            <X size={22} />
          </button>
        </div>

        <div className="grid max-h-[calc(90dvh-160px)] gap-4 overflow-y-auto px-5 py-5">
          <SearchInput
            value={location}
            placeholder="Where is the function?"
            onChange={onLocationChange}
          />

          <SearchInput
            value={service}
            placeholder="What service do you need?"
            onChange={onServiceChange}
          />

          <MultiSelectDropdown
            label="Service type"
            placeholder="Any service"
            values={serviceTypes}
            options={serviceOptions}
            onChange={onServiceTypesChange}
            skin="compact"
            isOpen={openDropdown === "service"}
            onOpen={() => setOpenDropdown("service")}
            onClose={() => setOpenDropdown(null)}
          />

          <MultiSelectDropdown
            label="Occasion"
            placeholder="Any occasion"
            values={eventTypes}
            options={eventOptions}
            onChange={onEventTypesChange}
            skin="compact"
            isOpen={openDropdown === "occasion"}
            onOpen={() => setOpenDropdown("occasion")}
            onClose={() => setOpenDropdown(null)}
          />

          <SelectField
            label="Budget"
            value={budget}
            options={budgetOptions}
            onChange={onBudgetChange}
          />

          <SelectField
            label="Guest count"
            value={guests}
            options={guestOptions}
            onChange={onGuestsChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-[#deded9] bg-white p-5">
          <button
            type="button"
            onClick={onClear}
            className="min-h-14 rounded-2xl border border-[#deded9] bg-white px-4 text-sm font-black text-[#111111]"
          >
            Clear all
          </button>

          <button
            type="button"
            onClick={onClose}
            className="min-h-14 rounded-2xl bg-[#ff5a40] px-4 text-sm font-black text-white"
          >
            Show {resultCount}
          </button>
        </div>
      </div>
    </div>
  );
}

function SearchInput({
  value,
  placeholder,
  onChange,
}: {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex min-h-14 items-center gap-3 rounded-[18px] border border-[#deded9] bg-white px-5 transition focus-within:border-[#ff5a40] focus-within:ring-4 focus-within:ring-[#fff0ec]">
      <Search size={20} className="shrink-0 text-[#ff5a40]" />

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-sm font-bold text-[#111111] outline-none placeholder:text-[#8a8a8a]"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
  compact = false,
  isOpen,
  onOpenChange,
}: {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  compact?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dropdownId = `occasions-search-dropdown-${useId()}`;

  const [localOpen, setLocalOpen] = useState(false);
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);

  const dropdownOpen = isOpen ?? localOpen;

  const selectedOption =
    options.find((option) => option.value === value) ?? options[0];

  const activeValue = hoveredValue ?? selectedOption?.value ?? options[0]?.value;

  const activeIndex = Math.max(
    options.findIndex((option) => option.value === activeValue),
    0,
  );

  function closeDropdown() {
    setHoveredValue(null);

    if (onOpenChange) {
      onOpenChange(false);
      return;
    }

    setLocalOpen(false);
  }

  function setDropdownOpen(nextOpen: boolean) {
    setHoveredValue(null);

    if (nextOpen) {
      window.dispatchEvent(
        new CustomEvent("occasions-search-dropdown-open", {
          detail: dropdownId,
        }),
      );
    }

    if (onOpenChange) {
      onOpenChange(nextOpen);
      return;
    }

    setLocalOpen(nextOpen);
  }

  useEffect(() => {
    function handleOtherDropdownOpen(event: Event) {
      const customEvent = event as CustomEvent<string>;

      if (customEvent.detail !== dropdownId) {
        closeDropdown();
      }
    }

    window.addEventListener(
      "occasions-search-dropdown-open",
      handleOtherDropdownOpen,
    );

    return () => {
      window.removeEventListener(
        "occasions-search-dropdown-open",
        handleOtherDropdownOpen,
      );
    };
    // closeDropdown intentionally stays outside dependencies because this component supports controlled and uncontrolled dropdown modes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!dropdownOpen) return;

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target as Node | null;

      if (!target || !dropdownRef.current) return;

      if (!dropdownRef.current.contains(target)) {
        closeDropdown();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
    // closeDropdown intentionally stays outside dependencies because this component supports controlled and uncontrolled dropdown modes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropdownOpen]);

  function handleSelect(nextValue: string) {
    onChange(nextValue);
    closeDropdown();
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`flex min-h-14 w-full items-center justify-between gap-3 rounded-[20px] border bg-white px-5 text-left text-sm font-black text-[#111111] shadow-[0_6px_18px_rgba(17,17,17,0.08)] transition hover:border-[#111111] focus:outline-none ${
          dropdownOpen ? "border-[#111111]" : "border-white"
        }`}
      >
        <span className="min-w-0">
          {!compact ? (
            <span className="mb-0.5 block text-[10px] font-black uppercase tracking-[0.14em] text-[#8a8a8a]">
              {label}
            </span>
          ) : null}

          <span className="block truncate">
            {selectedOption?.label ?? label}
          </span>
        </span>

        <ChevronDown
          size={17}
          className={`shrink-0 text-[#ff5a40] transition duration-300 ${
            dropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {dropdownOpen ? (
        <div className="absolute left-0 top-[calc(100%+10px)] z-[90] w-full min-w-[240px] overflow-hidden rounded-[24px] border border-[#deded9] bg-white p-2 shadow-[0_24px_70px_rgba(17,17,17,0.18)]">
          <div
            className="relative"
            onMouseLeave={() => setHoveredValue(null)}
          >
            <div
              className="pointer-events-none absolute left-0 top-0 h-11 w-full rounded-2xl bg-[#111111] transition-transform duration-300 ease-out"
              style={{
                transform: `translateY(${activeIndex * 2.75}rem)`,
              }}
            />

            {options.map((option) => {
              const isActive = option.value === activeValue;
              const isSelected = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onMouseEnter={() => setHoveredValue(option.value)}
                  onFocus={() => setHoveredValue(option.value)}
                  onClick={() => handleSelect(option.value)}
                  className={`relative z-10 flex min-h-11 w-full items-center justify-between rounded-2xl px-4 text-left text-sm font-bold transition-colors duration-200 ${
                    isActive ? "text-white" : "text-[#111111]"
                  }`}
                >
                  <span>{option.label}</span>

                  {isSelected ? (
                    <span className="text-sm text-[#ff5a40]">✓</span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="rounded-[24px] border border-[#deded9] bg-white p-8 text-center shadow-sm">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#ff5a40]/30 bg-white text-[#111111]">
        <Search size={28} />
      </div>

      <h2 className="mt-5 text-2xl font-black text-[#111111]">
        No providers found
      </h2>

      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#6f6f6f]">
        Try changing the location, service type, occasion, budget or guest
        count.
      </p>

      <button
        type="button"
        onClick={onClear}
        className="mt-6 min-h-12 rounded-2xl bg-[#ff5a40] px-6 text-sm font-black text-white"
      >
        Clear filters
      </button>
    </div>
  );
}

function getResultsTitle({
  location,
  service,
  serviceTypes,
  eventTypes,
}: {
  location: string;
  service: string;
  serviceTypes: string[];
  eventTypes: string[];
}) {
  const selectedServiceLabels = serviceOptions
    .filter((option) => option.value !== "any" && serviceTypes.includes(option.value))
    .map((option) => option.label);

  const selectedEventLabels = eventOptions
    .filter((option) => option.value !== "any" && eventTypes.includes(option.value))
    .map((option) => option.label);

  const serviceLabel =
    service.trim() ||
    (selectedServiceLabels.length === 1
      ? selectedServiceLabels[0]
      : selectedServiceLabels.length > 1
        ? `${selectedServiceLabels[0]} +${selectedServiceLabels.length - 1}`
        : "");

  const eventLabel =
    selectedEventLabels.length === 1
      ? selectedEventLabels[0]
      : selectedEventLabels.length > 1
        ? `${selectedEventLabels[0]} +${selectedEventLabels.length - 1}`
        : "";

  const hasService = Boolean(serviceLabel);
  const hasEvent = Boolean(eventLabel);
  const hasLocation = location.trim();

  if (hasService && hasLocation) {
    return `${serviceLabel} providers in ${location}`;
  }

  if (hasEvent && hasLocation) {
    return `${eventLabel} providers in ${location}`;
  }

  if (hasService) {
    return `${serviceLabel} providers`;
  }

  if (hasEvent) {
    return `${eventLabel} providers`;
  }

  return "Browse trusted providers";
}
