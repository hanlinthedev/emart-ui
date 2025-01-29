"use server";

import { Review } from "@/lib/type";
import { getWithoutHeaders, post } from "@/util/fetch";

export const getProducts = async (
	page: string,
	q: string,
	category: string
) => {
	return getWithoutHeaders(`product?page=${page}&q=${q}&category=${category}`);
};

export const getTotalProducts = async (
	q: string | undefined = undefined,
	category: string | undefined = undefined
) => {
	return getWithoutHeaders(`product/total?q=${q}&category=${category}`);
};

export const getProductById = (id: string) => {
	return getWithoutHeaders(`product/${id}`);
};

export const getCategories = () => {
	return getWithoutHeaders("category");
};

export const setProductReview = async (review: Partial<Review>) => {
	const res = await post(`review`, review);
	if (res.error) {
		return { error: res.error };
	}
	return { error: null };
};

export const deleteReview = async (id: string) => {
	const res = await post(`review/${id}`, {});
	if (res.error) {
		return { error: res.error };
	}
	return { error: null };
};
