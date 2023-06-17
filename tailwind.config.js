/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          '100': '#D2F5EA',
          '200': '#A5EBD5',
          '300': '#79E0C0',
          '400': '#4CCEAA',
          '500': '#1CDDAF',
          '600': '#1ACB9F',
          '700': '#18B68F',
          '800': '#159C7E',
          '900': '#12826E',
        },
        'dark': '#1B1B1B'
      }
    },
  },
  plugins: [],
}

