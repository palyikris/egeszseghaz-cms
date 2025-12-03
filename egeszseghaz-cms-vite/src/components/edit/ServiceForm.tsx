/* eslint-disable prettier/prettier */
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import CustomLoader from "@/components/loader";
import type { Service } from "@/types/services";

type Props = {
  service: Service | null;
  images: any[] | undefined;
  publishing: boolean;
  deleting: boolean;
  onChange: (s: Service) => void;
  onPublish: () => void;
  onDelete: () => void;
};

export default function ServiceForm({ service, images, publishing, deleting, onChange, onPublish, onDelete }: Props) {
  if (!service) return <div>Select a service to edit</div>;

  if (publishing || deleting) {
    return (
      <div className="text-center py-10">
        <CustomLoader />
        <div className="mt-2">
          {publishing && <div>Publishing...</div>}
          {deleting && <div>Deleting...</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div>
        <Input id="service-id" type="text" value={service.name ?? ""} onChange={(e: any) => onChange({ ...service, name: e.target.value })} label="Service Name (ID)" />
      </div>

      <div>
        <Input id="service-coach" type="text" value={(service as any).coach ?? ""} onChange={(e: any) => onChange({ ...service, coach: e.target.value })} label="Coach Name" />
      </div>

      <div>
        <Input id="service-phone" type="text" value={service.phone ?? ""} onChange={(e: any) => onChange({ ...service, phone: e.target.value })} label="Phone Number" />
      </div>

      <div>
        <Select id="service-image" label="Image" selectedKeys={[service.img ?? ""]} onSelectionChange={(e: any) => onChange({ ...service, img: e.currentKey })}>
          {images && images.length > 0 ? (
            images.map((img: any) => <SelectItem key={img.url}>{img.name}</SelectItem>)
          ) : (
            <SelectItem key="no-images">No images</SelectItem>
          )}
        </Select>
      </div>

      <div>
        <Textarea id="service-desc" value={service.desc ?? ""} onChange={(e: any) => onChange({ ...service, desc: e.target.value })} label="Service Description" />
      </div>

      <div className="pt-2">
        <Button className="w-full" color="primary" onPress={onPublish}>
          Publish
        </Button>
        <hr className="my-4" />
        <Button className="w-full" color="danger" onPress={onDelete} variant="ghost">
          Delete
        </Button>
      </div>
    </div>
  );
}
