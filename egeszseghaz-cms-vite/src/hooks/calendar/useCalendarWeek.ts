/* eslint-disable prettier/prettier */
import { useMemo } from "react";

import { getWeekOccurrences } from "@/lib/calendar/get_week_occurances";
import { Service } from "@/types/services";

type UseCalendarWeekProps = {
  weekStartISO: string;
  services: Service[];
};

export function useCalendarWeek({
  weekStartISO,
  services,
}: UseCalendarWeekProps) {
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
  };
}
