/* eslint-disable prettier/prettier */
import ServiceCard from "@/components/pages/home/service_card";
import type { Service } from "@/types/services";

type Props = {
  services: Service[] | undefined;
  selectedId?: string | null;
  onSelect: (s: Service) => void;
  cardTemplate: any;
};

export default function ServiceList({ services, selectedId, onSelect, cardTemplate }: Props) {
  return (
    <div className="w-2/3 grid grid-cols-2 gap-4 max-h-[70vh] overflow-auto hide-scrollbar">
      {(services || []).map((svc: any, i: number) => (
        <button
          key={svc.id || i}
          onClick={() => onSelect(svc as Service)}
          className={`cursor-pointer rounded-sm flex justify-center items-center m-2 p-4 ${selectedId === svc.id ? "ring-2 ring-primary" : ""}`}
        >
          <ServiceCard service={svc} i={i} cardTemplate={cardTemplate} />
        </button>
      ))}
    </div>
  );
}
