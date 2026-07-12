"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Eye,
  ImagePlus,
  MapPin,
  Pencil,
  Save,
  ShieldCheck,
  Star,
  Users,
  X,
} from "lucide-react";
import { ProviderDashboardShell } from "@/components/provider-dashboard/provider-dashboard-shell";

type EditKey =
  | "businessName"
  | "location"
  | "category"
  | "capacity"
  | "areas"
  | "rating"
  | "description"
  | "services"
  | "occasions";

type ListingState = {
  businessName: string;
  location: string;
  category: string;
  capacity: string;
  areas: string;
  rating: string;
  description: string;
  services: string[];
  occasions: string[];
};

const initialListing: ListingState = {
  businessName: "Fresh Plate Catering",
  location: "Polokwane, Limpopo",
  category: "Catering",
  capacity: "50 - 350 guests",
  areas: "5 areas",
  rating: "4.8 stars",
  description:
    "Fresh Plate Catering provides buffet meals, plated meals, traditional dishes and event serving support for weddings, funerals, corporate lunches and private functions across Limpopo.",
  services: [
    "Buffet catering",
    "Plated meals",
    "Serving staff",
    "Menu planning",
    "Traditional meals",
    "Corporate lunch",
    "Funeral catering",
    "Wedding catering",
  ],
  occasions: [
    "Weddings",
    "Funerals",
    "Birthday Parties",
    "Church Events",
    "Traditional Ceremonies",
  ],
};

const galleryImages = [
  "/images/provider-onboarding/preview-listing.png",
  "/images/provider-onboarding/about-business.png",
  "/images/provider-onboarding/stand-out.png",
  "/images/provider-onboarding/preview-listing.png",
  "/images/provider-onboarding/about-business.png",
];

export default function ProviderDashboardListingPage() {
  const [listing, setListing] = useState<ListingState>(initialListing);
  const [editing, setEditing] = useState<EditKey | null>(null);

  function getEditValue() {
    if (!editing) return "";

    const value = listing[editing];

    return Array.isArray(value) ? value.join(", ") : value;
  }

  function saveEdit(value: string) {
    if (!editing) return;

    setListing((current) => {
      if (editing === "services" || editing === "occasions") {
        return {
          ...current,
          [editing]: value
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        };
      }

      return {
        ...current,
        [editing]: value,
      };
    });

    setEditing(null);
  }

  return (
    <ProviderDashboardShell
      title="Manage your public listing"
      description="Edit your listing in the same visual layout customers will see."
    >
      <main className="space-y-8">
        <section className="flex flex-col gap-5 border-b border-[#eee8e3] pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ff5a40]">
              Listing editor
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              Manage your public listing
            </h1>

            <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-[#6b7280]">
              This is the same layout customers will see. Use the edit buttons to update each section.
            </p>
          </div>

          <Link
            href="/providers/fresh-plate-catering"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[15px] bg-[#111111] px-5 text-sm font-black !text-white transition hover:bg-[#262626]"
          >
            <Eye size={17} className="text-white" />
            <span className="text-white">View as customer</span>
            <ArrowUpRight size={17} className="text-white" />
          </Link>
        </section>

        <section className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-8">
            <section className="overflow-hidden rounded-[34px] border border-[#eee8e3] bg-white p-4 shadow-sm">
              <div className="grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
                <GalleryImage src={galleryImages[0]} large />

                <div className="grid grid-cols-2 gap-3">
                  {galleryImages.slice(1).map((image, index) => (
                    <GalleryImage
                      key={`${image}-${index}`}
                      src={image}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className="inline-flex min-h-11 items-center gap-2 rounded-[14px] border border-[#ff5a40]/30 bg-white px-4 text-sm font-black text-[#ff5a40] transition hover:bg-[#fff0ec]"
                >
                  <ImagePlus size={17} />
                  Edit gallery
                </button>
              </div>
            </section>

            <section className="rounded-[34px] border border-[#eee8e3] bg-white p-6 shadow-sm md:p-8">
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff5a40]">
                    Public listing
                  </p>

                  <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
                    {listing.businessName}
                  </h2>

                  <p className="mt-3 flex items-center gap-2 text-base font-bold text-[#6b7280]">
                    <MapPin size={18} className="text-[#ff5a40]" />
                    {listing.category} · {listing.location}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <EditButton onClick={() => setEditing("businessName")}>
                    Edit name
                  </EditButton>

                  <EditButton onClick={() => setEditing("location")}>
                   Edit location
                  </EditButton>
                </div>
              </div>

              <div className="mt-8 grid overflow-hidden rounded-[24px] border border-[#eee8e3] md:grid-cols-3">
                <InfoCard
                  icon={<Users size={21} />}
                  label="Capacity"
                  value={listing.capacity}
                  onEdit={() => setEditing("capacity")}
                />

                <InfoCard
                  icon={<MapPin size={21} />}
                  label="Areas"
                  value={listing.areas}
                  onEdit={() => setEditing("areas")}
                />

                <InfoCard
                  icon={<Star size={21} />}
                  label="Rating"
                  value={listing.rating}
                  onEdit={() => setEditing("rating")}
                />
              </div>
            </section>

            <EditableSection
              title="About this provider"
              onEdit={() => setEditing("description")}
            >
              <p className="max-w-4xl text-base font-semibold leading-8 text-[#6b7280]">
                {listing.description}
              </p>
            </EditableSection>

            <EditableSection
              title="Services offered"
              onEdit={() => setEditing("services")}
            >
              <TagList items={listing.services} />
            </EditableSection>

            <EditableSection
              title="Occasions supported"
              onEdit={() => setEditing("occasions")}
            >
              <TagList items={listing.occasions} />
            </EditableSection>
          </div>

          <aside className="space-y-5 xl:sticky xl:top-28 xl:self-start">
            <section className="rounded-[30px] border border-[#eee8e3] bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex size-12 items-center justify-center rounded-[16px] bg-[#fff0ec] text-[#ff5a40]">
                  <ShieldCheck size={23} />
                </div>

                <div>
                  <h3 className="text-xl font-black">Listing status</h3>
                  <p className="mt-2 text-sm font-bold leading-6 text-[#6b7280]">
                    This is the version customers will see once your listing is live.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <StatusItem label="Profile active" />
                <StatusItem label="Quote form enabled" />
                <StatusItem label="Contact options enabled" />
                <StatusItem label="Gallery visible" />
              </div>
            </section>

            <section className="rounded-[30px] border border-[#eee8e3] bg-white p-6 shadow-sm">
              <h3 className="text-xl font-black">Quick edits</h3>

              <div className="mt-5 space-y-3">
                <ActionButton onClick={() => setEditing("businessName")}>
                  Business details
                </ActionButton>

                <ActionButton onClick={() => setEditing("services")}>
                  Services offered
                </ActionButton>

                <ActionButton onClick={() => setEditing("description")}>
                  Description
                </ActionButton>

                <Link
                  href="/providers/fresh-plate-catering"
                  className="flex min-h-[54px] items-center justify-between rounded-[16px] bg-[#111111] px-4 text-sm font-black !text-white transition hover:bg-[#262626]"
                >
                  <span className="text-white">View as customer</span>
                  <ArrowUpRight size={17} className="text-white" />
                </Link>
              </div>
            </section>
          </aside>
        </section>

        {editing ? (
          <EditDrawer
            title={editTitle(editing)}
            value={getEditValue()}
            helper={
              editing === "services" || editing === "occasions"
                ? "Separate each item with a comma."
                : "Update the information customers will see on your listing."
            }
            multiline={editing === "description"}
            onClose={() => setEditing(null)}
            onSave={saveEdit}
          />
        ) : null}
      </main>
    </ProviderDashboardShell>
  );
}

function GalleryImage({
  src,
  large = false,
}: {
  src: string;
  large?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[26px] bg-[#f6f6f4] ${
        large ? "min-h-[440px]" : "min-h-[214px]"
      }`}
    >
      <Image
        src={src}
        alt="Provider listing gallery preview"
        fill
        sizes={large ? "(max-width: 1024px) 100vw, 620px" : "280px"}
        className="object-cover"
      />
    </div>
  );
}

function EditButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#ff5a40]/30 bg-white px-4 text-xs font-black text-[#ff5a40] transition hover:bg-[#fff0ec]"
    >
      <Pencil size={14} />
      {children}
    </button>
  );
}

function InfoCard({
  icon,
  label,
  value,
  onEdit,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  onEdit?: () => void;
}) {
  return (
    <div className="border-b border-[#eee8e3] p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
      <div className="flex items-start justify-between gap-3">
        <div className="text-[#ff5a40]">{icon}</div>

        {onEdit ? (
          <button
            type="button"
            onClick={onEdit}
            className="text-[#9aa4b5] transition hover:text-[#ff5a40]"
            aria-label={`Edit ${label}`}
          >
            <Pencil size={16} />
          </button>
        ) : null}
      </div>

      <p className="mt-4 text-[11px] font-black uppercase tracking-[0.16em] text-[#9aa4b5]">
        {label}
      </p>

      <p className="mt-2 text-base font-black text-[#111111]">
        {value}
      </p>
    </div>
  );
}

function EditableSection({
  title,
  children,
  onEdit,
}: {
  title: string;
  children: ReactNode;
  onEdit: () => void;
}) {
  return (
    <section className="rounded-[30px] border border-[#eee8e3] bg-white p-6 shadow-sm md:p-8">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-2xl font-black">{title}</h3>

        <EditButton onClick={onEdit}>Edit</EditButton>
      </div>

      <div className="mt-5">{children}</div>
    </section>
  );
}

function TagList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-[#ff5a40]/25 bg-white px-4 py-2 text-sm font-black text-[#111111]"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function StatusItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 text-sm font-black text-[#111111]">
      <CheckCircle2 size={18} className="text-emerald-500" />
      {label}
    </div>
  );
}

function ActionButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-[52px] w-full items-center justify-between rounded-[16px] border border-[#eee8e3] bg-white px-4 text-left text-sm font-black transition hover:border-[#ff5a40] hover:text-[#ff5a40]"
    >
      {children}
      <Pencil size={16} />
    </button>
  );
}

function EditDrawer({
  title,
  value,
  helper,
  multiline,
  onClose,
  onSave,
}: {
  title: string;
  value: string;
  helper: string;
  multiline?: boolean;
  onClose: () => void;
  onSave: (value: string) => void;
}) {
  const [draft, setDraft] = useState(value);

  return (
    <div className="fixed inset-0 z-[120] bg-black/35 px-4 backdrop-blur-sm">
      <div className="ml-auto flex h-full w-full max-w-md flex-col bg-white shadow-[0_0_80px_rgba(17,17,17,0.22)]">
        <div className="flex min-h-20 items-center justify-between border-b border-[#eee8e3] px-6">
          <h2 className="text-xl font-black">{title}</h2>

          <button
            type="button"
            onClick={onClose}
            className="flex size-10 items-center justify-center rounded-full transition hover:bg-[#f6f6f4]"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          <p className="text-sm font-semibold leading-6 text-[#6b7280]">
            {helper}
          </p>

          {multiline ? (
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              className="min-h-48 w-full resize-none rounded-[18px] border border-[#deded9] p-4 text-sm font-bold leading-7 outline-none transition focus:border-[#ff5a40] focus:ring-4 focus:ring-[#fff0ec]"
            />
          ) : (
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              className="min-h-[56px] w-full rounded-[18px] border border-[#deded9] px-4 text-sm font-bold outline-none transition focus:border-[#ff5a40] focus:ring-4 focus:ring-[#fff0ec]"
            />
          )}
        </div>

        <div className="border-t border-[#eee8e3] p-6">
          <button
            type="button"
            onClick={() => onSave(draft)}
            className="inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-[16px] bg-[#111111] px-5 text-sm font-black text-white transition hover:bg-[#262626]"
          >
            <Save size={17} />
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

function editTitle(editing: EditKey) {
  const titles: Record<EditKey, string> = {
    businessName: "Edit business name",
    location: "Edit location",
    category: "Edit category",
    capacity: "Edit capacity",
    areas: "Edit areas",
    rating: "Edit rating",
    description: "Edit description",
    services: "Edit services",
    occasions: "Edit occasions",
  };

  return titles[editing];
}
