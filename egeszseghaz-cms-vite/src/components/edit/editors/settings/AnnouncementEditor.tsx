/* eslint-disable prettier/prettier */
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Checkbox } from "@heroui/checkbox";

import { useAnnouncementEdit } from "@/context/edit/announcement";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { usePublishAnnouncement } from "@/hooks/usePublishAnnouncement";
import { useQueryClient } from "@tanstack/react-query";
import CustomLoader from "@/components/loader";

export function AnnouncementEditor() {
  const { draft, updateDraft, draftStatus, undo, redo, setDraftStatus } =
    useAnnouncementEdit();
  const announcement = draft || {};
  const publish = usePublishAnnouncement();

  const queryClient = useQueryClient();

  const handleChange = (path: string, value: any) => updateDraft(path, value);

  if (publish.isPending) {
    return (
      <div
        className="p-4 space-y-4 text-sm relative bg-primary-light backdrop-blur-2xl rounded-md min-w-sm max-h-[100%] overflow-auto hide-scrollbar"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.6) 0px 1px 4px",
        }}
      >
        <CustomLoader />
      </div>
    );
  }

  return (
    <div
      className="p-4 space-y-4 text-sm relative bg-primary-light backdrop-blur-2xl rounded-md min-w-sm max-h-[100%] overflow-auto hide-scrollbar"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.6) 0px 1px 4px",
      }}
    >
      <style>{`
      .hide-scrollbar {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
      }
      .hide-scrollbar::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
      }
      `}</style>

      <div className="w-full flex justify-start items-center gap-2">
        <h3 className="font-semibold">Közlemény</h3>
        <Chip
          size="sm"
          color="primary"
          className={`border border-${draftStatus === "Vázlat" ? "accent" : draftStatus === "Közzététel..." ? "error" : "success"} bg-${draftStatus === "Vázlat" ? "accent" : draftStatus === "Közzététel..." ? "error" : "success"} text-text-primary`}
        >
          {draftStatus}
        </Chip>
      </div>

      <div className="w-full flex justify-center items-center gap-6">
        <Button className="w-full" color="secondary" onPress={undo}>
          Visszavonás
        </Button>
        <Button className="w-full" color="primary" onPress={redo}>
          Újra
        </Button>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <Checkbox
            type="checkbox"
            isSelected={announcement.isDisplayed}
            onChange={(e) => handleChange("isDisplayed", e.target.checked)}
            className="my-1"
          />
          <span className="select-none">Közlemény megjelenítése</span>
        </div>
      </div>

      <div>
        <Input
          label="Cím"
          type="text"
          value={announcement.title ?? ""}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      <div>
        <Input
          label="Dátum"
          type="date"
          value={announcement.date ?? ""}
          onChange={(e) => handleChange("date", e.target.value)}
        />
      </div>

      <div>
        <Textarea
          label="Leírás"
          value={announcement.description ?? ""}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      <hr />

      <div>
        <h4 className="font-semibold">CTA</h4>
        <div className="space-y-2 mt-2">
          <div className="flex items-center gap-2">
            <Checkbox
              type="checkbox"
              isSelected={announcement.cta?.isVisible}
              onChange={(e) => handleChange("cta.isVisible", e.target.checked)}
            />
            <span className="select-none">CTA megjelenítése</span>
          </div>

          <Input
            label="CTA felirat"
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
          label="Téma"
          selectedKeys={[announcement.theme ?? "info"]}
          onSelectionChange={(e) => handleChange("theme", e.currentKey)}
        >
          <SelectItem key="info">info</SelectItem>
          <SelectItem key="warning">warning</SelectItem>
          <SelectItem key="highlight">highlight</SelectItem>
        </Select>
      </div>

      <div>
        <Button
          className="w-full"
          color="primary"
          onPress={async () => {
            setDraftStatus("Közzététel...");
            await publish.mutateAsync(
              {
                publishedContent: draft,
              },
              {
                onSuccess: async () => {
                  await queryClient.refetchQueries({
                    queryKey: ["announcement"],
                  });
                  setDraftStatus("Közzétéve");
                },
              }
            );
          }}
        >
          Közzététel
        </Button>
      </div>
    </div>
  );
}

export default AnnouncementEditor;
