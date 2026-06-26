/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F5F0EB",
        teal: {
          DEFAULT: "#1BB8BD",
          dark: "#15959A",
          light: "#E8F9FA",
        },
        magenta: {
          DEFAULT: "#DC0078",
          dark: "#B00060",
          light: "#FCE8F3",
        },
        ink: {
          DEFAULT: "#1A1A2E",
          muted: "#4A4A6A",
          light: "#8888AA",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
