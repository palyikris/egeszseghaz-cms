/* eslint-disable prettier/prettier */

import { useEditMode } from "@/context/edit/edit";
import { HeroSchema } from "@/templates/home/home_schema";
import { Input } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";
import { Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { colorMap } from "@/types/edit";

export function HeroEditor() {
  const { draft, updateDraft } = useEditMode();
  const hero: HeroSchema = draft.hero || {};

  const handleChange = (path: string, value: any) =>
    updateDraft(`hero.${path}`, value);

  return (
    <div className="p-4 space-y-4 text-sm relative">
      {/* Main Image */}
      <div>
        <p className="block font-medium mb-1">Main Image</p>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const url = URL.createObjectURL(file);
              handleChange("mainImageUrl", url);
            }
          }}
        />
        <div className="flex w-full justify-center items-center mt-4">
          <img
            src={hero.mainImageUrl}
            alt=""
            width={200}
            className="rounded-lg"
          />
        </div>
      </div>

      {/* Background Gradient
      <div>
        <h3 className="font-semibold text-primary-dark mb-1">
          Background Gradient
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="block">From</p>
            <Input
              type="color"
              value={hero.bgColor?.from ?? "#ffffff"}
              onChange={(e) => handleChange("bgColor.from", e.target.value)}
            />
          </div>
          <div>
            <p className="block">Via</p>
            <Input
              type="color"
              value={hero.bgColor?.via ?? "#ffffff"}
              onChange={(e) => handleChange("bgColor.via", e.target.value)}
            />
          </div>
          <div>
            <p className="block">To</p>
            <Input
              type="color"
              value={hero.bgColor?.to ?? "#ffffff"}
              onChange={(e) => handleChange("bgColor.to", e.target.value)}
            />
          </div>
          <div>
            <p className="block">Direction</p>
            <select
              value={hero.bgColor?.direction ?? "to-b"}
              onChange={(e) =>
                handleChange("bgColor.direction", e.target.value)
              }
            >
              <option value="to-b">Vertical</option>
              <option value="to-t">Upwards</option>
              <option value="to-r">Right</option>
              <option value="to-l">Left</option>
              <option value="to-tr">Diagonal (↗)</option>
              <option value="to-bl">Diagonal (↙)</option>
            </select>
          </div>
        </div>
      </div> */}

      <hr />

      {/* Headings */}
      <div>
        <h3 className="font-semibold text-primary-dark mb-1">Headings</h3>

        <div className="mb-2">
          <Input
            type="text"
            value={hero.heading?.text ?? ""}
            onChange={(e) => handleChange("heading.text", e.target.value)}
            label="Heading Text"
          />
        </div>

        <div>
          <Select
            selectedKeys={[hero.heading?.color]}
            endContent={
              <span
                className={`px-[10px] py-[1px] bg-${hero.heading?.color} rounded-full`}
              />
            }
            label="Heading Color"
            onSelectionChange={(e) => {
              handleChange("heading.color", e.currentKey);
            }}
          >
            {colorMap.map((color) => (
              <SelectItem key={color.name}>{color.name}</SelectItem>
            ))}
          </Select>
        </div>

        <div className="mt-2">
          <Textarea
            type="text"
            value={hero.subheading?.text ?? ""}
            onChange={(e) => handleChange("subheading.text", e.target.value)}
            label="Subheading Text"
          />
        </div>

        <div className="mt-2">
          <Select
            selectedKeys={[hero.subheading?.color]}
            endContent={
              <span
                className={`px-[10px] py-[1px] bg-${hero.subheading?.color} rounded-full`}
              />
            }
            label="Subheading Color"
            onSelectionChange={(e) => {
              handleChange("subheading.color", e.currentKey);
            }}
          >
            {colorMap.map((color) => (
              <SelectItem key={color.name}>{color.name}</SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <hr className="mt-8" />

      {/* Primary Button */}
      <div>
        <h3 className="font-semibold text-primary-dark mb-1">Primary Button</h3>
        <div className="space-y-1 mt-4">
          <p className="flex items-center gap-2">
            <Checkbox
              type="checkbox"
              isSelected={hero.primaryButton?.isDisplayed}
              onChange={(e) =>
                handleChange("primaryButton.isDisplayed", e.target.checked)
              }
              className="my-1"
            />
            {hero.primaryButton?.isDisplayed
              ? "Button is shown"
              : "Button is hidden"}
          </p>
          <Input
            type="text"
            value={hero.primaryButton?.label ?? ""}
            onChange={(e) =>
              handleChange("primaryButton.label", e.target.value)
            }
            label="Label"
            className="my-2"
          />
          <Input
            type="text"
            value={hero.primaryButton?.href ?? ""}
            onChange={(e) => handleChange("primaryButton.href", e.target.value)}
            label="Link (href)"
            className="my-2"
          />
          <Select
            selectedKeys={[hero.primaryButton?.color]}
            endContent={
              <span
                className={`px-[10px] py-[1px] bg-${hero.primaryButton?.color} rounded-full`}
              />
            }
            label="Color"
            onSelectionChange={(e) => {
              handleChange("primaryButton.color", e.currentKey);
            }}
          >
            {colorMap.map((color) => (
              <SelectItem key={color.name}>{color.name}</SelectItem>
            ))}
          </Select>
          <Select
            selectedKeys={[hero.primaryButton?.variant]}
            onChange={(e) => {
              handleChange("primaryButton.variant", e.target.value);
            }}
            label="Variant"
            className="my-1"
          >
            <SelectItem key="solid">Solid</SelectItem>
            <SelectItem key="ghost">Ghost</SelectItem>
          </Select>
        </div>
      </div>

      <hr className="mt-6" />

      {/* Secondary Button */}
      <div>
        <h3 className="font-semibold text-primary-dark mb-1">
          Secondary Button
        </h3>
        <div className="space-y-1 mt-4">
          <p className="flex items-center gap-2">
            <Checkbox
              type="checkbox"
              isSelected={hero.secondaryButton?.isDisplayed}
              onChange={(e) =>
                handleChange("secondaryButton.isDisplayed", e.target.checked)
              }
              className="my-1"
            />
            {hero.secondaryButton?.isDisplayed
              ? "Button is shown"
              : "Button is hidden"}
          </p>
          <Input
            type="text"
            value={hero.secondaryButton?.label ?? ""}
            onChange={(e) =>
              handleChange("secondaryButton.label", e.target.value)
            }
            label="Label"
            className="my-2"
          />
          <Input
            type="text"
            value={hero.secondaryButton?.href ?? ""}
            onChange={(e) =>
              handleChange("secondaryButton.href", e.target.value)
            }
            label="Link (href)"
            className="my-2"
          />
          <Select
            selectedKeys={[hero.secondaryButton?.color]}
            endContent={
              <span
                className={`px-[10px] py-[1px] bg-${hero.secondaryButton?.color} rounded-full`}
              />
            }
            label="Color"
            onSelectionChange={(e) => {
              handleChange("secondaryButton.color", e.currentKey);
            }}
          >
            {colorMap.map((color) => (
              <SelectItem key={color.name}>{color.name}</SelectItem>
            ))}
          </Select>
          <Select
            selectedKeys={[hero.secondaryButton?.variant]}
            onChange={(e) => {
              handleChange("secondaryButton.variant", e.target.value);
            }}
            label="Variant"
            className="my-1"
          >
            <SelectItem key="solid">Solid</SelectItem>
            <SelectItem key="ghost">Ghost</SelectItem>
          </Select>
        </div>
      </div>

      <hr className="mt-6" />

      {/* Contacts */}
      <div>
        <h3 className="font-semibold text-primary-dark mb-1">Contacts</h3>

        <div className="mt-4">
          <Input
            type="text"
            value={hero.contacts?.phone?.number ?? ""}
            onChange={(e) =>
              handleChange("contacts.phone.number", e.target.value)
            }
            label="Phone Number"
          />
        </div>

        <div className="my-2">
          <Input
            type="text"
            value={hero.contacts?.social?.link ?? ""}
            onChange={(e) =>
              handleChange("contacts.social.link", e.target.value)
            }
            label="Social Link"
          />
        </div>

        <div className="my-2">
          <Input
            type="text"
            value={hero.contacts?.social?.text ?? ""}
            onChange={(e) =>
              handleChange("contacts.social.text", e.target.value)
            }
            label="Social Text"
          />
        </div>

        <div className="my-2">
          <Input
            type="text"
            value={hero.contacts?.name?.text ?? ""}
            onChange={(e) => handleChange("contacts.name.text", e.target.value)}
            label="Name Text"
          />
        </div>
      </div>
    </div>
  );
}
