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

  async function onSubmit(values: UploadData) {
    const response = await uploadAction(values);
    if (response.success) {
      toast.success("Image uploaded successfully!");
      setPreviewUrl(undefined);
      form.reset();
    }
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
          variant="outline"
          className="w-full cursor-pointer border-accent-foreground/20 hover:border-primary/80 bg-transparent text-foreground font-semibold transition-all duration-200 rounded-xl"
          disabled={form.formState.isSubmitting}
        >
          Upload Image
        </Button>
      </form>
    </Form>
  );
}
