"use server";

import { SignInData } from "@/schemas/auth-schema";

export async function signInAction(data: SignInData) {
  try {
    const apiUrl = `http://localhost:8000/api/v1/auth/login`;

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
        error: errorData.detail || "Incorrect credentials or connection error",
      };
    }

    const responseData = await response.json();

    return {
      success: true,
      data: responseData,
    };
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      return {
        success: false,
        error: "Network error: Unable to connect to the server",
      };
    }
    return {
      success: false,
      error: "An error occurred during login",
    };
  }
}
