import Component from '../index';

export default {
  id: 'my-mention-examples',
  title: '组件列表/MyMention/示例',
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
    data() {
      return {
        // key: value
        mytext: 'Hello World!',
      }
    },
    template: '<div><my-mention v-bind="$props" :text.sync="mytext"></my-mention><div>{{mytext}}</div></div>',
  }),
  
  args: {
    width: '100%',
    height: '200px',
    items: [
      {
        email: "cat@netease.corp.com",
        name: "Mr Cat",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      },
      {
        email: "dog@netease.corp.com",
        name: "Mr Dog",
        avatar: "https://randomuser.me/api/portraits/men/8.jpg",
      },
      {
        email: "bird@netease.corp.com",
        name: "Mr Bird",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      },
    ]
  },
};
