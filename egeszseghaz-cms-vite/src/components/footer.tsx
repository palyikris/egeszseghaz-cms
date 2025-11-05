/* eslint-disable prettier/prettier */
import { Link } from "@heroui/link";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-background-light py-16 px-8 md:px-20 relative">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-30 pointer-events-none" />

      <div className="relative grid grid-cols-1 md:grid-cols-4 gap-10 text-left z-10">
        {/* Column 1 — Logo & tagline */}
        <div>
          <h4 className="text-2xl font-bold mb-2 text-accent">
            Pesterzsébeti Egészségház
          </h4>
          <p className="text-sm opacity-80 leading-relaxed">
            Az egészség, mozgás és harmónia otthona. Várjuk szeretettel
            Pesterzsébet szívében!
          </p>
        </div>

        {/* Column 2 — Quick Links */}
        <div>
          <h5 className="text-lg font-semibold mb-3 text-accent">Navigáció</h5>
          <ul className="space-y-2 text-sm opacity-90">
            {[
              { label: "Kezdőlap", href: "/" },
              { label: "Rólunk", href: "/#about" },
              { label: "Szolgáltatások", href: "/#services" },
              { label: "Házirend", href: "/#rules" },
              { label: "Adatkezelési tájékoztató", href: "/#privacy" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-accent transition-colors text-inherit"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Contact */}
        <div>
          <h5 className="text-lg font-semibold mb-3 text-accent">
            Elérhetőségek
          </h5>
          <p className="flex justify-start items-center gap-2 text-sm opacity-90 leading-relaxed">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                clipRule="evenodd"
              />
            </svg>
            +36 30 573 2212
          </p>
          <p className="flex justify-start items-center gap-2 text-sm opacity-90 leading-relaxed">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4"
            >
              <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
              <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
            </svg>
            egfit.20@gmail.com
          </p>
          <p className="text-sm opacity-90 leading-relaxed flex justify-start items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                clipRule="evenodd"
              />
            </svg>
            Átlós utca 17–19, Budapest
          </p>
          <Link
            href="https://www.google.com/maps/place/Egészségház/@47.4235536,19.1048283,17z"
            target="_blank"
            className="inline-block mt-3 text-accent hover:underline"
          >
            Nézd meg térképen →
          </Link>
        </div>

        {/* Column 4 — Opening hours */}
        <div>
          <h5 className="text-lg font-semibold mb-3 text-accent">
            Nyitvatartás
          </h5>
          <p className="text-sm opacity-90 leading-relaxed">
            Hétfő – Péntek: 8:00 – 20:00
          </p>
          <p className="text-sm opacity-90 leading-relaxed">
            Szombat – Vasárnap: Zárva
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full border-t border-border mt-12 mb-6 opacity-40 relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-dark"
        >
          <path
            fillRule="evenodd"
            d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* Bottom bar */}
      <div className="relative flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-70">
        <p>© {year} Pesterzsébeti Egészségház. Minden jog fenntartva.</p>
        <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
          <Link
            href="#hero"
            color="primary"
            aria-label="Fel"
            className="rounded-full shadow-sm bg-primary-light p-3"
          >
            <ArrowUp size={25} color="#fff" />
          </Link>
        </motion.div>
      </div>
    </footer>
  );
}
