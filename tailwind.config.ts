import type { Config } from "tailwindcss";
import * as defaultColors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";

const config = {
	darkMode: ["class"],
	content: [
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@premieroctet/next-admin/dist/**/*.{js,ts,jsx,tsx}",
	],
	prefix: "",
	theme: {
		extend: {
			colors: {
				nextadmin: {
					primary: defaultColors.zinc,
				},
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
		container: {
			center: true,
			padding: {
				DEFAULT: "2rem",
				sm: "3.5rem",
				md: "4rem",
				lg: "4rem",
				xl: "4rem",
				"2xl": "4rem",
			},
		},
		fontFamily: {
			sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
		},
	},
	presets: [require("@premieroctet/next-admin/dist/preset")],
	plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
} satisfies Config;

export default config;
