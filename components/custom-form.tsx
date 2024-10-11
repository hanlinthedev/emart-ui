import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormMessage } from "./ui/form";

const CustomFormField = ({ form, name, placeholder, error, ...props }: any) => {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormControl>
						<Input placeholder={placeholder} {...field} {...props} />
					</FormControl>

					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default CustomFormField;
