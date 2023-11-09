import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins, sans-serif",
      },
      colors: {
        darkBlue: {
          100: "#182640",
          200: "#304B7F",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;
