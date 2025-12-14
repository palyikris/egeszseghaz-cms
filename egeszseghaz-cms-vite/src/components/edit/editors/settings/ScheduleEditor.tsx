/* eslint-disable prettier/prettier */
import clsx from "clsx";
import dayjs from "dayjs";
import { Button } from "@heroui/button";
import { DatePicker } from "@heroui/date-picker";
import { TimeInput } from "@heroui/date-input";

import { ScheduleEditorModel } from "@/types/schedule_editor";

type Props = {
  value: ScheduleEditorModel;
  onChange: (v: ScheduleEditorModel) => void;
  onCancel: () => void;
  onSave: () => void;
  isSaving?: boolean;
};

const DAYS = [
  { label: "Mon", value: 1 },
  { label: "Tue", value: 2 },
  { label: "Wed", value: 3 },
  { label: "Thu", value: 4 },
  { label: "Fri", value: 5 },
  { label: "Sat", value: 6 },
  { label: "Sun", value: 0 },
];

export function ScheduleEditor({
  value,
  onChange,
  onCancel,
  onSave,
  isSaving = false,
}: Props) {
  const isValid =
    value.weekdays.length > 0 &&
    value.startTime < value.endTime &&
    (!value.endDate || value.startDate <= value.endDate);

  return (
    <div className="space-y-6">
      {/* Weekdays */}
      <div>
        <h2 className="block text-sm font-medium mb-2">Days of week</h2>

        <div className="flex gap-2 flex-wrap">
          {DAYS.map((d) => {
            const active = value.weekdays.includes(d.value);

            return (
              <button
                key={d.value}
                type="button"
                className={clsx(
                  "px-2 py-1 rounded text-sm border transition",
                  active
                    ? "bg-primary text-white border-primary"
                    : "bg-transparent hover:bg-muted"
                )}
                onClick={() => {
                  const next = active
                    ? value.weekdays.filter((day) => day !== d.value)
                    : [...value.weekdays, d.value];

                  onChange({
                    ...value,
                    weekdays: next,
                  });
                }}
              >
                {d.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time range */}
      <div>
        <h2 className="block text-sm font-medium mb-2">Time</h2>

        <div className="grid grid-cols-2 gap-3">
          <TimeInput
            label="Start"
            hourCycle={24}
            value={dayjs(`1970-01-01T${value.startTime}`).toDate(}
            onChange={(date) =>
              onChange({
                ...value,
                startTime: dayjs(date).format("HH:mm"),
              })
            }
          />

          <TimeInput
            label="End"
            hourCycle={24}
            value={dayjs(`1970-01-01T${value.endTime}`).toDate()}
            onChange={(date: Date) =>
              onChange({
                ...value,
                endTime: dayjs(date).format("HH:mm"),
              })
            }
          />
        </div>
      </div>

      {/* Date range */}
      <div>
        <h3 className="block text-sm font-medium mb-2">
          Active date range
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <DatePicker
            label="Start date"
            value={dayjs(value.startDate).toDate()}
            onChange={(date: Date) =>
              onChange({
                ...value,
                startDate: dayjs(date).format("YYYY-MM-DD"),
              })
            }
          />

          <DatePicker
            label="End date"
            value={value.endDate ? dayjs(value.endDate).toDate() : null}
            onChange={(date) =>
              onChange({
                ...value,
                endDate: date ? dayjs(date).format("YYYY-MM-DD") : undefined,
              })
            }
            isClearable
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button variant="light" onPress={onCancel} isDisabled={isSaving}>
          Cancel
        </Button>

        <Button
          color="primary"
          onPress={onSave}
          isDisabled={!isValid}
          isLoading={isSaving}
        >
          Save schedule
        </Button>
      </div>
    </div>
  );
}
