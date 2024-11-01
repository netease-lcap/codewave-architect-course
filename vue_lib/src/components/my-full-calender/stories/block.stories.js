import Component from '../index';

export default {
  id: 'my-full-calender-blocks',
  title: '组件列表/MyFullCalender/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    template: '<my-full-calender></my-full-calender>',
  }),
};

export const Example4 = {
  name: '初始事件',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: '<my-full-calender :initialEvents="events"></my-full-calender>',
    data() {
      return {
        events: [
          {
            title: '测试',
            start: new Date(),
            end: new Date(Date.now() + 1000 * 60 * 60),
          },
        ],
      }
    }
  })
};