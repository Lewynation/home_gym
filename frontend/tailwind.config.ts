import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    fontFamily: {
      assistant: "var(--assistant)",
      redHat: "var(--red-hat-display)",
      kaushanScript: "var(--kaushan-script)",
    },
    extend: {
      colors: {
        primaryColor: "#9dd02f",
        secondaryColor: "#8c9292",
        tertiaryColor: "#d9fd8b",
      },
    },
  },
};
export default config;
