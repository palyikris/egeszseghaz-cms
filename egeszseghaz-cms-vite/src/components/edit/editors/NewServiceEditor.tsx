/* eslint-disable prettier/prettier */
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";

import { useNewServiceEdit } from "@/context/edit/newService";

export function NewServiceEditor() {
  const { draft, updateDraft } = useNewServiceEdit();
  const service = draft || {};

  const handleChange = (path: string, value: any) => updateDraft(path, value);

  return (
    <div className="p-4 space-y-4 text-sm relative bg-primary-light backdrop-blur-2xl rounded-md max-w-xs max-h-[100%] overflow-auto hide-scrollbar">
      <style>{`
      .hide-scrollbar {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
      }
      .hide-scrollbar::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
      }
      `}</style>

      <h3 className="font-semibold">New Service</h3>

      <div>
      <div className="flex items-center gap-2">
        <Checkbox
        type="checkbox"
        isSelected={service.isDisplayed}
        onChange={(e) => handleChange("isDisplayed", e.target.checked)}
        className="my-1"
        />
        <span className="select-none">Display section</span>
      </div>
      </div>

      <div>
      <Input
        label="Hero Image URL"
        type="text"
        value={service.heroImage?.url ?? ""}
        onChange={(e) => handleChange("heroImage.url", e.target.value)}
      />
      </div>

      <div>
      <Input
        label="Hero Image Alt"
        type="text"
        value={service.heroImage?.alt ?? ""}
        onChange={(e) => handleChange("heroImage.alt", e.target.value)}
      />
      </div>

      <div>
      <Input
        label="Title"
        type="text"
        value={service.title?.text ?? ""}
        onChange={(e) => handleChange("title.text", e.target.value)}
      />
      </div>

      <div>
      <Input
        label="Subtitle"
        type="text"
        value={service.subtitle?.text ?? ""}
        onChange={(e) => handleChange("subtitle.text", e.target.value)}
      />
      </div>

      <div>
      <Textarea
        label="Short Description"
        value={service.description?.text ?? ""}
        onChange={(e) => handleChange("description.text", e.target.value)}
      />
      </div>

      <div>
      <Textarea
        label="Long Description"
        value={service.longDescription?.text ?? ""}
        onChange={(e) => handleChange("longDescription.text", e.target.value)}
      />
      </div>

      <div>
      <h4 className="font-semibold mb-4">Primary Button</h4>
      <Input
        label="Label"
        type="text"
        value={service.primaryButton?.label ?? ""}
        onChange={(e) => handleChange("primaryButton.label", e.target.value)}
      />
      <Input
        className="my-2"
        label="Href"
        type="text"
        value={service.primaryButton?.href ?? ""}
        onChange={(e) => handleChange("primaryButton.href", e.target.value)}
      />
      <div className="flex items-center gap-2">
        <Checkbox
        type="checkbox"
        isSelected={service.primaryButton?.isDisplayed}
        onChange={(e) => handleChange("primaryButton.isDisplayed", e.target.checked)}
        />
        <span className="select-none">Show primary button</span>
      </div>
      </div>

      <div>
      <h4 className="font-semibold mb-4">Contact Phone</h4>
      <Input
        className="mb-2"
        label="Phone Number"
        type="text"
        value={service.contactInfo?.phone.number ?? ""}
        onChange={(e) => handleChange("contactInfo.phone.number", e.target.value)}
      />
      <div className="flex items-center gap-2">
        <Checkbox
        type="checkbox"
        isSelected={service.contactInfo?.phone.isDisplayed}
        onChange={(e) => handleChange("contactInfo.phone.isDisplayed", e.target.checked)}
        />
        <span className="select-none">Show phone</span>
      </div>
      </div>

      <div>
      <h4 className="font-semibold mb-4">Contact Email</h4>
      <Input
        className="mb-2"
        label="Email"
        type="text"
        value={service.contactInfo?.email.address ?? ""}
        onChange={(e) => handleChange("contactInfo.email.address", e.target.value)}
      />
      <div className="flex items-center gap-2">
        <Checkbox
        type="checkbox"
        isSelected={service.contactInfo?.email.isDisplayed}
        onChange={(e) => handleChange("contactInfo.email.isDisplayed", e.target.checked)}
        />
        <span className="select-none">Show email</span>
      </div>
      </div>
    </div>
  );
}

export default NewServiceEditor;
