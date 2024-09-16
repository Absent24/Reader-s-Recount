import BookDetails from "@/components/details/BookDetails";
import DetailsFromApi from "@/components/details/DetailsFromApi";
import { bookExists, getBook, isLoggedIn, reviewExist } from "@/utils/actions";
import { bookDetails } from "@/utils/types";
import { auth } from "@clerk/nextjs/server";

async function DetailsPage({ params }: { params: { key: string } }) {
  const bookInDatabase = await bookExists(params.key);
  const book = bookInDatabase
    ? ((await getBook(params.key)) as bookDetails)
    : null;
  const isUser = await isLoggedIn();

  const isReviewed = async () => {
    if (bookInDatabase) {
      const { userId } = auth();
      if (userId) {
        const reviewed = await reviewExist(userId, params.key);
        return reviewed;
      }
    }
    return false;
  };

  const reviewed = await isReviewed();

  return (
    <div>
      {book ? (
        <BookDetails
          book={book}
          isUser={isUser}
          reviewed={reviewed}
        />
      ) : (
        <DetailsFromApi
          bookKey={params.key}
          isUser={isUser}
          reviewed={reviewed}
        />
      )}
    </div>
  );
}

export default DetailsPage;
