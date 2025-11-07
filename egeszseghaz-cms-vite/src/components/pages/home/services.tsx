/* eslint-disable prettier/prettier */
import { ScrollShadow } from "@heroui/scroll-shadow";

import { Service } from "@/types/services";
import { TypingAnimation } from "@/components/ui/typing-animation";
import ServiceCard from "./service_card";
import { HomeTemplate } from "@/templates/home/home_template";
import { resolveColor, cn } from "@/lib/utils";

interface ServicesSectionProps {
  services: Service[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  const servicesTemplate = HomeTemplate.page.services;
  const headingResolved = resolveColor(servicesTemplate.heading?.color, "text");
  const bgColor = servicesTemplate.bgColor;

  return (
    <section
      className={`py-24 px-10 bg-gradient-${bgColor.direction} from-${bgColor.from} via-${bgColor.via} to-${bgColor.to} my-12 rounded-none relative md:rounded-[5%] lg:rounded-[10%]"
      id="services`}
    >
      <h1
        className={cn(
          "text-4xl sm:text-5xl font-semibold text-center mb-12",
          headingResolved.className
        )}
        style={headingResolved.style}
      >
        <TypingAnimation>
          {servicesTemplate.heading?.text || "Szolgáltatásaink"}
        </TypingAnimation>
      </h1>
      <ScrollShadow className="w-full px-6 h-[800px] py-16">
        <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} i={i} />
          ))}
        </div>
      </ScrollShadow>
    </section>
  );
}
