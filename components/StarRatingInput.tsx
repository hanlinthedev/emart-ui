import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import React, { forwardRef, useState } from "react";
import { Input } from "./ui/input";

interface StarRatingProps {
	rating?: number; // The initial rating value (optional)
	onRatingChange?: (newRating: number) => void; // Callback for when the rating changes
	field: any;
}

const StarRatingInput: React.FC<StarRatingProps> = forwardRef<
	HTMLInputElement,
	StarRatingProps
>(({ rating = 0, onRatingChange, field, ...props }, ref) => {
	const [hoverRating, setHoverRating] = useState<number | null>(null); // Track hover state
	const [currentRating, setCurrentRating] = useState<number>(rating); // Track selected rating

	const handleClick = (value: number) => {
		setCurrentRating(value); // Update the current rating when a star is clicked
		if (onRatingChange) {
			onRatingChange(value); // Call the callback function to notify parent component
		}
	};

	const handleMouseEnter = (value: number) => {
		setHoverRating(value); // Update hover state
	};

	const handleMouseLeave = () => {
		setHoverRating(null); // Reset hover state when mouse leaves
	};

	const stars = Array.from({ length: 5 }, (_, index) => {
		const starValue = index + 1;

		return (
			<div
				key={index}
				className="cursor-pointer"
				onClick={() => handleClick(starValue)}
				onMouseEnter={() => handleMouseEnter(starValue)}
				onMouseLeave={handleMouseLeave}
			>
				{/* Show filled star if the current rating or hover state is >= starValue */}
				{hoverRating !== null ? (
					hoverRating >= starValue ? (
						<StarFilledIcon className="h-5 w-5 text-yellow-400" />
					) : (
						<StarIcon className="h-5 w-5 text-gray-300" />
					)
				) : currentRating >= starValue ? (
					<StarFilledIcon className="h-5 w-5 text-yellow-400" />
				) : (
					<StarIcon className="h-5 w-5 text-gray-300" />
				)}
			</div>
		);
	});

	return (
		<div className="flex items-center">
			{stars}
			<Input type="hidden" {...field} ref={ref} {...props} />
		</div>
	);
});

StarRatingInput.displayName = "StarRatingInput";

export default StarRatingInput;
