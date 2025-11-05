/* eslint-disable prettier/prettier */
import { ScrollShadow } from "@heroui/scroll-shadow";

import { Service } from "@/types/services";
import { TypingAnimation } from "@/components/ui/typing-animation";
import ServiceCard from "./service_card";

interface ServicesSectionProps {
  services: Service[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section
      className="py-24 px-16 bg-gradient-to-tl from-primary-light via-primary-light/90 to-secondary-light my-12 rounded-[10%] relative"
      id="services"
    >
      <h1 className="text-5xl font-semibold text-center text-primary-dark mb-12">
        <TypingAnimation>Szolgáltatásaink</TypingAnimation>
      </h1>
      <ScrollShadow className="w-full h-[800px] py-16">
        <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} i={i} />
          ))}
        </div>
      </ScrollShadow>
    </section>
  );
}
