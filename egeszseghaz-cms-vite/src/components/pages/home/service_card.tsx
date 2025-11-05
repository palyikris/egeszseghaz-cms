/* eslint-disable prettier/prettier */
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import { Service } from "@/types/services";
import { BlurFade } from "@/components/ui/blur-fade";

export default function ServiceCard({
  service,
  i,
}: {
  service: Service;
  i: number;
}) {
  return (
    <BlurFade inView delay={0.1 * i} key={i}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <Card
          key={service.id || i}
          className="relative group max-w-sm bg-surface border border-border rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-accent/60"
        >
          {/* Header / Image */}
          <div className="relative h-48 overflow-hidden">
            <motion.img
              src={service.img || "/images/default-service.jpg"}
              alt={service.id}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-90"
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                img.onerror = null;
                img.src = "/main_image.png";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Accent glow line */}
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-accent via-secondary to-accent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

            {/* Hover title overlay */}
            <div className="absolute inset-0 flex items-center justify-center text-background-light text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-primary-dark/30 backdrop-blur-[2px]">
              Fedezd fel
            </div>
          </div>

          {/* Body */}
          <CardBody className="px-5 py-4">
            <h3 className="text-2xl font-semibold text-primary-dark mb-2 group-hover:text-primary transition-colors">
              {service.id.charAt(0).toUpperCase() +
                service.id.slice(1, 20).toLowerCase() +
                (service.id.length > 20 ? "..." : "")}
            </h3>

            {service.desc && service.desc.length > 10 ? (
              <p className="text-text-secondary text-sm leading-relaxed">
                {service.desc.length > 120
                  ? service.desc.slice(0, 120) + "..."
                  : service.desc}
              </p>
            ) : (
              <p className="text-text-secondary italic text-sm opacity-70">
                A {service.id} szolgáltatás részletei hamarosan elérhetőek
                lesznek.
              </p>
            )}
          </CardBody>

          {/* Footer */}
          <CardFooter className="px-5 pb-5 flex justify-between items-center">
            <Button
              variant="ghost"
              color="primary"
              className="relative font-medium overflow-hidden transition-all duration-300 group"
            >
              <span className="relative z-10">Megnézem</span>
              <motion.div
                className="absolute inset-0 bg-primary-light/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                layoutId="buttonHighlight"
              />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </BlurFade>
  );
}
