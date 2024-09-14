"use client";
import axios from "axios";
import { bookDetails } from "./types";

const axiosClient = axios.create();

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
      openlibNumRating: data.ratings_count,
      image: "/images/defaultCover.png",
    };

    return book;
  } catch (error) {
    console.log("Error");
  }
};
