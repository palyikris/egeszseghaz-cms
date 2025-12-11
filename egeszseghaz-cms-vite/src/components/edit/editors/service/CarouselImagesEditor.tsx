/* eslint-disable prettier/prettier */
import { useState, useRef, useEffect } from "react";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Spinner } from "@heroui/spinner";
import { deleteImageFromFirebase, uploadImageToFirebase } from "@/lib/media";
import CustomLoader from "@/components/loader";

export default function CarouselImagesEditor({
  images,
  onSave,
}: {
  images: Array<{
    url: string;
    name: string;
  }>;
  onSave: (
    updated: Array<{
      url: string;
      name: string;
    }>
  ) => void;
}) {
  const [state, setState] = useState(images);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setState(images);
  }, [images]);

  const handleUpload = async (file: File) => {
    setLoading(true);
    try {
      const { url, name } = await uploadImageToFirebase(file);

      setState((prev) => [...prev, { url, name }]);
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (name: string) => {
    setLoading(true);
    try {
      await deleteImageFromFirebase(name);
      setState((prev) => prev.filter((u) => u.name !== name));
    } finally {
      setLoading(false);
    }
  };

  const moveImage = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;

    if (newIndex < 0 || newIndex >= state.length) return;

    const arr = [...state];

    [arr[index], arr[newIndex]] = [arr[newIndex], arr[index]];
    setState(arr);
  };

  if (loading) {
    return (
      <Card className="p-6 shadow-md border border-primary/20 rounded-2xl my-8 mx-4">
        <h2 className="text-2xl font-semibold mb-4 text-primary-dark">Képek</h2>
        <CustomLoader />
      </Card>
    );
  }

  return (
    <Card className="p-6 shadow-md border border-primary/20 rounded-2xl my-8 mx-6">
      <h2 className="text-2xl font-semibold mb-4 text-primary-dark">Képek</h2>
      <Divider className="mb-6" />

      {/* Hidden input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
        }}
      />

      {/* Images list */}
      <div className="grid grid-cols-3 gap-6 mt-10">
        {/* Upload card */}
        <button
          onClick={() => inputRef.current?.click()}
          className="cursor-pointer h-full rounded-xl border-2 border-dashed border-primary/40 bg-white/40 backdrop-blur-sm flex flex-col items-center justify-center text-primary-dark hover:border-primary hover:bg-white/60 transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-10 h-10 mb-2 opacity-70"
          >
            <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
            <polyline points="7 9 12 4 17 9" />
            <line x1="12" y1="4" x2="12" y2="16" />
          </svg>

          <p className="font-medium opacity-80">Kép feltöltése</p>
        </button>
        {state.map((image, i) => (
          <Card
            key={image.url + image.name}
            className="
              p-3 rounded-xl border shadow-sm 
              bg-white/80 backdrop-blur-sm
              transition-all duration-200 hover:shadow-md
              grid-cols-1
            "
          >
            <div className="overflow-hidden rounded-lg h-64 mb-3">
              <img
                src={image.url}
                className="w-full h-full object-contain"
                alt=""
              />
            </div>

            <div className="flex justify-between items-center gap-2 border-t border-primary-dark/30 pt-2">
              <Button
                size="sm"
                variant="light"
                onPress={() => moveImage(i, -1)}
                disabled={loading}
              >
                ↑
              </Button>

              <Button
                size="sm"
                variant="light"
                onPress={() => moveImage(i, 1)}
                disabled={loading}
              >
                ↓
              </Button>

              <Button
                size="sm"
                color="danger"
                variant="flat"
                onPress={() => deleteImage(image.name)}
                disabled={loading}
              >
                Törlés
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Save */}
      <div className="mt-10 flex">
        <Button
          color="secondary"
          className="font-medium"
          disabled={loading}
          onPress={() => {
            onSave(state);
          }}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <Spinner size="sm" color="current" />
              Mentés...
            </div>
          ) : (
            "Mentés"
          )}
        </Button>
      </div>
    </Card>
  );
}
