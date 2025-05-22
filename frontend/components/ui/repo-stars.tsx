"use client";

import env from "@/lib/env";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/shadcn-ui/badge";
import { Skeleton } from "@/components/shadcn-ui/skeleton";
import { useGitHubStars } from "@/hooks/use-repo-stars";
import Link from "next/link";

/**
 * Composant qui affiche le nombre d'étoiles d'un dépôt GitHub
 * Récupère les données depuis l'API GitHub et les affiche dans un badge
 */
export default function RepoStars() {
  const ownerName = env.NEXT_PUBLIC_OWNER_NAME;
  const repositoryName = env.NEXT_PUBLIC_REPOSITORY_NAME;

  const { stars, loading, error } = useGitHubStars(
    ownerName || "",
    repositoryName || ""
  );

  if (loading) {
    return <Skeleton className="h-6 w-32" />;
  }

  if (error) {
    return null;
  }

  return (
    <Badge variant="outline" asChild>
      <Link
        href={`https://github.com/${ownerName}/${repositoryName}`}
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
