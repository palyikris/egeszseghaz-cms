/* eslint-disable prettier/prettier */

import Footer from "@/components/footer";
import CustomLoader from "@/components/loader";
import Navbar from "@/components/navbar";
import { usePage } from "@/hooks/usePage";
import { useService } from "@/hooks/useService";
import ServiceLayout from "@/layouts/service";
import { useParams } from "react-router-dom";


export default function ServiceContentPage() {

  const { serviceId } = useParams();
    const { data: service, isLoading } = useService({ serviceId: serviceId! });
    const { data: homeData, isLoading: homeLoading } = usePage("home");
  
    if (isLoading || homeLoading) {
      return <CustomLoader />;
    }


  return <ServiceLayout>
    <Navbar navbar={homeData?.navbar} />
    <main>
      <div>
        anyad
      </div>
    </main>
    <Footer footer={homeData?.footer} />
  </ServiceLayout>;
}