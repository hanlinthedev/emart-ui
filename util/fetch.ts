import { API_URL } from "@/constants/api";
import { cookies } from "next/headers";

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
		body: JSON.stringify(body),
	});
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
