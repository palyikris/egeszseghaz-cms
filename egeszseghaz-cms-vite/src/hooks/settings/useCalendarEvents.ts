/* eslint-disable prettier/prettier */
import { useMemo } from "react";
import { useServices } from "@/hooks/service/useServices";
import { expandWeeklySchedules } from "@/lib/service/expand_schedules";
import { mapOccurrencesToEvents } from "@/lib/settings/map_occurances_to_events";

export function useCalendarEvents(rangeStart: string, rangeEnd: string) {
  const { data: services = [], isLoading } = useServices();

  const events = useMemo(() => {
    if (!services.length) return [];

    const occurrences = expandWeeklySchedules(services, rangeStart, rangeEnd);

    return mapOccurrencesToEvents(occurrences, services);
  }, [services, rangeStart, rangeEnd]);

  return {
    events,
    isLoading,
  };
}
