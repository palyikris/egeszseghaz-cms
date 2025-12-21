/* eslint-disable prettier/prettier */

import { ServiceSchedule } from "@/types/services";
import dayjs from "dayjs";

export function getOccurrenceIdForScheduleAndDate(
  schedule: ServiceSchedule,
  date: string // YYYY-MM-DD
): string | null {
  const day = dayjs(date);

  // must be on a scheduled weekday
  if (!schedule.weekdays.includes(day.day())) return null;

  // must be after schedule start
  if (day.isBefore(dayjs(schedule.startDate), "day")) return null;

  // must be before schedule end (if exists)
  if (schedule.endDate && day.isAfter(dayjs(schedule.endDate), "day")) {
    return null;
  }

  const start = dayjs(`${day.format("YYYY-MM-DD")}T${schedule.startTime}`);

  return `${schedule.id}_${start.toISOString()}`;
}
