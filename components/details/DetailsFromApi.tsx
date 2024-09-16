"use client";
import { useEffect, useState } from "react";
import { bookDetails } from "@/utils/types";
import { getApiDetailsData, getCoverImage } from "@/utils/api";
import PageLoading from "./PageLoading";
import BookDetails from "./BookDetails";

function DetailsFromApi({
  bookKey,
  isUser,
  reviewed,
}: {
  bookKey: string;
  isUser: Boolean;
  reviewed: Boolean;
}) {
  const [book, setBook] = useState<bookDetails | undefined>(undefined);

  useEffect(() => {
    const getBookDetails = async () => {
      const bookData = await getApiDetailsData(bookKey);
      if (bookData) {
        const image = await getCoverImage(bookData.coverId, "L");
        if (image) bookData.image = image;
        setBook(bookData);
      }
    };

    getBookDetails();
  }, []);

  if (!book) return <PageLoading />;

  return (
    <BookDetails
      book={book}
      isUser={isUser}
      reviewed={reviewed}
    />
  );
}

export default DetailsFromApi;
