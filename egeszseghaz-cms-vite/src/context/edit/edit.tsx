/* eslint-disable prettier/prettier */
import { useIsUserAuthenticated } from "@/hooks/useIsUserAuthenticated";
import { usePage } from "@/hooks/usePage";
import { setAtPath } from "@/lib/edit";
import React, { createContext, useContext, useEffect, useState } from "react";


type DraftStatus = "Draft" | "Published" | "Publishing...";

interface EditModeContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  draft: Record<string, any>;
  setDraft: (draft: Record<string, any>) => void;
  updateDraft: (key: string, value: any) => void;
  undo: () => void;
  redo: () => void;
  undoStack: Record<string, any>[];
  redoStack: Record<string, any>[];
  setIsEditMode: (value: boolean) => void;
  draftStatus: DraftStatus;
  setDraftStatus: (status: DraftStatus) => void;
}

const EditModeContext = createContext<EditModeContextType | null>(null);

export const EditModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [draft, setDraft] = useState<Record<string, any>>({});
  const [undoStack, setUndoStack] = useState<Record<string, any>[]>([]);
  const [redoStack, setRedoStack] = useState<Record<string, any>[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draftStatus, setDraftStatus] = useState<DraftStatus>("Draft");

  const { data: isAuthed, isLoading } = useIsUserAuthenticated();
  const page = usePage("home");

  const toggleEditMode = () => {
    if (!isEditMode && page.data) {
      // Only initialize the draft from the fetched page when the draft
      // is currently empty. This prevents overwriting a draft we've just
      // populated after publishing (which can happen if the provider's
      // `page.data` hasn't updated synchronously yet).
      if (page.data !== draft) {
        console.log(page.data.hero.mainImageUrl);
        setDraft(page.data || {});
      }
    }
    setIsEditMode((prev) => !prev);
  };

  const updateDraft = (key: string, value: any) => {
    setUndoStack((prev) => [...prev, draft]);

    setDraft((prev) => setAtPath(prev, key, value));
    setRedoStack([]);
  };

  const undo = () => {
    if (undoStack.length > 0) {
      const last = undoStack.pop()!;

      setRedoStack((prev) => [...prev, draft]);
      setDraft(last);
      setUndoStack([...undoStack]);
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const next = redoStack.pop()!;

      setUndoStack((prev) => [...prev, draft]);
      setDraft(next);
      setRedoStack([...redoStack]);
    }
  };

  useEffect(() => {
    if (draftStatus === "Published") {
    }
  }, [draftStatus]);

  // ⌨️ Keyboard listener (press "e" to toggle)
  useEffect(() => {
    if (isLoading) return;

    if (!isAuthed) {
      setIsEditMode(false);

      return;
    }

    const handleKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "e" && !e.metaKey && !e.ctrlKey) {
        if (!isEditMode) {
          toggleEditMode();
          setDraftStatus("Draft");

          return;
        }
        if (isEditMode) {
          console.log("Already in edit mode");
        }
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [isAuthed, isLoading]);

  return (
    <EditModeContext.Provider
      value={{
        isEditMode,
        toggleEditMode,
        selectedId,
        setSelectedId,
        draft,
        setDraft,
        updateDraft,
        undo,
        redo,
        undoStack,
        redoStack,
        setIsEditMode,
        draftStatus,
        setDraftStatus,
      }}
    >
      {children}
    </EditModeContext.Provider>
  );
};

export const useEditMode = () => {
  const ctx = useContext(EditModeContext)

  if (!ctx) throw new Error("useEditMode must be used within EditModeProvider")
  
  return ctx
}
