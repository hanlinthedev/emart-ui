import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { MixerVerticalIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

const Filter = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="secondary" className="gap-2 w-full sm:w-24">
					<span>Filter</span> <MixerVerticalIcon />
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Are you absolutely sure?</SheetTitle>
					<SheetDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
};

export default Filter;
