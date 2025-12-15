/* eslint-disable prettier/prettier */
import { useState, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@heroui/button";

import { useServices } from "@/hooks/service/useServices";
import { useImages } from "@/hooks/settings/useImages";
import { usePublishService } from "@/hooks/service/usePublishService";
import { useUploadImage } from "@/hooks/settings/useUploadImage";
import type { Service, ServiceSchedule } from "@/types/services";
import CustomLoader from "@/components/loader";
import { useDeleteService } from "@/hooks/service/useDeleteService";
import { useCreateService } from "@/hooks/service/useCreateService";

import CreateServiceModal from "@/components/edit/CreateServiceModal";
import ServiceList from "@/components/edit/service/ServiceList";
import ServiceForm from "@/components/edit/service/ServiceForm";
import ServiceSearch from "@/components/edit/service/ServiceSearch";
import { useDeleteOccurrence } from "@/hooks/settings/useDeleteOccurance";
import { CalendarEvent } from "@/types/calendar";
import { DeleteOccurrenceConfirm } from "./DeleteOccuranceConfirm";
import { ScheduleList } from "../../schedule/ScheduleList";
import { DeleteScheduleConfirm } from "../../schedule/DeleteScheduleConfirm";
import { useUpdateService } from "@/hooks/service/useUpdateService";
import { ScheduleEditorModel } from "@/types/schedule_editor";
import dayjs from "dayjs";
import { mapEditorToSchedule } from "@/lib/settings/map_editor_to_schedule";
import { ScheduleEditorModal } from "./ScheduleModal";

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
  const [searchQuery, setSearchQuery] = useState("");

  const deleteOccurrence = useDeleteOccurrence();
  const [pendingDelete, setPendingDelete] = useState<CalendarEvent | null>(
    null
  );

  const [editing, setEditing] = useState<ServiceSchedule | null>(null);
  const [deleting, setDeleting] = useState<ServiceSchedule | null>(null);

  const [createOpen, setCreateOpen] = useState(false);
  const [draft, setDraft] = useState<ScheduleEditorModel | null>(null);

  const [scheduleToDelete, setScheduleToDelete] =
    useState<ServiceSchedule | null>(null);

  const updateService = useUpdateService();

  function startCreate() {
    setDraft({
      id: crypto.randomUUID(),
      weekdays: [],
      startTime: "09:00",
      endTime: "10:00",
      startDate: dayjs().format("YYYY-MM-DD"),
    });
    setCreateOpen(true);
  }

  function saveCreate() {
    if (!draft) return;

    const newSchedule = mapEditorToSchedule(draft);

    updateService.mutate(
      {
        id: selected?.id || "",
        data: {
          ...selected,
          schedules: [...(selected?.schedules || []), newSchedule],
        },
      },
      {
        onSuccess: () => {
          setCreateOpen(false);
          setDraft(null);
        },
      }
    );
  }

  function onDeleteEvent(event: CalendarEvent) {
    deleteOccurrence.mutate({
      serviceId: event.serviceId,
      scheduleId: event.scheduleId,
      occurrenceId: event.id,
    });
  }

  function confirmDeleteSchedule() {
    if (!scheduleToDelete) return;

    const updatedSchedules = (selected?.schedules ?? []).filter(
      (s) => s.id !== scheduleToDelete.id
    );

    updateService.mutate(
      {
        id: selected?.id || "",
        data: {
          ...selected,
          schedules: updatedSchedules,
        },
      },
      {
        onSuccess: () => setScheduleToDelete(null),
      }
    );
  }

  function confirmDelete() {
    if (!pendingDelete) return;

    deleteOccurrence.mutate(
      {
        serviceId: pendingDelete.serviceId,
        scheduleId: pendingDelete.scheduleId,
        occurrenceId: pendingDelete.id,
      },
      {
        onSuccess: () => setPendingDelete(null),
      }
    );
  }

  const filteredServices = useMemo(() => {
    if (!services) return [];
    if (!searchQuery.trim()) return services;

    const query = searchQuery.toLowerCase();

    return services.filter(
      (service) =>
        service.name?.toLowerCase().includes(query) ||
        service.desc?.toLowerCase().includes(query)
    );
  }, [services, searchQuery]);

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
      button: { variant: "ghost", color: "primary", label: "Szerkesztés" },
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
      <div className="flex items-center justify-start gap-10">
        <ServiceSearch value={searchQuery} onChange={setSearchQuery} />
        <Button color="primary" onPress={() => setShowCreateModal(true)}>
          Új szolgáltatás létrehozása
        </Button>
      </div>

      {draft && (
        <ScheduleEditorModal
          open={createOpen}
          title="Create schedule"
          value={draft}
          onChange={setDraft}
          onCancel={() => {
            setCreateOpen(false);
            setDraft(null);
          }}
          onSave={saveCreate}
          isSaving={updateService.isPending}
        />
      )}

      <DeleteScheduleConfirm
        open={!!scheduleToDelete}
        schedule={scheduleToDelete}
        onCancel={() => setScheduleToDelete(null)}
        onConfirm={confirmDeleteSchedule}
        isLoading={updateService.isPending}
      />

      <DeleteOccurrenceConfirm
        open={!!pendingDelete}
        onCancel={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
        isLoading={deleteOccurrence.isPending}
      />

      <CreateServiceModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={async (id, coach, file, description, phone) => {
          try {
            const payload: any = {
              name: id,
              coach,
              desc: description,
              img: "",
              phone,
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
          services={filteredServices as Service[] | undefined}
          cardTemplate={cardTemplate}
          onSelect={onSelectService}
          selectedId={selected?.id ?? null}
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

          <Button onPress={startCreate}>Új időpont hozzáadása</Button>

          <ScheduleList
            schedules={selected?.schedules ?? []}
            onEdit={setEditing}
            onDelete={setDeleting}
          />
        </div>
      </div>
    </div>
  );
}