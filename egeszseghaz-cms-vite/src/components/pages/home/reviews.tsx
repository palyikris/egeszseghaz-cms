/* eslint-disable prettier/prettier */
import { Marquee } from "@/components/ui/marquee";
import { SpinningText } from "@/components/ui/spinning-text";
import { Review } from "@/types/reviews";
import { Card } from "@heroui/card";

import { resolveColor, cn } from "@/lib/utils";
import { ReviewsSchema } from "@/templates/home/home_schema";
import { useEditMode } from "@/context/edit/edit";
import { BlurFade } from "@/components/ui/blur-fade";

interface ReviewSectionProps {
  reviewsTemplate: ReviewsSchema | undefined;
}

export default function ReviewsSection({
  reviewsTemplate,
}: ReviewSectionProps) {
  const { isEditMode, draft } = useEditMode();

  const templateSource: ReviewsSchema | undefined = isEditMode
    ? (draft.reviews as ReviewsSchema) || reviewsTemplate
    : reviewsTemplate;

  if (!templateSource) return null;

  const headingResolved = resolveColor(templateSource.heading?.color, "text");
  const reviews: Review[] = templateSource.reviews || [];

  return (
    <section
      className="py-24 px-6 sm:px-16 pt-4 lg:pt-24 text-center relative w-full flex flex-col items-center"
      id="reviews"
    >
      <BlurFade inView key={templateSource.heading?.text} delay={0.2}>
        <h1
          className={cn(
            "text-4xl font-semibold mb-20 py-20 pt-4 lg:pt-20",
            headingResolved.className,
          )}
          style={headingResolved.style}
          key={templateSource.heading?.text}
        >
          {templateSource.heading?.text || "Mit mondtok rólunk?"}
        </h1>
      </BlurFade>
      {/* <SpinningText
        radius={templateSource.spinningText?.radius || 15}
        duration={templateSource.spinningText?.duration || 40}
        className={`right-1/6 top-1/4 absolute hidden lg:block text-${templateSource.spinningText?.color}`}
      >
        {templateSource.spinningText?.text ||
          "Pácienseink mondták - Nem mi találjuk ki - Gyere próbáld ki te is - "}
      </SpinningText> */}

      <Marquee
        className="flex justify-center gap-8 [--duration:20s] max-w-[100%]"
        pauseOnHover
      >
        {reviews.map((t, i) => {
          const card = templateSource.card || {};

          const bgResolved = resolveColor(card.bgColor, "bg");
          const textResolved = resolveColor(card.textColor, "text");

          const authorResolved = resolveColor(card.authorColor, "text");

          const starSize = Number(card.size || 8);

          return (
            <Card
              key={i}
              className={`max-w-64 border border-primary/30 sm:max-w-sm p-6 px-2 md:px-6 ${textResolved.className || ""} ${bgResolved.className || "bg-white"} shadow-md`}
              style={{
                ...(bgResolved.style || {}),
              }}
            >
              {t.stars >= 0 && (
                <div className="flex justify-center mb-4">
                  {Array.from({ length: t.stars }).map((_, idx) => (
                    <svg
                      key={idx}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={card.starColor || "currentColor"}
                      className={`size-${starSize}`}
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
              )}
              <div className="w-full flex justify-center">
                <hr className="mb-4 w-2/3" />
              </div>
              <p style={textResolved.style} className="italic mb-4">
                “{t.text}”
              </p>
              <p
                className={`font-semibold ${authorResolved.className || ""}`}
                style={authorResolved.style}
              >
                — {t.name}
              </p>
            </Card>
          );
        })}
      </Marquee>
    </section>
  );
}
