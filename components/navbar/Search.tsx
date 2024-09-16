"use client";

import { Input } from "../ui/input";
import { useDebouncedCallback } from "use-debounce";
import { useState, useRef, useEffect } from "react";
import { getApiSearchData, getCoverImage } from "@/utils/api";
import { useRouter } from "next/navigation";
import { Book } from "@/utils/types";
import BookList from "./BookList";

function Search() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const request = useRef<number>(0);
  const router = useRouter();

  useEffect(() => {
    const fetchBooks = async () => {
      const requestId = Date.now();
      request.current = requestId;

      if (searchTerm.length <= 1) {
        setBooks([]);
        setIsOpen(false);
        return;
      }
      try {
        if (request.current !== requestId) return;
        const getBooks = await getApiSearchData(searchTerm);
        if (getBooks) {
          setBooks(getBooks);
          setIsOpen(true);
          if (request.current === requestId) {
            const booksWithImages = await Promise.all(
              getBooks.map(async (book: Book) => {
                const image = await getCoverImage(book.coverId);
                return { ...book, image };
              })
            );
            if (request.current === requestId) {
              setBooks(booksWithImages);
            }
          }
        } else {
          setBooks([]);
          setIsOpen(false);
        }
      } catch (error) {
        setBooks([]);
        setIsOpen(false);
        console.log("Search error");
      }
    };

    fetchBooks();
  }, [searchTerm]);

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearchTerm(value);
  }, 500);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleClick = (key: string) => {
    router.push(`/details/${key}`);
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-[20rem]">
      <Input
        type="text"
        placeholder="Explore books and authors"
        className="max-w-xs dark:bg-muted"
        onChange={(e) => {
          const value = e.target.value;
          handleSearch(value);
        }}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && books.length > 0 ? (
        <BookList
          books={books}
          handleClick={handleClick}
        />
      ) : null}
    </div>
  );
}

export default Search;
