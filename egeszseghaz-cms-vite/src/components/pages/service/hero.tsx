/* eslint-disable prettier/prettier */
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@heroui/button";
import { resolveColor, cn } from "@/lib/utils";
import { Service } from "@/types/services";
import { useEditMode } from "@/context/edit/edit";
import { useServiceDetail } from "@/hooks/service/useServiceDetail";
import { DefaultServiceDetailTemplate } from "@/templates/service_detail/service_detail_template";
import { useNavigate } from "react-router-dom";

export default function ServiceHero({
  service,
}: {
  service: Service | null | undefined;
}) {
  const { isEditMode, draft } = useEditMode();
  const { data: serviceDetail } = useServiceDetail();

  const navigate = useNavigate();

  if (!service) return null;

  const styles = isEditMode
    ? draft?.serviceDetail?.styles || DefaultServiceDetailTemplate.styles
    : (serviceDetail as any)?.styles || DefaultServiceDetailTemplate.styles;

  const titleResolved = resolveColor(
    styles?.hero?.titleColor || "primary-dark",
    "text"
  );
  const subtitleResolved = resolveColor(
    styles?.hero?.subtitleColor || "text-secondary",
    "text"
  );

  return (
    <section
      className={cn(
        "relative flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-40 pb-30 rounded-none md:rounded-bl-[10%] md:rounded-br-[10%] mb-12 bg-gradient-to-br from-primary-light via-primary-light/90 to-secondary-light"
      )}
      id="hero"
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
          className={cn("max-w-2xl", subtitleResolved.className)}
          style={subtitleResolved.style}
        >
          <p className="line-clamp-2">
            {service.desc || "Szolgáltatás leírása hamarosan…"}
          </p>
        </BlurFade>

        <div className="mt-8 flex justify-start items-center gap-4">
          <Button
            variant="solid"
            color="primary"
            onPress={() => {
              navigate(`/service/${service.id}/#contact`);
            }}
          >
            Kapcsolat
          </Button>

          <Button
            variant="ghost"
            color="secondary"
            onPress={() => {
              navigate("/");
            }}
          >
            Vissza
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

      {service?.facts && (
        <BlurFade
          inView
          className="w-full left-0 flex justify-center z-40 absolute bottom-0 transform translate-y-2/3"
          delay={0.2}
          direction="up"
        >
          <div className="w-full md:w-2/3 sm:w-5/6 bg-background-light rounded-lg p-1">
            <div className="flex items-center justify-between gap-4 bg-primary w-full rounded-sm py-2">
              <div className="w-full md:w-1/3 flex items-center justify-center gap-4 p-4 text-background-light">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                    clipRule="evenodd"
                  />
                </svg>
                {service.facts?.durationMin} perc
              </div>
              <div className="w-full md:w-1/3 items-center justify-center gap-4 p-4 text-background-light hidden sm:flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z"
                    clipRule="evenodd"
                  />
                </svg>

                {(service.facts?.intensity || "")?.charAt(0).toUpperCase() +
                  (service.facts?.intensity || "")?.slice(1)}
              </div>
              <div className="w-full md:w-1/3 flex items-center justify-center gap-4 p-4 text-background-light">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
                </svg>

                {(service.facts?.format || "").charAt(0).toUpperCase() +
                  (service.facts?.format || "").slice(1)}
              </div>
            </div>
          </div>
        </BlurFade>
      )}
    </section>
  );
}
