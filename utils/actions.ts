"use server";

import {
  bookSchema,
  imageSchema,
  profileSchema,
  reviewSchema,
  validBook,
  zodValidation,
} from "./schemas";
import db from "./db";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteImage, imageExists, uploadImage } from "./supabase";
import { bookDetails } from "./types";
import { getApiDetailsData } from "./api";

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("Please login.");
  }
  if (!user.privateMetadata.hasProfile) redirect("/profile/create");
  return user;
};

const toastError = (error: unknown): { message: string } => {
  return {
    message: error instanceof Error ? error.message : "An error occurred",
  };
};

export const createProfile = async (prevState: any, formData: FormData) => {
  try {
    const user = await currentUser();
    const rawData = Object.fromEntries(formData);
    const validData = zodValidation(profileSchema, rawData);

    if (!user) throw new Error("User does not exist.");

    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? "",
        ...validData,
      },
    });

    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });
  } catch (error) {
    return toastError(error);
  }
  redirect("/");
};

export const getProfileImg = async () => {
  const user = await currentUser();
  if (!user) return null;

  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      profileImage: true,
    },
  });

  return profile?.profileImage;
};

export const getProfile = async () => {
  const user = await getAuthUser();
  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
  });
  if (!profile) redirect("/profile/create");
  return profile;
};

export const updateProfile = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();

  try {
    const rawData = Object.fromEntries(formData);
    const validData = zodValidation(profileSchema, rawData);

    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: validData,
    });

    revalidatePath("/profile");
    return { message: "Profile updated successfully" };
  } catch (error) {
    return toastError(error);
  }
};

export const updateProfileImg = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const image = formData.get("image") as File;
    const validImage = zodValidation(imageSchema, { image });
    const fullPath = await uploadImage(validImage.image);

    const prevImg = await getProfileImg();
    if (prevImg) {
      if (await imageExists(prevImg)) {
        await deleteImage(prevImg);
      }
    }

    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: {
        profileImage: fullPath,
      },
    });

    revalidatePath("/profile");
    return { message: "Image updated successfully" };
  } catch (error) {
    return toastError(error);
  }
};

export const reviewExist = async (
  userId: string | undefined,
  bookKey: string | undefined
): Promise<Boolean> => {
  if (!userId && !bookKey) return false;

  const review = await db.review.findFirst({
    where: {
      profileId: userId,
      bookKey: bookKey,
    },
  });

  if (review) return true;
  return false;
};

export const submitReview = async (
  prevState: any,
  formData: FormData,
  book: bookDetails
): Promise<{ message: string }> => {
  try {
    const rawData = Object.fromEntries(formData);
    const validData = zodValidation(reviewSchema, rawData);
    const user = await getAuthUser();
    const bookExist = await bookExists(validData.bookKey);
    if (!bookExist) {
      await createBook(book);
    }
    await db.review.create({
      data: {
        profileId: user.id,
        ...validData,
      },
    });
    return { message: "Successful" };
  } catch (error) {
    return toastError(error);
  }
};

export const bookExists = async (bookKey: string): Promise<Boolean> => {
  const book = await db.book.findUnique({
    where: {
      bookKey: bookKey,
    },
    select: {
      id: true,
    },
  });
  if (book) return true;
  return false;
};

const createBook = async (book: bookDetails) => {
  try {
    const validBook = zodValidation(bookSchema, book) as validBook;

    await db.book.create({
      data: {
        ...validBook,
      },
    });
  } catch (error) {
    console.log("Error creating book");
  }
};
