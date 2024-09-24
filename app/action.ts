"use server";

import { get } from "@/util/fetch";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation'

export const getMe = async () => {
	return get("users/me");
};

export const getAuth = async () => {
	const cookie = cookies().get("Authentication")?.value;
	if (!cookie) return null;
	return jwtDecode(cookie!);
};

export const logOut = async () => {
	cookies().delete("Authentication");
	redirect('/login')
};
