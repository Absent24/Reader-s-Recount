import { validBook } from "./schemas";

export const sortBooks = (bookArray: validBook[], option: string) => {
  switch (option) {
    case "Title A-Z":
      bookArray.sort((book1, book2) => {
        const nameA = book1.title.toUpperCase();
        const nameB = book2.title.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      break;

    case "Title Z-A":
      bookArray.sort((book1, book2) => {
        const nameA = book1.title.toUpperCase();
        const nameB = book2.title.toUpperCase();
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
        return 0;
      });
      break;

    case "Author A-Z":
      bookArray.sort((book1, book2) => {
        const nameA = book1.author.toUpperCase();
        const nameB = book2.author.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      break;

    case "Author Z-A":
      bookArray.sort((book1, book2) => {
        const nameA = book1.author.toUpperCase();
        const nameB = book2.author.toUpperCase();
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
        return 0;
      });
      break;

    case "Rating - High":
      bookArray.sort((book1, book2) => book2.rrRating - book1.rrRating);
      break;

    case "Rating - Low":
      bookArray.sort((book1, book2) => book1.rrRating - book2.rrRating);
      break;

    case "Reviews - High":
      bookArray.sort((book1, book2) => book2.rrNumRating - book1.rrNumRating);
      break;

    case "Reviews - Low":
      bookArray.sort((book1, book2) => book1.rrNumRating - book2.rrNumRating);
      break;

    default:
      break;
  }
};
