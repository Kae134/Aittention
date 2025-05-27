"use client";

import { uploadAction } from "@/app/[locale]/(home)/mvp/upload.action";
import { useUploadStore } from "@/stores/upload-store";
import { useState } from "react";

// Type definitions for the upload action response
interface UploadSuccess {
  success: true;
  result: {
    message: string;
    image_id: string;
  };
}

interface UploadError {
  success: false;
  error: string;
}

type UploadResult = UploadSuccess | UploadError;

/**
 * Hook React personnalisé pour gérer le téléchargement de fichiers.
 * Gère l'état du fichier, le processus de téléchargement et les réponses.
 */
export function useUpload() {
  const [file, setFile] = useState<File | null>(null);
  const {
    isLoading,
    error,
    uploadResponse,
    setLoading,
    setError,
    setUploadResponse,
    reset,
  } = useUploadStore();

  const handleFileChange = (file: File | null) => {
    setFile(file);
    if (!file) {
      reset();
    }
  };

  const uploadFile = async () => {
    if (!file) {
      setError("No file selected");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result = (await uploadAction({ image: file })) as UploadResult;

      if (!result.success) {
        setError(result.error);
        setUploadResponse(null);
        return;
      }

      setUploadResponse({
        message: result.result.message,
        image_id: result.result.image_id,
      });
    } catch (err) {
      console.error("useUpload - Unhandled exception:", err);
      setError("An error occurred during upload");
    } finally {
      setLoading(false);
    }
  };

  return {
    file,
    isLoading,
    error,
    uploadResponse,
    handleFileChange,
    uploadFile,
    reset,
  };
}
