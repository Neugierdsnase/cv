module.exports = {
  content: ['src/*.{svelte,ts}', 'src/**/*.{svelte,ts}'],
  theme: {
    extend: {
      colors: {
        black: { rich: '#0e1116', dark: '#28303e' },
        cultured: '#f4f4f6',
        babyBlue: {
          400: '#19749F',
          300: '#61bbe5',
          200: '#84caeb',
          100: '#b9e1f4',
        },
      },
      fontFamily: {
        display:
          '"Passion One", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      },
      keyframes: {
        gradientAnimation: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 0%' },
        },
      },
    },
  },
  plugins: [],
}
