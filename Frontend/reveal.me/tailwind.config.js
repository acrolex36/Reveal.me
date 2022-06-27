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
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB'
      },
      'black': '#000000',
    },
  },
  plugins: [require("daisyui")],
};
