"use client";

import { Input } from "../ui/input";
import { useDebouncedCallback } from "use-debounce";
import { useState, useRef, useEffect } from "react";
import { getApiSearchData, getCoverImage } from "@/utils/actions";
import { useRouter } from "next/navigation";
import { Book } from "@/utils/types";
import BookList from "./BookList";

function Search() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const handleSearch = useDebouncedCallback(async (value: string) => {
    if (value.length <= 1) {
      setBooks([]);
      setIsOpen(false);
      return;
    }

    const getBooks = await getApiSearchData(value);
    if (getBooks) {
      setBooks(getBooks);
      setIsOpen(true);
      getBooks.forEach(async (book: any, index: any) => {
        const image = await getCoverImage(book.coverId);
        setBooks((prevBooks) => {
          const updatedBooks = [...prevBooks];
          updatedBooks[index] = { ...book, image };
          return updatedBooks;
        });
      });
    } else {
      setBooks([]);
      setIsOpen(false);
    }
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
          if (value.length >= 1) handleSearch(value);
          else handleSearch.cancel();
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
