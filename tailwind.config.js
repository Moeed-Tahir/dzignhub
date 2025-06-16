/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        fontFamily: {
          'general-sans': ['General Sans', 'sans-serif'],
        },
        colors: {
            'custom-green': '#BDFF00',
            'custom-purple': '#C209C1',
            'custom-blue': '#1B1F3B',
            'custom-grey': '#F7F8F8',
        },
      },
    },
    plugins: [],
  }