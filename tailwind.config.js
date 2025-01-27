/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "fade-in-out": {
          "0%": { opacity: 0, transform: "translateX(200px)" },
          "20%": { opacity: 1, transform: "translateX(0)" },
          "80%": { opacity: 1, transform: "translateX(0)" },
          "100%": { opacity: 0, transform: "translateX(200px)" },
        },
      },
      animation: {
        "fade-in-out": "fade-in-out 3s ease-in-out",
      },
    },
  },
  plugins: [],
};
