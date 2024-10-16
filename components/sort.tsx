import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
} from "@/components/ui/menubar";
import { ArrowDownUp } from "lucide-react";

const Sort = () => {
	return (
		<Menubar>
			<MenubarMenu>
				<MenubarTrigger className="gap-2">
					Sort
					<ArrowDownUp size={14} />
				</MenubarTrigger>
				<MenubarContent>
					<MenubarSub>
						<MenubarSubTrigger>Price</MenubarSubTrigger>
						<MenubarSubContent>
							<MenubarItem>Asscend</MenubarItem>
							<MenubarItem>Descend</MenubarItem>
						</MenubarSubContent>
					</MenubarSub>
					<MenubarSeparator />
					<MenubarSub>
						<MenubarSubTrigger>Rating</MenubarSubTrigger>
						<MenubarSubContent>
							<MenubarItem>Asscend</MenubarItem>
							<MenubarItem>Descend</MenubarItem>
						</MenubarSubContent>
					</MenubarSub>
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	);
};
export default Sort;
