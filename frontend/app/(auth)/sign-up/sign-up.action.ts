"use server"

import { z } from "zod";
import { signUpSchema } from "@/schemas/auth-schema";

export async function signUpAction(data: unknown) {

  return { success: true };
}