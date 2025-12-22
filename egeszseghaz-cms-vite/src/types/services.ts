/* eslint-disable prettier/prettier */
export interface Service {
  content?: {
    htmlBlocks: Array<{ id: string; html: string }>;
    priceTable: Array<{
      id: string;
      label: string;
      price: string;
      description?: string;
    }>;
    images: Array<{
      url: string;
      name: string;
    }>;
  };
  id: string;
  name: string;
  coach?: string;
  desc: string;
  img: string;
  phone: string;
  schedules?: ServiceSchedule[];
  colorSlot?: "primary" | "secondary" | "accent";
  colorIndex?: number;
  color?: string;
  facts?: ServiceFacts;
}

export type ServiceFacts = {
  durationMin?: number; // 30 | 45 | 50 | 60 etc.
  format?: "egyéni" | "csoportos" | "online" | "helyszíni";
  intensity?: "alacsony" | "közepes" | "magas";
};


export type ScheduleFrequency = "weekly";

export type ScheduleException = {
  occurrenceId: string; // ISO datetime of the skipped occurrence
  type: "cancelled";
  reason?: string;
  createdAt?: string;
};

export type ServiceSchedule = {
  id: string; // uuid
  startDate: string; // ISO datetime
  endDate?: string; // ISO datetime (optional)
  frequency: ScheduleFrequency; // for now: "weekly"
  weekdays: number[]; // 0–6 (Sun–Sat)
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
  exceptions?: ScheduleException[];
};

export type ServiceOccurrence = {
  occurrenceId: string; // `${scheduleId}_${ISO_START}`
  serviceId: string;

  scheduleId: string;

  start: string; // ISO datetime
  end: string; // ISO datetime
};

