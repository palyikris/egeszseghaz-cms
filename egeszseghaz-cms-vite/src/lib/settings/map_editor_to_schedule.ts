/* eslint-disable prettier/prettier */

import { ScheduleEditorModel } from "@/types/schedule_editor";
import { ServiceSchedule } from "@/types/services";

export function mapEditorToSchedule(
  model: ScheduleEditorModel
): ServiceSchedule {
  return {
    id: model.id,
    frequency: "weekly",
    weekdays: model.weekdays,
    startTime: model.startTime,
    endTime: model.endTime,
    startDate: model.startDate,
    endDate: model.endDate,
    exceptions: [],
  };
}
