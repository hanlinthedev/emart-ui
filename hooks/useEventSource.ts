import { API_URL } from "@/constants";
import { EventSourcePolyfill } from "event-source-polyfill";
import { cookies } from "next/headers";
import { useEffect, useState } from "react";
export const useEventSource = () => {
	const [data, setData] = useState<any>(null);
	useEffect(() => {
		if (typeof window !== "undefined") {
			const eventSource = new EventSourcePolyfill(`${API_URL}/cart/sse`, {
				withCredentials: true, // Include credentials if needed
				headers: {
					"Content-Type": "text/event-stream",
					"Cache-Control": "no-cache",
					Connection: "keep-alive",
					Cookie: cookies().toString(),
				},
			});

			eventSource.onopen = () => {
				console.log("SSE connection opened");
			};

			eventSource.onerror = (error: any) => {
				console.error("SSE connection error:", error);
			};

			eventSource.onmessage = (event) => {
				console.log("Received event:", event);
				const data = JSON.parse(event.data);
				console.log("Received Data:", data);
				setData({ cartCount: data.data.cartCount, event: data.event });
			};

			return () => {
				eventSource.close();
			};
		}
	}, []);
	return { data };
};
