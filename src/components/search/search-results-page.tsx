"use client";

import {
  Bell,
  ChevronDown,
  Heart,
  MapPin,
  Search,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  budgetOptions,
  eventOptions,
  guestOptions,
  providerListings,
  serviceOptions,
  sortOptions,
  type ProviderListing,
} from "@/data/search-results";

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
};

export function SearchResultsPage({ initialFilters }: SearchResultsPageProps) {
  const [location, setLocation] = useState(initialFilters.location ?? "");
  const [service, setService] = useState(initialFilters.service ?? "");
  const [serviceType, setServiceType] = useState(
    initialFilters.serviceType ?? "any",
  );
  const [eventType, setEventType] = useState(initialFilters.eventType ?? "any");
  const [budget, setBudget] = useState(initialFilters.budget ?? "any");
  const [guests, setGuests] = useState(initialFilters.guests ?? "any");
  const [sortBy, setSortBy] = useState("recommended");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [savedSearch, setSavedSearch] = useState(false);
  const [savedProviders, setSavedProviders] = useState<string[]>([]);

  const filteredProviders = useMemo(() => {
    const locationSearch = location.trim().toLowerCase();
    const serviceSearch = service.trim().toLowerCase();

    const filtered = providerListings.filter((provider) => {
      const providerLocation =
        `${provider.area} ${provider.location} ${provider.province}`.toLowerCase();

      const providerServiceText = [
        provider.name,
        provider.description,
        provider.services.join(" "),
        provider.serviceSlugs.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      const matchesLocation =
        !locationSearch ||
        locationSearch === "near me" ||
        providerLocation.includes(locationSearch);

      const matchesService =
        !serviceSearch || providerServiceText.includes(serviceSearch);

      const matchesServiceType =
        serviceType === "any" || provider.serviceSlugs.includes(serviceType);

      const matchesEventType =
        eventType === "any" || provider.eventSlugs.includes(eventType);

      const matchesBudget = budget === "any" || provider.budgetLevel === budget;

      const matchesGuests = guests === "any" || provider.guestLevel === guests;

      return (
        matchesLocation &&
        matchesService &&
        matchesServiceType &&
        matchesEventType &&
        matchesBudget &&
        matchesGuests
      );
    });

    return filtered.sort((a, b) => {
      if (sortBy === "featured") {
        return Number(b.isFeatured) - Number(a.isFeatured);
      }

      if (sortBy === "rating") {
        return b.rating - a.rating;
      }

      if (sortBy === "reviews") {
        return b.reviews - a.reviews;
      }

      if (sortBy === "price-low") {
        return a.priceValue - b.priceValue;
      }

      return (
        Number(b.isSponsored) - Number(a.isSponsored) ||
        Number(b.isFeatured) - Number(a.isFeatured) ||
        b.rating - a.rating
      );
    });
  }, [location, service, serviceType, eventType, budget, guests, sortBy]);

  const title = getResultsTitle({
    location,
    service,
    serviceType,
    eventType,
  });

  function clearFilters() {
    setLocation("");
    setService("");
    setServiceType("any");
    setEventType("any");
    setBudget("any");
    setGuests("any");
  }

  function toggleSavedProvider(id: string) {
    setSavedProviders((current) =>
      current.includes(id)
        ? current.filter((providerId) => providerId !== id)
        : [...current, id],
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f6f4]">
      <SiteHeader />

      <DesktopSearchBar
        location={location}
        service={service}
        serviceType={serviceType}
        eventType={eventType}
        budget={budget}
        guests={guests}
        savedSearch={savedSearch}
        onLocationChange={setLocation}
        onServiceChange={setService}
        onServiceTypeChange={setServiceType}
        onEventTypeChange={setEventType}
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

            <div className="mt-5 grid gap-5">
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

              <NearbyAreasPanel />
            </div>
          </aside>
        </section>
      </main>

      {mobileFiltersOpen ? (
        <MobileFiltersDrawer
          location={location}
          service={service}
          serviceType={serviceType}
          eventType={eventType}
          budget={budget}
          guests={guests}
          resultCount={filteredProviders.length}
          onLocationChange={setLocation}
          onServiceChange={setService}
          onServiceTypeChange={setServiceType}
          onEventTypeChange={setEventType}
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
  serviceType,
  eventType,
  budget,
  guests,
  savedSearch,
  onLocationChange,
  onServiceTypeChange,
  onEventTypeChange,
  onBudgetChange,
  onGuestsChange,
  onSaveSearch,
}: {
  location: string;
  service: string;
  serviceType: string;
  eventType: string;
  budget: string;
  guests: string;
  savedSearch: boolean;
  onLocationChange: (value: string) => void;
  onServiceChange: (value: string) => void;
  onServiceTypeChange: (value: string) => void;
  onEventTypeChange: (value: string) => void;
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

            <SelectField
              label="Service"
              value={serviceType}
              options={serviceOptions}
              onChange={onServiceTypeChange}
              compact
              isOpen={openDropdown === "service"}
              onOpenChange={(nextOpen) =>
                setOpenDropdown(nextOpen ? "service" : null)
              }
            />

            <SelectField
              label="Occasion"
              value={eventType}
              options={eventOptions}
              onChange={onEventTypeChange}
              compact
              isOpen={openDropdown === "occasion"}
              onOpenChange={(nextOpen) =>
                setOpenDropdown(nextOpen ? "occasion" : null)
              }
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
function ProviderResultCard({
  provider,
  isSaved,
  onSave,
}: {
  provider: ProviderListing;
  isSaved: boolean;
  onSave: () => void;
}) {
  const router = useRouter();
  const href = `/providers/${provider.id}`;

  function openProvider() {
    router.push(href);
  }

  const listingStatus =
    provider.isSponsored || provider.isFeatured
      ? "Promoted"
      : provider.isVerified
        ? "Verified provider"
        : "Listed provider";

  return (
    <article
      role="link"
      tabIndex={0}
      onClick={openProvider}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openProvider();
        }
      }}
      className="group grid cursor-pointer overflow-hidden rounded-[24px] border border-[#deded9] bg-white shadow-[0_8px_24px_rgba(17,17,17,0.06)] transition duration-300 hover:-translate-y-0.5 hover:border-[#ff5a40] hover:shadow-[0_20px_45px_rgba(17,17,17,0.12)] md:grid-cols-[360px_minmax(0,1fr)]"
      aria-label={`Open ${provider.name}`}
    >
      <div className="relative min-h-[260px] overflow-hidden bg-[#deded9] md:min-h-full">
        <div
          className="absolute inset-0 bg-cover bg-center transition duration-[1200ms] group-hover:scale-[1.045]"
          style={{ backgroundImage: `url(${provider.image})` }}
        />
      </div>

      <div className="relative p-6 md:p-8">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onSave();
          }}
          className={`absolute right-5 top-5 flex size-12 items-center justify-center rounded-[16px] border transition ${
            isSaved
              ? "border-[#ff5a40] bg-[#ff5a40] text-white"
              : "border-[#deded9] bg-white text-[#ff5a40] hover:border-[#ff5a40] hover:bg-[#fff0ec]"
          }`}
          aria-label={`Save ${provider.name}`}
        >
          <Heart size={21} className={isSaved ? "fill-white" : ""} />
        </button>

        <div className="pr-14">
          <p className="text-3xl font-black tracking-tight text-[#111111] md:text-4xl">
            {provider.priceFrom}{" "}
            <span className="text-base font-black text-[#6b7280]">estimate</span>
          </p>

          <h2 className="mt-4 text-2xl font-black text-[#111111]">
            {provider.name}
          </h2>

          <p className="mt-1 text-base font-black text-[#111111]">
            {provider.area}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm font-black text-[#6b7280]">
            <span className="inline-flex items-center gap-2 text-[#111111]">
              <Star size={18} className="fill-[#ff5a40] text-[#ff5a40]" />
              {provider.rating}
            </span>

            <span>{provider.reviews} reviews</span>

            <span>{provider.eventTypes[0]}</span>
          </div>

          <p className="mt-6 text-base font-black leading-7 text-[#111111]">
            {provider.services.join(", ")}
          </p>

          <p className="mt-4 line-clamp-2 text-base leading-7 text-[#343434]">
            {provider.description}
          </p>
        </div>

        <div className="mt-7 flex items-center justify-between border-t border-[#eee8e3] pt-5 text-sm font-black text-[#6b7280]">
          <span className="inline-flex items-center gap-2">
            <MapPin size={17} />
            {provider.location}
          </span>

          <span className="text-[#ff5a40]">{listingStatus}</span>
        </div>
      </div>
    </article>
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
          className="mt-5 min-h-12 w-full rounded-2xl bg-[#ff5a40] px-5 text-sm font-black text-white transition hover:bg-[#ed422b]"
        >
          Manage alerts
        </button>
      </div>
    </div>
  );
}

function NearbyAreasPanel() {
  const areas = [
    "Mbombela",
    "Bushbuckridge",
    "Hazyview",
    "White River",
    "Pretoria",
  ];

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
  serviceType,
  eventType,
  budget,
  guests,
  resultCount,
  onLocationChange,
  onServiceChange,
  onServiceTypeChange,
  onEventTypeChange,
  onBudgetChange,
  onGuestsChange,
  onClose,
  onClear,
}: {
  location: string;
  service: string;
  serviceType: string;
  eventType: string;
  budget: string;
  guests: string;
  resultCount: number;
  onLocationChange: (value: string) => void;
  onServiceChange: (value: string) => void;
  onServiceTypeChange: (value: string) => void;
  onEventTypeChange: (value: string) => void;
  onBudgetChange: (value: string) => void;
  onGuestsChange: (value: string) => void;
  onClose: () => void;
  onClear: () => void;
}) {
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

          <SelectField
            label="Service type"
            value={serviceType}
            options={serviceOptions}
            onChange={onServiceTypeChange}
          />

          <SelectField
            label="Occasion"
            value={eventType}
            options={eventOptions}
            onChange={onEventTypeChange}
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
  serviceType,
  eventType,
}: {
  location: string;
  service: string;
  serviceType: string;
  eventType: string;
}) {
  const serviceLabel =
    service.trim() ||
    serviceOptions.find((option) => option.value === serviceType)?.label ||
    "";

  const eventLabel =
    eventOptions.find((option) => option.value === eventType)?.label || "";

  const hasService = serviceLabel && serviceLabel !== "Any service";
  const hasEvent = eventLabel && eventLabel !== "Any occasion";
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
