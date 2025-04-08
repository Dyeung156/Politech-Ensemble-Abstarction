import { Preview } from '@storybook/react';
import '../src/index.css'; // Import your global styles

const preview= {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
} satisfies Preview;
export default preview;