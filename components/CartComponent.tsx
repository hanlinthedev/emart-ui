"use client";
import { Badge } from "@/components/ui/badge";
import { useEventSource } from "@/hooks/useEventSource";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
type Props = {};

const CartComponent = (props: Props) => {
	const [cartCount, setCartCount] = useState(0);
	const { data } = useEventSource();
	useEffect(() => {
		if (data?.event === "cartCount") {
			setCartCount(data.cartCount);
		}
	}, [data]);
	return (
		<div className="relative">
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
		</div>
	);
};

export default CartComponent;
