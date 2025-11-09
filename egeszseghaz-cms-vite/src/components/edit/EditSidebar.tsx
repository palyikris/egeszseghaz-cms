/* eslint-disable prettier/prettier */
import { useEditMode } from "@/context/edit/edit";
import { HeroEditor } from "./editors/HomeEditor";

export function EditSidebar() {
  const { isEditMode, selectedId } = useEditMode();

  if (!isEditMode || !selectedId) return null;

  const componentMap: Record<string, React.ReactNode> = {
    // Here you can map selectedId to specific editor components
    // For example:
    // hero: <HeroEditor draft={draft} updateDraft={updateDraft} />,
    hero: <HeroEditor />,
  };

  const editorComponent = componentMap[selectedId];

  return (
    <div className="fixed top-0 right-0 h-full w-1/3 border-l border-border shadow-xl z-[10000] flex flex-col p-4 max-h-screen overflow-y-scroll">
      <h2 className="text-lg font-semibold text-primary-dark mb-2 border-b border-primary-dark">
        Edit Component: {selectedId.toUpperCase()}
      </h2>
      <div className="fixed -z-1 backdrop-blur-md bg-primary-light/80 w-1/3 right-0 h-full top-0" />
      {editorComponent}
    </div>
  );
}
