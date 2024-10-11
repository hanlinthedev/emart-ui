import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {};

const loading = (props: Props) => {
	return (
		<div className="p-6 grid grid-cols-1 sm:grid-cols-2">
			<div className="p-6">
				<AspectRatio ratio={16 / 9}>
					<Skeleton className="object-cover h-80" />
				</AspectRatio>
			</div>
			<div className="flex flex-col gap-4 p-6">
				<h1 className="text-3xl font-bold">
					<Skeleton className="h-20" />
				</h1>
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-4 justify-start">
						<Skeleton className="h-10" />
						<span className="text-sm text-gray-500">
							<Skeleton className="h-0" />
						</span>
					</div>
					<p className="font-semibold">
						<Skeleton className="h-10" />
					</p>
					<p className="text-gray-500 text-sm italic">
						<Skeleton className="h-10" />
					</p>
					<p className="text-gray-500 text-sm italic">
						<Skeleton className="h-10" />
					</p>
					<p className="text-gray-500 text-sm italic">
						<Skeleton className="h-10" />
					</p>
				</div>
				<Separator />
				<Tabs defaultValue="description" className="w-full">
					<TabsList className="w-full bg-none">
						<TabsTrigger value="description" className="w-full">
							<Skeleton className="h-full" />
						</TabsTrigger>
						<Separator orientation="vertical" className="h-full" />
						<TabsTrigger value="reviews" className="w-full">
							<Skeleton className="h-full" />
						</TabsTrigger>
					</TabsList>
					<TabsContent value="description">
						<div className="py-6">
							<Skeleton className="h-20" />
						</div>
					</TabsContent>
					<TabsContent value="reviews">
						<div className="py-6">
							<Skeleton className="h-20" />
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default loading;
