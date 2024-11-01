import Component from '../index';

export default {
  id: 'my-gantt-examples',
  title: '组件列表/MyGantt/示例',
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
    props: Object.keys(argTypes),
    template: '<my-gantt v-bind="$props"></my-gantt>',
  }),
  args: {
    data: [
      {
        name: '任务1',
        startTime: '2024-01-01',
        endTime: '2024-01-10'
      },
      {
        name: '任务2',
        startTime: '2024-01-05',
        endTime: '2024-01-15'
      }
    ]
  },
};
