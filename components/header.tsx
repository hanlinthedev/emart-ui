import { Button } from "@/components/ui/button";
import { CurrentUser } from "@/lib/type";
import { BackpackIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { ModeToggle } from "./modeToggle";
import Setting from "./setting";

const Header = ({ auth }: { auth: CurrentUser }) => {
	return (
		<nav className=" py-2 w-full flex justify-between items-center px-2 sm:px-4">
			<div>
				<h1 className="text-4xl italic">eMart</h1>
			</div>
			<div className="flex items-center gap-2">
				<ModeToggle rounded={auth?.id ? true : false} />
				{auth.id ? (
					<div className="flex items-center gap-2">
						<Button variant="outline" size={"icon"} className="rounded-full ">
							<BackpackIcon className="h-[1.2rem]   w-[1.2rem]  " />
						</Button>
						<Setting auth={auth} />
					</div>
				) : (
					<div className="flex gap-2">
						<Button asChild variant="outline">
							<Link href={`/login`}>Log In</Link>
						</Button>
						<Button asChild>
							<Link href="/signup">Register</Link>
						</Button>
					</div>
				)}
			</div>
		</nav>
	);
};
export default Header;
