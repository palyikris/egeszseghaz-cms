/* eslint-disable prettier/prettier */
import { useState } from "react";
import { Button } from "@heroui/button";
import { BlurFade } from "@/components/ui/blur-fade";
import { Service } from "@/types/services";

export default function ServiceCarousel({ service }: { service: Service }) {
  const images = service.content?.images || [];
  const [index, setIndex] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);

  if (!images.length) return null;

  const prevIndex = (index - 1 + images.length) % images.length;
  const nextIndex = (index + 1) % images.length;

  const items = (() => {
    if (images.length === 1) return [{ i: index, pos: "center" as const }];

    if (images.length === 2) {
      const other = index === 0 ? 1 : 0;
      return [
        { i: index, pos: "center" as const },
        { i: other, pos: "side" as const },
      ];
    }

    return [
      { i: prevIndex, pos: "left" as const },
      { i: index, pos: "center" as const },
      { i: nextIndex, pos: "right" as const },
    ];
  })();

  return (
    <>
      {/* ---------------------- */}
      {/*  MAIN CAROUSEL SECTION */}
      {/* ---------------------- */}
      <section
        className="
          relative py-20 px-4 sm:px-8 md:px-12 lg:px-16 my-20 md:my-28
          rounded-none md:rounded-[6%]
          bg-gradient-to-tl from-primary-light via-primary-light/70 to-secondary-light
          overflow-hidden
        "
      >
        {/* Ambient accent orbs */}
        <div className="absolute -top-40 -left-40 w-72 h-72 sm:w-96 sm:h-96 bg-secondary/20 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 -right-40 w-72 h-72 sm:w-96 sm:h-96 bg-accent/20 rounded-full blur-[100px]" />

        <div className="relative max-w-6xl mx-auto flex flex-col items-center gap-6 md:gap-14 z-10">
          {/* Navigation */}
          <div className="flex items-center justify-between w-full max-w-xs sm:max-w-sm md:max-w-xl">
            <Button
              isIconOnly
              radius="full"
              className="
                w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
                bg-white/60 backdrop-blur-xl border border-primary-dark
                shadow-xl hover:bg-white/80 hover:shadow-2xl transition-all
                text-primary-dark
              "
              onPress={() => setIndex(prevIndex)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="size-5 sm:size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.28 7.72a.75.75 0 0 1 0 1.06l-2.47 2.47H21a.75.75 0 0 1 0 1.5H4.81l2.47 2.47a.75.75 0 1 1-1.06 1.06l-3.75-3.75a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 0 1 1.06 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>

            <Button
              isIconOnly
              radius="full"
              className="
                w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
                bg-white/60 backdrop-blur-xl border border-primary-dark
                shadow-xl hover:bg-white/80 hover:shadow-2xl transition-all
                text-primary-dark
              "
              onPress={() => setIndex(nextIndex)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="size-5 sm:size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </div>

          {/* Images */}
          <div className="relative flex items-center justify-center gap-4 sm:gap-8 md:gap-10 py-4 sm:py-6 w-full">
            {items.map(({ i, pos }) => {
              const center = pos === "center";
              const side = !center;

              const hiddenOnMobile = side ? "hidden sm:block" : "block";

              return (
                <BlurFade key={`${pos}-${i}`} delay={0.05} direction="up">
                  <button
                    className={`
                      ${hiddenOnMobile}
                      transition-all duration-[900ms]
                      ease-[cubic-bezier(.22,1,.36,1)]
                      ${
                        center
                          ? "scale-[1.05] sm:scale-[1.1] md:scale-[1.15] z-20 cursor-zoom-in"
                          : "scale-[0.7] sm:scale-[0.8] md:scale-[0.75] opacity-40 blur-[1px]"
                      }
                      ${pos === "left" ? "-rotate-[3deg] sm:-rotate-[4deg]" : ""}
                      ${pos === "right" ? "rotate-[3deg] sm:rotate-[4deg]" : ""}
                    `}
                    onClick={() => center && setPreview(images[i].url)}
                  >
                    <div
                      className="
                        relative rounded-3xl sm:rounded-[2.5rem]
                        overflow-hidden shadow-xl bg-white/40 backdrop-blur-xl
                        border border-white/40
                      "
                      style={{
                        width: center ? 260 : 160,
                        height: center ? 340 : 220,
                      }}
                    >
                      <div
                        className="
                          absolute inset-0 z-10 pointer-events-none
                          bg-gradient-to-t from-black/20 via-transparent to-transparent
                        "
                      />

                      <img
                        src={images[i].url}
                        alt=""
                        className="w-full h-full object-cover duration-700"
                      />

                      {center && (
                        <div
                          className="
                            absolute bottom-0 left-0 w-full h-[4px]
                            bg-gradient-to-r from-accent via-secondary to-accent
                            blur-[2px] opacity-90
                          "
                        />
                      )}
                    </div>
                  </button>
                </BlurFade>
              );
            })}
          </div>

          {/* Indicators */}
          <div className="flex gap-2 mt-2">
            {images.map((_, i) => (
              <span
                key={i}
                className={`
                  rounded-full transition-all
                  bg-secondary-dark 
                  ${i === index ? "w-8 h-2 opacity-80" : "w-2 h-2 opacity-40"}
                `}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------- */}
      {/*  FULLSCREEN PREVIEW    */}
      {/* ---------------------- */}
      {preview && (
        <button
          className="
            fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm
            flex items-center justify-center
            animate-[fadeIn_0.25s_ease-out]
          "
          onClick={() => setPreview(null)}
        >
          {/* Close button */}
          <button
            className="
              absolute top-6 right-6 
              text-white text-3xl font-light
              hover:opacity-70 transition
            "
            onClick={() => setPreview(null)}
          >
            ×
          </button>

          {/* Image itself */}
          <img
            src={preview}
            className="
              max-w-[90vw] max-h-[90vh] object-contain 
              rounded-2xl shadow-2xl
              animate-[zoomIn_0.25s_ease-out]
            "
            alt="preview"
          />
        </button>
      )}
    </>
  );
}
