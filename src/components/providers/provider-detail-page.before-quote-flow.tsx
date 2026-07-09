"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Clock,
  Download,
  Flag,
  Grid3X3,
  Heart,
  ImageIcon,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Printer,
  Share2,
  ShieldCheck,
  Star,
  User,
  Users,
  X,
} from "lucide-react";
import type { ProviderDetail } from "@/data/provider-details";

export function ProviderDetailPage({ provider }: { provider: ProviderDetail }) {
  const [activeImage, setActiveImage] = useState(provider.images[0]);
  const [saved, setSaved] = useState(false);
  const [openSection, setOpenSection] = useState(provider.overview[0]?.title ?? "");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  function openGalleryAt(index: number) {
    setGalleryIndex(index);
    setActiveImage(provider.images[index] ?? provider.images[0]);
    setGalleryOpen(true);
  }

  return (
    <main className="min-h-screen bg-[#f6f6f4] text-[#111111]">
      <header className="sticky top-0 z-50 border-b border-[#ece7e2] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-5 px-5 md:px-8">
          <Link href="/" className="text-3xl font-black tracking-tight !text-[#ff5a40]">
            Occasions
          </Link>

          <div className="hidden min-w-0 flex-1 border-l border-[#deded9] pl-6 md:block">
            <p className="truncate text-base font-black">{provider.name}</p>
            <p className="text-sm font-bold text-[#6b7280]">{provider.priceLabel}</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSaved((value) => !value)}
              className="flex size-12 items-center justify-center rounded-full border border-[#deded9] bg-white text-[#ff5a40] transition hover:border-[#ff5a40] hover:bg-[#fff0ec]"
              aria-label="Save provider"
            >
              <Heart size={21} fill={saved ? "#ff5a40" : "none"} />
            </button>

            <a
              href={`tel:${provider.contact.phone}`}
              className="hidden min-h-12 items-center rounded-[16px] bg-[#ff5a40] px-6 text-sm font-black text-white transition hover:bg-[#ed422b] md:inline-flex"
            >
              Contact Provider
            </a>
          </div>
        </div>
      </header>

      <section className="border-y border-[#ed422b] bg-[#ff5a40] px-5 py-4 text-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 text-sm font-bold">
          <Link href="/search" className="inline-flex items-center gap-2 hover:text-white/80">
            <ArrowLeft size={16} />
            Back to results
          </Link>
          <span className="text-white/50">/</span>
          <span>{provider.category}</span>
          <span className="text-white/50">/</span>
          <span>{provider.location}</span>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-6 md:px-8">
        <Gallery
          provider={provider}
          activeImage={activeImage}
          onImageChange={setActiveImage}
          onOpenGallery={openGalleryAt}
        />

        <ImageLightbox
          images={provider.images}
          currentIndex={galleryIndex}
          isOpen={galleryOpen}
          onClose={() => setGalleryOpen(false)}
          onIndexChange={(nextIndex) => {
            setGalleryIndex(nextIndex);
            setActiveImage(provider.images[nextIndex] ?? provider.images[0]);
          }}
        />

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-6">
            <SummaryCard provider={provider} saved={saved} onSave={() => setSaved((value) => !value)} />
            <AboutCard provider={provider} />
            <PillCard title="Services offered" items={provider.services} />
            <PillCard title="Occasions supported" items={provider.eventTypes} />
            <QuickQuestions />
            <ImageGrid images={provider.images} />
            <OverviewCard
              provider={provider}
              openSection={openSection}
              onToggle={setOpenSection}
            />
            <ReviewsCard provider={provider} />
            <SimilarProviders provider={provider} />
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <ContactCard provider={provider} />
            <TrustCard provider={provider} />
            <ShareCard />
            <ActionsCard />
          </aside>
        </div>
      </section>
    </main>
  );
}

function Gallery({
  provider,
  activeImage,
  onImageChange,
  onOpenGallery,
}: {
  provider: ProviderDetail;
  activeImage: string;
  onImageChange: (image: string) => void;
  onOpenGallery: (index: number) => void;
}) {
  const sideImages = provider.images.slice(1, 3);
  const activeImageIndex = Math.max(provider.images.indexOf(activeImage), 0);

  return (
    <section className="overflow-hidden rounded-[28px] bg-white shadow-[0_18px_50px_rgba(17,17,17,0.12)]">
      <div className="grid gap-1 bg-[#111111] md:grid-cols-[2fr_0.9fr]">
        <button
          className="group relative min-h-[360px] overflow-hidden md:min-h-[520px]"
          type="button"
          onClick={() => onOpenGallery(activeImageIndex)}
          aria-label="Open main image"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition duration-[1400ms] group-hover:scale-[1.035]"
            style={{ backgroundImage: `url(${activeImage})` }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />

          <div className="absolute bottom-6 left-6 rounded-full bg-white/95 px-4 py-2 text-sm font-black shadow-lg transition group-hover:bg-[#ff5a40] group-hover:text-white">
            {provider.images.length} photos
          </div>
        </button>

        <div className="hidden grid-rows-2 gap-1 md:grid">
          {sideImages.map((image, index) => {
            const imageIndex = provider.images.indexOf(image);

            return (
              <button
                key={image}
                type="button"
                onMouseEnter={() => onImageChange(image)}
                onFocus={() => onImageChange(image)}
                onClick={() => onOpenGallery(imageIndex)}
                className="group relative overflow-hidden"
                aria-label={`Open image ${imageIndex + 1}`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition duration-[1200ms] group-hover:scale-[1.06]"
                  style={{ backgroundImage: `url(${image})` }}
                />

                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />

                {index === 1 ? (
                  <div className="absolute bottom-5 right-5 rounded-[16px] bg-white px-5 py-3 text-sm font-black shadow-lg transition group-hover:bg-[#ff5a40] group-hover:text-white">
                    See all {provider.images.length} images
                  </div>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 bg-[#111111] px-5 py-4">
        <GalleryAction
          icon={<ImageIcon size={18} />}
          label={`Photos (${provider.images.length})`}
          onClick={() => onOpenGallery(activeImageIndex)}
        />

        <GalleryAction
          icon={<Grid3X3 size={18} />}
          label="Photo Grid"
          onClick={() => onOpenGallery(0)}
        />
      </div>
    </section>
  );
}

function ImageLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onIndexChange,
}: {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}) {
  const safeIndex = Math.min(Math.max(currentIndex, 0), images.length - 1);
  const currentImage = images[safeIndex];
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    touchStartX.current = event.touches[0]?.clientX ?? null;
    touchEndX.current = null;
  }

  function handleTouchMove(event: React.TouchEvent<HTMLDivElement>) {
    touchEndX.current = event.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd() {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const distance = touchStartX.current - touchEndX.current;
    const minimumSwipeDistance = 45;

    if (distance > minimumSwipeDistance) {
      goToNext();
    }

    if (distance < -minimumSwipeDistance) {
      goToPrevious();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  }

  function goToPrevious() {
    const nextIndex = safeIndex === 0 ? images.length - 1 : safeIndex - 1;
    onIndexChange(nextIndex);
  }

  function goToNext() {
    const nextIndex = safeIndex === images.length - 1 ? 0 : safeIndex + 1;
    onIndexChange(nextIndex);
  }

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        goToPrevious();
      }

      if (event.key === "ArrowRight") {
        goToNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
    // Keyboard navigation intentionally depends on the current index and images length through the functions above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, safeIndex, images.length]);

  if (!isOpen || !currentImage) return null;

  return (
    <div className="fixed inset-0 z-[120] bg-[#090909]/95 text-white">
      <div className="flex min-h-screen flex-col">
        <div className="flex min-h-20 items-center justify-between border-b border-white/10 px-5 md:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-white/50">
              Gallery
            </p>
            <p className="mt-1 text-base font-black">
              {safeIndex + 1} of {images.length}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex size-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#ff5a40]"
            aria-label="Close image gallery"
          >
            <X size={24} />
          </button>
        </div>

        <div
          className="relative flex flex-1 touch-pan-y items-center justify-center px-0 py-5 md:px-20 md:py-6"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            onClick={goToPrevious}
            className="absolute left-5 top-1/2 z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-[#ff5a40] md:left-8 md:flex"
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>

          <div className="flex w-full flex-col items-center gap-4 px-4">
            <div
              className="h-[62vh] w-full max-w-6xl rounded-[22px] bg-contain bg-center bg-no-repeat md:h-[68vh] md:rounded-[26px]"
              style={{ backgroundImage: `url(${currentImage})` }}
            />

            <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-white/45 md:hidden">
              Swipe left or right
            </p>
          </div>

          <button
            type="button"
            onClick={goToNext}
            className="absolute right-5 top-1/2 z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-[#ff5a40] md:right-8 md:flex"
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        <div className="border-t border-white/10 px-5 py-4 md:px-8">
          <div className="mx-auto flex max-w-6xl gap-3 overflow-x-auto pb-2">
            {images.map((image, index) => {
              const isActive = index === safeIndex;

              return (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => onIndexChange(index)}
                  className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-[16px] border transition ${
                    isActive
                      ? "border-[#ff5a40]"
                      : "border-white/10 opacity-65 hover:opacity-100"
                  }`}
                  aria-label={`View image ${index + 1}`}
                >
                  <span
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${image})` }}
                  />

                  {isActive ? (
                    <span className="absolute inset-x-3 bottom-2 h-1 rounded-full bg-[#ff5a40]" />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function GalleryAction({
  icon,
  label,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-11 items-center gap-2 rounded-[14px] border border-white/20 px-5 text-sm font-black text-white transition hover:border-[#ff5a40] hover:bg-[#ff5a40]"
    >
      {icon}
      {label}
    </button>
  );
}

function SummaryCard({
  provider,
  saved,
  onSave,
}: {
  provider: ProviderDetail;
  saved: boolean;
  onSave: () => void;
}) {
  return (
    <section className="rounded-[24px] border border-[#deded9] bg-white p-6 shadow-sm md:p-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-4xl font-black tracking-tight">
            {provider.priceLabel}{" "}
            <span className="text-base font-black text-[#6b7280]">{provider.priceNote}</span>
          </p>

          <h1 className="mt-5 text-3xl font-black tracking-tight">{provider.name}</h1>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm font-bold text-[#6b7280]">
            <span className="inline-flex items-center gap-2 text-[#111111]">
              <MapPin size={17} className="text-[#ff5a40]" />
              {provider.location}, {provider.province}
            </span>

            <span className="inline-flex items-center gap-2">
              <Star size={17} className="fill-[#ff5a40] text-[#ff5a40]" />
              <span className="text-[#111111]">{provider.rating}</span>
              {provider.reviewCount} reviews
            </span>

            {provider.verified ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#fff0ec] px-3 py-1 text-[#ff5a40]">
                <ShieldCheck size={15} />
                Verified
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex gap-3">
          <IconButton icon={<Share2 size={20} />} />
          <button
            type="button"
            onClick={onSave}
            className="flex size-12 items-center justify-center rounded-[16px] border border-[#deded9] bg-white text-[#ff5a40] transition hover:border-[#ff5a40] hover:bg-[#fff0ec]"
          >
            <Heart size={20} fill={saved ? "#ff5a40" : "none"} />
          </button>
        </div>
      </div>

      <div className="mt-7 grid gap-3 border-t border-[#ece7e2] pt-6 sm:grid-cols-4">
        <Stat icon={<Users size={20} />} label="Capacity" value={provider.capacity} />
        <Stat icon={<Clock size={20} />} label="Response" value={provider.responseTime} />
        <Stat icon={<Check size={20} />} label="Experience" value={provider.yearsExperience} />
        <Stat icon={<ShieldCheck size={20} />} label="Status" value={provider.promoted ? "Promoted" : "Listed"} />
      </div>
    </section>
  );
}

function IconButton({ icon }: { icon: ReactNode }) {
  return (
    <button
      type="button"
      className="flex size-12 items-center justify-center rounded-[16px] border border-[#deded9] bg-white text-[#ff5a40] transition hover:border-[#ff5a40] hover:bg-[#fff0ec]"
    >
      {icon}
    </button>
  );
}

function Stat({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-[18px] bg-[#f6f6f4] p-4">
      <div className="mb-3 text-[#ff5a40]">{icon}</div>
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#8a8a8a]">{label}</p>
      <p className="mt-1 text-sm font-black">{value}</p>
    </div>
  );
}

function AboutCard({ provider }: { provider: ProviderDetail }) {
  return (
    <section className="rounded-[24px] border border-[#deded9] bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-xl font-black">About this provider</h2>
      <p className="mt-4 text-lg font-black leading-8">{provider.summary}</p>

      <div className="mt-5 space-y-4 text-base leading-8 text-[#343434]">
        {provider.description.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        {provider.highlights.map((highlight) => (
          <div
            key={highlight}
            className="flex items-center gap-3 rounded-[16px] border border-[#eee8e3] bg-[#fffaf8] p-4 text-sm font-bold"
          >
            <span className="flex size-7 items-center justify-center rounded-full bg-[#ff5a40] text-white">
              <Check size={15} strokeWidth={3} />
            </span>
            {highlight}
          </div>
        ))}
      </div>
    </section>
  );
}

function PillCard({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-[24px] border border-[#deded9] bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-xl font-black">{title}</h2>

      <div className="mt-5 flex flex-wrap gap-3">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-[#ff5a40]/30 bg-[#fff0ec] px-4 py-2 text-sm font-black text-[#ff5a40] transition hover:bg-[#ff5a40] hover:text-white"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

function QuickQuestions() {
  const questions = [
    "Can you support my guest count?",
    "What is included in the quote?",
    "Do you serve my area?",
    "How soon can you confirm availability?"
  ];

  return (
    <section className="rounded-[24px] border border-[#deded9] bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-xl font-black">Ask about this service</h2>

      <div className="mt-5 flex flex-wrap gap-3">
        {questions.map((question) => (
          <button
            key={question}
            type="button"
            className="rounded-full border border-[#ff5a40] bg-white px-4 py-2 text-sm font-bold transition hover:bg-[#ff5a40] hover:text-white"
          >
            {question}
          </button>
        ))}
      </div>
    </section>
  );
}

function ImageGrid({ images }: { images: string[] }) {
  return (
    <section className="rounded-[24px] border border-[#deded9] bg-white p-3 shadow-sm">
      <div className="grid gap-1 overflow-hidden rounded-[18px] md:grid-cols-3">
        {images.slice(0, 9).map((image, index) => (
          <button key={`${image}-${index}`} type="button" className="group relative min-h-[190px] overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition duration-[1200ms] group-hover:scale-[1.06]"
              style={{ backgroundImage: `url(${image})` }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}

function OverviewCard({
  provider,
  openSection,
  onToggle,
}: {
  provider: ProviderDetail;
  openSection: string;
  onToggle: (title: string) => void;
}) {
  return (
    <section className="rounded-[24px] border border-[#deded9] bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-xl font-black">Provider overview</h2>

      <div className="mt-6 overflow-hidden rounded-[18px] border border-[#eee8e3]">
        {provider.overview.map((section) => {
          const isOpen = openSection === section.title;

          return (
            <div key={section.title} className="border-b border-[#eee8e3] last:border-b-0">
              <button
                type="button"
                onClick={() => onToggle(isOpen ? "" : section.title)}
                className="flex min-h-16 w-full items-center justify-between px-5 text-left text-base font-black transition hover:bg-[#fff0ec]"
              >
                {section.title}
                <ChevronDown size={19} className={`text-[#ff5a40] transition ${isOpen ? "rotate-180" : ""}`} />
              </button>

              {isOpen ? (
                <div className="grid gap-0 px-5 pb-5">
                  {section.rows.map((item, index) => (
                    <div
                      key={item.label}
                      className={`grid grid-cols-2 gap-4 px-4 py-4 text-sm ${
                        index % 2 === 0 ? "bg-[#f6f6f4]" : "bg-white"
                      }`}
                    >
                      <span className="font-bold text-[#343434]">{item.label}</span>
                      <span className="font-black">{item.value}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ReviewsCard({ provider }: { provider: ProviderDetail }) {
  return (
    <section className="rounded-[24px] border border-[#deded9] bg-white p-6 shadow-sm md:p-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-black">Reviews</h2>

        <div className="flex items-center gap-2 text-sm font-black">
          <Star size={18} className="fill-[#ff5a40] text-[#ff5a40]" />
          {provider.rating} · {provider.reviewCount} reviews
        </div>
      </div>

      <div className="mt-6 grid gap-4">
       {provider.reviews.map((review) => (
          <article key={`${review.name}-${review.date}`} className="rounded-[18px] border border-[#eee8e3] p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-black">{review.name}</p>
                <p className="text-sm font-bold text-[#8a8a8a]">{review.date}</p>
              </div>

              <div className="flex items-center gap-1 font-black">
                <Star size={16} className="fill-[#ff5a40] text-[#ff5a40]" />
                {review.rating}
              </div>
            </div>

            <p className="mt-4 leading-7 text-[#343434]">{review.comment}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactCard({ provider }: { provider: ProviderDetail }) {
  return (
    <section className="rounded-[24px] border border-[#deded9] bg-white p-6 shadow-sm">
      <h2 className="text-center text-xl font-black">Contact provider</h2>

      <div className="mt-6 space-y-3">
        <Field icon={<User size={18} />} value={provider.contact.person} />
        <Field icon={<Mail size={18} />} value={provider.contact.email} />
        <Field icon={<Phone size={18} />} value={provider.contact.phone} />

        <textarea
          defaultValue={`I'm interested in ${provider.name}. Please contact me with availability and a quote.`}
          className="min-h-28 w-full resize-none rounded-[16px] border border-[#deded9] bg-white p-4 text-sm font-bold outline-none transition focus:border-[#ff5a40] focus:ring-4 focus:ring-[#fff0ec]"
        />

        <button type="button" className="min-h-14 w-full rounded-[16px] bg-[#ff5a40] px-5 text-sm font-black text-white transition hover:bg-[#ed422b]">
          Request Quote
        </button>

        <a href={`https://wa.me/${provider.contact.whatsapp}`} className="flex min-h-14 w-full items-center justify-center gap-2 rounded-[16px] border border-[#ff5a40] bg-white px-5 text-sm font-black transition hover:bg-[#fff0ec]">
          <MessageCircle size={18} className="text-[#ff5a40]" />
          WhatsApp Provider
        </a>
      </div>
    </section>
  );
}

function Field({ icon, value }: { icon: ReactNode; value: string }) {
  return (
    <div className="flex min-h-14 items-center gap-3 rounded-[16px] border border-[#deded9] bg-white px-4 text-sm font-bold">
      <span className="text-[#ff5a40]">{icon}</span>
      <span className="truncate">{value}</span>
    </div>
  );
}

function TrustCard({ provider }: { provider: ProviderDetail }) {
  return (
    <section className="rounded-[24px] border border-[#deded9] bg-white p-6 text-center shadow-sm">
      <div className="mx-auto flex size-28 items-center justify-center rounded-full bg-[#111111] text-4xl font-black text-white">
        {provider.name.slice(0, 1)}
      </div>

      <h3 className="mt-4 text-lg font-black">{provider.name}</h3>
      <p className="mt-2 text-sm font-bold text-[#6b7280]">{provider.category}</p>

      <div className="mt-5 grid gap-3 text-left">
        {provider.highlights.slice(0, 3).map((item) => (
          <div key={item} className="flex items-center gap-3 text-sm font-bold">
            <Check size={16} className="text-[#ff5a40]" />
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

function ShareCard() {
  return (
    <section className="rounded-[24px] border border-[#deded9] bg-white p-6 text-center shadow-sm">
      <h3 className="text-lg font-black">Share</h3>

      <div className="mt-5 flex justify-center gap-3">
        {["f", "𝕏", "wa", "@"].map((item) => (
          <button
            key={item}
            type="button"
            className="flex size-11 items-center justify-center rounded-[14px] bg-[#111111] text-sm font-black text-white transition hover:bg-[#ff5a40]"
          >
            {item}
          </button>
        ))}
      </div>
    </section>
  );
}

function ActionsCard() {
  return (
    <section className="rounded-[24px] border border-[#deded9] bg-white p-6 shadowm">
      <div className="grid gap-4">
        <Action icon={<Printer size={20} />} label="Print" />
        <Action icon={<Download size={20} />} label="Download quote brief" />
        <Action icon={<Flag size={20} />} label="Report listing" />
      </div>
    </section>
  );
}

function Action({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <button type="button" className="flex min-h-12 items-center gap-4 rounded-[14px] px-3 text-left text-sm font-black transition hover:bg-[#fff0ec] hover:text-[#ff5a40]">
      <span className="text-[#ff5a40]">{icon}</span>
      {label}
    </button>
  );
}

function SimilarProviders({ provider }: { provider: ProviderDetail }) {
  return (
    <section className="rounded-[24px] border border-[#deded9] bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-xl font-black">Similar providers</h2>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {provider.similar.map((item) => (
          <Link
            key={item.id}
            href={`/providers/${item.id}`}
            className="group overflow-hidden rounded-[20px] border border-[#eee8e3] bg-white transition hover:border-[#ff5a40] hover:shadow-[0_18px_40px_rgba(17,17,17,0.08)]"
          >
            <div className="relative h-44 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition duration-[1200ms] group-hover:scale-[1.06]"
                style={{ backgroundImage: `url(${item.image})` }}
              />
            </div>

            <div className="p-5">
              <p className="text-lg font-black">{item.name}</p>
              <p className="mt-1 text-sm font-bold text-[#6b7280]">{item.location}</p>
              <p className="mt-3 text-xl font-black text-[#ff5a40]">{item.priceLabel}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
