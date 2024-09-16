"use client";
import { updateReview } from "@/utils/actions";
import { SubmitBtn } from "../form/Buttons";
import FormContainer from "../form/FormContainer";
import InputField from "../form/InputField";
import ReviewInput from "../form/ReviewInput";
import { Card } from "../ui/card";
import RatingInput from "./RatingsInput";

type EditReviewCardProps = {
  bookKey: string;
  review: string;
  rating: number;
  title: string;
  id: string;
};

function EditReviewCard({
  singleReview,
}: {
  singleReview: EditReviewCardProps;
}) {
  const { bookKey, review, rating, title, id } = singleReview;

  return (
    <Card className="p-4 mt-2">
      <FormContainer
        action={(prevState, formData) => updateReview(prevState, formData, id)}>
        <input
          type="hidden"
          value={bookKey}
          name="bookKey"
        />
        <RatingInput
          name="rating"
          labelText="Rating:"
          defalut={rating}
        />
        <InputField
          name="title"
          type="text"
          defaultValue={title}
          required
        />
        <ReviewInput
          name="review"
          defaultValue={review}
        />
        <SubmitBtn text="Update" />
      </FormContainer>
    </Card>
  );
}

export default EditReviewCard;
