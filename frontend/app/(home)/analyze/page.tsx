'use client'
import React, { useState, useCallback } from 'react'
import Dropzone from './Dropzone'

export default function AnalyzePage() {
  type UploadStatusType = "needToUpload" | "loading" | "completed";
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [resultImg, setResultImg] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined)
  const [uploadStatus, setUploadStatus] = useState<UploadStatusType>("needToUpload");

  const handleFileAccepted = useCallback((file: File | undefined) => {
    if (file) {
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
      setResultImg(null)
      setUploadStatus("needToUpload")
    } else {
      setSelectedFile(null)
      setPreviewUrl(undefined)
      setResultImg(null)
      setUploadStatus("needToUpload")
    }
  }, [])
  
  const handleSubmit = async () => {
    if (!selectedFile) return

    setUploadStatus("loading")
    const formData = new FormData()
    formData.append('image', selectedFile)

    // Récupère le token du localStorage s'il existe
    const accessToken = typeof window !== "undefined" ? localStorage.getItem('access_token') : null;
    const headers: HeadersInit = accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : {};

    try {
      const res = await fetch('https://40e2-2a01-cb00-154-6100-80e8-3c39-536a-3cf8.ngrok-free.app/api/v1/analyze', {
        method: 'POST',
        body: formData,
        headers,
      })
      if (!res.ok) throw new Error('Erreur lors de l\'analyse')
      const blob = await res.blob()
      setResultImg(URL.createObjectURL(blob))
      setUploadStatus("completed")
    } catch (err) {
      alert('Erreur lors de l\'analyse')
      setUploadStatus("needToUpload")
    }
  }

  return (
    <div className="container mx-auto py-10 space-y-8">
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
          <p className="text-lg font-medium">Analyse de l'image en cours...</p>
        </div>
      )}
      
      {uploadStatus === "completed" && resultImg && (
        <div>
          <div className="mt-8 border rounded-xl p-6 bg-card">
            <h3 className="text-2xl font-semibold mb-4">Résultat de l'analyse :</h3>
            <img src={resultImg} alt="Résultat de l'analyse" className="max-w-full rounded-lg shadow-md mx-auto" />
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
  )
}
