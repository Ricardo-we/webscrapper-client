/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: "jit",
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"./src/components/**/*.{js,jsx,ts,tsx}",
		"./src/pages/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				cemaco: "#90d103",
				epa: "#fedc00",
				novex: "#0263b5",
				money: "#4164b3",
			},
			gridTemplateColumns: {
				"auto-fill": "repeat(auto-fill, minmax(min(100%,8rem), 1fr))",
				"auto-fit": "repeat(auto-fit, minmax(min(100%,8rem), 1fr))",
			},
		},
	},
	plugins: [
		require("@tailwindcss/forms"),
	],
};
