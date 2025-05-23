"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Sparkles } from "lucide-react";

/**
 * Composant de bandeau d'en-tête pour la page d'accueil
 * Affiche une bannière promotionnelle avec un lien
 * @param {boolean} isVisible - Détermine si le bandeau doit être affiché
 */
export default function HomeHeadband({ isVisible }: { isVisible: boolean }) {
  const pathname = usePathname();

  if (!isVisible || pathname !== "/") {
    return null;
  }

  return (
    <Link
      href="/"
      className="relative w-full h-10 px-4 flex items-center justify-center gap-2 border-b bg-blue-500 text-white"
    >
      <Sparkles size={16} />
      <span>Try free for 14 days</span>
      <ChevronRight size={16} />
    </Link>
  );
}
