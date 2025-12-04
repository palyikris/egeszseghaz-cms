/* eslint-disable prettier/prettier */
import { useNewService } from "@/hooks/useNewService";
import { setAtPath } from "@/lib/edit";
import React, { createContext, useContext, useEffect, useState } from "react";

type DraftStatus = "Vázlat" | "Közzétéve" | "Közzététel...";

interface NewServiceEditContextType {
  draft: Record<string, any>;
  setDraft: (draft: Record<string, any>) => void;
  updateDraft: (key: string, value: any) => void;
  undo: () => void;
  redo: () => void;
  undoStack: Record<string, any>[];
  redoStack: Record<string, any>[];
  draftStatus: DraftStatus;
  setDraftStatus: (status: DraftStatus) => void;
}

const NewServiceEditContext = createContext<NewServiceEditContextType | null>(
  null
);

export const NewServiceEditProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [draft, setDraft] = useState<Record<string, any>>({});
  const [undoStack, setUndoStack] = useState<Record<string, any>[]>([]);
  const [redoStack, setRedoStack] = useState<Record<string, any>[]>([]);
  const [draftStatus, setDraftStatus] = useState<DraftStatus>("Vázlat");

  const newService = useNewService();

  useEffect(() => {
    if (newService.data) {
      setDraft((prev) => {
        if (!prev || Object.keys(prev).length === 0) {
          return newService.data;
        }

        return prev;
      });
    }
  }, [newService.data]);

  const updateDraft = (key: string, value: any) => {
    setUndoStack((prev) => [...prev, draft]);

    setDraft((prev) => setAtPath(prev, key, value));
    setRedoStack([]);

    if (draftStatus !== "Vázlat") {
      setDraftStatus("Vázlat");
    }
  };

  const undo = () => {
    if (undoStack.length > 0) {
      const last = undoStack.pop()!;

      setRedoStack((prev) => [...prev, draft]);
      setDraft(last);
      setUndoStack([...undoStack]);
    }

    if (draftStatus !== "Vázlat") {
      setDraftStatus("Vázlat");
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const next = redoStack.pop()!;

      setUndoStack((prev) => [...prev, draft]);
      setDraft(next);
      setRedoStack([...redoStack]);
    }

    if (draftStatus !== "Vázlat") {
      setDraftStatus("Vázlat");
    }
  };

  return (
    <NewServiceEditContext.Provider
      value={{
        draft,
        setDraft,
        updateDraft,
        undo,
        redo,
        undoStack,
        redoStack,
        draftStatus,
        setDraftStatus,
      }}
    >
      {children}
    </NewServiceEditContext.Provider>
  );
};

export const useNewServiceEdit = () => {
  const ctx = useContext(NewServiceEditContext);

  if (!ctx)
    throw new Error(
      "useNewServiceEdit must be used within NewServiceEditProvider"
    );

  return ctx;
};
