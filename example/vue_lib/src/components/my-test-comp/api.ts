/// <reference types="@nasl/types" />
namespace extensions.lib_example.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'pc',
    ideusage: {
      idetype: 'element',
    }
  })
  @Component({
    title: '测试组件',
    description: '测试组件',
  })
  export class MyTestComp extends ViewComponent {
    constructor(options?: Partial<MyTestCompOptions>) {
      super();
    }
  }

  export class MyTestCompOptions extends ViewComponentOptions {
     @Prop({
      title: '内容',
      description: '显示文本',
      setter: {
        concept: 'InputSetter'
      }
    })
    text: nasl.core.String = '';
  }
}