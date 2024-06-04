import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      colors: {
        yelOne: '#FFF6BD',
        yelTwo: '#FCED88',
        yelThree: '#FDFCB8',
        yelFour: '#F9F6AA',
        yelFive: '#fee231',
        pinkOne: '#F2E9E9',
        beiOne: '#E1DAB9'
      },
      keyframes: {
        vibration: {
          '0%': { transform: 'rotate(1deg)' },
          '100%': { transform: 'rotate(-1deg)' }
        }
      },
      animation: {
        vibration: 'vibration 0.15s infinite'
      }
    }
  },
  plugins: []
};
export default config;
