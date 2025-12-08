/* eslint-disable prettier/prettier */
import { useEditMode } from "@/context/edit/edit";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { colorMap } from "@/types/edit";

export default function ServiceDetailEditor() {
  const { draft, updateDraft } = useEditMode();
  

  const styles = draft?.serviceDetail?.styles || {};

  const handle = (path: string, value: any) =>
    updateDraft(`serviceDetail.styles.${path}`, value);

  return (
    <div className="p-4 space-y-4 text-sm relative">
      <h3 className="font-semibold text-primary-dark">Service Detail Styles</h3>

      <div>
        <h4 className="font-semibold">Hero</h4>
        <Select
          selectedKeys={[styles?.hero?.titleColor]}
          label="Title color"
          onSelectionChange={(e) => handle("hero.titleColor", e.currentKey)}
        >
          {colorMap.map((c) => (
            <SelectItem key={c.name}>{c.name}</SelectItem>
          ))}
        </Select>

        <Select
          selectedKeys={[styles?.hero?.subtitleColor]}
          label="Subtitle color"
          onSelectionChange={(e) => handle("hero.subtitleColor", e.currentKey)}
          className="my-2"
        >
          {colorMap.map((c) => (
            <SelectItem key={c.name}>{c.name}</SelectItem>
          ))}
        </Select>

        <Input
          type="text"
          value={styles?.hero?.bgColor ?? ""}
          onChange={(e) => handle("hero.bgColor", e.target.value)}
          label="BG color utility"
        />
      </div>

      <hr />

      <div>
        <h4 className="font-semibold">HTML Blocks</h4>
        <Select
          selectedKeys={[styles?.htmlBlocks?.headingColor]}
          label="Heading color"
          onSelectionChange={(e) => handle("htmlBlocks.headingColor", e.currentKey)}
        >
          {colorMap.map((c) => (
            <SelectItem key={c.name}>{c.name}</SelectItem>
          ))}
        </Select>
        <Select
          selectedKeys={[styles?.htmlBlocks?.textColor]}
          label="Text color"
          onSelectionChange={(e) => handle("htmlBlocks.textColor", e.currentKey)}
          className="mt-2"
        >
          {colorMap.map((c) => (
            <SelectItem key={c.name}>{c.name}</SelectItem>
          ))}
        </Select>
      </div>

      <hr />

      <div>
        <h4 className="font-semibold">Carousel</h4>
        <Input
          type="text"
          value={styles?.carousel?.arrowColor ?? ""}
          onChange={(e) => handle("carousel.arrowColor", e.target.value)}
          label="Arrow color utility"
        />
        <Input
          type="text"
          value={styles?.carousel?.dotColor ?? ""}
          onChange={(e) => handle("carousel.dotColor", e.target.value)}
          label="Dot color utility"
          className="mt-2"
        />
      </div>

      <div>
        <h4 className="font-semibold">Price Table</h4>
        <Select
          selectedKeys={[styles?.priceTable?.headingColor]}
          label="Heading color"
          onSelectionChange={(e) => handle("priceTable.headingColor", e.currentKey)}
        >
          {colorMap.map((c) => (
            <SelectItem key={c.name}>{c.name}</SelectItem>
          ))}
        </Select>
        <Select
          selectedKeys={[styles?.priceTable?.priceColor]}
          label="Price color"
          onSelectionChange={(e) => handle("priceTable.priceColor", e.currentKey)}
          className="my-2"
        >
          {colorMap.map((c) => (
            <SelectItem key={c.name}>{c.name}</SelectItem>
          ))}
        </Select>

        <Input
          type="text"
          value={styles?.priceTable?.rowBg ?? ""}
          onChange={(e) => handle("priceTable.rowBg", e.target.value)}
          label="Row bg utility"
        />
      </div>
    </div>
  );
}
