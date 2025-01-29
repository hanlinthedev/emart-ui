"use client";
import { addToCart } from "@/app/cart/action";
import { useToast } from "@/hooks/use-toast";
import { useSubmit } from "@/hooks/useSubmit";
import { CircleMinus, CirclePlus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
type Props = {
	productId: string;
	price: number;
	stock: number;
};

const AddToCart = ({ productId, price, stock }: Props) => {
	const [quantity, setQuantity] = useState(stock > 0 ? 1 : 0);
	const { toast } = useToast();
	const { loading, handleSubmit } = useSubmit(addToCart);
	const path = usePathname();
	const router = useRouter();

	return (
		<div className="w-full py-2 fixed  sm:absolute bottom-0 sm:-bottom-6 right-0 px-4 sm:px-0 z-10">
			<Separator />
			<div className="flex justify-end items-center py-2 gap-4">
				<div className="flex gap-2 items-center">
					<Button
						variant="ghost"
						size={"icon"}
						onClick={() => setQuantity((prev) => prev - 1)}
						disabled={quantity <= 1}
					>
						<CircleMinus />
					</Button>
					<Button variant="secondary">{quantity}</Button>
					<Button
						variant="ghost"
						size={"icon"}
						onClick={() => setQuantity((prev) => prev + 1)}
						disabled={quantity === stock || stock === 0}
					>
						<CirclePlus />
					</Button>
				</div>
				<Button
					onClick={() =>
						handleSubmit({
							productId,
							quantity,
							subTotal: quantity * price,
						})
					}
					disabled={loading}
				>
					Add To Cart
				</Button>
			</div>
		</div>
	);
};

export default AddToCart;
