/* eslint-disable prettier/prettier */

import CustomLoader from "@/components/loader";
import { useService } from "@/hooks/useService";
import { useParams } from "react-router-dom";


export default function ServiceDetailPage() {

  const { serviceId } =  useParams();

  const { data: service, isLoading } = useService({ serviceId: serviceId! });
  
  if (isLoading) {
    return <CustomLoader />
  }

  return <div>
    <h1>Service Detail Page</h1>
    {service ? (
      <div>
        <h2>{service.id}</h2>
        <p>{service.desc}</p>
      </div>
    ) : (
      <p>Service not found.</p>
    )}
  </div>;
}