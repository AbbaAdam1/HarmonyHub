/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  mode: 'jit',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      gridTemplateColumns: {
        sidebar: "100px auto", // 👈 for sidebar layout. adds grid-cols-sidebar class
      },
      padding: {
        '1/2': '50%',
        '1/3': '33%',
        '1/4': '25%',
        full: '100%',
      },
    },
  },
  plugins: [],
}
