/* eslint-disable prettier/prettier */
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import CustomLoader from "@/components/loader";
import type { Service } from "@/types/services";
import { ImageInfo } from "@/lib/settings/media";
import ColorPicker from "@/components/color-picker";

type Props = {
  service: Service | null;
  images: ImageInfo[] | undefined;
  publishing: boolean;
  deleting: boolean;
  onChange: (s: Service) => void;
  onPublish: () => void;
  onDelete: () => void;
};

export default function ServiceForm({
  service,
  images,
  publishing,
  deleting,
  onChange,
  onPublish,
  onDelete,
}: Props) {
  if (!service) return <div>Válassz egy szolgáltatást szerkesztésre</div>;

  if (publishing || deleting) {
    return (
      <div className="text-center py-10">
        <CustomLoader />
        <div className="mt-2">
          {publishing && <div>Közzététel...</div>}
          {deleting && <div>Törlés...</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div>
        <Input
          id="service-id"
          type="text"
          value={service.id ?? ""}
          onChange={(e: any) => onChange({ ...service, id: e.target.value })}
          label="Szolgáltatás neve (ID)"
        />
      </div>

      <div>
        <Input
          id="service-coach"
          type="text"
          value={service.name ?? ""}
          onChange={(e: any) => onChange({ ...service, name: e.target.value })}
          label="Coach neve"
        />
      </div>

      <div>
        <Input
          id="service-phone"
          type="text"
          value={service.phone ?? ""}
          onChange={(e: any) => onChange({ ...service, phone: e.target.value })}
          label="Telefonszám"
        />
      </div>

      <div>
        <Select
          id="service-image"
          label="Image"
          selectedKeys={[service.img ?? ""]}
          onSelectionChange={(e: any) =>
            onChange({ ...service, img: e.currentKey })
          }
        >
          {images && images.length > 0 ? (
            images.map((img: any) => (
              <SelectItem key={img.url}>{img.name}</SelectItem>
            ))
          ) : (
            <SelectItem key="no-images">Nincsenek képek</SelectItem>
          )}
        </Select>
      </div>

      <div>
        <Textarea
          id="service-desc"
          value={service.desc ?? ""}
          onChange={(e: any) => onChange({ ...service, desc: e.target.value })}
          label="Szolgáltatás leírása"
        />
      </div>

      <div>
        <ColorPicker
          value={service.color ?? ""}
          onChange={(e) => {
            console.log(e);
            onChange({
              ...service,
              color: e,
            });
          }}
        />
      </div>

      <div className="pt-2">
        <Button className="w-full" color="primary" onPress={onPublish}>
          Közzététel
        </Button>
        <Button
          className="w-full mt-4"
          color="danger"
          onPress={onDelete}
          variant="ghost"
        >
          Törlés
        </Button>
      </div>
    </div>
  );
}
