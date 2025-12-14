/* eslint-disable prettier/prettier */

import Footer from "@/components/footer";
import CustomLoader from "@/components/loader";
import Navbar from "@/components/navbar";
import ServiceHero from "@/components/pages/service/hero";
import { usePage } from "@/hooks/pages/usePage";
import { useService } from "@/hooks/service/useService";
import ServiceLayout from "@/layouts/service";

import { useParams } from "react-router-dom";
import ServiceHtmlBlocks from "@/components/pages/service/html_blocks";
import ServiceCarousel from "@/components/pages/service/carousel";
import ServicePriceTable from "@/components/pages/service/price_table";
import { EditableWrapper } from "@/components/edit/EditableWrapper";
import { EditToolbar } from "@/components/edit/EditToolBar";
import { EditSidebar } from "@/components/edit/EditSidebar";
import { useServiceDetail } from "@/hooks/service/useServiceDetail";
import ServiceDescription from "@/components/pages/service/description";
import CustomDivider from "@/components/divider";

export default function ServiceDetailPage() {
  const { serviceId } = useParams();
  const { data: service, isLoading } = useService({ serviceId: serviceId! });
  const { data: homeData, isLoading: homeLoading } = usePage("home");
  const { isLoading: serviceDetailLoading } = useServiceDetail();

  if (isLoading || homeLoading || serviceDetailLoading) {
    return <CustomLoader />;
  }

  return (
    <ServiceLayout>
      <EditToolbar />
      <EditSidebar />

      <Navbar navbar={homeData?.navbar} />

      <EditableWrapper id="service-hero">
        <ServiceHero service={service} />
      </EditableWrapper>

      <ServiceDescription service={service!} />

      {service && service.desc && <CustomDivider className="my-10" />}

      <EditableWrapper id="service-htmlblocks">
        <ServiceHtmlBlocks service={service!} />
      </EditableWrapper>

      <EditableWrapper id="service-carousel">
        <ServiceCarousel
          service={service!}
          className={
            service?.content?.priceTable?.length &&
            service?.content?.priceTable?.length > 1
              ? ""
              : " mb-20"
          }
        />
      </EditableWrapper>

      <EditableWrapper id="service-pricetable">
        <ServicePriceTable service={service!} />
      </EditableWrapper>

      <Footer footer={homeData?.footer} />
    </ServiceLayout>
  );
}