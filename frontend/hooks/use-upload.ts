"use client"

import { useState } from "react";
import { useUploadStore } from "@/stores/upload-store";
import { uploadAction } from "@/app/(home)/mvp/upload.action";

// Définition des types pour la réponse de l'action d'upload
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

export function useUpload() {
  const [file, setFile] = useState<File | null>(null);
  const { 
    isLoading, 
    error, 
    uploadResponse,
    setLoading, 
    setError, 
    setUploadResponse, 
    reset 
  } = useUploadStore();

  const handleFileChange = (file: File | null) => {
    console.log("useUpload - handleFileChange:", file?.name);
    setFile(file);
    if (!file) {
      reset();
    }
  };

  const uploadFile = async () => {
    if (!file) {
      console.log("useUpload - Aucun fichier sélectionné");
      setError("Aucun fichier sélectionné");
      return;
    }

    console.log("useUpload - Début de l'upload du fichier:", file.name, file.type, file.size);
    
    try {
      setLoading(true);
      setError(null);
      
      console.log("useUpload - Appel de uploadAction avec le fichier");
      const result = await uploadAction({ image: file }) as UploadResult;
      console.log("useUpload - Réponse de uploadAction:", result);
      
      if (!result.success) {
        console.log("useUpload - Erreur détectée dans le résultat:", result.error);
        setError(result.error);
        setUploadResponse(null);
        return;
      }
      
      console.log("useUpload - Upload réussi, mise à jour du state:", result.result);
      setUploadResponse({
        message: result.result.message,
        image_id: result.result.image_id
      });
    } catch (err) {
      console.error("useUpload - Exception non gérée:", err);
      setError("Une erreur s'est produite lors de l'upload");
    } finally {
      console.log("useUpload - Fin du processus d'upload");
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
    reset
  };
}