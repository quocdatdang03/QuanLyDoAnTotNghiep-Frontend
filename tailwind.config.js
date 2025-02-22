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

        "show-time-detail": {
          "0%": { opacity: 0, transform: "translateY(100%)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-out": "fade-in-out 3s ease-in-out",
        "show-time-detail": "show-time-detail 1s ease-in-out",
      },
    },
  },
  plugins: [],
};
