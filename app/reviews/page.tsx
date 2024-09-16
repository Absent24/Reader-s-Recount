import ReviewCard from "@/components/reviews/ReviewCard";
import EmptyReviewPage from "@/components/reviews/EmptyReviewPage";
import { deleteReview, getUserReviews } from "@/utils/actions";
import { auth } from "@clerk/nextjs/server";
import { IconButton } from "@/components/form/Buttons";
import Link from "next/link";
import FormContainer from "@/components/form/FormContainer";

async function Reviews() {
  const { userId } = auth();
  if (!userId) return null;
  const userReviews = await getUserReviews(userId);
  if (userReviews.length === 0) return <EmptyReviewPage />;

  return (
    <div className="mt-6 w-full min-w-full">
      <h3 className="text-lg font-bold mb-6">My reviews</h3>
      <div className="grid lg:grid-cols-2 gap-2 mt-2">
        {userReviews.map((userReview) => {
          const { review, rating, title, id, bookKey } = userReview;
          const { image } = userReview.book;
          const bookTitle = userReview.book.title;
          const reviewInfo = {
            review,
            rating,
            title,
            name: bookTitle,
            image: image,
          };
          return (
            <ReviewCard
              reviewInfo={reviewInfo}
              key={id}>
              <Link href={`/reviews/${id}/edit`}>
                <IconButton actionType="edit" />
              </Link>
              <DeleteReview
                reviewId={id}
                bookKey={bookKey}
              />
            </ReviewCard>
          );
        })}
      </div>
    </div>
  );
}

const DeleteReview = ({
  reviewId,
  bookKey,
}: {
  reviewId: string;
  bookKey: string;
}) => {
  const delReview = deleteReview.bind(null, { reviewId, bookKey });
  return (
    <FormContainer action={delReview}>
      <IconButton actionType="delete" />
    </FormContainer>
  );
};

export default Reviews;
