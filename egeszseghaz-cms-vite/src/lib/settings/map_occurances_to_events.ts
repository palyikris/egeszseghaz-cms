/* eslint-disable prettier/prettier */
import { CalendarEvent } from "@/types/calendar";
import { Service, ServiceOccurrence } from "@/types/services";

function getServiceColor(service: Service): string {
  // priority:
  // 1) explicit seed (future-proof)
  // 2) fallback hash from id
  if ((service as any).colorSeed) {
    return (service as any).colorSeed;
  }

  // deterministic fallback
  const colors = [
    "#8E715B", // primary
    "#4BA6A3", // secondary
    "#E6B655", // accent
    "#7FC9C6",
    "#BFA590",
  ];

  let hash = 0;

  for (let i = 0; i < service.id.length; i++) {
    hash = service.id.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
}

export function mapOccurrencesToEvents(
  occurrences: ServiceOccurrence[],
  services: Service[]
): CalendarEvent[] {
  const serviceMap = new Map(services.map((s) => [s.id, s]));

  return occurrences.map((o) => {
    const service = serviceMap.get(o.serviceId);

    const color = service ? getServiceColor(service) : undefined;

    return {
      id: o.occurrenceId,
      title: service?.id ?? "Szolgáltatás",
      start: o.start,
      end: o.end,
      serviceId: o.serviceId,
      scheduleId: o.scheduleId,

      backgroundColor: color,
      borderColor: color,

      extendedProps: {
        coach: service?.name,
      },
    };
  });
}
