/* eslint-disable prettier/prettier */
import { useState, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@heroui/button";

import { useServices } from "@/hooks/useServices";
import { useImages } from "@/hooks/useImages";
import { usePublishService } from "@/hooks/usePublishService";
import { useUploadImage } from "@/hooks/useUploadImage";
import type { Service } from "@/types/services";
import CustomLoader from "@/components/loader";
import { useDeleteService } from "@/hooks/useDeleteService";
import { useCreateService } from "@/hooks/useCreateService";

import CreateServiceModal from "@/components/edit/CreateServiceModal";
import ServiceList from "@/components/edit/ServiceList";
import ServiceForm from "@/components/edit/ServiceForm";

export default function ServicesEditor(): JSX.Element {
  const { data: services, isLoading } = useServices();
  const { data: images } = useImages();
  const publish = usePublishService();
  const queryClient = useQueryClient();
  const deleteService = useDeleteService();
  const createService = useCreateService();
  const upload = useUploadImage();

  const [selected, setSelected] = useState<Service | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

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
      button: { variant: "default", color: "primary", label: "" },
    };
  }, []);

  const onSelectService = (svc: Service) => setSelected(svc);

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

  const handleDelete = async () => {
    if (!selected) return;
    try {
      if (!selected.id) throw new Error("Service ID is missing");
      if (
        confirm(
          "Biztosan törli ezt a szolgáltatást? Ez a művelet nem vonható vissza."
        )
      ) {
        await deleteService.mutateAsync(selected.id);
        setSelected(null);
      }
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
    <div className="w-full flex gap-6 flex-col">
      <div className="grid-2">
        <Button color="primary" onPress={() => setShowCreateModal(true)}>
          Új szolgáltatás létrehozása
        </Button>
      </div>

      <CreateServiceModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={async (id, coach, file) => {
          try {
            const payload: any = {
              name: id,
              coach,
              desc: "",
              img: "",
              phone: "",
            };
            if (file) {
              const imgRes = await upload.mutateAsync({ file, folder: id });
              payload.img = imgRes.url;
            }

            const res = await createService.mutateAsync({ payload, id });
            const svc = { id: res.id ?? id, ...payload } as Service;
            setSelected(svc);
            return svc;
          } catch (err) {
            console.error(err);
            return null;
          }
        }}
      />

      <div className="w-full flex justify-center items-center gap-4">
        <ServiceList
          services={services as Service[] | undefined}
          selectedId={selected?.id ?? null}
          onSelect={onSelectService}
          cardTemplate={cardTemplate}
        />

        <div
          className="w-1/3 p-4 space-y-4 bg-primary-light backdrop-blur-2xl rounded-md min-w-xs max-h-[70vh] overflow-auto hide-scrollbar"
          style={{ boxShadow: "rgba(0, 0, 0, 0.6) 0px 1px 4px" }}
        >
          <h3 className="font-semibold">Szolgáltatás szerkesztése</h3>

          <ServiceForm
            service={selected}
            images={images}
            publishing={publish.isPending}
            deleting={deleteService.isPending}
            onChange={(s) => setSelected(s)}
            onPublish={handlePublish}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}