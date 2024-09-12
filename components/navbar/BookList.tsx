import Image from "next/image";
import { Book } from "@/utils/types";

type BookListProps = {
  books: Book[];
  handleClick: (key: string) => void;
};

function BookList({ books, handleClick }: BookListProps) {
  return (
    <div className="absolute top-full mt-2 w-full max-w-sm dark:bg-muted shadow-md rounded-md z-20">
      <ul className="py-1 bg-background">
        {books.map((book) => (
          <li
            key={book.key}
            className="px-2 py-1 cursor-pointer flex flex-row items-center"
            onClick={() => handleClick(book.key)}>
            <div className="w-[48px] h-[75px] flex-shrink-0 relative overflow-hidden rounded">
              <Image
                src={book.image}
                alt="Author"
                fill
                sizes="39vw"
                className="object-cover"
              />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-semibold">{book.title}</h3>
              <p className="text-sm font-light">{book.author}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
