/* eslint-disable prettier/prettier */
import dayjs from "dayjs";
import { Button } from "@heroui/button";

import { ServiceSchedule, ScheduleException } from "@/types/services";

type ExceptionItem = {
  scheduleId: string;
  exception: ScheduleException;
};

type Props = {
  schedules: ServiceSchedule[];
  onDelete: (scheduleId: string, exception: ScheduleException) => void;
};

function flattenExceptions(schedules: ServiceSchedule[]): ExceptionItem[] {
  const items: ExceptionItem[] = [];

  for (const schedule of schedules) {
    for (const exception of schedule.exceptions ?? []) {
      items.push({
        scheduleId: schedule.id,
        exception,
      });
    }
  }

  return items.sort((a, b) =>
    dayjs(a.exception.occurrenceId.split("_")[1]).diff(
      dayjs(b.exception.occurrenceId.split("_")[1])
    )
  );
}

export function ExceptionList({ schedules, onDelete }: Props) {
  const exceptions = flattenExceptions(schedules);

  if (!exceptions.length) {
    return <p className="text-sm text-muted">Nincs törölt időpont.</p>;
  }

  return (
    <div className="space-y-2">
      {exceptions.map(({ scheduleId, exception }) => {
        const iso = exception.occurrenceId.split("_")[1];
        const start = dayjs(iso);

        return (
          <div
            key={exception.occurrenceId}
            className="flex items-center justify-between rounded border border-danger p-3 bg-danger/20 gap-4"
          >
            <div>
              <div className="font-medium">
                {start.format("YYYY-MM-DD HH:mm")}
              </div>

              {exception.reason && (
                <div className="text-xs text-text-secondary">
                  {exception.reason}
                </div>
              )}
            </div>

            <Button
              size="sm"
              color="danger"
              variant="ghost"
              onPress={() => onDelete(scheduleId, exception)}
            >
              Visszaállítás
            </Button>
          </div>
        );
      })}
    </div>
  );
}
