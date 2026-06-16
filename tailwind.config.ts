import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      colors: {
        // Warm editorial palette — single confident accent, no AI-default blues.
        paper: '#faf8f3', // page background (warm off-white)
        surface: '#fffefb', // cards / raised panels
        ink: '#1c1c17', // primary text (warm near-black)
        muted: '#6e6e62', // secondary text (warm gray)
        line: '#e7e3d9', // hairline borders
        sand: '#f1ebdd', // soft warm fill for panels
        accent: {
          DEFAULT: '#1f5b4e', // forest-teal — clinical, credible
          hover: '#17473d',
          soft: '#ecf1ee', // pale tint for highlight panels
        },
      },
      maxWidth: {
        prose: '42rem',
      },
      boxShadow: {
        // Warm-tinted elevation — soft, editorial, never harsh black.
        soft: '0 1px 2px rgba(28,28,23,0.04), 0 4px 16px rgba(28,28,23,0.05)',
        lift: '0 2px 6px rgba(28,28,23,0.05), 0 16px 40px rgba(28,28,23,0.10)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
}

export default config
