import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

console.log("USING THIS CONFIG FILE");

const config: Config = {
  title: "Egészségház – Dokumentáció",
  url: "https://egeszseghaz-cms.vercel.app",
  baseUrl: "/",

  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.ts"),
        },
        blog: false,
      } satisfies Preset.Options,
    ],
  ],

  i18n: {
    defaultLocale: "en",
    locales: ["en", "hu"],
  },
};

export default config;
