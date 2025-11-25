/* eslint-disable prettier/prettier */
import { useIsUserAuthenticated } from "@/hooks/useIsUserAuthenticated";
import { useAnnouncement } from "@/hooks/useAnnouncement";
import { setAtPath } from "@/lib/edit";
import React, { createContext, useContext, useEffect, useState } from "react";


type DraftStatus = "Draft" | "Published" | "Publishing...";

interface AnnouncementEditContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
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

const AnnouncementEditContext = createContext<AnnouncementEditContextType | null>(null);

export const AnnouncementEditProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [draft, setDraft] = useState<Record<string, any>>({});
  const [undoStack, setUndoStack] = useState<Record<string, any>[]>([]);
  const [redoStack, setRedoStack] = useState<Record<string, any>[]>([]);
  const [draftStatus, setDraftStatus] = useState<DraftStatus>("Draft");

  const { data: isAuthed, isLoading } = useIsUserAuthenticated();
  const announcement = useAnnouncement();

  const toggleEditMode = () => {
    if (!isEditMode && announcement.data) {
      setDraft(announcement.data || {});
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
    <AnnouncementEditContext.Provider
      value={{
        isEditMode,
        toggleEditMode,
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
    </AnnouncementEditContext.Provider>
  );
};

export const useAnnouncementEdit = () => {
  const ctx = useContext(AnnouncementEditContext)

  if (!ctx) throw new Error("useAnnouncementEdit must be used within AnnouncementEditProvider")
  
  return ctx
}
