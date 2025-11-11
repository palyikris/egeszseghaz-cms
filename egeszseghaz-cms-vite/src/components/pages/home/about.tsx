/* eslint-disable prettier/prettier */
import { BlurFade } from "@/components/ui/blur-fade";
import { WordRotate } from "@/components/ui/word-rotate";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Spacer } from "@heroui/spacer";
import { useNavigate } from "react-router-dom";

import { resolveColor, cn } from "@/lib/utils";
import { AboutSchema } from "@/templates/home/home_schema";
import { useEditMode } from "@/context/edit/edit";

interface AboutSectionProps {
  about: AboutSchema | undefined;
}

export default function AboutSection({ about }: AboutSectionProps) {
  const navigate = useNavigate();

  const { isEditMode, draft } = useEditMode();

  if (!about && !isEditMode) return null;

  const imageUrl = isEditMode
    ? draft.about?.aboutImg?.url
    : about?.aboutImg?.url || "/logo.png";
  const headingSource = isEditMode ? draft.about?.heading : about?.heading;
  const descriptionSource = isEditMode
    ? draft.about?.description
    : about?.description;
  const aboutImgSource = isEditMode ? draft.about?.aboutImg : about?.aboutImg;
  const featuresSource = isEditMode ? draft.about?.features : about?.features;
  const primaryButtonSource = isEditMode
    ? draft.about?.primaryButton
    : about?.primaryButton;
  const secondaryButtonSource = isEditMode
    ? draft.about?.secondaryButton
    : about?.secondaryButton;

  const headingResolved = resolveColor(headingSource?.color, "text");
  const descriptionResolved = resolveColor(descriptionSource?.color, "text");

  const isRawColor = (v?: string | null) => !!v && /^#|^rgb|^hsl/i.test(v);

  return (
    <section className="py-16 px-6 sm:px-8 md:px-16 bg-surface" id="about">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 bg-primary-light/20 text-primary-dark rounded-full p-3 mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM8.547 4.505a8.25 8.25 0 1 0 11.672 8.214l-.46-.46a2.252 2.252 0 0 1-.422-.586l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.211.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.654-.261a2.25 2.25 0 0 1-1.384-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.279-2.132Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div>
              <div
                className={cn(
                  "text-3xl sm:text-4xl font-semibold mb-2",
                  headingResolved.className
                )}
                style={headingResolved.style}
              >
                <WordRotate
                  words={[
                    headingSource?.textFirst || "A Mi Küldetésünk...",
                    headingSource?.textSecond || "A Te Egészséged!",
                  ]}
                  duration={4000}
                />
              </div>
              <BlurFade
                className={cn(
                  "text-base sm:text-lg text-text-secondary leading-relaxed max-w-lg mt-4",
                  descriptionResolved.className
                )}
                style={descriptionResolved.style}
                inView
              >
                {descriptionSource?.text}
              </BlurFade>
            </div>
          </div>
          <Spacer></Spacer>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {featuresSource?.map((f: any, idx: number) => (
              <BlurFade
                className="flex items-center gap-3"
                inView
                delay={0.1 * (idx + 1)}
                key={idx}
              >
                <div
                  className={cn(
                    "rounded-md p-2",
                    resolveColor(f.iconColor, "text").className,
                    resolveColor(f.iconBgColor, "bg").className
                  )}
                  style={{
                    ...(resolveColor(f.iconColor, "text").style || {}),
                    ...(resolveColor(f.iconBgColor, "bg").style || {}),
                  }}
                >
                  {/* placeholder icon (kept original svg for consistent look) */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-4"
                  >
                    <path d="M10.5 1.875a1.125 1.125 0 0 1 2.25 0v8.219c.517.162 1.02.382 1.5.659V3.375a1.125 1.125 0 0 1 2.25 0v10.937a4.505 4.505 0 0 0-3.25 2.373 8.963 8.963 0 0 1 4-.935A.75.75 0 0 0 18 15v-2.266a3.368 3.368 0 0 1 .988-2.37 1.125 1.125 0 0 1 1.591 1.59 1.118 1.118 0 0 0-.329.79v3.006h-.005a6 6 0 0 1-1.752 4.007l-1.736 1.736a6 6 0 0 1-4.242 1.757H10.5a7.5 7.5 0 0 1-7.5-7.5V6.375a1.125 1.125 0 0 1 2.25 0v5.519c.46-.452.965-.832 1.5-1.141V3.375a1.125 1.125 0 0 1 2.25 0v6.526c.495-.1.997-.151 1.5-.151V1.875Z" />
                  </svg>
                </div>
                <p className="text-sm text-text-secondary">{f.text}</p>
              </BlurFade>
            ))}
          </div>
          <Divider />
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {(() => {
              const primaryColor = primaryButtonSource?.color;
              const secondaryColor = secondaryButtonSource?.color;
              const primaryIsRaw = isRawColor(primaryColor);
              const secondaryIsRaw = isRawColor(secondaryColor);

              return (
                <>
                  <Button
                    {...(primaryIsRaw
                      ? { style: { backgroundColor: primaryColor } }
                      : {})}
                    color={
                      primaryIsRaw
                        ? undefined
                        : (primaryColor as any) || "secondary"
                    }
                    className={`font-bold ${!primaryButtonSource?.isDisplayed && "hidden"}`}
                    onPress={() => {
                      navigate(primaryButtonSource?.href || "#services");
                    }}
                    variant={(primaryButtonSource?.variant as any) || "solid"}
                  >
                    {primaryButtonSource?.label || "Tovább"}
                  </Button>
                  <Button
                    {...(secondaryIsRaw
                      ? { style: { backgroundColor: secondaryColor } }
                      : {})}
                    color={
                      secondaryIsRaw
                        ? undefined
                        : (secondaryColor as any) || "primary"
                    }
                    variant={(secondaryButtonSource?.variant as any) || "ghost"}
                    className={`font-bold ${!secondaryButtonSource?.isDisplayed && "hidden"}`}
                    onPress={() => {
                      navigate(secondaryButtonSource?.href || "#reviews");
                    }}
                  >
                    {secondaryButtonSource?.label || "Értékelések"}
                  </Button>
                </>
              );
            })()}
          </div>
        </div>
        <BlurFade
          inView
          delay={0.2}
          className="flex justify-center relative"
          direction="left"
        >
          <div className="w-full flex justify-center">
            <img
              alt="Küldetésünk"
              className={`w-full h-auto rounded-${aboutImgSource?.rounded}`}
              src={imageUrl || "/logo.png"}
            />
          </div>
          <div
            className={`w-full h-full absolute transform -z-1`}
            style={{
              ...(resolveColor(aboutImgSource?.shadow.color, "bg").style || {}),
            }}
          />
          <div className="w-full h-full absolute overflow-hidden top-0 left-0 rounded-2xl">
            <span
              className={`rounded-[100%] z-50 absolute transform -translate-x-2/3 -translate-y-2/3`}
              style={{
                width:
                  aboutImgSource?.accents?.[0]?.size &&
                  `calc(${aboutImgSource.accents[0].size} * 1)`,
                height:
                  aboutImgSource?.accents?.[0]?.size &&
                  `calc(${aboutImgSource.accents[0].size} * 1)`,
                top: aboutImgSource?.accents?.[0]?.position?.top,
                left: aboutImgSource?.accents?.[0]?.position?.left,
                right: aboutImgSource?.accents?.[0]?.position?.right,
                bottom: aboutImgSource?.accents?.[0]?.position?.bottom,
                background: resolveColor(
                  aboutImgSource?.accents?.[0]?.color,
                  "bg"
                ).style?.backgroundColor,
                filter: aboutImgSource?.accents?.[0]?.blur
                  ? `blur(${aboutImgSource.accents[0].blur})`
                  : undefined,
              }}
            />
            <span
              className={`rounded-[100%] z-50 absolute transform translate-x-2/3 translate-y-2/3`}
              style={{
                width:
                  aboutImgSource?.accents?.[1]?.size &&
                  `calc(${aboutImgSource.accents[1].size} * 1)`,
                height:
                  aboutImgSource?.accents?.[1]?.size &&
                  `calc(${aboutImgSource.accents[1].size} * 1)`,
                top: aboutImgSource?.accents?.[1]?.position?.top,
                left: aboutImgSource?.accents?.[1]?.position?.left,
                right: aboutImgSource?.accents?.[1]?.position?.right,
                bottom: aboutImgSource?.accents?.[1]?.position?.bottom,
                background: resolveColor(
                  aboutImgSource?.accents?.[1]?.color,
                  "bg"
                ).style?.backgroundColor,
                filter: aboutImgSource?.accents?.[1]?.blur
                  ? `blur(${aboutImgSource.accents[1].blur})`
                  : undefined,
              }}
            />
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
