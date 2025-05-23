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
import ImageReveal from '@/components/ui/image-reveal'
import { ArrowLeft, LoaderCircle } from "lucide-react";

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
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [uploadStatus, setUploadStatus] = useState<string>("needToUpload");

  async function onSubmit(values: UploadData) {
    setUploadStatus("uploading");
    const response = await uploadAction(values);
    if (response.success) {
      toast.success("Image uploaded successfully!");
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setPreviewUrl(undefined);
      form.reset();
      setUploadStatus("uploaded");
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
        <div className="flex items-center justify-center gap-2">
          <div className="animate-spin">
            <LoaderCircle />
          </div>
          <p>image processing</p>
        </div>
      )}

      {uploadStatus === "uploaded" && (
        <>
          <div className="w-full mx-auto flex flex-col items-start justify-center gap-4">
            <Button
              onClick={() => setUploadStatus("needToUpload")}
              className="cursor-pointer"
              variant="outline"
            >
              <ArrowLeft />
              Upload another image
            </Button>
            <ImageReveal
                firstImage="/site_web_overlay.png"
                secondImage="/site_web.png"
            />
          </div>
        </>
      )}
    </>
  );
}


