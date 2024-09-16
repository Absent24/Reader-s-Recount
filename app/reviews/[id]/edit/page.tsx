import EditReviewCard from "@/components/reviews/EditReviewCard";
import { getSingleReview } from "@/utils/actions";

async function EditReview({ params }: { params: { id: string } }) {
  const singleReview = await getSingleReview(params.id);
  if (!singleReview) return null;
  const { bookKey, review, rating, title } = singleReview;
  const bookTitle = singleReview.book.title;
  const reviewProp = {
    bookKey,
    review,
    rating,
    title,
    id: params.id,
  };
  return (
    <div className="w-full max-w-4xl flex flex-col justify-center mx-auto">
      <h2 className="text-3xl text-center font-semibold mx-2 my-4 pb-4">{`Edit ${bookTitle} Review`}</h2>
      <EditReviewCard singleReview={reviewProp} />
    </div>
  );
}

export default EditReview;
