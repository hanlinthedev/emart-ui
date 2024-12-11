import { Button } from "@/components/ui/button";
import { CurrentUser } from "@/lib/type";
import Link from "next/link";
import CartComponent from "./CartComponent";
import { ModeToggle } from "./modeToggle";
import Setting from "./setting";

const Header = ({ auth }: { auth: CurrentUser }) => {
	return (
		<nav className=" py-3 w-full flex justify-between items-center px-2 sm:px-4">
			<div>
				<h1 className="text-4xl italic">
					<Link href="/">eMart</Link>
				</h1>
			</div>
			<div className="flex items-center gap-2">
				<ModeToggle rounded={auth?.id ? true : false} />
				{auth.id ? (
					<div className="flex items-center gap-2">
						<CartComponent cartItemsCount={auth.cartCount} />
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
