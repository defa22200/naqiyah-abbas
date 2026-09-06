/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#FBF6EF',
          soft: '#FDFBF7',
          dark: '#F4EDE1',
          shadow: '#EFE5D5',
        },
        rose: {
          dust: '#E8C4C0',
          'dust-light': '#F5E5E3',
          'dust-dark': '#C99E99',
        },
        terracotta: {
          DEFAULT: '#C98A73',
          muted: '#C98A73',
          soft: '#DFAB9A',
          dark: '#A56853',
        },
        sage: {
          DEFAULT: '#A8B79A',
          light: '#C5D2BA',
          mist: '#EBF0E7',
          deep: '#859676',
        },
        poolside: {
          DEFAULT: '#E2EEED',
          deep: '#B8D5D2',
        },
        ink: {
          plum: '#3A2C33',
          deep: '#271D22',
          light: '#53424B',
          soft: '#745E6A',
        },
        gold: {
          hairline: '#C9A66B',
          bright: '#DFC085',
          pale: '#F0E4CE',
          burnished: '#B88B4A',
          rich: '#A07432',
        },
        warm: {
          espresso: '#433226',
          bronze: '#7A583A',
          umber: '#5C4331',
          cream: '#FBF7F0',
          dark: '#2E2219',
        },
        floral: {
          sage: '#687B60',
          olive: '#7A8C70',
          blush: '#E5BFB5',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Fraunces', 'serif'],
        display: ['Cormorant Garamond', 'serif'],
        calligraphy: ['"Pinyon Script"', '"Alex Brush"', '"Great Vibes"', 'cursive'],
        script: ['"Alex Brush"', '"Pinyon Script"', 'cursive'],
        body: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        arabic: ['Amiri', 'Noto Naskh Arabic', 'serif'],
      },
      boxShadow: {
        'soft-float': '0 20px 40px -15px rgba(58, 44, 51, 0.07)',
        'card-glow': '0 10px 30px -5px rgba(201, 166, 107, 0.12)',
        'reception-glow': '0 15px 45px -10px rgba(201, 166, 107, 0.25)',
      }
    },
  },
  plugins: [],
}
