/* eslint-disable prettier/prettier */
import { useMemo } from "react";
import { useServices } from "@/hooks/service/useServices";
import { expandWeeklySchedules } from "@/lib/service/expand_schedules";
import { mapOccurrencesToEvents } from "@/lib/settings/map_occurances_to_events";
import { usePalette } from "./usePalette";

export function useCalendarEvents(rangeStart: string, rangeEnd: string) {
  const { data: services = [], isLoading } = useServices();
  const { data: palette, isLoading: paletteLoading } = usePalette();

  const events = useMemo(() => {
    if (!services.length) return [];

    const occurrences = expandWeeklySchedules(services, rangeStart, rangeEnd);

    return mapOccurrencesToEvents(occurrences, services, palette!);
  }, [services, rangeStart, rangeEnd, palette, paletteLoading]);

  return {
    events,
    isLoading,
  };
}
