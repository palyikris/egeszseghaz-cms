/* eslint-disable prettier/prettier */
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";

type Props = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
};

export function DeleteOccurrenceConfirm({
  open,
  onCancel,
  onConfirm,
  isLoading = false,
}: Props) {
  return (
    <Modal isOpen={open} onClose={onCancel} size="sm">
      <ModalContent>
        <ModalHeader className="text-base">Delete this occurrence?</ModalHeader>

        <ModalBody>
          <p className="text-sm text-muted-foreground">
            This will cancel only this instance of the service. Other
            occurrences will remain unchanged.
          </p>
        </ModalBody>

        <ModalFooter>
          <Button variant="light" onPress={onCancel} isDisabled={isLoading}>
            Cancel
          </Button>

          <Button color="danger" onPress={onConfirm} isLoading={isLoading}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
