# 🎨 Egeszseghaz CMS Color Palette

> Upgraded professional palette inspired by the original website's warm, earthy tones — now modernized with teal and gold accents for a formal wellness aesthetic.

---

## 🩺 Brand Concept
> “Calm wellness meets clinical trust.”  
> A soothing combination of **warm neutrals** and **modern teal highlights**, reflecting both relaxation and professionalism.

---

## 🌈 Core Palette

| Role | Color | HEX | Description |
|------|--------|------|-------------|
| **Primary** | ![#8E715B](https://placehold.co/20x20/8E715B/8E715B.png) | `#8E715B` | Refined earthy brown — main brand tone, reminiscent of the current logo’s wood/wellness base. |
| **Primary Light** | ![#BFA590](https://placehold.co/20x20/BFA590/BFA590.png) | `#BFA590` | Softer beige tint for hover and accents. |
| **Primary Dark** | ![#604A3A](https://placehold.co/20x20/604A3A/604A3A.png) | `#604A3A` | Deep tone for emphasis (e.g. navbar or buttons). |
| **Secondary** | ![#4BA6A3](https://placehold.co/20x20/4BA6A3/4BA6A3.png) | `#4BA6A3` | Gentle teal — adds freshness and trust, contrasts warm base. |
| **Secondary Light** | ![#7FC9C6](https://placehold.co/20x20/7FC9C6/7FC9C6.png) | `#7FC9C6` | Soft aqua for backgrounds and highlights. |
| **Secondary Dark** | ![#2B6E6C](https://placehold.co/20x20/2B6E6C/2B6E6C.png) | `#2B6E6C` | Muted teal for focused elements. |
| **Accent** | ![#E6B655](https://placehold.co/20x20/E6B655/E6B655.png) | `#E6B655` | Modern gold accent — used for highlights, links, hover transitions. |

---

## ⚪ Neutral & UI Palette

| Role | Color | HEX | Description |
|------|--------|------|-------------|
| **Background (light)** | ![#F8F5F1](https://placehold.co/20x20/F8F5F1/F8F5F1.png) | `#F8F5F1` | Elegant off-white background. |
| **Background (dark)** | ![#1C1C1C](https://placehold.co/20x20/1C1C1C/1C1C1C.png) | `#1C1C1C` | For dark mode or admin UI. |
| **Surface** | ![#FFFFFF](https://placehold.co/20x20/FFFFFF/FFFFFF.png) | `#FFFFFF` | Clean panels and cards. |
| **Text Primary** | ![#2E2E2E](https://placehold.co/20x20/2E2E2E/2E2E2E.png) | `#2E2E2E` | Main typography. |
| **Text Secondary** | ![#5C5C5C](https://placehold.co/20x20/5C5C5C/5C5C5C.png) | `#5C5C5C` | Secondary / muted text. |
| **Border / Divider** | ![#E2DAD1](https://placehold.co/20x20/E2DAD1/E2DAD1.png) | `#E2DAD1` | Subtle warm border tone. |
| **Error** | ![#D35D5D](https://placehold.co/20x20/D35D5D/D35D5D.png) | `#D35D5D` | Warm red for warnings. |
| **Success** | ![#4BA674](https://placehold.co/20x20/4BA674/4BA674.png) | `#4BA674` | Green-turquoise success. |

---

## 💡 Tailwind Theme Example

```ts
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#8E715B',
        light: '#BFA590',
        dark: '#604A3A',
      },
      secondary: {
        DEFAULT: '#4BA6A3',
        light: '#7FC9C6',
        dark: '#2B6E6C',
      },
      accent: '#E6B655',
      background: {
        light: '#F8F5F1',
        dark: '#1C1C1C',
      },
      text: {
        primary: '#2E2E2E',
        secondary: '#5C5C5C',
      },
      border: '#E2DAD1',
      error: '#D35D5D',
      success: '#4BA674',
    },
  },
}
```

---

## 🧠 Design Notes

- The **warm browns** maintain brand recognition.
- The **teal secondary palette** introduces a *health/spa freshness*.
- The **gold accent** provides subtle prestige without losing natural harmony.
- Works equally well in **light and dark mode**.
- Meets **AA+ contrast** requirements for accessibility.

---

### Author
**Kristóf Pályi**  
Lead Developer & Designer  
[https://www.erzsebetiegeszseghaz.hu](https://www.erzsebetiegeszseghaz.hu)
