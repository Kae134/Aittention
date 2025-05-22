"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/shadcn-ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn-ui/form";
import { toast } from "sonner";
import Dropzone from "./Dropzone";
import { useState, useEffect } from "react";
import { useUpload } from "@/hooks/use-upload";
import { useRouter } from "next/navigation";

const uploadSchema = z.object({
  image: z.instanceof(File, { message: "Invalid file type" }),
});

type UploadData = z.infer<typeof uploadSchema>;

export default function UploadForm() {
  const router = useRouter();
  const form = useForm<UploadData>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      image: undefined,
    },
  });
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const { uploadFile, handleFileChange, isLoading, error, uploadResponse } =
    useUpload();

  // Affiche un toast en cas d'erreur
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Affiche un toast en cas de succès et navigue vers la page de résultat
  useEffect(() => {
    if (uploadResponse) {
      toast.success(
        `Image uploaded successfully! ID: ${uploadResponse.image_id}`
      );
      setPreviewUrl(undefined);
      form.reset();

      // Navigate to the result page
      router.push("/mvp/result");
    }
  }, [uploadResponse, form, router]);

  async function onSubmit() {
    await uploadFile();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Image</FormLabel>
              <FormControl>
                <Dropzone
                  onFileAccepted={(file) => {
                    field.onChange(file);
                    handleFileChange(file ?? null);
                    if (file) {
                      setPreviewUrl(URL.createObjectURL(file));
                    } else {
                      setPreviewUrl(undefined);
                    }
                  }}
                  previewUrl={previewUrl}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="outline"
          className="w-full cursor-pointer border-accent-foreground/20 hover:border-primary/80 bg-transparent text-foreground font-semibold transition-all duration-200 rounded-xl"
          disabled={form.formState.isSubmitting}
        >
          {isLoading ? "Uploading..." : "Upload Image"}
        </Button>

        {uploadResponse && (
          <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-md">
            <p className="font-semibold">Upload result:</p>
            <p>Message: {uploadResponse.message}</p>
            <p>Image ID: {uploadResponse.image_id}</p>
          </div>
        )}
      </form>
    </Form>
  );
}
