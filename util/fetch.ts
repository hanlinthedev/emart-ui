import { API_URL } from "@/constants/api";
import { cookies } from "next/headers";

const getHeaders = () => ({
	Cookie: cookies().toString(),
});

export const post = async (path: string, body: any) => {
	try {
		const res = await fetch(`${API_URL}/${path}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				...getHeaders(),
			},
			body: JSON.stringify(body),
		});

		if (!res.ok) {
			return {
				error: "Something went wrong",
			};
		}
		return {
			error: null,
		};
	} catch (error) {
		console.log(error);
		return {
			error: "Something went wrong",
		};
	}
};

export const get = async (path: string) => {
	const res = await fetch(`${API_URL}/${path}`, {
		headers: {
			...getHeaders(),
		},
	});
	return res.json();
};
