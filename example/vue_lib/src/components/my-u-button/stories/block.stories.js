import Component from '../index';

export default {
  id: 'my-u-button-blocks',
  title: '组件列表/MyUButton/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Block1 = {
  name: '主要按钮',
  render: () => ({
    template: `<my-u-button color="primary" text="确 定"></my-u-button>`,
  }),
};

export const Block2 = {
  name: '次要按钮',
  render: () => ({
    template: `<my-u-button text="确 定" color="primary_secondary"></my-u-button>`,
  }),
};

export const Block3 = {
  name: '普通按钮',
  render: () => ({
    template: `<my-u-button text="确 定"></my-u-button>`,
  }),
};

export const Block4 = {
  name: '图标按钮',
  render: () => ({
    template: `<my-u-button color="primary" icon="add" text="创 建"></my-u-button>`,
  }),
};
