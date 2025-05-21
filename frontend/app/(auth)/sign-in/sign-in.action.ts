"use server"

import { SignInData } from "@/schemas/auth-schema";

export async function signInAction(data: SignInData) {
  try {
    const apiUrl = `http://localhost:8000/api/v1/auth/login`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, error: errorData.detail || 'Identifiants incorrects ou erreur de connexion' };
    }

    const responseData = await response.json();

    return {
      success: true,
      data: responseData
    };
  } catch (error) {
    console.error('Error during login:', error);
    return { success: false, error: 'Une erreur est survenue lors de la connexion' };
  }
}