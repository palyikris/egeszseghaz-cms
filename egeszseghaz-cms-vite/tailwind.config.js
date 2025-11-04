import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#8E715B', light: '#BFA590', dark: '#604A3A' },
        secondary: { DEFAULT: '#4BA6A3', light: '#7FC9C6', dark: '#2B6E6C' },
        accent: '#E6B655',
        background: { light: '#F8F5F1', dark: '#1C1C1C' },
        text: { primary: '#2E2E2E', secondary: '#5C5C5C' },
        border: '#E2DAD1',
        error: '#D35D5D',
        success: '#4BA674',
      },
      borderRadius: { xl: '1rem', '2xl': '1.25rem' },
      boxShadow: { soft: '0 8px 30px rgba(0,0,0,.06)' },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}
