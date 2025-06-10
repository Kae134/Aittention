"use client";
import React, { useState, useCallback } from "react";
import Dropzone from "./Dropzone";
import env from "@/lib/env";
import Image from "next/image";

export default function AnalyzePage() {
  type UploadStatusType = "needToUpload" | "loading" | "completed";

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resultImg, setResultImg] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [uploadStatus, setUploadStatus] =
    useState<UploadStatusType>("needToUpload");

  const handleFileAccepted = useCallback((file: File | undefined) => {
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResultImg(null);
      setUploadStatus("needToUpload");
    } else {
      setSelectedFile(null);
      setPreviewUrl(undefined);
      setResultImg(null);
      setUploadStatus("needToUpload");
    }
  }, []);

  const handleSubmit = async () => {
    if (!selectedFile) return;

    setUploadStatus("loading");
    const formData = new FormData();
    formData.append("image", selectedFile);

    // Récupère le token du localStorage s'il existe
    const accessToken =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;
    const headers: HeadersInit = accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : {};

    try {
      const res = await fetch(
        `${env.NEXT_PUBLIC_APP_BACKEND_URL}/api/v1/analyze`,
        {
          method: "POST",
          body: formData,
          headers,
        }
      );
      if (!res.ok) throw new Error("Erreur lors de l'analyse");
      const blob = await res.blob();
      setResultImg(URL.createObjectURL(blob));
      setUploadStatus("completed");
    } catch (err) {
      alert(`Une erreur est survenue lors de l'analyse de l'image : ${err}`);
      setUploadStatus("needToUpload");
    }
  };

  return (
    <div className="min-h-[calc(100vh-190px)] container mx-auto py-10 space-y-8 overflow-hidden">
      <h1 className="text-3xl font-bold text-center">Analyser une image</h1>
      {uploadStatus === "needToUpload" && (
        <div className="space-y-6">
          <Dropzone
            onFileAccepted={handleFileAccepted}
            previewUrl={previewUrl}
            disabled={false}
          />

          <div className="flex justify-center mt-6">
            <button
              onClick={handleSubmit}
              disabled={!selectedFile}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Analyser
            </button>
          </div>
        </div>
      )}

      {uploadStatus === "loading" && (
        <div className="flex flex-col items-center justify-center p-10">
          <div className="w-16 h-16 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-medium">
            Analyse de l&apos;image en cours...
          </p>
        </div>
      )}

      {uploadStatus === "completed" && resultImg && (
        <div>
          <div className="mt-8 border rounded-xl p-6 bg-card">
            <h3 className="text-2xl font-semibold mb-4">
              Résultat de l&apos;analyse :
            </h3>
            <Image
              src={resultImg}
              alt="Résultat de l'analyse"
              width={800}
              height={600}
              className="max-w-full rounded-lg shadow-md mx-auto"
            />
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={() => setUploadStatus("needToUpload")}
              className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/90 transition-colors"
            >
              Analyser une autre image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
