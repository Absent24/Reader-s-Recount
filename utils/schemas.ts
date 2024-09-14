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

export const reviewSchema = z.object({
  bookKey: z.string().transform((val) => {
    const parts = val.split("/");
    return parts[parts.length - 1];
  }),
  rating: z.coerce.number().int().min(1).max(5),
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters long." }),
  review: z.string().min(10, {
    message:
      "Review must be at least 10 characters long. Please leave a propper review.",
  }),
});

const validNumber = (value: any) => {
  const numberValue = Number(value);
  return isNaN(numberValue) ? 0 : numberValue;
};

export const bookSchema = z.object({
  bookKey: z.string().transform((val) => {
    const parts = val.split("/");
    return parts[parts.length - 1];
  }),
  title: z.string(),
  author: z.string(),
  authorKey: z.string(),
  firstPublish: z
    .union([z.number(), z.string()])
    .optional()
    .transform(validNumber)
    .default(0),
  numOfPages: z
    .union([z.number(), z.string()])
    .optional()
    .transform(validNumber)
    .default(0),
  coverId: z
    .union([z.number(), z.string()])
    .optional()
    .transform(validNumber)
    .default(0),
  openlibRating: z
    .union([z.number(), z.string()])
    .optional()
    .transform(validNumber)
    .default(0),
  openlibNumRating: z
    .union([z.number(), z.string()])
    .optional()
    .transform(validNumber)
    .default(0),
  rrRating: z
    .union([z.number(), z.string()])
    .optional()
    .transform(validNumber)
    .default(0),
  rrNumRating: z
    .union([z.number(), z.string()])
    .optional()
    .transform(validNumber)
    .default(0),
  image: z.string(),
});

export type validBook = z.infer<typeof bookSchema>;
