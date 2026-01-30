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
import { ScheduleList } from "../../schedule/ScheduleList";
import { DeleteScheduleConfirm } from "../../schedule/DeleteScheduleConfirm";
import { useUpdateService } from "@/hooks/service/useUpdateService";
import { ScheduleEditorModel } from "@/types/schedule_editor";
import dayjs from "dayjs";
import { mapEditorToSchedule } from "@/lib/settings/map_editor_to_schedule";
import { mapScheduleToEditor } from "@/lib/settings/map_schedule_to_editor";
import { ScheduleEditorModal } from "../settings/ScheduleModal";
import AddScheduleExceptionModal from "../../schedule/AddExceptionModal";
import { ExceptionList } from "../../schedule/ExceptionList";

export default function ServicesEditor(): JSX.Element {
  const { data: services, isLoading } = useServices();
  const { data: images } = useImages();
  const publish = usePublishService();
  const queryClient = useQueryClient();
  const deleteService = useDeleteService();
  const createService = useCreateService();
  const upload = useUploadImage();
  const updateService = useUpdateService();

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [createOpen, setCreateOpen] = useState(false);
  const [draft, setDraft] = useState<ScheduleEditorModel | null>(null);

  const [exceptionModalOpen, setExceptionModalOpen] = useState(false);

  const [scheduleToDelete, setScheduleToDelete] =
    useState<ServiceSchedule | null>(null);

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

  const selected = useMemo(() => {
    if (!services || !selectedId) return null;

    return services.find((s) => s.id === selectedId) ?? null;
  }, [services, selectedId]);

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

  function startEdit(schedule: ServiceSchedule) {
    setDraft(mapScheduleToEditor(schedule));
    setCreateOpen(true);
  }

  function saveDraft() {
    if (!draft || !selected) return;

    const next = mapEditorToSchedule(draft);

    const schedules = selected.schedules?.some((s) => s.id === next.id)
      ? selected.schedules.map((s) => (s.id === next.id ? next : s))
      : [...(selected.schedules ?? []), next];

    updateService.mutate(
      {
        id: selected.id,
        data: { ...selected, schedules },
      },
      {
        onSuccess: async (_, { id }) => {
          await queryClient.invalidateQueries({ queryKey: ["service", id] });
          await queryClient.invalidateQueries({ queryKey: ["services"] });
          setDraft(null);
          setCreateOpen(false);
        },
      }
    );
  }

  function confirmDeleteSchedule() {
    if (!scheduleToDelete || !selected) return;

    const schedules = (selected.schedules ?? []).filter(
      (s) => s.id !== scheduleToDelete.id
    );

    updateService.mutate(
      {
        id: selected.id,
        data: { ...selected, schedules },
      },
      {
        onSuccess: async (_, { id }) => {
          await queryClient.invalidateQueries({ queryKey: ["service", id] });
          await queryClient.invalidateQueries({ queryKey: ["services"] });
          setScheduleToDelete(null);
        },
      }
    );
  }

  const handlePublish = async () => {
    if (!selected) return;

    const payload = {
      desc: selected.desc ?? "",
      img: selected.img ?? "",
      name: selected.name ?? "",
      phone: selected.phone ?? "",
      color: selected.color ?? "",
      facts: selected.facts ?? null,
    };

    try {
      await publish.mutateAsync({ id: selected.id, publishedContent: payload });
      await queryClient.invalidateQueries({ queryKey: ["services"] });
      await queryClient.invalidateQueries({
        queryKey: ["service", selected.id],
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteService = async () => {
    if (!selected) return;

    try {
      if (!selected.id) throw new Error("Service ID is missing");
      if (
        confirm(
          "Biztosan törli ezt a szolgáltatást? Ez a művelet nem vonható vissza."
        )
      ) {
        await deleteService.mutateAsync(selected.id);
        await queryClient.invalidateQueries({ queryKey: ["services"] });
        setSelectedId(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleServiceFormChange = (next: Service | null) => {
    if (!next || !next.id) return;

    queryClient.setQueryData<Service[] | undefined>(["services"], (prev) => {
      if (!prev) return prev;

      return prev.map((s) => (s.id === next.id ? { ...s, ...next } : s));
    });

    queryClient.setQueryData<Service | undefined>(
      ["service", next.id],
      (prev) => (prev ? { ...prev, ...next } : prev)
    );
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
          title="Ütemezés szerkesztése"
          value={draft}
          onChange={setDraft}
          onCancel={() => {
            setCreateOpen(false);
            setDraft(null);
          }}
          onSave={saveDraft}
          isSaving={updateService.isPending}
        />
      )}

      {selected && (
        <AddScheduleExceptionModal
          open={exceptionModalOpen}
          service={selected}
          isSaving={updateService.isPending}
          onClose={() => setExceptionModalOpen(false)}
          onSave={(updatedSchedules) => {
            if (!selected) return;

            updateService.mutate({
              id: selected.id,
              data: { ...selected, schedules: updatedSchedules },
            });

            setExceptionModalOpen(false);
          }}
        />
      )}

      <DeleteScheduleConfirm
        open={!!scheduleToDelete}
        schedule={scheduleToDelete}
        onCancel={() => setScheduleToDelete(null)}
        onConfirm={confirmDeleteSchedule}
        isLoading={updateService.isPending}
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

            setSelectedId(svc.id);

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
          onSelect={(svc) => setSelectedId(svc.id)}
          selectedId={selectedId}
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
            onChange={handleServiceFormChange}
            onPublish={handlePublish}
            onDelete={handleDeleteService}
          />

          {selected && (
            <>
              <hr />
              <Button onPress={startCreate} color="primary">
                Új ütemterv hozzáadása
              </Button>

              <ScheduleList
                schedules={selected?.schedules ?? []}
                onEdit={startEdit}
                onDelete={setScheduleToDelete}
              />

              <hr />

              <Button
                color="danger"
                onPress={() => setExceptionModalOpen(true)}
              >
                Időpont törlése
              </Button>

              <ExceptionList
                schedules={selected.schedules ?? []}
                onDelete={(scheduleId, exception) => {
                  if (!selected) return;

                  const schedules = selected.schedules?.map((s) => {
                    if (s.id !== scheduleId) return s;

                    return {
                      ...s,
                      exceptions: (s.exceptions ?? []).filter(
                        (e) => e.occurrenceId !== exception.occurrenceId
                      ),
                    };
                  });

                  updateService.mutate({
                    id: selected.id,
                    data: { ...selected, schedules },
                  });
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
