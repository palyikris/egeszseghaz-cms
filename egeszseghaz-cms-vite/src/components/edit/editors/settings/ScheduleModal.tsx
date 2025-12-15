/* eslint-disable prettier/prettier */
import { ScheduleEditorModel } from "@/types/schedule_editor";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import ScheduleEditor from "./ScheduleEditor";

type Props = {
  open: boolean;
  title: string;
  value: ScheduleEditorModel;
  onChange: (v: ScheduleEditorModel) => void;
  onCancel: () => void;
  onSave: () => void;
  isSaving?: boolean;
};

export function ScheduleEditorModal({
  open,
  title,
  value,
  onChange,
  onCancel,
  onSave,
  isSaving = false,
}: Props) {
  return (
    <Modal isOpen={open} onClose={onCancel} size="lg">
      <ModalContent>
        <ModalHeader className="text-base">{title}</ModalHeader>

        <ModalBody>
          <ScheduleEditor
            value={value}
            onChange={onChange}
            onCancel={onCancel}
            onSave={onSave}
            isSaving={isSaving}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
