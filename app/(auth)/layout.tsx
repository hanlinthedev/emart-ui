import { Box } from "@mui/material";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<Box className="flex justify-center items-center h-screen">{children}</Box>
	);
}
