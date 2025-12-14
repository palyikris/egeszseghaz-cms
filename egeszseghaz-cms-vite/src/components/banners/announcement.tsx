/* eslint-disable prettier/prettier */
import { useEditMode } from "@/context/edit/edit";
import { usePublishAnnouncement } from "@/hooks/banner/usePublishAnnouncement";
import { AnnouncementSchema } from "@/templates/announcement/announcement_schema";
import { Button } from "@heroui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";

interface Props {
  data: AnnouncementSchema;
}

export function Announcement({ data }: Props) {
  const [visible, setVisible] = useState(false);
  const [removed, setRemoved] = useState(false);
  const { isEditMode } = useEditMode();
  const editAnnouncement = usePublishAnnouncement();
  const qc = useQueryClient();

  const themeStyles: Record<
    string,
    { container: string; cta: string; ctaHover?: string }
  > = {
    info: {
      container: "border-secondary bg-secondary-light/10",
      cta: "bg-secondary text-white",
      ctaHover: "hover:bg-secondary-dark",
    },
    warning: {
      container: "border-error bg-error/10",
      cta: "bg-error text-white",
      ctaHover: "hover:bg-error-dark",
    },
    highlight: {
      container: "border-accent bg-accent/10",
      cta: "bg-accent text-white",
      ctaHover: "hover:bg-accent-dark",
    },
  };

  // pick theme safely
  const theme = data.theme ?? "info";
  const styles = themeStyles[theme] ?? themeStyles.info;

  // Trigger entrance animation
  useEffect(() => {
    const timer = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  if (!data.title && !data.description) return null;

  const handleDismiss = () => {
    setVisible(false); // start fade-out
    setTimeout(() => setRemoved(true), 300); // remove completely after animation
  };

  if (removed) return null;

  return (
    <div
      className={[
        "w-full flex justify-center px-4 transition-all duration-300",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      ].join(" ")}
    >
      <div
        className={[
          "relative w-full max-w-6xl rounded-xl border overflow-hidden",
          "shadow-[0_3px_12px_rgba(0,0,0,0.06)] backdrop-blur-md transition-all duration-300",
          styles.container,
          visible ? "opacity-100 scale-[1]" : "opacity-0 scale-[0.97]",
        ].join(" ")}
      >
        {/* X (dismiss) button */}
        <button
          onClick={handleDismiss}
          aria-label="Dismiss announcement"
          className="
            absolute top-3 right-3 
            w-7 h-7 rounded-full flex items-center justify-center
            bg-white/40 backdrop-blur-md border border-white/50 
            text-text-primary hover:bg-white/70
            transition-all duration-200 cursor-pointer
          "
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          >
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row md:items-center">
          {/* Content */}
          <div className="flex-1 p-5 md:p-6">
            {/* Date */}
            {data.date && (
              <p className="text-xs tracking-wide text-text-secondary uppercase mb-1">
                {new Date(data.date).toLocaleDateString("hu-HU", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            )}

            {/* Title */}
            <h2 className="text-lg md:text-xl font-semibold text-text-primary mb-2">
              {data.title}
            </h2>

            {/* Description */}
            <p className="text-sm text-text-secondary leading-relaxed mb-3 whitespace-pre-line line-clamp-2">
              {data.description}
            </p>

            <div className="w-full flex items-center justify-start gap-6">
              {/* CTA */}
              {data.cta.isVisible && data.cta.label && data.cta.url && (
                <a
                  href={data.cta.url}
                  className={[
                    "inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm",
                    "shadow-[0_3px_10px_rgba(0,0,0,0.12)] transition-all active:scale-[0.97]",
                    styles.cta,
                    styles.ctaHover ?? "",
                  ].join(" ")}
                >
                  {data.cta.label}
                  <svg
                    width="15"
                    height="15"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="opacity-90"
                  >
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              )}
              {isEditMode && (
                <Button
                  color="primary"
                  onPress={() => {
                    editAnnouncement.mutateAsync(
                      {
                        publishedContent: {
                          ...data,
                          isDisplayed: false,
                        },
                      },
                      {
                        onSuccess: () => {
                          qc.invalidateQueries({
                            queryKey: ["announcement"],
                          });
                        },
                      }
                    );
                  }}
                >
                  Eltüntetés
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
