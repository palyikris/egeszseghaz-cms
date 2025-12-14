/* eslint-disable prettier/prettier */

import { ScheduleEditorModel } from "@/types/schedule_editor";
import { ServiceSchedule } from "@/types/services";

export function mapScheduleToEditor(
  schedule: ServiceSchedule
): ScheduleEditorModel {
  return {
    id: schedule.id,
    weekdays: schedule.weekdays,
    startTime: schedule.startTime,
    endTime: schedule.endTime,
    startDate: schedule.startDate,
    endDate: schedule.endDate,
  };
}
