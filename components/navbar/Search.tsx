"use client";

import { Input } from "../ui/input";
import { useDebouncedCallback } from "use-debounce";
import { useState, useRef, useEffect } from "react";
import { getApiData } from "@/utils/actions";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Book {
  title: string;
  autor: string;
  image: string;
  id: string;
}

function Search() {
  const [book, setBook] = useState<Book | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const handleSearch = useDebouncedCallback(async (value: string) => {
    const newBook = await getApiData(value);
    if (newBook) {
      setBook(newBook);
      setIsOpen(true);
    } else {
      setBook(null);
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

  const handleClick = (id: string) => {
    router.push(`/details/${id}`);
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
      {isOpen && book ? (
        <div className="absolute top-full mt-2 w-full max-w-sm dark:bg-muted shadow-md rounded-md z-20">
          <ul className="py-1 bg-background">
            <li
              className="px-2 py-1 cursor-pointer flex flex-row"
              onClick={() => handleClick(book.id)}>
              <Image
                src={book.image}
                alt="Author"
                width={40}
                height={40}
                className="object-cover pr-3 w-[6rem] h-[5rem]"
              />
              <div>
                <h3 className="text-sm font-semibold">{book.title}</h3>
                <p className="text-sm font-light">{book.autor}</p>
              </div>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default Search;
