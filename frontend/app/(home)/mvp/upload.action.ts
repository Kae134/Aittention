"use server"

import { z } from "zod";

const uploadSchema = z.object({
  image: z.instanceof(File, { message: "Invalid file type" }),
});

export async function uploadAction(data: unknown) {

  return { success: true };
}