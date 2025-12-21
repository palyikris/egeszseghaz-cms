/* eslint-disable prettier/prettier */
import { Service } from "@/types/services";
import { DateValue } from "@internationalized/date";
import dayjs from "dayjs";

export function hasAvailableOccurrenceOnDate(
  service: Service,
  calendarDate: DateValue
): boolean {
  const date = dayjs(calendarDate.toString());

  for (const schedule of service.schedules ?? []) {
    // weekday check
    if (!schedule.weekdays.includes(date.day())) continue;

    // date range check
    if (date.isBefore(dayjs(schedule.startDate), "day")) return false;
    if (schedule.endDate && date.isAfter(dayjs(schedule.endDate), "day"))
      return false;

    const start = dayjs(`${date.format("YYYY-MM-DD")}T${schedule.startTime}`);
    const occurrenceId = `${schedule.id}_${start.toISOString()}`;

    const isCancelled =
      schedule.exceptions?.some((e) => e.occurrenceId === occurrenceId) ??
      false;

    if (!isCancelled) {
      return true; // at least one valid occurrence
    }
  }

  return false;
}
