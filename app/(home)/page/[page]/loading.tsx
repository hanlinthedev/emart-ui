import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

type Props = {};

const loading = (props: Props) => {
	return (
		<div className="min-h-screen ">
			<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 ">
				{Array.from({ length: 20 }).map((_, id) => (
					<AspectRatio key={id} ratio={3 / 4} className="relative gap-2">
						<Skeleton className="w-full h-2/3" />
						<Skeleton className="w-full h-1/3" />
					</AspectRatio>
				))}
			</div>
		</div>
	);
};

export default loading;
