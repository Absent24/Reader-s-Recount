"use client";

import { getApiDetailsData } from "@/utils/actions";
import { bookDetails } from "@/utils/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function DetailsPage() {
  const { key } = useParams(); // Fetch the dynamic param from route
  const [book, setBook] = useState<bookDetails | undefined>(undefined);

  useEffect(() => {
    // Fetch the data using the key when component mounts
    const fetchBookDetails = async () => {
      if (key) {
        const bookData = await getApiDetailsData(key);
        setBook(bookData);
      }
    };

    fetchBookDetails();
  }, [key]); // Dependency array ensures it only runs when `key` changes

  // Check if the book exists before rendering
  if (!book) {
    return <div>No book details found.</div>;
  }

  return (
    <div>
      <p>Title: {book.title}</p>
      <p>Book Key: {book.bookKey}</p>
      <p>Author: {book.author}</p>
      <p>Author Key: {book.authorKey}</p>
      <p>First Published: {book.firstPublish}</p>
      <p>Number of Pages: {book.numOfPages}</p>
      <p>Cover ID: {book.coverId}</p>
      <p>OpenLib Rating: {book.openlibRating}</p>
    </div>
  );
}

export default DetailsPage;
