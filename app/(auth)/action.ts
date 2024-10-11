"use server";

import { API_URL } from "@/constants/api";
import { getErrors } from "@/util/error";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const signup = async (formData: FormData) => {
	try {
		const res = await fetch(`${API_URL}/auth/signup`, {
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
				: {
						error: { message: parseRes.message },
				  };
		}
		setCookieFn(res);
	} catch (error: any) {
		console.log(error);
		return {
			error: { message: error.message },
		};
	}
};

export const login = async (formData: FormData) => {
	try {
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
	} catch (error) {
		console.log(error);
		return {
			error: { message: "Unknown error occurred!" },
		};
	}
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
