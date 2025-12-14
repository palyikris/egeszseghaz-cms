/* eslint-disable prettier/prettier */

import { ServiceSchedule } from "@/types/services";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function formatScheduleSummary(schedule: ServiceSchedule): string {
  const days = schedule.weekdays
    .sort()
    .map((d) => WEEKDAYS[d])
    .join(", ");

  return `${days} · ${schedule.startTime}–${schedule.endTime}`;
}
