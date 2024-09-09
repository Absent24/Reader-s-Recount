"use server";

import { imageSchema, profileSchema, zodValidation } from "./schemas";
import db from "./db";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteImage, imageExists, uploadImage } from "./supabase";

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
