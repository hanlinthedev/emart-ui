import { redirect } from "next/navigation";

const page = () => {
	redirect("/page/1");
	return null;
};

export default page;
