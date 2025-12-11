/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";
import { nanoid } from "nanoid";

export default function PriceTableEditor({
  rows,
  onSave,
}: {
  rows: Array<{
    id: string;
    label: string;
    price: string;
    description?: string;
  }>;
  onSave: (
    updated: Array<{
      id: string;
      label: string;
      price: string;
      description?: string;
    }>
  ) => void;
}) {
  const [state, setState] = useState(rows);

  useEffect(() => {
    setState(rows);
  }, [rows]);

  const updateRow = (id: string, key: string, value: string) => {
    setState((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [key]: value } : row))
    );
  };

  const addRow = () => {
    setState((prev) => [
      ...prev,
      {
        id: nanoid(),
        label: "Új szolgáltatás",
        price: "0 Ft",
        description: "",
      },
    ]);
  };

  const deleteRow = (id: string) => {
    setState((prev) => prev.filter((r) => r.id !== id));
  };

  const moveRow = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= state.length) return;
    const arr = [...state];
    [arr[index], arr[newIndex]] = [arr[newIndex], arr[index]];
    setState(arr);
  };

  return (
    <Card
      className="
        p-6 shadow-md border border-primary/20 
        rounded-2xl bg-white/80 backdrop-blur-sm my-8 mx-6
      "
    >
      <h2 className="text-2xl font-semibold mb-4 text-primary-dark">
        Ártáblázat
      </h2>
      <Divider className="mb-6" />

      <div className="space-y-8">
        {state.map((row, i) => (
          <Card
            key={row.id}
            className="
              p-5 rounded-xl border border-primary/20 
              shadow-sm bg-white/90 
              transition-all duration-200 
              hover:shadow-md hover:-translate-y-[2px]
            "
          >
            {/* Header row */}
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium text-primary-dark/80">
                Elem #{i + 1}
              </span>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="light"
                  onPress={() => moveRow(i, -1)}
                >
                  ↑
                </Button>
                <Button size="sm" variant="light" onPress={() => moveRow(i, 1)}>
                  ↓
                </Button>
                <Button
                  size="sm"
                  color="danger"
                  variant="flat"
                  onPress={() => deleteRow(row.id)}
                >
                  Törlés
                </Button>
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Input
                label="Megnevezés"
                value={row.label}
                onChange={(e) => updateRow(row.id, "label", e.target.value)}
                className="text-sm"
              />

              <Input
                label="Ár"
                value={row.price}
                onChange={(e) => updateRow(row.id, "price", e.target.value)}
                className="text-sm"
              />
            </div>

            <Input
              label="Leírás (opcionális)"
              value={row.description || ""}
              onChange={(e) => updateRow(row.id, "description", e.target.value)}
              className="text-sm"
            />
          </Card>
        ))}
      </div>

      {/* Footer actions */}
      <div className="mt-10 flex gap-4">
        <Button
          color="primary"
          variant="ghost"
          className="font-medium"
          onPress={addRow}
        >
          + Új ár
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
