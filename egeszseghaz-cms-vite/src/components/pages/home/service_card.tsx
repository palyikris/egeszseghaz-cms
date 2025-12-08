/* eslint-disable prettier/prettier */
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { Service } from "@/types/services";
import { BlurFade } from "@/components/ui/blur-fade";
import { resolveColor, cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export default function ServiceCard({
  service,
  i,
  cardTemplate,
}: {
  service: Service;
  i: number;
  cardTemplate: any;
}) {
  const navigate = useNavigate();

  const headingColor = cardTemplate?.heading?.color;
  const headingResolved = resolveColor(headingColor, "text");
  const headingHoverResolved = resolveColor(
    cardTemplate?.heading?.hoverColor,
    "text"
  );

  const hoverOverlayBgResolved = resolveColor(
    cardTemplate?.hoverOverlay?.bgColor,
    "bg"
  );

  const buttonHoverBgResolved = resolveColor(
    cardTemplate?.button?.hoverBgColor,
    "bg"
  );

  const [isHovered, setIsHovered] = useState(false);

  return (
    <BlurFade inView delay={0.2} key={i}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card
          key={service.id || i}
          className={`relative group max-w-sm bg-${cardTemplate.bgColor} border border-${cardTemplate.borderColor} rounded-${cardTemplate.rounded} shadow-${cardTemplate.shadow} shadow-${cardTemplate.shadowColor} overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-${cardTemplate.hoverBorderColor}/60`}
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
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-accent via-secondary to-accent opacity-0 group-hover:opacity-100 transition-all duration-500 blur-[2px]" />

            {/* Hover title overlay (use inline styles so editor changes appear immediately) */}
            <div
              className={`absolute text-${cardTemplate?.hoverOverlay?.textColor} inset-0 flex items-center justify-center font-semibold transition-opacity duration-500`}
              style={{
                ...(hoverOverlayBgResolved.style || {}),
                fontSize: cardTemplate?.hoverOverlay?.textSize || undefined,
                opacity: isHovered ? 1 : 0,
                backdropFilter: cardTemplate?.hoverOverlay?.backdropBlur
                  ? `blur(${cardTemplate.hoverOverlay.backdropBlur})`
                  : undefined,
              }}
            >
              {cardTemplate.hoverOverlay.text}
            </div>
          </div>

          {/* Body */}
          <CardBody className="px-5 py-4">
            <h3
              className={cn(
                "text-2xl font-semibold mb-2 transition-colors",
                headingResolved.className
              )}
              style={{
                ...(headingResolved.style || {}),
                ...(isHovered ? headingHoverResolved.style : {}),
              }}
            >
              {service.id.charAt(0).toUpperCase() +
                service.id.slice(1, 20).toLowerCase() +
                (service.id.length > 20 ? "..." : "")}
            </h3>

            {service.desc &&
            service.desc.length > 10 &&
            service.desc.split(" ").length > 1 ? (
              <p
                className="text-text-secondary text-sm leading-relaxed"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                title={service.desc}
              >
                {service.desc}
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
              variant={cardTemplate.button.variant as any}
              color={cardTemplate.button.color as any}
              className="relative font-medium overflow-hidden transition-all duration-300"
              onPress={() => {
                navigate(`/service/${service.id}`);
              }}
            >
              <span className={`relative z-10`}>
                {cardTemplate.button.label}
              </span>
              <motion.div
                className={`absolute inset-0 transition-opacity duration-300`}
                layoutId="buttonHighlight"
                style={{
                  ...(buttonHoverBgResolved.style || {}),
                  opacity: isHovered ? 1 : 0,
                }}
              />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </BlurFade>
  );
}
