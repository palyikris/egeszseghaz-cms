/* eslint-disable prettier/prettier */
import { PALETTES } from "@/palettes/themes";
import { usePalette } from "@/hooks/usePalette";
import { useUpdatePalette } from "@/hooks/useUpdatePalette";
import { Button } from "@heroui/button";

export default function PrebuiltPalettes() {
  const { data: active } = usePalette();
  const update = useUpdatePalette();

  // active could be a string or object depending on your hook; normalize to name string
  const activeName = typeof active === "string" ? active : active?.name;

  return (
    <div className="space-y-4 max-h-screen overflow-y-auto w-full pt-6 px-4">
      <h3 className="text-lg font-semibold">Téma</h3>

      <div>
        <Button color="primary" onPress={() => update.mutate("wellness")}>
          Alapértelmezés visszaállítása
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-10 p-4">
        {PALETTES.map((theme) => {
          const isActive = activeName === theme.name;

          return (
            <button
              key={theme.name}
              aria-pressed={isActive}
              onClick={() => update.mutate(theme.name)}
              className={
                "relative px-4 py-30 flex justify-center items-center rounded-lg transition-transform " +
                (isActive
                  ? "ring-4 ring-offset-2 ring-offset-white ring-primary scale-105 shadow-lg"
                  : "hover:scale-105")
              }
              style={{
                backgroundColor: theme.light.primary,
                backgroundImage: `linear-gradient(135deg, ${theme.light.primary}, ${theme.light.secondary})`,
              }}
            >
              <div className="font-medium text-white">{theme.label}</div>

              {isActive && (
                <span className="absolute top-2 right-2 bg-white/90 text-indigo-700 rounded-full p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
