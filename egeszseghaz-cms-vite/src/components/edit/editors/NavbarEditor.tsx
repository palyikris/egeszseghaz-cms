/* eslint-disable prettier/prettier */
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";

import { useEditMode } from "@/context/edit/edit";
import { NavbarSchema } from "@/templates/home/home_schema";
import { colorMap } from "@/types/edit";

export function NavbarEditor() {
  const { draft, updateDraft } = useEditMode();
  const navbar: NavbarSchema | undefined = draft.navbar as NavbarSchema;

  const handleChange = (path: string, value: any) =>
    updateDraft(`navbar.${path}`, value);

  const updateLink = (idx: number, key: string, value: any) =>
    handleChange(`links.${idx}.${key}`, value);

  const addLink = () => {
    const current = navbar?.links || [];
    const next = [...current, { label: "Új link", href: "/", color: "primary-dark" }];
    handleChange("links", next);
  };

  const removeLink = (idx: number) => {
    const current = navbar?.links || [];
    const next = current.filter((_, i) => i !== idx);
    handleChange("links", next);
  };

  return (
    <div className="p-4 space-y-4 text-sm">
      <h3 className="font-semibold">Navigáció</h3>

      <div>
        <Input
          label="Title"
          type="text"
          value={navbar?.title?.text ?? "Egészségház"}
          onChange={(e) => handleChange("title.text", e.target.value)}
        />
      </div>

      <div>
        <Select
          label="Title Color"
          selectedKeys={[navbar?.title?.color]}
          onSelectionChange={(e) => handleChange("title.color", e.currentKey)}
          endContent={
            <span
              className={`px-[10px] py-[1px] bg-${navbar?.title?.color} rounded-full`}
            />
          }
        >
          {colorMap.map((c) => (
            <SelectItem key={c.name}>{c.name}</SelectItem>
          ))}
        </Select>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Links</h4>
        {(navbar?.links || []).map((l, idx) => (
          <div
            key={idx}
            className="grid grid-cols-12 gap-2 mb-2 items-center border border-border p-2 rounded-lg"
          >
            <div className="col-span-12">
              <Input
                label={`Felirat ${idx + 1}`}
                type="text"
                value={l.label}
                onChange={(e) => updateLink(idx, "label", e.target.value)}
              />
            </div>
            <div className="col-span-12">
              <Input
                label={`Hivatkozás ${idx + 1}`}
                type="text"
                value={l.href}
                onChange={(e) => updateLink(idx, "href", e.target.value)}
              />
            </div>
            <div className="col-span-12">
              <Select
                label="Szín"
                selectedKeys={[l.color]}
                onSelectionChange={(e) =>
                  updateLink(idx, "color", e.currentKey)
                }
                endContent={
                  <span
                    className={`px-[10px] py-[1px] bg-${l.color} rounded-full`}
                  />
                }
              >
                {colorMap.map((c) => (
                  <SelectItem key={c.name}>{c.name}</SelectItem>
                ))}
              </Select>
            </div>
            <div className="col-span-12 flex items-end">
              <Button
                color="error"
                variant="ghost"
                onPress={() => removeLink(idx)}
              >
                Törlés
              </Button>
            </div>
          </div>
        ))}

        <div className="mt-4">
          <Button onPress={addLink} color="primary">
            Link hozzáadása
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NavbarEditor;
