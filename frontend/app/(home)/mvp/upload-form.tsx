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
import { Input } from "@/components/shadcn-ui/input";

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

  async function onSubmit(values: UploadData) {
    const response = await uploadAction(values);
    if (response.success) {
      alert("Image uploaded successfully!");
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
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full cursor-pointer">
          Upload Image
        </Button>
      </form>
    </Form>
  );
}