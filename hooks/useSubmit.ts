import { getAuth } from "@/app/action";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { revalidate } from "../app/action";
import { useToast } from "./use-toast";

// A generic hook that can be used for both form and non-form submissions
export const useSubmit = (
	serverFn: (data?: any) => Promise<{ error: string } | { error: null }>
) => {
	const { toast } = useToast();
	const [loading, setLoading] = useState(false);
	const path = usePathname();
	const router = useRouter();

	const handleSubmit = async (data?: any) => {
		setLoading(true);

		const user = await getAuth();
		if (!user) {
			toast({
				title: "You need to login first",
				description: "Please login to continue",
				variant: "destructive",
			});
			router.push(`/login?redirect=${path}`);
			setLoading(false);
			return { error: "You need to login first" };
		}

		try {
			const res = await serverFn(data);

			if (res.error) {
				toast({
					title: "Something went wrong",
					description: res.error,
					variant: "destructive",
				});
				setLoading(false);
				return { error: res.error };
			} else {
				toast({
					title: "Success",
					description: "Operation successful",
				});
				revalidate(path);
				setLoading(false);
				return { error: null };
			}
		} catch (error) {
			toast({
				title: "Error",
				description: "An unexpected error occurred",
				variant: "destructive",
			});
			setLoading(false);
			return { error: "An unexpected error occurred" };
		}

		setLoading(false);
	};

	return { loading, handleSubmit };
};
