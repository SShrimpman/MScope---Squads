/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'tiny': '1px',
      },
      colors: {
        'backgroundHeader': '#152243',
        'highlight': '#086ff4',
        'transparentBg': 'rgba(0,0,0,.4)',
        'darkBlue': '#152243',
        'white2': '#FCFCFD',
        'black2': '#282828',
        'background': '#05062D'
      },
      height: {
        '250': '250px',
        '100': '100%'
      },
      width: {
        'header': '72px',
        '500': '500px',
        '900': '900px',
        '100': '100%'
      },
      borderWidth: {
        '1': '1px',
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
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}

