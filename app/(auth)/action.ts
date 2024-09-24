"use server";

import { API_URL } from "@/constants/api";
import { getErrors } from "@/util/error";
import { post } from "@/util/fetch";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const signup = async (_prevState: any, formData: FormData) => {
	const { error } = await post("users", formData);
	if (error) {
		return {
			error,
		};
	}
	redirect("/");
};

export const login = async (_prevState: any, formData: FormData) => {
	const res = await fetch(`${API_URL}/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(Object.fromEntries(formData)),
	});
	const parseRes = await res.json();
	if (!res.ok) {
		return parseRes.statusCode === 400
			? {
					error: getErrors(parseRes),
			  }
			: parseRes.statusCode === 403 || parseRes.statusCode === 401
			? {
					error: { message: "Invalid credentials" },
			  }
			: {
					error: { message: "Unknown error occurred!" },
			  };
	}
	setCookieFn(res);
	redirect("/");
};

const setCookieFn = (res: Response) => {
	const setCookieHeader = res.headers.get("Set-Cookie");
	if (setCookieHeader) {
		const token = setCookieHeader.split(";")[0].split("=")[1];
		cookies().set({
			name: "Authentication",
			value: token,
			secure: true,
			httpOnly: true,
			expires: new Date(jwtDecode(token).exp! * 1000),
		});
	}
	return;
};
