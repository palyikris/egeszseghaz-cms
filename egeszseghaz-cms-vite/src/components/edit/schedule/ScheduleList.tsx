/* eslint-disable prettier/prettier */
import { formatScheduleSummary } from "@/lib/settings/format_schedule_summary";
import { ServiceSchedule } from "@/types/services";
import { Button } from "@heroui/button";

type Props = {
  schedules: ServiceSchedule[];
  onEdit: (schedule: ServiceSchedule) => void;
  onDelete: (schedule: ServiceSchedule) => void;
};

export function ScheduleList({ schedules, onEdit, onDelete }: Props) {
  if (!schedules.length) {
    return <p className="text-sm text-muted">
      Nincs elérhető ütemterv.
    </p>;
  }

  return (
    <div className="space-y-2">
      {schedules.map((schedule) => (
        <div
          key={schedule.id}
          className="flex items-center justify-between rounded border border-primary p-3 bg-primary/40"
        >
          <div>
            <div className="font-medium">{formatScheduleSummary(schedule)}</div>

            <div className="text-xs text-text-secondary">
              Időtartam: {schedule.startDate}
              {schedule.endDate ? ` – ${schedule.endDate}` : ""}
            </div>
          </div>

          <div className="flex gap-2">
            <Button size="sm" color="primary" onPress={() => onEdit(schedule)}>
              Szerkesztés
            </Button>

            <Button
              size="sm"
              color="danger"
              variant="ghost"
              onPress={() => onDelete(schedule)}
            >
              Törlés
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
