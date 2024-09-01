/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")
const { zSnoutTheme: z } = require("@zsnout/tailwind")
const prose = require("@tailwindcss/typography")

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Carlito", ...defaultTheme.fontFamily.sans],
        serif: ["Crimson Text", ...defaultTheme.fontFamily.serif],
        mono: ["Fira Sans Variable", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [z(), prose()],
}
