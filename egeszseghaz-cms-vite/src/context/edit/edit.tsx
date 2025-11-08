/* eslint-disable prettier/prettier */
import React, { createContext, useContext, useEffect, useState } from "react"

interface EditModeContextType {
  isEditMode: boolean
  toggleEditMode: () => void
  draft: Record<string, any>
  updateDraft: (key: string, value: any) => void
  undo: () => void
  redo: () => void
  undoStack: Record<string, any>[]
  redoStack: Record<string, any>[]
}

const EditModeContext = createContext<EditModeContextType | null>(null)

export const EditModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [draft, setDraft] = useState<Record<string, any>>({})
  const [undoStack, setUndoStack] = useState<Record<string, any>[]>([])
  const [redoStack, setRedoStack] = useState<Record<string, any>[]>([])

  const toggleEditMode = () => setIsEditMode((prev) => !prev)

  const updateDraft = (key: string, value: any) => {
    setUndoStack((prev) => [...prev, draft])
    setDraft((prev) => ({ ...prev, [key]: value }))
    setRedoStack([])
  }

  const undo = () => {
    if (undoStack.length > 0) {
      const last = undoStack.pop()!

      setRedoStack((prev) => [...prev, draft])
      setDraft(last)
      setUndoStack([...undoStack])
    }
  }

  const redo = () => {
    if (redoStack.length > 0) {
      const next = redoStack.pop()!

      setUndoStack((prev) => [...prev, draft])
      setDraft(next)
      setRedoStack([...redoStack])
    }
  }

  // ⌨️ Keyboard listener (press "e" to toggle)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "e" && !e.metaKey && !e.ctrlKey) {
        toggleEditMode()
      }
    }

    window.addEventListener("keydown", handleKey)

    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  return (
    <EditModeContext.Provider
      value={{
        isEditMode,
        toggleEditMode,
        draft,
        updateDraft,
        undo,
        redo,
        undoStack,
        redoStack,
      }}
    >
      {children}
    </EditModeContext.Provider>
  )
}

export const useEditMode = () => {
  const ctx = useContext(EditModeContext)

  if (!ctx) throw new Error("useEditMode must be used within EditModeProvider")
  
  return ctx
}
