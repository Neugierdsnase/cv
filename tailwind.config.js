module.exports = {
  content: ['src/*.{svelte,ts}', 'src/**/*.{svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'richBlack': '#0e1116',
        'cultured': '#f4f4f6',
        'babyBlue': {
          'bright': '#61bbe5',
          'medium': '#84caeb',
          'dark': '#b9e1f4',
        },
      },
    },
  },
  plugins: [],
}
