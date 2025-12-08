/* eslint-disable prettier/prettier */
import { BlurFade } from "@/components/ui/blur-fade";
import { Service } from "@/types/services";
import { useEditMode } from "@/context/edit/edit";
import { useServiceDetail } from "@/hooks/useServiceDetail";
import { DefaultServiceDetailTemplate } from "@/templates/service_detail/service_detail_template";
import { resolveColor, cn } from "@/lib/utils";

export default function ServicePriceTable({ service }: { service: Service }) {
  const { isEditMode, draft } = useEditMode();
  const { data: serviceDetail } = useServiceDetail();

  const styles = isEditMode
    ? draft?.serviceDetail?.styles || DefaultServiceDetailTemplate.styles
    : (serviceDetail as any)?.styles || DefaultServiceDetailTemplate.styles;

  const prices = service.content?.priceTable || [];

  if (!prices.length) return null;

  const headingResolved = resolveColor(styles?.priceTable?.headingColor, "text");
  const priceResolved = resolveColor(styles?.priceTable?.priceColor, "text");
  const rowBg = styles?.priceTable?.rowBg || "bg-white";

  return (
    <section className="py-20 px-6 sm:px-12 bg-background-light">
      <h2 className={cn("text-3xl font-semibold text-center mb-12", headingResolved.className)} style={headingResolved.style}>
        Árak és kezelések
      </h2>

      <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-8">
        {prices.map((row, i) => (
          <BlurFade key={row.id} delay={0.1 * (i + 1)} direction="up">
            <div className={cn("p-6 rounded-xl shadow-md border", rowBg)}>
              <h3 className={cn("text-xl font-semibold mb-1", headingResolved.className)} style={headingResolved.style}>
                {row.label}
              </h3>
              {row.description && (
                <p className="text-text-secondary text-sm mb-3">{row.description}</p>
              )}
              <p className={cn("text-2xl font-bold", priceResolved.className)} style={priceResolved.style}>{row.price}</p>
            </div>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
