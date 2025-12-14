/* eslint-disable prettier/prettier */
import { CalendarEvent } from "@/types/calendar";
import { Service, ServiceOccurrence } from "@/types/services";

export function mapOccurrencesToEvents(
  occurrences: ServiceOccurrence[],
  services: Service[]
): CalendarEvent[] {
  const serviceMap = new Map(services.map((s) => [s.id, s]));

  return occurrences.map((o) => {
    const service = serviceMap.get(o.serviceId);

    return {
      id: o.occurrenceId,
      title: service?.id ?? "Service",
      start: o.start,
      end: o.end,
      serviceId: o.serviceId,
      scheduleId: o.scheduleId,
    };
  });
}
