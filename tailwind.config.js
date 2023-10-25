/** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'active':"#9457EB",
        'primary':"#0A0A0A",
        'secondary':"#141414"
      }
    },
  },
  plugins: [],
}

