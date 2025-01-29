import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/lib/type";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import StarRating from "./star-rating";
import { Button } from "./ui/button";

export default function ProductCard({ product }: { product: Product }) {
	return (
		<AspectRatio ratio={3 / 4} className="relative">
			<Link href={`/product/${product.id}`}>
				<Card className="w-full h-full shadow-none hover:shadow-xl border-none group hover:cursor-pointer">
					<Image
						src={product.image}
						alt={product.name}
						width={100}
						height={100}
						className="w-full h-2/3 hover:h-full object-cover transition-all rounded   top-0 left-0 z-0 absolute "
					/>

					<CardHeader className="absolute bottom-0 left-0 w-full h-1/3 z-10 group-hover:shadow-lg  transition-all duration-300 group-hover:backdrop-blur-sm rounded">
						<CardTitle className="group-hover:text-shadow shadow-white dark:shadow-black">
							{product.name}
						</CardTitle>
						<CardTitle className="group-hover:text-shadow shadow-white dark:shadow-black">
							$ {product.price}
						</CardTitle>
					</CardHeader>
					<div className="flex justify-between pl-6 pr-2 items center absolute bottom-2 w-full z-20">
						<StarRating rating={product.rating} />
						<Button
							size={"sm"}
							variant="secondary"
							className="gap-1 group-hover:text-shadow shadow-white dark:shadow-black"
						>
							<Eye className="shadow-2xl" />

							<span className="text-base">{product.views}</span>
						</Button>
					</div>
				</Card>
			</Link>
		</AspectRatio>
	);
}
