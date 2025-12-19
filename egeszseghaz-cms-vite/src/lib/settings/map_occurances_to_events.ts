/* eslint-disable prettier/prettier */
import { ThemePalette } from "@/palettes/palette";
import { CalendarEvent } from "@/types/calendar";
import { Service, ServiceOccurrence } from "@/types/services";

function hashToIndex(id: string, mod: number) {
  let hash = 0;

  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }

  return Math.abs(hash) % mod;
}

export function mapOccurrencesToEvents(
  occurrences: ServiceOccurrence[],
  services: Service[],
  palette: ThemePalette
): CalendarEvent[] {
  if (!palette) return [];

  const serviceMap = new Map(services.map((s) => [s.id, s]));

  const slots = [
    palette.light.primary,
    palette.light.secondary,
    palette.light.accent,
    palette.light.secondaryLight ?? palette.light.secondary,
    palette.light.primaryLight ?? palette.light.primary,
  ];

  return occurrences.map((o) => {
    const service = serviceMap.get(o.serviceId);

    const slotIdx = hashToIndex(o.serviceId, slots.length);

    const base = service?.color ? service.color : slots[slotIdx];

    return {
      id: o.occurrenceId,
      title: service?.id ?? "Szolgáltatás",
      start: o.start,
      end: o.end,
      serviceId: o.serviceId,
      scheduleId: o.scheduleId,

      backgroundColor: base,
      borderColor: base,

      extendedProps: {
        coach: service?.name,
      },
    };
  });
}
