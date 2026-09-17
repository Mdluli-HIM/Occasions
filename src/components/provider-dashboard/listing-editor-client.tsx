"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Edit3,
  Eye,
  ImageIcon,
  MapPin,
  PenLine,
  Save,
  ShieldCheck,
  Star,
  Users,
  X,
} from "lucide-react";
import { apiClient, ApiError } from "@/lib/api";

type EditKey =
  | "businessName"
  | "location"
  | "category"
  | "capacity"
  | "areas"
  | "description"
  | "services"
  | "occasions";

export type ListingState = {
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

const galleryImages = [
  "/images/provider-onboarding/preview-listing.png",
  "/images/provider-onboarding/about-business.png",
  "/images/provider-onboarding/stand-out.png",
  "/images/provider-onboarding/preview-listing.png",
  "/images/provider-onboarding/about-business.png",
];

const editMeta: Record<
  EditKey,
  { title: string; label: string; helper: string; multiline?: boolean }
> = {
  businessName: {
    title: "Edit business name",
    label: "Business name",
    helper: "Use the name customers know you by.",
  },
  location: {
    title: "Edit location",
    label: "Location",
    helper: "Add your main town, city or province.",
  },
  category: {
    title: "Edit service category",
    label: "Main service category",
    helper: "Example: Catering, Décor, Tents, Photography.",
  },
  capacity: {
    title: "Edit capacity",
    label: "Capacity",
    helper: "Example: 40 - 250 guests.",
  },
  areas: {
    title: "Edit coverage",
    label: "Coverage summary",
    helper: "Example: 5 areas or Polokwane + nearby towns.",
  },
  description: {
    title: "Edit description",
    label: "Description",
    helper: "Write what customers should know before requesting a quote.",
    multiline: true,
  },
  services: {
    title: "Edit services",
    label: "Services offered",
    helper: "Separate each service with a comma.",
    multiline: true,
  },
  occasions: {
    title: "Edit occasions",
    label: "Occasions supported",
    helper: "Separate each occasion with a comma.",
    multiline: true,
  },
};

export function ListingEditorClient({ initialListing }: { initialListing: ListingState }) {
  const [listing, setListing] = useState<ListingState>(initialListing);
  const [editing, setEditing] = useState<EditKey | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  async function saveEdit(value: string) {
    if (!editing) return;

    const patch: Partial<ListingState> = {
      [editing]:
        editing === "services" || editing === "occasions"
          ? value
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
          : value,
    } as Partial<ListingState>;

    setSaveError(null);

    try {
      // GET/PATCH /api/providers/me/listing — see BACKEND_HANDOFF.md section 5.7.
      const updated = await apiClient<ListingState>("/api/providers/me/listing", {
        method: "PATCH",
        body: patch,
      });
      setListing(updated);
      setEditing(null);
    } catch (error) {
      setSaveError(error instanceof ApiError ? error.message : "Failed to save your change.");
    }
  }

  function valueForEdit(key: EditKey) {
    const value = listing[key];

    if (Array.isArray(value)) {
      return value.join(", ");
    }

    return value;
  }

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-5 border-b border-[#deded9] pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#ff5a40]">
            Listing editor
          </p>

          <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
            Manage your listing preview
          </h1>

          <p className="mt-4 max-w-2xl text-base font-bold leading-7 text-[#6b7280]">
            This preview shows how your listing will appear to customers. Edit
            each section before publishing.
          </p>
        </div>

        <Link
          href="/provider-dashboard/customer-preview"
          className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-[16px] bg-[#111111] px-6 text-sm font-black !text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#262626]"
        >
          <Eye size={17} className="text-white" />
          <span className="text-white">Preview as customer</span>
          <ArrowUpRight size={16} className="text-white" />
        </Link>
      </div>

      {saveError ? (
        <p className="rounded-[16px] border border-[#ff5a40]/30 bg-[#fff0ec] px-5 py-3 text-sm font-bold text-[#ff5a40]">
          {saveError}
        </p>
      ) : null}

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-8">
          <section className="overflow-hidden rounded-[34px] bg-white p-3 shadow-sm">
            <div className="grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
              <GalleryBlock src={galleryImages[0]} large />

              <div className="grid grid-cols-2 gap-3">
                {galleryImages.slice(1).map((image, index) => (
                  <GalleryBlock key={`${image}-${index}`} src={image} />
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 px-2 pb-2">
              <div className="flex items-center gap-3 text-sm font-black text-[#6b7280]">
                <ImageIcon size={18} className="text-[#ff5a40]" />
                Gallery visible to customers
              </div>

              <button
                type="button"
                className="rounded-full border border-[#eee8e3] bg-white px-4 py-2 text-sm font-black text-[#111111] transition hover:border-[#ff5a40]/40 hover:bg-[#fff0ec] hover:text-[#ff5a40]"
              >
                Edit gallery
              </button>
            </div>
          </section>

          <section className="rounded-[34px] bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff5a40]">
                  Public listing
                </p>

                <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
                  {listing.businessName}
                </h2>

                <p className="mt-3 flex flex-wrap items-center gap-2 text-base font-bold text-[#6b7280]">
                  <MapPin size={18} className="text-[#ff5a40]" />
                  {listing.category} · {listing.location}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEditing("businessName")}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#eee8e3] bg-white px-4 py-2 text-sm font-black text-[#111111] transition hover:border-[#ff5a40]/40 hover:bg-[#fff0ec] hover:text-[#ff5a40]"
              >
                <PenLine size={15} />
                Edit
              </button>
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
          <section className="rounded-[30px] bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex size-12 items-center justify-center rounded-[16px] bg-[#fff0ec] text-[#ff5a40]">
                <ShieldCheck size={23} />
              </div>

              <div>
                <h2 className="text-xl font-black">Listing status</h2>
                <p className="mt-2 text-sm font-bold leading-6 text-[#6b7280]">
                  This is the version customers will see once your listing is
                  live.
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

          <section className="rounded-[30px] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black">Quick edits</h2>

            <div className="mt-5 space-y-3">
              <QuickEditButton
                label="Business details"
                onClick={() => setEditing("businessName")}
              />
              <QuickEditButton
                label="Location"
                onClick={() => setEditing("location")}
              />
              <QuickEditButton
                label="Service category"
                onClick={() => setEditing("category")}
              />
              <QuickEditButton
                label="Description"
                onClick={() => setEditing("description")}
              />
            </div>
          </section>

          <Link
            href="/provider-dashboard/customer-preview"
            className="flex min-h-[56px] items-center justify-center gap-2 rounded-[16px] bg-[#111111] px-5 text-sm font-black !text-white transition hover:bg-[#262626]"
          >
            <Eye size={17} className="text-white" />
            <span className="text-white">Preview as customer</span>
          </Link>
        </aside>
      </div>

      {editing ? (
        <EditModal
          key={editing}
          editKey={editing}
          value={valueForEdit(editing)}
          onClose={() => setEditing(null)}
          onSave={saveEdit}
        />
      ) : null}
    </section>
  );
}

function GalleryBlock({ src, large = false }: { src: string; large?: boolean }) {
  return (
    <div
      className={`rounded-[26px] bg-[#f6f6f4] bg-cover bg-center ${
        large ? "min-h-[440px]" : "min-h-[214px]"
      }`}
      style={{ backgroundImage: `url(${src})` }}
    />
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
      <div className="flex items-start justify-between gap-4">
        <div className="text-[#ff5a40]">{icon}</div>

        {onEdit ? (
          <button
            type="button"
            onClick={onEdit}
            className="rounded-full p-2 text-[#9aa4b5] transition hover:bg-[#fff0ec] hover:text-[#ff5a40]"
            aria-label={`Edit ${label}`}
          >
            <Edit3 size={15} />
          </button>
        ) : null}
      </div>

      <p className="mt-4 text-[11px] font-black uppercase tracking-[0.16em] text-[#9aa4b5]">
        {label}
      </p>

      <p className="mt-2 text-base font-black text-[#111111]">{value}</p>
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
    <section className="rounded-[30px] bg-white p-6 shadow-sm md:p-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-black">{title}</h2>

        <button
          type="button"
          onClick={onEdit}
          className="rounded-full border border-[#eee8e3] bg-white px-4 py-2 text-sm font-black text-[#111111] transition hover:border-[#ff5a40]/40 hover:bg-[#fff0ec] hover:text-[#ff5a40]"
        >
          Edit
        </button>
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

function QuickEditButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-[54px] w-full items-center justify-between rounded-[16px] border border-[#eee8e3] bg-white px-4 text-sm font-black text-[#111111] transition hover:border-[#ff5a40]/35 hover:bg-[#fff0ec] hover:text-[#ff5a40]"
    >
      {label}
      <Edit3 size={16} />
    </button>
  );
}

function EditModal({
  editKey,
  value,
  onClose,
  onSave,
}: {
  editKey: EditKey;
  value: string;
  onClose: () => void;
  onSave: (value: string) => void;
}) {
  const [draftValue, setDraftValue] = useState(value);
  const meta = editMeta[editKey];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#111111]/45 p-5 backdrop-blur-md">
      <button
        type="button"
        aria-label="Close editor overlay"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />

      <section className="relative w-full max-w-2xl overflow-hidden rounded-[34px] bg-white shadow-[0_40px_140px_rgba(17,17,17,0.28)]">
        <div className="flex items-start justify-between gap-5 border-b border-[#eee8e3] px-6 py-6 md:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#ff5a40]">
              Listing editor
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-[#111111] md:text-3xl">
              {meta.title}
            </h2>

            <p className="mt-2 max-w-md text-sm font-bold leading-6 text-[#6b7280]">
              {meta.helper}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#f6f6f4] text-[#111111] transition hover:bg-[#fff0ec] hover:text-[#ff5a40]"
            aria-label="Close editor"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-7 md:px-8">
          <label className="block">
            <span className="mb-3 block text-sm font-black text-[#111111]">
              {meta.label}
            </span>

            {meta.multiline ? (
              <textarea
                value={draftValue}
                onChange={(event) => setDraftValue(event.target.value)}
                rows={7}
                className="w-full resize-none rounded-[24px] border border-[#deded9] bg-white px-5 py-4 text-base font-bold leading-8 text-[#111111] outline-none transition placeholder:text-[#9aa4b5] focus:border-[#ff5a40] focus:ring-4 focus:ring-[#fff0ec]"
                placeholder="Type your update here..."
              />
            ) : (
              <input
                value={draftValue}
                onChange={(event) => setDraftValue(event.target.value)}
                className="min-h-[60px] w-full rounded-[22px] border border-[#deded9] bg-white px-5 text-base font-bold text-[#111111] outline-none transition placeholder:text-[#9aa4b5] focus:border-[#ff5a40] focus:ring-4 focus:ring-[#fff0ec]"
                placeholder="Type your update here..."
              />
            )}
          </label>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-[#eee8e3] bg-[#fbfbfa] px-6 py-5 md:flex-row md:justify-end md:px-8">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[52px] rounded-[16px] border border-[#deded9] bg-white px-6 text-sm font-black text-[#111111] transition hover:border-[#ff5a40]/35 hover:bg-[#fff0ec] hover:text-[#ff5a40]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => onSave(draftValue)}
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[16px] bg-[#111111] px-6 text-sm font-black !text-white transition hover:bg-[#262626]"
          >
            <Save size={16} className="text-white" />
            <span className="text-white">Save changes</span>
          </button>
        </div>
      </section>
    </div>
  );
}
