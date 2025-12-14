/* eslint-disable prettier/prettier */
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { ServiceSchedule } from "@/types/services";
import { formatScheduleSummary } from "@/lib/settings/format_schedule_summary";

type Props = {
  open: boolean;
  schedule: ServiceSchedule | null;
  onCancel: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
};

export function DeleteScheduleConfirm({
  open,
  schedule,
  onCancel,
  onConfirm,
  isLoading = false,
}: Props) {
  if (!schedule) return null;

  return (
    <Modal isOpen={open} onClose={onCancel} size="sm">
      <ModalContent>
        <ModalHeader className="text-base">Delete schedule?</ModalHeader>

        <ModalBody>
          <p className="text-sm">
            You are about to delete the following schedule:
          </p>

          <p className="mt-2 text-sm font-medium">
            {formatScheduleSummary(schedule)}
          </p>

          <p className="mt-3 text-sm text-muted-foreground">
            All future occurrences created by this schedule will be removed.
            This action cannot be undone.
          </p>
        </ModalBody>

        <ModalFooter>
          <Button variant="light" onPress={onCancel} isDisabled={isLoading}>
            Cancel
          </Button>

          <Button color="danger" onPress={onConfirm} isLoading={isLoading}>
            Delete schedule
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
