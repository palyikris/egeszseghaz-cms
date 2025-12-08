/* eslint-disable prettier/prettier */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";


export default function ServiceLayout({ children }: { children: React.ReactNode }) {

  const location = useLocation();
  
    useEffect(() => {
      const scrollToHash = (hash: string | null) => {
        if (!hash) return;
        const id = hash.startsWith("#") ? hash.slice(1) : hash;
  
        let attempts = 0;
        const maxAttempts = 10;
        const interval = 100; // ms
  
        const tryScroll = () => {
          attempts += 1;
          const el = document.getElementById(id);
  
          if (el) {
            // Use native smooth behavior
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          } else if (attempts < maxAttempts) {
            setTimeout(tryScroll, interval);
          }
        };
  
        // Run on next tick to allow layout/mount to happen
        setTimeout(tryScroll, 0);
      };
  
      // On every location change, handle the hash
      scrollToHash(location.hash || null);
  
      // Also listen to hashchange events (covers direct window.location.hash changes)
      const onHashChange = () => scrollToHash(window.location.hash || null);
  
      window.addEventListener("hashchange", onHashChange);
  
      return () => window.removeEventListener("hashchange", onHashChange);
    }, [location]);


  return (
    <div className="relative flex flex-col min-h-screen bg-background-light">
      {children}
    </div>
  );
}