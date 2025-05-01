"use client"

import { Button } from "@/components/shadcn-ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/shadcn-ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn-ui/tabs";
import { toast } from "sonner"
import { ArrowRight, ImageIcon, LinkIcon, Loader2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";


export default function page() {

  const router = useRouter()

  const [file, setFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("upload")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]

      if (!selectedFile.type.startsWith("image/")) {
        toast.error("Veuillez sélectionner un fichier image valide.")
        return
      }

      setFile(selectedFile)
      const objectUrl = URL.createObjectURL(selectedFile)
      setImagePreview(objectUrl)
      setActiveTab("upload")
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]

      if (!droppedFile.type.startsWith("image/")) {
        toast.error("Veuillez sélectionner un fichier image valide.")
        return
      }

      setFile(droppedFile)
      const objectUrl = URL.createObjectURL(droppedFile)
      setImagePreview(objectUrl)
      setActiveTab("upload")
    }
  }

  const handleAnalyze = () => {
    if (!imagePreview) {
      toast.error("Veuillez sélectionner une image à analyser.")
      return
    }

    setIsLoading(true)

    // Simuler l'envoi au backend et le traitement
    setTimeout(() => {
      setIsLoading(false)
      router.push("/mvp/results")
    }, 2000)
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <main className="pt-10 max-w-4xl mx-auto flex flex-col gap-4 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Analyser une image</h1>

      <Tabs className="w-full" defaultValue="upload" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Télécharger
          </TabsTrigger>
          <TabsTrigger value="url" className="flex items-center gap-2">
            <LinkIcon className="h-4 w-4" />
            URL
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Télécharger une image</CardTitle>
              <CardDescription>Glissez-déposez votre image ou cliquez pour sélectionner un fichier</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors hover:border-gray-400 dark:hover:border-gray-500"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={triggerFileInput}
              >
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                <div className="flex flex-col items-center gap-4">
                  <ImageIcon className="h-12 w-12 text-muted-foreground" />
                  <div className="flex flex-col items-center gap-2">
                    <CardTitle>Glissez-déposez votre image ici ou cliquez pour parcourir</CardTitle>
                    <CardDescription>Formats supportés: JPG, PNG, GIF, SVG, WEBP</CardDescription>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="url">
          <Card>
            <CardHeader>
              <CardTitle>Utiliser l&apos;URl du site web</CardTitle>
              <CardDescription>Entrez l&apos;URL du site web que vous souhaitez analyser</CardDescription>
            </CardHeader>
            <CardContent>

            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {imagePreview && (
        <Card className="mt-8">
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Aperçu de l&apos;image</CardTitle>
            <Button onClick={handleAnalyze} disabled={isLoading} className="gap-2 cursor-pointer">
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyse en cours...
                </>
              ) : (
                <>
                  Lancer l&apos;analyse
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
              <Image src={imagePreview || "/placeholder.svg"} alt="Aperçu de l'image" fill className="object-contain" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
          </CardFooter>
        </Card>
      )}
    </main>
  )
}
