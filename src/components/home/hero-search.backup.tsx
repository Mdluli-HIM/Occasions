"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  ChevronDown,
  Map,
  MapPin,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { createSearchUrl } from "@/lib/utils";
import {
  budgetOptions,
  eventTypeOptions,
  guestOptions,
  normaliseSearchValue,
  providerSearchIndex,
  serviceTypeOptions,
  slugToLabel,
} from "@/data/provider-search";

const tabs = ["Services", "Occasions", "Providers", "Packages"];

type FilterKey = "serviceType" | "eventType" | "budget" | "guests" | "more" | null;

type FilterOption = {
  label: string;
  value: string;
};

export function HeroSearch() {
  const router = useRouter();

  const [location, setLocation] = useState("");
  const [service, setService] = useState("");
  const [serviceType, setServiceType] = useState("any");
  const [eventType, setEventType] = useState("any");
  const [budget, setBudget] = useState("any");
  const [guests, setGuests] = useState("any");
  const [activeTab, setActiveTab] = useState("Services");
  const [openFilter, setOpenFilter] = useState<FilterKey>(null);

  const activeFilters = activeFilterCount({
    location,
    service,
    serviceType,
    eventType,
    budget,
    guests,
  });

  const hasActiveSearch = activeFilters > 0;

  const resultCount = useMemo(() => {
    const locationSearch = normaliseSearchValue(location);
    const serviceSearch = normaliseSearchValue(service);
    const selectedService = slugToLabel(serviceType);
    const selectedEvent = slugToLabel(eventType);

    return providerSearchIndex.filter((provider) => {
      const providerLocation =
        `${provider.location} ${provider.province}`.toLowerCase();
      const providerServices = provider.services.join(" ").toLowerCase();
      const providerEvents = provider.eventTypes.join(" ").toLowerCase();

      const matchesLocation =
        !locationSearch ||
        locationSearch === "near me" ||
        providerLocation.includes(locationSearch);

      const matchesServiceSearch =
        !serviceSearch || providerServices.includes(serviceSearch);

      const matchesServiceType =
        serviceType === "any" || providerServices.includes(selectedService);

      const matchesEventType =
        eventType === "any" || providerEvents.includes(selectedEvent);

      const matchesBudget = budget === "any" || provider.budgetLevel === budget;

      const matchesGuests = guests === "any" || provider.guestLevel === guests;

      return (
        matchesLocation &&
        matchesServiceSearch &&
        matchesServiceType &&
        matchesEventType &&
        matchesBudget &&
        matchesGuests
      );
    }).length;
  }, [location, service, serviceType, eventType, budget, guests]);

  const buttonText = hasActiveSearch
    ? resultCount === 1
      ? "Search 1 Provider"
      : `Search ${resultCount} Providers`
    : "Search Providers";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    router.push(
      createSearchUrl({
        location,
        service,
        serviceType,
        eventType,
        budget,
        guests,
      }),
    );
  }

  function clearFilters() {
    setLocation("");
    setService("");
    setServiceType("any");
    setEventType("any");
    setBudget("any");
    setGuests("any");
    setOpenFilter(null);
  }

  return (
    <section className="relative">
      <div className="hero-image flex min-h-[300px] items-start justify-center px-5 pb-16 pt-24 text-center md:min-h-[430px] md:pb-20 md:pt-36">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-light tracking-tight text-white md:text-6xl">
            Find Services for Your Occasion
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-white/90 md:text-lg md:leading-8">
            Compare trusted caterers, tents, chairs, mobile toilets, décor,            fridges, sound systems and more — all in one organised marketplace.
          </p>
        </div>
      </div>

      <div className="bg-[#ff5a40] !text-white [&_*]:!text-white">
        <div className="mx-auto max-w-7xl px-5 pb-10 md:px-8 md:pb-12">
          <div className="mx-auto grid w-full max-w-xl grid-cols-4 items-center gap-1 pt-5 text-center text-sm font-bold text-white md:flex md:max-w-4xl md:justify-center md:gap-10 md:pt-6 md:text-lg">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`group relative flex min-w-0 justify-center rounded-2xl px-3 pb-4 pt-3 transition duration-200 hover:bg-white/12 md:px-5 ${
                    isActive ? "text-white" : "text-white/80 hover:text-white"
                  }`}
                >
                  <span className="truncate transition duration-200 group-hover:-translate-y-0.5">
                    {tab}
                  </span>

                  <span
                    className={`absolute bottom-0 left-1/2 h-1 -translate-x-1/2 rounded-full transition-all duration-200 ${
                      isActive
                        ? "w-14 bg-[#111111] md:w-full"
                        : "w-0 bg-white/70 group-hover:w-10 md:group-hover:w-12"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <form onSubmit={handleSubmit} className="mx-auto mt-6 max-w-5xl">
            <div className="rounded-[28px] bg-white p-3 shadow-[0_20px_50px_rgba(17,17,17,0.18)]">
              <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_140px_220px]">
                <label className="flex min-h-[76px] items-center gap-4 rounded-2xl border border-[#deded9] px-4">
                  <MapPin className="shrink-0 text-[#111111]" size={24} />

                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-bold uppercase tracking-[0.14em] text-[#8a8a8a]">
                      Location
                    </span>

                    <input
                      value={location}
                      onChange={(event) => setLocation(event.target.value)}
                      placeholder="Where is the function?"
                      className="mt-1 h-8 w-full border-0 bg-transparent text-base font-semibold text-[#111111] outline-none placeholder:text-[#8a8a8a]"
                    />
                  </span>
                </label>

                <label className="flex min-h-[76px] items-center gap-4 rounded-2xl border border-[#deded9] px-4">
                  <Search className="shrink-0 text-[#111111]" size={24} />

                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-bold uppercase tracking-[0.14em] text-[#8a8a8a]">
                      Service
                    </span>

                    <input
                      value={service}
                      onChange={(event) => setService(event.target.value)}
                      placeholder="What service do you need?"
                      className="mt-1 h-8 w-full border-0 bg-transparent text-base font-semibold text-[#111111] outline-none placeholder:text-[#8a8a8a]"
                    />
                  </span>
                </label>

                <Button
                  variant="outline"
                  className="min-h-[76px] w-full gap-2 rounded-2xl border-[#deded9] text-[#111111]"
                >
                  Map
                  <Map size={18} />
                </Button>

                <Button
                  type="submit"
                  variant="dark"
                  className="min-h-[76px] w-full rounded-2xl text-base font-bold"
                >
                  {buttonText}
                </Button>
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-5">
              <FilterDropdown
                id="serviceType"
                label="Service Type"
                placeholder="Select service"
                value={serviceType}
                options={serviceTypeOptions}
                isOpen={openFilter === "serviceType"}
                onOpen={() =>
                  setOpenFilter(openFilter === "serviceType" ? null : "serviceType")
                }
                onChange={setServiceType}
                onClose={() => setOpenFilter(null)}
              />

              <FilterDropdown
                id="eventType"
                label="Event Type"
                placeholder="Select event"
                value={eventType}
                options={eventTypeOptions}
                isOpen={openFilter === "eventType"}
                onOpen={() =>
                  setOpenFilter(openFilter === "eventType" ? null : "eventType")
                }
                onChange={setEventType}
                onClose={() => setOpenFilter(null)}
              />

              <FilterDropdown
                id="budget"
                label="Estimated Budget"
                placeholder="Any budget"
                value={budget}
                options={budgetOptions}
                isOpen={openFilter === "budget"}
                onOpen={() =>
                  setOpenFilter(openFilter === "budget" ? null : "budget")
                }
                onChange={setBudget}
                onClose={() => setOpenFilter(null)}
              />

              <FilterDropdown
                id="guests"
                label="Guest Count"
                placeholder="Any guests"
                value={guests}
                options={guestOptions}
                isOpen={openFilter === "guests"}
                onOpen={() =>
                  setOpenFilter(openFilter === "guests" ? null : "guests")
                }
                onChange={setGuests}
                onClose={() => setOpenFilter(null)}
              />

              <button
                type="button"
                onClick={() => setOpenFilter("more")}
                className="flex min-h-[74px] items-center justify-center gap-3 rounded-2xl border border-white/30 bg-white/10 px-5 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
              >
                {hasActiveSearch ? (
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
                    {activeFilters}
                  </span>
                ) : null}

                Filters
                <SlidersHorizontal size={18} />
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/90">
              <span>
                {hasActiveSearch
                  ? `Click search to browse ${resultCount} ${
                      resultCount === 1 ? "provider" : "providers"
                    }`
                  : "Start by entering a place, service, or choosing a filter"}
              </span>

              {hasActiveSearch ? (
                <>
                  <span className="hidden md:inline">•</span>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="font-bold text-white"
                  >
                    Clear Filters
                  </button>
                </>
              ) : null}
            </div>

            {openFilter === "more" ? (
              <MoreFiltersModal
              resultCount={resultCount}
                serviceType={serviceType}
                eventType={eventType}
                budget={budget}
                guests={guests}
                onServiceTypeChange={setServiceType}
                onEventTypeChange={setEventType}
                onBudgetChange={setBudget}
                onGuestsChange={setGuests}
                onClose={() => setOpenFilter(null)}
                onClear={clearFilters}
              />
            ) : null}
          </form>
        </div>
      </div>

      <div className="border-b border-[#deded9] bg-[#f6f6f4] px-5 py-8">
        <div className="mx-auto max-w-7xl">
          <button
            type="button"
            onClick={() => setLocation("Near me")}
            className="mx-auto flex min-h-[58px] w-full max-w-xl items-center justify-center gap-3 rounded-2xl border-2 border-[#ff5a40] bg-white px-6 text-base font-semibold text-[#ff5a40]"
          >
            <MapPin size={22} />
            Find Providers Near Me
          </button>
        </div>
      </div>
    </section>
  );
}

type FilterDropdownProps = {
  id: Exclude<FilterKey, "more" | null>;
  label: string;
  placeholder: string;
  value: string;
  options: FilterOption[];
  isOpen: boolean;
  onOpen: () => void;
  onChange: (value: string) => void;
  onClose: () => void;
};

function FilterDropdown({
  label,
  placeholder,
  value,
  options,
  isOpen,
  onOpen,
  onChange,
  onClose,
}: FilterDropdownProps) {
  const activeOption = options.find((option) => option.value === value);
  const displayValue = value === "any" ? placeholder : activeOption?.label;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onOpen}
        className="flex min-h-[74px] w-full items-center justify-between rounded-2xl border border-white/30 bg-white/10 px-5 text-left text-white backdrop-blur-sm transition hover:bg-white/15"
      >
        <span className="min-w-0 flex-1 pr-4">
          <span className="block text-xs font-bold uppercase tracking-[0.14em] text-white/70">
            {label}
          </span>

          <span
            className={`mt-1 block truncate text-base font-semibold ${
              value === "any" ? "text-white/75" : "text-white"
            }`}
          >
            {displayValue}
          </span>
        </span>

        <ChevronDown
          size={18}
          className={`shrink-0 transition ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen ? (
        <div className="absolute left-0 top-[calc(100%+10px)] z-50 w-full min-w-[280px] overflow-hidden rounded-2xl border border-[#deded9] bg-white shadow-[0_24px_70px_rgba(17,17,17,0.22)]">
          <div className="border-b border-[#eeeeea] bg-[#f6f6f4] px-5 py-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8a8a8a]">
              {label}
            </p>
          </div>

          <div className="max-h-[330px] overflow-y-auto p-2">
            {options.map((option) => {
              const isActive = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onChange(option.value)}
                  className={`flex min-h-12 w-full items-center gap-3 rounded-xl px-4 text-left text-sm font-bold transition ${
                    isActive
                      ? "bg-[#111111] text-white"
                      : "text-[#111111] hover:bg-[#fff0ec]"
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-md border ${
                      isActive
                        ? "border-white bg-white text-[#111111]"
                        : "border-[#deded9] bg-white"
                    }`}
                  >
                    {isActive ? <Check size={14} /> : null}
                  </span>

                  {option.label}
                </button>
              );
            })}
          </div>

          <div className="border-t border-[#eeeeea] p-3">
            <button
              type="button"
              onClick={onClose}
              className="min-h-12 w-full rounded-xl bg-[#ff5a40] px-5 text-sm font-black text-white transition hover:bg-[#ed422b] !text-white [&_*]:!text-white"
            >
              Done
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

type MoreFiltersModalProps = {
  resultCount: number;
  serviceType: string;
  eventType: string;
  budget: string;
  guests: string;
  onServiceTypeChange: (value: string) => void;
  onEventTypeChange: (value: string) => void;
  onBudgetChange: (value: string) => void;
  onGuestsChange: (value: string) => void;
  onClose: () => void;
  onClear: () => void;
};

function MoreFiltersModal({
  resultCount,
  serviceType,
  eventType,
  budget,
  guests,
  onServiceTypeChange,
  onEventTypeChange,
  onBudgetChange,
  onGuestsChange,
  onClose,
  onClear,
}: MoreFiltersModalProps) {
  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center bg-black/50 px-4 py-8 backdrop-blur-sm md:items-center">
      <div className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-[0_30px_100px_rgba(0,0,0,0.35)]">
        <div className="flex items-center justify-between border-b border-[#eeeeea] px-6 py-5">
          <h3 className="text-2xl font-black text-[#111111]">Filters</h3>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f6f6f4] text-[#111111]"
          >
            <X size={22} />
          </button>
        </div>

        <div className="bg-[#ff5a40] px-6 py-6 !text-white [&_*]:!text-white">
          <div className="flex min-h-14 items-center gap-3 rounded-2xl bg-white px-4">
            <Search size={22} className="text-white" />
            <span className="text-sm font-semibold text-[#8a8a8a]">
              Refine providers by service, occasion, budget and guest count
            </span>
          </div>
        </div>

        <div className="grid max-h-[65vh] gap-6 overflow-y-auto p-6 md:grid-cols-2">
          <ModalSelect
            label="Service Type"
            value={serviceType}
            options={serviceTypeOptions}
            onChange={onServiceTypeChange}
          />

          <ModalSelect
            label="Event Type"
            value={eventType}
            options={eventTypeOptions}
            onChange={onEventTypeChange}
          />

          <ModalSelect
            label="Estimated Budget"
            value={budget}
            options={budgetOptions}
            onChange={onBudgetChange}
          />

          <ModalSelect
            label="Guest Count"
            value={guests}
            options={guestOptions}
            onChange={onGuestsChange}
          />
        </div>

        <div className="flex flex-col gap-3 border-t border-[#eeeeea] p-6 md:flex-row md:items-center md:justify-between">
          <button
            type="button"
            onClick={onClear}
            className="min-h-12 rounded-xl px-5 text-sm font-black text-[#111111]"
          >
            Clear All
          </button>

          <button
            type="button"
            onClick={onClose}
            className="min-h-14 rounded-xl bg-[#ff5a40] px-8 text-base font-black text-white transition hover:bg-[#ed422b] !text-white [&_*]:!text-white"
          >
            {resultCount === 1
              ? "Show 1 Provider"
              : `Show ${resultCount} Providers`}
          </button>
        </div>
      </div>
    </div>
  );
}

function ModalSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="mb-3 text-sm font-black text-[#111111]">{label}</p>

      <div className="grid gap-2">
        {options.map((option) => {
          const isActive = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`flex min-h-12 items-center justify-between rounded-xl border px-4 text-left text-sm font-bold transition ${
                isActive
                  ? "border-[#111111] bg-[#111111] text-white"
                  : "border-[#deded9] bg-white text-[#111111] hover:border-[#ff5a40]"
              }`}
            >
              {option.label}
              {isActive ? <Check size={16} /> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function activeFilterCount(filters: {
  location: string;
  service: string;
  serviceType: string;
  eventType: string;
  budget: string;
  guests: string;
}) {
  return [
    filters.location.trim(),
    filters.service.trim(),
    filters.serviceType !== "any",
    filters.eventType !== "any",
    filters.budget !== "any",
    filters.guests !== "any",
  ].filter(Boolean).length;
}
