import Component from '../index';
import ExampleDemo1 from '../demo/examples/Example1.vue'

export default {
  id: 'my-menu-examples',
  title: '组件列表/MyMenu/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

export const Example1 = {
  name: '基本用法',
  render: (args, { argTypes }) => ({
    components: { demo:ExampleDemo1 },
    props: Object.keys(argTypes),
    template: `<demo />`,
  }),
};
