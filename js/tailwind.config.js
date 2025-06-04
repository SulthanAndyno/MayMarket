// tailwind.config.js
// This file is generally used if you have a build process for Tailwind CSS.
// If you are only using the Tailwind CDN, this file might not be directly used by the browser.
// However, if you plan to build your CSS with Tailwind CLI or PostCSS, this is where you'd configure it.
module.exports = {
  content: [
    "./*.html", // Scan all HTML files in the root
    "./js/**/*.js", // Scan JavaScript files for dynamic classes
    "./_*.html" // Scan HTML partials
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Helvetica Neue', 'Arial', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
      },
      colors: {
        // These colors are primarily defined in css/theme.css using CSS variables.
        // Defining them here is useful if you use Tailwind's utility classes extensively
        // and want them to align with your theme variables.
        'maymart-primary': 'var(--color-primary)',
        'maymart-secondary': 'var(--color-secondary)',
        'maymart-accent': 'var(--color-accent)',
        'maymart-bg-dark': 'var(--color-bg-dark)',
        'maymart-card-dark': 'var(--color-card-dark)',
        'maymart-text-light': 'var(--color-text-light)',
        'maymart-text-subtle': 'var(--color-text-subtle)',
      },
      height: {
        '12.5': '3.125rem', // 50px (example custom height)
        '15': '3.75rem',   // 60px (example custom height)
      },
      // You can extend other Tailwind properties here
    },
  },
  plugins: [
    // Add any Tailwind plugins here
  ],
}