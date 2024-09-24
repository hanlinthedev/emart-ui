import { getMe } from "./action";

export default async function Home() {
	const me = await getMe();
	console.log(me);
	return <div className="min-h-screen">s</div>;
}
