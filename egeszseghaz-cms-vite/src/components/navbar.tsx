/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import { Link } from "@heroui/link";

const links = [
  { href: "/", label: "Kezdőlap" },
  { href: "/#about", label: "Rólunk" },
  { href: "/#services", label: "Szolgáltatások" },
  { href: "/#contact", label: "Kapcsolat" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-primary/90 shadow-md backdrop-blur-lg border-b border-primary-dark/30"
          : "bg-transparent border-b border-primary-dark/20"
      }`}
      id="nav"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-primary-dark hover:text-primary transition-colors"
        >
          Egészségház
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8 items-center">
          {links.map((link) => (
            <motion.div key={link.href} whileHover={{ y: -1 }}>
              <Link
                href={link.href}
                className="relative text-text-primary font-medium transition-colors hover:text-primary-dark"
              >
                {link.label}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-accent transition-all duration-300 hover:w-full"></span>
              </Link>
            </motion.div>
          ))}
          {/* <Button
            variant="flat"
            color="secondary"
            size="sm"
            className="font-semibold text-sm shadow-sm"
          >
            Bejelentkezés
          </Button> */}
        </div>

        {mobileMenuOpen && (
          <div className="absolute top-full right-4 bg-primary rounded-lg shadow-lg mt-2 w-48 flex flex-col z-50">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 text-text-primary hover:bg-primary/20 transition-colors border-b last:border-b-0"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {/* Mobile placeholder */}
        <div className="md:hidden">
          <Button
            variant="light"
            color="primary"
            className="rounded-xl"
            aria-label="Menu"
            onPress={() => {
              setMobileMenuOpen(!mobileMenuOpen);
            }}
          >
            ☰
          </Button>
        </div>
      </div>
    </nav>
  );
}
