import { upfetch } from "@/lib/upfetch";
import { useState } from "react";

interface UploadResponse {
  image_id: string;
  overlay_id?: string; // Can be a URL to the image blob
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
      const response = await upfetch("/api/v1/analyze/analyze", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Defensive: check if response is a valid object with headers
      if (
        !response ||
        typeof response !== "object" ||
        !("headers" in response) ||
        typeof response.headers.get !== "function"
      ) {
        setError("Unexpected response from server");
        return;
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        setUploadResponse(data);
        return data;
      } else if (contentType && contentType.startsWith("image/")) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        const data: UploadResponse = {
          image_id: "N/A",
          overlay_id: imageUrl,
          message: "Image received from server.",
        };
        setUploadResponse(data);
        return data;
      } else {
        setError("Unknown response type from server");
      }
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
