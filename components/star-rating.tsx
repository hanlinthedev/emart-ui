import {
	StarIcon as StarEmpty,
	StarFilledIcon as StarFilled,
} from "@radix-ui/react-icons";
import React from "react";

interface StarRatingProps {
	rating: number; // The rating value (e.g., 2.4)
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
	const stars = Array.from({ length: 5 }, (_, index) => {
		const starValue = index + 1; // Star values from 1 to 5

		if (rating >= starValue) {
			// If rating is greater than or equal to star value, show filled star
			return (
				<div key={index} className="relative inline-block">
					<StarFilled className="h-5 w-5 text-yellow-400" />
				</div>
			);
		} else if (rating >= starValue - 0.5) {
			// If rating is between star values, show half-filled star
			return (
				<div key={index} className="relative inline-block">
					<StarFilled className="absolute h-5 w-5 text-yellow-400" />
					<StarEmpty className="h-5 w-5 text-gray-300" />
				</div>
			);
		} else {
			// Otherwise, show empty star
			return <StarEmpty key={index} className="h-5 w-5 text-gray-300" />;
		}
	});

	return <div className="flex items-center">{stars}</div>;
};

export default StarRating;
