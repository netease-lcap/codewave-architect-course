/// <reference types="@nasl/types" />
namespace extensions.lib_example.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'container',
      structured: true
    }
  })
  @Component({
    title: '菜单',
    description: '菜单',
  })
  export class MyMenu extends ViewComponent {
    constructor(options?: Partial<MyMenuOptions>) {
      super();
    }
  }

  export class MyMenuOptions extends ViewComponentOptions {
    @Prop({
      title: '内容',
      description: '显示文本',
      setter: {
        concept: 'InputSetter'
      }
    })
    text: nasl.core.String = '';

    @Slot({
      title: '默认插槽',
      description: '默认插槽',
      snippets: [ // ide 编辑 “+” 点击后的提示，  title提示描述， code 点击后默认添加代码
        {
          title: '子菜单',
          code: `<my-submenu>
            <template slot="title"><u-text>导航一</u-text></template>
            <my-menu-item><u-text>菜单项</u-text></my-menu-item>
          </my-submenu>`,
        },
        { 
          title: '菜单项', 
          code: '<my-menu-item><u-text>菜单项</u-text></my-menu-item>' 
        },
      ],
    })
    slotDefault: () => Array<nasl.ui.ViewComponent>
  }


  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'container',
      structured: true
    }
  })
  @Component({
    title: '子菜单',
    description: '子菜单可以包含菜单项或其他子菜单',
  })
  export class MySubmenu extends ViewComponent {
    constructor(options?: Partial<MySubmenuOptions>) {
      super();
    }
  }

  export class MySubmenuOptions extends ViewComponentOptions {
    @Slot({
      title: '标题',
      description: '子菜单的标题',
      snippets: [
        {
          title: '标题',
          code: '<template #title><i class="el-icon-location"></i><span>导航一</span></template>',
        },
      ],
    })
    slotTitle: () => Array<nasl.ui.ViewComponent>

    @Slot({
      title: '内容',
      description: '子菜单的内容',
      snippets: [
        {
          title: '菜单项',
          code: '<my-menu-item>选项1</my-menu-item>',
        },
      ],
    })
    slotDefault: () => Array<nasl.ui.ViewComponent>
  }

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'container',
    }
  })
  @Component({
    title: '菜单项',
    description: '菜单项可以包含文本、图标或其他元素',
  })
  export class MyMenuItem extends ViewComponent {
    constructor(options?: Partial<MyMenuItemOptions>) {
      super();
    }
  }

  export class MyMenuItemOptions extends ViewComponentOptions {
    @Slot({
      title: '内容',
      description: '子菜单的内容',
    })
    slotDefault: () => Array<nasl.ui.ViewComponent>
  }
}