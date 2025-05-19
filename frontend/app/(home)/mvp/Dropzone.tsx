"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "motion/react";
import { cn } from "@/lib/utils"; // Utilitaire shadcn pour les classes conditionnelles

// Types
interface DropzoneProps {
  onFileAccepted: (file: File) => void;
  previewUrl?: string;
  disabled?: boolean;
}

/**
 * Dropzone premium pour upload d'image avec drag & drop, animations smooth, et style moderne.
 */
export default function Dropzone({
  onFileAccepted,
  previewUrl,
  disabled,
}: DropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles[0]) {
        onFileAccepted(acceptedFiles[0]);
      }
    },
    [onFileAccepted]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject, open } =
    useDropzone({
      onDrop,
      accept: { "image/*": [] },
      multiple: false,
      noClick: true, // On gère le clic manuellement
      disabled,
    });

  return (
    <div
      {...getRootProps()}
      tabIndex={0}
      role="button"
      aria-disabled={disabled}
      onClick={open}
    >
      <motion.div
        initial={{ scale: 1, boxShadow: "0 0 0 0 rgba(0,0,0,0)" }}
        animate={{
          scale: isDragActive ? 1.03 : 1,
          boxShadow: isDragActive
            ? "0 4px 32px 0 rgba(0,0,0,0.10)"
            : "0 1px 4px 0 rgba(0,0,0,0.04)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={cn(
          "relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 cursor-pointer bg-background transition-colors duration-200",
          isDragActive && "border-primary bg-primary/5",
          isDragReject && "border-destructive bg-destructive/10",
          disabled && "opacity-60 pointer-events-none"
        )}
      >
        <input {...getInputProps()} />
        {previewUrl ? (
          <motion.img
            src={previewUrl}
            alt="Aperçu de l'image"
            className="w-32 h-32 object-cover rounded-lg mb-4 shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-2"
          >
            <svg
              width="48"
              height="48"
              fill="none"
              className="text-primary mb-2"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 16a1 1 0 0 1-1-1V5.83l-3.59 3.58A1 1 0 0 1 6 8a1 1 0 0 1 0-1.41l5-5a1 1 0 0 1 1.41 0l5 5A1 1 0 0 1 17 8a1 1 0 0 1-1.41 0L12 5.83V15a1 1 0 0 1-1 1Z"
              />
              <path
                fill="currentColor"
                d="M19 20H5a1 1 0 0 1 0-2h14a1 1 0 0 1 0 2Z"
              />
            </svg>
            <span className="text-lg font-medium text-muted-foreground">
              Glisse une image ici ou{" "}
              <span className="underline text-primary">clique</span>
            </span>
            <span className="text-xs text-muted-foreground">
              PNG, JPG, JPEG, GIF, WEBP • max 4MB
            </span>
          </motion.div>
        )}
        {isDragReject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-destructive/80 text-white text-lg font-bold rounded-xl z-10"
          >
            Format non supporté
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
