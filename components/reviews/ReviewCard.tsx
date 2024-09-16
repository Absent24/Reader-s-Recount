import Stars from "./Stars";
import Review from "./Review";
import { Card, CardContent, CardHeader } from "../ui/card";

type ReviewCardProps = {
  reviewInfo: {
    title: string;
    review: string;
    rating: number;
    name: string;
    image: string;
  };
  children?: React.ReactNode;
};

function ReviewCard({ reviewInfo, children }: ReviewCardProps) {
  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex flex-row justify-between">
          <div className="flex items-center">
            <img
              src={reviewInfo.image}
              alt="Profile Image"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="ml-3">
              <h3 className="text-sm font-bold mb-1">{reviewInfo.name}</h3>
              <Stars rating={reviewInfo.rating} />
            </div>
          </div>
          <div className="flex items-center">{children}</div>
        </div>
      </CardHeader>
      <CardContent>
        <Review
          title={reviewInfo.title}
          review={reviewInfo.review}
        />
      </CardContent>
    </Card>
  );
}

export default ReviewCard;
