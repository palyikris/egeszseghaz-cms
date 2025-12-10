/* eslint-disable prettier/prettier */
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";

import { useEditMode } from "@/context/edit/edit";
import { ReviewsSchema } from "@/templates/home/home_schema";
import { colorMap } from "@/types/edit";
import { Button } from "@heroui/button";

export function ReviewsEditor() {
  const { draft, updateDraft } = useEditMode();
  const reviews: ReviewsSchema = draft.reviews || {};

  const handleChange = (path: string, value: any) =>
    updateDraft(`reviews.${path}`, value);

  const updateCard = (path: string, value: any) =>
    handleChange(`card.${path}`, value);

  return (
    <div className="p-4 space-y-4 text-sm relative">
      <h3 className="font-semibold">Vélemények</h3>

      <div>
        <Input
          label="Címsor"
          type="text"
          value={reviews.heading?.text ?? ""}
          onChange={(e) => handleChange("heading.text", e.target.value)}
        />
      </div>

      <div>
        <Select
          label="Cím színe"
          selectedKeys={[reviews.heading?.color]}
          endContent={
            <span
              className={`px-[10px] py-[1px] bg-${reviews.heading?.color} rounded-full`}
            />
          }
          onSelectionChange={(e) => handleChange("heading.color", e.currentKey)}
        >
          {colorMap.map((c) => (
            <SelectItem key={c.name}>{c.name}</SelectItem>
          ))}
        </Select>
      </div>

      <hr />

      <h4 className="font-semibold">Forgó szöveg</h4>
      <div>
        <Textarea
          label="Forgó szöveg"
          value={reviews.spinningText?.text ?? ""}
          onChange={(e) => handleChange("spinningText.text", e.target.value)}
        />
      </div>
      <div>
        <Select
          label="Forgó szöveg színe"
          selectedKeys={[reviews.spinningText?.color]}
          endContent={
            <span
              className={`px-[10px] py-[1px] bg-${reviews.spinningText?.color} rounded-full`}
            />
          }
          onSelectionChange={(e) =>
            handleChange("spinningText.color", e.currentKey)
          }
        >
          {colorMap.map((c) => (
            <SelectItem key={c.name}>{c.name}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Input
            label="Forgási sugár"
            type="number"
            value={reviews.spinningText?.radius.toString() ?? "15"}
            onChange={(e) =>
              handleChange("spinningText.radius", Number(e.target.value))
            }
          />
        </div>
        <div>
          <Input
            label="Forgási idő"
            type="number"
            value={reviews.spinningText?.duration.toString() ?? "40"}
            onChange={(e) =>
              handleChange("spinningText.duration", Number(e.target.value))
            }
          />
        </div>
      </div>

      <hr />

      <h4 className="font-semibold">Kártya</h4>
      <div>
        <Select
          label="Kártya háttér"
          selectedKeys={[reviews.card?.bgColor]}
          endContent={
            <span
              className={`px-[10px] py-[1px] bg-${reviews.card?.bgColor} rounded-full`}
            />
          }
          onSelectionChange={(e) => updateCard("bgColor", e.currentKey)}
        >
          {colorMap.map((c) => (
            <SelectItem key={c.name}>{c.name}</SelectItem>
          ))}
        </Select>
      </div>

      <div>
        <Select
          label="Kártya szegély színe"
          selectedKeys={[reviews.card?.borderColor]}
          endContent={
            <span
              className={`px-[10px] py-[1px] bg-${reviews.card?.borderColor} rounded-full`}
            />
          }
          onSelectionChange={(e) => updateCard("borderColor", e.currentKey)}
        >
          {colorMap.map((c) => (
            <SelectItem key={c.name}>{c.name}</SelectItem>
          ))}
        </Select>
      </div>

      <div>
        <Select
          label="Kártya szöveg színe"
          selectedKeys={[reviews.card?.textColor]}
          endContent={
            <span
              className={`px-[10px] py-[1px] bg-${reviews.card?.textColor} rounded-full`}
            />
          }
          onSelectionChange={(e) => updateCard("textColor", e.currentKey)}
        >
          {colorMap.map((c) => (
            <SelectItem key={c.name}>{c.name}</SelectItem>
          ))}
        </Select>
      </div>

      <div>
        <Input
          label="Csillag színe (hex vagy token)"
          type="text"
          value={reviews.card?.starColor ?? ""}
          onChange={(e) => updateCard("starColor", e.target.value)}
        />
      </div>

      <div>
        <Input
          label="Csillag mérete (px)"
          type="number"
          value={reviews.card?.size ?? 6}
          onChange={(e) => updateCard("size", Number(e.target.value))}
        />
      </div>

      <div>
        <Select
          label="Szerző színe"
          selectedKeys={[reviews.card?.authorColor]}
          endContent={
            <span
              className={`px-[10px] py-[1px] bg-${reviews.card?.authorColor} rounded-full`}
            />
          }
          onSelectionChange={(e) => updateCard("authorColor", e.currentKey)}
        >
          {colorMap.map((c) => (
            <SelectItem key={c.name}>{c.name}</SelectItem>
          ))}
        </Select>
      </div>

      <hr />

      <h4>Vélemények</h4>
      <div>
        {reviews.reviews?.map((review, index) => {
          return (
            <div
              key={index}
              className="border border-muted rounded-md p-4 mb-4"
            >
              <h5 className="font-semibold mb-2">Vélemény {index + 1}</h5>
              <div className="mb-2">
                <Textarea
                  label="Vélemény szöveg"
                  value={review.text || ""}
                  onChange={(e) =>
                    handleChange(`reviews.${index}.text`, e.target.value)
                  }
                />
              </div>
              <div className="mb-2">
                <Input
                  label="Csillagok (0-5)"
                  type="number"
                  value={review.stars?.toString() || "0"}
                  onChange={(e) =>
                    handleChange(
                      `reviews.${index}.stars`,
                      Number(e.target.value)
                    )
                  }
                />
              </div>
              <div>
                <Input
                  label="Szerző neve"
                  type="text"
                  value={review.name || ""}
                  onChange={(e) =>
                    handleChange(`reviews.${index}.name`, e.target.value)
                  }
                />
              </div>
              <Button
                variant="ghost"
                color="danger"
                className="mt-2"
                onPress={() => {
                  const updatedReviews = reviews.reviews?.filter(
                    (_, i) => i !== index
                  );
                  handleChange("reviews", updatedReviews);
                }}
              >
                Vélemény törlése
              </Button>
            </div>
          );
        })}
        <Button
          color="primary"
          onPress={() => {
            const existing = reviews.reviews || [];
            const next = [...existing];

            next.push({ text: "", stars: 0, name: "" });

            handleChange("reviews", next);
          }}
          className="w-full"
        >
          Vélemény hozzáadása
        </Button>
      </div>
    </div>
  );
}

export default ReviewsEditor;
