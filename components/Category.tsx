"use client";
import { Category as ICategory } from "@/lib/type";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { Button } from "./ui/button";

type Props = {
	categories: ICategory[];
};

const Category = ({ categories }: Props) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const pathname = usePathname();
	const categoryFilter = useSearchParams().get("category");
	useEffect(() => {
		const container = containerRef.current;
		if (container) {
			const handleWheel = (event: WheelEvent) => {
				event.preventDefault();
				// event.stopPropagation();
				if (event.deltaY !== 0) {
					container.scrollLeft += event.deltaY;
				}
			};
			container.addEventListener("wheel", handleWheel);
			return () => container.removeEventListener("wheel", handleWheel);
		}
	}, []);

	return (
		<div
			ref={containerRef}
			className="flex no-wrap gap-2 p-4 w-full overflow-auto scrollbar-none"
		>
			{categories.map((category) => (
				<Button
					asChild
					variant={categoryFilter === category.id ? "secondary" : "outline"}
					key={category.id}
				>
					<Link href={`/page/1?category=${category.id}`}>{category.name}</Link>
				</Button>
			))}
		</div>
	);
};

export default Category;
