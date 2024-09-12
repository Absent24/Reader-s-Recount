"use client";

import { getApiDetailsData, getCoverImage } from "@/utils/actions";
import { bookDetails } from "@/utils/types";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function DetailsPage() {
  const { key } = useParams();
  const [book, setBook] = useState<bookDetails | undefined>(undefined);
  const [loading, setLoading] = useState(false); //To prevent double api calls

  useEffect(() => {
    const getBookDetails = async () => {
      if (loading) return;
      setLoading(true);

      if (key) {
        const bookData = await getApiDetailsData(key);
        if (bookData) {
          setBook(bookData);

          const image = await getCoverImage(bookData.coverId, "L");
          setBook((prevBook) => {
            if (prevBook) {
              return { ...prevBook, image };
            }
          });
        }
      }
      setLoading(false);
    };

    getBookDetails();
  }, [key]);

  if (!book || !book.image) {
    return (
      <div className="p-4 text-center text-gray-600">
        No book details found.
      </div>
    );
  }

  return (
    <div className="p-2 mx-auto">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="w-[230px] h-[350px] relative">
          <Image
            src={book.image}
            alt={`${book.title} cover`}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-between">
          <h1 className="text-3xl font-semibold mb-4">{book.title}</h1>
          <p className="text-xl mb-2">
            <strong>Author:</strong> {book.author}
          </p>
          <p className="text-xl mb-2">
            <strong>First Published:</strong> {book.firstPublish}
          </p>
          <p className="text-xl mb-2">
            <strong>Number of Pages:</strong> {book.numOfPages}
          </p>
          {book.openlibRating !== undefined && (
            <p className="text-xl mb-2">
              <strong>OpenLib Rating:</strong> {book.openlibRating.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
