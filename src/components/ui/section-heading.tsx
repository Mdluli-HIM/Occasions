type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? (
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#ff5a40]">
          {eyebrow}
        </p>
      ) : null}

      <h2 className="text-3xl font-black tracking-tight text-[#111111] md:text-4xl">
        {title}
      </h2>

      {description ? (
        <p className="mt-4 text-base leading-7 text-[#6f6f6f] md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
