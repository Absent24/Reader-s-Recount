export type actionType = (prevState: any, formData: FormData) => Promise<any>;

export type Book = {
  title: string;
  author: string;
  coverId: number | undefined;
  key: string;
  image: string;
};

export type bookDetails = {
  title: string;
  bookKey: string;
  author: string;
  authorKey: string;
  firstPublish: number;
  numOfPages: number;
  coverId: number | undefined;
  openlibRating: number | undefined;
  openlibNumRating: number | undefined;
  rrRating?: number | undefined;
  rrNumRating?: number | undefined;
  image: string | "/images/defaultCover.png";
};
