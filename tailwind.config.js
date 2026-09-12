/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#092E96',
          hover: '#061F69',
          light: '#EEF4FF',
          subtle: '#F6F9FF',
          50: '#F0F5FF',
          100: '#E0EBFF',
          200: '#BAD0FF',
          300: '#8EB2FF',
          400: '#5487FF',
          500: '#215EFF',
          600: '#0B36B3',
          700: '#092E96',
          800: '#061F69',
          900: '#041547',
          950: '#020C2B',
        },
        navy: {
          800: '#0a192f',
          900: '#061838',
          950: '#030d21',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 2px 4px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(9, 46, 150, 0.05)',
        'soft': '0 8px 24px -4px rgba(9, 46, 150, 0.09), 0 4px 10px -2px rgba(15, 23, 42, 0.05)',
        'soft-lg': '0 20px 40px -8px rgba(9, 46, 150, 0.14), 0 8px 16px -4px rgba(15, 23, 42, 0.06)',
        'elevated': '0 12px 32px -4px rgba(9, 46, 150, 0.12), 0 4px 12px -2px rgba(15, 23, 42, 0.06)',
      }
    },
  },
  plugins: [],
}
