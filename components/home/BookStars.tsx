import { FaStar, FaRegStar, FaStarHalf } from "react-icons/fa";

function BookStars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const fractionalPart = rating - fullStars;

  const stars = Array.from({ length: 5 }, (_, i) => {
    const starNumber = i + 1;
    if (starNumber <= fullStars) {
      return "full";
    } else if (starNumber === fullStars + 1) {
      return fractionalPart >= 0.4 && fractionalPart <= 0.85 ? "half" : "empty";
    } else {
      return "empty";
    }
  });

  return (
    <div className="flex items-center gap-x-1">
      {stars.map((type, i) => {
        const className = `w-3 h-3 ${
          type === "full"
            ? "text-primary"
            : type === "half"
            ? "text-primary"
            : "text-gray-400"
        }`;
        return type === "full" ? (
          <FaStar
            className={className}
            key={i}
          />
        ) : type === "half" ? (
          <FaStarHalf
            className={className}
            key={i}
          />
        ) : (
          <FaRegStar
            className={className}
            key={i}
          />
        );
      })}
    </div>
  );
}

export default BookStars;
