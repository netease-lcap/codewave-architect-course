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
    title: '提及',
    description: '提及',
  })
  export class MyMention extends ViewComponent {
    constructor(options?: Partial<MyMentionOptions>) {
      super();
    }
  }

  export class MyMentionOptions extends ViewComponentOptions {
    // 内容属性
    @Prop({
      title: '内容',
      description: '输入框内容',
      group: '主要属性',
      sync: true, // 开启值同步
    })
    text: nasl.core.String = 'Hello, World';

    // 成员属性
    @Prop({
      title: '成员',
      description: '搜索成员',
      group: '主要属性'
    })
    items: Array<{avartar: nasl.core.String, name: nasl.core.String, email: nasl.core.String}>;

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

    // 搜索事件
    @Event({
      title: '搜索',
      description: '搜索事件'
    })
    onSearch: (keyword: nasl.core.String) => void;
  }
}