/* eslint-disable prettier/prettier */
export type ScheduleEditorModel = {
  id: string;
  weekdays: number[]; // 0–6
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  startDate: string; // ISO date
  endDate?: string; // ISO date
};
