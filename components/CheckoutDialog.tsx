import { CartItem } from "@/lib/type";
import PaymentMethod from "./PaymentMethod";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";

type Props = {
	cartItems: CartItem[];
};

const CheckoutDialog = ({ cartItems }: Props) => {
	const productsList = cartItems.map((item: CartItem) => ({
		id: item.id,
		quantity: item.quantity,
	}));
	return (
		<Dialog>
			<DialogTrigger>
				<Button variant="default">Checkout</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Double Check Your Items! </DialogTitle>
					<DialogDescription>
						<ul>
							{cartItems.map((item: CartItem) => (
								<li key={item.id} className="my-2">
									{item.quantity}x {item.product.name}
								</li>
							))}
						</ul>
					</DialogDescription>
				</DialogHeader>
				<PaymentMethod productsList={JSON.stringify(productsList)} />
			</DialogContent>
		</Dialog>
	);
};

export default CheckoutDialog;
