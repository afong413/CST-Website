/** @type {import('tailwindcss').Config} */
const theme = require("tailwindcss/defaultTheme")
const { zSnoutTheme: z } = require("@zsnout/tailwind")
const prose = require("@tailwindcss/typography")

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Carlito", ...theme.fontFamily.sans],
        serif: ["Crimson Text", ...theme.fontFamily.serif],
        mono: ["Fira Sans Variable", ...theme.fontFamily.mono],
      },
    },
  },
  plugins: [
    z(),
    prose(),
    /** @type {import("tailwindcss/types/config").PluginCreator} */
    ({ addVariant, matchVariant, addComponents, matchComponents }) => {
      matchComponents(
        {
          wx(value) {
            return { width: value, "min-width": value, "max-width": value }
          },
        },
        {
          supportsNegativeValues: true,
          values: {
            ...theme?.maxWidth,
            ...theme?.width,
            ...theme?.spacing,
          },
          type: "relative-size",
        },
      )
      matchComponents(
        {
          hx(value) {
            return { height: value, "min-height": value, "max-height": value }
          },
        },
        {
          supportsNegativeValues: true,
          values: {
            ...theme?.maxHeight,
            ...theme?.height,
            ...theme?.spacing,
          },
        },
      )
    },
  ],
}
