# 🧭 Egeszseghaz CMS – Development Roadmap (STEPS.md)

> This document defines the milestones and step-by-step breakdown of the full CMS development based on the PLAN.md architecture.

---

## 🏗️ Milestone 1 – Project Initialization & Setup

**Goal:** Prepare the foundation for the CMS project, including Firebase configuration, environment setup, and base structure.

### Steps:
1. **Create project repo** – Initialize GitHub repository `egeszseghaz-cms`.
2. **Setup Vite + React + TypeScript** – Run `pnpm create vite@latest frontend --template react-ts`.
3. **Install dependencies:**
   ```bash
   pnpm add tailwindcss @hero-ui/react framer-motion @tanstack/react-query zustand firebase
   pnpm add -D typescript eslint prettier autoprefixer postcss
   ```
4. **Initialize Tailwind** – `npx tailwindcss init -p`, add paths to `content`.
5. **Add HeroUI + theme config** – Set up global theme colors for brand consistency.
6. **Setup Firebase project** – Initialize Firestore, Storage, Functions, Hosting, and Auth.
7. **Create `/functions` folder** – Initialize TypeScript Firebase functions (`firebase init functions`).
8. **Create `.firebaserc` and `firebase.json`** – Define hosting targets and functions deployment.
9. **Connect frontend to Firebase** – Create `src/utils/firebase.ts` with initialized app config.
10. **Add GitHub Actions CI/CD** – Auto-deploy to Firebase Hosting on main branch push.

✅ *Result:* Running base app on Firebase Hosting, connected to Firestore and Storage.

---

## 🧩 Milestone 2 – Core CMS Engine & Firestore Schema

**Goal:** Implement the Firestore data model and hooks for CRUD operations.

### Steps:
1. **Design Firestore schema:** `/pages`, `/templates`, `/services`, `/users`, `/media`.
2. **Create TypeScript interfaces for CMS entities:**  
   `Page`, `ComponentBlock`, `Service`, `Template`, `UserRole`.
3. **Implement CMS API hooks:**  
   - `usePage(id)` → loads a page and subscribes to realtime updates  
   - `useUpdatePage()` → commits edited sections  
   - `useServices()` → list of all services  
   - `useTemplate(id)` → fetch default service template
4. **Setup Firebase security rules:** Allow read for all, restrict write to admin roles.
5. **Seed Firestore with demo data:** Base `main` page and `service-default` template.
6. **Implement reusable Firestore CRUD utils in `/utils/cms.ts`.**
7. **Create data context providers using React Query.**
8. **Add loading and error states for every Firestore call.**

✅ *Result:* CMS content dynamically loaded from Firestore, fully reactive and structured.

---

## 🖥️ Milestone 3 – Editable Main Page (Dynamic Frontpage)

**Goal:** Make the homepage fully dynamic, editable, and data-driven.

### Steps:
1. **Fetch `main` page structure from Firestore.**
2. **Render CMS components:**  
   Hero, service grid, banner, footer → based on Firestore `components[]` array.
3. **Create `/components/cms/` library:**  
   - `TextBlock.tsx`  
   - `ImageBlock.tsx`  
   - `HTMLBlock.tsx`  
   - `ButtonBlock.tsx`  
   - `GalleryBlock.tsx`
4. **Implement inline editing logic:**  
   - Click → edit mode (text/image/HTML)
   - Save → update Firestore document
5. **Add color picker & typography controls (HeroUI popovers).**
6. **Setup live preview mode.**
7. **Build “Save changes” confirmation modal.**
8. **Add undo/redo buffer in editing mode.**

✅ *Result:* The main page loads and updates entirely via Firestore. Admins can live-edit text, colors, and images.

---

## 🧠 Milestone 4 – Template & Service System

**Goal:** Implement the “service inheritance” system with editable templates.

### Steps:
1. **Create default service template** (`/pages/templates/service-default`).  
2. **When a new service is created:**  
   - Clone from `service-default`.  
   - Create `/pages/services/{serviceId}` document.
3. **Render ServicePage.tsx dynamically:**  
   - Base layout from template  
   - Override blocks from service document
4. **Implement inheritance logic:**  
   `mergedBlocks = deepMerge(template.blocks, service.overrides)`
5. **Add “Edit Template” and “Edit Service” modes in admin.**
6. **Add lockable template blocks (cannot be edited in derived services).**
7. **Add preview link for each service page.**
8. **Implement SEO fields for each service page.**

✅ *Result:* Each service page inherits from a global editable template, with per-service overrides.

---

## 🧑‍💼 Milestone 5 – Admin Dashboard & WYSIWYG Editing

**Goal:** Provide a full-featured CMS admin interface with authentication and roles.

### Steps:
1. **Setup Firebase Auth** (Email/Password).  
2. **Create `/pages/LoginPage.tsx` and `/pages/AdminPage.tsx`.**
3. **Add role-based protection:** only `admin` and `editor` can access dashboard.
4. **Build Dashboard layout (HeroUI Cards + Sidebar):**  
   - Pages list  
   - Services list  
   - Media manager  
   - Template editor
5. **Integrate Tiptap Editor for text blocks.**
6. **Add CodeMirror editor for HTML blocks.**
7. **Add drag-and-drop reordering for sections (using `dnd-kit`).**
8. **Add preview toggle and publish button.**
9. **Implement notification system for save/publish states.**

✅ *Result:* A secure, visual admin dashboard with WYSIWYG editing, roles, and page management.

---

## 🖼️ Milestone 6 – Media Management System

**Goal:** Allow uploading and managing media files with Firebase Storage integration.

### Steps:
1. **Setup Firebase Storage rules (authenticated users only).**
2. **Create `/components/admin/MediaManager.tsx`.**
3. **Allow drag-and-drop uploads.**
4. **Auto-generate thumbnails with Firebase Function using `sharp`.**
5. **Display media gallery with filtering and sorting.**
6. **Support image replacement in CMS editor.**
7. **Allow renaming and deletion of media files.**
8. **Store file metadata (size, type, URL, alt) in Firestore `/media` collection.**

✅ *Result:* Fully functional media manager integrated with the CMS editor.

---

## 🚀 Milestone 7 – Deployment, Optimization & SEO

**Goal:** Deploy, test, and optimize the final system for performance and SEO.

### Steps:
1. **Setup environment variables for production Firebase.**
2. **Optimize build using `vite build --mode production`.**
3. **Run Lighthouse audit and fix performance issues.**
4. **Add SEO meta tags for each page (from Firestore).**
5. **Enable gzip and image compression.**
6. **Setup 301 redirects for legacy URLs.**
7. **Add Firebase Analytics tracking.**
8. **Deploy with `firebase deploy`.**
9. **Perform full QA testing and bugfix round.**
10. **Publish changelog and user guide (PDF).**

✅ *Result:* Production-ready CMS deployed on Firebase Hosting.

---

## 📈 Milestone 8 – Future Enhancements (Post-Launch)

1. Multi-language support (`main_hu`, `main_en`).
2. Component marketplace (predefined hero/banner layouts).
3. AI-assisted content generation (using OpenAI API).
4. Advanced analytics dashboard (visits, engagement).
5. Scheduled content publishing (cron in Firebase Functions).

---

### 🧾 Author

**Kristóf Pályi**  
Lead Developer & Designer  
[https://www.erzsebetiegeszseghaz.hu](https://www.erzsebetiegeszseghaz.hu)
