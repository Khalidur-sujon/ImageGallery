/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			screens: {
				screens: {
					sm: "500px", // min-width: 500px
					md: "960px", // min-width: 960px
					lg: "1440px", // min-width:1440px
				},
			},
		},
	},
	plugins: [],
};
