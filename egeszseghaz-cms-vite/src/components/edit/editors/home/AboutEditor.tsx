/* eslint-disable prettier/prettier */
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";

import { useEditMode } from "@/context/edit/edit";
import { AboutSchema } from "@/templates/home/home_schema";
import { colorMap } from "@/types/edit";
import { Button } from "@heroui/button";
import { useImages } from "@/hooks/useImages";
import CustomLoader from "@/components/loader";

export function AboutEditor() {
  const { draft, updateDraft } = useEditMode();
  const about: AboutSchema = draft.about || {};

    const { data: images, isLoading: imagesLoading } = useImages();
  

  const handleChange = (path: string, value: any) =>
    updateDraft(`about.${path}`, value);

  const addFeature = () => {
    const next = [...(about.features || []), { text: "Új szolgáltatás", iconColor: "primary-dark", iconBgColor: "primary-light/20" }];
    handleChange("features", next);
  };

  const updateFeature = (idx: number, key: string, value: any) => {
    const next = [...(about.features || [])];
    next[idx] = { ...(next[idx] || {}), [key]: value };
    handleChange("features", next);
  };

  const removeFeature = (idx: number) => {
    const next = [...(about.features || [])];
    next.splice(idx, 1);
    handleChange("features", next);
  };

  if (imagesLoading) {
      return (
        <div className="p-4 space-y-4 text-sm relative">
          <CustomLoader />
        </div>
      );
    }

  return (
    <div className="p-4 space-y-4 text-sm relative">
      <h3 className="font-semibold text-primary-dark">Rólunk</h3>

      <div>
        <Select
          selectedKeys={[about.aboutImg?.url]}
          label="Fő kép"
          onSelectionChange={(e) => {
            handleChange("aboutImg.url", e.currentKey);
          }}
        >
          {images && images.length > 0 ? (
            images.map((imgUrl) => (
              <SelectItem key={imgUrl.url}>{imgUrl.name}</SelectItem>
            ))
          ) : (
            <SelectItem key="no-images">Nincsenek elérhető képek</SelectItem>
          )}
        </Select>
        <div className="flex w-full justify-center items-center mt-4">
          <img
            src={about.aboutImg?.url}
            alt=""
            width={200}
            className="rounded-lg"
          />
        </div>
      </div>

      <div>
        <Input
          label="Cím (első)"
          type="text"
          value={about.heading?.textFirst ?? ""}
          onChange={(e) => handleChange("heading.textFirst", e.target.value)}
        />
      </div>

      <div>
        <Input
          label="Cím (második)"
          type="text"
          value={about.heading?.textSecond ?? ""}
          onChange={(e) => handleChange("heading.textSecond", e.target.value)}
        />
      </div>

      <div>
        <Select
          label="Cím színe"
          selectedKeys={[about.heading?.color]}
          endContent={
            <span
              className={`px-[10px] py-[1px] bg-${about.heading?.color} rounded-full`}
            />
          }
          onSelectionChange={(e) => handleChange("heading.color", e.currentKey)}
        >
          {colorMap.map((c) => (
            <SelectItem key={c.name}>{c.name}</SelectItem>
          ))}
        </Select>
      </div>

      <div>
        <Textarea
          label="Leírás"
          value={about.description?.text ?? ""}
          onChange={(e) => handleChange("description.text", e.target.value)}
        />
      </div>

      <div>
        <Select
          label="Leírás színe"
          selectedKeys={[about.description?.color]}
          endContent={
            <span
              className={`px-[10px] py-[1px] bg-${about.description?.color} rounded-full`}
            />
          }
          onSelectionChange={(e) =>
            handleChange("description.color", e.currentKey)
          }
        >
          {colorMap.map((c) => (
            <SelectItem key={c.name}>{c.name}</SelectItem>
          ))}
        </Select>
      </div>

      <div>
        <h4 className="font-semibold">Jellemzők</h4>
        <div className="space-y-2 mt-2">
          {(about.features || []).map((f: any, idx: number) => (
            <div key={idx} className="p-2 border rounded-md">
              <Input
                type="text"
                value={f.text}
                onChange={(e) => updateFeature(idx, "text", e.target.value)}
                label={`Szolgáltatás ${idx + 1}`}
              />
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Select
                  selectedKeys={[f.iconColor]}
                  endContent={
                    <span
                      className={`px-[10px] py-[1px] bg-${f.iconColor} rounded-full`}
                    />
                  }
                  onSelectionChange={(e) =>
                    updateFeature(idx, "iconColor", e.currentKey)
                  }
                >
                  {colorMap.map((c) => (
                    <SelectItem key={c.name}>{c.name}</SelectItem>
                  ))}
                </Select>
                <Select
                  selectedKeys={[f.iconBgColor]}
                  endContent={
                    <span
                      className={`px-[10px] py-[1px] bg-${f.iconBgColor} rounded-full`}
                    />
                  }
                  onSelectionChange={(e) =>
                    updateFeature(idx, "iconBgColor", e.currentKey)
                  }
                >
                  {colorMap.map((c) => (
                    <SelectItem key={c.name}>{c.name}</SelectItem>
                  ))}
                </Select>
              </div>
              <div className="flex justify-end mt-2">
                <Button
                  className="text-sm text-error w-full flex justify-center"
                  onPress={() => removeFeature(idx)}
                  variant="ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#D35D5D"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          ))}

          <div>
            <Button color="primary" className="w-full" onPress={addFeature}>
              Jellemző hozzáadása
            </Button>
          </div>
        </div>
      </div>

      <hr />

      <div>
        <h4 className="font-semibold">Gombok</h4>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div>
            <Input
              label="Elsődleges gomb felirat"
              type="text"
              value={about.primaryButton?.label ?? ""}
              onChange={(e) =>
                handleChange("primaryButton.label", e.target.value)
              }
            />
          </div>
          <div>
            <Select
              label="Elsődleges gomb színe"
              selectedKeys={[about.primaryButton?.color]}
              endContent={
                <span
                  className={`px-[10px] py-[1px] bg-${about.primaryButton?.color} rounded-full`}
                />
              }
              onSelectionChange={(e) =>
                handleChange("primaryButton.color", e.currentKey)
              }
            >
              {colorMap.map((c) => (
                <SelectItem key={c.name}>{c.name}</SelectItem>
              ))}
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2">
          <div>
            <Input
              label="Másodlagos gomb felirat"
              type="text"
              value={about.secondaryButton?.label ?? ""}
              onChange={(e) =>
                handleChange("secondaryButton.label", e.target.value)
              }
            />
          </div>
          <div>
            <Select
              label="Másodlagos gomb színe"
              selectedKeys={[about.secondaryButton?.color]}
              endContent={
                <span
                  className={`px-[10px] py-[1px] bg-${about.secondaryButton?.color} rounded-full`}
                />
              }
              onSelectionChange={(e) =>
                handleChange("secondaryButton.color", e.currentKey)
              }
            >
              {colorMap.map((c) => (
                <SelectItem key={c.name}>{c.name}</SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutEditor;
