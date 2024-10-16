"use client";

import { deleteReview } from "@/app/action";
import { useSubmit } from "@/hooks/useSubmit";
import { Trash } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
	reviewUserId?: string;
	currentUserId?: string;
	reviewId: string;
};

const DeleteReview = ({ currentUserId, reviewUserId, reviewId }: Props) => {
	const { loading, handleSubmit } = useSubmit(deleteReview);
	return (
		<>
			{currentUserId === reviewUserId && (
				<Button
					size={"icon"}
					variant={"secondary"}
					onClick={() => handleSubmit(reviewId)}
				>
					<Trash />
				</Button>
			)}
		</>
	);
};

export default DeleteReview;
