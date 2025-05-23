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
      const result = await upfetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      // If the API returns an error field, handle it
      if (result.error || result.detail) {
        setError(
          result.detail ||
            result.error ||
            "An error occurred during registration"
        );
        return {
          success: false,
          error:
            result.detail ||
            result.error ||
            "An error occurred during registration",
        };
      }

      setData(result);
      return { success: true };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Unknown error";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };

  return { registerUser, isLoading, error, data };
}

/**
 * Hook pour connecter un utilisateur via l'API.
 * Expose une fonction à appeler lors de la soumission du formulaire de connexion.
 */
export function useSignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<unknown>(null);

  /**
   * Connecte un utilisateur avec les données du formulaire.
   * @param formData - Données du formulaire de connexion
   */
  const signInUser = async (formData: { email: string; password: string }) => {
    setIsLoading(true);
    setError(null);
    setData(null);
    try {
      const result = await upfetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (result.error || result.detail) {
        setError(
          result.detail ||
            result.error ||
            "Incorrect credentials or connection error"
        );
        return {
          success: false,
          error:
            result.detail ||
            result.error ||
            "Incorrect credentials or connection error",
        };
      }

      setData(result);
      return { success: true, data: result };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Unknown error";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };

  return { signInUser, isLoading, error, data };
}
