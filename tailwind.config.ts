import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins, sans-serif",
      },
      colors: {
        darkBlue: "#182640",
      },
    },
  },
  plugins: [],
} satisfies Config;
