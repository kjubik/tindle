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
        'bg': '#1B1B1B',
        'outline': '#343434',
        'dark': '#868686',
        'light': '#DDDDDD',
        'lighter': '#FFFFFF',
      },
      dropShadow: {
        'basic': '0 2px 4px rgba(28,221,175,0.25)',
        'clickme': '0 2px 4px rgba(255, 255, 255, 0.07)'
      }
    },
  },
  plugins: [],
}

