import Component from '../index';

export default {
  id: 'my-full-calender-examples',
  title: '组件列表/MyFullCalender/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // Optional argTypes to set on the component
    height: {
      type: 'number',
      control: {
        type: 'number',
        min: 100,
        max: 1000,
        step: 100,
      },
      description: '组件高度',
    },
  },
};

export const Example1 = {
  name: '基本用法',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: '<my-full-calender v-bind="$props"></my-full-calender>',
  }),
  args: {
    // Optional props to set on the component
    height: 600,
  },
};

export const Example = {
  name: '使用插槽定义事件展示方式',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: `
      <my-full-calender :initialEvents="events">
        <template v-slot:eventContent="{ event }">
          <div class="event">
            <div class="event-title">{{ event.title }}</div>
            <div class="event-time">{{ dateFormat(event.start) }} - {{ dateFormat(event.end) }}</div>
          </div>
        </template>
      </my-full-calender>`,
    data() {
      return {
        events: [
          {
            title: '测试事件插槽',
            start: '2024-10-29T13:00:00',
            end: '2024-10-29T14:00:00',
          },
        ],
      }
    },
    methods: {
      dateFormat(date) {
        const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        return hours + ':' + minutes;
      }
    },
  }),
};

export const Example2 = {
  name: '添加事件',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: '<my-full-calender v-bind="$props" @select="addEvent" ref="calender"></my-full-calender>',
    methods: {
      addEvent(e) {
        this.$refs.calender.addEvent({
          title: '测试',
          start: e.start,
          end: e.end,
        });
      },
    },
  })
};

export const Example3 = {
  name: '初始事件数据',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: '<my-full-calender :initialEvents="events" ></my-full-calender>',
    data() {
      return {
        events: [
          {
            title: '测试',
            start: '2024-10-14T08:00:00',
            end: '2024-10-14T09:00:00',
          },
        ],
      }
    }
  }),
};

export const Example4 = {
  name: '点击/删除事件',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: '<my-full-calender :initialEvents="events" @event-click="clickEvent" @event-delete="deleteEvent" ref="calender"></my-full-calender>',
    methods: {
      deleteEvent(e) {
        this.$refs.calender.deleteEvent(e);
      },
      clickEvent(e) {
        alert('点击事件'+e.title)
      },
    },
    data() {
      return {
        events: [
          {
            title: '测试',
            start: '2024-10-14T08:00:00',
            end: '2024-10-14T09:00:00',
          },
        ],
      }
    }
  })
};

export const Example5 = {
  name: '使用数据源',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: '<my-full-calender :dataSource="events"></my-full-calender>',
    data() {
      return {
        events: [
          {
            title: '测试1',
            start: '2024-10-14T08:00:00',
            end: '2024-10-14T09:00:00',
          },
          {
            title: '测试2',
            start: '2024-10-14T10:00:00',
            end: '2024-10-14T11:00:00',
          },
        ]
      }
    },
    mounted () {
      setTimeout(() => {
        this.events.push({
          title: '测试2',
          start: '2024-10-14T09:00:00',
          end: '2024-10-14T10:00:00',
        })
      }, 1000);
    },
  }),
};