/* eslint-disable prettier/prettier */
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "@/components/navbar";
import { Button } from "@heroui/button";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const navigate = useNavigate();

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
    <div className="relative flex flex-col h-screen">
      <Navbar />
      {children}
      <footer className="bg-primary-dark text-background-light py-12 text-center">
        <h4 className="text-xl font-semibold mb-2">
          Pesterzsébeti Egészségház
        </h4>
        <p className="text-sm opacity-80">
          Átlós utca 17–19, Budapest | Telefon: +36 1 234 5678 | Email:
          info@erzsebetiegeszseghaz.hu
        </p>
        <p className="text-xs mt-4 opacity-60">
          © {new Date().getFullYear()} Minden jog fenntartva
        </p>
        <Button
          onPress={() => {
            navigate("#hero");
          }}
        >
          Fel
        </Button>
      </footer>
    </div>
  );
}
