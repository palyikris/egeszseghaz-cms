/* eslint-disable prettier/prettier */
import { PALETTES } from "@/palettes/themes";
import { usePalette } from "@/hooks/usePalette";
import { useUpdatePalette } from "@/hooks/useUpdatePalette";

export default function GeneralSettings() {
  const { data: active } = usePalette();
  const update = useUpdatePalette();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Theme</h3>

      <div className="grid grid-cols-1 gap-4">
        {PALETTES.map((theme) => (
          <button
            key={theme.name}
            onClick={() => update.mutate(theme.name)}
            className={`p-4 rounded-lg border ${
              active?.name === theme.name ? "border-primary" : "border-muted"
            }`}
          >
            <div className="font-medium">{theme.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
