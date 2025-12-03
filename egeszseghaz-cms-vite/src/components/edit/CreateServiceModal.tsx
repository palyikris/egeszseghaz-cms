/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import type { Service } from "@/types/services";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (
    id: string,
    coach: string,
    file: File | null
  ) => Promise<Service | null>;
};

export default function CreateServiceModal({ open, onClose, onCreate }: Props) {
  const [id, setId] = useState("");
  const [coach, setCoach] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* BACKDROP */}
      <button
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* MODAL */}
      <div
        className="
          relative w-full max-w-lg rounded-xl 
          bg-white dark:bg-surface 
          shadow-xl animate-scale-in 
          border border-border/50
        "
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-5 border-b border-border/60">
          <h3 className="text-lg font-semibold text-primary dark:text-primary-light">
            Create New Service
          </h3>

          <button
            onClick={onClose}
            className="
              p-2 rounded-md 
              hover:bg-primary/10 active:scale-95
              text-textSecondary dark:text-textSecondary
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-4">
          <Input
            label="Service Name (ID)"
            variant="bordered"
            value={id}
            onChange={(e: any) => setId(e.target.value)}
          />

          <Input
            label="Coach Name"
            variant="bordered"
            value={coach}
            onChange={(e: any) => setCoach(e.target.value)}
          />

          {/* FILE INPUT */}
          <div>
            <label
              className="text-sm font-medium mb-1 block text-textPrimary dark:text-textPrimary"
              htmlFor="image"
            >
              Image
            </label>

            <label
              className="
                w-full cursor-pointer flex items-center justify-center 
                border border-dashed border-border/70 
                rounded-lg py-10 text-sm
                hover:bg-primary-light/10 transition-colors 
                text-textSecondary dark:text-textSecondary
              "
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              {file ? (
                <span>{file.name}</span>
              ) : (
                <span>Click to upload image</span>
              )}
            </label>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="flat" color="secondary" onPress={onClose}>
              Cancel
            </Button>

            <Button
              color="primary"
              onPress={async () => {
                if (!id.trim()) return alert("Please enter a service ID");

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
