import * as z from "zod";
import { ZodSchema } from "zod";

export const profileSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters long." }),
  firstName: z.string(),
  lastName: z.string(),
});

export function zodValidation<T>(schema: ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join("\n"));
  }
  return result.data;
}

export const imageSchema = z.object({
  image: validateFile(),
});

function validateFile() {
  const maxUploadSize = 1024 * 1024 * 1.5;
  const acceptedTypes = ["image/"];
  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize;
    }, "File size must be less than 1.5 MB")
    .refine((file) => {
      return !file || acceptedTypes.some((type) => file.type.startsWith(type));
    }, "File must be an image");
}
