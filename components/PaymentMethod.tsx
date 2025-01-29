"use client";

import { checkoutCart, checkoutWithStripe } from "@/app/checkout/action";
import getStripe from "@/app/checkout/stripe";
import { useToast } from "@/hooks/use-toast";
import { useSubmit } from "@/hooks/useSubmit";
import { Button } from "./ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

type Props = {
	productsList: string;
};

const PaymentMethod = ({ productsList }: Props) => {
	const { toast } = useToast();
	const { loading, handleSubmit } = useSubmit(checkoutCart);

	const handleStripePayment = async (paymentMethod: string) => {
		const session = await checkoutWithStripe({
			productList: JSON.parse(productsList),
			paymentMethod,
		});
		console.log("session", session);
		if (
			session.message ===
			"The Checkout Session's total amount due must add up to at least $0.50 usd"
		) {
			toast({
				title: "Please add more items to your cart",
				description:
					"The Checkout Session's total amount due must add up to at least $0.50 usd",
				variant: "destructive",
			});
			return;
		}
		const stripe = await getStripe();
		console.log("stripe", stripe);
		await stripe?.redirectToCheckout({
			sessionId: session.id,
		});
	};

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				const formData = new FormData(e.currentTarget);
				const paymentMethod = formData.get("paymentMethod");
				paymentMethod === "card"
					? handleStripePayment(paymentMethod)
					: handleSubmit(formData);
			}}
		>
			<input name="productsList" type="hidden" value={productsList} />
			<Select name="paymentMethod" required>
				<SelectTrigger className="w-full">
					<SelectValue placeholder="Chosse a payment method" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="cash">Cash on delivery</SelectItem>
					<SelectItem value="card">Card</SelectItem>
				</SelectContent>
			</Select>
			<div className="flex justify-end mt-4">
				<Button type="submit" disabled={loading}>
					Proceed
				</Button>
			</div>
		</form>
	);
};
export default PaymentMethod;
