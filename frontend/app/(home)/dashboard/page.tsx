"use client";

import React, { useEffect, useState } from "react";
import { unauthorized } from "next/navigation";
import { useGetUserImages, useGetImageById } from "@/hooks/use-get-images";
import { ScrollArea } from "@/components/shadcn-ui/scroll-area";
import { Button } from "@/components/shadcn-ui/button";
import { Separator } from "@/components/shadcn-ui/separator";

export default function DashboardPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [lastImageId, setLastImageId] = useState<string | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

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

  if (!token || !userId) {
    return <div>Authentification requise</div>;
  }

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error.message}</div>;
  if (!data || data.length === 0) return <div>Aucune image trouvée</div>;

  const isSelectedImageUrlEnabled =
    typeof selectedImageUrl === "string" && selectedImageUrl.length > 0;

  const handleSelectImage = (imageId: string) => {
    setSelectedImageId(imageId);
  };

  return (
    <div className="flex h-[calc(100vh-190px)] gap-4">
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
      <div className="m-w-full max-h-full rounded-xl border-1 p-4 bg-[#11111110] backdrop-blur-[1px]">
        {isSelectedImageUrlEnabled ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={selectedImageUrl}
            alt="Last image"
            className="w-full max-h-full object-contain  object-top "
          />
        ) : (
          <div className="w-full flex items-center justify-center">
            <p className="text-sm text-gray-500">
              Nothing to see for the moment
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
