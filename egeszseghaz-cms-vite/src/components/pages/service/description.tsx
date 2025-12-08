/* eslint-disable prettier/prettier */
import { BlurFade } from "@/components/ui/blur-fade";
import { Service } from "@/types/services";

export default function ServiceDescription({ service }: { service: Service }) {
  const text = service.desc;
  const contact = service.phone;

  if (!text) return null;

  return (
    <section className="py-16 px-6 sm:px-12 md:px-20 bg-background-light">
      <div className="max-w-3xl mx-auto">
        <BlurFade delay={0.1}>
          <p className="text-lg leading-relaxed text-text-secondary">{text}</p>
        </BlurFade>

        {contact && (
          <div className="mt-8">
            <BlurFade delay={0.2}>
              <a
                href={`tel:${contact}`}
                className="text-primary-dark font-semibold hover:underline" 
              >
                Kapcsolat: {contact}
              </a>
            </BlurFade>
          </div>
        )}
      </div>
    </section>
  );
}
