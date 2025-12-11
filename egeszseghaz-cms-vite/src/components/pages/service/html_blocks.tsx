/* eslint-disable prettier/prettier */
import { BlurFade } from "@/components/ui/blur-fade";
import { Service } from "@/types/services";
import { useEditMode } from "@/context/edit/edit";
import { useServiceDetail } from "@/hooks/useServiceDetail";
import { DefaultServiceDetailTemplate } from "@/templates/service_detail/service_detail_template";
import { resolveColor, cn } from "@/lib/utils";
import CustomDivider from "@/components/divider";

export default function ServiceHtmlBlocks({ service }: { service: Service }) {
  const { isEditMode, draft } = useEditMode();
  const { data: serviceDetail } = useServiceDetail();

  const styles = isEditMode
    ? draft?.serviceDetail?.styles || DefaultServiceDetailTemplate.styles
    : (serviceDetail as any)?.styles || DefaultServiceDetailTemplate.styles;

  const blocks = service.content?.htmlBlocks || [];

  if (!blocks.length) return null;

  const headingResolved = resolveColor(
    styles?.htmlBlocks?.headingColor,
    "text"
  );
  const textResolved = resolveColor(styles?.htmlBlocks?.textColor, "text");

  return (
    <section
      className={cn("py-16 px-6 sm:px-12 md:px-20", textResolved.className)}
      style={textResolved.style}
    >
      <div className="max-w-4xl mx-auto space-y-10">
        {blocks.map((b, i) => (
          <>
            <BlurFade key={b.id} delay={0.1 * (i + 1)}>
              <div
                className={cn(
                  "service-html bg-white/70 backdrop-blur-md rounded-xl shadow-md p-6 border",
                  headingResolved.className
                )}
                style={headingResolved.style}
              >
                <div dangerouslySetInnerHTML={{ __html: b.html }} />
              </div>
            </BlurFade>
            <CustomDivider direction={i % 2 == 0 ? "up" : "down"} />
          </>
        ))}
      </div>
    </section>
  );
}
