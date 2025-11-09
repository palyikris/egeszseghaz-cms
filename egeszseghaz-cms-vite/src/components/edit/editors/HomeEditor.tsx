/* eslint-disable prettier/prettier */

import { useEditMode } from "@/context/edit/edit";
import { HeroSchema } from "@/templates/home/home_schema";
import { Input } from "@heroui/input";

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
          <img src={hero.mainImageUrl} alt="" width={200} className="rounded-lg"/>
        </div>
      </div>

      {/* Background Gradient */}
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
      </div>

      {/* Headings */}
      <div>
        <h3 className="font-semibold text-primary-dark mb-1">Headings</h3>

        <div className="mb-2">
          <p className="block">Heading Text</p>
          <Input
            type="text"
            value={hero.heading?.text ?? ""}
            onChange={(e) => handleChange("heading.text", e.target.value)}
          />
        </div>

        <div>
          <p className="block">Heading Color</p>
          <Input
            type="color"
            value={hero.heading?.color ?? "#000000"}
            onChange={(e) => handleChange("heading.color", e.target.value)}
          />
        </div>

        <div className="mt-2">
          <Input
            type="text"
            value={hero.subheading?.text ?? ""}
            onChange={(e) => handleChange("subheading.text", e.target.value)}
            color="primary"
            label="Subheading Text"
          />
        </div>

        <div>
          <p className="block">Subheading Color</p>
          <Input
            type="color"
            value={hero.subheading?.color ?? "#000000"}
            onChange={(e) => handleChange("subheading.color", e.target.value)}
            className="w-full h-8 cursor-pointer"
          />
        </div>
      </div>

      {/* Primary Button */}
      <div>
        <h3 className="font-semibold text-primary-dark mb-1">Primary Button</h3>
        <div className="space-y-1">
          <p className="flex items-center gap-2">
            <Input
              type="checkbox"
              checked={hero.primaryButton?.isDisplayed ?? true}
              onChange={(e) =>
                handleChange("primaryButton.isDisplayed", e.target.checked)
              }
              variant="bordered"
            />
            Show Button
          </p>
          <p className="block">Label</p>
          <Input
            type="text"
            value={hero.primaryButton?.label ?? ""}
            onChange={(e) => handleChange("primaryButton.p", e.target.value)}
            className="w-full border border-border rounded p-1"
          />
          <p className="block">Link (href)</p>
          <Input
            type="text"
            value={hero.primaryButton?.href ?? ""}
            onChange={(e) => handleChange("primaryButton.href", e.target.value)}
            className="w-full border border-border rounded p-1"
          />
          <p className="block">Color</p>
          <Input
            type="color"
            value={hero.primaryButton?.color ?? "#000000"}
            onChange={(e) =>
              handleChange("primaryButton.color", e.target.value)
            }
            className="w-full h-8 cursor-pointer"
          />
          <p className="block">Variant</p>
          <select
            value={hero.primaryButton?.variant ?? "solid"}
            onChange={(e) =>
              handleChange("primaryButton.variant", e.target.value)
            }
            className="w-full border border-border rounded p-1"
          >
            <option value="solid">Solid</option>
            <option value="outline">Outline</option>
            <option value="ghost">Ghost</option>
          </select>
        </div>
      </div>

      {/* Secondary Button */}
      <div>
        <h3 className="font-semibold text-primary-dark mb-1">
          Secondary Button
        </h3>
        <div className="space-y-1">
          <p className="flex items-center gap-2">
            <Input
              type="checkbox"
              checked={hero.secondaryButton?.isDisplayed ?? true}
              onChange={(e) =>
                handleChange("secondaryButton.isDisplayed", e.target.checked)
              }
            />
            Show Button
          </p>
          <p className="block">Label</p>
          <Input
            type="text"
            value={hero.secondaryButton?.label ?? ""}
            onChange={(e) => handleChange("secondaryButton.p", e.target.value)}
            className="w-full border border-border rounded p-1"
          />
          <p className="block">Link (href)</p>
          <Input
            type="text"
            value={hero.secondaryButton?.href ?? ""}
            onChange={(e) =>
              handleChange("secondaryButton.href", e.target.value)
            }
            className="w-full border border-border rounded p-1"
          />
          <p className="block">Color</p>
          <Input
            type="color"
            value={hero.secondaryButton?.color ?? "#000000"}
            onChange={(e) =>
              handleChange("secondaryButton.color", e.target.value)
            }
            className="w-full h-8 cursor-pointer"
          />
          <p className="block">Variant</p>
          <select
            value={hero.secondaryButton?.variant ?? "solid"}
            onChange={(e) =>
              handleChange("secondaryButton.variant", e.target.value)
            }
            className="w-full border border-border rounded p-1"
          >
            <option value="solid">Solid</option>
            <option value="outline">Outline</option>
            <option value="ghost">Ghost</option>
          </select>
        </div>
      </div>

      {/* Contacts */}
      <div>
        <h3 className="font-semibold text-primary-dark mb-1">Contacts</h3>

        <div>
          <p className="block">Phone Number</p>
          <Input
            type="text"
            value={hero.contacts?.phone?.number ?? ""}
            onChange={(e) =>
              handleChange("contacts.phone.number", e.target.value)
            }
            className="w-full border border-border rounded p-1"
          />
        </div>

        <div>
          <p className="block">Social Link</p>
          <Input
            type="text"
            value={hero.contacts?.social?.link ?? ""}
            onChange={(e) =>
              handleChange("contacts.social.link", e.target.value)
            }
            className="w-full border border-border rounded p-1"
          />
        </div>

        <div>
          <p className="block">Social Text</p>
          <Input
            type="text"
            value={hero.contacts?.social?.text ?? ""}
            onChange={(e) =>
              handleChange("contacts.social.text", e.target.value)
            }
            className="w-full border border-border rounded p-1"
          />
        </div>

        <div>
          <p className="block">Name Text</p>
          <Input
            type="text"
            value={hero.contacts?.name?.text ?? ""}
            onChange={(e) => handleChange("contacts.name.text", e.target.value)}
            className="w-full border border-border rounded p-1"
          />
        </div>
      </div>
    </div>
  );
}
