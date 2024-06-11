import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      main: '#3c63fc',
      secondary: '#000',
      priWhite: '#fff',
      priGrey: '#8D9CAF',
      priLightGrey: '#8898A9',
      priBlue: '#3C63FB',
      priViolet: '#172A4D',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        custom: ' 2px 2px 2px rgba(0, 0, 0, .1)',
      },
      screens: {
        xs: '500px', // Adjust the width as needed
      },
      lineHeight: {
        '0': '0',
      },
    },
  },
  plugins: [],
};
export default config;
