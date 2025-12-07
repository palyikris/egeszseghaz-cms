/* eslint-disable prettier/prettier */
import { Button } from "@heroui/button";

import { useEditMode } from "@/context/edit/edit";
import { useState } from "react";
import { Chip } from "@heroui/chip";
import { usePublishSite } from "@/hooks/usePublishSite";
import { useQueryClient } from "@tanstack/react-query";

export function EditToolbar() {
  const {
    isEditMode,
    undo,
    redo,
    setIsEditMode,
    toggleEditMode,
    draftStatus,
    setDraftStatus,
    draft,
  } = useEditMode();
  const [isTop, setIsTop] = useState(true);
  const publish = usePublishSite();
  const queryClient = useQueryClient();

  return (
    <div
      className={`fixed w-full flex justify-center items-center z-[9999] py-4 transition all duration-300 ease-in-out ${isTop ? "top-0" : "bottom-0"} left-0 pointer-events-none transform ${
        isEditMode ? "opacity-100" : "opacity-0 -translate-y-3"
      }`}
    >
      <div className="flex items-center gap-4 bg-primary-dark/90 text-white px-10 py-2 rounded-2xl shadow-lg backdrop-blur-sm pointer-events-auto">
        <div className="font-semibold tracking-wide text-sm mr-2">
          <span className="text-center mr-2">Szerkesztő mód</span>
          <Chip
            size="sm"
            color="primary"
            className={`border border-${draftStatus === "Vázlat" ? "accent" : draftStatus === "Közzététel..." ? "error" : "success"} bg-${draftStatus === "Vázlat" ? "accent" : draftStatus === "Közzététel..." ? "error" : "success"} text-text-primary`}
          >
            {draftStatus}
          </Chip>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-accent hover:text-white ml-10"
          onPress={undo}
        >
          Visszavonás
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-accent hover:text-white"
          onPress={redo}
        >
          Újra
        </Button>
        <Button
          variant="solid"
          size="sm"
          className="bg-accent text-primary-dark hover:bg-accent/80"
          onPress={async () => {
            setDraftStatus("Közzététel...");
            await publish.mutateAsync(
              {
                pageId: "home",
                publishedContent: draft,
              },
              {
                onSuccess: async () => {
                  queryClient.invalidateQueries({ queryKey: ["page", "home"] });
                  setIsEditMode(false);
                  setDraftStatus("Közzétéve");
                  setTimeout(() => {
                    window.location.reload();
                  }, 1000);
                },
              }
            );
          }}
        >
          Közzététel
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:text-accent ml-10"
          onPress={toggleEditMode}
          color="secondary"
        >
          Kilépés
        </Button>
        <button
          className="border p-1 px-3 rounded-[5px] cursor-pointer border-border"
          onClick={() => {
            setIsTop(!isTop);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M6.97 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L8.25 4.81V16.5a.75.75 0 0 1-1.5 0V4.81L3.53 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5Zm9.53 4.28a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V7.5a.75.75 0 0 1 .75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
