import type { Config } from "tailwindcss";
import * as defaultColors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";
import tailwindTypography from '@tailwindcss/typography';
import tailwindAnimate from 'tailwindcss-animate';
import daisyui from 'daisyui';
import nextAdminPreset from '@premieroctet/next-admin/dist/preset';

const config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./node_modules/@premieroctet/next-admin/dist/**/*.{js,ts,jsx,tsx}"],
  prefix: "",
  theme: {
    extend: {
      container: {
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      colors: {
        nextadmin: {
          primary: defaultColors.zinc,
        },
      },
      fontFamily: {
        display: ["var(--font-inter-tight)", "var(--font-inter)", ...defaultTheme.fontFamily.sans],
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  presets: [nextAdminPreset],
  plugins: [tailwindTypography, tailwindAnimate, daisyui],
  daisyui: {
    themes: [
      {
        shipzen: {
          primary: defaultColors.indigo["700"],
          "primary-content": defaultColors.indigo["50"],
          secondary: defaultColors.purple["700"],
          "secondary-content": defaultColors.purple["50"],
          accent: defaultColors.pink["700"],
          "accent-content": defaultColors.pink["50"],
          info: defaultColors.blue["700"],
          "info-content": defaultColors.blue["50"],
          success: defaultColors.green["700"],
          "success-content": defaultColors.green["50"],
          warning: defaultColors.yellow["700"],
          "warning-content": defaultColors.yellow["50"],
          error: defaultColors.red["700"],
          "error-content": defaultColors.red["50"],
          neutral: defaultColors.neutral["950"],
          "neutral-content": defaultColors.neutral["50"],
          "base-100": defaultColors.white,
          "base-200": defaultColors.neutral["100"],
          "base-300": defaultColors.neutral["200"],
          "base-content": defaultColors.neutral["950"],
        },
      },
    ],
    logs: false,
  },
} satisfies Config;

export default config;
