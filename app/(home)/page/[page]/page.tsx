import Filter from "@/components/filter";
import CustomPagination from "@/components/pagination";
import ProductCard from "@/components/product-card";
import SearchBar from "@/components/search-bar";
import { Product } from "@/lib/type";
import { getProducts, getTotalProducts } from "../../../action";

export function generateStaticParams() {
	const totalProducts = getTotalProducts();

	const totalPages = Math.ceil(+totalProducts / 10);
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
	return pages.map((page) => ({ page: page.toString() }));
}

export default async function Home({
	params: { page },
	searchParams: { q },
}: {
	params: { page: string };
	searchParams: { q: string };
}) {
	const totalProducts = await getTotalProducts();
	const data: Product[] = await getProducts(page);

	return (
		<div className="min-h-screen ">
			<div className="flex flex-col sm:flex-row-reverse gap-2 justify-between p-4">
				<SearchBar />

				<Filter />
			</div>
			<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 ">
				{data.map((product: any) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
			<CustomPagination total={+totalProducts} currentPage={+page} />
		</div>
	);
}
