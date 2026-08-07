/** 토큰 preset 을 소비하는 카탈로그 자체가 preset 의 1차 검증처다. */
module.exports = {
  presets: [require('@careernote/tokens/tailwind-v3-preset')],
  content: ['./index.html', './src/**/*.{ts,tsx}', '../../packages/react/src/**/*.{ts,tsx}'],
  plugins: [require('tailwindcss-animate')],
};
