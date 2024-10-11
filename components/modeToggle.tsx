"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle({ rounded }: { rounded: boolean }) {
	const { setTheme, theme } = useTheme();

	return (
		<Button
			variant="outline"
			size="icon"
			className={rounded ? "rounded-full" : ""}
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
		>
			{theme === "dark" ? (
				<SunIcon className="h-[1.2rem]   w-[1.2rem]  rotate-90  active:rotate-0 transition-all  " />
			) : (
				<MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-0  active:rotate-90 transition-all " />
			)}
		</Button>
	);
}
