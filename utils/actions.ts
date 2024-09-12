"use server";

import { imageSchema, profileSchema, zodValidation } from "./schemas";
import db from "./db";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteImage, imageExists, uploadImage } from "./supabase";
import axios from "axios";
import { bookDetails } from "./types";

const axiosClient = axios.create();

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

export const getApiSearchData = async (search: string) => {
  if (search) {
    try {
      const response = await axiosClient.get(
        `https://openlibrary.org/search.json?q=${search}&limit=5`
      );

      const books = response.data.docs.map((book: any) => ({
        title: book.title,
        author: book.author_name.slice(0, 3).join(", "),
        coverId: book.cover_i,
        key: book.key.substring(book.key.lastIndexOf("/") + 1),
        image: "/images/defaultCover.png",
      }));

      return books;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }
};

export const getCoverImage = async (
  coverId: number | undefined,
  size: string = "S"
) => {
  if (!coverId) return "/images/defaultCover.png";

  try {
    const image = await axiosClient.get(
      `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`
    );
    return image.config.url as string;
  } catch (error) {
    console.error("Error fetching cover image:", error);
    return "/images/defaultCover.png";
  }
};

export const getApiDetailsData = async (key: string | string[]) => {
  try {
    const response = await axiosClient.get(
      `https://openlibrary.org/search.json?q=${key}&limit=1`
    );

    const data = response.data.docs[0];

    const book: bookDetails = {
      title: data.title,
      bookKey: data.key,
      author: data.author_name[0],
      authorKey: data.author_key[0],
      firstPublish: data.first_publish_year,
      numOfPages: data.number_of_pages_median,
      coverId: data.cover_i,
      openlibRating: Math.round(data.ratings_average * 100) / 100,
      image: "/images/defaultCover.png",
    };

    return book;
  } catch (error) {
    toastError(error);
  }
};
