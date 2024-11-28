import { API_URL } from "@/constants";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
export const useSocket = () => {
	const [data, setData] = useState<any>(null);

	useEffect(() => {
		const socket = io(API_URL);

		socket.on("connect", () => {
			console.log("Connected to server");
		});
	}, []);
	return { data };
};
