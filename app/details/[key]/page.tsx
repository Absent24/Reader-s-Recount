"use client";

import PageLoading from "@/components/details/PageLoading";
import SubmitReview from "@/components/reviews/SubmitReview";
import { Card } from "@/components/ui/card";
import { getApiDetailsData, getCoverImage } from "@/utils/api";
import { bookDetails } from "@/utils/types";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function DetailsPage() {
  const { key } = useParams();
  const [book, setBook] = useState<bookDetails | undefined>(undefined);

  useEffect(() => {
    const getBookDetails = async () => {
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
    };

    getBookDetails();
  }, [key]);

  if (!book || !book.image) {
    return <PageLoading />;
  }

  return (
    <div className="min-h-screen flex items-start justify-center p-2">
      <Card className="max-w-4xl w-full rounded-lg shadow-lg p-6 flex flex-col items-start gap-4">
        <div className="w-full flex flex-col md:flex-row items-start gap-6">
          <div className="w-[200px] h-[300px] relative flex-shrink-0">
            <Image
              src={book.image}
              alt={`${book.title} cover`}
              fill
              sizes="50vw"
              className="rounded-lg object-cover"
            />
          </div>
          <div className="flex flex-col justify-between flex-1 h-[300px]">
            <h1 className="text-3xl font-semibold mb-2 text-center">
              {book.title}
            </h1>
            <p className="text-lg mb-4 text-center">{book.author}</p>
            <div className="flex flex-col items-start w-full mb-4 justify-center h-full">
              <p className="text-lg">
                <strong>First Published:</strong> {book.firstPublish}
              </p>
              <p className="text-lg">
                <strong>Number of Pages:</strong> {book.numOfPages}
              </p>
            </div>
            {book.openlibRating !== undefined && (
              <div className="flex justify-between w-full mt-auto">
                <p className="text-lg">
                  <strong>OpenLibrary:</strong> {book.openlibRating.toFixed(2)}{" "}
                  ({book.openlibNumRating})
                </p>
                <p className="text-lg">
                  <strong>Reader's Recount:</strong> {book.rrRating}
                </p>
              </div>
            )}
          </div>
        </div>
        <div>
          <p>
            You haven't reviewed this book yet. Share your thoughts and let us
            know what you think!
          </p>
        </div>
        <div className="flex justify-start w-full">
          <SubmitReview book={book} />
        </div>
      </Card>
    </div>
  );
}

export default DetailsPage;
