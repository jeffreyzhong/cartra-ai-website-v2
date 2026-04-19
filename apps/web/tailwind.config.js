import dsPreset from '@repo/ui/tailwind-preset';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [dsPreset],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
};
