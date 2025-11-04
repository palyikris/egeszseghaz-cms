/* eslint-disable prettier/prettier */
import { BlurFade } from "@/components/ui/blur-fade";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import { useNavigate } from "react-router-dom";

import { SocialIcon } from "react-social-icons";


export default function HeroSection() {

  const navigate = useNavigate();

  return (
    <section
      className="relative h-screen flex items-center justify-between px-16 bg-gradient-to-r from-primary-light via-primary-light/90 to-secondary-light"
      style={{
        borderRadius: "0 0 10% 10%",
      }}
      id="hero"
    >
      <div className="z-10">
        <TypingAnimation
          className="2xl:text-6xl text-4xl font-bold text-primary-dark mb-16 leading-tight"
          duration={80}
        >
          Egészségben, harmóniában.
        </TypingAnimation>
        <BlurFade
          direction="right"
          delay={0.1}
          className="text-lg text-text-secondary mb-8 mt-10 max-w-xl"
        >
          A Pesterzsébeti Egészségház a testi és lelki egészség otthona —
          szolgáltatásaink között minden korosztály megtalálja a számára
          megfelelőt.
        </BlurFade>
        <div className="w-2/3 overflow-hidden">
          <Divider />
        </div>
        <div className="flex gap-4 mt-8">
          <BlurFade direction="up" delay={0.2}>
            <Button
              color="primary"
              onPress={() => {
                navigate("#services");
              }}
            >
              Szolgáltatásaink
            </Button>
          </BlurFade>
          <BlurFade direction="up" delay={0.3}>
            <Button
              className="font-bold"
              color="secondary"
              variant="ghost"
              onPress={() => {
                navigate("#about");
              }}
            >
              Rólunk
            </Button>
          </BlurFade>
        </div>
      </div>
      <BlurFade
        className="relative w-[40%] h-[70%]"
        delay={0.2}
        direction="left"
      >
        <img
          alt="Egészségház"
          className="rounded-3xl shadow-lg object-cover h-full w-full"
          src="/main_image.png"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#00000055] to-transparent rounded-3xl" />
      </BlurFade>
      <BlurFade
        direction="up"
        delay={0.2}
        inView
        className="absolute w-full left-0 bottom-0 flex justify-center z-40 transform translate-y-1/2"
      >
        <div className="w-2/3 2xl:w-1/2 bg-background-light rounded-lg p-1">
          <div className="flex items-center justify-between gap-4 bg-primary w-full rounded-lg">
            <div className="w-full flex items-center justify-center gap-4 p-4 text-background-light">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M10.5 18.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" />
                <path
                  fillRule="evenodd"
                  d="M8.625.75A3.375 3.375 0 0 0 5.25 4.125v15.75a3.375 3.375 0 0 0 3.375 3.375h6.75a3.375 3.375 0 0 0 3.375-3.375V4.125A3.375 3.375 0 0 0 15.375.75h-6.75ZM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 0 1 7.5 19.875V4.125Z"
                  clipRule="evenodd"
                />
              </svg>

              <span id="contact">06 30 573 2212</span>
            </div>
            <div className="w-full flex items-center justify-center gap-4 p-4 text-background-light">
              <SocialIcon
                url="https://facebook.com"
                color="#fff"
                bgColor="transparent"
              />

              <Link
                href="https://www.facebook.com/egeszseghazfitness/?_rdr"
                target="_blank"
                className="text-background underline"
              >
                Facebook oldalunk
              </Link>
            </div>
            <div className="w-full flex items-center justify-center gap-4 p-4 text-background-light">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>

              <span>Kerekesné Tollár Anikó</span>
            </div>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
