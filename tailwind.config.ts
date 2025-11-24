import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // colors: {
      //   brand: "var(--brand)",
      //   "brand-dark": "var(--brand-dark)",
      //   title: "var(--title)",
      //   title2: "var(--title2)",
      //   bgButton: "var(--bgButton)",
      //   note: "var(--note)",
      //   index: "var(--index)",
      // },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem", // 16px - thoải mái cho mobile
          sm: "1.5rem", // 24px - tablet
          md: "2rem", // 32px - laptop nhỏ
          lg: "2.5rem", // 40px - desktop
          xl: "3rem", // 48px - màn hình lớn
        },
        screens: {
          sm: "640px", // Small tablets & large phones
          md: "768px", // Tablets & small laptops
          lg: "1024px", // Desktops & medium laptops
          xl: "1280px", // Large desktops
          "2xl": "1536px", // Extra large screens
        },
      },
      fontSize: {
        heading: ["2rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        subheading: ["1.5rem", { lineHeight: "1.3" }],
        "fluid-1": "clamp(1.75rem, 2.5vw + 1rem, 3rem)", // h1-fluid
        "fluid-2": "clamp(1.375rem, 1.5vw + 1rem, 2.125rem)", // h2-fluid
        "title-sm": "clamp(1.25rem, 5vw, 2rem)", // title mobile
        "title-lg": "clamp(1.5rem, 4vw, 2.5rem)", // title desktop
        "subtitle-sm": "clamp(1rem, 3vw, 1.5rem)", // subtitle mobile
        "subtitle-lg": "clamp(1.125rem, 2.5vw, 1.75rem)", // subtitle desktop
        "lead-sm": "clamp(0.875rem, 2vw, 1.125rem)", // lead mobile
        "lead-lg": "clamp(1rem, 2vw, 1.25rem)", // lead desktop
      },
      spacing: {
        spacing: {
          section: {
            sm: "2rem",
            md: "3rem",
            lg: "4rem",
          },
        },
        container: "var(--container)",
      },
      borderRadius: {
        btn: "0.75rem",
        "btn-lg": "1rem",
        input: "0.75rem",
      },
      aspectRatio: {
        hero: "16 / 9",
      },
      boxShadow: {
        "btn-hover": "0 4px 12px rgba(0, 0, 0, 0.15)",
        "input-focus": "0 0 0 2px rgba(42, 88, 255, 0.2)",
      },
    },
  },
  plugins: [typography],
};

export default config;
