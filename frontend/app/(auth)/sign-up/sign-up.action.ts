"use server";

import env from "@/lib/env";
import { SignUpData } from "@/schemas/auth-schema";

export async function signUpAction(data: SignUpData) {
  try {
    const apiUrl = `${env.NEXT_PUBLIC_APP_BACKEND_URL}/api/v1/auth/register`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error:
          errorData.detail || "Une erreur est survenue lors de l'inscription",
      };
    }

    const responseData = await response.json();
    return { success: true, data: responseData };
  } catch (error) {
    console.error("Error during registration:", error);
    return {
      success: false,
      error: "Une erreur est survenue lors de l'inscription",
    };
  }
}
