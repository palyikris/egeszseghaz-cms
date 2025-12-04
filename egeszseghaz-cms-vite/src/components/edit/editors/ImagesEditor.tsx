/* eslint-disable prettier/prettier */
import React, { useRef } from "react";
import { Trash2, Upload } from "lucide-react";
import { Button } from "@heroui/button";

import CustomLoader from "@/components/loader";
import { useImages } from "@/hooks/useImages";
import { useUploadImage } from "@/hooks/useUploadImage";
import { useDeleteImage } from "@/hooks/useDeleteImage";

export default function ImagesEditor() {
  const { data: images, isLoading } = useImages();
  const upload = useUploadImage();
  const remove = useDeleteImage();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const chooseFile = () => inputRef.current?.click();

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      await upload.mutateAsync({ file: files[i] });
    }

    if (inputRef.current) inputRef.current.value = "";
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleFiles(e.target.files);

  const handleDelete = async (name: string) => {
    if (!confirm("Biztosan törlöd ezt a képet?")) return;
    await remove.mutateAsync({ name });
  };

  return (
    <div className="w-full mx-auto max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Képek</h2>
      </div>

      {isLoading && (
        <div className="py-8">
          <CustomLoader />
        </div>
      )}

      {!isLoading && images && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* --- UPLOAD CARD --- */}
          <button
            className="
              group relative rounded-xl border-2 border-dashed border-primary-light
              h-[340px] flex flex-col items-center justify-center cursor-pointer
              hover:border-primary transition-colors bg-white shadow-sm
            "
            onClick={chooseFile}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={onFileChange}
            />

            <Upload className="size-10 text-primary mb-3 opacity-80 group-hover:opacity-100 transition-opacity" />
            <p className="text-primary font-medium">Kép feltöltése</p>

            {upload.isPending && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur">
                <CustomLoader />
              </div>
            )}
          </button>

          {/* --- EXISTING IMAGES --- */}
          {images.map((img: any) => (
            <div
              key={img.name}
              className="
                group relative rounded-xl overflow-hidden shadow-md bg-surface border border-border
                transition-transform hover:scale-[1.01]
              "
            >
              <div className="relative w-full h-[340px] bg-muted">
                <img
                  alt={img.name}
                  src={img.url}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlay */}
              <div
                className="
                  absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100
                  transition-opacity flex flex-col justify-between p-4
                "
              >
                <p className="text-white text-sm truncate">{img.name}</p>

                <div className="flex justify-end">
                  <Button
                    color="danger"
                    variant="solid"
                    className="h-10 w-10 rounded-md p-0 backdrop-blur-md"
                    onPress={() => handleDelete(img.name)}
                  >
                    <Trash2 className="size-4 text-white" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
