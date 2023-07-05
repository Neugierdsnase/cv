module.exports = {
  content: ['src/*.{svelte,ts}', 'src/**/*.{svelte,ts}'],
  daisyui: {
    themes: [
      {
        customTheme: {
          primary: '#3c9190',
          secondary: '#e3ab5e',
          accent: '#d9693a',
          neutral: '#6b4b39',
          'base-100': '#191b26',
          info: '#3c9190',
          success: '#22c55e',
          warning: '#ea580c',
          error: '#991b1b',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
}
