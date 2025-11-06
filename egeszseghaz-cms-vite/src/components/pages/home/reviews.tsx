/* eslint-disable prettier/prettier */
import CustomDivider from "@/components/divider";
import { Marquee } from "@/components/ui/marquee";
import { SpinningText } from "@/components/ui/spinning-text";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { Review } from "@/types/reviews";
import { Card } from "@heroui/card";

import { HomeTemplate } from "@/templates/home/home_template";
import { resolveColor, cn } from "@/lib/utils";

const reviews: Review[] = [
  {
    name: "Kovács János",
    text: "Nagyon elégedett vagyok a szolgáltatással, profi csapat és barátságos légkör!",
    stars: 5,
  },
  {
    name: "Szabó Éva",
    text: "A kezelések hatékonyak voltak, és a személyzet nagyon figyelmes. Csak ajánlani tudom!",
    stars: 4,
  },
  {
    name: "Nagy Péter",
    text: "Kiváló ellátásban részesültem, a doktorok és ápolók is nagyon kedvesek voltak.",
    stars: 5,
  },
];

export default function ReviewsSection() {
  const cfg = HomeTemplate.page.reviews;
  const headingResolved = resolveColor(cfg.heading?.color, "text");

  return (
    <section
      className="py-24 px-6 sm:px-16 pt-4 lg:pt-24 text-center relative"
      id="reviews"
    >
      <h1
        className={cn(
          "text-4xl font-semibold mb-20 py-20 pt-4 lg:pt-20",
          headingResolved.className
        )}
        style={headingResolved.style}
      >
        <TypingAnimation>
          {cfg.heading?.text || "Mit mondtok rólunk?"}
        </TypingAnimation>
      </h1>
      <SpinningText
        radius={cfg.spinningText?.radius || 15}
        duration={cfg.spinningText?.duration || 40}
        className="right-1/6 top-1/4 absolute hidden lg:block"
      >
        {cfg.spinningText?.text ||
          "Pácienseink mondták - Nem mi találjuk ki - Gyere próbáld ki te is - "}
      </SpinningText>

      <Marquee
        className="flex justify-center gap-8 [--duration:20s] w-full"
        pauseOnHover
      >
        {reviews.map((t, i) => {
          return (
            <Card
              key={i}
              className="max-w-64 sm:max-w-sm bg-surface shadow-md border border-border p-6 px-2 md:px-6"
            >
              {t.stars >= 0 && (
                <div className="flex justify-center mb-4">
                  {Array.from({ length: t.stars }).map((_, idx) => (
                    <svg
                      key={idx}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#E6B655"
                      className="size-8"
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
              <CustomDivider className="my-4" iconSize={4} direction="up" />
              <p className="italic mb-4 text-text-secondary">“{t.text}”</p>
              <p className="font-semibold text-primary-dark">— {t.name}</p>
            </Card>
          );
        })}
      </Marquee>
    </section>
  );
}