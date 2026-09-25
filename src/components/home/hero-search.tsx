"use client";

import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
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
  serviceTypeOptions,
} from "@/data/provider-search";
import { apiClient, type ProviderSearchResponse } from "@/lib/api";
import {
  MultiSelectDropdown,
  toggleMultiSelectValue,
} from "@/components/search/multi-select-dropdown";

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
  const [serviceTypes, setServiceTypes] = useState<string[]>(["any"]);
  const [eventTypes, setEventTypes] = useState<string[]>(["any"]);
  const [budget, setBudget] = useState("any");
  const [guests, setGuests] = useState("any");
  const [activeTab, setActiveTab] = useState("Services");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [openFilter, setOpenFilter] = useState<FilterKey>(null);

  const activeFilters = activeFilterCount({
    location,
    service,
    serviceTypes,
    eventTypes,
    budget,
    guests,
  });

  const hasActiveSearch = activeFilters > 0;

  const visibleTab = hoveredTab ?? activeTab;
  const visibleTabIndex = Math.max(tabs.indexOf(visibleTab), 0);

  // Live estimate of matching providers, fetched from the API as filters change.
  const [resultCount, setResultCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      const params = new URLSearchParams({
        location,
        q: service,
        serviceType: serviceTypes.join(","),
        eventType: eventTypes.join(","),
        budget,
        guests,
        limit: "1", // we only need `total`, not the items
      });

      apiClient<ProviderSearchResponse>(`/api/providers?${params.toString()}`, {
        signal: controller.signal,
      })
        .then((response) => setResultCount(response.total))
        .catch((error) => {
          if ((error as Error).name !== "AbortError") console.error(error);
        });
    }, 200);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [location, service, serviceTypes, eventTypes, budget, guests]);

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
        serviceType: serviceTypes,
        eventType: eventTypes,
        budget,
        guests,
      }),
    );
  }

  function clearFilters() {
    setLocation("");
    setService("");
    setServiceTypes(["any"]);
    setEventTypes(["any"]);
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

      <div className="occasion-surface-orange bg-[#ff5a40] text-white">
        <div className="mx-auto max-w-7xl px-5 pb-10 md:px-8 md:pb-12">
          <div
            className="mx-auto grid w-full max-w-xl grid-cols-4 items-center pt-5 text-center text-sm font-bold text-white md:max-w-4xl md:pt-6 md:text-lg"
            onMouseLeave={() => setHoveredTab(null)}
          >
            <div className="relative col-span-4 grid grid-cols-4">
              <span
                className="pointer-events-none absolute bottom-0 left-0 h-1 w-1/4 transition-transform duration-300 ease-out"
                style={{
                  transform: `translateX(${visibleTabIndex * 100}%)`,
                }}
              >
                <span className="mx-auto block h-1 w-14 rounded-full bg-[#111111] md:w-20" />
              </span>

              {tabs.map((tab) => {
                const isActive = activeTab === tab;
                const isVisible = visibleTab === tab;

                return (
                  <button
                    key={tab}
                    type="button"
                    onMouseEnter={() => setHoveredTab(tab)}
                    onFocus={() => setHoveredTab(tab)}
                    onClick={() => {
                      if (tab === "Providers") {
                        router.push("/search");
                        return;
                      }
                      if (tab === "Packages") {
                        router.push("/list-your-business");
                        return;
                      }
                      setActiveTab(tab);
                      if (tab === "Occasions") {
                        setOpenFilter("eventType");
                      }
                    }}
                    className={`relative flex min-w-0 justify-center px-3 pb-4 pt-3 transition-colors duration-200 md:px-5 ${
                      isActive || isVisible
                        ? "text-white"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    <span className="truncate">{tab}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mx-auto mt-6 max-w-5xl">
            <div className="rounded-[28px] bg-white p-3 text-[#111111] shadow-[0_20px_50px_rgba(17,17,17,0.18)]">
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
                      {activeTab === "Occasions" ? "Occasion" : "Service"}
                    </span>

                    <input
                      value={service}
                      onChange={(event) => setService(event.target.value)}
                      placeholder={
                        activeTab === "Occasions"
                          ? "What are you celebrating?"
                          : "What service do you need?"
                      }
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
              <MultiSelectDropdown
                label="Service Type"
                placeholder="Select service"
                values={serviceTypes}
                options={serviceTypeOptions}
                isOpen={openFilter === "serviceType"}
                onOpen={() => setOpenFilter("serviceType")}
                onClose={() => setOpenFilter(null)}
                onChange={setServiceTypes}
                skin="hero"
              />

              <MultiSelectDropdown
                label="Event Type"
                placeholder="Select event"
                values={eventTypes}
                options={eventTypeOptions}
                isOpen={openFilter === "eventType"}
                onOpen={() => setOpenFilter("eventType")}
                onClose={() => setOpenFilter(null)}
                onChange={setEventTypes}
                skin="hero"
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
                serviceTypes={serviceTypes}
                eventTypes={eventTypes}
                budget={budget}
                guests={guests}
                onServiceTypesChange={setServiceTypes}
                onEventTypesChange={setEventTypes}
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

function FilterDropdown(
  props: FilterDropdownProps & {
    id?: string;
    name?: string;
    filterKey?: string;
    valueKey?: string;
    openKey?: string;
    dropdownKey?: string;
    queryKey?: string;

    open?: boolean;
    isOpen?: boolean;
    active?: boolean;
    isActive?: boolean;

    openFilter?: string | null;
    activeFilter?: string | null;
    selectedFilter?: string | null;
    currentFilter?: string | null;
    openDropdown?: string | null;
    activeDropdown?: string | null;

    setOpenFilter?: (value: string | null) => void;
    setActiveFilter?: (value: string | null) => void;
    setSelectedFilter?: (value: string | null) => void;
    setCurrentFilter?: (value: string | null) => void;
    setOpenDropdown?: (value: string | null) => void;
    setActiveDropdown?: (value: string | null) => void;

    onToggle?: () => void;
    onOpenChange?: (open: boolean) => void;
    onDropdownChange?: (value: string | null) => void;
  },
) {
  const {
    label,
    placeholder,
    value,
    options,
    onChange,

    id,
    name,
    filterKey,
    valueKey,
    openKey,
    dropdownKey: providedDropdownKey,
    queryKey,

    open,
    isOpen: controlledIsOpen,
    active,
    isActive,

    openFilter,
    activeFilter,
    selectedFilter,
    currentFilter,
    openDropdown,
    activeDropdown,

    setOpenFilter,
    setActiveFilter,
    setSelectedFilter,
    setCurrentFilter,
    setOpenDropdown,
    setActiveDropdown,

    onToggle,
    onOpenChange,
    onDropdownChange,
  } = props;

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [localOpen, setLocalOpen] = useState(false);
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);

  const dropdownKey =
    id ??
    filterKey ??
    valueKey ??
    openKey ??
    providedDropdownKey ??
    queryKey ??
    name ??
    label;

  useEffect(() => {
    function handleOtherDropdownOpen(event: Event) {
      const customEvent = event as CustomEvent<string>;

      if (customEvent.detail !== dropdownKey) {
        setLocalOpen(false);
        setHoveredValue(null);
      }
    }

    window.addEventListener(
      "occasions-home-filter-open",
      handleOtherDropdownOpen,
    );

    return () => {
      window.removeEventListener(
        "occasions-home-filter-open",
        handleOtherDropdownOpen,
      );
    };
  }, [dropdownKey]);

  const controlledOpen =
    typeof controlledIsOpen === "boolean"
      ? controlledIsOpen
      : typeof open === "boolean"
        ? open
        : typeof active === "boolean"
          ? active
          : typeof isActive === "boolean"
            ? isActive
            : undefined;

  const linkedStateValue =
    openFilter ??
    activeFilter ??
    selectedFilter ??
    currentFilter ??
    openDropdown ??
    activeDropdown;

  const hasLinkedState =
    typeof linkedStateValue !== "undefined" &&
    (typeof setOpenFilter === "function" ||
      typeof setActiveFilter === "function" ||
      typeof setSelectedFilter === "function" ||
      typeof setCurrentFilter === "function" ||
      typeof setOpenDropdown === "function" ||
      typeof setActiveDropdown === "function" ||
      typeof onDropdownChange === "function");

  const hasControlledHandler =
    typeof onOpenChange === "function" || typeof onToggle === "function";

  const isOpen =
    typeof controlledOpen === "boolean" && hasControlledHandler
      ? controlledOpen
      : hasLinkedState
        ? linkedStateValue === dropdownKey
        : localOpen;

  const activeOption = options.find((option) => option.value === value);
  const displayValue =
    value === "any" ? placeholder : activeOption?.label ?? placeholder;

  const activeValue = hoveredValue ?? value;
  const activeIndex = Math.max(
    options.findIndex((option) => option.value === activeValue),
    0,
  );

  function announceOpen() {
    window.dispatchEvent(
      new CustomEvent("occasions-home-filter-open", {
        detail: dropdownKey,
      }),
    );
  }

  function setDropdownOpen(nextOpen: boolean) {
    setHoveredValue(null);

    if (nextOpen) {
      announceOpen();
    }

    if (typeof onOpenChange === "function") {
      onOpenChange(nextOpen);
      return;
    }

    if (typeof onDropdownChange === "function") {
      onDropdownChange(nextOpen ? dropdownKey : null);
      return;
    }

    if (typeof setOpenFilter === "function") {
      setOpenFilter(nextOpen ? dropdownKey : null);
      return;
    }

    if (typeof setActiveFilter === "function") {
      setActiveFilter(nextOpen ? dropdownKey : null);
      return;
    }

    if (typeof setSelectedFilter === "function") {
      setSelectedFilter(nextOpen ? dropdownKey : null);
      return;
    }

    if (typeof setCurrentFilter === "function") {
      setCurrentFilter(nextOpen ? dropdownKey : null);
      return;
    }

    if (typeof setOpenDropdown === "function") {
      setOpenDropdown(nextOpen ? dropdownKey : null);
      return;
    }

    if (typeof setActiveDropdown === "function") {
      setActiveDropdown(nextOpen ? dropdownKey : null);
      return;
    }

    if (typeof onToggle === "function" && typeof controlledOpen === "boolean") {
      onToggle();
      return;
    }

    setLocalOpen(nextOpen);
  }

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target as Node | null;

      if (!target || !dropdownRef.current) return;

      if (!dropdownRef.current.contains(target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
    // setDropdownOpen intentionally stays outside dependencies because it manages several optional controlled/uncontrolled dropdown modes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  function handleSelect(nextValue: string) {
    onChange(nextValue);
    setHoveredValue(null);
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setDropdownOpen(!isOpen)}
        className={`flex min-h-[76px] w-full items-center justify-between gap-4 rounded-[18px] border px-5 text-left transition ${
          isOpen
            ? "border-white bg-white text-[#111111] shadow-[0_20px_60px_rgba(17,17,17,0.14)]"
            : "border-white/30 bg-white/10 text-white hover:bg-white/15"
        }`}
      >
        <span className="min-w-0">
          <span
            className={`mb-1 block text-[11px] font-black uppercase tracking-[0.28em] ${
              isOpen ? "text-[#8a8a8a]" : "text-white/80"
            }`}
          >
            {label}
          </span>

          <span className="block truncate text-sm font-black md:text-[15px]">
            {displayValue}
          </span>
        </span>

        <ChevronDown
          size={18}
          className={`shrink-0 transition duration-300 ${
            isOpen ? "rotate-180 text-[#ff5a40]" : "text-white"
          }`}
        />
      </button>

      {isOpen ? (
        <div className="absolute left-0 top-[calc(100%+10px)] z-50 w-[310px] overflow-hidden rounded-[24px] border border-[#deded9] bg-white p-2 text-[#111111] shadow-[0_28px_80px_rgba(17,17,17,0.22)]">
          <div className="px-3 pb-3 pt-2 text-[11px] font-black uppercase tracking-[0.26em] text-[#8a8a8a]">
            {label}
          </div>

          <div className="relative" onMouseLeave={() => setHoveredValue(null)}>
            <div
              className="pointer-events-none absolute left-0 top-0 h-12 w-full rounded-[16px] bg-[#111111] transition-transform duration-300 ease-out"
              style={{
                transform: `translateY(${activeIndex * 3}rem)`,
              }}
            />

            {options.map((option) => {
              const isSelected = option.value === value;
              const isActive = option.value === activeValue;

              return (
                <button
                  key={option.value}
                  type="button"
                  onMouseEnter={() => setHoveredValue(option.value)}
                  onFocus={() => setHoveredValue(option.value)}
                  onClick={() => handleSelect(option.value)}
                  className={`relative z-10 flex min-h-12 w-full items-center gap-4 rounded-[16px] px-3 text-left text-sm font-bold transition-colors duration-200 ${
                    isActive ? "text-white" : "text-[#111111]"
                  }`}
                >
                  <span
                    className={`flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors duration-200 ${
                      isSelected
                        ? isActive
                          ? "border-white bg-white text-[#111111]"
                          : "border-[#111111] bg-[#111111] text-white"
                        : isActive
                          ? "border-white/45 bg-white/10 text-transparent"
                          : "border-[#deded9] bg-white text-transparent"
                    }`}
                  >
                    <Check size={14} strokeWidth={3} />
                  </span>

                  <span>{option.label}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setDropdownOpen(false)}
            className="mt-3 min-h-12 w-full rounded-[16px] bg-[#ff5a40] px-5 text-sm font-black text-white transition hover:bg-[#ed422b]"
          >
            Done
          </button>
        </div>
      ) : null}
    </div>
  );
}

function FilterModalOptionGroup({
  title,
  value,
  options,
  onSelect,
  multiple = false,
}: {
  title: string;
  value: string[];
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
  multiple?: boolean;
}) {
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);

  const activeValue = hoveredValue ?? value[value.length - 1] ?? "any";
  const activeIndex = Math.max(
    options.findIndex((option) => option.value === activeValue),
    0,
  );

  return (
    <div>
      <p className="mb-3 text-xs font-black text-[#111111]">
        {title}
        {multiple ? (
          <span className="ml-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#8a8a8a]">
            Select multiple
          </span>
        ) : null}
      </p>

      <div className="relative space-y-2" onMouseLeave={() => setHoveredValue(null)}>
        <div
          className="pointer-events-none absolute left-0 top-0 h-12 w-full rounded-[14px] bg-[#111111] transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${activeIndex * 3.5}rem)`,
          }}
        />

        {options.map((option) => {
          const isSelected = value.includes(option.value);
          const isActive = option.value === activeValue;

          return (
            <button key={option.value}
              type="button"
              onMouseEnter={() => setHoveredValue(option.value)}
              onFocus={() => setHoveredValue(option.value)}
              onClick={() => onSelect(option.value)}
              className={`relative z-10 flex min-h-12 w-full items-center justify-between gap-3 rounded-[14px] border px-4 text-left text-sm font-semibold transition-colors duration-200 ${
                isActive
                  ? "border-[#111111] text-white"
                  : "border-[#e7e2dd] text-[#111111]"
              }`}
            >
              <span>{option.label}</span>

              <span
                className={`flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors duration-200 ${
                  isSelected
                    ? isActive
                      ? "border-white bg-white text-[#111111]"
                      : "border-[#111111] bg-[#111111] text-white"
                    : isActive
                      ? "border-white/45 bg-white/10 text-transparent"
                      : "border-[#deded9] bg-white text-transparent"
                }`}
              >
                <Check size={13} strokeWidth={3} />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MoreFiltersModal({
  resultCount,
  serviceTypes,
  eventTypes,
  budget,
  guests,
  onServiceTypesChange,
  onEventTypesChange,
  onBudgetChange,
  onGuestsChange,
  onClose,
  onClear,
}: {
  resultCount: number;
  serviceTypes: string[];
  eventTypes: string[];
  budget: string;
  guests: string;
  onServiceTypesChange: (values: string[]) => void;
  onEventTypesChange: (values: string[]) => void;
  onBudgetChange: (value: string) => void;
  onGuestsChange: (value: string) => void;
  onClose: () => void;
  onClear: () => void;
}) {
  const sections = [
    {
      title: "Service Type",
      value: serviceTypes,
      options: serviceTypeOptions,
      multiple: true,
      onSelect: (nextValue: string) =>
        onServiceTypesChange(toggleMultiSelectValue(serviceTypes, nextValue)),
    },
    {
      title: "Event Type",
      value: eventTypes,
      options: eventTypeOptions,
      multiple: true,
      onSelect: (nextValue: string) =>
        onEventTypesChange(toggleMultiSelectValue(eventTypes, nextValue)),
    },
    {
      title: "Estimated Budget",
      value: [budget],
      options: budgetOptions,
      multiple: false,
      onSelect: (nextValue: string) => onBudgetChange(nextValue),
    },
    {
      title: "Guest Count",
      value: [guests],
      options: guestOptions,
      multiple: false,
      onSelect: (nextValue: string) => onGuestsChange(nextValue),
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/45 px-4 py-8 backdrop-blur-md">
      <div className="max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-[28px] bg-white shadow-[0_32px_100px_rgba(17,17,17,0.35)]">
        <div className="flex items-center justify-between border-b border-[#eee8e3] px-7 py-5">
          <h2 className="text-xl font-black text-[#111111]">Filters</h2>

          <button
            type="button"
            onClick={onClose}
            className="flex size-10 items-center justify-center rounded-full bg-[#f4f1ee] text-[#111111] transition hover:bg-[#111111] hover:text-white"
            aria-label="Close filters"
          >
            <X size={20} />
          </button>
        </div>

        <div className="bg-[#ff5a40] px-7 py-6">
          <div className="flex min-h-14 items-center gap-3 rounded-[16px] bg-white px-5 text-[#111111]">
            <Search size={20} className="shrink-0" />

            <p className="text-sm font-bold text-[#8a8a8a]">
              Refine providers by service, occasion, budget and guest count — service and occasion support multiple selections
            </p>
          </div>
        </div>

        <div className="max-h-[58vh] overflow-y-auto px-7 py-6">
          <div className="grid gap-7 md:grid-cols-2">
            {sections.map((section) => (
              <FilterModalOptionGroup
                key={section.title}
                title={section.title}
                value={section.value}
                options={section.options}
                onSelect={section.onSelect}
                multiple={section.multiple}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[#eee8e3] bg-white px-7 py-5">
          <button
            type="button"
            onClick={onClear}
            className="text-sm font-bold text-[#111111] transition hover:text-[#ff5a40]"
          >
            Clear All
          </button>

          <button
            type="button"
            onClick={onClose}
            className="min-h-14 rounded-[16px] bg-[#ff5a40] px-8 text-sm font-black text-white transition hover:bg-[#ed422b]"
          >
            Show {resultCount} Providers
          </button>
        </div>
      </div>
    </div>
  );
}

function activeFilterCount(filters: {
  location: string;
  service: string;
  serviceTypes: string[];
  eventTypes: string[];
  budget: string;
  guests: string;
}) {
  return [
    filters.location.trim(),
    filters.service.trim(),
    !(filters.serviceTypes.length === 1 && filters.serviceTypes[0] === "any"),
    !(filters.eventTypes.length === 1 && filters.eventTypes[0] === "any"),
    filters.budget !== "any",
    filters.guests !== "any",
  ].filter(Boolean).length;
}
