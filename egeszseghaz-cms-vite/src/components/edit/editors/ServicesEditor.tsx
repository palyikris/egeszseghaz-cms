/* eslint-disable prettier/prettier */
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";

import { useEditMode } from "@/context/edit/edit";
import { ServicesSchema } from "@/templates/home/home_schema";
import { colorMap } from "@/types/edit";
import { Button } from "@heroui/button";

export function ServicesEditor() {
  const { draft, updateDraft } = useEditMode();
  const services: ServicesSchema = draft.services || {};

  const handleChange = (path: string, value: any) =>
    updateDraft(`services.${path}`, value);

  const updateCard = (path: string, value: any) =>
    handleChange(`card.${path}`, value);

  return (
    <div className="p-4 space-y-4 text-sm relative">
      <h3 className="font-semibold">Services section</h3>

      <div>
        <Input
          label="Heading"
          type="text"
          value={services.heading?.text ?? ""}
          onChange={(e) => handleChange("heading.text", e.target.value)}
        />
      </div>

      <div>
        <Select
          label="Heading Color"
          selectedKeys={[services.heading?.color]}
          endContent={
            <span
              className={`px-[10px] py-[1px] bg-${services.heading?.color} rounded-full`}
            />
          }
          onSelectionChange={(e) => handleChange("heading.color", e.currentKey)}
        >
          {colorMap.map((c) => (
            <SelectItem key={c.name}>{c.name}</SelectItem>
          ))}
        </Select>
      </div>

      <hr className="mt-6"/>

      <h4 className="font-semibold">Card</h4>
      <div>
        <Input
          label="Card Button Label"
          type="text"
          value={services.card?.button?.label ?? ""}
          onChange={(e) => updateCard("button.label", e.target.value)}
        />
      </div>

      <div>
        <Select
          label="Card Heading Color"
          selectedKeys={[services.card?.heading?.color]}
          endContent={
            <span
              className={`px-[10px] py-[1px] bg-${services.card?.heading?.color} rounded-full`}
            />
          }
          onSelectionChange={(e) => updateCard("heading.color", e.currentKey)}
        >
          {colorMap.map((c) => (
            <SelectItem key={c.name}>{c.name}</SelectItem>
          ))}
        </Select>
      </div>

      <div>
        <Select
          label="Card Heading Hover Color"
          selectedKeys={[services.card?.heading?.hoverColor]}
          endContent={
            <span
              className={`px-[10px] py-[1px] bg-${services.card?.heading?.hoverColor} rounded-full`}
            />
          }
          onSelectionChange={(e) => updateCard("heading.hoverColor", e.currentKey)}
        >
          {colorMap.map((c) => (
            <SelectItem key={c.name}>{c.name}</SelectItem>
          ))}
        </Select>
      </div>

      <div>
        <Select
          label="Card Background Color"
          selectedKeys={[services.card?.bgColor]}
          endContent={
            <span
              className={`px-[10px] py-[1px] bg-${services.card?.bgColor} rounded-full`}
            />
          }
          onSelectionChange={(e) => updateCard("bgColor", e.currentKey)}
        >
          {colorMap.map((c) => (
            <SelectItem key={c.name}>{c.name}</SelectItem>
          ))}
        </Select>
      </div>

      <div>
        <Select
          label="Card Border Color"
          selectedKeys={[services.card?.borderColor]}
          endContent={
            <span
              className={`px-[10px] py-[1px] bg-${services.card?.borderColor} rounded-full`}
            />
          }
          onSelectionChange={(e) => updateCard("borderColor", e.currentKey)}
        >
          {colorMap.map((c) => (
            <SelectItem key={c.name}>{c.name}</SelectItem>
          ))}
        </Select>
      </div>

      <div>
        <Select
          label="Card Hover Border Color"
          selectedKeys={[services.card?.hoverBorderColor]}
          endContent={
            <span
              className={`px-[10px] py-[1px] bg-${services.card?.hoverBorderColor} rounded-full`}
            />
          }
          onSelectionChange={(e) => updateCard("hoverBorderColor", e.currentKey)}
        >
          {colorMap.map((c) => (
            <SelectItem key={c.name}>{c.name}</SelectItem>
          ))}
        </Select>
      </div>

      <div>
        {/* <Input
          label="Card Shadow"
          type="text"
          value={services.card?.shadow ?? ""}
          onChange={(e) => updateCard("shadow", e.target.value)}
        /> */}

        <Select
          label="Card Shadow"
          selectedKeys={[services.card?.shadow]}
          onSelectionChange={(e) => updateCard("shadow", e.currentKey)}
        >
          <SelectItem key="sm">sm</SelectItem>
          <SelectItem key="md">md</SelectItem>
          <SelectItem key="lg">lg</SelectItem>
          <SelectItem key="xl">xl</SelectItem>
          <SelectItem key="2xl">2xl</SelectItem>
          <SelectItem key="none">none</SelectItem>
        </Select>
      </div>

      <div>
        <Select
          label="Card Shadow Color"
          selectedKeys={[services.card?.shadowColor]}
          endContent={
            <span
              className={`px-[10px] py-[1px] bg-${services.card?.shadowColor} rounded-full`}
            />
          }
          onSelectionChange={(e) => updateCard("shadowColor", e.currentKey)}
        >
          {colorMap.map((c) => (
            <SelectItem key={c.name}>{c.name}</SelectItem>
          ))}
        </Select>
      </div>

      <div>
        <Select
          label="Card Rounded"
          selectedKeys={[services.card?.rounded]}
          onSelectionChange={(e) => updateCard("rounded", e.currentKey)}
        >
          <SelectItem key="none">none</SelectItem>
          <SelectItem key="sm">sm</SelectItem>
          <SelectItem key="md">md</SelectItem>
          <SelectItem key="lg">lg</SelectItem>
          <SelectItem key="xl">xl</SelectItem>
          <SelectItem key="2xl">2xl</SelectItem>
          <SelectItem key="3xl">3xl</SelectItem>
          <SelectItem key="full">full</SelectItem>
        </Select>
      </div>

      <div>
        <Textarea
          label="Hover Overlay Text"
          value={services.card?.hoverOverlay?.text ?? ""}
          onChange={(e) => updateCard("hoverOverlay.text", e.target.value)}
        />
      </div>

      <div>
        <Select
          label="Hover Overlay Text Color"
          selectedKeys={[services.card?.hoverOverlay?.textColor]}
          endContent={
            <span
              className={`px-[10px] py-[1px] bg-${services.card?.hoverOverlay?.textColor} rounded-full`}
            />
          }
          onSelectionChange={(e) => updateCard("hoverOverlay.textColor", e.currentKey)}
        >
          {colorMap.map((c) => (
            <SelectItem key={c.name}>{c.name}</SelectItem>
          ))}
        </Select>
      </div>

      <div>
        <Input
          label="Hover Overlay Backdrop Blur"
          type="text"
          value={services.card?.hoverOverlay?.backdropBlur ?? ""}
          onChange={(e) => updateCard("hoverOverlay.backdropBlur", e.target.value)}
        />
      </div>

      <div>
        <Input
          label="Hover Overlay Text Size"
          type="text"
          value={services.card?.hoverOverlay?.textSize ?? ""}
          onChange={(e) => updateCard("hoverOverlay.textSize", e.target.value)}
        />
      </div>

      <hr />

      <h4 className="font-semibold">Card Button</h4>
      <div>
        <Select
          label="Button Variant"
          selectedKeys={[services.card?.button?.variant]}
          onSelectionChange={(e) => updateCard("button.variant", e.currentKey)}
        >
          <SelectItem key="solid">solid</SelectItem>
          <SelectItem key="ghost">ghost</SelectItem>
        </Select>
      </div>

      <div>
        <Select
          label="Button Color"
          selectedKeys={[services.card?.button?.color]}
          endContent={
            <span
              className={`px-[10px] py-[1px] bg-${services.card?.button?.color} rounded-full`}
            />
          }
          onSelectionChange={(e) => updateCard("button.color", e.currentKey)}
        >
          {colorMap.map((c) => (
            <SelectItem key={c.name}>{c.name}</SelectItem>
          ))}
        </Select>
      </div>

      <div>
        <Input
          label="Button Hover Background"
          type="text"
          value={services.card?.button?.hoverBgColor ?? ""}
          onChange={(e) => updateCard("button.hoverBgColor", e.target.value)}
        />
      </div>
    </div>
  );
}

export default ServicesEditor;
