/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { getImageUses } from "@/lib/settings/get_image_uses";
import CustomLoader from "@/components/loader";

type Props = {
  open: boolean;
  imageName: string | null;
  imageUrl: string | null;
  onCancel: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
};

export function DeleteImageModal({
  open,
  imageName,
  imageUrl,
  onCancel,
  onConfirm,
  isLoading = false,
}: Props) {
  const [uses, setUses] = useState<Array<{ id: string; name: string }>>([]);
  const [fetchingUses, setFetchingUses] = useState(false);

  useEffect(() => {
    if (open && imageUrl) {
      setFetchingUses(true);
      getImageUses(imageUrl)
        .then((result) => {
          setUses(result);
        })
        .catch((err) => {
          console.error("Failed to fetch image uses:", err);
          setUses([]);
        })
        .finally(() => {
          setFetchingUses(false);
        });
    } else {
      setUses([]);
    }
  }, [open, imageUrl]);

  if (!imageName || !imageUrl) return null;

  return (
    <Modal isOpen={open} onClose={onCancel} size="md">
      <ModalContent>
        <ModalHeader className="text-base">Biztos törölni akarod?</ModalHeader>

        <ModalBody>
          <p className="text-sm">A következő kép törlésére készülsz:</p>

          <p className="mt-2 text-sm font-medium break-all">{imageName}</p>

          {fetchingUses ? (
            <div className="py-4 flex justify-center">
              <CustomLoader />
            </div>
          ) : (
            <>
              {uses.length > 0 ? (
                <div className="mt-3">
                  <p className="text-sm font-medium text-warning">
                    Figyelem! Ezt a képet {uses.length} szolgáltatás használja:
                  </p>
                  <ul className="mt-2 list-disc list-inside text-sm text-muted-foreground">
                    {uses.map((use) => (
                      <li key={use.id}>
                        {use.id} ({use.name})
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-sm text-danger">
                    A törlés után ezek a szolgáltatások kép nélkül jelennek
                    meg!
                  </p>
                </div>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">
                  Ezt a képet jelenleg nem használja egyik szolgáltatás sem.
                </p>
              )}

              <p className="mt-3 text-sm text-muted-foreground">
                Ez a művelet nem visszavonható.
              </p>
            </>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            variant="ghost"
            color="secondary"
            onPress={onCancel}
            isDisabled={isLoading || fetchingUses}
          >
            Mégse
          </Button>

          <Button
            color="danger"
            onPress={onConfirm}
            isLoading={isLoading}
            isDisabled={fetchingUses}
          >
            Törlés
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
