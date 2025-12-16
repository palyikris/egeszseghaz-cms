/* eslint-disable prettier/prettier */
import { useMemo } from "react";

import { useServices } from "@/hooks/service/useServices";
import { getWeekOccurrences } from "@/lib/calendar/get_week_occurances";

export function useCalendarWeek(weekStartISO: string) {
  const { data: services, isLoading } = useServices();

  const occurrences = useMemo(() => {
    if (!services) return [];

    return getWeekOccurrences({
      services,
      weekStartISO,
      bufferWeeks: 1,
    });
  }, [services, weekStartISO]);

  return {
    occurrences,
    isLoading,
    services
  };
}
