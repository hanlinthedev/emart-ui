"use server";

import { Review } from "@/lib/type";
import { get, post } from "@/util/fetch";
import { revalidatePath } from "next/cache";

export const getProductById = (id: string) => {
	return get(`product/${id}`);
};

export const setProductReview = async (
	review: Partial<Review>,
	path: string
) => {
	try {
		const res = await post(`review`, review);
		revalidatePath(path);
		return res;
	} catch (error) {
		console.log(error);
		return { error };
	}
};
