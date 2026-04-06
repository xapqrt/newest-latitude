/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary:        '#1f6b2e',
        'primary-dark': '#144820',
        'primary-light':'#2d9142',
        'primary-vivid':'#38b555',
        accent:         '#d4880a',
        'accent-warm':  '#f0a500',
        'accent-brown': '#7a4520',
        'forest-deep':  '#0a1f10',
        'forest-dark':  '#0d2416',
        'forest-mid':   '#0d2e16',
        'bg-light':     '#faf3e8',
        'bg-beige':     '#f2ede3',
        'text-main':    '#1e1c1a',
        'text-muted':   '#5e5850',
        'warm-white':   '#f5f0e8',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif:   ['"Playfair Display"', 'Georgia', 'serif'],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
