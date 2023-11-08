import { type Config } from "tailwindcss";
// re-import the following if adding custom fonts for use
// import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  /**
   * @todo tell tailwind to purge unused css when publishing 
   * @example purge: ['./public/index.html']
   * */
  theme: {
    extend: {
      colors: {
        'white': '#ffffff',
        'green-gray': '#202F1D',
        'med-green': '#3B7237',
        'hover-green': '#88AF37',
        'light-green': '#9ac73e',
        'dark-blue': '#2C6191',
        'med-blue': '#50AEC6',
        'hover-blue': '#4292a6',
      },
      fontFamily: {
        // IDK: commented import on main br.
        sans: ['"Raleway"', /* ...fontFamily.sans */],
        tyler: ['"Raleway"', 'sans-serif']
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/typography")
  ]
} satisfies Config;
