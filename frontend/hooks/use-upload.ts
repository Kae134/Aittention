import { upfetch } from "@/lib/upfetch";
import { useState } from "react";

interface UploadResponse {
  image_id: string;
  overlay_id?: string;
  message?: string;
}

/**
 * Custom hook to handle image upload to the /api/v1/analyze/analyze endpoint using up-fetch.
 * Handles file selection, upload state, errors, and response.
 */
export function useUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadResponse, setUploadResponse] = useState<UploadResponse | null>(
    null
  );

  // Handles file selection from Dropzone
  function handleFileChange(selectedFile: File | null) {
    setFile(selectedFile);
    setError(null);
    setUploadResponse(null);
  }

  // Uploads the selected file to the backend
  async function uploadFile() {
    if (!file) {
      setError("No file selected");
      return;
    }
    setIsLoading(true);
    setError(null);
    setUploadResponse(null);
    try {
      const formData = new FormData();
      formData.append("image", file);
      // upfetch uses fetch under the hood, so we can override headers for multipart
      const response = await upfetch("/analyze/analyze", {
        method: "POST",
        body: formData,
        headers: {
          // Let browser set Content-Type for multipart
        },
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(
          err?.detail?.[0]?.msg || err?.message || "Upload failed"
        );
      }
      const data = await response.json();
      setUploadResponse(data);
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Unknown error");
      } else {
        setError("Unknown error");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return {
    file,
    isLoading,
    error,
    uploadResponse,
    handleFileChange,
    uploadFile,
  };
}
