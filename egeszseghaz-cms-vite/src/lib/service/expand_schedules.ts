/* eslint-disable prettier/prettier */
import dayjs from "dayjs";
import { Service, ServiceOccurrence } from "@/types/services";
import minMax from "dayjs/plugin/minMax";
import utc from "dayjs/plugin/utc";

export function expandWeeklySchedules(
  services: Service[],
  rangeStart: string, // ISO date
  rangeEnd: string // ISO date
): ServiceOccurrence[] {
  const occurrences: ServiceOccurrence[] = [];

  dayjs.extend(minMax);
  dayjs.extend(utc);

  for (const service of services) {
    for (const schedule of service.schedules ?? []) {
      if (schedule.frequency !== "weekly") continue;

      const startDate = dayjs(schedule.startDate);
      const endDate = schedule.endDate
        ? dayjs(schedule.endDate)
        : dayjs(rangeEnd);

      // Make sure to not go before the range start
      const cursorStart = dayjs.max(startDate, dayjs(rangeStart));
      // Make sure to not go beyond the range end
      const cursorEnd = dayjs.min(endDate, dayjs(rangeEnd));

      // Iterate through each day in the range
      let cursor = cursorStart.startOf("day");

      while (cursor.isBefore(cursorEnd) || cursor.isSame(cursorEnd, "day")) {

        // Check if the current day is one of the scheduled weekdays
        if (schedule.weekdays.includes(cursor.day())) {

          // Create occurrence
          const start = dayjs(
            `${cursor.format("YYYY-MM-DD")}T${schedule.startTime}`
          );
          const end = dayjs(
            `${cursor.format("YYYY-MM-DD")}T${schedule.endTime}`
          );
          const occurrenceId = `${schedule.id}_${start.toISOString()}`;

          // Check for exceptions (cancellations)
          const isCancelled =
            schedule.exceptions?.some((e) => e.occurrenceId === occurrenceId) ??
            false;

          // Only add if not cancelled
          if (!isCancelled) {
            occurrences.push({
              occurrenceId,
              serviceId: service.id,
              scheduleId: schedule.id,
              start: start.toISOString(),
              end: end.toISOString(),
            });
          }
        }

        cursor = cursor.add(1, "day");
      }
    }
  }

  return occurrences;
}
