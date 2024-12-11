import OrderCard from "./OrderCard";
const OrderPage = ({ order, status }: { order: any; status: string }) => {
	const filteredOrders = order.filter((order: any) => order.status === status);
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
			{filteredOrders.map((order: any) => (
				<OrderCard key={order.id} order={order} />
			))}
		</div>
	);
};

export default OrderPage;
