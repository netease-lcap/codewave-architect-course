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
    title: '甘特图',
    description: '甘特图',
  })
  export class MyGantt extends ViewComponent {
    constructor(options?: Partial<MyGanttOptions>) {
      super();
    }
  }

  export class MyGanttOptions extends ViewComponentOptions {
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