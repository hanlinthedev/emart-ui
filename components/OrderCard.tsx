import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const OrderCard = ({ order }: { order: any }) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{order.orderNumber}</CardTitle>
				<CardDescription>{order.status}</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex gap-2 mb-2">
					<p>Payment : </p>
					<p>
						{order.paymentType === "cash" ? "Cash On Delivery" : "Already Paid"}
					</p>
				</div>
				<div className="flex gap-2 mb-2">
					<p>Total AMT : </p>
					<p>${order.total}</p>
				</div>
				<div className="flex gap-2">
					<p>Order At : </p>
					<p>{order.createdAt.split("T")[0]}</p>
				</div>
			</CardContent>
		</Card>
	);
};

export default OrderCard;
