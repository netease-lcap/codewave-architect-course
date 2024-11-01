/// <reference types="@nasl/types" />
namespace extensions.lib_example.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'element',
    }
  })
  @Component({
    title: '艾特',
    description: '艾特',
  })
  export class AtWho extends ViewComponent {
    constructor(options?: Partial<AtWhoOptions>) {
      super();
    }
  }

  export class AtWhoOptions extends ViewComponentOptions {
    @Prop({
      title: '内容',
      description: '输入框内容',
      group: '主要属性'
    })
    content: nasl.core.String = 'Hello, @me';

    // 成员属性
    @Prop({
      title: '成员',
      description: '搜索成员',
      group: '主要属性'
    })
    members: Array<{avartar: nasl.core.String, name: nasl.core.String}>;

    // 宽度属性
    @Prop({
      title: '宽度',
      description: '宽度',
      group: '样式属性'
    })
    width: nasl.core.String = '100%';

    // 高度属性
    @Prop({
      title: '高度',
      description: '高度',
      group: '样式属性'
    })
    height: nasl.core.String = '100px';
  }
}