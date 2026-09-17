"use client";

import { ChevronDown, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type MultiSelectOption = { label: string; value: string };

type Skin = "hero" | "compact";

type MultiSelectDropdownProps = {
  label: string;
  placeholder: string;
  values: string[];
  options: MultiSelectOption[];
  onChange: (values: string[]) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  skin?: Skin;
};

// Toggles a value in a multi-select filter. Picking "any" clears everything
// else; picking a real option drops "any" and adds/removes that value.
export function toggleMultiSelectValue(current: string[], optionValue: string): string[] {
  if (optionValue === "any") {
    return ["any"];
  }

  const withoutAny = current.filter((value) => value !== "any");
  const isSelected = withoutAny.includes(optionValue);
  const next = isSelected
    ? withoutAny.filter((value) => value !== optionValue)
    : [...withoutAny, optionValue];

  return next.length === 0 ? ["any"] : next;
}

export function multiSelectDisplayLabel(
  values: string[],
  options: MultiSelectOption[],
  placeholder: string,
) {
  const selectedLabels = options
    .filter((option) => option.value !== "any" && values.includes(option.value))
    .map((option) => option.label);

  if (values.includes("any") || selectedLabels.length === 0) return placeholder;
  if (selectedLabels.length === 1) return selectedLabels[0];

  return `${selectedLabels[0]} +${selectedLabels.length - 1}`;
}

export function MultiSelectDropdown({
  label,
  placeholder,
  values,
  options,
  onChange,
  isOpen,
  onOpen,
  onClose,
  skin = "compact",
}: MultiSelectDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target as Node | null;
      if (!target || !dropdownRef.current) return;
      if (!dropdownRef.current.contains(target)) onClose();
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isOpen, onClose]);

  const displayValue = multiSelectDisplayLabel(values, options, placeholder);
  const activeValue = hoveredValue ?? values[values.length - 1] ?? "any";
  const activeIndex = Math.max(
    options.findIndex((option) => option.value === activeValue),
    0,
  );

  function toggle(optionValue: string) {
    onChange(toggleMultiSelectValue(values, optionValue));
  }

  const isHero = skin === "hero";

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => (isOpen ? onClose() : onOpen())}
        className={
          isHero
            ? `flex min-h-[76px] w-full items-center justify-between gap-4 rounded-[18px] border px-5 text-left transition ${
                isOpen
                  ? "border-white bg-white text-[#111111] shadow-[0_20px_60px_rgba(17,17,17,0.14)]"
                  : "border-white/30 bg-white/10 text-white hover:bg-white/15"
              }`
            : `flex min-h-14 w-full items-center justify-between gap-3 rounded-[20px] border bg-white px-5 text-left text-sm font-black text-[#111111] shadow-[0_6px_18px_rgba(17,17,17,0.08)] transition hover:border-[#111111] focus:outline-none ${
                isOpen ? "border-[#111111]" : "border-white"
              }`
        }
      >
        <span className="min-w-0">
          <span
            className={
              isHero
                ? `mb-1 block text-[11px] font-black uppercase tracking-[0.28em] ${
                    isOpen ? "text-[#8a8a8a]" : "text-white/80"
                  }`
                : "mb-0.5 block text-[10px] font-black uppercase tracking-[0.14em] text-[#8a8a8a]"
            }
          >
            {label}
          </span>

          <span
            className={
              isHero
                ? "block truncate text-sm font-black md:text-[15px]"
                : "block truncate"
            }
          >
            {displayValue}
          </span>
        </span>

        <ChevronDown
          size={isHero ? 18 : 17}
          className={`shrink-0 transition duration-300 ${
            isOpen
              ? "rotate-180 text-[#ff5a40]"
              : isHero
                ? "text-white"
                : "text-[#ff5a40]"
          }`}
        />
      </button>

      {isOpen ? (
        <div
          className={
            isHero
              ? "absolute left-0 top-[calc(100%+10px)] z-50 w-[310px] overflow-hidden rounded-[24px] border border-[#deded9] bg-white p-2 text-[#111111] shadow-[0_28px_80px_rgba(17,17,17,0.22)]"
              : "absolute left-0 top-[calc(100%+10px)] z-[90] w-full min-w-[260px] overflow-hidden rounded-[24px] border border-[#deded9] bg-white p-2 shadow-[0_24px_70px_rgba(17,17,17,0.18)]"
          }
        >
          <div className="px-3 pb-3 pt-2 text-[11px] font-black uppercase tracking-[0.26em] text-[#8a8a8a]">
            {label} · select multiple
          </div>

          <div className="relative" onMouseLeave={() => setHoveredValue(null)}>
            <div
              className="pointer-events-none absolute left-0 top-0 h-12 w-full rounded-[16px] bg-[#111111] transition-transform duration-300 ease-out"
              style={{ transform: `translateY(${activeIndex * 3}rem)` }}
            />

            {options.map((option) => {
              const isSelected = values.includes(option.value);
              const isActive = option.value === activeValue;

              return (
                <button key={option.value}
                  type="button"
                  onMouseEnter={() => setHoveredValue(option.value)}
                  onFocus={() => setHoveredValue(option.value)}
                  onClick={() => toggle(option.value)}
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

          <button type="button"
            onClick={onClose}
            className="mt-3 min-h-12 w-full rounded-[16px] bg-[#ff5a40] px-5 text-sm font-black text-white transition hover:bg-[#ed422b]"
          >
            Done
          </button>
        </div>
      ) : null}
    </div>
  );
}
