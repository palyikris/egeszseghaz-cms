/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import { Link } from "@heroui/link";

import { cn, resolveColor } from "@/lib/utils";
import { NavbarSchema } from "@/templates/home/home_schema";
import { signInWithGoogle } from "@/lib/auth";
import { useIsUserAuthenticated } from "@/hooks/useIsUserAuthenticated";

import { Avatar } from "@heroui/avatar";
import { auth } from "@/utils/firebase";
import { useQueryClient } from "@tanstack/react-query";

interface NavbarProps {
  navbar: NavbarSchema | undefined;
}

export default function Navbar({ navbar }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data, isLoading } = useIsUserAuthenticated();
  const queryClient = useQueryClient();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!navbar) return null;

  const links = navbar.links;
  const title = navbar.title?.text || "Egészségház";
  const titleColor = navbar.title?.color;
  const titleColorResolved = resolveColor(titleColor, "text");

  if (isLoading) {
    return null;
  }

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        scrolled
          ? `bg-primary/70 shadow-md backdrop-blur-lg border-b border-primary-dark/30`
          : "bg-transparent border-b border-primary-dark/20"
      )}
      id="nav"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className={cn(
            "text-2xl font-bold tracking-tight hover:text-primary transition-colors",
            titleColorResolved.className
          )}
          style={titleColorResolved.style}
        >
          {title}
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
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-accent transition-all duration-300 hover:w-full" />
              </Link>
            </motion.div>
          ))}
          {data ? (
            <div className="pl-4 w-auto flex justify-center items-center">
              <button
                className="w-auto p-0 bg-transparent border-0 cursor-pointer"
                onClick={async () => {
                  await auth.signOut();
                  queryClient.invalidateQueries({
                    queryKey: ["isUserAuthenticated"],
                  });
                }}
              >
                <Avatar
                  src={auth.currentUser?.photoURL || undefined}
                  size="md"
                  alt={auth.currentUser?.email || "User Avatar"}
                  isBordered
                  color="secondary"
                />
              </button>
            </div>
          ) : (
            <div className="pl-4 w-auto flex justify-center items-center">
              <Button
                variant="solid"
                color="primary"
                className="text-background-light"
                onPress={async () => {
                  await signInWithGoogle();
                  queryClient.invalidateQueries({
                    queryKey: ["isUserAuthenticated"],
                  });
                }}
              >
                Bejelentkezés
              </Button>
            </div>
          )}
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
