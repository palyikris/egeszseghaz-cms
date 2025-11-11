/* eslint-disable prettier/prettier */
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import { useNavigate } from "react-router-dom";
import { SocialIcon } from "react-social-icons";

import { BlurFade } from "@/components/ui/blur-fade";
import { resolveColor, cn } from "@/lib/utils";
import { HeroSchema } from "@/templates/home/home_schema";
import { useEditMode } from "@/context/edit/edit";

interface HeroSectionProps {
  hero: HeroSchema | undefined;
}

export default function HeroSection({ hero }: HeroSectionProps) {
  const navigate = useNavigate();
  const { isEditMode, draft } = useEditMode();

  if (!hero) return null;

  const imageUrl = isEditMode
    ? draft.hero?.mainImageUrl
    : hero.mainImageUrl || "/main_image.png";

  const headingSource = isEditMode ? draft.hero?.heading : hero.heading;
  const subheadingSource = isEditMode
    ? draft.hero?.subheading
    : hero.subheading;
  const headingResolved = resolveColor(headingSource?.color, "text");
  const subheadingResolved = resolveColor(subheadingSource?.color, "text");

  const primaryButton = isEditMode
    ? draft.hero?.primaryButton
    : hero.primaryButton;
  const secondaryButton = isEditMode
    ? draft.hero?.secondaryButton
    : hero.secondaryButton;

  const makeButtonProps = (hidden: boolean = true, color?: string | null) => {
    if (!hidden) return { style: { display: "none" } } as any;

    if (!color) return {} as any;
    const isRaw = /^#|^rgb|^hsl/i.test(color);

    if (isRaw) return { style: { backgroundColor: color } };

    return { color } as any;
  };

  return (
    <section
      className={`relative min-h-screen flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 py-12 bg-gradient-to-br from-primary-light via-primary-light/90 to-secondary-light rounded-none sm:rounded-bl-[10%] sm:rounded-br-[10%] mb-25`}
      id="hero"
    >
      {/* Content */}
      <div className="z-10 w-full md:w-1/2 max-w-2xl lg:max-w-full">
        <BlurFade
          key={headingSource?.text ?? ""}
          className={cn(
            "2xl:text-6xl lg:text-5xl md:text-4xl text-3xl font-bold mb-8 md:mb-16 leading-tight",
            headingResolved.className
          )}
          style={headingResolved.style}
          delay={0.1}
        >
          {headingSource?.text}
        </BlurFade>
        <BlurFade
          key={subheadingSource?.text ?? ""}
          className={cn(
            "text-base md:text-lg mb-6 mt-6 md:mt-10 md:max-w-2xl",
            subheadingResolved.className
          )}
          style={subheadingResolved.style}
          delay={0.1}
          direction="right"
        >
          <span>{subheadingSource?.text}</span>
        </BlurFade>
        <div className="w-full md:w-2/3 overflow-hidden">
          <Divider />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <BlurFade delay={0.2} direction="up">
            <Button
              {...makeButtonProps(
                primaryButton?.isDisplayed,
                primaryButton?.color
              )}
              variant={primaryButton?.variant || "solid"}
              onPress={() => {
                navigate(primaryButton?.href || "#services");
              }}
            >
              {primaryButton?.label || "Szolgáltatásaink"}
            </Button>
          </BlurFade>
          <BlurFade delay={0.3} direction="up">
            <Button
              className="font-bold"
              variant={secondaryButton?.variant || "ghost"}
              {...makeButtonProps(
                secondaryButton?.isDisplayed,
                secondaryButton?.color
              )}
              onPress={() => {
                navigate(secondaryButton?.href || "#about");
              }}
            >
              {secondaryButton?.label || "Rólunk"}
            </Button>
          </BlurFade>
        </div>
      </div>

      {/* Image */}
      <BlurFade
        className="relative w-full md:w-[40%] h-56 md:h-[70%] mb-8 md:mb-0 mt-10 md:mt-0 lg:mt-0 xl:mt-0 2xl:mt-0"
        delay={0.2}
        direction="left"
      >
        <img
          alt={hero.heading?.text || "Egészségház"}
          className="rounded-3xl shadow-lg object-cover h-full w-full"
          src={imageUrl || "/main_image.png"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#00000055] to-transparent rounded-3xl" />
      </BlurFade>

      <BlurFade
        inView
        className="w-full left-0 flex justify-center z-40 absolute bottom-0 transform translate-y-2/3"
        delay={0.2}
        direction="up"
      >
        <div className="w-full md:w-2/3 sm:w-5/6 bg-background-light rounded-lg p-1">
          <div className="flex items-center justify-between gap-4 bg-primary w-full rounded-lg">
            <div className="w-full md:w-1/3 flex items-center justify-center gap-4 p-4 text-background-light">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.5 18.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" />
                <path
                  clipRule="evenodd"
                  d="M8.625.75A3.375 3.375 0 0 0 5.25 4.125v15.75a3.375 3.375 0 0 0 3.375 3.375h6.75a3.375 3.375 0 0 0 3.375-3.375V4.125A3.375 3.375 0 0 0 15.375.75h-6.75ZM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 0 1 7.5 19.875V4.125Z"
                  fillRule="evenodd"
                />
              </svg>

              <span id="contact">
                {isEditMode
                  ? draft.hero?.contacts?.phone?.number
                  : hero.contacts?.phone?.number || "06 30 573 2212"}
              </span>
            </div>
            <div className="w-full md:w-1/3 flex items-center justify-center gap-4 p-4 text-background-light">
              <SocialIcon
                bgColor="transparent"
                color="#fff"
                url={hero.contacts?.social?.link || "https://facebook.com"}
              />

              <Link
                className="text-background underline"
                href={
                  isEditMode
                    ? draft.hero?.contacts?.social?.link
                    : hero.contacts?.social?.link ||
                      "https://www.facebook.com/egeszseghazfitness/?_rdr"
                }
                target="_blank"
              >
                {isEditMode
                  ? draft.hero?.contacts?.social?.text
                  : hero.contacts?.social?.text || "Facebook oldalunk"}
              </Link>
            </div>
            <div className="w-full md:w-1/3 items-center justify-center gap-4 p-4 text-background-light hidden sm:flex">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  fillRule="evenodd"
                />
              </svg>

              <span>
                {hero.contacts?.name?.text || "Kerekesné Tollár Anikó"}
              </span>
            </div>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
