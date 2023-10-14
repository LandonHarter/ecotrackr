import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {},
  plugins: [nextui({
    prefix: 'nextui',
    addCommonColors: false,
    defaultExtendTheme: 'light',
    defaultTheme: 'light',
    layout: {},
    themes: {
      light: {
        colors: {
          primary: {
            50: '#eaf4ef',
            100: '#d6eadf',
            200: '#add5c1',
            300: '#83c0a3',
            400: '#54ab85',
            500: '#059669',
            600: '#036e4c',
            700: '#014931',
            800: '#002618',
            900: '#000804',
            DEFAULT: '#059669',
            foreground: '#fff',
          },
          background: {
            DEFAULT: '#fcfcfc'
          }
        },
        layout: {}
      },
    },
  })],
}
