module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    colors:{
      current: 'currentColor',
      pink: {
        0: '#FFFFFF',
        50: '#FFF5F5', 
        100: '#FFE2E2'},
      'darker-pink': '#CA5E5E',
      gray: {
        0: '#FFFFFF',
        50: '#F9FAFB',
        300: '#D1D5DB'
      }
    },
  },
  plugins: [require("daisyui")],
};
