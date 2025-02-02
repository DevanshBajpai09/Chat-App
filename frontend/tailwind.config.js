import daisyui from "daisyui"
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
theme: {
      extend: {
        colors: {
          light: {
            primary: "#f0f0f0",
            secondary: "#d9d9d9",
            accent: "#c4c4c4",
            neutral: "#b0b0b0",
          },
          dark: {
            primary: "#1a1a1a",
            secondary: "#333333",
            accent: "#4d4d4d",
            neutral: "#666666",
          },
        },
      },
    },

  plugins: [
    daisyui,

  ],
  daisyui:{
    themes:[
      "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
    ]
  }
}