/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@heroui/button";
import CustomDivider from "../divider";
import { useEditMode } from "@/context/edit/edit";
import { useNavigate } from "react-router-dom";
import { NewServiceSchema } from "@/templates/new_service/new_service_schema";

interface Props {
  data: NewServiceSchema;
}

export function NewServiceSection({ data }: Props) {
  const { isEditMode, draft } = useEditMode();

  // When editing, prefer draft.newService if present so live preview shows editor changes.
  const templateSource: NewServiceSchema = isEditMode
    ? ((draft as any).newService as NewServiceSchema) || data
    : data;

  const [visible, setVisible] = useState(false);
  const [removed, setRemoved] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    setTimeout(() => setRemoved(true), 300);
  };

  if (!templateSource.isDisplayed || removed) return null;

  const heroSrc =
    typeof templateSource.heroImage === "string"
      ? templateSource.heroImage
      : templateSource.heroImage?.url ||
        (typeof data.heroImage === "string"
          ? data.heroImage
          : data.heroImage?.url);

  const heroAlt =
    typeof templateSource.title === "string"
      ? templateSource.title
      : templateSource.title?.text ||
        (typeof data.title === "string" ? data.title : data.title?.text);

  return (
    <section
      className={[
        "py-14 px-6 sm:px-12 md:px-20 bg-background-light transition-all duration-300",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      ].join(" ")}
      id="service"
    >
      <div
        className={
          "max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start"
        }
      >
        {/* LEFT PART */}
        <div className={"space-y-5"}>
          {/* Title */}
          <BlurFade inView delay={0.1}>
            <h1
              className={
                "text-3xl md:text-4xl font-semibold leading-tight pb-1 bg-gradient-to-r from-primary-dark to-secondary-dark bg-clip-text text-transparent"
              }
            >
              {templateSource.title?.text}
            </h1>
          </BlurFade>

          {/* Subtitle */}
          {data.subtitle && (
            <BlurFade inView delay={0.15}>
              <p
                className={`text-lg text-${templateSource.subtitle?.color} relative inline-block italic font-bold`}
              >
                {templateSource.subtitle?.text}
                <span className="absolute left-0 -bottom-1 w-10 h-[3px] rounded-full bg-accent" />
              </p>
            </BlurFade>
          )}

          {/* Short Description */}
          <BlurFade inView delay={0.2}>
            <p
              className={[
                "text-base leading-relaxed whitespace-pre-line",
                "pl-4",
                `border-l-2 border-${templateSource.description?.leftBorderColor || "primary-light"}`,
                "my-8",
                `text-${templateSource.description?.color}`,
              ].join(" ")}
            >
              {templateSource.description?.text}
            </p>
          </BlurFade>

          {/* Long Description */}
          <BlurFade inView delay={0.25}>
            <p
              className={`whitespace-pre-line leading-relaxed border ${`text-${templateSource.longDescription?.color || "text-secondary"}`} bg-${templateSource.longDescription?.bg || "surface"} p-4 rounded-${templateSource.longDescription?.rounded || "xl"} border-${templateSource.longDescription?.border || "accent"}`}
            >
              {templateSource.longDescription?.text}
            </p>
          </BlurFade>

          {/* Contact */}
          <div className={`p-5 rounded-xly pt-0 space-y-1.5 w-full`}>
            {templateSource.contactInfo?.phone.isDisplayed && (
              <div
                className={`text-${templateSource.contactInfo.phone.color} text-md flex items-center gap-4`}
              >
                <div
                  className={`rounded-${templateSource.contactInfo.phone.rounded} p-2 text-${templateSource.contactInfo.phone.iconColor} bg-${templateSource.contactInfo.phone.bgColor}/20`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                {templateSource.contactInfo?.phone.number}
              </div>
            )}
            {templateSource.contactInfo?.email.isDisplayed && (
              <div
                className={`text-${templateSource.contactInfo.email.color} text-md flex items-center gap-4`}
              >
                <div
                  className={`rounded-${templateSource.contactInfo.email.rounded} p-2 text-${templateSource.contactInfo.email.iconColor} bg-${templateSource.contactInfo.email.bgColor}/20`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                    <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                  </svg>
                </div>
                {templateSource.contactInfo?.email.address}
              </div>
            )}
          </div>

          {/* Buttons */}
          <BlurFade inView delay={0.4}>
            <div className="flex gap-3 pt-2">
              <Button
                color={
                  (templateSource.primaryButton?.color as any) || "secondary"
                }
                variant={
                  (templateSource.primaryButton?.variant as any) || "solid"
                }
                className={"font-semibold"}
                onPress={() => {
                  if (templateSource.primaryButton?.href) {
                    navigate(templateSource.primaryButton.href);
                  }
                }}
              >
                {templateSource.primaryButton?.label || "Több információ"}
              </Button>
              <Button
                color={
                  (templateSource.secondaryButton?.color as any) || "primary"
                }
                variant={
                  (templateSource.secondaryButton?.variant as any) || "ghost"
                }
                className={"font-semibold"}
                onPress={handleDismiss}
              >
                {templateSource.secondaryButton?.label || "Nem érdekel"}
              </Button>
            </div>
          </BlurFade>
        </div>

        {/* RIGHT PART — HERO & GALLERY */}
        <div className={"relative space-y-4 md:space-y-5"}>
          <BlurFade inView delay={0.1}>
            <div className={"rounded-2xl overflow-hidden shadow-lg"}>
              <img
                src={heroSrc}
                alt={heroAlt}
                className={
                  "w-full h-64 md:h-72 object-cover transition-transform duration-[1300ms] hover:scale-[1.05]"
                }
              />
            </div>
          </BlurFade>

          <CustomDivider className="my-6 w-full" />

          {(templateSource.gallery || []).length > 0 && (
            <BlurFade inView delay={0.15}>
              <div className="grid grid-cols-2 gap-3">
                {templateSource.gallery.map((g, i) => (
                  <div
                    key={i}
                    className={"rounded-xl overflow-hidden shadow-md"}
                  >
                    <img
                      src={g.url || (g as any)}
                      className={
                        "w-full h-28 md:h-32 object-cover transition-transform duration-500 hover:scale-105"
                      }
                      alt={g.alt || ""}
                    />
                  </div>
                ))}
              </div>
            </BlurFade>
          )}
        </div>
      </div>
    </section>
  );
}
