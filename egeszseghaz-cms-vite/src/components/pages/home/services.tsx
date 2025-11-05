/* eslint-disable prettier/prettier */
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { ScrollShadow } from "@heroui/scroll-shadow";


import { Service } from "@/types/services";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { BlurFade } from "@/components/ui/blur-fade";
import ServiceCard from "./service_card";

interface ServicesSectionProps {
  services: Service[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section className="py-24 px-16 bg-primary-light my-12" id="services">
      <h1 className="text-5xl font-semibold text-center text-primary-dark mb-12">
        <TypingAnimation>Szolgáltatásaink</TypingAnimation>
      </h1>
      <ScrollShadow className="w-full h-[800px]">
        <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} i={i} />
          ))}
        </div>
      </ScrollShadow>
    </section>
  );
}