import React from "react";
import { FaStar } from "react-icons/fa";

interface StarRatingProps {
  totalStars: number;
  selectedStars: number;
  onRate: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  totalStars,
  selectedStars,
  onRate,
}) => {
  return (
    <div className="bg-transparent">
      {[...Array(totalStars)].map((_, index) => {
        const isSelected = index < selectedStars;
        return (
          <FaStar
            key={index}
            className={`inline cursor-pointer text-2xl bg-transparent ${
              isSelected
                ? "fill-aprimary bg-transparent"
                : "fill-gray-400 bg-transparent"
            }`}
            onClick={() => onRate(index + 1)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
