"use server"

// import { z } from "zod";
// import { signInSchema } from "@/schemas/auth-schema";

export async function signInAction(data: unknown) {
  return { success: true, data: data };
}