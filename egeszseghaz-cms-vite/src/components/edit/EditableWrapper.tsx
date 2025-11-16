/* eslint-disable prettier/prettier */
import { useEditMode } from "@/context/edit/edit";
import { cn } from "@/lib/utils";

interface EditableWrapperProps {
  id: string;
  children: React.ReactNode;
}

export function EditableWrapper({ id, children }: EditableWrapperProps) {
  const { isEditMode, selectedId, setSelectedId } = useEditMode();
  const isSelected = selectedId === id;

  if (!isEditMode) return <>{children}</>;

  return (
    <button
      className={cn(
        "relative transition-all",
        "hover:outline-2 hover:outline-accent/60 hover:cursor-pointer w-full",
        isSelected && "outline-2 outline-accent"
      )}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedId(isSelected ? null : id);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          e.stopPropagation();
          setSelectedId(isSelected ? null : id);
        }
      }}
    >
      {children}
    </button>
  );
}
