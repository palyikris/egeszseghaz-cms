/* eslint-disable prettier/prettier */
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Checkbox } from "@heroui/checkbox";

import { useNewServiceEdit } from "@/context/edit/newService";
import { useImages } from "@/hooks/useImages";
import CustomLoader from "@/components/loader";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { useQueryClient } from "@tanstack/react-query";
import { usePublishNewService } from "@/hooks/usePublishNewService";

export function NewServiceEditor() {
  const { draft, updateDraft, undo, redo, draftStatus, setDraftStatus } =
    useNewServiceEdit();
  const service = draft || {};

  const { data: images, isLoading: imagesLoading } = useImages();
  const publish = usePublishNewService();

  const queryClient = useQueryClient();

  const handleChange = (path: string, value: any) => updateDraft(path, value);

  if (publish.isPending) {
    return (
      <div
        className="p-4 space-y-4 text-sm relative bg-primary-light backdrop-blur-2xl rounded-md min-w-xs max-h-[100%] overflow-auto hide-scrollbar max-w-xs"
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
      className="p-4 space-y-4 text-sm relative bg-primary-light backdrop-blur-2xl rounded-md min-w-xs max-h-[100%] overflow-auto hide-scrollbar max-w-xs"
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
        <h3 className="font-semibold">New Service</h3>
        <Chip
          size="sm"
          color="primary"
          className={`border border-${draftStatus === "Draft" ? "accent" : draftStatus === "Publishing..." ? "danger" : "success"} bg-${draftStatus === "Draft" ? "accent" : draftStatus === "Publishing..." ? "danger" : "success"} text-text-primary`}
        >
          {draftStatus}
        </Chip>
      </div>

      <div className="w-full flex justify-center items-center gap-6">
        <Button className="w-full" color="secondary" onPress={undo}>
          Undo
        </Button>
        <Button className="w-full" color="primary" onPress={redo}>
          Redo
        </Button>
      </div>

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
        <Select
          selectedKeys={[service.heroImage?.url]}
          label="Image"
          onSelectionChange={(e: any) =>
            handleChange("heroImage.url", e.currentKey)
          }
        >
          {images && images.length > 0 ? (
            images.map((img: any) => (
              <SelectItem key={img.url}>{img.name}</SelectItem>
            ))
          ) : (
            <SelectItem key="no-images">No images</SelectItem>
          )}
        </Select>
      </div>

      <div>
        <Input
          label="Hero Image Alt"
          type="text"
          value={service.heroImage?.alt ?? ""}
          onChange={(e) => handleChange("heroImage.alt", e.target.value)}
        />
      </div>

      <hr />
      {/* Gallery editor */}
      <div>
        <h4 className="font-semibold">Gallery</h4>

        {imagesLoading ? (
          <div className="py-4">
            <CustomLoader />
          </div>
        ) : (
          <div className="space-y-3 mt-2">
            {(service.gallery || []).map((g: any, i: number) => (
              <div
                key={i}
                className="grid grid-cols-12 gap-2 items-center mb-6"
              >
                <div className="col-span-12">
                  <img
                    src={g.url}
                    alt={g.alt ?? ""}
                    className="w-full rounded"
                  />
                </div>

                <div className="col-span-12 space-y-2">
                  <Select
                    selectedKeys={[g.url]}
                    label="Image"
                    onSelectionChange={(e: any) =>
                      handleChange(`gallery.${i}.url`, e.currentKey)
                    }
                  >
                    {images && images.length > 0 ? (
                      images.map((img: any) => (
                        <SelectItem key={img.url}>{img.name}</SelectItem>
                      ))
                    ) : (
                      <SelectItem key="no-images">No images</SelectItem>
                    )}
                  </Select>

                  <Input
                    label="Alt"
                    type="text"
                    value={g.alt ?? ""}
                    onChange={(e) =>
                      handleChange(`gallery.${i}.alt`, e.target.value)
                    }
                  />
                </div>

                <div className="col-span-12 flex flex-col gap-2">
                  <Button
                    className="btn btn-danger"
                    onPress={() => {
                      const next = [...(service.gallery || [])];

                      next.splice(i, 1);
                      handleChange("gallery", next);
                    }}
                    color="danger"
                    variant="ghost"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}

            <div>
              <Button
                onPress={() => {
                  const next = [...(service.gallery || [])];
                  const firstUrl = (images && images[0]?.url) || "";
                  next.push({ url: firstUrl, alt: "" });
                  handleChange("gallery", next);
                }}
                color="primary"
                className="w-full mb-8"
              >
                Add Image
              </Button>
            </div>
          </div>
        )}
      </div>

      <hr />

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

      <hr />
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
            onChange={(e) =>
              handleChange("primaryButton.isDisplayed", e.target.checked)
            }
          />
          <span className="select-none">Show primary button</span>
        </div>
      </div>

      <hr />

      <div>
        <h4 className="font-semibold mb-4">Contact Phone</h4>
        <Input
          className="mb-2"
          label="Phone Number"
          type="text"
          value={service.contactInfo?.phone.number ?? ""}
          onChange={(e) =>
            handleChange("contactInfo.phone.number", e.target.value)
          }
        />
        <div className="flex items-center gap-2">
          <Checkbox
            type="checkbox"
            isSelected={service.contactInfo?.phone.isDisplayed}
            onChange={(e) =>
              handleChange("contactInfo.phone.isDisplayed", e.target.checked)
            }
          />
          <span className="select-none">Show phone</span>
        </div>
      </div>

      <hr />

      <div>
        <h4 className="font-semibold mb-4">Contact Email</h4>
        <Input
          className="mb-2"
          label="Email"
          type="text"
          value={service.contactInfo?.email.address ?? ""}
          onChange={(e) =>
            handleChange("contactInfo.email.address", e.target.value)
          }
        />
        <div className="flex items-center gap-2">
          <Checkbox
            type="checkbox"
            isSelected={service.contactInfo?.email.isDisplayed}
            onChange={(e) =>
              handleChange("contactInfo.email.isDisplayed", e.target.checked)
            }
          />
          <span className="select-none">Show email</span>
        </div>
      </div>

      <div>
        <Button
          color="primary"
          className="w-full mt-4"
          onPress={async () => {
            setDraftStatus("Publishing...");
            await publish.mutateAsync(
              {
                publishedContent: draft,
              },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries({
                    queryKey: ["newService"],
                  });
                  setDraftStatus("Published");
                },
              }
            );
          }}
        >
          Publish
        </Button>
      </div>
    </div>
  );
}

export default NewServiceEditor;
