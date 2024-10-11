"use client";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
type Props = {};

const SearchBar = (props: Props) => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const query = searchParams.get("q");
	const [q, setQ] = useState(query || "");
	const handleQuery = () => {
		router.push(`?q=${q}`);
	};
	return (
		<div className="relative w-full sm:w-80 flex items-center  gap-2">
			<Input
				placeholder="Search..."
				onChange={(e) => setQ(e.target.value)}
				value={q}
			/>
			<Button
				onClick={handleQuery}
				variant="ghost"
				className="absolute right-0 hidden sm:block"
			>
				<MagnifyingGlassIcon />
			</Button>
			<Button
				onClick={handleQuery}
				variant="secondary"
				className=" block sm:hidden"
			>
				<MagnifyingGlassIcon />
			</Button>
		</div>
	);
};

export default SearchBar;
