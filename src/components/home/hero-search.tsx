"use client";

import type { FormEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
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
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
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

  const visibleTab = hoveredTab ?? activeTab;
  const visibleTabIndex = Math.max(tabs.indexOf(visibleTab), 0);

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

      <div className="bg-[#ff5a40]">
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
                    onClick={() => setActiveTab(tab)}
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
}: {
  title: string;
  value: string;
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
}) {
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);

  const activeValue = hoveredValue ?? value;
  const activeIndex = Math.max(
    options.findIndex((option) => option.value === activeValue),
    0,
  );

  return (
    <div>
      <p className="mb-3 text-xs font-black text-[#111111]">{title}</p>

      <div className="relative space-y-2" onMouseLeave={() => setHoveredValue(null)}>
        <div
          className="pointer-events-none absolute left-0 top-0 h-12 w-full rounded-[14px] bg-[#111111] transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${activeIndex * 3.5}rem)`,
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

function MoreFiltersModal(props: Record<string, unknown>) {
  type StringSetter = (value: string) => void;
  type BooleanSetter = (value: boolean) => void;

  function getStringValue(keys: string[], fallback: string) {
    for (const key of keys) {
      const value = props[key];

      if (typeof value === "string") {
        return value;
      }
    }

    return fallback;
  }

  function getBooleanValue(keys: string[], fallback: boolean) {
    for (const key of keys) {
      const value = props[key];

      if (typeof value === "boolean") {
        return value;
      }
    }

    return fallback;
  }

  function callStringSetter(keys: string[], nextValue: string) {
    for (const key of keys) {
      const setter = props[key];

      if (typeof setter === "function") {
        (setter as StringSetter)(nextValue);
        return;
      }
    }
  }

  function closeModal() {
    const closeKeys = [
      "onClose",
      "close",
      "onDismiss",
      "onDone",
      "onApply",
      "handleClose",
      "handleFiltersClose",
    ];

    for (const key of closeKeys) {
      const closeFunction = props[key];

      if (typeof closeFunction === "function") {
        (closeFunction as () => void)();
        return;
      }
    }

    const booleanSetterKeys = [
      "setIsOpen",
      "setOpen",
      "setShow",
      "setVisible",
      "setFiltersOpen",
      "setIsFiltersOpen",
      "setFilterModalOpen",
      "setIsFilterModalOpen",
      "setShowFilters",
    ];

    for (const key of booleanSetterKeys) {
      const setter = props[key];

      if (typeof setter === "function") {
        (setter as BooleanSetter)(false);
        return;
      }
    }
  }

  function clearAll() {
    callStringSetter(
      ["setServiceType", "onServiceTypeChange", "setService", "onServiceChange"],
      "any",
    );

    callStringSetter(
      ["setEventType", "onEventTypeChange", "setEvent", "onEventChange"],
      "any",
    );

    callStringSetter(
      ["setBudget", "onBudgetChange", "setEstimatedBudget"],
      "any",
    );

    callStringSetter(
      ["setGuests", "onGuestsChange", "setGuestCount", "onGuestCountChange"],
      "any",
    );
  }

  const isOpen = getBooleanValue(
    ["isOpen", "open", "show", "visible", "isFiltersOpen", "isFilterModalOpen"],
    true,
  );

  if (!isOpen) return null;

  const serviceValue = getStringValue(
    ["serviceType", "selectedServiceType", "service", "selectedService"],
    "any",
  );

  const eventValue = getStringValue(
    ["eventType", "selectedEventType", "event", "selectedEvent"],
    "any",
  );

  const budgetValue = getStringValue(
    ["budget", "selectedBudget", "estimatedBudget"],
    "any",
  );

  const guestsValue = getStringValue(
    ["guests", "guestCount", "selectedGuests", "selectedGuestCount"],
    "any",
  );

  const modalServiceOptions = [
    { label: "Any service type", value: "any" },
    { label: "Catering", value: "catering" },
    { label: "Tents", value: "tents" },
    { label: "Chairs & Tables", value: "chairs-tables" },
    { label: "Mobile Toilets", value: "mobile-toilets" },
    { label: "Mobile Fridges", value: "mobile-fridges" },
    { label: "Décor", value: "decor" },
    { label: "Sound & DJ", value: "sound-dj" },
    { label: "Photography", value: "photography" },
    { label: "Venues", value: "venues" },
    { label: "Generators", value: "generators" },
  ];

  const modalEventOptions = [
    { label: "Any event type", value: "any" },
    { label: "Funeral", value: "funeral" },
    { label: "Wedding", value: "wedding" },
    { label: "Birthday Party", value: "birthday-party" },
    { label: "Church Event", value: "church-event" },
    { label: "Traditional Ceremony", value: "traditional-ceremony" },
    { label: "Corporate Function", value: "corporate-function" },
    { label: "Graduation", value: "graduation" },
    { label: "Baby Shower", value: "baby-shower" },
    { label: "School Event", value: "school-event" },
  ];

  const modalBudgetOptions = [
    { label: "Any budget", value: "any" },
    { label: "Under R5,000", value: "under-5000" },
    { label: "R5,000 - R15,000", value: "5000-15000" },
    { label: "R15,000 - R40,000", value: "15000-40000" },
    { label: "R40,000+", value: "40000-plus" },
  ];

  const modalGuestOptions = [
    { label: "Any guest count", value: "any" },
    { label: "Under 50 guests", value: "under-50" },
    { label: "50 - 150 guests", value: "50-150" },
    { label: "150 - 300 guests", value: "150-300" },
    { label: "300+ guests", value: "300-plus" },
  ];

  const sections = [
    {
      title: "Service Type",
      value: serviceValue,
      options: modalServiceOptions,
      onSelect: (nextValue: string) =>
        callStringSetter(
          ["setServiceType", "onServiceTypeChange", "setService", "onServiceChange"],
          nextValue,
        ),
    },
    {
      title: "Event Type",
      value: eventValue,
      options: modalEventOptions,
      onSelect: (nextValue: string) =>
        callStringSetter(
          ["setEventType", "onEventTypeChange", "setEvent", "onEventChange"],
          nextValue,
        ),
    },
    {
      title: "Estimated Budget",
      value: budgetValue,
      options: modalBudgetOptions,
      onSelect: (nextValue: string) =>
        callStringSetter(
          ["setBudget", "onBudgetChange", "setEstimatedBudget"],
          nextValue,
        ),
    },
    {
      title: "Guest Count",
      value: guestsValue,
      options: modalGuestOptions,
      onSelect: (nextValue: string) =>
        callStringSetter(
          ["setGuests", "onGuestsChange", "setGuestCount", "onGuestCountChange"],
          nextValue,
        ),
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/45 px-4 py-8 backdrop-blur-md">
      <div className="max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-[28px] bg-white shadow-[0_32px_100px_rgba(17,17,17,0.35)]">
        <div className="flex items-center justify-between border-b border-[#eee8e3] px-7 py-5">
          <h2 className="text-xl font-black text-[#111111]">Filters</h2>

          <button
            type="button"
            onClick={closeModal}
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
              Refine providers by service, occasion, budget and guest count
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
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[#eee8e3] bg-white px-7 py-5">
          <button
            type="button"
            onClick={clearAll}
            className="text-sm font-bold text-[#111111] transition hover:text-[#ff5a40]"
          >
            Clear All
          </button>

          <button
            type="button"
            onClick={closeModal}
            className="min-h-14 rounded-[16px] bg-[#ff5a40] px-8 text-sm font-black text-white transition hover:bg-[#ed422b]"
          >
            Show Providers
          </button>
        </div>
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
