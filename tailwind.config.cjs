const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        "off-white": "#FFFCFC",
        "light-gray": "#EFEFEF",
        gray: "#D9D9D9",
        "dark-gray": "#696868",
        "light-green": "#BCDD85",
        "dark-green": "#70C174",
      },
      fontFamily: {
        primary: ["Roboto", "sans-serif"],
        secondary: ["Jaldi", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      phone: { min: "640px", max: "882px" },
      tablet: { min: "882px", max: "1212px" },
      computer: { min: "1212px" },
      ...defaultTheme.screens,
    },
  },
  plugins: [],
};
