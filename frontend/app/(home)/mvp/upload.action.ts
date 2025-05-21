"use server";

import env from "@/lib/env";
import { z } from "zod";

const uploadSchema = z.object({
  image: z.instanceof(File, { message: "Invalid file type" }),
});

export async function uploadAction(data: unknown) {
  console.log("uploadAction - Début de la fonction avec les données:", data);

  const parsed = uploadSchema.safeParse(data);
  if (!parsed.success) {
    console.log("uploadAction - Erreur de validation:", parsed.error.message);
    return { success: false, error: parsed.error.message };
  }

  console.log("uploadAction - Validation réussie, création du FormData");
  const formData = new FormData();
  formData.append("file", parsed.data.image);

  try {
    console.log(
      "uploadAction - Début de l'envoi à l'API:",
      `${env.NEXT_PUBLIC_APP_BACKEND_URL}/api/v1/analyze/`
    );
    const response = await fetch(
      `${env.NEXT_PUBLIC_APP_BACKEND_URL}/api/v1/analyze/`,
      {
        method: "POST",
        body: formData,
      }
    );

    console.log(
      "uploadAction - Réponse de l'API reçue, statut:",
      response.status,
      response.statusText
    );

    if (!response.ok) {
      console.log("uploadAction - Réponse non-OK de l'API");
      return { success: false, error: "Erreur lors de l'envoi de l'image." };
    }

    const result = await response.json();
    console.log("uploadAction - Résultat JSON obtenu:", result);

    // L'API renvoie un objet contenant message et image_id
    const responseData = {
      success: true,
      result: {
        message: result.message,
        image_id: result.image_id,
      },
    };

    console.log("uploadAction - Retour des données au client:", responseData);
    return responseData;
  } catch (error) {
    console.error("uploadAction - Erreur critique:", error);
    return { success: false, error: "Erreur réseau ou serveur." };
  }
}
