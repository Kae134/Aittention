"use client"

import { useState, ChangeEvent, useEffect } from "react";
import { Button } from "@/components/shadcn-ui/button";
import { Upload, Image as ImageIcon } from "lucide-react";
import { useRouter } from 'next/navigation'

export default function ImageUpload() {

  const router = useRouter();

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Fonction pour gérer la sélection de l'image
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      setImage(file);

      // Créer une URL pour prévisualiser l'image
      const fileUrl = URL.createObjectURL(file);
      setPreview(fileUrl);
    }
  };

  // Fonction pour envoyer l'image au backend
  const uploadImage = async () => {
    if (!image) return;

    try {
      setIsUploading(true);

      // Créer un objet FormData pour envoyer le fichier
      const formData = new FormData();
      formData.append("image", image);

      // Envoyer la requête au backend
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Échec de l'upload");
      }

      const data = await response.json();
      console.log("Image téléchargée avec succès:", data);

      // Réinitialiser le formulaire après succès si nécessaire
      setImage(null);
      setPreview(null);
      router.push('/');

    } catch (error) {
      console.error("Erreur lors de l'upload:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mx-auto mt-40 flex flex-col gap-4 items-center w-full max-w-xl">
      <div className="w-full">
        <label
          htmlFor="image-upload"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer border-px"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {preview ? (
              <img
                src={preview}
                alt="Prévisualisation"
                className="object-contain w-full h-full max-h-52"
              />
            ) : (
              <>
                <ImageIcon className="w-10 h-10 mb-3 text-accent-foreground" />
                <p className="mb-2 text-sm text-accent-foreground">
                  <span className="font-semibold">Cliquez pour télécharger</span> ou glissez-déposez
                </p>
                <p className="text-xs text-accent-foreground">PNG, JPG ou GIF (MAX. 5MB)</p>
              </>
            )}
          </div>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
      </div>

      <Button
        onClick={uploadImage}
        disabled={!image || isUploading}
        className="w-full"
      >
        {isUploading ? (
          <>
            <svg className="w-4 h-4 mr-2 animate-spin" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Téléchargement...
          </>
        ) : (
          <>
            <Upload className="w-4 h-4 mr-2" />
            Envoyer l'image
          </>
        )}
      </Button>
    </div>
  );
}