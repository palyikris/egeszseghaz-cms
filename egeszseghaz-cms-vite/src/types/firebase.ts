/* eslint-disable prettier/prettier */
export type ComponentBlock =
  | {
      type: "text";
      text: string;
      color?: string;
      align?: "left" | "center" | "right";
    }
  | { type: "image"; url: string; alt?: string }
  | { type: "html"; html: string }
  | { type: "gallery"; items: { url: string; alt?: string }[] };

export interface PageDoc {
  id: string;
  meta?: { title?: string; description?: string };
  components: ComponentBlock[];
}
