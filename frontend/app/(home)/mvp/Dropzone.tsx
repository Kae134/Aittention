"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "motion/react";
import { cn } from "@/lib/utils"; // Utilitaire shadcn pour les classes conditionnelles
import { X } from "lucide-react";

// Types
interface DropzoneProps {
  onFileAccepted: (file: File | undefined) => void;
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
  const [fileInfo, setFileInfo] = useState<{
    name: string;
    size: number;
  } | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles[0]) {
        onFileAccepted(acceptedFiles[0]);
        setFileInfo({
          name: acceptedFiles[0].name,
          size: acceptedFiles[0].size,
        });
      }
    },
    [onFileAccepted]
  );

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileAccepted(undefined);
    setFileInfo(null);
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject, open } =
    useDropzone({
      onDrop,
      accept: { "image/*": [] },
      multiple: false,
      noClick: true,
      disabled,
    });

  return (
    <div
      {...getRootProps()}
      tabIndex={0}
      role="button"
      aria-disabled={disabled}
      onClick={open}
      className="group"
    >
      <motion.div
        initial={{
          scale: 1,
          boxShadow: "0 0 0 0 rgba(0,0,0,0)",
          borderColor: "#35363a",
        }}
        animate={{
          scale: isDragActive ? 1.04 : 1,
          boxShadow: isDragActive
            ? "0 8px 40px 0 rgba(0,0,0,0.18)"
            : "0 2px 12px 0 rgba(0,0,0,0.10)",
          borderColor: isDragActive
            ? "#6366f1"
            : isDragReject
            ? "#ef4444"
            : "#35363a",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className={cn(
          "relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-10 cursor-pointer bg-gradient-to-br from-[#18181b]/80 to-[#23272f]/80 backdrop-blur-md transition-colors duration-200 overflow-hidden",
          isDragActive && "border-primary/80 bg-primary/5",
          isDragReject && "border-destructive/80 bg-destructive/10",
          disabled && "opacity-60 pointer-events-none"
        )}
      >
        <input {...getInputProps()} />
        {previewUrl ? (
          <div className="relative flex flex-col items-center w-full">
            <motion.img
              src={previewUrl}
              alt="Aperçu de l'image"
              className="w-36 h-36 object-cover rounded-xl mb-4 shadow-lg border border-white/10"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            />
            {fileInfo && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <span className="truncate max-w-[160px]">{fileInfo.name}</span>
                <span className="opacity-60">
                  ({(fileInfo.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
            )}
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 transition"
              tabIndex={-1}
              aria-label="Remove file"
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-3"
          >
            <motion.div
              animate={{
                scale: isDragActive ? 1.15 : 1,
                filter: isDragActive ? "drop-shadow(0 0 16px #6366f1)" : "none",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#6366f1]/30 to-[#818cf8]/10 mb-2"
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary"
              >
                {/* Animated pulsing outer circle */}
                <motion.circle
                  cx="20"
                  cy="20"
                  r="18"
                  fill="url(#grad1)"
                  fillOpacity="0.13"
                  style={{ originX: 0.5, originY: 0.5 }}
                  animate={{
                    scale: [1, 1.13, 1],
                    opacity: [0.7, 0.35, 0.7],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <defs>
                  <linearGradient
                    id="grad1"
                    x1="0"
                    y1="0"
                    x2="40"
                    y2="40"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#6366f1" />
                    <stop offset="1" stopColor="#818cf8" />
                  </linearGradient>
                </defs>
                <path
                  d="M20 28V14M20 14L14.5 19.5M20 14L25.5 19.5"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
            <span className="text-xl font-semibold tracking-wide text-white/90 text-center">
              Glisse une image ici
              <br />
              <span className="underline text-primary cursor-pointer">
                ou clique
              </span>
            </span>
            <span className="text-sm text-muted-foreground text-center">
              PNG, JPG, JPEG, GIF, WEBP • max 4MB
            </span>
          </motion.div>
        )}
        {isDragReject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: [0, -10, 10, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center bg-destructive/80 text-white text-lg font-bold rounded-2xl z-10"
          >
            Format non supporté
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
