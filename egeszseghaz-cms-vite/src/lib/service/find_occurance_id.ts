/* eslint-disable prettier/prettier */

import { ServiceSchedule } from "@/types/services";
import { getOccurrenceIdForScheduleAndDate } from "./get_occurance_id";


export function findOccurrenceIdForDate(
  date: string,
  schedules: ServiceSchedule[]
): { scheduleId: string; occurrenceId: string } | null {
  for (const schedule of schedules) {
    const occurrenceId = getOccurrenceIdForScheduleAndDate(schedule, date);

    if (occurrenceId) {
      return { scheduleId: schedule.id, occurrenceId };
    }
  }

  return null;
}
