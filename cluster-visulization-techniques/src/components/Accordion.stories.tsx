import { Meta, StoryObj } from '@storybook/react';
import Accordion, { AccordionProps } from './Accordion';

const meta: Meta<AccordionProps> = {
  title: 'Components/Accordion',
  component: Accordion,
  args: {
    title: '(0, 5, 22)',
    children: <p>This is the content inside the accordion.</p>,
    onDelete: () => alert('Delete button clicked!'),
  },
};

export default meta;

type Story = StoryObj<AccordionProps>;

export const Default: Story = {};