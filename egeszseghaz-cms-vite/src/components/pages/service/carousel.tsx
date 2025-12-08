/* eslint-disable prettier/prettier */
import { BlurFade } from "@/components/ui/blur-fade";
import { Service } from "@/types/services";
import { useEditMode } from "@/context/edit/edit";
import { useServiceDetail } from "@/hooks/useServiceDetail";
import { DefaultServiceDetailTemplate } from "@/templates/service_detail/service_detail_template";
import { resolveColor, cn } from "@/lib/utils";

export default function ServiceCarousel({ service }: { service: Service }) {
  const { isEditMode, draft } = useEditMode();
  const { data: serviceDetail } = useServiceDetail();

  const styles = isEditMode
    ? draft?.serviceDetail?.styles || DefaultServiceDetailTemplate.styles
    : (serviceDetail as any)?.styles || DefaultServiceDetailTemplate.styles;

  const images = service.content?.images || [];

  if (!images.length || images.length <= 0) return null;

  const dotResolved = resolveColor(styles?.carousel?.dotColor, "bg");

  return (
    <section className={cn("py-20 px-6 sm:px-12 rounded-none md:rounded-[5%] my-16", /* fallback gradient */)}>
      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((src, i) => (
          <BlurFade key={i} delay={0.1 * (i + 1)} direction="up">
            <div className="relative rounded-2xl overflow-hidden shadow-lg group">
              <img
                src={src}
                className="w-full h-64 object-cover transition-all duration-500 group-hover:brightness-90 group-hover:scale-105"
                alt={`${service.id}-image-${i + 1}`}
              />
              <div
                className={cn("absolute bottom-0 w-full h-[3px] blur-[2px]", dotResolved.className)}
                style={dotResolved.style}
              />
            </div>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
