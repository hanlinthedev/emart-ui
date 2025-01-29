"use client";
import { removeItemFromCart } from "@/app/cart/action";
import { CartItem } from "@/lib/type";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

interface CartItemProps {
	item: CartItem;
}
const CartItemCards = ({ item }: CartItemProps) => {
	return (
		<div className="border rounded flex relative  gap-2 h-28 group">
			<div className="w-24 h-full ">
				<Image
					src={item.product.image}
					width={500}
					height={500}
					className="w-full h-full object-cover rounded-l"
					alt={item.product.name}
				/>
			</div>
			<div className="flex flex-col justify-between p-2">
				<p className="text-sm">{item.product.name}</p>
				<p className="text-xs text-gray-400">$ {item.product.price} per item</p>
				<p className="text-xs text-gray-400">{item.quantity} items</p>
				<p className="text-xs text-gray-400">$ {item.subTotal} subtotal</p>
			</div>
			<Button
				variant="destructive"
				className="absolute top-0 right-2 -translate-y-1/2 group-hover:visible  invisible"
				size="icon"
				onClick={() => removeItemFromCart(item.id)}
			>
				<Trash2 />
			</Button>
		</div>
	);
};

export default CartItemCards;
