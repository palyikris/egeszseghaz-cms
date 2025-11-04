# 🩺 Egeszseghaz CMS – Dynamic Health House Website System

> A modern, modular CMS system powering [https://www.erzsebetiegeszseghaz.hu](https://www.erzsebetiegeszseghaz.hu), rebuilt with Vite, TypeScript, Firebase, and a fully dynamic content layer.

---

## 🧱 1. Vision

The goal is to transform the current static website of **Pesterzsébet Egészségház** into a **fully editable CMS platform** where both the **main page** and **service pages** can be dynamically managed from an admin dashboard.

The new system should enable:
- Real-time content editing (text, images, colors, links)
- Component-based structure (editable navbar, banner, footer, sections)
- A service page inheritance model (base template + per-service overrides)
- WYSIWYG + HTML editing
- Firebase-powered database, storage, and authentication
- Modern, fast, Vite-based TypeScript frontend with HeroUI components
- Role-based admin dashboard
- Future extensibility (multi-language, SEO tools, analytics integration)

---

## 🧩 2. Tech Stack Overview

| Layer | Technology | Description |
|-------|-------------|-------------|
| **Frontend** | **Vite + React + TypeScript** | Lightweight, modular, and blazing fast. |
| **UI Library** | **HeroUI + Tailwind CSS + Framer Motion** | Elegant, modern, and easily themeable components. |
| **State Management** | **TanStack Query + Zustand** | Data fetching and lightweight global state. |
| **Backend / API** | **Firebase Functions (TypeScript)** | Serverless API endpoints for content CRUD and authentication. |
| **Database** | **Firebase Firestore** | Structured and scalable NoSQL for dynamic CMS content. |
| **Storage** | **Firebase Storage** | Image and file uploads for editable media blocks. |
| **Auth** | **Firebase Authentication** | Admin and editor login system. |
| **Hosting** | **Firebase Hosting** | Production hosting with automatic CI/CD from GitHub. |
| **Forms / Editors** | **Tiptap (WYSIWYG)** + **CodeMirror** | For rich text and HTML content blocks. |
| **Design System** | **Editable JSON Schemas per page** | Page and component structure stored as Firestore documents. |
| **Analytics (optional)** | Firebase Analytics | To measure visitor engagement. |

---

## ⚙️ 3. System Architecture

### 3.1. Firestore Structure

```
/pages
  ├── main
  │     ├── meta: { title, description, seo, colorPalette, ... }
  │     └── components: [
  │            { type: "hero", text: "...", image: "...", links: [...] },
  │            { type: "service-grid", serviceRefs: [...] },
  │            { type: "banner", ... },
  │            { type: "footer", ... }
  │          ]
  ├── templates
  │     └── service-default
  │            ├── layout: "default"
  │            ├── editableBlocks: ["header", "intro", "priceTable", "gallery"]
  │            └── defaultValues: { ... }
  ├── services
  │     ├── aquafitness
  │     │      ├── name: "AquaFitness"
  │     │      ├── desc: "...text..."
  │     │      ├── img: "...url..."
  │     │      ├── phone: "..."
  │     │      ├── overrides: { desc, timetable, gallery, etc. }
  │     │      └── templateRef: "service-default"
  │     └── gerincjóga
  │            └── ...
/media
  └── [images, videos, pdfs]
/users
  └── admin + editor profiles
```

---

## 🖥️ 4. Frontend Structure

### 4.1. App Layout (React + Vite)

```
src/
 ├── main.tsx
 ├── app/
 │    ├── router.tsx
 │    ├── providers/
 │    ├── hooks/
 │    ├── store/
 │    └── api/
 ├── components/
 │    ├── cms/
 │    │    ├── TextBlock.tsx
 │    │    ├── ImageBlock.tsx
 │    │    ├── HTMLBlock.tsx
 │    │    ├── TableBlock.tsx
 │    │    └── ...
 │    ├── layout/
 │    │    ├── Navbar.tsx
 │    │    ├── Footer.tsx
 │    │    └── Banner.tsx
 │    ├── admin/
 │    │    ├── Dashboard.tsx
 │    │    ├── Editor.tsx
 │    │    ├── MediaManager.tsx
 │    │    └── TemplateEditor.tsx
 ├── pages/
 │    ├── MainPage.tsx
 │    ├── ServicePage.tsx
 │    ├── AdminPage.tsx
 │    ├── SettingsPage.tsx
 │    └── LoginPage.tsx
 ├── styles/
 │    ├── globals.css
 │    ├── themes/
 │    │    ├── light.css
 │    │    └── dark.css
 └── utils/
      ├── firebase.ts
      ├── cms.ts
      └── formatters.ts
```

---

## 🧭 5. Admin Features

### 5.1. CMS Dashboard
- List and manage **pages**, **components**, and **services**
- Create new service (auto-clone from default template)
- Edit page components inline (text, image, colors)
- Reorder sections with drag-and-drop (e.g., via `dnd-kit`)
- Preview before publish

### 5.2. WYSIWYG Editing
- Rich text with Tiptap editor
- Switch to “code” mode for HTML editing
- Inline color picker for accent / theme color updates
- Upload media directly from editor

### 5.3. Templates System
- Default templates stored under `/pages/templates`
- Service pages “inherit” from template but can override sections
- Template editor supports locking certain blocks (e.g., layout)

### 5.4. Authentication & Roles
- Firebase Auth
  - `admin`: full access
  - `editor`: limited access to services
- Protected routes via React Router and Firebase context

---

## 🧪 6. Development Milestones

| Phase | Focus | Deliverables |
|-------|--------|--------------|
| **M1 – Setup & Architecture** | Initialize repo, CI/CD, Firebase config, basic Vite + TS + Tailwind setup | ✅ Firebase connected, base app shell |
| **M2 – Core CMS Engine** | Implement Firestore schema, CRUD logic, and data hooks | ✅ Dynamic page loading, data hydration |
| **M3 – Editable Frontpage** | Create editable main page: hero, banner, service grid, footer | ✅ Realtime content editing |
| **M4 – Template System** | Service template inheritance (create / override / edit blocks) | ✅ Default template + new service creation |
| **M5 – Admin Dashboard** | Full visual editor with authentication | ✅ Role-based UI, inline WYSIWYG |
| **M6 – Media Management** | File upload, gallery editing, image optimization | ✅ Firebase Storage integration |
| **M7 – Deployment & Polish** | SEO metadata, Lighthouse optimization, analytics, docs | ✅ Deployed to Firebase Hosting |

---

## 🛠️ 7. API Layer (Firebase Functions)

Each major operation is exposed via callable functions:

| Endpoint | Description | Method |
|-----------|--------------|--------|
| `/api/pages/get` | Fetch any page JSON (with cache) | GET |
| `/api/pages/update` | Update content of page / section | POST |
| `/api/services/create` | Create new service from default template | POST |
| `/api/services/delete` | Delete service and assets | DELETE |
| `/api/upload` | Upload and compress media | POST |

These functions are TypeScript Firebase Functions using:
- `firebase-admin` SDK
- `zod` for validation
- `sharp` for image optimization
- `uuid` for consistent IDs

---

## 🎨 8. CMS Editing Model

### Editable Block Types
| Block Type | Fields |
|-------------|---------|
| `text` | text, typography, color, alignment |
| `image` | url, alt, style, link |
| `html` | raw HTML |
| `table` | structured 2D array |
| `gallery` | array of images |
| `button` | label, link, color |
| `embed` | iframe src or video |
| `spacer` | height, color |
| `section` | composable group of blocks |

Each block type maps to a React component in `/components/cms/blocks`.

---

## 🧑‍💻 9. Developer Workflow

```bash
# clone project
git clone https://github.com/kristofpalyi/egeszseghaz-cms

# install deps
cd egeszseghaz-cms
pnpm install

# setup firebase
firebase login
firebase init hosting functions firestore storage

# run locally
pnpm dev

# deploy
pnpm build && firebase deploy
```

---

## 🔒 10. Security & Roles

- Only authenticated admins can edit content
- Realtime listeners use security rules:
  ```js
  match /pages/{pageId} {
    allow read: if true;
    allow write: if request.auth != null && request.auth.token.role == 'admin';
  }
  ```
- Media uploads restricted to `admin` and `editor` roles
- Logs stored in `/auditLogs`

---

## 🚀 11. Future Enhancements

- Multi-language content (`/pages/main_hu`, `/pages/main_en`)
- SEO metadata editor per page
- Analytics dashboard for traffic and service popularity
- Integration with Google Calendar for booking (optional)
- Static export for SEO caching

---

## 📁 12. Directory Summary

```
egeszseghaz-cms/
 ├── frontend/ (Vite + HeroUI)
 ├── functions/ (Firebase Functions)
 ├── firestore.rules
 ├── PLAN.md
 ├── README.md
 ├── .firebaserc
 └── firebase.json
```

---

## 🧩 13. Core Principles

- 🔁 **Modular Content Blocks** – everything editable and composable  
- 🎨 **Design Consistency** – brand colors & styles centralized  
- ⚡ **Performance** – instant loading via Firestore cache + CDN  
- 🔐 **Security** – strict role-based editing  
- 🧠 **Maintainability** – clean TypeScript structure  
- 🌍 **Scalability** – extensible to other clinics or sub-domains  

---

## ✅ 14. Next Steps

1. **Initialize Vite + Tailwind + HeroUI project**
2. **Setup Firebase (Firestore, Storage, Auth, Hosting, Functions)**
3. **Design Firestore structure in `seed_data.ts`**
4. **Implement dynamic homepage rendering from Firestore**
5. **Build admin dashboard with Tiptap + drag-drop**
6. **Add service template inheritance logic**
7. **Polish, test, and deploy**

---

### Author
**Kristóf Pályi**
Lead Developer & Designer  
[https://www.erzsebetiegeszseghaz.hu](https://www.erzsebetiegeszseghaz.hu)
