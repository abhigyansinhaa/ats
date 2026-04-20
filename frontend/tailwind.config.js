/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        surface: '#050508',
        panel: '#0c0c10',
        raised: '#13131a',
        border: '#27272f',
        'border-subtle': '#1a1a22',
        muted: '#71717a',
        fg: '#fafafa',
        'fg-muted': '#a1a1aa',
        accent: '#ffffff',
        'accent-fg': '#0a0a0c',
        /* Cyan accent for links / highlights (EvalX-adjacent) */
        brand: {
          50: '#ecfeff',
          100: '#cffafe',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          900: '#164e63',
        },
      },
      boxShadow: {
        glow: '0 0 100px -30px rgba(34, 211, 238, 0.12)',
        panel: '0 1px 0 0 rgba(255, 255, 255, 0.06) inset',
      },
    },
  },
  plugins: [],
}
