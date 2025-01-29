"use client";
import { getAuth } from "@/app/action";
import { setProductReview } from "@/app/product/action";
import { useSubmit } from "@/hooks/useSubmit";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomFormField from "./custom-form";
import StarRatingInput from "./StarRatingInput";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

type Props = {
	productId: string;
};

const ReviewForm = ({ productId }: Props) => {
	const user = getAuth();

	const path = usePathname();
	const formSchema = z.object({
		comment: z.string(),
		rating: z.number().min(1).max(5),
	});
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			comment: "",
			rating: 0,
		},
	});

	const handleRatingChange = (newRating: number) => {
		form.setValue("rating", newRating);
	};

	const { handleSubmit, loading } = useSubmit(setProductReview);
	const submitReview = async (data: z.infer<typeof formSchema>) => {
		const res = await handleSubmit({ ...data, productId });
		if (!res.error) {
			form.reset();
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit((data) => submitReview(data))}
				className="space-y-4 py-5 "
			>
				<CustomFormField form={form} name="comment" placeholder="Comment" />
				<div className="flex items-center justify-between space-x-2">
					<FormField
						control={form.control}
						name="rating"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<StarRatingInput
										field={field}
										rating={field.value}
										onRatingChange={handleRatingChange}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						disabled={!user}
						className={
							user ? "hover:cursor-pointer" : "hover:cursor-not-allowed"
						}
					>
						Submit
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default ReviewForm;
