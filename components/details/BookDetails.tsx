import { bookDetails } from "@/utils/types";
import { Card } from "../ui/card";
import Image from "next/image";
import SubmitReview from "../reviews/SubmitReview";
import BookReviews from "../reviews/BookReviews";
import { FaStar } from "react-icons/fa";

function BookDetails({
  book,
  isUser,
  reviewed,
}: {
  book: bookDetails;
  isUser: boolean;
  reviewed: boolean;
}) {
  return (
    <div className="min-h-screen flex items-start justify-center p-2">
      <Card className="max-w-4xl w-full rounded-lg shadow-lg p-6 flex flex-col items-start gap-4">
        <div className="w-full flex flex-col md:flex-row items-center lg:items-start gap-6">
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
            <div className="flex flex-col lg:flex-row justify-between w-full mt-auto">
              {book.openlibRating ? (
                <p className="text-lg flex flex-row items-center">
                  <strong>OpenLibrary:</strong>{" "}
                  <FaStar className="w-3 h-3 mx-1" />
                  {book.openlibRating.toFixed(2)} ({book.openlibNumRating})
                </p>
              ) : (
                <p className="text-md font-light">
                  <strong className="text-lg font-bold">OpenLibrary: </strong>
                  Not rated
                </p>
              )}
              {book.rrRating ? (
                <p className="text-lg flex flex-row items-center">
                  <strong>Reader&apos;s Recount:</strong>{" "}
                  <FaStar className="w-3 h-3 mx-1" /> {book.rrRating} (
                  {book.rrNumRating})
                </p>
              ) : (
                <p className="text-md font-light">
                  <strong className="text-lg font-bold">
                    Reader&apos;s Recount:
                  </strong>
                  Not rated
                </p>
              )}
            </div>
          </div>
        </div>

        {isUser ? (
          !reviewed && (
            <div className="w-full">
              <div className="mb-4">
                <p>
                  You haven&apos;t reviewed this book yet. Share your thoughts
                  and let us know what you think!
                </p>
              </div>
              <div className="flex justify-start w-full">
                <SubmitReview book={book} />
              </div>
            </div>
          )
        ) : (
          <div className="w-full">
            <div className="mb-4">
              <p>
                You are not logged in. Please log in to be able to leave a
                review.
              </p>
            </div>
          </div>
        )}
        <div className="w-full">
          {book.rrNumRating && <BookReviews bookKey={book.bookKey} />}
        </div>
      </Card>
    </div>
  );
}

export default BookDetails;
