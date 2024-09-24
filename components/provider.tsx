"use client";

import darkTheme from "@/app/dark.theme";
import { AuthContext } from "@/context/auth-context";
import { ThemeProvider } from "@emotion/react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ReactNode } from "react";

export default function Provider({
	children,
	authentication,
}: {
	children: ReactNode[];
	authentication: any;
}) {
	return (
		<AppRouterCacheProvider>
			<ThemeProvider theme={darkTheme}>
				<AuthContext.Provider value={authentication}>
					{children}
				</AuthContext.Provider>
			</ThemeProvider>
		</AppRouterCacheProvider>
	);
}
