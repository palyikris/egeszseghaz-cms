/* eslint-disable prettier/prettier */
import { useState } from "react";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { nanoid } from "nanoid";

export default function HtmlBlocksEditor({
  blocks,
  onSave,
}: {
  blocks: Array<{ id: string; html: string }>;
  onSave: (updated: Array<{ id: string; html: string }>) => void;
}) {
  const [state, setState] = useState(blocks);

  const updateBlock = (id: string, html: string) => {
    setState((prev) => prev.map((b) => (b.id === id ? { ...b, html } : b)));
  };

  const addBlock = () => {
    setState((prev) => [...prev, { id: nanoid(), html: "<p>Új blokk…</p>" }]);
  };

  const deleteBlock = (id: string) => {
    setState((prev) => prev.filter((b) => b.id !== id));
  };

  const moveBlock = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= state.length) return;
    const arr = [...state];
    [arr[index], arr[newIndex]] = [arr[newIndex], arr[index]];
    setState(arr);
  };

  return (
    <Card
      className="
        p-6 shadow-md 
        border border-primary/20 
        rounded-2xl 
        bg-white/80 backdrop-blur-sm my-8 mx-6
      "
    >
      <h2 className="text-2xl font-semibold mb-4 text-primary-dark">
        HTML blokkok
      </h2>
      <Divider className="mb-6" />

      <div className="space-y-8">
        {state.map((b, i) => (
          <Card
            key={b.id}
            className="
              p-5 rounded-xl border border-primary/20 
              shadow-sm bg-white/90 
              transition-all duration-200 
              hover:shadow-md
            "
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium text-primary-dark/80">
                Blokk #{i + 1}
              </span>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="light"
                  className="text-sm"
                  onPress={() => moveBlock(i, -1)}
                >
                  ↑
                </Button>

                <Button
                  size="sm"
                  variant="light"
                  className="text-sm"
                  onPress={() => moveBlock(i, 1)}
                >
                  ↓
                </Button>

                <Button
                  size="sm"
                  color="danger"
                  variant="flat"
                  className="text-sm"
                  onPress={() => deleteBlock(b.id)}
                >
                  Törlés
                </Button>
              </div>
            </div>

            {/* Textarea */}
            <textarea
              value={b.html}
              onChange={(e) => updateBlock(b.id, e.target.value)}
              className="
                w-full h-40 p-3 rounded-lg 
                border border-primary/20 
                bg-white shadow-inner
                text-sm leading-relaxed
                focus:outline-none focus:ring-2 focus:ring-secondary/40
                transition-all
              "
            />
          </Card>
        ))}
      </div>

      {/* Footer controls */}
      <div className="mt-10 flex gap-4">
        <Button
          color="primary"
          variant="ghost"
          className="font-medium"
          onPress={addBlock}
        >
          + Új blokk
        </Button>

        <Button
          color="secondary"
          className="font-medium"
          onPress={() => onSave(state)}
        >
          Mentés
        </Button>
      </div>
    </Card>
  );
}
