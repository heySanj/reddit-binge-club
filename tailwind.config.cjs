/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
    mode: "jit",
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
    },
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
