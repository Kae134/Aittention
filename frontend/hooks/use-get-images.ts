"use client";

import { upfetch } from "@/lib/upfetch";
import { useEffect, useState } from "react";

interface UserImage {
    _id: string;
    url: string;
    filename: string;
}

/**
 * Hook React personnalisé pour récupérer les images d'un utilisateur depuis l'API backend.
 *
 * - Utilise upfetch avec annulation via AbortController.
 * - Gère les états de chargement, erreur et données.
 *
 * @param {string} userId - L'ID de l'utilisateur pour lequel récupérer les images.
 * @returns {Object} { data, isLoading, error }
 *
 * @example
 * const { data, isLoading, error } = useGetUserImages("123");
 */
export function useGetUserImages(userId: string) {
    const [data, setData] = useState<UserImage[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!userId) return;

        const controller = new AbortController();

        const fetchUserImages = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await upfetch(`/images/users/${userId}/images`, {
                signal: controller.signal,
                headers: {
                    "ngrok-skip-browser-warning": "1",
                    "Content-Type": "application/json",
                },
            });
            console.log(response)
            if (!response) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result: UserImage[] = await response;
            console.log(result)
            setData(result);
        } catch (err) {
            if (controller.signal.aborted) return;
            setError(
            err instanceof Error ? err : new Error("An unknown error occurred")
            );
        } finally {
            if (!controller.signal.aborted) setIsLoading(false);
        }
        };

        fetchUserImages();

        return () => {
        controller.abort();
        };
    }, [userId]);

    return { data, isLoading, error };
}




export function useGetImageById(id: string | null) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!id) {
        setImageUrl(null);
        return;
        }

        const controller = new AbortController();

        const fetchImage = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await upfetch(`/images/${id}`, {
            signal: controller.signal,
            headers: {
                "ngrok-skip-browser-warning": "1", // si besoin pour ngrok
            },
            });

            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setImageUrl(url);
        } catch (err) {
            if (controller.signal.aborted) return;
            setError(err instanceof Error ? err : new Error("Unknown error"));
        } finally {
            if (!controller.signal.aborted) setIsLoading(false);
        }
        };

        fetchImage();

        return () => {
        controller.abort();
        if (imageUrl) {
            URL.revokeObjectURL(imageUrl);
        }
        };
    }, [id]);

    return { imageUrl, isLoading, error };
}