import OrderPage from "@/components/OrderPage";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAuth } from "../action";
import { getOrders } from "./action";

type Props = {};

const page = async (props: Props) => {
	const user = await getAuth();
	const orders = await getOrders();

	return (
		<Tabs defaultValue="pending" className="w-full px-2 sm:px-4">
			<div className="text-2xl font-semibold mt-4">My Orders</div>
			<TabsList className="w-full bg-none">
				<TabsTrigger value="pending" className="w-full">
					Pending
				</TabsTrigger>
				<Separator orientation="vertical" className="h-full" />
				<TabsTrigger value="shipping" className="w-full">
					On The Way
				</TabsTrigger>
				<Separator orientation="vertical" className="h-full" />
				<TabsTrigger value="completed" className="w-full">
					Completed
				</TabsTrigger>
			</TabsList>
			<TabsContent value="pending">
				<div className="py-6">
					<OrderPage order={orders} status="pending" />
				</div>
			</TabsContent>
			<TabsContent value="shipping">
				<div className="py-6">
					<OrderPage order={orders} status="shipping" />
				</div>
			</TabsContent>
			<TabsContent value="completed">
				<div className="py-6">
					<OrderPage order={orders} status="completed" />
				</div>
			</TabsContent>
		</Tabs>
	);
};

export default page;
