"use client";

"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import AppLogo from "@/components/ui/app-logo";
import { Button } from "@/components/shadcn-ui/button";
import RepoStars from "@/components/ui/repo-stars";
import {
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
  useEffect,
} from "react";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/product", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
  { href: "/product", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export default function HomeNavbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="sticky top-0 left-0 w-full z-30 shadow-lg"
    >
      <div className="w-full h-16 px-4 flex items-center justify-between border-b border-white/10 bg-gradient-to-br from-[#18181b]/80 to-[#23272f]/80 backdrop-blur-md">
        <nav className="container mx-auto flex items-center justify-between h-full">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <AppLogo />
              <Link
                href="/"
                className="text-xl font-extrabold uppercase tracking-widest text-white drop-shadow-sm"
              >
                Aittention
              </Link>
            </div>
            <nav className="flex items-center space-x-6">
              {LINKS.map((link) => (
                <motion.div
                  key={link.href}
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                >
                  <Link
                    href={`${link.href}`}
                    className="relative font-semibold text-base text-white/80 hover:text-primary transition-colors duration-200 px-2 py-1"
                  >
                    <span className="inline-block pb-0.5 border-b-2 border-transparent hover:border-primary transition-all duration-200">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-3">
            <RepoStars />
            <ThemeToggle />
            <motion.div
              whileHover={{ scale: 1.06, boxShadow: "0 2px 16px 0 #6366f1aa" }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              <Button
                variant="outline"
                className="cursor-pointer border-white/20 hover:border-primary/80 bg-white/5 hover:bg-white/10 text-white font-semibold transition-all duration-200"
                size="default"
                asChild
              >
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.09, boxShadow: "0 4px 32px 0 #6366f1cc" }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              <Button
                variant="default"
                className="cursor-pointer bg-gradient-to-r from-[#6366f1] to-[#818cf8] text-white font-bold shadow-lg hover:shadow-xl border-0 px-5 py-2 rounded-xl transition-all duration-200"
                asChild
              >
                <Link href="/mvp">Get Started for Free</Link>
              </Button>
            </motion.div>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
