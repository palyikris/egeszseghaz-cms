/* eslint-disable prettier/prettier */

import { ScheduleEditorModel } from "@/types/schedule_editor";
import { ServiceSchedule } from "@/types/services";


export function mergeEditedSchedule(
  schedules: ServiceSchedule[],
  edited: ScheduleEditorModel
): ServiceSchedule[] {
  return schedules.map((s) => {
    if (s.id !== edited.id) return s;

    return {
      ...s,
      weekdays: edited.weekdays,
      startTime: edited.startTime,
      endTime: edited.endTime,
      startDate: edited.startDate,
      endDate: edited.endDate,
      // exceptions preserved intentionally
    };
  });
}
