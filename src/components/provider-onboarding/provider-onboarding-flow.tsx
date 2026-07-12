"use client";

import type { FormEvent, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Building2,
  Camera,
  Check,
  ChevronDown,
  HelpCircle,
  ImagePlus,
  Mail,
  MapPin,
  Minus,
  Phone,
  Plus,
  Save,
  Search,
  Sparkles,
  Store,
  Tent,
  Utensils,
  Users,
  Wand2,
} from "lucide-react";
import {
  onboardingStepIds,
  type OnboardingStepId,
} from "@/data/provider-onboarding-flow";

type FormState = {
  area: string;
  province: string;
  mainService: string;
  serviceModel: string;
  minGuests: number;
  maxGuests: number;
  yearsExperience: number;
  responseTime: string;
  coverageAreas: string[];
  photosAdded: number;
  selectedServices: string[];
  selectedOccasions: string[];
  listingTitle: string;
  description: string;
  contactName: string;
  phone: string;
  email: string;
};

const STORAGE_KEY = "occasions-provider-onboarding";

const defaultForm: FormState = {
  area: "",
  province: "Limpopo",
  mainService: "",
  serviceModel: "",
  minGuests: 50,
  maxGuests: 200,
  yearsExperience: 1,
  responseTime: "Same day",
  coverageAreas: [],
  photosAdded: 0,
  selectedServices: [],
  selectedOccasions: [],
  listingTitle: "",
  description: "",
  contactName: "",
  phone: "",
  email: "",
};

const serviceOptions = [
  {
    label: "Catering",
    description: "Meals, buffet setup, plated service and event food.",
    icon: <Utensils size={28} />,
  },
  {
    label: "Tents & Stretch Tents",
    description: "Outdoor cover, tent hire and event shelter setup.",
    icon: <Tent size={28} />,
  },
  {
    label: "Décor & Styling",
    description: "Theme styling, flowers, table styling and setup.",
    icon: <Sparkles size={28} />,
  },
  {
    label: "Photography",
    description: "Event photography, video and content capture.",
    icon: <Camera size={28} />,
  },
  {
    label: "Venue",
    description: "Spaces for weddings, funerals, parties and functions.",
    icon: <Building2 size={28} />,
  },
  {
    label: "Event Rentals",
    description: "Chairs, tables, toilets, mobile fridges and equipment.",
    icon: <Store size={28} />,
  },
];

const serviceModelOptions = [
  {
    label: "I travel to the customer",
    description: "You deliver, set up or provide your service at the customer’s event location.",
    icon: <MapPin size={28} />,
  },
  {
    label: "Customers come to my venue",
    description: "You operate from a venue, studio, hall or fixed event space.",
    icon: <Building2 size={28} />,
  },
  {
    label: "I offer both",
    description: "You can support customers at your venue or travel to their event location.",
    icon: <Wand2 size={28} />,
  },
];

const serviceTags = [
  "Buffet catering",
  "Plated meals",
  "Serving staff",
  "Menu planning",
  "Tent setup",
  "Chairs & tables",
  "Décor setup",
  "Photography",
  "Sound system",
  "Mobile toilets",
  "Mobile fridges",
  "Venue hire",
];

const occasionTags = [
  "Weddings",
  "Funerals",
  "Birthday Parties",
  "Church Events",
  "Traditional Ceremonies",
  "Corporate Functions",
  "Graduations",
  "Baby Showers",
];

const responseTimes = ["Same day", "Under 2 hours", "Under 24 hours", "2 - 3 days"];

function readStoredForm(): FormState {
  if (typeof window === "undefined") return defaultForm;

  const stored = window.localStorage.getItem(STORAGE_KEY);

  if (!stored) return defaultForm;

  try {
    return {
      ...defaultForm,
      ...JSON.parse(stored),
    };
  } catch {
    return defaultForm;
  }
}

export function ProviderOnboardingFlow({
  currentStepId,
}: {
  currentStepId: string;
}) {
  const router = useRouter();
  const canPersistRef = useRef(false);
  const [form, setForm] = useState<FormState>(defaultForm);

  const currentIndex = Math.max(
    onboardingStepIds.indexOf(currentStepId as OnboardingStepId),
    0,
  );

  const stepId = onboardingStepIds[currentIndex];
  const previousStep = onboardingStepIds[currentIndex - 1];
  const nextStep = onboardingStepIds[currentIndex + 1];

  useEffect(() => {
    // Hydrate saved onboarding progress after mount to avoid SSR/client mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is only available on the client
    setForm(readStoredForm());
  }, []);

  useEffect(() => {
    if (!canPersistRef.current) {
      canPersistRef.current = true;
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
  }, [form]);

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function toggleFromArray(field: "coverageAreas" | "selectedServices" | "selectedOccasions", value: string) {
    setForm((current) => {
      const exists = current[field].includes(value);

      return {
        ...current,
        [field]: exists
          ? current[field].filter((item) => item !== value)
          : [...current[field], value],
      };
    });
  }

  function routeFor(step: OnboardingStepId) {
    return step === "address" ? "/provider-onboarding" : `/provider-onboarding/${step}`;
  }

  function goNext() {
    if (!nextStep) return;

    router.push(routeFor(nextStep));
  }

  function goBack() {
    if (!previousStep) {
      router.push("/list-your-business");
      return;
    }

    router.push(routeFor(previousStep));
  }

  const progressPercent = useMemo(() => {
    return ((currentIndex + 1) / (onboardingStepIds.length - 1)) * 100;
  }, [currentIndex]);

  const canContinue = getCanContinue(stepId, form);

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <header className="fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex min-h-24 max-w-7xl items-center justify-between px-5 md:px-8">
          <Link href="/" className="text-3xl font-black tracking-tight !text-[#ff5a40]">
            Occasions
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="hidden min-h-[44px] items-center gap-2 rounded-full border border-[#deded9] bg-white px-5 text-sm font-black transition hover:border-[#111111] md:inline-flex"
            >
              <HelpCircle size={17} />
              Questions?
            </button>

            <Link
              href="/provider-dashboard"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#deded9] bg-white px-5 text-sm font-black transition hover:border-[#111111]"
            >
              <Save size={17} />
              Save & exit
            </Link>
          </div>
        </div>
      </header>

      <div className="min-h-screen pb-28 pt-28">
        {stepId === "address" ? (
          <AddressStep form={form} updateField={updateField} onNext={goNext} />
        ) : null}

        {stepId === "about-your-business" ? (
          <IntroStep
            stepLabel="Step 1"
            title="Tell us about your business"
            description="We’ll ask what service you provide, how customers work with you, where you operate and how many guests you can support."
            imageSrc="/images/provider-onboarding/about-business.png"
            imageAlt="Occasions provider business setup illustration"
          />
        ) : null}

        {stepId === "service-type" ? (
          <CardGridStep
            title="Which service best describes your business?"
            description="Choose your main service. You can add more services later in your provider dashboard."
            options={serviceOptions}
            selected={form.mainService}
            onSelect={(value) => updateField("mainService", value)}
          />
        ) : null}

        {stepId === "service-model" ? (
          <CardGridStep
            title="How do customers work with you?"
            description="This helps us show the right information on your public provider profile."
            options={serviceModelOptions}
            selected={form.serviceModel}
            onSelect={(value) => updateField("serviceModel", value)}
            stacked
          />
        ) : null}

        {stepId === "business-basics" ? (
          <BasicsStep form={form} updateField={updateField} />
        ) : null}

        {stepId === "coverage-area" ? (
          <CoverageStep form={form} updateField={updateField} toggleArea={(value) => toggleFromArray("coverageAreas", value)} />
        ) : null}

        {stepId === "stand-out" ? (
          <IntroStep
            stepLabel="Step 2"
            title="Make your listing stand out"
            description="Next, add the details that help customers trust your business: photos, services, occasions, title and description."
            imageSrc="/images/provider-onboarding/stand-out.png"
            imageAlt="Occasions listing stand out illustration"
          />
        ) : null}

        {stepId === "photos" ? (
          <PhotosStep form={form} updateField={updateField} />
        ) : null}

        {stepId === "services" ? (
          <ServicesStep form={form} toggleItem={toggleFromArray} />
        ) : null}

        {stepId === "description" ? (
          <DescriptionStep form={form} updateField={updateField} />
        ) : null}

        {stepId === "contact" ? (
          <ContactStep form={form} updateField={updateField} />
        ) : null}

        {stepId === "review" ? (
          <ReviewStep form={form} />
        ) : null}

        {stepId === "success" ? (
          <SuccessStep />
        ) : null}
      </div>

      {stepId !== "success" ? (
        <footer className="fixed inset-x-0 bottom-0 z-50 border-t border-[#deded9] bg-white">
          <div className="h-2 bg-[#deded9]">
            <div
              className="h-full bg-[#ff5a40] transition-all duration-300 !text-white [&_*]:!text-white"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="mx-auto flex min-h-24 max-w-7xl items-center justify-between px-5 md:px-8">
            <button
              type="button"
              onClick={goBack}
              className="text-sm font-black transition hover:text-[#ff5a40]"
            >
              Back
            </button>

            <button
              type="button"
              disabled={!canContinue}
              onClick={goNext}
              className="inline-flex min-h-[52px] min-w-[128px] items-center justify-center gap-2 rounded-[16px] bg-[#111111] px-6 text-sm font-black text-white transition hover:bg-[#ff5a40] disabled:cursor-not-allowed disabled:bg-[#e5e5e5] disabled:text-[#9aa4b5] !text-white [&_*]:!text-white"
            >
              Next
              <ArrowRight size={17} />
            </button>
          </div>
        </footer>
      ) : null}
    </main>
  );
}

function AddressStep({
  form,
  updateField,
  onNext,
}: {
  form: FormState;
  updateField: <K extends keyof FormState>(field: K, value: FormState[K]) => void;
  onNext: () => void;
}) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (form.area.trim().length > 1) {
      onNext();
    }
  }

  return (
    <section className="mx-auto grid min-h-[calc(100vh-208px)] max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
      <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
        <h1 className="text-5xl font-black leading-[0.96] tracking-tight md:text-7xl">
          Set up your Occasions listing
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg font-semibold leading-8 text-[#6b7280] lg:mx-0">
          Let’s start with the area where customers should find your business.
        </p>

        <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-xl lg:mx-0">
          <label className="flex min-h-[62px] items-center gap-3 rounded-full border border-[#111111] bg-white px-5 text-left transition focus-within:border-[#ff5a40] focus-within:ring-4 focus-within:ring-[#fff0ec]">
            <Search size={22} className="shrink-0 text-[#111111]" />
            <input
              value={form.area}
              onChange={(event) => updateField("area", event.target.value)}
              placeholder="Enter your main service area"
              className="h-12 min-w-0 flex-1 bg-transparent text-base font-semibold outline-none placeholder:text-[#9aa4b5]"
            />
          </label>
        </form>

        <button
          type="button"
          onClick={() => {
            updateField("area", "Polokwane");
            updateField("province", "Limpopo");
          }}
          className="mx-auto mt-6 flex min-h-[56px] items-center gap-4 rounded-[16px] px-4 text-left transition hover:bg-[#f6f6f4] lg:mx-0"
        >
          <span className="flex size-12 items-center justify-center rounded-[14px] bg-[#f6f6f4] text-[#111111]">
            <MapPin size={22} />
          </span>
          <span className="text-sm font-black">Use my current area</span>
        </button>
      </div>

      <div className="mx-auto flex w-full max-w-[640px] items-center justify-center">
        <Image
          src="/images/provider-onboarding/preview-listing.png"
          alt="Occasions provider listing preview"
          width={1280}
          height={960}
          priority
          className="h-auto w-full max-h-[min(72vh,640px)] object-contain"
        />
      </div>
    </section>
  );
}

function IntroStep({
  stepLabel,
  title,
  description,
  icon,
  imageSrc,
  imageAlt,
}: {
  stepLabel: string;
  title: string;
  description: string;
  icon?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
}) {
  return (
    <section className="mx-auto grid min-h-[calc(100vh-208px)] max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
      <div>
        <p className="text-xl font-black">{stepLabel}</p>

        <h1 className="mt-6 max-w-xl text-5xl font-black leading-[0.98] tracking-tight md:text-6xl">
          {title}
        </h1>

        <p className="mt-8 max-w-xl text-xl font-semibold leading-9 text-[#343434]">
          {description}
        </p>
      </div>

      <div className="mx-auto flex w-full max-w-[560px] items-center justify-center">
        {imageSrc ? (
          <div
            className="aspect-square w-full max-w-[420px] bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${imageSrc})`,
            }}
            aria-label={imageAlt ?? title}
          />
        ) : (
          <div className="flex size-[360px] items-center justify-center rounded-[44px] bg-[#fff0ec] text-[#ff5a40]">
            {icon}
          </div>
        )}
      </div>
    </section>
  );
}

function CardGridStep({
  title,
  description,
  options,
  selected,
  onSelect,
  stacked = false,
}: {
  title: string;
  description: string;
  options: Array<{
    label: string;
    description: string;
    icon: ReactNode;
  }>;
  selected: string;
  onSelect: (value: string) => void;
  stacked?: boolean;
}) {
  return (
    <section className="mx-auto max-w-4xl px-5 py-10 md:px-8">
      <h1 className="text-center text-4xl font-black tracking-tight md:text-5xl">
        {title}
      </h1>

      <p className="mx-auto mt-4 max-w-2xl text-center text-base font-semibold leading-7 text-[#6b7280]">
        {description}
      </p>

      <div className={`mx-auto mt-10 grid gap-4 ${stacked ? "max-w-3xl" : "md:grid-cols-2 lg:grid-cols-3"}`}>
        {options.map((option) => {
          const isSelected = selected === option.label;

          return (
            <button
              key={option.label}
              type="button"
              onClick={() => onSelect(option.label)}
              className={`relative rounded-[18px] border p-5 text-left transition hover:border-[#111111] ${
                isSelected
                  ? "border-[#111111] bg-white shadow-[0_14px_40px_rgba(17,17,17,0.08)]"
                  : "border-[#deded9] bg-white"
              }`}
            >
              {isSelected ? (
                <span className="absolute right-5 top-5 text-[18px] leading-none text-[#ff5a40]">
                  ✓
              </span>
              ) : null}

              <div className="text-white">{option.icon}</div>
              <h3 className="mt-5 text-lg font-black">{option.label}</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-[#6b7280]">
                {option.description}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function BasicsStep({
  form,
  updateField,
}: {
  form: FormState;
  updateField: <K extends keyof FormState>(field: K, value: FormState[K]) => void;
}) {
  return (
    <section className="mx-auto max-w-3xl px-5 py-10 md:px-8">
      <h1 className="text-4xl font-black tracking-tight md:text-5xl">
        Let’s start with the basics
      </h1>

      <p className="mt-4 text-base font-semibold leading-7 text-[#6b7280]">
        This helps customers understand your capacity and how quickly you usually respond.
      </p>

      <div className="mt-10 divide-y divide-[#eee8e3]">
        <CounterRow
          label="Minimum guests"
          value={form.minGuests}
          onMinus={() => updateField("minGuests", Math.max(0, form.minGuests - 10))}
          onPlus={() => updateField("minGuests", form.minGuests + 10)}
        />

        <CounterRow
          label="Maximum guests"
          value={form.maxGuests}
          onMinus={() => updateField("maxGuests", Math.max(0, form.maxGuests - 10))}
          onPlus={() => updateField("maxGuests", form.maxGuests + 10)}
        />

        <CounterRow
          label="Years of experience"
          value={form.yearsExperience}
          onMinus={() => updateField("yearsExperience", Math.max(0, form.yearsExperience - 1))}
          onPlus={() => updateField("yearsExperience", form.yearsExperience + 1)}
        />
      </div>

      <ResponseTimePicker
        value={form.responseTime}
        onChange={(value) => updateField("responseTime", value)}
      />
    </section>
  );
}

function ResponseTimePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const selectedIndex = Math.max(responseTimes.indexOf(value), 0);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(selectedIndex);

  const activeIndex = open ? hoveredIndex : selectedIndex;

  useEffect(() => {
    if (!open) return;

    function handleOutsideClick(event: MouseEvent | TouchEvent) {
      const target = event.target as Node;

      if (!wrapperRef.current?.contains(target)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative mt-10">
      <p className="mb-3 block text-sm font-black">
        Typical response time
      </p>

      <button
        type="button"
        onClick={() => {
          setOpen((current) => !current);
          setHoveredIndex(selectedIndex);
        }}
        className={`flex min-h-[64px] w-full items-center justify-between rounded-[18px] border bg-white px-5 text-left text-base font-black text-[#111111] outline-none transition ${
          open
            ? "border-[#111111] shadow-[0_18px_50px_rgba(17,17,17,0.08)]"
            : "border-[#deded9] hover:border-[#111111]"
        }`}
      >
        <span>{value}</span>

        <ChevronDown
          size={22}
          className={`text-[#111111] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open ? (
        <div
          className="absolute bottom-[calc(100%+10px)] left-0 right-0 z-30 overflow-hidden rounded-[20px] border border-[#deded9] bg-white p-2 shadow-[0_24px_70px_rgba(17,17,17,0.14)]"
          onMouseLeave={() => setHoveredIndex(selectedIndex)}
        >
          <div
            className="absolute left-2 right-2 top-2 h-[52px] rounded-[16px] bg-[#111111] transition-transform duration-200 ease-out"
            style={{
              transform: `translateY(${activeIndex * 52}px)`,
            }}
          />

          <div className="relative z-10">
            {responseTimes.map((time, index) => {
              const isSelected = value === time;
              const isActive = activeIndex === index;

              return (
                <button
                  key={time}
                  type="button"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onClick={() => {
                    onChange(time);
                    setOpen(false);
                  }}
                  className={`flex min-h-[52px] w-full items-center justify-between rounded-[16px] px-4 text-left text-sm font-black transition-colors ${
                    isActive ? "text-white" : "text-[#111111]"
                  }`}
                >
                  <span>{time}</span>

                  {isSelected ? (
                    <span
                      className={`text-[17px] leading-none ${
                        isActive ? "text-white/90" : "text-[#ff5a40]"
                      }`}
                    >
                      ✓
                    </span>
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


function CoverageStep({
  form,
  updateField,
  toggleArea,
}: {
  form: FormState;
  updateField: <K extends keyof FormState>(field: K, value: FormState[K]) => void;
  toggleArea: (value: string) => void;
}) {
  const areas = [
    "Polokwane",
    "Mankweng",
    "Mokopane",
    "Tzaneen",
    "Bela-Bela",
    "Mbombela",
    "Thulamahashe",
    "Bushbuckridge",
  ];

  return (
    <section className="mx-auto flex min-h-[calc(100vh-208px)] max-w-3xl flex-col justify-center px-5 py-10 md:px-8">
      <h1 className="max-w-xl text-4xl font-black leading-[1.02] tracking-tight md:text-5xl">
        Where do you serve customers?
      </h1>

      <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-[#6b7280]">
        Add your main area and choose the nearby places where customers can find your listing.
      </p>

      <label className="mt-8 block">
        <span className="mb-3 block text-sm font-black text-[#111111]">
          Main area
        </span>

        <input
          value={form.area}
          onChange={(event) => updateField("area", event.target.value)}
          placeholder="Example: Polokwane"
          className="min-h-[58px] w-full rounded-[18px] border border-[#deded9] bg-white px-5 text-base font-bold text-[#111111] outline-none transition placeholder:text-[#9aa4b5] focus:border-[#ff5a40] focus:ring-4 focus:ring-[#fff0ec]"
        />
      </label>

      <div className="mt-8">
        <p className="mb-4 text-sm font-black text-[#111111]">
          Coverage areas
        </p>

        <div className="flex flex-wrap gap-3">
          {areas.map((area) => {
            const selected = form.coverageAreas.includes(area);

            return (
              <button
                key={area}
                type="button"
                onClick={() => toggleArea(area)}
                className={`inline-flex min-h-[46px] items-center justify-center rounded-full border px-5 text-sm font-black transition ${
                  selected
                    ? "border-[#ff5a40] bg-[#ff5a40] !text-white [&_*]:!text-white"
                    : "border-[#deded9] bg-white !text-[#111111] hover:border-[#ff5a40] hover:bg-[#fff0ec] hover:!text-[#ff5a40]"
                }`}
              >
                {area}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PhotosStep({
  form,
  updateField,
}: {
  form: FormState;
  updateField: <K extends keyof FormState>(field: K, value: FormState[K]) => void;
}) {
  return (
    <section className="mx-auto max-w-3xl px-5 py-10 md:px-8">
      <h1 className="text-4xl font-black tracking-tight md:text-5xl">
        Add photos of your work
      </h1>

      <p className="mt-4 text-base font-semibold leading-7 text-[#6b7280]">
        Customers trust providers faster when they can see real examples. For now, this is a mock upload step.
      </p>

      <button
        type="button"
        onClick={() => updateField("photosAdded", Math.max(5, form.photosAdded + 1))}
        className="mt-10 flex min-h-[360px] w-full flex-col items-center justify-center rounded-[24px] border border-dashed border-[#9aa4b5] bg-[#fbfbfa] text-center transition hover:border-[#ff5a40] hover:bg-[#fff8f6]"
      >
        <ImagePlus size={58} className="text-[#ff5a40]" />

        <span className="mt-6 rounded-[12px] bg-white px-5 py-3 text-sm font-black shadow-sm">
          Add photos
        </span>

        <span className="mt-4 text-sm font-semibold text-[#6b7280]">
          {form.photosAdded > 0 ? `${form.photosAdded} photos added` : "Click to simulate adding photos"}
        </span>
      </button>
    </section>
  );
}

function ServicesStep({
  form,
  toggleItem,
}: {
  form: FormState;
  toggleItem: (field: "coverageAreas" | "selectedServices" | "selectedOccasions", value: string) => void;
}) {
  return (
    <section className="mx-auto max-w-4xl px-5 py-10 md:px-8">
      <h1 className="text-4xl font-black tracking-tight md:text-5xl">
        What should customers find you for?
      </h1>

      <p className="mt-4 text-base font-semibold leading-7 text-[#6b7280]">
        Select the services and occasions that match your business.
      </p>

      <TagGroup
        title="Services offered"
        items={serviceTags}
        selectedItems={form.selectedServices}
        onToggle={(item) => toggleItem("selectedServices", item)}
      />

      <TagGroup
        title="Occasions supported"
        items={occasionTags}
        selectedItems={form.selectedOccasions}
        onToggle={(item) => toggleItem("selectedOccasions", item)}
      />
    </section>
  );
}

function DescriptionStep({
  form,
  updateField,
}: {
  form: FormState;
  updateField: <K extends keyof FormState>(field: K, value: FormState[K]) => void;
}) {
  return (
    <section className="mx-auto max-w-3xl px-5 py-10 md:px-8">
      <h1 className="text-4xl font-black tracking-tight md:text-5xl">
        Create your listing title and description
      </h1>

      <p className="mt-4 text-base font-semibold leading-7 text-[#6b7280]">
        Keep it clear. Tell customers what you offer, where you work and what makes your service reliable.
      </p>

      <label className="mt-8 block">
        <span className="mb-2 block text-sm font-black">Listing title</span>
        <input
          value={form.listingTitle}
          onChange={(event) => updateField("listingTitle", event.target.value)}
          placeholder="Example: Fresh Plate Catering for weddings and functions"
          className="min-h-[58px] w-full rounded-[16px] border border-[#deded9] bg-white px-4 text-sm font-black outline-none transition focus:border-[#ff5a40] focus:ring-4 focus:ring-[#fff0ec]"
        />
      </label>

      <label className="mt-6 block">
        <span className="mb-2 block text-sm font-black">Description</span>
        <textarea
          value={form.description}
          onChange={(event) => updateField("description", event.target.value)}
          placeholder="Describe your business, services, areas served and what customers can expect."
          className="min-h-44 w-full resize-none rounded-[16px] border border-[#deded9] bg-white p-4 text-sm font-black leading-7 outline-none transition focus:border-[#ff5a40] focus:ring-4 focus:ring-[#fff0ec]"
        />
      </label>
    </section>
  );
}

function ContactStep({
  form,
  updateField,
}: {
  form: FormState;
  updateField: <K extends keyof FormState>(field: K, value: FormState[K]) => void;
}) {
  return (
    <section className="mx-auto max-w-3xl px-5 py-10 md:px-8">
      <h1 className="text-4xl font-black tracking-tight md:text-5xl">
        Add your contact details
      </h1>

      <p className="mt-4 text-base font-semibold leading-7 text-[#6b7280]">
        These details help customers and Occasions reach you about quote requests.
      </p>

      <div className="mt-8 grid gap-4">
        <Input
          icon={<Users size={19} />}
          label="Contact person"
          value={form.contactName}
          placeholder="Your name"
          onChange={(value) => updateField("contactName", value)}
        />

        <Input
          icon={<Phone size={19} />}
          label="Phone"
          value={form.phone}
          placeholder="068 000 0000"
          onChange={(value) => updateField("phone", value)}
        />

        <Input
          icon={<Mail size={19} />}
          label="Email"
          value={form.email}
          placeholder="name@example.com"
          type="email"
          onChange={(value) => updateField("email", value)}
        />
      </div>
    </section>
  );
}

function ReviewStep({ form }: { form: FormState }) {
  const rows = [
    { label: "Business", value: form.listingTitle || "Draft provider listing", href: "/provider-onboarding/description" },
    { label: "Service", value: form.mainService || "Not selected", href: "/provider-onboarding/service-type" },
    { label: "Model", value: form.serviceModel || "Not selected", href: "/provider-onboarding/service-model" },
    { label: "Area", value: `${form.area || "Not added"}, ${form.province}`, href: "/provider-onboarding/coverage-area" },
    { label: "Capacity", value: `${form.minGuests} - ${form.maxGuests} guests`, href: "/provider-onboarding/business-basics" },
    { label: "Photos", value: `${form.photosAdded} added`, href: "/provider-onboarding/photos" },
    { label: "Contact", value: form.contactName || "Not added", href: "/provider-onboarding/contact" },
  ];

  return (
    <section className="mx-auto flex min-h-[calc(100vh-208px)] max-w-3xl flex-col justify-center px-5 py-10 md:px-8">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff5a40]">
        Final check
      </p>

      <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
        Review your draft listing
      </h1>

      <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-[#6b7280]">
        Check your details before creating the draft. You can edit anything that does not look right.
      </p>

      <div className="mt-10 divide-y divide-[#eee8e3] border-y border-[#eee8e3] bg-white">
        {rows.map((row) => (
          <ReviewEditRow
            key={row.label}
            label={row.label}
            value={row.value}
            href={row.href}
          />
        ))}
      </div>
    </section>
  );
}

function ReviewEditRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  return (
    <div className="grid min-h-[72px] grid-cols-[110px_minmax(0,1fr)_auto] items-center gap-4 py-4">
      <p className="text-sm font-black text-[#8a8a8a]">
        {label}
      </p>

      <p className="text-sm font-black text-[#111111]">
        {value}
      </p>

      <Link
        href={href}
        className="rounded-full px-3 py-2 text-sm font-black text-[#ff5a40] transition hover:bg-[#fff0ec]"
      >
        Edit
      </Link>
    </div>
  );
}

function SuccessStep() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-160px)] max-w-3xl flex-col items-center justify-center px-5 text-center md:px-8">
      <div className="flex size-20 items-center justify-center rounded-full bg-[#ff5a40] text-white !text-white [&_*]:!text-white">
        <Check size={34} strokeWidth={3} />
      </div>

      <h1 className="mt-6 text-4xl font-black tracking-tight md:text-5xl">
        Your draft listing is ready
      </h1>

      <p className="mt-4 max-w-xl text-base font-semibold leading-8 text-[#6b7280]">
        We created the first version of your provider listing. Open your dashboard to manage leads, listing details and package visibility.
      </p>

      <Link
        href="/provider-dashboard"
        className="mt-8 inline-flex min-h-[56px] min-w-[220px] items-center justify-center gap-2 rounded-[16px] bg-[#111111] px-7 text-sm font-black !text-white transition hover:-translate-y-0.5 hover:bg-[#262626]"
      >
        <span className="text-white">Open dashboard</span>
        <ArrowRight size={17} className="text-white" />
      </Link>
    </section>
  );
}

function CounterRow({
  label,
  value,
  onMinus,
  onPlus,
}: {
  label: string;
  value: number;
  onMinus: () => void;
  onPlus: () => void;
}) {
  return (
    <div className="flex min-h-[86px] items-center justify-between gap-5 py-4">
      <p className="text-lg font-semibold">{label}</p>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMinus}
          className="flex size-10 items-center justify-center rounded-full bg-[#f2f2f2] transition hover:bg-[#deded9]"
        >
          <Minus size={17} />
        </button>

        <span className="w-10 text-center text-lg font-black">{value}</span>

        <button
          type="button"
          onClick={onPlus}
          className="flex size-10 items-center justify-center rounded-full bg-[#f2f2f2] transition hover:bg-[#deded9]"
        >
          <Plus size={17} />
        </button>
      </div>
    </div>
  );
}

function TagGroup({
  title,
  items,
  selectedItems,
  onToggle,
}: {
  title: string;
  items: string[];
  selectedItems: string[];
  onToggle: (item: string) => void;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-black text-[#111111]">{title}</h2>

      <div className="mt-4 flex flex-wrap gap-3">
        {items.map((item) => {
          const selected = selectedItems.includes(item);

          const buttonClass = selected
            ? "border-[#ff5a40] bg-[#ff5a40] text-white"
            : "border-[#ff5a40]/30 bg-white text-[#111111] hover:border-[#ff5a40] hover:bg-[#fff0ec] hover:text-[#ff5a40]";

          return (
            <button
              key={item}
              type="button"
              onClick={() => onToggle(item)}
              className={`rounded-full border px-5 py-3 text-sm font-black transition ${buttonClass}`}
            >
              {item}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function Input({
  icon,
  label,
  value,
  placeholder,
  type = "text",
  onChange,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  placeholder: string;
  type?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#8a8a8a]">
        {label}
      </span>

      <div className="flex min-h-[58px] items-center gap-3 rounded-[16px] border border-[#deded9] bg-white px-4 transition focus-within:border-[#ff5a40] focus-within:ring-4 focus-within:ring-[#fff0ec]">
        <span className="text-[#ff5a40]">{icon}</span>

        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-12 min-w-0 flex-1 bg-transparent text-sm font-black outline-none placeholder:text-[#9aa4b5]"
        />
      </div>
    </label>
  );
}


function getCanContinue(stepId: OnboardingStepId, form: FormState) {
  if (stepId === "address") return form.area.trim().length > 1;
  if (stepId === "service-type") return Boolean(form.mainService);
  if (stepId === "service-model") return Boolean(form.serviceModel);
  if (stepId === "coverage-area") return Boolean(form.area);
  if (stepId === "description") {
    return form.listingTitle.trim().length > 1 && form.description.trim().length > 1;
  }
  if (stepId === "contact") {
    return (
      form.contactName.trim().length > 1 &&
      form.phone.trim().length > 1 &&
      form.email.trim().length > 1
    );
  }

  return true;
}
