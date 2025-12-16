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
        <ModalHeader className="text-base">Biztos törölni akarod?</ModalHeader>

        <ModalBody>
          <p className="text-sm">Ez a művelet a következő ütemezést törli:</p>

          <p className="mt-2 text-sm font-medium">
            {formatScheduleSummary(schedule)}
          </p>

          <p className="mt-3 text-sm text-muted-foreground">
            Ez a művelet nem visszavonható. Minden ehhez az ütemezéshez tartozó
            időpont törlődni fog.
          </p>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="ghost"
            color="secondary"
            onPress={onCancel}
            isDisabled={isLoading}
          >
            Mégse
          </Button>

          <Button color="danger" onPress={onConfirm} isLoading={isLoading}>
            Törlés
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
