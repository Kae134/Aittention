"use client";

import { upfetch } from "@/lib/upfetch";
import { useEffect, useState } from "react";

/**
 * Hook React personnalisé pour récupérer une chaîne "Hello World" depuis l'API backend.
 *
 * - Utilise upfetch pour des requêtes HTTP robustes (avec tentatives, etc).
 * - Gère les états de chargement, d'erreur et de données.
 * - Annule la requête si le composant est démonté (AbortController).
 * - Retourne un objet typé pour une consommation facile dans les composants.
 *
 * @returns {Object} { data, isLoading, error }
 *   - data: string | null — La chaîne "Hello World" du backend, ou null si non chargée.
 *   - isLoading: boolean — Vrai pendant que la requête est en cours.
 *   - error: Error | null — Toute erreur rencontrée pendant la récupération, ou null si aucune.
 *
 * @example
 * const { data, isLoading, error } = useGetHelloWorld();
 * if (isLoading) return <Spinner />;
 * if (error) return <ErrorMessage error={error} />;
 * return <div>{data}</div>;
 *
 * TODO: Ajouter du cache ou SWR pour les requêtes répétées si nécessaire.
 */
export function useGetHelloWorld() {
  const [data, setData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchHelloWorld = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await upfetch(`/hello`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.text();
        setData(result);
      } catch (err) {
        if (controller.signal.aborted) return; // Early return if aborted
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };
    fetchHelloWorld();
    return () => {
      controller.abort(); // Cancel fetch on unmount
    };
  }, []);

  return { data, isLoading, error };
}
