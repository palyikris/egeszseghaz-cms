/* eslint-disable prettier/prettier */
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

import type { Service, ServiceOccurrence } from "@/types/services";
import { expandWeeklySchedules } from "../service/expand_schedules";

dayjs.extend(isoWeek);

type GetWeekOccurrencesArgs = {
  services: Service[];
  weekStartISO: string; // any date within the week
  bufferWeeks?: number; // default = 1
};

export function getWeekOccurrences({
  services,
  weekStartISO,
  bufferWeeks = 1,
}: GetWeekOccurrencesArgs): ServiceOccurrence[] {
  const weekStart = dayjs(weekStartISO).startOf("isoWeek");
  const weekEnd = weekStart.add(6, "day").endOf("day");

  const bufferedStart = weekStart
    .subtract(bufferWeeks, "week")
    .format("YYYY-MM-DD");

  const bufferedEnd = weekEnd.add(bufferWeeks, "week").format("YYYY-MM-DD");

  const expanded = expandWeeklySchedules(services, bufferedStart, bufferedEnd);

  // filter back to the visible week only
  return expanded.filter((o) => {
    const start = dayjs(o.start);
    
    return (
      start.isSame(weekStart, "day") ||
      (start.isAfter(weekStart) && start.isBefore(weekEnd))
    );
  });
}
