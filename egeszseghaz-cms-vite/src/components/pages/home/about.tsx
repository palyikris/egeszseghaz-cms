/* eslint-disable prettier/prettier */
import { BlurFade } from "@/components/ui/blur-fade";
import { WordRotate } from "@/components/ui/word-rotate";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Spacer } from "@heroui/spacer";
import { useNavigate } from "react-router-dom";


export default function AboutSection() {

  const navigate = useNavigate();

  return (
    <section className="py-24 px-16 bg-surface" id="about">
      <div className="grid grid-cols-2 gap-12 items-center">
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
              <WordRotate
                className="text-4xl font-semibold text-primary-dark mb-2"
                words={["A Mi Küldetésünk...", "A Te Egészséged!"]}
                duration={4000}
              />
              <BlurFade
                className="text-lg text-text-secondary leading-relaxed max-w-lg mt-4"
                inView
              >
                Az Egészségház célja, hogy egy helyen kínáljon prevenciós,
                mozgás- és egészségmegőrző programokat. Modern felszereltség,
                képzett szakemberek és barátságos környezet vár mindenkit.
              </BlurFade>
            </div>
          </div>
          <Spacer></Spacer>

          <div className="grid grid-cols-3 gap-4">
            <BlurFade className="flex items-center gap-3" inView delay={0.1}>
              <div className="text-primary-dark bg-primary-light/20 rounded-md p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4"
                >
                  <path d="M10.5 1.875a1.125 1.125 0 0 1 2.25 0v8.219c.517.162 1.02.382 1.5.659V3.375a1.125 1.125 0 0 1 2.25 0v10.937a4.505 4.505 0 0 0-3.25 2.373 8.963 8.963 0 0 1 4-.935A.75.75 0 0 0 18 15v-2.266a3.368 3.368 0 0 1 .988-2.37 1.125 1.125 0 0 1 1.591 1.59 1.118 1.118 0 0 0-.329.79v3.006h-.005a6 6 0 0 1-1.752 4.007l-1.736 1.736a6 6 0 0 1-4.242 1.757H10.5a7.5 7.5 0 0 1-7.5-7.5V6.375a1.125 1.125 0 0 1 2.25 0v5.519c.46-.452.965-.832 1.5-1.141V3.375a1.125 1.125 0 0 1 2.25 0v6.526c.495-.1.997-.151 1.5-.151V1.875Z" />
                </svg>
              </div>
              <p className="text-sm text-text-secondary">
                Masszázs és terápiák
              </p>
            </BlurFade>

            <BlurFade className="flex items-center gap-3" inView delay={0.2}>
              <div className="text-primary-dark bg-primary-light/20 rounded-md p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-sm text-text-secondary">Képzett szakemberek</p>
            </BlurFade>
            <BlurFade className="flex items-center gap-3" inView delay={0.3}>
              <div className="text-primary-dark bg-primary-light/20 rounded-md p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4"
                >
                  <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg>
              </div>
              <p className="text-sm text-text-secondary">Sport és rekreáció</p>
            </BlurFade>
          </div>
          <Divider />
          <div className="flex items-center gap-4">
            <Button color="secondary" className="font-bold" onPress={() => {
              navigate("#services")
            }}>
              Tovább
            </Button>
            <Button color="primary" variant="ghost" className="font-bold" onPress={() => {
              navigate("#reviews")
            }}>
              Értékelések
            </Button>
          </div>
        </div>
        <BlurFade
          inView
          delay={0.2}
          className="flex justify-center relative"
          direction="left"
        >
          <img
            alt="Küldetésünk"
            className="rounded-2xl"
            src="/logo.png"
          />
          <div className="w-full h-full bg-primary/80 blur-lg absolute transform -z-1" />
        </BlurFade>
      </div>
    </section>
  );
}
