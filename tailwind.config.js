/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maritime: {
          dark: '#0B202B',
          navy: '#102D3A',
          deep: '#0E2631',
          surface: '#153A4B',
          border: '#1F475B',
          card: '#123342',
        },
        sustainability: {
          green: '#2F8F68',
          hover: '#267957',
          light: '#EAF7EE',
          subtle: '#F0F9F3',
          border: '#A7DCBF',
        },
        mint: {
          soft: '#DFF2E5',
          pale: '#EEF8F1',
          accent: '#AEE1C2',
          border: '#C4E9D0',
        },
        ocean: {
          blue: '#E2EFF8',
          subtle: '#F0F7FC',
          accent: '#B0D5EE',
          border: '#C9E2F3',
        },
        warm: {
          white: '#FAFBF8',
          subtle: '#F4F6F2',
        },
        slate: {
          text: '#52616A',
          dark: '#2A3B44',
          muted: '#71828D',
          light: '#94A3B8',
          subtle: '#E2E8F0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(16, 45, 58, 0.04), 0 1px 3px rgba(16, 45, 58, 0.06)',
        'card': '0 4px 20px rgba(16, 45, 58, 0.06), 0 1px 4px rgba(16, 45, 58, 0.04)',
        'elevated': '0 12px 36px rgba(16, 45, 58, 0.09), 0 4px 12px rgba(16, 45, 58, 0.05)',
        'glow-green': '0 0 25px rgba(47, 143, 104, 0.25)',
      },
    },
  },
  plugins: [],
}
