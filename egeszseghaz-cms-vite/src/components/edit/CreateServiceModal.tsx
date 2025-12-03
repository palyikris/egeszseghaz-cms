/* eslint-disable prettier/prettier */
import { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import type { Service } from "@/types/services";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (id: string, coach: string, file: File | null) => Promise<Service | null>;
};

export default function CreateServiceModal({ open, onClose, onCreate }: Props) {
  const [id, setId] = useState("");
  const [coach, setCoach] = useState("");
  const [file, setFile] = useState<File | null>(null);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white dark:bg-surface p-6 rounded-md w-full max-w-lg">
        <h3 className="font-semibold mb-4">Create New Service</h3>

        <div className="space-y-3">
          <Input label="Service Name (ID)" type="text" value={id} onChange={(e: any) => setId(e.target.value)} />
          <Input label="Coach Name" type="text" value={coach} onChange={(e: any) => setCoach(e.target.value)} />

          <div>
            <label className="block text-sm mb-2" htmlFor="image">Image</label>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
          </div>

          <div className="flex gap-2 mt-4">
            <Button color="secondary" onPress={onClose}>
              Cancel
            </Button>

            <Button
              color="primary"
              onPress={async () => {
                if (!id) return alert("Please enter a service ID");
                const svc = await onCreate(id.trim(), coach, file);
                if (svc) {
                  setId("");
                  setCoach("");
                  setFile(null);
                  onClose();
                }
              }}
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
