"use client";

import { useEffect, useState } from "react";

interface GitHubRepoResponse {
  stargazers_count: number;
  [key: string]: unknown;
}

interface GitHubStarsResult {
  stars: number | null;
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook to fetch the number of stars for a GitHub repository
 * @param owner - Owner of the repository
 * @param repo - Name of the repository
 * @returns Object containing stars, loading and error
 */
export const useGitHubStars = (
  owner: string,
  repo: string
): GitHubStarsResult => {
  const [stars, setStars] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStars = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}`
        );

        if (!response.ok) {
          throw new Error(
            `GitHub API returned ${response.status}: ${response.statusText}`
          );
        }

        const data: GitHubRepoResponse = await response.json();
        setStars(data.stargazers_count);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "An error occurred while fetching stars";
        setError(errorMessage);
        console.error("GitHub stars fetch error:", err);
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
