"use client";
import { getAuth } from "@/app/action";
import { getCartCount } from "@/app/cart/action";
import { Badge } from "@/components/ui/badge";
import { API_URL } from "@/constants";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Button } from "./ui/button";
type Props = {
	cartItemsCount: number;
};

const CartComponent = ({ cartItemsCount }: Props) => {
	const [cartCount, setCartCount] = useState(cartItemsCount);
	useEffect(() => {
		let socket: Socket;
		(async () => {
			socket = io(API_URL, {
				auth: {
					token: await getAuth(),
				},
			});

			socket.on("CartUpdated", async () => {
				const count = await getCartCount();
				setCartCount(count);
			});
		})();
		return () => {
			socket?.disconnect();
		};
	}, []);
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
