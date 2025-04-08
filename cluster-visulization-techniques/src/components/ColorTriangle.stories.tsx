import { Meta, StoryObj } from '@storybook/react';
import ColorTriangle from './ColorTriangle';
import { Provider } from 'react-redux';
import { store } from '../redux';


function ColorTriangleWrapper()
{
  return (
    <Provider store={store}> 
      <ColorTriangle />
    </Provider>
  )

}

const meta: Meta = {
  title: 'Components/ColorTriangle',
  component: ColorTriangleWrapper,
  parameters: {
    layout: 'centered', // Centers the component in the Storybook canvas
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};