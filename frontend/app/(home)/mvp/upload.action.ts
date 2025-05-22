"use server";

import env from "@/lib/env";
import { z } from "zod";

const uploadSchema = z.object({
  image: z.instanceof(File, { message: "Invalid file type" }),
});

export async function uploadAction(data: unknown) {
  const parsed = uploadSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.message };
  }

  const formData = new FormData();
  formData.append("file", parsed.data.image);

  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_APP_BACKEND_URL}/api/v1/analyze/`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      return { success: false, error: "Error while uploading the image." };
    }

    const result = await response.json();

    // L'API renvoie un objet contenant message et image_id
    const responseData = {
      success: true,
      result: {
        message: result.message,
        image_id: result.image_id,
      },
    };

    return responseData;
  } catch (error) {
    console.error("uploadAction - Erreur critique:", error);
    return { success: false, error: "Network or server error." };
  }
}
