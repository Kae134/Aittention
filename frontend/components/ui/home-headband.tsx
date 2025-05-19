"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Sparkles, X } from 'lucide-react';
import { Button } from "../shadcn-ui/button";

export default function HomeHeadband({ isVisible }: { isVisible: boolean }) {
  const pathname = usePathname();

  if (!isVisible || pathname !== "/") {
    return null;
  }

  return (
    <Link href="/" className="relative w-full h-10 px-4 flex items-center justify-center gap-2 border-b bg-blue-500 text-white">
        <Sparkles size={16} />
        <span>Essayez gratuitement 14 jours</span>
        <ChevronRight size={16} />
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
        >
          <X size={16} />
        </button>
    </Link>
  );
}