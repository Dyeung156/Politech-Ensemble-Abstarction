import type { StorybookConfig } from '@storybook/react-vite';

const config = {
  "stories": [
    "../src/**/*.stories.tsx"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  }
} satisfies StorybookConfig;
export default config;