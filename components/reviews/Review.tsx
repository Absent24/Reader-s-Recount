"use client";
import { useState } from "react";
import { Button } from "../ui/button";

function Review({ title, review }: { title: string; review: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const longReview = review.length > 200;
  const visibleReview =
    longReview && !isExpanded ? `${review.slice(0, 200)}...` : review;
  return (
    <div>
      <h3 className="text-lg pb-2">{title}</h3>
      <p className="text-sm whitespace-pre-line">{visibleReview}</p>
      {longReview && (
        <Button
          variant="link"
          className="pl-0 text-muted-foreground"
          onClick={toggleExpand}>
          {isExpanded ? "Show less" : "Show more"}
        </Button>
      )}
    </div>
  );
}

export default Review;
