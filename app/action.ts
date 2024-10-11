"use server";

import { get } from "@/util/fetch";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const getMe = async () => {
	return get("users/me");
};

export const getAuth = () => {
	const cookie = cookies().get("Authentication")?.value;
	if (!cookie) return null;
	return jwtDecode(cookie!) as any;
};

export const logOut = async () => {
	cookies().delete("Authentication");
};

export const getProducts = async (page: string) => {
	return get(`product?page=${page}`);
};

export const getTotalProducts = async () => {
	return get("product/total");
};
