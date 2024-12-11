"use server";

import { API_URL } from "@/constants";
import { Review } from "@/lib/type";
import { get, getWithoutHeaders, post } from "@/util/fetch";
import { jwtDecode } from "jwt-decode";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const getMe = async () => {
	return get("users/me");
};

export const getAuthentication = async () => {
	const cookie = cookies().get("Authentication")?.value;
	if (!cookie) return null;
	return cookie;
};

export const getAuth = () => {
	const cookie = cookies().get("Authentication")?.value;
	if (!cookie) return null;
	return jwtDecode(cookie!) as any;
};

export const logOut = async () => {
	cookies().delete("Authentication");
};

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

	return {
		error: null,
	};
};

export const deleteReview = async (id: string) => {
	const res = await post(`review/${id}`, {});
	if (res.error) {
		return { error: res.error };
	}

	return {
		error: null,
	};
};
export const addToCart = async (body: {
	productId: string;
	quantity: number;
	subTotal: number;
}) => {
	const res = await post(`cart`, body);
	if (res.error) {
		return { error: res.error };
	}

	return {
		error: null,
	};
};

export const getCartItems = async () => {
	return await get("cart");
};

export const removeItemFromCart = async (id: string) => {
	const res = await post(`cart/${id}`, {});
	if (res.error) {
		return { error: res.error };
	}
	revalidatePath("/cart");
	return {
		error: null,
	};
};

export const checkoutWithStripe = async (data: any) => {
	const res = await fetch(`${API_URL}/checkout/session`, {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
			Cookie: cookies().toString(),
		},
	});
	return res.json();
};

export const checkoutCart = async (data: any) => {
	const body = {
		paymentMethod: data.get("paymentMethod"),
		productList: JSON.parse(data.get("productsList")),
	};

	const res = await post(`checkout`, body);
	if (res.error) {
		return { error: res.error };
	}
	return {
		error: null,
	};
	return data;
};

export const getCartCount = async () => {
	return get("cart/cartCount");
};

export const getOrders = async () => {
	return get("order");
};

export const revalidate = (path: string) => {
	revalidatePath(path);
};
