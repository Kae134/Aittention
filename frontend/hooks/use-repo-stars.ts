"use client"

import { useState, useEffect } from 'react';

interface GitHubRepoResponse {
  stargazers_count: number;
  [key: string]: any;
}

interface GitHubStarsResult {
  stars: number | null;
  loading: boolean;
  error: string | null;
}

/**
 * Hook personnalisé pour récupérer le nombre d'étoiles d'un dépôt GitHub
 * @param owner - Propriétaire du dépôt
 * @param repo - Nom du dépôt
 * @returns Object contenant stars, loading et error
 */
export const useGitHubStars = (owner: string, repo: string): GitHubStarsResult => {
  const [stars, setStars] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStars = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);

        if (!response.ok) {
          throw new Error(`GitHub API returned ${response.status}: ${response.statusText}`);
        }

        const data: GitHubRepoResponse = await response.json();
        setStars(data.stargazers_count);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue lors de la récupération des étoiles';
        setError(errorMessage);
        console.error('Erreur de récupération des étoiles GitHub:', err);
      } finally {
        setLoading(false);
      }
    };

    if (owner && repo) {
      fetchStars();
    }
  }, [owner, repo]);

  return { stars, loading, error };
};