import { getCartItems } from "@/app/action";
import CartItemCards from "@/components/CartItemCards";
import CheckoutDialog from "@/components/CheckoutDialog";
import { CartItem } from "../../lib/type";

const Cart = async () => {
	const cartItems = await getCartItems();

	if (!Array.isArray(cartItems) || cartItems.length === 0) {
		return (
			<div className="flex justify-center items-center h-screen">
				<p>Your cart is empty</p>
			</div>
		);
	}
	const totalAmount = cartItems?.reduce(
		(acc: number, item: CartItem) => acc + item.subTotal,
		0
	);
	return (
		<div className="pt-8 px-4 lg:px-0">
			<div className="flex justify-end items-center py-4 mb-4 gap-4">
				<p>$ {totalAmount} in total</p>
				<CheckoutDialog cartItems={cartItems} />
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
				{cartItems.length > 0 &&
					cartItems.map((item: CartItem) => (
						<CartItemCards key={item.id} item={item} />
					))}
			</div>
		</div>
	);
};

export default Cart;
