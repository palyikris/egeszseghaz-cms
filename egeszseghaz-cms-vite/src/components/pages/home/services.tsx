/* eslint-disable prettier/prettier */
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { ScrollShadow } from "@heroui/scroll-shadow";


import { Service } from "@/types/services";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { BlurFade } from "@/components/ui/blur-fade";

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
            <BlurFade inView delay={0.2} key={i}>
              <Card
                key={service.id || i}
                className="bg-surface shadow-sm border border-primary-dark group transform max-w-sm overflow-hidden"
              >
                <CardHeader className="p-0 relative h-40 overflow-hidden">
                  <img
                    src={service.img || "/images/default-service.jpg"}
                    alt={service.id}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-90"
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement;

                      img.onerror = null;
                      img.src = "/main_image.png";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </CardHeader>
                <CardBody className="px-4 py-3">
                  <h3 className="text-xl font-semibold text-primary-dark mb-2">
                    {service.id.toUpperCase().slice(0, 1) +
                      service.id.slice(1, 20).toLowerCase() +
                      (service.id.length > 20 ? "..." : "")}
                  </h3>
                  {service.desc && service.desc.split(" ").length > 1 ? (
                    <p className="text-text-secondary text-sm">
                      {service.desc.split("").slice(0, 100).join("")}
                      {service.desc.length > 100 ? "..." : ""}
                    </p>
                  ) : (
                    <p className="text-text-secondary text-sm italic">
                      A {service.id} szolgáltatás részletei hamarosan elérhetőek
                      lesznek.
                    </p>
                  )}
                </CardBody>
                <CardFooter className="px-4 pb-4">
                  <Button
                    variant="ghost"
                    color="primary"
                    className="text-text-primary"
                  >
                    Megnézem
                  </Button>
                </CardFooter>
              </Card>
            </BlurFade>
          ))}
        </div>
      </ScrollShadow>
    </section>
  );
}