import { API_URL } from "@/constants/api";
import { cookies } from "next/headers";
import { getErrors } from "./error";

const getHeaders = () => ({
	Cookie: cookies().toString(),
});

export const post = async (path: string, body: any) => {
	const res = await fetch(`${API_URL}/${path}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			...getHeaders(),
		},
		body: JSON.stringify(Object.fromEntries(body)),
	});
	const parseRes = await res.json();
	if (!res.ok) {
		return parseRes.statusCode === 400
			? {
					error: getErrors(parseRes),
			  }
			: parseRes.statusCode === 422
			? {
					error: { email: "Email already taken" },
			  }
			: {
					error: { message: "Unknown error occurred!" },
			  };
	}
	return {
		error: null,
	};
};

export const get = async (path: string) => {
	const res = await fetch(`${API_URL}/${path}`, {
		headers: {
			...getHeaders(),
		},
	});
	return res.json();
};
