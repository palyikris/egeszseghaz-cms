/* eslint-disable prettier/prettier */
import { useEditMode } from "@/context/edit/edit";
import { HeroEditor } from "./editors/home/HeroEditor";
import AboutEditor from "./editors/home/AboutEditor";
import ReviewsEditor from "./editors/home/ReviewsEditor";
import FooterEditor from "./editors/home/FooterEditor";
import NavbarEditor from "./editors/home/NavbarEditor";
import ServiceDetailEditor from "./editors/service/ServiceDetailEditor";
import { useState } from "react";
import ServicesEditor from "./editors/service/ServicesEditor";

type SidebarPosition = "left" | "right";

export function EditSidebar() {
  const { isEditMode, selectedId } = useEditMode();
  const [position, setPosition] = useState<SidebarPosition>("right");

  if (!isEditMode) return null;

  const componentMap: Record<string, React.ReactNode> = {
    // Here you can map selectedId to specific editor components
    // For example:
    // hero: <HeroEditor draft={draft} updateDrafte={updateDraft} />,
    hero: <HeroEditor />,
    about: <AboutEditor />,
    services: <ServicesEditor />,
    reviews: <ReviewsEditor />,
    footer: <FooterEditor />,
    navbar: <NavbarEditor />,
    // Service detail editors
    "service-hero": <ServiceDetailEditor />,
    "service-htmlblocks": <ServiceDetailEditor />,
    "service-carousel": <ServiceDetailEditor />,
    "service-pricetable": <ServiceDetailEditor />,
  };

  const editorComponent = selectedId ? componentMap[selectedId] : null;

  return (
    <div
      className={`fixed top-0 ${position === "right" ? "right-0" : "left-0"} h-full w-1/3 border-l border-border shadow-xl z-[10000] flex flex-col p-4 max-h-screen overflow-y-scroll transform ${selectedId ? "" : `pointer-events-none ${position === "right" ? "translate-x-[100%]" : "-translate-x-[100%]"}`} transition-all duration-100`}
    >
      <div className="w-full flex justify-between items-center mb-2 pb-2 border-b border-primary-dark">
        <h2 className="text-lg font-semibold text-primary-dark -mb-3">
          Edit Component: {selectedId?.toUpperCase()}
        </h2>
        <button
          className="border p-1 px-3 rounded-[5px] cursor-pointer border-border"
          onClick={() => {
            setPosition(position === "right" ? "left" : "right");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5 transform rotate-90"
          >
            <path
              fillRule="evenodd"
              d="M6.97 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L8.25 4.81V16.5a.75.75 0 0 1-1.5 0V4.81L3.53 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5Zm9.53 4.28a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V7.5a.75.75 0 0 1 .75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div
        className={`fixed -z-1 backdrop-blur-md bg-primary-light/80 w-1/3 ${position === "right" ? "right-0" : "left-0"} h-full top-0`}
      />
      {editorComponent}
    </div>
  );
}
