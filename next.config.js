/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ["gt.epaenlinea.com", "www.cemaco.com", "www.novex.com.gt"],
	},
};

module.exports = nextConfig;
