/* eslint-disable prettier/prettier */
import React from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@heroui/button";
import { ServiceSchema } from "@/templates/new_service/new_service_schema";
import CustomDivider from "../divider";

interface Props {
  data: ServiceSchema;
}

export function NewServiceSection({ data }: Props) {
  if (!data.isDisplayed) return null;

  return (
    <section
      className="py-14 px-6 sm:px-12 md:px-20 bg-background-light"
      id="service"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start">
        {/* LEFT PART */}
        <div className="space-y-5">
          {/* Title */}
          <BlurFade inView delay={0.1}>
            <h1
              className="
                text-3xl md:text-4xl font-semibold leading-tight
                bg-gradient-to-r from-primary-dark to-secondary-dark 
                bg-clip-text text-transparent
              "
            >
              {data.title}
            </h1>
          </BlurFade>

          {/* Subtitle */}
          {data.subtitle && (
            <BlurFade inView delay={0.15}>
              <p className="text-lg text-text-secondary relative inline-block">
                {data.subtitle}
                <span className="absolute left-0 -bottom-1 w-10 h-[3px] rounded-full bg-accent"></span>
              </p>
            </BlurFade>
          )}

          {/* Short Description */}
          <BlurFade inView delay={0.2}>
            <p className="text-base text-text-secondary leading-relaxed whitespace-pre-line pl-3 border-l-2 border-primary-light my-8">
              {data.description}
            </p>
          </BlurFade>

          {/* Long Description */}
          <BlurFade inView delay={0.25}>
            <p
              className="
                text-text-secondary whitespace-pre-line leading-relaxed 
                bg-surface p-4 rounded-xl border border-accent/50 shadow-sm
              "
            >
              {data.longDescription}
            </p>
          </BlurFade>

            {/* Prices & Contact */}
            <BlurFade inView delay={0.3}>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              {/* Prices */}
              {data.priceList.length > 0 && (
              <div className="p-5 rounded-xl bg-primary-light/10 shadow-md border border-primary space-y-3 md:col-span-3">
              <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary-dark"></span>
                Árak
              </h3>

              <ul className="space-y-2">
                {data.priceList.map((item, i) => (
                <li
                  key={i}
                  className="flex justify-between text-text-primary text-sm md:text-base"
                >
                  <span>{item.label}</span>
                  <span className="font-medium">{item.price}</span>
                </li>
                ))}
              </ul>
              </div>
              )}

              {/* Contact */}
              <div
              className={`p-5 rounded-xl bg-secondary-light/10 shadow-md border border-secondary space-y-1.5 w-full ${
                data.priceList.length > 0 ? "md:col-span-2" : "md:col-span-5"
              }`}
              >
              <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                Kapcsolat
              </h3>

              {data.contactInfo.phone && (
                <p className="text-text-secondary text-sm">{data.contactInfo.phone}</p>
              )}
              {data.contactInfo.email && (
                <p className="text-text-secondary text-sm">{data.contactInfo.email}</p>
              )}
              </div>
            </div>
            </BlurFade>

          {/* Buttons */}
          <BlurFade inView delay={0.4}>
            <div className="flex gap-3 pt-2">
              <Button
                color="secondary"
                variant="solid"
                className="font-semibold"
              >
                Időpontfoglalás
              </Button>
              <Button color="primary" variant="ghost" className="font-semibold">
                Több információ
              </Button>
            </div>
          </BlurFade>
        </div>

        {/* RIGHT PART — HERO & GALLERY */}
        <div className="relative space-y-4 md:space-y-5">
          <BlurFade inView delay={0.1}>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src={data.heroImage}
                alt={data.title}
                className="w-full h-64 md:h-72 object-cover transition-transform duration-[1300ms] hover:scale-[1.05]"
              />
            </div>
          </BlurFade>

          <CustomDivider className="my-6 w-full" />

          {data.gallery.length > 0 && (
            <BlurFade inView delay={0.15}>
              <div className="grid grid-cols-2 gap-3">
                {data.gallery.map((img, i) => (
                  <div key={i} className="rounded-xl overflow-hidden shadow-md">
                    <img
                      src={img}
                      className="w-full h-28 md:h-32 object-cover transition-transform duration-500 hover:scale-105"
                      alt=""
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
