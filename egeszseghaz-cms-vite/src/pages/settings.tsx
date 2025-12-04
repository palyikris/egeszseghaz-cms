/* eslint-disable prettier/prettier */
import { Announcement } from "@/components/banners/announcement";
import { NewServiceSection } from "@/components/banners/new_service";
import AnnouncementEditor from "@/components/edit/editors/AnnouncementEditor";
import NewServiceEditor from "@/components/edit/editors/NewServiceEditor";
import ServicesEditor from "@/components/edit/editors/ServicesEditor";
import ImagesEditor from "@/components/edit/editors/ImagesEditor";
import { useAnnouncementEdit } from "@/context/edit/announcement";
import { useNewServiceEdit } from "@/context/edit/newService";
import { SettingsLayout } from "@/layouts/settings";
import { AnnouncementSchema } from "@/templates/announcement/announcement_schema";
import { NewServiceSchema } from "@/templates/new_service/new_service_schema";

import { useLocation } from "react-router-dom";
import PrebuiltPalettes from "@/components/edit/editors/PrebuildPalettes";
import SettingsGrid from "@/components/pages/settings/SettingsGrid";

export default function SettingsPage() {
  const { hash } = useLocation();
  const { draft: serviceDraft } = useNewServiceEdit();
  const { draft: announcementDraft } = useAnnouncementEdit();

  const sectionMap: Record<string, React.ReactNode> = {
    "#images": <ImagesEditor />,
    "#palettes": <PrebuiltPalettes />,
    "#announcement": <AnnouncementEditor />,
    "#new_service": <NewServiceEditor />,
    "#services": <ServicesEditor />,
  };

  const previewMap: Record<string, React.ReactNode> = {
    "#announcement": (
      <Announcement data={announcementDraft as unknown as AnnouncementSchema} />
    ),
    "#new_service": (
      <NewServiceSection
        className="max-h-screen overflow-auto hide-scrollbar"
        data={serviceDraft as unknown as NewServiceSchema}
      />
    ),
  };

  return (
    <SettingsLayout>
      {hash in previewMap && <div className="mb-6">{previewMap[hash]}</div>}
      {hash ? (
        sectionMap[hash] || <div>Szakasz nem található</div>
      ) : (
        <SettingsGrid />
      )}
    </SettingsLayout>
  );
}
