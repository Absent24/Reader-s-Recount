import Image from "next/image";
import Link from "next/link";
import BookStars from "./BookStars";

type BookCardProps = {
  book: {
    title: string;
    author: string;
    image: string;
    rrRating: number;
    rrNumRating: number;
    bookKey: string;
  };
};

function BookCard({ book }: BookCardProps) {
  return (
    <article className="group relative w-[200px]">
      <Link href={`/details/${book.bookKey}`}>
        <div className="relative h-[300px] w-[200px] mb-1 overflow-hidden rounded-md">
          <Image
            src={book.image}
            alt={book.title}
            sizes="(max-width-768px) 100vw, 50vw"
            fill
            className="rounded-md object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h3 className="font-semibold text-center">{book.title}</h3>
          <p className="text-sm font-light">{book.author}</p>
          <div className="mt-1 flex flex-row gap-1">
            <BookStars rating={book.rrRating} />
            <p>{book.rrRating}</p>
            <p>{`(${book.rrNumRating})`}</p>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default BookCard;
