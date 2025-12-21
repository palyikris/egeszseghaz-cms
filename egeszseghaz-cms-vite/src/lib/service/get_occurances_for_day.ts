/* eslint-disable prettier/prettier */

import { Service, ServiceOccurrence } from "@/types/services";
import dayjs from "dayjs";


export function getOccurrencesForDate(
  service: Service,
  date: string // YYYY-MM-DD
): ServiceOccurrence[] {
  const day = dayjs(date);
  const results: ServiceOccurrence[] = [];
  

  for (const schedule of service.schedules ?? []) {
    // weekday check
    if (!schedule.weekdays.includes(day.day())) continue;

    // date range check
    if (day.isBefore(dayjs(schedule.startDate), "day")) continue;
    if (schedule.endDate && day.isAfter(dayjs(schedule.endDate), "day"))
      continue;

    const start = dayjs(`${day.format("YYYY-MM-DD")}T${schedule.startTime}`);
    const end = dayjs(`${day.format("YYYY-MM-DD")}T${schedule.endTime}`);

    const occurrenceId = `${schedule.id}_${start.toISOString()}`;

    // skip already-cancelled
    const isCancelled =
      schedule.exceptions?.some((e) => e.occurrenceId === occurrenceId) ??
      false;

    if (isCancelled) continue;

    results.push({
      occurrenceId,
      serviceId: service.id,
      scheduleId: schedule.id,
      start: start.toISOString(),
      end: end.toISOString(),
    });
  }

  return results;
}
