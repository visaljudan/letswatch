/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "0px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        primary: "#000",
        secondary: "#8d99ae",
        text: "#edf2f4",
        aprimary: "#d90429",
        asecondary: "#ef233c",
        shadow: "#3c3c3c",
        success: "#198754",
        warning: "#ffc107",
        danger: "#dc3545",
      },
      fontFamily: {
        custom: ["Architects Daughter", "cursive"],
      },
    },
  },
  variants: {
    extend: {
      textColor: ["group-hover"],
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
