// tailwind.config.js
module.exports = {
  content: ['./sobre-mi.html', './src/**/*.{js,ts,jsx,tsx}'], // Asegúrate de tener bien tus rutas
  theme: {
    extend: {
      backgroundImage: {
        'gradient-animated': 'linear-gradient(46deg,#e19339,#3e3465,#040404)',
      },
      backgroundSize: {
        'xl': '180% 180%',
      },
      animation: {
        'gradient-flow': 'gradient-animation 24s ease infinite',
      },
      keyframes: {
        'gradient-animation': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
}
