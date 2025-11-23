/* eslint-disable prettier/prettier */
import { AnnouncementSchema } from "@/templates/announcement/announcement_schema";

interface Props {
  data: AnnouncementSchema;
}

export function Announcement({ data }: Props) {
  if (!data.title && !data.description) return null;

  

  const themeStyles = {
    info: "border-secondary bg-secondary-light/10",
    warning: "border-error bg-error/10",
    highlight: "border-accent bg-accent/10",
  };

  return (
    <div className="w-full flex justify-center px-4">
      <div
        className={[
          "relative w-full max-w-5xl overflow-hidden rounded-2xl border",
          "shadow-[0_4px_20px_rgba(0,0,0,0.08)]",
          "backdrop-blur-xl transition-all duration-300",
          themeStyles[data.theme],
        ].join(" ")}
      >
        {/* Banner */}
        {data.bannerImage && (
          <div className="relative w-full h-60 md:h-80 overflow-hidden group">
            <img
              src={data.bannerImage}
              alt={data.title}
              className="
                w-full h-full object-cover
                transition-transform duration-[1400ms] 
                group-hover:scale-[1.08]
              "
            />

            {/* Gradient overlay – premium effect */}
            <div
              className="
                absolute inset-0 
                bg-gradient-to-t from-background-light/80 via-background-light/20 to-transparent
                pointer-events-none
              "
            />
          </div>
        )}

        {/* Content */}
        <div className="p-8 md:p-10">
          {/* Accent line */}
          <div className="w-16 h-[3px] rounded-full bg-accent mb-6"></div>

          {/* Date */}
          {data.date && (
            <p className="text-sm tracking-wide text-text-secondary mb-1 uppercase">
              {new Date(data.date).toLocaleDateString("hu-HU", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-text-primary leading-tight">
            {data.title}
          </h2>

          {/* Description */}
          <p className="text-lg text-text-secondary leading-relaxed mb-8 whitespace-pre-line">
            {data.description}
          </p>

          {/* CTA */}
          {data.cta.isVisible && data.cta.label && data.cta.url && (
            <a
              href={data.cta.url}
              className="
                inline-flex items-center gap-2 px-7 py-3.5
                rounded-full 
                bg-secondary text-white 
                font-medium tracking-wide
                shadow-[0_4px_14px_rgba(0,0,0,0.15)]
                transition-all 
                hover:bg-secondary-dark
                hover:shadow-[0_6px_18px_rgba(0,0,0,0.18)]
                active:scale-[0.98]
              "
            >
              {data.cta.label}
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                className="opacity-80 group-hover:opacity-100 transition"
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
