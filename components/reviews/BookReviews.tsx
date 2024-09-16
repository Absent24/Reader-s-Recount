import { getBookReviews } from "@/utils/actions";
import ReviewCard from "./ReviewCard";

async function BookReviews({ bookKey }: { bookKey: string }) {
  const bookReviews = await getBookReviews(bookKey);
  if (bookReviews.length === 0) return null;
  return (
    <div className="mt-6 w-full min-w-full">
      <h3 className="text-lg font-bold mb-2">User reviews</h3>
      <div className="grid lg:grid-cols-2 gap-2 mt-2">
        {bookReviews.map((bookReview) => {
          const { review, rating, title } = bookReview;
          const { username, profileImage } = bookReview.profile;
          const reviewInfo = {
            review,
            rating,
            title,
            name: username,
            image: profileImage,
          };
          return (
            <ReviewCard
              reviewInfo={reviewInfo}
              key={username}
            />
          );
        })}
      </div>
    </div>
  );
}

export default BookReviews;
