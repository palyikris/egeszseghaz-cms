/* eslint-disable prettier/prettier */
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@heroui/button";
import { resolveColor, cn } from "@/lib/utils";
import { Service } from "@/types/services";
import { useEditMode } from "@/context/edit/edit";
import { useServiceDetail } from "@/hooks/useServiceDetail";
import { DefaultServiceDetailTemplate } from "@/templates/service_detail/service_detail_template";

export default function ServiceHero({ service }: { service: Service | null | undefined }) {
  const { isEditMode, draft } = useEditMode();
  const { data: serviceDetail } = useServiceDetail();

  if (!service) return null;

  const styles = isEditMode
    ? draft?.serviceDetail?.styles || DefaultServiceDetailTemplate.styles
    : (serviceDetail as any)?.styles || DefaultServiceDetailTemplate.styles;

  const titleResolved = resolveColor(styles?.hero?.titleColor || "primary-dark", "text");
  const subtitleResolved = resolveColor(styles?.hero?.subtitleColor || "text-secondary", "text");

  return (
    <section
      className={cn(
        "relative flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-40 pb-30 rounded-none md:rounded-bl-[10%] md:rounded-br-[10%] mb-12 bg-gradient-to-br from-primary-light via-primary-light/90 to-secondary-light"
      )}
    >
      <div className="w-full md:w-1/2 z-10">
        <BlurFade
          delay={0.1}
          className={cn(
            "text-4xl md:text-5xl font-bold mb-6",
            titleResolved.className
          )}
          style={titleResolved.style}
        >
          {service.id.charAt(0).toUpperCase() + service.id.slice(1)}
        </BlurFade>

        <BlurFade
          delay={0.15}
          direction="right"
          className={cn("max-w-xl", subtitleResolved.className)}
          style={subtitleResolved.style}
        >
          <p>{service.desc || "Szolgáltatás leírása hamarosan…"}</p>
        </BlurFade>

        <div className="mt-8">
          <Button variant="solid" color="primary">
            Kapcsolat
          </Button>
        </div>
      </div>

      <BlurFade
        delay={0.2}
        direction="left"
        className="w-full md:w-[40%] h-64 md:h-96 relative mt-10 md:mt-0"
      >
        <img
          src={service.img || "/main_image.png"}
          className="w-full h-full object-contain rounded-3xl shadow-lg"
          alt={service.id}
        />
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/40 to-transparent" />
      </BlurFade>
    </section>
  );
}
