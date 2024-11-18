// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust according to your file structure
  ],
  darkMode: 'class',  // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6', // Light Blue for buttons/active elements
        secondary: '#9333EA', // Purple for highlights
        background: '#1F2937', // Dark background
        textLight: '#E5E7EB', // Light text for contrast
        textDark: '#F3F4F6', // Darker text
        accent: '#10B981', // Green for success messages or active elements
      },
    },
  },
  plugins: [
    require('daisyui'), 
  ],
};
