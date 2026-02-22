import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cccco: {
          navy: '#003865',
          'navy-light': '#0a5a9e',
          blue: '#0073e6',
          'blue-light': '#3d9aff',
        },
      },
    },
  },
  plugins: [],
}
export default config
