"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUploadStore } from "@/stores/upload-store";
import { Button } from "@/components/shadcn-ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import Image from "next/image";

export default function Page() {
  const { uploadResponse, error } = useUploadStore();
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    // Si pas de réponse d'upload, rediriger vers la page d'upload
    if (!uploadResponse) {
      router.push("/mvp");
      return;
    }

    // Construire l'URL de l'image
    const imageUrl = `http://localhost:8000/api/v1/images/${uploadResponse.image_id}`;

    // Teste que l'image est accessible
    fetch(imageUrl, { method: "HEAD" })
      .then((response) => {
        if (!response.ok) {
          setFetchError(
            `Error retrieving the image: ${response.status} ${response.statusText}`
          );
        }
      })
      .catch((err) => {
        console.error("ResultPage - Error testing image access:", err);
        setFetchError(`Network error: ${err.message}`);
      });

    setImageUrl(imageUrl);
    setIsLoading(false);
  }, [uploadResponse, router]);

  const handleBackClick = () => {
    router.push("/mvp");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 max-w-3xl">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center">Analysis result</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          {error ? (
            <div className="text-red-500 p-4 bg-red-50 rounded-md w-full">
              <p>Error: {error}</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <p className="text-lg mb-2">
                  Image ID:{" "}
                  <span className="font-mono bg-muted p-1 rounded">
                    {uploadResponse?.image_id}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">
                  {uploadResponse?.message}
                </p>
              </div>

              {fetchError && (
                <div className="text-red-500 p-4 bg-red-50 rounded-md w-full mb-4">
                  <p>Error while fetching image: {fetchError}</p>
                </div>
              )}

              {imageUrl && (
                <div className="relative w-full max-w-xl overflow-hidden rounded-lg shadow-lg border">
                  <Image
                    src={imageUrl}
                    alt="Analyzed image"
                    width={800}
                    height={600}
                    className="object-contain w-full h-96"
                    onError={() => {
                      setFetchError("Error loading the image");
                    }}
                  />
                </div>
              )}
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleBackClick}>Back to upload</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
