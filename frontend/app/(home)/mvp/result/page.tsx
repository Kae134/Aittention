"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUploadStore } from "@/stores/upload-store";
import { Button } from "@/components/shadcn-ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/shadcn-ui/card";
import Image from "next/image";

export default function Page() {
  const { uploadResponse, error } = useUploadStore();
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  console.log("ResultPage - Rendu initial avec state:", { 
    hasUploadResponse: !!uploadResponse, 
    uploadResponseData: uploadResponse,
    error 
  });

  useEffect(() => {
    // Si pas de réponse d'upload, rediriger vers la page d'upload
    if (!uploadResponse) {
      console.log("ResultPage - Pas de données d'upload, redirection vers /mvp");
      router.push("/mvp");
      return;
    }

    // Construire l'URL de l'image
    const imageUrl = `http://localhost:8000/api/v1/images/${uploadResponse.image_id}`;
    console.log("ResultPage - URL de l'image construite:", imageUrl);
    
    // Tester que l'image est accessible
    fetch(imageUrl, { method: 'HEAD' })
      .then(response => {
        console.log("ResultPage - Test d'accès à l'image:", response.status, response.statusText);
        if (!response.ok) {
          setFetchError(`Erreur lors de la récupération de l'image: ${response.status} ${response.statusText}`);
        }
      })
      .catch(err => {
        console.error("ResultPage - Erreur lors du test d'accès à l'image:", err);
        setFetchError(`Erreur réseau: ${err.message}`);
      });
    
    setImageUrl(imageUrl);
    setIsLoading(false);
  }, [uploadResponse, router]);

  const handleBackClick = () => {
    console.log("ResultPage - Retour à la page d'upload");
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
          <CardTitle className="text-center">Résultat de l&apos;analyse</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          {error ? (
            <div className="text-red-500 p-4 bg-red-50 rounded-md w-full">
              <p>Erreur: {error}</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <p className="text-lg mb-2">ID de l&apos;image: <span className="font-mono bg-muted p-1 rounded">{uploadResponse?.image_id}</span></p>
                <p className="text-sm text-muted-foreground">{uploadResponse?.message}</p>
              </div>

              {fetchError && (
                <div className="text-red-500 p-4 bg-red-50 rounded-md w-full mb-4">
                  <p>Erreur lors de la récupération de l&apos;image: {fetchError}</p>
                </div>
              )}

              {imageUrl && (
                <div className="relative w-full max-w-xl overflow-hidden rounded-lg shadow-lg border">
                  <Image 
                    src={imageUrl}
                    alt="Image analysée"
                    width={800}
                    height={600}
                    className="object-contain w-full h-96"
                    onError={() => {
                      console.error("ResultPage - Erreur de chargement de l&apos;image");
                      setFetchError("Erreur lors du chargement de l&apos;image");
                    }}
                  />
                </div>
              )}
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleBackClick}>
            Retour à l&apos;upload
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
