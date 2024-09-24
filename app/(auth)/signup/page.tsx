"use client";
import { Alert, Button, Link, Stack, TextField } from "@mui/material";
import NextLink from "next/link";
import { useFormState } from "react-dom";
import { signup } from "../action";

export default function Signup() {
	const [state, formAction] = useFormState(signup, {
		error: {},
	});
	return (
		<form action={formAction} className="w-full max-w-xs">
			<Stack spacing={2}>
			{state?.error?.message &&	<Alert  severity="error">{state?.error?.message}</Alert>}
				<TextField
					name="email"
					label="Email"
					variant="outlined"
					type="email"
					error={!!state.error.email}
					helperText={state?.error?.email}
				/>
				<TextField
					name="name"
					label="Username"
					variant="outlined"
					error={!!state.error.name}
					helperText={state?.error?.name}
				/>
				<TextField
					name="password"
					label="Password"
					variant="outlined"
					type="password"
					error={!!state.error.password}
					helperText={state?.error?.password}
				/>
				<Button type="submit" variant="contained">
					Signup
				</Button>
				<Link component={NextLink} href="/login" className="self-center">
					Login
				</Link>
			</Stack>
		</form>
	);
}
