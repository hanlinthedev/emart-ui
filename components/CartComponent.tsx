"use client";
import { Badge } from "@/components/ui/badge";
import { useEventSource } from "@/hooks/useEventSource";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from 'next/link';
type Props = {
	cartItemsCount: number;
};

const CartComponent = ({ cartItemsCount }: Props) => {
	const [cartCount, setCartCount] = useState(cartItemsCount);
	const { data } = useEventSource();
	useEffect(() => {
		if (data?.event === "cartCount") {
			setCartCount(data.cartCount);
		}
	}, [data]);
	return (
		<Link href="/cart" className="relative">
			{cartCount > 0 && (
				<Badge
					className="absolute -top-[25%] -right-[25%]"
					variant="destructive"
				>
					{cartCount}
				</Badge>
			)}
			<Button variant="outline" size={"icon"} className="rounded-full ">
				<ShoppingCart className="h-[1.2rem]   w-[1.2rem]" />
			</Button>
		</Link>
	);
};

export default CartComponent;
