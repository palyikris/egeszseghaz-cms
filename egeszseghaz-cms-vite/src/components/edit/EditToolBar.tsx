/* eslint-disable prettier/prettier */
import { Button } from "@heroui/button";

import { useEditMode } from "@/context/edit/edit";

export function EditToolbar() {
  const { isEditMode, undo, redo, toggleEditMode } = useEditMode();


  return (
    <div className="fixed w-full flex justify-center items-center z-[9999] py-4">
      <div
        style={{
          display: isEditMode ? "flex" : "none",
        }}
        className="flex items-center gap-4 bg-primary-dark/90 text-white px-10 py-2 rounded-2xl shadow-lg backdrop-blur-sm"
      >
        <span className="font-semibold tracking-wide text-sm mr-2">
          Edit Mode
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="text-accent hover:text-white"
          onPress={undo}
        >
          Undo
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-accent hover:text-white"
          onPress={redo}
        >
          Redo
        </Button>
        <Button
          variant="solid"
          size="sm"
          className="bg-accent text-primary-dark hover:bg-accent/80"
          onPress={() => alert("Publish coming soon")}
        >
          Publish
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:text-accent"
          onPress={toggleEditMode}
        >
          Exit
        </Button>
      </div>
    </div>
  );
}
