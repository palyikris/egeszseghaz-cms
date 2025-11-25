/* eslint-disable prettier/prettier */
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Checkbox } from "@heroui/checkbox";

import { useAnnouncementEdit } from "@/context/edit/announcement";
import { AnnouncementSchema } from "@/templates/announcement/announcement_schema";

export function AnnouncementEditor() {
  const { draft, updateDraft } = useAnnouncementEdit();
  const announcement: AnnouncementSchema = draft.announcement || {};

  const handleChange = (path: string, value: any) =>
    updateDraft(`announcement.${path}`, value);

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

      <h3 className="font-semibold">Announcement</h3>

      <div>
        <div className="flex items-center gap-2">
          <Checkbox
            type="checkbox"
            isSelected={announcement.isDisplayed}
            onChange={(e) => handleChange("isDisplayed", e.target.checked)}
            className="my-1"
          />
          <span className="select-none">Display announcement</span>
        </div>
      </div>

      <div>
        <Input
          label="Title"
          type="text"
          value={announcement.title ?? ""}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      <div>
        <Input
          label="Date"
          type="date"
          value={announcement.date ?? ""}
          onChange={(e) => handleChange("date", e.target.value)}
        />
      </div>

      <div>
        <Textarea
          label="Description"
          value={announcement.description ?? ""}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      <div>
        <h4 className="font-semibold">CTA</h4>
        <div className="space-y-2 mt-2">
          <div className="flex items-center gap-2">
            <Checkbox
              type="checkbox"
              isSelected={announcement.cta?.isVisible}
              onChange={(e) => handleChange("cta.isVisible", e.target.checked)}
            />
            <span className="select-none">Show CTA</span>
          </div>

          <Input
            label="CTA Label"
            type="text"
            value={announcement.cta?.label ?? ""}
            onChange={(e) => handleChange("cta.label", e.target.value)}
          />

          <Input
            label="CTA URL"
            type="text"
            value={announcement.cta?.url ?? ""}
            onChange={(e) => handleChange("cta.url", e.target.value)}
          />
        </div>
      </div>

      <div>
        <Select
          label="Theme"
          selectedKeys={[announcement.theme ?? "info"]}
          onSelectionChange={(e) => handleChange("theme", e.currentKey)}
        >
          <SelectItem key="info">info</SelectItem>
          <SelectItem key="warning">warning</SelectItem>
          <SelectItem key="highlight">highlight</SelectItem>
        </Select>
      </div>
    </div>
  );
}

export default AnnouncementEditor;
