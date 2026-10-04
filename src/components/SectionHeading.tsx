interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({ id, eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="text-sm font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>
      <h2 id={id} className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
    </div>
  );
}
