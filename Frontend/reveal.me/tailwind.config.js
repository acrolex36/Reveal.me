module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      spacing: {
        '128': '32rem', // following the standard of 128 / 4 = 32
        '148': '40rem',
        '188': '47rem',
      }
    },
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
