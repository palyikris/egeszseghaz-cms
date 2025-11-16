/* eslint-disable prettier/prettier */
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";

import { useEditMode } from "@/context/edit/edit";
import { ReviewsSchema } from "@/templates/home/home_schema";
import { colorMap } from "@/types/edit";
import { Button } from "@heroui/button";

export function ReviewsEditor() {
  const { draft, updateDraft } = useEditMode();
  const reviews: ReviewsSchema = draft.reviews || {};

  const handleChange = (path: string, value: any) =>
    updateDraft(`reviews.${path}`, value);

  const updateCard = (path: string, value: any) =>
    handleChange(`card.${path}`, value);

  return (
    <div className="p-4 space-y-4 text-sm relative">
      <h3 className="font-semibold">Reviews section</h3>

      <div>
        <Input
          label="Heading"
          type="text"
          value={reviews.heading?.text ?? ""}
          onChange={(e) => handleChange("heading.text", e.target.value)}
        />
      </div>

      <div>
        <Select
          label="Heading Color"
          selectedKeys={[reviews.heading?.color]}
          endContent={
            <span className={`px-[10px] py-[1px] bg-${reviews.heading?.color} rounded-full`} />
          }
          onSelectionChange={(e) => handleChange("heading.color", e.currentKey)}
        >
          {colorMap.map((c) => (
            <SelectItem key={c.name}>{c.name}</SelectItem>
          ))}
        </Select>
      </div>

      <hr />

      <h4 className="font-semibold">Spinning Text</h4>
      <div>
        <Textarea
          label="Spinning Text"
          value={reviews.spinningText?.text ?? ""}
          onChange={(e) => handleChange("spinningText.text", e.target.value)}
        />
      </div>
      <div>
        <Select
          label="Spinning Text Color"
          selectedKeys={[reviews.spinningText?.color]}
          endContent={
            <span className={`px-[10px] py-[1px] bg-${reviews.spinningText?.color} rounded-full`} />
          }
          onSelectionChange={(e) => handleChange("spinningText.color", e.currentKey)}
        >
          {colorMap.map((c) => (
            <SelectItem key={c.name}>{c.name}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Input
            label="Spinning Radius"
            type="number"
            value={reviews.spinningText?.radius.toString() ?? "15"}
            onChange={(e) => handleChange("spinningText.radius", Number(e.target.value))}
          />
        </div>
        <div>
          <Input
            label="Spinning Duration"
            type="number"
            value={reviews.spinningText?.duration.toString() ?? "40"}
            onChange={(e) => handleChange("spinningText.duration", Number(e.target.value))}
          />
        </div>
      </div>

      <hr />

      <h4 className="font-semibold">Card</h4>
      <div>
        <Select
          label="Card Background"
          selectedKeys={[reviews.card?.bgColor]}
          endContent={
            <span className={`px-[10px] py-[1px] bg-${reviews.card?.bgColor} rounded-full`} />
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
          selectedKeys={[reviews.card?.borderColor]}
          endContent={
            <span className={`px-[10px] py-[1px] bg-${reviews.card?.borderColor} rounded-full`} />
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
          label="Card Text Color"
          selectedKeys={[reviews.card?.textColor]}
          endContent={
            <span className={`px-[10px] py-[1px] bg-${reviews.card?.textColor} rounded-full`} />
          }
          onSelectionChange={(e) => updateCard("textColor", e.currentKey)}
        >
          {colorMap.map((c) => (
            <SelectItem key={c.name}>{c.name}</SelectItem>
          ))}
        </Select>
      </div>

      <div>
        <Input
          label="Star Color (hex or token)"
          type="text"
          value={reviews.card?.starColor ?? ""}
          onChange={(e) => updateCard("starColor", e.target.value)}
        />
      </div>

      <div>
        <Input
          label="Star Size (px)"
          type="number"
          value={reviews.card?.size ?? 6}
          onChange={(e) => updateCard("size", Number(e.target.value))}
        />
      </div>

      <div>
        <Select
          label="Author Color"
          selectedKeys={[reviews.card?.authorColor]}
          endContent={
            <span className={`px-[10px] py-[1px] bg-${reviews.card?.authorColor} rounded-full`} />
          }
          onSelectionChange={(e) => updateCard("authorColor", e.currentKey)}
        >
          {colorMap.map((c) => (
            <SelectItem key={c.name}>{c.name}</SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
}

export default ReviewsEditor;
