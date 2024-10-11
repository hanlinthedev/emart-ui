"use client";
import CustomFormField from "@/components/custom-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleBackslashIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { login } from "../action";

type Props = {};

const Login = (props: Props) => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const { toast } = useToast();
	const formSchema = z.object({
		email: z.string().min(2, {
			message: "Email is required",
		}),
		password: z.string().min(1, {
			message: "Password is required",
		}),
	});
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const redirectRoute = useSearchParams().get("redirect");

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		const formData = new FormData();
		formData.append("email", data.email);
		formData.append("password", data.password);
		try {
			setIsLoading(true);
			const res = await login(formData);
			if (res?.error) {
				toast({
					title: "Error",
					description:
						res.error.message || res.error.email || res.error.password,
				});
				setIsLoading(false);
				return;
			}
			form.reset();
			if (redirectRoute) {
				router.replace(redirectRoute);
			} else {
				router.replace("/");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4 w-full max-w-xs"
			>
				<CustomFormField form={form} name="email" placeholder="Email" />
				<CustomFormField
					form={form}
					name="password"
					placeholder="Password"
					type="password"
				/>
				<Button type="submit" className="w-full" disabled={isLoading}>
					{isLoading ? <CircleBackslashIcon /> : "Log In"}
				</Button>
				<div className="flex justify-center">
					<Link href="/signup">
						Do not have an account yet?{""}
						<span className="underline">Sign Up</span>
					</Link>
				</div>
			</form>
		</Form>
	);
};
export default Login;
