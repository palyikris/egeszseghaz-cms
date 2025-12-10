/* eslint-disable prettier/prettier */
import { useService } from "@/hooks/useService";
import { useUpdateService } from "@/hooks/useUpdateService";
import CustomLoader from "@/components/loader";

import { useParams } from "react-router-dom";
import { ServiceSchema } from "@/templates/service/service_schema";
import HtmlBlocksEditor from "@/components/edit/editors/service/HtmlBlocksEditor";
import PriceTableEditor from "@/components/edit/editors/service/PriceTableEditor";
import CarouselImagesEditor from "@/components/edit/editors/service/CarouselImagesEditor";
import ServiceLayout from "@/layouts/service";
import Navbar from "@/components/navbar";
import { usePage } from "@/hooks/usePage";

export default function ServiceContentEditorPage() {
  const { serviceId } = useParams();
  const { data: service, isLoading } = useService({
    serviceId: serviceId!,
  });
  const { data: homePage, isLoading: homeLoading } = usePage("home");
  const updateService = useUpdateService();

  if (isLoading || !service || homeLoading || updateService.isPending)
    return <CustomLoader />;

  const saveContent = async (newContent: ServiceSchema["content"]) => {
    await updateService.mutateAsync({
      id: serviceId!,
      data: { content: newContent },
    });
  };

  return (
    <ServiceLayout>
      <Navbar navbar={homePage?.navbar} />

      <div className="bg-gradient-to-tl from-primary-light to-secondary-light py-15 px-6 pt-30">
        <h1 className="text-3xl font-semibold mb-10">
          Tartalom szerkesztése: {service.id.toUpperCase()}
        </h1>
      </div>

      <HtmlBlocksEditor
        blocks={service.content?.htmlBlocks || []}
        onSave={(blocks) =>
          saveContent({
            ...service.content,
            htmlBlocks: blocks,
            priceTable: service.content?.priceTable || [],
            images: service.content?.images || [],
          })
        }
      />

      <PriceTableEditor
        rows={service.content?.priceTable || []}
        onSave={(rows) =>
          saveContent({
            ...service.content,
            priceTable: rows,
            htmlBlocks: service.content?.htmlBlocks || [],
            images: service.content?.images || [],
          })
        }
      />

      <CarouselImagesEditor
        images={service.content?.images || []}
        onSave={(images) =>
          saveContent({
            ...service.content,
            images: images,
            htmlBlocks: service.content?.htmlBlocks || [],
            priceTable: service.content?.priceTable || [],
          })
        }
      />
    </ServiceLayout>
  );
}
