"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import RatingInput from "./RatingsInput";
import FormContainer from "../form/FormContainer";
import { submitReview } from "@/utils/actions";
import { SubmitBtn } from "../form/Buttons";
import InputField from "../form/InputField";
import ReviewInput from "../form/ReviewInput";
import { bookDetails } from "@/utils/types";

function SubmitReview({ book }: { book: bookDetails }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="min-w-full">
      <Button onClick={() => setIsVisible((prev) => !prev)}>
        Leave a review
      </Button>
      {isVisible && (
        <Card className="p-4 mt-2">
          <FormContainer
            action={(prevState, formData) =>
              submitReview(prevState, formData, book)
            }>
            <input
              type="hidden"
              value={book.bookKey}
              name="bookKey"
            />
            <RatingInput
              name="rating"
              labelText="Rating:"
            />
            <InputField
              name="title"
              type="text"
              required
            />
            <ReviewInput name="review" />
            <SubmitBtn />
          </FormContainer>
        </Card>
      )}
    </div>
  );
}

export default SubmitReview;
