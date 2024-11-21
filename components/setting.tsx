"use client";
import { logOut } from "@/app/action";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CurrentUser } from "@/lib/type";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Setting = ({ auth }: { auth: CurrentUser }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarImage src="https://github.com/shadcn.png" />
					<AvatarFallback>{auth?.name?.slice(0, 2)}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator /> */}
				<DropdownMenuItem asChild>
					<Link href="/order">Order</Link>
				</DropdownMenuItem>

				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => logOut()}>Log Out</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default Setting;
