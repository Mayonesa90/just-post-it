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
        'hardShadow': '10px 10px 5px 0px rgba(0, 0, 0, 0.75)',
      }
    },
  },
  plugins: [],
}

