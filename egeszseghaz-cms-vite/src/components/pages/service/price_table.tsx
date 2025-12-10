/* eslint-disable prettier/prettier */
import CustomDivider from "@/components/divider";
import { BlurFade } from "@/components/ui/blur-fade";
import { Service } from "@/types/services";

export default function ServicePriceTable({ service }: { service: Service }) {
  const prices = service.content?.priceTable || [];
  if (!prices.length) return null;

  return (
    <section className="py-20 px-6 sm:px-12">
      {/* Heading */}
      <BlurFade delay={0.1} direction="up">
        <h2 className="text-4xl font-semibold text-center mb-16 text-primary-dark">
          Árak és Kezelések
        </h2>
      </BlurFade>

      {/* Grid */}
      <div
        className="
          max-w-5xl mx-auto 
          grid gap-8
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {prices.map((row, i) => (
          <BlurFade key={row.id} delay={0.1 * (i + 1)} direction="up">
            <div
              className="
              group relative p-8 rounded-3xl
              bg-background backdrop-blur-md border border-primary-light/30
              shadow-md hover:shadow-lg
              transition-all duration-300 hover:-translate-y-1
              h-full
              "
            >
              {/* Title */}
              <h3 className="text-2xl font-semibold text-primary-dark mb-2">
                {row.label}
              </h3>

              {/* Description */}
              <p
                className={`text-text-secondary text-sm leading-relaxed mb-4 ${!row.description && "min-h-[1.5em]"}`}
              >
                {row.description || " "}
              </p>

              <CustomDivider iconSize={4} className="my-6" />

              {/* Price */}
              <div>
                <p
                  className="
                text-3xl font-bold text-secondary-dark 
                transition-transform duration-300
                group-hover:scale-[1.08]
                h-full
              "
                >
                  {row.price}
                </p>
              </div>
            </div>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
