/* eslint-disable prettier/prettier */
import React, { useState, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";

import { useServices } from "@/hooks/useServices";
import { useImages } from "@/hooks/useImages";
import { usePublishService } from "@/hooks/usePublishService";
import ServiceCard from "@/components/pages/home/service_card";
import type { Service } from "@/types/services";
import CustomLoader from "@/components/loader";

export default function ServicesEditor() {
  const { data: services, isLoading } = useServices();
  const { data: images } = useImages();
  const publish = usePublishService();
  const queryClient = useQueryClient();

  const [selected, setSelected] = useState<Service | null>(null);

  const cardTemplate = useMemo(() => {
    return {
      bgColor: "white",
      borderColor: "gray-200",
      rounded: "md",
      shadow: "md",
      shadowColor: "gray-300",
      hoverBorderColor: "primary",
      heading: { color: "text-primary", hoverColor: "text-primary" },
      hoverOverlay: {
        text: "View",
        textColor: "white",
        bgColor: "primary",
        backdropBlur: "",
      },
      button: { variant: "default", color: "primary", label: "Open" },
    };
  }, []);

  const onSelectService = (svc: Service) => {
    setSelected(svc);
  };

  const handlePublish = async () => {
    if (!selected) return;

    const payload = {
      desc: selected.desc,
      img: selected.img,
      name: selected.name,
      phone: selected.phone,
    };

    try {
      await publish.mutateAsync({ id: selected.id, publishedContent: payload });
      await queryClient.invalidateQueries({ queryKey: ["services"] });
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <CustomLoader />
      </div>
    );
  }

  return (
    <div className="w-full flex gap-6">
      <div className="w-2/3 grid grid-cols-2 gap-4 max-h-[70vh] overflow-auto hide-scrollbar">
        {!isLoading &&
          (services || []).map((svc: any, i: number) => (
            <button
              key={svc.id || i}
              onClick={() => onSelectService(svc as Service)}
              className={`cursor-pointer rounded-sm flex justify-center items-center m-2 p-4 ${selected?.id === svc.id ? "ring-2 ring-primary" : ""}`}
            >
              <ServiceCard service={svc} i={i} cardTemplate={cardTemplate} />
            </button>
          ))}
      </div>

      <div
        className="w-1/3 p-4 space-y-4 bg-primary-light backdrop-blur-2xl rounded-md min-w-xs max-h-[70vh] overflow-auto hide-scrollbar"
        style={{ boxShadow: "rgba(0, 0, 0, 0.6) 0px 1px 4px" }}
      >
        <h3 className="font-semibold">Edit Service</h3>

        {!selected && <div>Select a service to edit</div>}

        {publish.isPending && (
          <div className="text-center py-10">
            <CustomLoader />
            <div className="mt-2">Publishing...</div>
          </div>
        )}

        {selected && !publish.isPending && (
          <div className="space-y-3">
            <div>
              <Input
                id="service-name"
                type="text"
                value={selected.name ?? ""}
                onChange={(e: any) =>
                  setSelected({ ...selected, name: e.target.value })
                }
                label="Service Name"
              />
            </div>

            <div>
              <Input
                id="service-phone"
                type="text"
                value={selected.phone ?? ""}
                onChange={(e: any) =>
                  setSelected({ ...selected, phone: e.target.value })
                }
                label="Phone Number"
              />
            </div>

            <div>
              <Select
                id="service-image"
                label="Image"
                selectedKeys={[selected.img ?? ""]}
                onSelectionChange={(e: any) =>
                  setSelected({ ...selected, img: e.currentKey })
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
              <Textarea
                id="service-desc"
                value={selected.desc ?? ""}
                onChange={(e: any) =>
                  setSelected({ ...selected, desc: e.target.value })
                }
                label="Service Description"
              />
            </div>

            <div className="pt-2">
              <Button
                className="w-full"
                color="primary"
                onPress={handlePublish}
              >
                Publish
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
