/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			"lh3.googleusercontent.com",
			"res.cloudinary.com",
			"loremflickr.com",
			"picsum.photos",
			"*",
		],
	},
};

export default nextConfig;
