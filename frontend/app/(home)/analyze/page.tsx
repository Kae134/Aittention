"use client";
import React, { useState, useCallback } from "react";
import Dropzone from "./Dropzone";
import env from "@/lib/env";
import { Button } from "@/components/shadcn-ui/button";
import { motion } from "motion/react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

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

    // TODO: make a blob of the selectedFile and add it to the localStorage
    const blob = await selectedFile.arrayBuffer();
    const base64 = btoa(
      new Uint8Array(blob).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );
    localStorage.setItem("selectedFile", base64);

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
      <h1 className="text-3xl font-bold text-center">
        Generate attention point heatmap
      </h1>
      {uploadStatus === "needToUpload" && (
        <div className="space-y-6 flex flex-col items-center">
          <Dropzone
            onFileAccepted={handleFileAccepted}
            previewUrl={previewUrl}
            disabled={false}
          />

          <motion.div
            whileHover={{ scale: 1.0, boxShadow: "0 4px 32px 0 #6366f1cc" }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="rounded-xl"
          >
            <Button
              onClick={handleSubmit}
              disabled={!selectedFile}
              variant="default"
              className="cursor-pointer bg-accent-foreground/95 hover:bg-accent-foreground text-primary-foreground font-bold shadow-lg hover:shadow-xl border-0 px-5 py-2 rounded-xl transition-all duration-200"
            >
              Start analysis
            </Button>
          </motion.div>
        </div>
      )}

      {uploadStatus === "loading" && (
        <div className="flex flex-col items-center justify-center p-10">
          <div className="w-16 h-16 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-medium">Analysis in progress...</p>
        </div>
      )}

      {uploadStatus === "completed" && resultImg && (
        <div className="flex flex-col items-center">
          <div className="h-full">
            <h3 className="text-2xl font-semibold mb-4">Result :</h3>

            <ReactCompareSlider
              itemOne={<ReactCompareSliderImage src={resultImg} alt="Result" />}
              itemTwo={
                <ReactCompareSliderImage
                  src={`data:image/jpeg;base64,${localStorage.getItem(
                    "selectedFile"
                  )}`}
                  alt="Result"
                />
              }
            />
          </div>

          <motion.div
            whileHover={{ scale: 1.0, boxShadow: "0 4px 32px 0 #6366f1cc" }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="rounded-xl mt-8"
          >
            <Button
              onClick={() => setUploadStatus("needToUpload")}
              variant="default"
              size="lg"
              className="cursor-pointer bg-accent-foreground/95 hover:bg-accent-foreground text-primary-foreground font-bold shadow-lg hover:shadow-xl border-0 px-5 py-2 rounded-xl transition-all duration-200"
            >
              Start another analysis
            </Button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
