"use client";

import { upfetch } from "@/lib/upfetch";
import type { SignUpData } from "@/schemas/auth-schema";
import { useState } from "react";

/**
 * Hook pour enregistrer un utilisateur via l'API.
 * Expose une fonction à appeler lors de la soumission du formulaire.
 */
export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<unknown>(null);

  /**
   * Enregistre un utilisateur avec les données du formulaire.
   * @param formData - Données du formulaire d'inscription
   */
  const registerUser = async (formData: SignUpData) => {
    setIsLoading(true);
    setError(null);
    setData(null);
    try {
      const response = await upfetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.detail || "An error occurred during registration");
        return;
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  return { registerUser, isLoading, error, data };
}
