"use client";

import { Sparkles } from "lucide-react";
import { Badge } from "@/components/shadcn-ui/badge";
import { Skeleton } from "@/components/shadcn-ui/skeleton";
import { useGitHubStars } from "@/hooks/use-repo-stars";
import Link from "next/link";

export default function RepoStars() {
  const { stars, loading, error } = useGitHubStars(
    process.env.NEXT_PUBLIC_OWNER_NAME || "",
    process.env.NEXT_PUBLIC_REPOSITORY_NAME || ""
  );

  if (loading) {
    return <Skeleton className="h-6 w-32" />;
  }

  if (error) {
    return null
  }

  return (
    <Badge variant="outline" asChild>
      <Link
        href={process.env.NEXT_PUBLIC_REPOSITORY_URL || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-1 text-sm"
      >
        <Sparkles size={16} />
        <span>{stars} Stars on GitHub</span>
      </Link>
    </Badge>
  );
}
