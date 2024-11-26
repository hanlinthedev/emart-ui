import Category from "@/components/Category";
import CustomPagination from "@/components/pagination";
import ProductCard from "@/components/product-card";
import SearchBar from "@/components/search-bar";
import { Product } from "@/lib/type";
import { getCategories, getProducts, getTotalProducts } from "../../../action";

export function generateStaticParams() {
	const totalProducts = getTotalProducts();

	const totalPages = Math.ceil(+totalProducts / 20);
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
	return pages.map((page) => ({ page: page.toString() }));
}
export const dynamic = "force-static";
export default async function Home({
	params: { page },
	searchParams: { q, category },
}: {
	params: { page: string };
	searchParams: { q: string; category: string };
}) {
	const totalProducts = await getTotalProducts(q, category);

	const data: Product[] = await getProducts(page, q, category);

	const products = data?.map((product) => {
		const total = product.reviews.reduce(
			(init, current) => init + current.rating,
			0
		);
		return { ...product, rating: total / product.reviews.length };
	});

	const categories = await getCategories();

	return (
		<div className="min-h-screen ">
			<div className="flex flex-col sm:flex-row-reverse gap-2 justify-between p-4">
				<SearchBar />
				{/* <Sort /> */}
			</div>
			<Category categories={categories} />
			<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 ">
				{products.map((product: any) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
			<CustomPagination total={+totalProducts} currentPage={+page} />
		</div>
	);
}
