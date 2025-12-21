/* eslint-disable prettier/prettier */

import { ServiceSchedule } from "@/types/services";


export function hasException(
  schedule: ServiceSchedule,
  occurrenceId: string
): boolean {
  return (
    schedule.exceptions?.some((e) => e.occurrenceId === occurrenceId) ?? false
  );
}
