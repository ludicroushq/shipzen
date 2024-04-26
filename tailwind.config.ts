import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";
import * as defaultColors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@premieroctet/next-admin/dist/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        nextadmin: {
          primary: defaultColors.zinc,
        },
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
  darkMode: "class",
  presets: [require("@premieroctet/next-admin/dist/preset")],
  plugins: [nextui(), require("@tailwindcss/typography")],
};

export default config;
