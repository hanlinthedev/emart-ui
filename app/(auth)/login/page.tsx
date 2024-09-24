"use client";
import { Button, Link, Stack, TextField } from "@mui/material";
import NextLink from "next/link";
import { useFormState } from "react-dom";
import { login } from "../action";

type Props = {};

const Login = (props: Props) => {
	const [state, formAction] = useFormState(login, {
		error: null,
	});
	return (
		<form action={formAction} className="w-full max-w-xs">
			<Stack spacing={2}>
				{state?.error?.message && (
					<div className="text-red-500">{state?.error?.message}</div>
				)}
				<TextField name="email" label="Email" variant="outlined" type="email" />
				<TextField
					name="password"
					label="Password"
					variant="outlined"
					type="password"
				/>
				<Button type="submit" variant="contained">
					Login
				</Button>
				<Link component={NextLink} href="/signup" className="self-center">
					Signup
				</Link>
			</Stack>
		</form>
	);
};

export default Login;
