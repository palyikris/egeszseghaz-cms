/* eslint-disable prettier/prettier */
import { ScrollShadow } from "@heroui/scroll-shadow";

import ServiceCard from "./service_card";

import { Service } from "@/types/services";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { resolveColor, cn } from "@/lib/utils";
import { ServicesSchema } from "@/templates/home/home_schema";

interface ServicesSectionProps {
  services: Service[];
  servicesTemplate: ServicesSchema | undefined;
}

export default function ServicesSection({
  services,
  servicesTemplate,
}: ServicesSectionProps) {
  if (!servicesTemplate) return null;

  const headingResolved = resolveColor(servicesTemplate.heading?.color, "text");

  return (
    <section
      className={`py-24 px-10 bg-gradient-to-tl from-primary-light via-primary-light/90 to-secondary-light my-12 rounded-none relative md:rounded-[5%] lg:rounded-[10%]`}
      id="services"
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
            <ServiceCard
              key={i}
              service={service}
              i={i}
              cardTemplate={servicesTemplate.card}
            />
          ))}
        </div>
      </ScrollShadow>
    </section>
  );
}
