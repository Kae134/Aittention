"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Sparkles } from 'lucide-react';

export default function HomeHeadband({ isVisible }: { isVisible: boolean }) {
  const pathname = usePathname();

  if (!isVisible || pathname !== "/") {
    return null;
  }

  return (
    <Link href="/" className="sticky top-0 left-0 w-full h-10 px-4 flex items-center justify-center gap-2 border-b bg-blue-500 text-white">
        <Sparkles size={16} />
        <span>Essayez gratuitement 14 jours</span>
        <ChevronRight size={16} />
    </Link>
  );
}