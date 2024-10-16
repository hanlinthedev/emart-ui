import { getProductById } from "@/app/action";
import AddToCart from "@/components/AddToCart";
import ProductReview from "@/components/product-review";
import ReviewForm from "@/components/ReviewForm";
import StarRating from "@/components/star-rating";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { API_URL } from "@/constants";
import { Product } from "@/lib/type";
import Image from "next/image";

type Props = {};

export const generateStaticParams = async () => {
	const ids = await fetch(API_URL + "/product/ids").then((res) => res.json());
	return ids.map((id: any) => ({
		id: id.id.toString(),
	}));
};

const page = async ({
	params: { id },
}: {
	params: {
		id: string;
	};
}) => {
	const data: Product = await getProductById(id);
	const rating =
		data.reviews.reduce((total, current) => total + current.rating, 0) /
		data.reviews.length;
	return (
		<div className="p-6 pb-8 grid grid-cols-1 sm:grid-cols-2 min-h-[calc(100vh-32px)] ">
			<div className="py-3">
				<AspectRatio ratio={16 / 9}>
					<Image
						src={data.image}
						alt={data.name}
						width={500}
						height={500}
						className="object-cover h-full rounded "
					/>
				</AspectRatio>
			</div>
			<div className="flex flex-col gap-4 relative h-full">
				<h1 className="text-3xl font-bold">{data.name}</h1>
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-4 justify-start">
						<StarRating rating={rating} />
						<span className="text-sm text-gray-500">
							( {data.reviews.length} reviews )
						</span>
					</div>
					<p className="font-semibold">$ {data.price}</p>
					<p className="text-gray-500 text-sm italic">In Stock: {data.stock}</p>
					<p className="text-gray-500 text-sm italic">Views: {data.views}</p>
					<p className="text-gray-500 text-sm italic">
						Vendor: {data.user.name}
					</p>
				</div>
				<Separator />
				<Tabs defaultValue="description" className="w-full">
					<TabsList className="w-full bg-none">
						<TabsTrigger value="description" className="w-full">
							Description
						</TabsTrigger>
						<Separator orientation="vertical" className="h-full" />
						<TabsTrigger value="reviews" className="w-full">
							Reviews
						</TabsTrigger>
					</TabsList>
					<TabsContent value="description">
						<div className="py-6">{data.description}</div>
					</TabsContent>
					<TabsContent value="reviews">
						<ReviewForm productId={data.id} />
						<Separator />
						<div className="py-6">
							{data.reviews.map((review) => (
								<ProductReview key={review.id} review={review} />
							))}
						</div>
					</TabsContent>
				</Tabs>
				<AddToCart productId={data.id} price={data.price} stock={data.stock} />
			</div>
		</div>
	);
};

export default page;
