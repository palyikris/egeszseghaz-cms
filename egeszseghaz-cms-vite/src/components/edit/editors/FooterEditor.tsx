/* eslint-disable prettier/prettier */
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";

import { useEditMode } from "@/context/edit/edit";
import { FooterSchema } from "@/templates/home/home_schema";
import { colorMap } from "@/types/edit";

export function FooterEditor() {
  const { draft, updateDraft } = useEditMode();
  const footer: FooterSchema | undefined = draft.footer as FooterSchema;

  const handleChange = (path: string, value: any) =>
    updateDraft(`footer.${path}`, value);

  const updateSectionLink = (idx: number, key: string, value: any) =>
    handleChange(`sections.links.linkList.${idx}.${key}`, value);

  const addLink = () => {
    const current = footer?.sections.links.linkList || [];
    const next = [...current, { label: "Új link", href: "/" }];
    handleChange("sections.links.linkList", next);
  };

  const removeLink = (idx: number) => {
    const current = footer?.sections.links.linkList || [];
    const next = current.filter((_, i) => i !== idx);
    handleChange("sections.links.linkList", next);
  };

  const updateOpeningHour = (idx: number, key: string, value: any) =>
    handleChange(`sections.openingHours.hours.${idx}.${key}`, value);

  const addOpeningHour = () => {
    const current = footer?.sections.openingHours.hours || [];
    const next = [
      ...current,
      { day: "Új nap", time: "00:00 - 00:00", color: "inherit" },
    ];
    handleChange("sections.openingHours.hours", next);
  };

  const removeOpeningHour = (idx: number) => {
    const current = footer?.sections.openingHours.hours || [];
    const next = current.filter((_, i) => i !== idx);
    handleChange("sections.openingHours.hours", next);
  };

  return (
    <div className="p-4 space-y-4 text-sm">
      <h3 className="font-semibold">Lábléc</h3>

      <div>
        <Select
          label="Szöveg színe"
          selectedKeys={[footer?.textColor]}
          onSelectionChange={(e) => handleChange("textColor", e.currentKey)}
          endContent={
            <span
              className={`px-[10px] py-[1px] bg-${footer?.textColor} rounded-full`}
            />
          }
        >
          {colorMap.map((c) => (
            <SelectItem key={c.name}>{c.name}</SelectItem>
          ))}
        </Select>
      </div>

      <div>
        <Input
          label="Logó címe"
          type="text"
          value={footer?.sections.logo.title.text ?? ""}
          onChange={(e) =>
            handleChange("sections.logo.title.text", e.target.value)
          }
        />
      </div>

      <div>
        {/* <Input
          label="Logo Title Color"
          type="text"
          value={footer?.sections.logo.title.color ?? ""}
          onChange={(e) =>
            handleChange("sections.logo.title.color", e.target.value)
          }
        /> */}
        <Select
          label="Logó cím színe"
          selectedKeys={[footer?.sections.logo.title.color]}
          onSelectionChange={(e) =>
            handleChange("sections.logo.title.color", e.currentKey)
          }
          endContent={
            <span
              className={`px-[10px] py-[1px] bg-${footer?.sections.logo.title.color} rounded-full`}
            />
          }
        >
          {colorMap.map((c) => (
            <SelectItem key={c.name}>{c.name}</SelectItem>
          ))}
        </Select>
      </div>

      <div>
        <Textarea
          label="Logó szlogen"
          value={footer?.sections.logo.tagline.text ?? ""}
          onChange={(e) =>
            handleChange("sections.logo.tagline.text", e.target.value)
          }
        />
      </div>

      <hr className="mt-6" />
      <h4 className="font-semibold">Linkek</h4>

      <div>
        <Input
          label="Links Title"
          type="text"
          value={footer?.sections.links.title.text ?? ""}
          onChange={(e) =>
            handleChange("sections.links.title.text", e.target.value)
          }
        />
      </div>
      <div>
        {(footer?.sections.links.linkList || []).map((l, idx) => (
          <div key={idx} className="grid grid-cols-12 gap-2 mb-2 items-center">
            <div className="col-span-5">
              <Input
                label={`Felirat ${idx + 1}`}
                type="text"
                value={l.label}
                onChange={(e) =>
                  updateSectionLink(idx, "label", e.target.value)
                }
              />
            </div>
            <div className="col-span-5">
              <Input
                label={`Hivatkozás ${idx + 1}`}
                type="text"
                value={l.href}
                onChange={(e) => updateSectionLink(idx, "href", e.target.value)}
              />
            </div>
            <div className="col-span-2 flex items-end">
              <Button
                color="danger"
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

      <hr className="mt-6" />

      <h4 className="font-semibold">Kapcsolat</h4>
      <div>
        <Input
          label="Telefonszám"
          type="text"
          value={footer?.sections.contact.phone.number ?? ""}
          onChange={(e) =>
            handleChange("sections.contact.phone.number", e.target.value)
          }
        />
      </div>
      <div>
        <Input
          label="E-mail"
          type="text"
          value={footer?.sections.contact.email.address ?? ""}
          onChange={(e) =>
            handleChange("sections.contact.email.address", e.target.value)
          }
        />
      </div>
      <div>
        <Textarea
          label="Cím"
          value={footer?.sections.contact.address.text ?? ""}
          onChange={(e) =>
            handleChange("sections.contact.address.text", e.target.value)
          }
        />
      </div>
      <div>
        <Input
          label="Térkép link"
          type="text"
          value={footer?.sections.contact.address.mapLink ?? ""}
          onChange={(e) =>
            handleChange("sections.contact.address.mapLink", e.target.value)
          }
        />
      </div>
      <div>
        <Select
          label="Térkép szöveg színe"
          selectedKeys={[footer?.sections.contact.address.mapTextColor]}
          onSelectionChange={(e) =>
            handleChange("sections.contact.address.mapTextColor", e.currentKey)
          }
          endContent={
            <span
              className={`px-[10px] py-[1px] bg-${footer?.sections.contact.address.mapTextColor} rounded-full`}
            />
          }
        >
          {colorMap.map((c) => (
            <SelectItem key={c.name}>{c.name}</SelectItem>
          ))}
        </Select>
      </div>

      <hr className="mt-6" />

      <h4 className="font-semibold">Nyitvatartás</h4>
      {(footer?.sections.openingHours.hours || []).map((h, idx) => (
        <div key={idx} className="grid grid-cols-12 gap-2 mb-2 items-end">
          <div className="col-span-5">
            <Input
              label={`Nap ${idx + 1}`}
              type="text"
              value={h.day}
              onChange={(e) => updateOpeningHour(idx, "day", e.target.value)}
            />
          </div>
          <div className="col-span-5">
            <Input
              label={`Idő ${idx + 1}`}
              type="text"
              value={h.time}
              onChange={(e) => updateOpeningHour(idx, "time", e.target.value)}
            />
          </div>
          <div className="col-span-2 flex items-center justify-center">
            <Button
              variant="ghost"
              color="danger"
              onPress={() => removeOpeningHour(idx)}
            >
              Törlés
            </Button>
          </div>
        </div>
      ))}

      <div className="mt-4">
        <Button onPress={addOpeningHour} color="primary">
          Nyitvatartás hozzáadása
        </Button>
      </div>
    </div>
  );
}

export default FooterEditor;
