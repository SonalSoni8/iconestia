import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f5f7fb',
          100: '#e8edf7',
          200: '#c6d3ea',
          300: '#9db3d8',
          400: '#7492c4',
          500: '#5579ae',
          600: '#3f5e89',
          700: '#2d4464',
          800: '#1d2c40',
          900: '#101827',
        },
      },
      boxShadow: {
        glow: '0 20px 60px rgba(20, 34, 64, 0.2)',
      },
      backgroundImage: {
        noise:
          "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22 viewBox=%220 0 120 120%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23dce6f6%22 fill-opacity=%220.22%22%3E%3Ccircle cx=%223%22 cy=%223%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
      },
    },
  },
  plugins: [],
};

export default config;
