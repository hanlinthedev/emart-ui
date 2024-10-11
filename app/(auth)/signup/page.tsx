"use client";
import CustomFormField from "@/components/custom-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleBackslashIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signup } from "../action";
type Props = {};

const Login = (props: Props) => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const { toast } = useToast();
	const formSchema = z
		.object({
			username: z.string().min(3, {
				message: "Username is required",
			}),
			email: z.string().min(2, {
				message: "Email is required",
			}),
			password: z.string().min(8, {
				message: "Password is required",
			}),
			confirmPassword: z.string().min(8, {
				message: "Confirm password is required",
			}),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: "Passwords don't match",
			path: ["confirmPassword"],
		});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		const formData = new FormData();
		formData.append("email", data.email);
		formData.append("password", data.password);
		formData.append("name", data.username);
		try {
			setIsLoading(true);
			const res = await signup(formData);
			if (res?.error) {
				toast({
					title: "Error",
					description:
						res.error.message ||
						res.error.name ||
						res.error.eamil ||
						res.error.password,
				});
				setIsLoading(false);
				return;
			}
			form.reset();
			router.replace("/");
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
				<CustomFormField form={form} name="username" placeholder="Username" />
				<CustomFormField form={form} name="email" placeholder="Email" />
				<CustomFormField
					form={form}
					name="password"
					placeholder="Password"
					type="password"
				/>
				<CustomFormField
					form={form}
					name="confirmPassword"
					placeholder="Confirm Password"
					type="password"
				/>
				<Button type="submit" className="w-full" disabled={isLoading}>
					{isLoading ? <CircleBackslashIcon /> : "Sign Up"}
				</Button>
				<div className="flex justify-center">
					<Link href="/login">
						Already havev an account? <span className="underline">Log In</span>
					</Link>
				</div>
			</form>
		</Form>
	);
};
export default Login;
