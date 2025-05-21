"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { uploadAction } from "./upload.action";
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
import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageReveal from '@/components/ui/image-reveal'

const uploadSchema = z.object({
  image: z.instanceof(File, { message: "Invalid file type" }),
});

type UploadData = z.infer<typeof uploadSchema>;
export default function UploadForm() {
  const form = useForm<UploadData>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      image: undefined,
    },
  });
  const router = useRouter();
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [uploadStatus, setUploadStatus] = useState<string>("needToUpload");

  async function onSubmit(values: UploadData) {
    const response = await uploadAction(values);
    if (response.success) {
      toast.success("Image uploaded successfully!");
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setPreviewUrl(undefined);
      form.reset();
      // router.push("/pres/result");
      toast.success("Image processed successfully!");
    }
  }

  return (
    <>
      {uploadStatus === "needToUpload" && (
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
                        if (file) {
                          setPreviewUrl(URL.createObjectURL(file));
                        } else {
                          setPreviewUrl(undefined);
                        }
                      }}
                      previewUrl={previewUrl}
                      disabled={form.formState.isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Uploading..." : "Upload"}
            </Button>
          </form>
        </Form>
      )}

      {uploadStatus === "uploading" && (
        <>
          <p>je suis le chargement</p>
        </>
      )}

      {uploadStatus === "uploaded" && (
        <div className="max-w-4xl mx-auto">
          <ImageReveal
              firstImage="/site_web_overlay.png"
              secondImage="/site_web.png"
          />
        </div>
      )}
    </>
  );
}


