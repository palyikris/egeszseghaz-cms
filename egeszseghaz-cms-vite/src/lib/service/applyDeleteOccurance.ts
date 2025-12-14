/* eslint-disable prettier/prettier */

import { ServiceSchedule } from "@/types/services";

export function applyDeleteOccurrence(
  schedules: ServiceSchedule[],
  scheduleId: string,
  occurrenceId: string
): ServiceSchedule[] {

  return schedules.map((schedule) => {
    if (schedule.id !== scheduleId) return schedule;

    const exceptions = schedule.exceptions ?? [];

    if (exceptions.some((e) => e.occurrenceId === occurrenceId)) {
      return schedule;
    }

    return {
      ...schedule,
      exceptions: [
        ...exceptions,
        {
          occurrenceId,
          type: "cancelled",
        },
      ],
    };
  });
}
