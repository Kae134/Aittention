"use client";

import React, { useEffect, useState, useRef } from "react";
import { unauthorized } from "next/navigation";
import { useGetUserImages, useGetImageById } from "@/hooks/use-get-images";
import { ScrollArea } from "@/components/shadcn-ui/scroll-area";
import { Button } from "@/components/shadcn-ui/button";
import { Separator } from "@/components/shadcn-ui/separator";
import { toast } from "sonner";
import { AnimatePresence, motion } from "motion/react";
import AnimatedTitle from "@/components/ui/animated-title";

export default function DashboardPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [lastImageId, setLastImageId] = useState<string | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    const storedUserId = localStorage.getItem("user_id");

    if (!storedToken) {
      unauthorized();
      return;
    }
    setToken(storedToken);
    setUserId(storedUserId);
  }, []);

  const { data, isLoading, error } = useGetUserImages(userId ?? "");

  useEffect(() => {
    if (data && data.length > 0) {
      setLastImageId(data[data.length - 1]._id);
    }
  }, [data]);

  const { imageUrl: selectedImageUrl } = useGetImageById(
    selectedImageId ?? lastImageId ?? ""
  );

  useEffect(() => {
    setIsImageLoaded(false);
  }, [selectedImageUrl]);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsImageLoaded(true);
    }
  }, [selectedImageUrl]);

  if (!token || !userId) {
    return <div>Authentification requise</div>;
  }

  if (isLoading) return <div>Chargement...</div>;
  if (error) toast.error(error.message);

  const isSelectedImageUrlEnabled =
    typeof selectedImageUrl === "string" && selectedImageUrl.length > 0;

  const imageName = data?.find((img) => img._id === selectedImageId)?.filename;

  const handleSelectImage = (imageId: string) => {
    setSelectedImageId(imageId);
  };

  return (
    <div className="flex h-[calc(100vh-190px)] gap-4">
      {data && data.length > 0 ? (
        <ScrollArea className="h-fit max-h-[calc(100vh-190px)] w-fit min-w-40 rounded-xl border bg-[#11111110] backdrop-blur-[1px] flex flex-col gap-4">
          <div className="p-4">
            <h4 className="mb-4 text-sm leading-none font-medium">History</h4>
            {data.map((img) => (
              <React.Fragment key={img._id}>
                <Button
                  className="w-full justify-start text-[#fafafa] bg-transparent px-0 hover:bg-transparent rounded-none hover:text-[#ffffff] cursor-pointer"
                  onClick={() => {
                    handleSelectImage(img._id);
                  }}
                >
                  {img.filename.split(".")[0]}
                </Button>
                <Separator />
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="w-full flex items-center justify-center">
          <p className="text-sm text-gray-500">Nothing to see for the moment</p>
        </div>
      )}
      <motion.div
        layout
        className="m-w-full max-h-full h-fit rounded-xl border-1 p-4 bg-[#11111110] backdrop-blur-[1px]"
      >
        <AnimatedTitle
          title={imageName?.split(".")[0] || ""}
          className="mb-4 text-sm leading-none font-medium"
        />
        <div className="relative w-full">
          <AnimatePresence mode="wait">
            {isSelectedImageUrlEnabled && isImageLoaded && (
              <motion.img
                key={selectedImageUrl}
                ref={imgRef}
                src={selectedImageUrl}
                alt="Last image"
                className="w-full max-h-[calc(100vh-252px)] object-contain object-top"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.01 }}
                transition={{ duration: 0.2 }}
                onLoad={() => setIsImageLoaded(true)}
                style={{ display: "block" }}
              />
            )}
          </AnimatePresence>
          {!isImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-lg animate-pulse z-10">
              <span className="text-xs text-gray-400">Loading image…</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
