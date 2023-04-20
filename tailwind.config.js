/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lightBlue': '#9fd1ff',
        'background': '#05062D'
      },
      height: {
        '250': '250px',
        '100': '100%'
      },
      width: {
        '500': '500px',
        '900': '900px',
        '100': '100%'
      },
      borderRadius: {
        'outside': '20px',
        'inside': '17px'
      },
      boxShadow: {
        'box': 'rgba(151, 65, 252, 0.2) 0 15px 30px -5px'
      },
      backgroundImage: {
        'card': 'linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB)'
      },
      zIndex: {
        '1': '1',
      }
    }
  },
  plugins: [],
}

