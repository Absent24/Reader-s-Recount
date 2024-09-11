export type actionType = (
  prevState: any,
  formData: FormData
) => Promise<{ message: string }>;

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
  rrRating?: number | undefined;
};
