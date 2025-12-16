/* eslint-disable prettier/prettier */
import type { CalendarOptions } from "@fullcalendar/core";

export const fullCalendarBaseConfig: CalendarOptions = {
  initialView: "timeGridWeek",

  // Week structure
  firstDay: 1, // Monday
  weekends: true, // show Sat/Sun (styled as closed)
  allDaySlot: false,

  // Time grid
  slotMinTime: "08:00:00",
  slotMaxTime: "20:00:00",
  expandRows: true,

  // UX
  nowIndicator: true,
  eventOverlap: true,
  eventDisplay: "block",
  height: "auto",

  // We control navigation externally
  headerToolbar: false,

  // Safety defaults
  editable: false,
  selectable: false,
  selectMirror: false,
  dayMaxEvents: false,
};
