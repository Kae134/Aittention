"use server"

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
    const response = await fetch("http://localhost:8000/api/v1/analyze/", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      return { success: false, error: "Erreur lors de l'envoi de l'image." };
    }
    const result = await response.json();
    return { success: true, result };
  } catch (e) {
    return { success: false, error: "Erreur réseau ou serveur." };
  }
}