"use client";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";

const CustomPagination = ({
	total,
	currentPage,
}: {
	total: number;
	currentPage: number;
}) => {
	const totalPage = Math.ceil(total / 10);
	const router = useRouter();

	const paginationArray =
		currentPage < 3
			? [1, 2, 3, 4, 5]
			: currentPage > totalPage - 2
			? [totalPage - 4, totalPage - 3, totalPage - 2, totalPage - 1, totalPage]
			: [
					currentPage - 2,
					currentPage - 1,
					currentPage,
					currentPage + 1,
					currentPage + 2,
			  ];

	return (
		<Pagination className="py-8">
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						className={currentPage === 1 ? "pointer-events-none hidden" : ""}
						href={
							currentPage !== 1
								? `/page/${currentPage - 1}`
								: `/page/${currentPage}`
						}
					/>
				</PaginationItem>
				{paginationArray.map((pageNumber, index) => (
					<PaginationItem key={index}>
						<PaginationLink
							href={`/page/${pageNumber}`}
							isActive={pageNumber === currentPage}
							onClick={() => router.push(`/`)}
						>
							{pageNumber}
						</PaginationLink>
					</PaginationItem>
				))}

				{currentPage < totalPage - 2 && (
					<>
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href={`/page/${totalPage}`}>
								{totalPage}
							</PaginationLink>
						</PaginationItem>
					</>
				)}
				<PaginationItem>
					<PaginationNext
						className={
							currentPage === totalPage ? "pointer-events-none hidden" : ""
						}
						href={
							currentPage !== totalPage
								? `/page/${currentPage + 1}`
								: `/page/${currentPage}`
						}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};
export default CustomPagination;
