/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        IBMPlexMono: ['IBM Plex Mono', 'monospace'],
        PassionOne: ['Passion One', 'sans-serif'],
        Sunrise: ['Waiting for the Sunrise', 'cursive']
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}

