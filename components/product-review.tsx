import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Review } from "@/lib/type";
import StarRating from "./star-rating";
import { Separator } from "./ui/separator";

type Props = {};

const ProductReview = ({ review }: { review: Review }) => {
	return (
		<>
			<div className="flex gap-4 my-4">
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-4 justify-start">
						<div>
							<Avatar>
								<AvatarImage
									src={review.user?.avatar || ""}
									alt={review.user?.name || ""}
								/>
								<AvatarFallback>
									{review.user?.name?.charAt(0) || ""}
								</AvatarFallback>
							</Avatar>
						</div>
						<div>
							<p className="font-semibold">{review.user?.name}</p>
							<div className="flex items-center gap-4 justify-start">
								<StarRating rating={review.rating} />
								<span className="text-sm text-gray-500">
									( {review.rating} )
								</span>
							</div>
						</div>
					</div>
					<p className="text-gray-500 text-sm italic">{review.comment}</p>
				</div>
			</div>
			<Separator />
		</>
	);
};

export default ProductReview;
