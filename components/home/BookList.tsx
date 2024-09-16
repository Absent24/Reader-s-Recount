import { getAllBooks } from "@/utils/actions";
import EmptyHomePage from "./EmptyHomePage";
import BookCard from "./BookCard";

async function BookList() {
  const allBooks = await getAllBooks();
  if (!allBooks) return <EmptyHomePage />;
  return (
    <section className="mt-4 gap-8 grid justify-items-center sm:justify-items-start sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {allBooks.map((book) => {
        const { title, author, image, rrRating, rrNumRating, bookKey } = book;
        const cardDetails = {
          title,
          author,
          image,
          rrRating,
          rrNumRating,
          bookKey,
        };
        return (
          <BookCard
            book={cardDetails}
            key={bookKey}
          />
        );
      })}
    </section>
  );
}

export default BookList;
