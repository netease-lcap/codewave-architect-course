/// <reference types="@nasl/types" />
/// <reference types="@nasl/types" />
/// <reference types="@nasl/types" />
/// <reference types="@nasl/types" />
declare namespace nasl.ui {
  export class EWatermark extends ViewComponent {
    constructor(options?: Partial<EWatermarkOptions>);
  }
  export class EWatermarkOptions extends ViewComponentOptions {
    private image;
    /**
     * 文本
     * 水印文本显示内容
     */
    text: nasl.core.String;
    /**
     * 不透明度
     * 0-1之间的小数，0代表完全透明，1代表完全不透明
     */
    opacity: nasl.core.Decimal;
  }
}
declare namespace nasl.ui {
  export class IIco extends ViewComponent {
    constructor(options?: Partial<IIcoOptions>);
  }
  export class IIcoOptions extends ViewComponentOptions {
    /**
     * 图标
     */
    name: nasl.core.String;
    /**
     * 图标布局
     * 图标和文本的布局方式
     */
    icotype: 'only' | 'top' | 'left';
    /**
     * 链接类型
     */
    linkType: 'destination' | 'download';
    /**
     * 链接地址
     */
    hrefAndTo: nasl.core.String;
    /**
     * 链接打开方式
     * 链接跳转的打开方式，父级窗口和顶级窗口仅适用于iframe组件嵌套的情况，若不存在嵌套，则其打开方式同当前窗口。
     */
    target: '_blank' | '_self' | '_parent' | '_top';
    /**
     * 点击后
     * 点击此项时触发
     */
    onClick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 双击
     * 双击此项时触发
     */
    onDblclick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 右键点击
     * 右键点击此项时触发
     */
    onRightclick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标移入
     * 鼠标移入此项时触发
     */
    onOver: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标移出
     * 鼠标移出此项时触发
     */
    onOut: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标按下
     * 鼠标按下此项时触发
     */
    onDown: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 默认
     * 插入文本或 HTML。
     */
    slotDefault: () => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class UAbsoluteLayout extends ViewComponent {
    constructor(options?: Partial<UAbsoluteLayoutOptions>);
  }
  export class UAbsoluteLayoutOptions extends ViewComponentOptions {
    /**
     * 点击
     * 在元素上按下并释放任意鼠标按钮时触发。
     */
    onClick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 双击
     * 在元素上双击鼠标按钮时触发。
     */
    onDblclick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 右键点击
     * 在右键菜单显示前触发。
     */
    onContextmenu: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标按下
     * 在元素上按下任意鼠标按钮时触发。
     */
    onMousedown: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标释放
     * 在元素上释放任意鼠标按钮时触发。
     */
    onMouseup: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标移入
     * 鼠标移入元素时触发。
     */
    onMouseenter: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标移出
     * 鼠标移出元素时触发。
     */
    onMouseleave: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 内容
     */
    slotDefault: () => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class UAlert extends ViewComponent {
    constructor(options?: Partial<UAlertOptions>);
  }
  export class UAlertOptions extends ViewComponentOptions {
    private title;
    private desc;
    /**
     * 公告类型
     */
    type: 'info' | 'success' | 'warning' | 'error';
    /**
     * 显示图标
     */
    showIcon: nasl.core.Boolean;
    /**
     * 对其方式
     * 选择对齐方式
     */
    horizontal: 'left' | 'center';
    /**
     * 手动关闭
     * 是否可手动关闭公告
     */
    closeable: nasl.core.Boolean;
    /**
     * 显示边框
     */
    bordered: nasl.core.Boolean;
    /**
     * 关闭时
     * 关闭时触发
     */
    onClose: (event: any) => any;
    /**
     * 默认
     * 辅助文本
     */
    slotDefault: () => Array<ViewComponent>;
    /**
     * 标题
     */
    slotTitle: () => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class UAnchor extends ViewComponent {
    constructor(options?: Partial<UAnchorOptions>);
  }
  export class UAnchorOptions extends ViewComponentOptions {
    /**
     * 标识
     * 锚点的唯一标识，用于跳转链接，如“/page#linkname”
     */
    label: nasl.core.String;
    /**
     * 默认
     * 内容
     */
    slotDefault: () => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class UBadge extends ViewComponent {
    /**
     * 值
     */
    value: UBadgeOptions['value'];
    constructor(options?: Partial<UBadgeOptions>);
  }
  export class UBadgeOptions extends ViewComponentOptions {
    private dot;
    /**
     * 值
     * 用于标识的值
     */
    value: nasl.core.Integer | nasl.core.String;
    /**
     * 最大值
     * 最大值，超过最大值会显示为“最大值+”的形式，当最大值是数字类型时生效
     */
    max: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 角标在右上角
     * 开启时提醒角标位置显示在右上角，关闭时提醒角标显示在组件右侧。
     */
    corner: nasl.core.Boolean;
    /**
     * 插入需要附加徽章的元素。
     */
    slotDefault: () => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class UButton extends ViewComponent {
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    constructor(options?: Partial<UButtonOptions>);
  }
  export class UButtonOptions extends ViewComponentOptions {
    private to;
    private replace;
    private append;
    /**
     * 文本
     * 显示文本内容
     */
    text: nasl.core.String;
    /**
     * 样式类型
     * 设置主题颜色和按钮样式类型
     */
    color: 'primary' | 'primary_secondary' | 'default' | 'danger' | 'danger_secondary';
    /**
     * 展示方式
     * 行内展示，或块级换行展示
     */
    display: 'inline' | 'block';
    /**
     * 图标
     */
    icon: nasl.core.String;
    /**
     * 图标位置
     * 设置图标居左或居右显示
     */
    iconPosition: 'left' | 'right';
    /**
     * 链接类型
     */
    linkType: 'destination' | 'download';
    /**
     * 链接地址
     */
    hrefAndTo: nasl.core.String;
    /**
     * 链接打开方式
     * 链接跳转的打开方式，父级窗口和顶级窗口仅适用于iframe组件嵌套的情况，若不存在嵌套，则其打开方式同当前窗口。
     */
    target: '_blank' | '_self' | '_parent' | '_top';
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    private loading;
    /**
     * 显示虚线边框
     * 设置是否显示虚线边框
     */
    dashed: nasl.core.Boolean;
    /**
     * 尺寸
     * 设置按钮大小
     */
    size: 'huge' | 'large' | 'medium' | 'normal' | 'small' | 'mini';
    /**
     * 形状
     * 设置按钮形状
     */
    shape: 'default' | 'square' | 'round' | 'circle';
    /**
     * 点击
     * 在元素上按下并释放任意鼠标按钮时触发。
     */
    onClick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 双击
     * 在元素上双击鼠标按钮时触发。
     */
    onDblclick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 右键点击
     * 在右键菜单显示前触发。
     */
    onContextmenu: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标按下
     * 在元素上按下任意鼠标按钮时触发。
     */
    onMousedown: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标释放
     * 在元素上释放任意鼠标按钮时触发。
     */
    onMouseup: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标移入
     * 鼠标移入元素时触发。
     */
    onMouseenter: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标移出
     * 鼠标移出元素时触发。
     */
    onMouseleave: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 获得焦点
     * 获得焦点时触发。
     */
    onFocus: (event: {
      cancelBubble: nasl.core.Boolean;
      detail: nasl.core.String;
      layerX: nasl.core.Integer;
      layerY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 失去焦点
     * 失去焦点时触发。
     */
    onBlur: (event: {
      cancelBubble: nasl.core.Boolean;
      detail: nasl.core.String;
      layerX: nasl.core.Integer;
      layerY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 切换路由前
     * 使用 router 相关属性切换路由前触发
     */
    onBeforeNavigate: (event: {
      to: nasl.core.String;
      replace: nasl.core.Boolean;
      append: nasl.core.Boolean;
    }) => any;
    /**
     * 切换路由后
     * 使用 router 相关属性切换路由后触发
     */
    onNavigate: (event: {
      to: nasl.core.String;
      replace: nasl.core.Boolean;
      append: nasl.core.Boolean;
    }) => any;
  }
}
declare namespace nasl.ui {
  export class UCalendarView<T, M extends nasl.core.Boolean> extends ViewComponent {
    /**
     * 数据源
     */
    data: nasl.collection.List<T>;
    /**
     * 日历选择值
     */
    value: UCalendarViewOptions<T, M>['value'];
    /**
     * 重新加载
     */
    reload(): void;
    constructor(options?: Partial<UCalendarViewOptions<T, M>>);
  }
  export class UCalendarViewOptions<T, M extends nasl.core.Boolean> extends ViewComponentOptions {
    /**
     * 数据源
     * 展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑
     */
    dataSource: nasl.collection.List<T> | {
      list: nasl.collection.List<T>;
      total: nasl.core.Integer;
    };
    /**
     * 数据类型
     * 数据源返回的数据结构的类型，自动识别类型进行展示说明
     */
    dataSchema: T;
    /**
     * 开始时间字段
     * 数据内表示开始时间的字段
     */
    startKey: (item: T) => any;
    /**
     * 结束时间字段
     * 数据内表示结束时间的字段
     */
    endKey: (item: T) => any;
    /**
     * 选中值
     * 当前选中的日期
     */
    value: M extends true ? nasl.collection.List<nasl.core.Date> : nasl.core.Date;
    /**
     * 最小日期值
     * 最小可选的日期值，默认为10年前，日期填写格式为“yyyy-mm-dd”
     */
    minDate: nasl.core.Date | nasl.core.String;
    /**
     * 最大日期值
     * 最大可选的日期值，默认为9年后，日期填写格式为“yyyy-mm-dd”
     */
    maxDate: nasl.core.Date | nasl.core.String;
    /**
     * 展示周天
     */
    showWeekDays: nasl.core.Boolean;
    /**
     * 展示周数
     */
    showWeeks: nasl.core.Boolean;
    /**
     * 展示基础配置
     * 是否展示顶部左侧的 "<" "今天" ">" 等基础配置功能
     */
    showBasic: nasl.core.Boolean;
    /**
     * 展示高级配置
     * 是否展示顶部右侧的年份、月份选项高级配置
     */
    showAdvance: nasl.core.Boolean;
    /**
     * 首列星期
     * 填写数字1~7，分别表示周一~周日
     */
    firstDayOfWeek: nasl.core.Integer;
    /**
     * 可多选
     * 开启可多选后，可通过ctrl/command+鼠标多选
     */
    multiple: M;
    /**
     * 选择后
     * 选择某一个日期时触发
     */
    onSelect: (event: {
      date: nasl.core.Integer;
      timestamp: nasl.core.Integer;
      value: nasl.core.String | nasl.core.Date;
      oldValue: nasl.core.String | nasl.core.Date;
      week: nasl.core.Integer;
    }) => any;
    /**
     * 改变后
     * 日期改变时触发
     */
    onChange: (event: {
      date: nasl.core.Integer;
      timestamp: nasl.core.Integer;
      week: nasl.core.Integer;
    }) => any;
    /**
     * 加载前
     * 加载前触发
     */
    onBeforeLoad: (event: any) => any;
    /**
     * 加载后
     * 加载后触发
     */
    onLoad: (event: any) => any;
    /**
     * 年改变后
     * 年份改变后触发
     */
    onChangeYear: (event: nasl.core.String) => any;
    /**
     * 月改变后
     * 月份改变后触发
     */
    onChangeMonth: (event: nasl.core.String) => any;
    /**
     * 点击日期
     * 点击日历表中的日期触发
     */
    onClickCell: (event: {
      date: nasl.core.Integer;
      timestamp: nasl.core.Integer;
      value: nasl.core.String | nasl.core.Date;
      oldValue: nasl.core.String | nasl.core.Date;
      week: nasl.core.Integer;
    }) => any;
    /**
     * 插入文本或 HTML 至日期组件底部
     */
    slotDefault: (current: Current<T>) => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class UCapsules<M extends nasl.core.Boolean> extends ViewComponent {
    /**
     * 值
     */
    value: UCapsulesOptions<M>['value'];
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    /**
     * 只读
     */
    readonly: nasl.core.Boolean;
    /**
     * 预览
     */
    preview: nasl.core.Boolean;
    constructor(options?: Partial<UCapsulesOptions<M>>);
  }
  export class UCapsulesOptions<M extends nasl.core.Boolean> extends ViewComponentOptions {
    /**
     * 选中值
     * 当前选中的值
     */
    value: M extends true ? nasl.collection.List<nasl.core.String | nasl.core.Integer | nasl.core.Decimal | nasl.core.Boolean> : (nasl.core.String | nasl.core.Integer | nasl.core.Decimal | nasl.core.Boolean);
    /**
     * 自动选择
     * 是否自动选择第一个非禁用的项
     */
    autoSelect: nasl.core.Boolean;
    /**
     * 可取消
     * 是否可以取消选择
     */
    cancelable: nasl.core.Boolean;
    /**
     * 可多选
     * 是否可以多选
     */
    multiple: nasl.core.Boolean;
    /**
     * 只读
     * 正常显示，但禁止选择/输入
     */
    readonly: nasl.core.Boolean;
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 选择前
     * 选择某一项前触发
     */
    onBeforeSelect: (event: {
      selected: nasl.core.Boolean;
      item: nasl.core.String;
      oldItem: nasl.core.String;
      value: nasl.core.String;
      oldValue: nasl.core.String;
      items: nasl.collection.List<nasl.core.String>;
      oldItems: nasl.collection.List<nasl.core.String>;
    }) => any;
    /**
     * 输入时
     * 选择某一项时触发，仅在单选模式中生效
     */
    onInput: (event: nasl.core.String) => any;
    /**
     * 选择后
     * 选择某一项时触发。单选模式中：
     */
    onSelect: (event: {
      selected: nasl.core.Boolean;
      item: nasl.core.String;
      oldItem: nasl.core.String;
      value: nasl.core.String;
      oldValue: nasl.core.String;
      items: nasl.collection.List<nasl.core.String>;
      oldItems: nasl.collection.List<nasl.core.String>;
    }) => any;
    /**
     * 改变后
     * 选择值改变时触发。单选模式中：
     */
    onChange: (event: {
      item: nasl.core.String;
      oldItem: nasl.core.String;
      value: nasl.core.String;
      oldValue: nasl.core.String;
      items: nasl.collection.List<nasl.core.String>;
      oldItems: nasl.collection.List<nasl.core.String>;
      values: nasl.collection.List<nasl.core.String>;
    }) => any;
    /**
     * 插入`<u-capsule>`或`<u-capsules-group>`子组件。
     */
    slotDefault: () => Array<ViewComponent>;
  }
  export class UCapsule extends ViewComponent {
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    constructor(options?: Partial<UCapsuleOptions>);
  }
  export class UCapsuleOptions extends ViewComponentOptions {
    private item;
    /**
     * 值
     * 此项的值
     */
    value: nasl.core.String | nasl.core.Integer | nasl.core.Decimal | nasl.core.Boolean;
    /**
     * 标签
     * 顶部自定义提示文本
     */
    label: nasl.core.String;
    /**
     * flag标志
     * 是否右上角有flag标志
     */
    flag: nasl.core.Boolean;
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 预览
     * 显示预览态
     */
    preview: nasl.core.Boolean;
    private size;
    /**
     * 点击
     * 点击此项时触发，与原生 click 事件不同的是，它只会在非只读和禁用的情况下触发。
     */
    onClick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 选择前
     * 选择此项前触发
     */
    onBeforeSelect: (event: {
      selected: nasl.core.Boolean;
      item: nasl.core.String;
      oldItem: nasl.core.String;
      value: nasl.core.String;
      oldValue: nasl.core.String;
      items: nasl.collection.List<nasl.core.String>;
      oldItems: nasl.collection.List<nasl.core.String>;
    }) => any;
    /**
     * 插入文本或 HTML。
     */
    slotDefault: () => Array<ViewComponent>;
  }
  export class UCapsulesGroup extends ViewComponent {
    constructor(options?: Partial<UCapsulesGroupOptions>);
  }
  export class UCapsulesGroupOptions extends ViewComponentOptions {
    /**
     * 插入`<u-capsule>`或`<u-capsules-group>`子组件。
     */
    slotDefault: () => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class UCard extends ViewComponent {
    constructor(options?: Partial<UCardOptions>);
  }
  export class UCardOptions extends ViewComponentOptions {
    private title;
    /**
     * 宽度
     * 设置卡片宽度，可设置为像素或百分比
     */
    width: nasl.core.String;
    /**
     * 阴影
     * 卡片阴影显示时机
     */
    shadow: 'always' | 'hover' | 'never';
    /**
     * 显示边框
     */
    border: nasl.core.Boolean;
    /**
     * 分割线
     */
    split: nasl.core.Boolean;
    /**
     * 点击
     * 在元素上按下并释放任意鼠标按钮时触发。
     */
    onClick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 双击
     * 在元素上双击鼠标按钮时触发。
     */
    onDblclick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 右键点击
     * 在右键菜单显示前触发。
     */
    onContextmenu: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标按下
     * 在元素上按下任意鼠标按钮时触发。
     */
    onMousedown: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标释放
     * 在元素上释放任意鼠标按钮时触发。
     */
    onMouseup: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标移入
     * 鼠标移入元素时触发。
     */
    onMouseenter: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标移出
     * 鼠标移出元素时触发。
     */
    onMouseleave: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 插入默认的元素
     */
    slotDefault: () => Array<ViewComponent>;
    /**
     * 插入图片
     */
    slotCover: () => Array<ViewComponent>;
    /**
     * 标题
     * 插入文本或 HTML。
     */
    slotTitle: () => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class UCarousel<T> extends ViewComponent {
    /**
     * 数据
     */
    data: nasl.collection.List<T>;
    /**
     * 清除缓存，重新加载
     */
    reload(): void;
    constructor(options?: Partial<UCarouselOptions<T>>);
  }
  export class UCarouselOptions<T> extends ViewComponentOptions {
    private loop;
    private direction;
    private animation;
    /**
     * 数据源
     * 展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。
     */
    dataSource: nasl.collection.List<T> | {
      list: nasl.collection.List<T>;
      total: nasl.core.Integer;
    };
    /**
     * 数据类型
     * 数据源返回的数据结构的类型，自动识别类型进行展示说明
     */
    dataSchema: T;
    private value;
    /**
     * 轮播
     */
    autoplay: nasl.core.Boolean;
    /**
     * 切换间隔时间
     * 单位：毫秒，幻灯片切换时间，如果设置值小于动画时长，会在动画完成后切换
     */
    interval: nasl.core.Integer;
    /**
     * 选择前
     * 选择某一页前触发
     */
    onBeforeSelect: (event: {
      selected: nasl.core.Boolean;
      item: T;
      oldItem: T;
      value: nasl.core.String;
      oldValue: nasl.core.String;
    }) => any;
    /**
     * 选择后
     * 选择某一页时触发
     */
    onSelect: (event: {
      selected: nasl.core.Boolean;
      item: T;
      oldItem: T;
      value: nasl.core.String;
      oldValue: nasl.core.String;
    }) => any;
    /**
     * 加载前
     * 加载前触发
     */
    onBeforeLoad: (event: any) => any;
    /**
     * 加载后
     * 加载后触发
     */
    onLoad: (event: any) => any;
    /**
     * 插入`<u-carousel-item>`子组件。
     */
    slotDefault: () => Array<ViewComponent>;
    /**
     * 自定义选项的结构和样式
     */
    slotItem: (current: Current<T>) => Array<ViewComponent>;
  }
  export class UCarouselItem extends ViewComponent {
    constructor(options?: Partial<UCarouselItemOptions>);
  }
  export class UCarouselItemOptions extends ViewComponentOptions {
    private title;
    private value;
    /**
     * 插入文本或 HTML。
     */
    slotDefault: () => Array<ViewComponent>;
    /**
     * 自定义标题文本。
     */
    slotTitle: () => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class UCascader<T, V> extends ViewComponent {
    /**
     * 数据
     */
    data: nasl.collection.List<T>;
    /**
     * 选中值
     */
    value: UCascaderOptions<T, V>['value'];
    /**
     * 过滤文本
     */
    filterText: nasl.core.String;
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    /**
     * 只读
     */
    readonly: nasl.core.Boolean;
    /**
     * 预览
     */
    preview: nasl.core.Boolean;
    /**
     * 打开
     */
    opened: nasl.core.Boolean;
    /**
     * 弹出实例。
     */
    open(): void;
    /**
     * 关闭实例。
     */
    close(): void;
    /**
     * 清空输入框。
     */
    clear(): void;
    /**
     * 重新加载数据
     */
    reload(): void;
    constructor(options?: Partial<UCascaderOptions<T, V>>);
  }
  export class UCascaderOptions<T, V> extends ViewComponentOptions {
    /**
     * 数据源
     * 展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑
     */
    dataSource: nasl.collection.List<T> | {
      list: nasl.collection.List<T>;
      total: nasl.core.Integer;
    };
    /**
     * 数据类型
     * 数据源返回的数据结构的类型，自动识别类型进行展示说明
     */
    dataSchema: T;
    /**
     * 文本字段
     * 集合的元素类型中，用于显示文本的属性名称
     */
    field: (item: T) => any;
    /**
     * 值字段
     * 集合的元素类型中，用于标识选中值的属性
     */
    valueField: (item: T) => V;
    /**
     * 子级值字段
     * 树形数据子节点字段名，默认为children
     */
    childrenField: (item: T) => nasl.collection.List<any>;
    /**
     * 父级值字段
     * 当数据源为平铺数据时自动生成级联数据的节点字段名，重要：值字段名需要一起配置
     */
    parentField: (item: T) => any;
    /**
     * 值
     */
    value: any;
    /**
     * 绑定值使用值字段
     */
    useArrayLikeValue: nasl.core.Boolean;
    /**
     * 筛选
     * 设置是否可以筛选，开启将会显示搜索框。
     */
    filterable: nasl.core.Boolean;
    /**
     * 筛选文字高亮颜色
     * 设置筛选文字高亮颜色
     */
    filterHightlighterColor: nasl.core.String;
    /**
     * 占位符
     * 为空时显示的占位符文本
     */
    placeholder: nasl.core.String;
    /**
     * 只显示最后一项
     * 定义是否显示完整的路径，ture时只显示最后一项
     */
    showFinalValue: nasl.core.Boolean;
    /**
     * 自动获取焦点
     * 设置是否自动获取焦点
     */
    autofocus: nasl.core.Boolean;
    /**
     * 触发方式
     */
    trigger: 'click' | 'hover';
    /**
     * 可清空
     * 设置是否可以清空搜索框，开启后将在有内容时显示清除按钮。
     */
    clearable: nasl.core.Boolean;
    /**
     * 空值为null
     * 清空值时是否设置为null
     */
    emptyValueIsNull: nasl.core.Boolean;
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 弹出状态
     * 弹出状态分为“True(弹出)/False(关闭)”，默认为“弹出”
     */
    opened: nasl.core.Boolean;
    /**
     * 宽度
     * 设置级联框宽度大小
     */
    width: 'full' | 'huge' | 'large' | 'medium' | 'normal' | 'small' | 'mini';
    /**
     * 高度
     * 设置级联框高度大小
     */
    height: 'full' | 'huge' | 'large' | 'medium' | 'normal' | 'small' | 'mini';
    private join;
    /**
     * 预览
     * 显示预览态
     */
    preview: nasl.core.Boolean;
    /**
     * 输入时
     * 选择某一项时触发
     */
    onInput: (event: V) => any;
    /**
     * 选择后
     * 选择某一项时触发
     */
    onSelect: (event: {
      value: V;
      values: nasl.collection.List<V>;
      items: nasl.collection.List<T>;
    }) => any;
    /**
     * 获得焦点
     * 获得焦点时触发。
     */
    onFocus: (event: {
      cancelBubble: nasl.core.Boolean;
      detail: nasl.core.String;
      layerX: nasl.core.Integer;
      layerY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 失去焦点
     * 失去焦点时触发。
     */
    onBlur: (event: {
      cancelBubble: nasl.core.Boolean;
      detail: nasl.core.String;
      layerX: nasl.core.Integer;
      layerY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 清空后
     * 清空后触发。
     */
    onClear: (event: any) => any;
    /**
     * 加载前
     * 加载前触发
     */
    onBeforeLoad: (event: any) => any;
    /**
     * 加载后
     * 加载后触发
     */
    onLoad: (event: any) => any;
  }
}
declare namespace nasl.ui {
  export class UCheckboxes<T, V, C> extends ViewComponent {
    /**
     * 数据
     */
    data: nasl.collection.List<T>;
    /**
     * 选中值
     */
    value: UCheckboxesOptions<T, V, C>['value'];
    /**
     * 全选中
     */
    allChecked: nasl.core.Boolean;
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    /**
     * 只读
     */
    readonly: nasl.core.Boolean;
    /**
     * 预览
     */
    preview: nasl.core.Boolean;
    /**
     * 清除缓存，重新加载
     */
    reload(): void;
    constructor(options?: Partial<UCheckboxesOptions<T, V, C>>);
  }
  export class UCheckboxesOptions<T, V, C> extends ViewComponentOptions {
    /**
     * 数据源
     * 展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。
     */
    dataSource: nasl.collection.List<T> | {
      list: nasl.collection.List<T>;
      total: nasl.core.Integer;
    };
    /**
     * 数据类型
     * 数据源返回的数据结构的类型，自动识别类型进行展示说明
     */
    dataSchema: T;
    private textField;
    /**
     * 值字段
     * 用于标识选中值的字段
     */
    valueField: (item: T) => V;
    /**
     * 选中值
     * 当前选中的值
     */
    value: C extends '' ? nasl.collection.List<V> : nasl.core.String;
    /**
     * 全选控制
     * 是否进行全选
     */
    checkAll: nasl.core.Boolean;
    /**
     * 全选展示内容
     * 全选功能展示的文案内容
     */
    checkAllText: nasl.core.String;
    /**
     * 展示方式
     * 选择展开方式
     */
    checkAllDisplay: 'inline' | 'block';
    /**
     * 最小选中数
     * 可以勾选多选框的最小数量
     */
    min: nasl.core.Integer;
    /**
     * 最大选中数
     * 可以勾选多选框的最大数量
     */
    max: nasl.core.Integer;
    /**
     * 转换器
     * 将选中的值以选择的符号作为连接符，转为字符串格式；选择“json”则转为JSON字符串格式
     */
    converter: '' | 'join' | 'join:|' | 'join:;' | 'json';
    /**
     * 只读
     * 正常显示，但禁止选择/输入
     */
    readonly: nasl.core.Boolean;
    /**
     * 预览
     * 显示预览态
     */
    preview: nasl.core.Boolean;
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 输入时
     * 切换选项时触发
     */
    onInput: (event: nasl.collection.List<V>) => any;
    /**
     * 选中后
     * 切换选项时触发
     */
    onCheck: (event: {
      value: nasl.collection.List<V> | nasl.core.String;
      oldValue: nasl.collection.List<V> | nasl.core.String;
    }) => any;
    /**
     * 改变后
     * 选中状态改变时触发
     */
    onChange: (event: {
      value: nasl.collection.List<V> | nasl.core.String;
      oldValue: nasl.collection.List<V> | nasl.core.String;
    }) => any;
    /**
     * 加载前
     * 加载前触发
     */
    onBeforeLoad: (event: any) => any;
    /**
     * 加载后
     * 加载后触发
     */
    onLoad: (event: any) => any;
    /**
     * 插入`<checkbox>`子组件。
     */
    slotDefault: () => Array<UCheckbox<T, V>>;
    /**
     * 全选/反选
     */
    slotCheckAll: () => Array<ViewComponent>;
    /**
     * 自定义选项的结构和样式
     */
    slotItem: (current: Current<T>) => Array<ViewComponent>;
  }
  export class UCheckbox<T, V> extends ViewComponent {
    /**
     * 选中
     */
    value: UCheckboxOptions<T, V>['value'];
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    /**
     * 只读
     */
    readonly: nasl.core.Boolean;
    constructor(options?: Partial<UCheckboxOptions<T, V>>);
  }
  export class UCheckboxOptions<T, V> extends ViewComponentOptions {
    private text;
    private value;
    /**
     * 选项值
     * 用于标识选项的值
     */
    label: V;
    /**
     * 自动获取焦点
     */
    autofocus: nasl.core.Boolean;
    /**
     * 只读
     * 正常显示，但禁止选择/输入
     */
    readonly: nasl.core.Boolean;
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 选中前
     * 切换选中状态前触发
     */
    onBeforeCheck: (event: {
      value: nasl.core.Boolean;
      oldValue: nasl.core.Boolean;
    }) => any;
    /**
     * 输入时
     * 切换选中状态时触发
     */
    onInput: (event: V) => any;
    /**
     * 选中后
     * 切换选中状态时触发
     */
    onCheck: (event: {
      value: V;
    }) => any;
    /**
     * 改变后
     * 选中状态改变时触发
     */
    onChange: (event: {
      value: V;
      oldValue: V;
    }) => any;
    /**
     * 项
     * 插入文本或 HTML。
     */
    slotItem: () => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class UCircularProgress extends ViewComponent {
    /**
     * 当前进度(%)
     */
    percent: UCircularProgressOptions['percent'];
    constructor(options?: Partial<UCircularProgressOptions>);
  }
  export class UCircularProgressOptions extends ViewComponentOptions {
    /**
     * 当前进度(%)
     * 进度条显示的进度百分比，1-100之间的数字
     */
    percent: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 尺寸
     * 进度条大小
     */
    size: 'small' | 'normal' | 'large' | 'huge';
    /**
     * 默认
     * 插入文本或 HTML。
     */
    slotDefault: () => Array<ViewComponent>;
    /**
     * 分数展示
     * 分数展示自定义
     */
    slotPercent: () => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class UCollapse extends ViewComponent {
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    constructor(options?: Partial<UCollapseOptions>);
  }
  export class UCollapseOptions extends ViewComponentOptions {
    /**
     * 显示效果
     */
    appear: 'default' | 'simple';
    /**
     * 填充位置
     */
    fill: 'head' | 'content' | 'none';
    /**
     * 手风琴模式
     * 设置是否每次只展开一个
     */
    accordion: nasl.core.Boolean;
    /**
     * 展开触发方式
     * 展开/折叠操作的触发方式
     */
    expandTrigger: 'click' | 'click-expander';
    /**
     * 禁用展开/折叠
     * 置灰显示，且禁止展开/折叠操作
     */
    disabled: nasl.core.Boolean;
    /**
     * 展开时
     * 展开此面板时触发
     */
    onExpand: (event: any) => any;
    /**
     * 折叠时
     * 折叠某面板时触发
     */
    onCollapse: (event: any) => any;
    /**
     * 插入`<u-collapse-item>`子组件。
     */
    slotDefault: () => Array<ViewComponent>;
  }
  export class UCollapseItem extends ViewComponent {
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    /**
     * 是否展开
     */
    expanded: nasl.core.Boolean;
    constructor(options?: Partial<UCollapseItemOptions>);
  }
  export class UCollapseItemOptions extends ViewComponentOptions {
    private title;
    /**
     * 展开状态
     * 展开状态分为“True(展开)/False(折叠)”，默认为“展开”
     */
    expanded: nasl.core.Boolean;
    /**
     * 禁用展开/折叠
     * 置灰显示，且禁止展开/折叠操作
     */
    disabled: nasl.core.Boolean;
    /**
     * 展开时
     * 展开此面板时触发
     */
    onExpand: (event: any) => any;
    /**
     * 折叠时
     * 折叠某面板时触发
     */
    onCollapse: (event: any) => any;
    /**
     * 插入文本或 HTML。
     */
    slotDefault: () => Array<ViewComponent>;
    /**
     * 自定义标题文本。
     */
    slotTitle: () => Array<ViewComponent>;
    /**
     * 在右侧可以附加内容。
     */
    slotExtra: () => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class UComboSlider extends ViewComponent {
    /**
     * 滑块值
     */
    value: UComboSliderOptions['value'];
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    /**
     * 只读
     */
    readonly: nasl.core.Boolean;
    /**
     * 预览
     */
    preview: nasl.core.Boolean;
    constructor(options?: Partial<UComboSliderOptions>);
  }
  export class UComboSliderOptions extends ViewComponentOptions {
    private tip;
    /**
     * 滑块值
     */
    value: nasl.core.Decimal | nasl.core.Integer | nasl.collection.List<nasl.core.Integer> | nasl.collection.List<nasl.core.Decimal>;
    /**
     * 最小值
     */
    min: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 最大值
     */
    max: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 间隔
     * 间隔，`0`表示连续
     */
    step: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 精度
     * 精度，表示数字要保留的最小单位，整数、小数均可
     */
    precision: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 范围
     * 进一步对`value`限制，通常传入一个数组，第一个值表示范围开始值，第二个值表示范围的结束值
     */
    range: nasl.collection.List<nasl.core.Integer> | nasl.collection.List<nasl.core.Decimal>;
    private formatter;
    /**
     * 双滑块
     * 设置是否展示双滑块
     */
    multiple: nasl.core.Boolean;
    /**
     * 单位
     */
    unit: nasl.core.String;
    /**
     * 同步时机
     */
    syncOn: 'input' | 'blur';
    /**
     * 隐藏按钮
     */
    hideButtons: nasl.core.Boolean;
    /**
     * 展示提示信息
     * 鼠标悬浮时展示Tooltip提示信息
     */
    showTooltip: nasl.core.Boolean;
    /**
     * 提示信息
     * Tooltip提示信息设置。在展示提示信息开关打开的情况下才会生效
     */
    tooltip: nasl.core.String;
    /**
     * 只读
     * 正常显示，但禁止选择/输入
     */
    readonly: nasl.core.Boolean;
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 预览
     * 显示预览态
     */
    preview: nasl.core.Boolean;
    /**
     * 值改变时
     * 滑块的值改变时触发
     */
    onInput: (event: nasl.core.Decimal | nasl.core.Integer) => any;
    /**
     * 拖动滑块时
     * 拖动滑块时触发
     */
    onSlide: (event: {
      value: nasl.core.Decimal | nasl.core.Integer;
      oldValue: nasl.core.Decimal | nasl.core.Integer;
      percent: nasl.core.Decimal | nasl.core.Integer;
      index: nasl.core.Decimal | nasl.core.Integer;
    }) => any;
    /**
     * 值改变后
     * 滑块的值改变后触发
     */
    onChange: (event: {
      value: nasl.core.Decimal | nasl.core.Integer;
      oldValue: nasl.core.Decimal | nasl.core.Integer;
    }) => any;
    /**
     * 改变数字输入框的值后
     * 改变数字输入框的值后触发
     */
    onNumberInput: (event: nasl.core.Decimal | nasl.core.Integer) => any;
    /**
     * 拖动滑块结束后
     * 拖动滑块结束后触发
     */
    onSlideEnd: (event: nasl.core.Decimal | nasl.core.Integer) => any;
    /**
     * 提示
     * 插入文本或 HTML。
     */
    slotTip: () => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class UCopy extends ViewComponent {
    /**
     * 复制的值
     */
    value: UCopyOptions['value'];
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    constructor(options?: Partial<UCopyOptions>);
  }
  export class UCopyOptions extends ViewComponentOptions {
    private text;
    private successText;
    private feedback;
    private placement;
    private hideDelay;
    /**
     * 复制的值
     * 需要复制的值
     */
    value: nasl.core.String;
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 复制成功后
     * 内容复制成功后触发
     */
    onCopy: (event: {
      value: nasl.core.String;
    }) => any;
    /**
     * 修改默认触发元素
     */
    slotDefault: () => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class UCountDown extends ViewComponent {
    /**
     * 开始计时器
     */
    start(): void;
    /**
     * 暂停计时器
     */
    pause(): void;
    /**
     * 继续计时器
     */
    continue(): void;
    /**
     * 停止计时器
     */
    stop(): void;
    constructor(options?: Partial<UCountDownOptions>);
  }
  export class UCountDownOptions extends ViewComponentOptions {
    /**
     * 定时时长（秒）
     * 设置定时时间
     */
    timer: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 计时方式
     * 设置计时器计时方式
     */
    reverse: 'positive' | 'negative';
    /**
     * 自动计时
     * 设置是否自动开始计时
     */
    autostart: nasl.core.Boolean;
    /**
     * 计时器开始
     * 计时器开始时触发
     */
    onStart: (event: any) => any;
    /**
     * 计时器暂停
     * 计时器暂停时触发
     */
    onPause: (event: any) => any;
    /**
     * 计时器继续
     * 计时器继续时触发
     */
    onContinue: (event: any) => any;
    /**
     * 计时器结束
     * 计时器结束时触发
     */
    onStop: (event: any) => any;
  }
}
declare namespace nasl.ui {
  export class UCrumb extends ViewComponent {
    constructor(options?: Partial<UCrumbOptions>);
  }
  export class UCrumbOptions extends ViewComponentOptions {
    /**
     * 自动生成
     * 是否自动根据子页面配置的面包屑属性自动生成
     */
    auto: nasl.core.Boolean;
    /**
     * 样式类型
     * 设置面包屑分隔样式类型，基础样式为箭头，分隔符样式为斜杠
     */
    separator: 'arrow' | 'slash';
    /**
     * 显示面包屑图标
     */
    icon: nasl.core.Boolean;
    /**
     * 插入`<u-crumb-item>`子组件。
     */
    slotDefault: () => Array<UCrumbItem>;
  }
  export class UCrumbItem extends ViewComponent {
    constructor(options?: Partial<UCrumbItemOptions>);
  }
  export class UCrumbItemOptions extends ViewComponentOptions {
    private text;
    private replace;
    private append;
    /**
     * 图标
     */
    icon: nasl.core.String;
    private type;
    /**
     * 链接类型
     */
    linkType: 'destination' | 'download';
    /**
     * 链接地址
     */
    hrefAndTo: nasl.core.String;
    /**
     * 链接打开方式
     * 链接打开后的展示方式，父级窗口和顶级窗口仅适用于iframe组件嵌套的情况，若不存在嵌套，则其打开方式同当前窗口。
     */
    target: '_blank' | '_self' | '_parent' | '_top';
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 点击
     * 在元素上按下并释放任意鼠标按钮时触发。
     */
    onClick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 双击
     * 在元素上双击鼠标按钮时触发。
     */
    onDblclick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 右键点击
     * 在右键菜单显示前触发。
     */
    onContextmenu: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标按下
     * 在元素上按下任意鼠标按钮时触发。
     */
    onMousedown: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标释放
     * 在元素上释放任意鼠标按钮时触发。
     */
    onMouseup: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标移入
     * 鼠标移入元素时触发。
     */
    onMouseenter: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标移出
     * 鼠标移出元素时触发。
     */
    onMouseleave: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 获得焦点
     * 获得焦点时触发。
     */
    onFocus: (event: {
      cancelBubble: nasl.core.Boolean;
      detail: nasl.core.String;
      layerX: nasl.core.Integer;
      layerY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 失去焦点
     * 失去焦点时触发。
     */
    onBlur: (event: {
      cancelBubble: nasl.core.Boolean;
      detail: nasl.core.String;
      layerX: nasl.core.Integer;
      layerY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 导航前
     * 使用 router 相关属性切换路由前触发
     */
    onBeforeNavigate: (event: {
      to: nasl.core.String;
      replace: nasl.core.Boolean;
      append: nasl.core.Boolean;
    }) => any;
    /**
     * 导航
     * 使用router相关属性切换路由时触发
     */
    onNavigate: (event: {
      to: nasl.core.String;
      replace: nasl.core.Boolean;
      append: nasl.core.Boolean;
    }) => any;
    /**
     * 默认
     * 插入文本或 HTML。
     */
    slotDefault: () => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class UDatePicker extends ViewComponent {
    /**
     * 值
     */
    value: UDatePickerOptions['value'];
    /**
     * 起始值
     */
    startDate: UDatePickerOptions['startDate'];
    /**
     * 结束值
     */
    endDate: UDatePickerOptions['endDate'];
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    /**
     * 只读
     */
    readonly: nasl.core.Boolean;
    /**
     * 预览
     */
    preview: nasl.core.Boolean;
    /**
     * 打开
     */
    opened: nasl.core.Boolean;
    constructor(options?: Partial<UDatePickerOptions>);
  }
  export class UDatePickerOptions extends ViewComponentOptions {
    /**
     * 日期类型
     * 日期格式设置
     */
    picker: 'date' | 'week' | 'month' | 'quarter' | 'year';
    /**
     * 区间选择
     * 是否支持进行日期区间选择，关闭则为日期点选择
     */
    range: nasl.core.Boolean;
    /**
     * 值
     * 默认显示的日期值，格式如2018-08-08
     */
    value: nasl.core.String | nasl.core.Integer | nasl.core.Date | nasl.core.DateTime;
    /**
     * 起始值
     * 默认显示的起始日期值，格式如2018-08-08
     */
    startDate: nasl.core.String | nasl.core.Integer | nasl.core.Date | nasl.core.DateTime;
    /**
     * 结束值
     * 默认显示的结束日期值，格式如2018-08-08
     */
    endDate: nasl.core.String | nasl.core.Integer | nasl.core.Date | nasl.core.DateTime;
    /**
     * 最小日期值
     * 最小可选的日期值，默认为10年前，日期填写格式为“yyyy-mm-dd”
     */
    minDate: nasl.core.String | nasl.core.Integer | nasl.core.Date | nasl.core.DateTime;
    /**
     * 最大日期值
     * 最大可选的日期值，默认为9年后，日期填写格式为“yyyy-mm-dd”
     */
    maxDate: nasl.core.String | nasl.core.Integer | nasl.core.Date | nasl.core.DateTime;
    private time;
    /**
     * 最小年份差值
     * 最小可选年份值与当前年份值的差值
     */
    yearDiff: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 最大年份差值
     * 最大可选年份值与当前年份值的差值
     */
    yearAdd: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 高级格式化
     */
    advancedFormatEnable: nasl.core.Boolean;
    /**
     * 高级格式化内容
     * 用来控制日期的展示格式
     */
    advancedFormatValue: nasl.core.String;
    /**
     * 日期展示格式
     */
    showFormatter: 'YYYY年M月D日' | 'YYYY-MM-DD' | 'M/D/YYYY' | 'D/M/YYYY' | 'GGGG-W周' | 'GGGG年第W周' | 'GGGG-WWWW' | 'YYYY年M月' | 'YYYY-MM' | 'M/YYYY' | 'YYYY年第Q季度' | 'YYYY年QQ' | 'YYYY-QQ' | 'YYYY年' | 'YYYY';
    /**
     * 自动获取焦点
     * 设置是否自动获取焦点
     */
    autofocus: nasl.core.Boolean;
    /**
     * 占位符
     * 为空时显示的占位符文本
     */
    placeholder: nasl.core.String;
    /**
     * 右侧占位符
     * 为空时显示的占位符文本（右侧）
     */
    placeholderRight: nasl.core.String;
    /**
     * 日历弹窗对齐方式
     * 日历弹窗对齐方式
     */
    alignment: 'left' | 'right';
    /**
     * 转换器
     * 转换器，用于转换时间结果
     */
    converter: 'json' | 'timestamp' | 'date' | 'format';
    /**
     * 前缀图标
     */
    preIcon: 'calendar' | '';
    /**
     * 后缀图标
     */
    suffixIcon: 'calendar' | '';
    /**
     * 弹出层位置依据
     * 设置弹出层依据哪个元素定位位置，可选值：'body'表示添加到 document.body，'reference'表示添加到参考元素中。
     */
    appendTo: 'reference' | 'body';
    /**
     * 可清除
     * 可点击清除按钮一键清除内容
     */
    clearable: nasl.core.Boolean;
    /**
     * 空值为null
     * 清空值时是否设置为null
     */
    emptyValueIsNull: nasl.core.Boolean;
    /**
     * 只读
     * 正常显示，但禁止选择/输入
     */
    readonly: nasl.core.Boolean;
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 预览
     * 显示预览态
     */
    preview: nasl.core.Boolean;
    /**
     * 弹出状态
     * 弹出状态分为“True(弹出)/False(关闭)”，默认为“关闭”
     */
    opened: nasl.core.Boolean;
    /**
     * 宽度
     * 设置日期选择输入框宽度大小
     */
    width: 'full' | 'huge' | 'large' | 'medium' | 'normal' | 'small' | 'mini';
    /**
     * 高度
     * 设置日期选择输入框高度大小
     */
    height: 'full' | 'huge' | 'large' | 'medium' | 'normal' | 'small' | 'mini';
    /**
     * 值输入后
     * 值变化时触发 (表单验证可以检测到其值得变化)
     */
    onInput: (event: nasl.core.Date) => any;
    /**
     * 值变化时
     * 值变化时触发
     */
    onChange: (event: {
      date: nasl.core.String;
      time: nasl.core.String;
    }) => any;
    /**
     * 选择时
     * 选择日期时触发
     */
    onSelect: (event: {
      date: nasl.core.String;
      time: nasl.core.String;
    }) => any;
    /**
     * 弹出/隐藏时
     * 弹出/隐藏时触发
     */
    onToggle: (event: {
      opened: nasl.core.Boolean;
    }) => any;
    /**
     * 失去焦点
     * 失去焦点时触发。
     */
    onBlur: (event: {
      cancelBubble: nasl.core.Boolean;
      detail: nasl.core.String;
      layerX: nasl.core.Integer;
      layerY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
  }
}
declare namespace nasl.ui {
  export class UDateTimePicker extends ViewComponent {
    /**
     * 值
     */
    value: UDatePickerOptions['value'];
    /**
     * 起始值
     */
    startDate: UDatePickerOptions['startDate'];
    /**
     * 结束值
     */
    endDate: UDatePickerOptions['endDate'];
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    /**
     * 只读
     */
    readonly: nasl.core.Boolean;
    /**
     * 预览
     */
    preview: nasl.core.Boolean;
    /**
     * 打开
     */
    opened: nasl.core.Boolean;
    constructor(options?: Partial<UDateTimePickerOptions>);
  }
  export class UDateTimePickerOptions extends ViewComponentOptions {
    /**
     * 最小单位
     * 最小时间单位
     */
    minUnit: 'second' | 'minute';
    /**
     * 区间选择
     * 是否支持进行日期时间区间选择，关闭则为日期时间点选择
     */
    range: nasl.core.Boolean;
    /**
     * 值
     * 默认显示的日期时间值，格式如2018-08-08 08:08:08
     */
    value: nasl.core.String | nasl.core.Decimal | nasl.core.Date | nasl.core.DateTime | nasl.core.Integer;
    /**
     * 起始值
     * 默认显示的起始日期时间值，格式如2018-08-08 08:08:08
     */
    startDate: nasl.core.String | nasl.core.Decimal | nasl.core.Date | nasl.core.DateTime;
    /**
     * 结束值
     * 默认显示的结束日期时间值，格式如2018-08-08 08:08:08
     */
    endDate: nasl.core.String | nasl.core.Decimal | nasl.core.Date | nasl.core.DateTime;
    /**
     * 最小日期时间值
     * 最小可选的日期时间值，填写null则不限制，日期填写格式为“yyyy-mm-dd  00:00:00”
     */
    minDate: nasl.core.String | nasl.core.Decimal | nasl.core.Date | nasl.core.DateTime;
    /**
     * 最大日期时间值
     * 最大可选的日期时间值，填写null则不限制，日期填写格式为“yyyy-mm-dd  00:00:00”
     */
    maxDate: nasl.core.String | nasl.core.Decimal | nasl.core.Date | nasl.core.DateTime;
    /**
     * 最小年份差值
     * 最小可选年份值与当前年份值的差值
     */
    yearDiff: nasl.core.Decimal;
    /**
     * 最大年份差值
     * 最大可选年份值与当前年份值的差值
     */
    yearAdd: nasl.core.Decimal;
    /**
     * 日期展示格式
     */
    showDateFormatter: 'YYYY年M月D日' | 'YYYY-MM-DD' | 'M/D/YYYY' | 'D/M/YYYY';
    /**
     * 时间展示格式
     */
    showTimeFormatter: 'HH:mm:ss' | 'HH时mm分ss秒' | 'HH:mm' | 'HH时mm分';
    /**
     * 高级格式化
     */
    advancedFormatEnable: nasl.core.Boolean;
    /**
     * 高级格式化内容
     * 用来控制日期时间的展示格式
     */
    advancedFormatValue: nasl.core.String;
    /**
     * 占位符
     * 为空时显示的占位符文本
     */
    placeholder: nasl.core.String;
    /**
     * 右侧占位符
     * 为空时显示的占位符文本（右侧）
     */
    placeholderRight: nasl.core.String;
    /**
     * 自动获取焦点
     * 设置是否自动获取焦点
     */
    autofocus: nasl.core.Boolean;
    /**
     * 此刻按钮
     * 点击可快捷选择当前时间
     */
    showRightNowButton: nasl.core.Boolean;
    /**
     * 此刻按钮名称
     */
    rightNowTitle: nasl.core.String;
    /**
     * 取消/确定按钮
     * 控制弹出层的关闭和设置的生效与否
     */
    showFooterButton: nasl.core.Boolean;
    /**
     * 取消按钮名称
     * 取消按钮的显示名称，如果为空则不显示
     */
    cancelTitle: nasl.core.String;
    /**
     * 确定按钮名称
     * 确定按钮的显示名称，如果为空则不显示
     */
    okTitle: nasl.core.String;
    /**
     * 转换器
     */
    converter: 'json' | 'timestamp' | 'date' | 'format';
    /**
     * 前缀图标
     */
    preIcon: 'calendar' | '';
    /**
     * 后缀图标
     */
    suffixIcon: 'calendar' | '';
    /**
     * 弹出层位置依据
     * 设置弹出层依据哪个元素定位位置，可选值：'body'表示添加到 document.body，'reference'表示添加到参考元素中。
     */
    appendTo: 'reference' | 'body';
    /**
     * 可清除
     * 可点击清除按钮一键清除内容
     */
    clearable: nasl.core.Boolean;
    /**
     * 空值为null
     * 清空值时是否设置为null
     */
    emptyValueIsNull: nasl.core.Boolean;
    /**
     * 弹出状态
     * 弹出状态分为“True(弹出)/False(关闭)”，默认为“关闭”
     */
    opened: nasl.core.Boolean;
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 只读
     * 正常显示，但禁止选择/输入
     */
    readonly: nasl.core.Boolean;
    /**
     * 预览
     * 显示预览态
     */
    preview: nasl.core.Boolean;
    /**
     * 宽度
     * 设置日期时间选择输入框宽度大小
     */
    width: 'full' | 'huge' | 'large' | 'medium' | 'normal' | 'small' | 'mini';
    /**
     * 高度
     * 设置日期时间选择输入框高度大小
     */
    height: 'full' | 'huge' | 'large' | 'medium' | 'normal' | 'small' | 'mini';
    /**
     * 值选择时
     * 日期值发生变化触发
     */
    onSelect: (event: {
      date: nasl.core.String;
      time: nasl.core.String;
    }) => any;
    /**
     * 值变化时
     * 选择新时间触发
     */
    onChange: (event: {
      date: nasl.core.String;
      time: nasl.core.String;
    }) => any;
    /**
     * 失去焦点
     * 失去焦点时触发。
     */
    onBlur: (event: {
      cancelBubble: nasl.core.Boolean;
      detail: nasl.core.String;
      layerX: nasl.core.Integer;
      layerY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
  }
}
declare namespace nasl.ui {
  export class UDivider extends ViewComponent {
    constructor(options?: Partial<UDividerOptions>);
  }
  export class UDividerOptions extends ViewComponentOptions {
    private title;
    /**
     * 线条类型
     */
    dashed: 'b' | 'a';
    /**
     * 内容位置
     */
    contentPosition: 'center' | 'left' | 'right';
    /**
     * 方向
     */
    direction: 'horizontal' | 'column';
    /**
     * 默认
     * 显示的文本
     */
    slotDefault: () => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class UDrawer extends ViewComponent {
    /**
     * 显示状态
     */
    visible: nasl.core.Boolean;
    /**
     * 打开抽屉
     */
    open(): void;
    /**
     * 关闭抽屉
     */
    close(): void;
    constructor(options?: Partial<UDrawerOptions>);
  }
  export class UDrawerOptions extends ViewComponentOptions {
    /**
     * 抽屉位置
     * 抽屉弹出的位置
     */
    placement: 'left' | 'right' | 'top' | 'bottom';
    /**
     * 显示顶部栏
     */
    showHead: nasl.core.Boolean;
    /**
     * 显示底部栏
     */
    showFoot: nasl.core.Boolean;
    /**
     * 点击遮罩关闭
     * 点击遮罩关闭抽屉
     */
    maskClosable: nasl.core.Boolean;
    /**
     * 显示状态
     * 显示状态分为“True(打开)/False(关闭)”，默认为“打开”
     */
    visible: nasl.core.Boolean;
    /**
     * 尺寸
     * 抽屉的尺寸
     */
    size: 'small' | 'normal' | 'large';
    /**
     * 打开时
     * 打开抽屉时触发
     */
    onOpen: (event: any) => any;
    /**
     * 打开后
     * 打开抽屉后触发，动画执行完成后
     */
    onOpened: (event: any) => any;
    /**
     * 关闭前
     * 关闭抽屉前触发
     */
    onBeforeClose: (event: {
      ok: nasl.core.Boolean;
    }) => any;
    /**
     * 关闭时
     * 关闭抽屉时触发
     */
    onClose: (event: {
      ok: nasl.core.Boolean;
    }) => any;
    /**
     * 头部
     * 插入文本或 HTML。
     */
    slotTitle: () => Array<ViewComponent>;
    /**
     * 内容区
     * 插入文本或 HTML。
     */
    slotBody: () => Array<ViewComponent>;
    /**
     * 底部
     * 插入文本或 HTML。
     */
    slotFoot: () => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class UDropdown<T, V> extends ViewComponent {
    /**
     * 数据
     */
    data: nasl.collection.List<T>;
    /**
     * 选中值
     */
    value: UDropdownOptions<T, V>['value'];
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    /**
     * 打开
     */
    opened: nasl.core.Boolean;
    constructor(options?: Partial<UDropdownOptions<T, V>>);
  }
  export class UDropdownOptions<T, V> extends ViewComponentOptions {
    /**
     * 数据源配置
     */
    hasDataSource: nasl.core.Boolean;
    /**
     * 数据源
     * 展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。
     */
    dataSource: nasl.collection.List<T> | {
      list: nasl.collection.List<T>;
      total: nasl.core.Integer;
    };
    /**
     * 数据类型
     * 数据源返回的数据结构的类型，自动识别类型进行展示说明
     */
    dataSchema: T;
    /**
     * 文本字段
     * 集合的元素类型中，用于显示文本的属性名称
     */
    textField: (item: T) => any;
    /**
     * 值字段
     * 集合的元素类型中，用于标识选中值的属性
     */
    valueField: (item: T) => V;
    /**
     * 图标属性字段
     * 集合的元素类型中，用于图标的属性名称
     */
    iconField: (item: T) => any;
    /**
     * 跳转链接字段
     * 集合的元素类型中，用于跳转链接的属性名称
     */
    toField: (item: T) => any;
    /**
     * 父级值字段
     * 集合的元素类型中，用于标识父节点的属性
     */
    parentField: (item: T) => any;
    /**
     * 触发方式
     * 触发方式
     */
    trigger: 'click' | 'hover' | 'right-click' | 'double-click' | 'manual';
    /**
     * 样式类型
     */
    type: 'text' | 'primary' | 'primary_secondary' | 'normal' | 'more';
    /**
     * 弹出方向
     * 弹出层的弹出方向
     */
    placement: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end';
    /**
     * 弹出层位置依据
     * 设置弹出层依据哪个元素定位位置，可选值：'body'表示添加到 document.body，'reference'表示添加到参考元素中。
     */
    appendTo: 'reference' | 'body';
    /**
     * 使用路由
     * 是否使用 vue-router
     */
    router: nasl.core.Boolean;
    /**
     * 选中值
     * 当前选中的值
     */
    value: V;
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 显示状态
     */
    opened: nasl.core.Boolean;
    /**
     * 插入`<u-dropdown>`子组件。
     */
    slotDefault: () => Array<ViewComponent>;
    /**
     * 标题
     * 内容自定义
     */
    slotTitle: () => Array<ViewComponent>;
  }
  export class UDropdownItem extends ViewComponent {
    constructor(options?: Partial<UDropdownItemOptions>);
  }
  export class UDropdownItemOptions extends ViewComponentOptions {
    private text;
    private to;
    /**
     * 图标
     */
    icon: nasl.core.String;
    /**
     * 链接类型
     */
    linkType: 'destination' | 'download';
    /**
     * 链接地址
     */
    hrefAndTo: nasl.core.String;
    /**
     * 链接打开方式
     * 链接跳转的打开方式，父级窗口和顶级窗口仅适用于iframe组件嵌套的情况，若不存在嵌套，则其打开方式同当前窗口。
     */
    target: '_blank' | '_self' | '_parent' | '_top';
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 点击
     * 点击此项时触发，与原生 click 事件不同的是，它只会在非只读和禁用的情况下触发。
     */
    onClick: (event: any) => any;
    /**
     * 默认
     * 插入文本或 HTML。
     */
    slotDefault: () => Array<ViewComponent>;
  }
  export class UDropdownGroup extends ViewComponent {
    constructor(options?: Partial<UDropdownGroupOptions>);
  }
  export class UDropdownGroupOptions extends ViewComponentOptions {
    private title;
    /**
     * 可折叠
     * 设置是否可以展开/折叠
     */
    collapsible: nasl.core.Boolean;
    /**
     * 触发方式
     * 触发方式
     */
    trigger: 'click' | 'hover' | 'right-click' | 'double-click' | 'none';
    /**
     * 展开状态
     * 展开状态分为“True(展开)/False(折叠)”，默认为“展开”
     */
    expanded: nasl.core.Boolean;
    /**
     * 禁用展开/折叠
     * 置灰显示，且禁止展开/折叠操作
     */
    disabled: nasl.core.Boolean;
    /**
     * 插入`<u-dropdown>`子组件。
     */
    slotDefault: () => Array<ViewComponent>;
    /**
     * 标题
     * 内容自定义
     */
    slotTitle: () => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class UForm extends ViewComponent {
    /**
     * 预览
     */
    preview: nasl.core.Boolean;
    /**
     * 验证是否有效
     */
    valid: nasl.core.Boolean;
    /**
     * 手动验证。
     * @param trigger - '触发方式，可选值：`submit`、`blur`和`input`之一，或者它们的任意组合。'
     * @param muted - '是否验证后无提示'
     */
    validate(trigger?: nasl.core.String, muted?: nasl.core.Boolean): ValidateResult;
    /**
     * 验证表单中的某一项，已废弃。表单中的项是嵌套的，用 name 层级较深，而且可能有重名。
     * @param name - '表单项的 name'
     * @param trigger - '触发方式，可选值：`submit`、`blur`和`input`之一，或者它们的任意组合。'
     * @param muted - '是否验证后无提示'
     */
    validateItem(name: nasl.core.String, trigger?: nasl.core.String, muted?: nasl.core.Boolean): ValidateResult;
    constructor(options?: Partial<UFormOptions>);
  }
  export class UFormOptions extends ViewComponentOptions {
    private model;
    private size;
    private rules;
    /**
     * 表单布局
     */
    layout: 'inline' | 'block' | 'inline-flex';
    /**
     * 列数
     * 整个表单的划分列数
     */
    repeat: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 标签布局
     */
    labelLayout: 'inline' | 'block';
    /**
     * 标签过长省略
     * 文字过长是否省略显示。默认文字超出时会换行。
     */
    labelEllipsis: nasl.core.Boolean;
    /**
     * 可折叠
     * 设置是否可以展开/折叠
     */
    collapsible: nasl.core.Boolean;
    /**
     * 手风琴模式
     * 设置是否每次只展开一个
     */
    accordion: nasl.core.Boolean;
    /**
     * 展开触发方式
     * 展开/折叠操作的触发方式
     */
    expandTrigger: 'click' | 'click-expander';
    /**
     * 预览
     * 显示预览态
     */
    preview: nasl.core.Boolean;
    /**
     * 列间隔
     * 设置表单列间隔大小
     */
    gapWidth: 'none' | 'small' | 'normal' | 'large';
    /**
     * 行间隔
     * 设置表单行间隔大小
     */
    gapHeight: 'none' | 'small' | 'normal' | 'large';
    /**
     * 标签宽度
     */
    labelSize: 'mini' | 'small' | 'normal' | 'large';
    /**
     * 冒号
     * 设置是否显示标签后的冒号
     */
    colon: nasl.core.Boolean;
    /**
     * 验证后
     * 验证时触发
     */
    onValidate: (event: {
      rawValue: nasl.core.String;
      value: nasl.core.String;
      trigger: nasl.core.String;
      muted: nasl.core.String;
      valid: nasl.core.Boolean;
      touched: nasl.core.Boolean;
      dirty: nasl.core.Boolean;
      firstError: nasl.core.String;
      triggerValid: nasl.core.Boolean;
    }) => any;
    /**
     * 插入`<u-form-item>`子组件。
     */
    slotDefault: () => Array<ViewComponent>;
  }
  export class UFormItem extends ViewComponent {
    /**
     * 验证是否有效
     */
    valid: nasl.core.Boolean;
    /**
     * 验证此表单项。
     * @param trigger - '触发方式，可选值：`submit`、`blur`和`input`之一，或者它们的任意组合。'
     * @param muted - '是否验证后无提示'
     */
    validate(trigger?: nasl.core.String, muted?: nasl.core.Boolean): any;
    constructor(options?: Partial<UFormItemOptions>);
  }
  export class UFormItemOptions extends ViewComponentOptions {
    private name;
    private label;
    private muted;
    private placement;
    private ignoreRules;
    private validatingOptions;
    private validatingValue;
    private validatingProcess;
    /**
     * 占据数
     * 列跨越的格数
     */
    span: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 标签布局
     */
    labelLayout: 'inline' | 'block';
    /**
     * 标签过长省略
     * 文字过长是否省略显示。默认文字超出时会换行。
     */
    labelEllipsis: nasl.core.Boolean;
    /**
     * 必填标记
     * 是否必填。仅显示样式，如果要验证必填项，需要在`rules`中添加必填规则。
     */
    required: nasl.core.Boolean;
    /**
     * 必填标记位置
     */
    requiredPosition: 'left' | 'right';
    /**
     * 释义提示
     * 鼠标悬浮标签后的图标显示释义提示信息
     */
    message: nasl.core.String;
    /**
     * 辅助文本
     * 辅助说明的文本信息
     */
    description: nasl.core.String;
    /**
     * 标签纵轴对齐
     * 标签与表单元素的纵轴对齐方式，默认为居中对齐
     */
    layout: 'block' | 'center' | 'end';
    /**
     * 验证规则
     * 验证规则。简写格式为字符串类型，完整格式或混合格式为数组类型
     */
    rules: nasl.core.String;
    /**
     * 忽略验证
     */
    ignoreValidation: nasl.core.Boolean;
    /**
     * 字段大小
     * 单独设置表单项的内容大小
     */
    fieldSize: 'mini' | 'small' | 'normal' | 'large';
    /**
     * 表单项标签宽度
     */
    labelSize: 'mini' | 'small' | 'normal' | 'large';
    /**
     * 验证后
     * 对于第一个 Field 或者所有子 UValidator：
     */
    onValidate: (event: {
      rawValue: nasl.core.String;
      value: nasl.core.String;
      trigger: nasl.core.String;
      muted: nasl.core.String;
      valid: nasl.core.Boolean;
      touched: nasl.core.Boolean;
      dirty: nasl.core.Boolean;
      firstError: nasl.core.String;
      triggerValid: nasl.core.Boolean;
    }) => any;
    /**
     * 默认
     * 插入文本或 HTML。
     */
    slotDefault: () => Array<ViewComponent>;
    /**
     * 标签自定义
     * 插入自定义标签，代替`label`属性。
     */
    slotLabel: () => Array<ViewComponent>;
    /**
     * 描述自定义
     * 插入自定义描述内容，代替`description`属性。
     */
    slotDescription: () => Array<ViewComponent>;
    /**
     * 附加内容
     * 自定义标签右侧额外内容。
     */
    slotExtra: () => Array<ViewComponent>;
  }
  export class UFormGroup extends ViewComponent {
    constructor(options?: Partial<UFormGroupOptions>);
  }
  export class UFormGroupOptions extends ViewComponentOptions {
    /**
     * 标题
     */
    title: nasl.core.String;
    /**
     * 列数
     * 整个表单的划分列数
     */
    repeat: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 标签布局
     */
    labelLayout: 'inline' | 'block';
    /**
     * 标签过长省略
     * 文字过长是否省略显示。默认文字超出时会换行。
     */
    labelEllipsis: nasl.core.Boolean;
    /**
     * 可折叠
     * 设置是否可以展开/折叠
     */
    collapsible: nasl.core.Boolean;
    /**
     * 展开状态
     * 展开状态分为“True(展开)/False(折叠)”，默认为“展开”
     */
    expanded: nasl.core.Boolean;
    /**
     * 禁用
     * 置灰显示，且禁止展开/折叠操作
     */
    disabled: nasl.core.Boolean;
    /**
     * 展开折叠前
     * 展开/折叠此分组前触发
     */
    onBeforeToggle: (event: {
      expanded: nasl.core.Boolean;
    }) => any;
    /**
     * 展开折叠后
     * 展开/折叠某分组时触发
     */
    onToggle: (event: {
      expanded: nasl.core.Boolean;
    }) => any;
    /**
     * 插入`<u-form-item>`或`<u-form-divider>`子组件。
     */
    slotDefault: () => Array<ViewComponent>;
    /**
     * 自定义标题文本。
     */
    slotTitle: () => Array<ViewComponent>;
    /**
     * 在右侧可以附加内容。
     */
    slotExtra: () => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class UGallery<T> extends ViewComponent {
    /**
     * 数据
     */
    data: nasl.collection.List<T>;
    /**
     * 重新加载数据
     */
    reload(): void;
    constructor(options?: Partial<UGalleryOptions<T>>);
  }
  export class UGalleryOptions<T> extends ViewComponentOptions {
    /**
     * 数据源
     * 展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑
     */
    dataSource: nasl.collection.List<T> | {
      list: nasl.collection.List<T>;
      total: nasl.core.Integer;
    };
    /**
     * 数据类型
     * 集合类型每一元素的数据类型
     */
    dataSchema: T;
    /**
     * 画廊模式
     * 图片的显示模式，支持大图模式和缩略图模式。
     */
    pattern: 'small' | 'big';
    /**
     * 显示图片数
     */
    num: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 显示左右箭头
     */
    arrow: nasl.core.Boolean;
    /**
     * 加载前
     * 加载前触发
     */
    onBeforeLoad: (event: any) => any;
    /**
     * 加载后
     * 加载后触发
     */
    onLoad: (event: any) => any;
  }
}
declare namespace nasl.ui {
  export class UGridLayout extends ViewComponent {
    constructor(options?: Partial<UGridLayoutOptions>);
  }
  export class UGridLayoutOptions extends ViewComponentOptions {
    /**
     * 行间隔
     * 栅格行之间的间隔
     */
    gap: 'compact' | 'none' | 'small' | 'normal' | 'large';
    /**
     * 滚动时
     * 滚动时触发
     */
    onScroll: (event: {
      scrollTop: nasl.core.Integer;
      scrollLeft: nasl.core.Integer;
      scrollWidth: nasl.core.Integer;
      scrollHeight: nasl.core.Integer;
      clientWidth: nasl.core.Integer;
      clientHeight: nasl.core.Integer;
    }) => any;
    /**
     * 插入`<u-grid-layout-row>`或`<u-grid-layout-column>`子组件。
     */
    slotDefault: () => Array<ViewComponent>;
  }
  export class UGridLayoutRow extends ViewComponent {
    constructor(options?: Partial<UGridLayoutRowOptions>);
  }
  export class UGridLayoutRowOptions extends ViewComponentOptions {
    /**
     * 横轴对齐
     */
    justify: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
    /**
     * 纵轴对齐
     */
    alignment: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
    /**
     * 栅格数
     * 默认24，可设置栅格行大小
     */
    repeat: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 列间隔
     * 栅格列之间的间隔
     */
    gap: 'none' | 'mini' | 'small' | 'normal' | 'large' | 'huge';
    /**
     * 插入`<u-grid-layout-column>`子组件。
     */
    slotDefault: () => Array<ViewComponent>;
  }
  export class UGridLayoutColumn extends ViewComponent {
    constructor(options?: Partial<UGridLayoutColumnOptions>);
  }
  export class UGridLayoutColumnOptions extends ViewComponentOptions {
    private mediaHuge;
    private mediaLarge;
    private mediaMedium;
    private mediaSmall;
    private mediaMini;
    /**
     * 布局模式
     */
    mode: 'inline' | 'flex';
    /**
     * 主轴方向
     */
    direction: 'horizontal' | 'vertical';
    _justify: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
    /**
     * 纵轴对齐
     */
    alignment: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
    _alignment: 'start' | 'center' | 'end' | 'stretch';
    /**
     * 横轴对齐
     */
    justify: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
    /**
     * 占据栅格数
     * 列占据栅格行的栅格数
     */
    span: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 偏移栅格数
     * 列偏移的栅格数
     */
    offset: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 左移动栅格数
     * 列向左移动的栅格数
     */
    pull: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 右移动栅格数
     * 列向右移动的栅格数
     */
    push: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 换行
     * 设置弹性布局下子元素总宽度超出父级时子元素是否换行展示
     */
    wrap: nasl.core.Boolean;
    /**
     * 内容间隙
     * 内容块间隙大小
     */
    gap: 'shrink' | 'none' | 'small' | 'normal' | 'large';
    /**
     * 响应窗口变化时
     * 响应式布局引发栅格变化时触发
     */
    onResponsive: (event: any) => any;
    /**
     * 点击栅格列
     * 点击栅格列时触发
     */
    onClick: (event: {
      row: nasl.core.Integer;
      column: nasl.core.Integer;
    }) => any;
    /**
     * 插入需要布局的元素。
     */
    slotDefault: () => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class UGridView<T, V, P extends nasl.core.Boolean, M extends nasl.core.Boolean, C> extends ViewComponent {
    /**
     * 数据
     */
    data: nasl.collection.List<T>;
    /**
     * 数据总数
     */
    total: nasl.core.Integer;
    /**
     * 分页大小
     */
    size: UGridViewOptions<T, V, P, M, C>['pageSize'];
    /**
     * 当前页数
     */
    page: UGridViewOptions<T, V, P, M, C>['pageNumber'];
    /**
     * 排序属性
     */
    sort: nasl.core.String;
    /**
     * 排序方式
     */
    order: nasl.core.String;
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    /**
     * 只读
     */
    readonly: nasl.core.Boolean;
    /**
     * 清除缓存，重新加载
     */
    reload(): void;
    /**
     * 带页码刷新
     * 保持页码，重新加载
     * @param page - '要刷新的页数'
     */
    loadTo(page?: nasl.core.Integer): void;
    constructor(options?: Partial<UGridViewOptions<T, V, P, M, C>>);
  }
  export class UGridViewOptions<T, V, P extends nasl.core.Boolean, M extends nasl.core.Boolean, C> extends ViewComponentOptions {
    private value;
    private field;
    private cancelable;
    private multiple;
    private clearable;
    /**
     * 数据源
     * 展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑
     */
    dataSource: {
      list: nasl.collection.List<T>;
      total: nasl.core.Integer;
    } | nasl.collection.List<T>;
    /**
     * 数据类型
     * 数据源返回的数据结构的类型，自动识别类型进行展示说明
     */
    dataSchema: T;
    /**
     * 文本字段名
     * 选项文本的字段名
     */
    textField: (item: T) => any;
    /**
     * 值字段名
     * 选项值的字段名
     */
    valueField: (item: T) => V;
    /**
     * 分页
     * 设置是否分页展示数据
     */
    pageable: nasl.core.Boolean;
    /**
     * 默认每页条数
     */
    pageSize: nasl.core.Integer;
    /**
     * 当前页数
     * 当前默认展示在第几页
     */
    pageNumber: nasl.core.Integer;
    /**
     * 每页条数选项
     * 每页条数切换器的选项
     */
    pageSizeOptions: nasl.collection.List<nasl.core.Integer>;
    /**
     * 显示总条数
     */
    showTotal: nasl.core.Boolean;
    /**
     * 显示每页条数
     * 显示每页条数切换器
     */
    showSizer: nasl.core.Boolean;
    /**
     * 显示跳转输入
     * 显示页面跳转输入框
     */
    showJumper: nasl.core.Boolean;
    /**
     * 后端分页
     */
    remotePaging: nasl.core.Boolean;
    private remoteFiltering;
    private matchMethod;
    private caseSensitive;
    private placeholder;
    /**
     * 网格数
     * 每行排列几项
     */
    repeat: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 显示头部
     */
    showHead: nasl.core.Boolean;
    /**
     * 头部标题
     */
    title: nasl.core.String;
    /**
     * 显示底部
     */
    showFoot: nasl.core.Boolean;
    /**
     * 初始即加载
     * 设置初始时是否立即加载
     */
    initialLoad: nasl.core.Boolean;
    /**
     * 状态设置
     * 设置不同状态的展示内容
     */
    designerMode: 'success' | 'empty' | 'loading' | 'error';
    /**
     * 加载中文案
     * 加载中状态显示的提示文案
     */
    loadingText: nasl.core.String;
    /**
     * 自定义加载中触发条件
     * 支持自定义状态的触发条件，未设置则默认为系统定义条件
     */
    loading: nasl.core.Boolean;
    /**
     * 加载失败文案
     * 加载失败状态显示的提示文案
     */
    errorText: nasl.core.String;
    /**
     * 加载失败触发条件
     * 加载失败状态的触发条件，未设置则默认为系统定义条件
     */
    error: nasl.core.Boolean;
    /**
     * 暂无数据文案
     * 暂无数据状态显示的提示文案
     */
    emptyText: nasl.core.String;
    /**
     * 只读
     * 正常显示，但禁止选择/输入
     */
    readonly: nasl.core.Boolean;
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    private width;
    private height;
    /**
     * 选择前
     * 选择某一项前触发
     */
    onBeforeSelect: (event: {
      selected: nasl.core.Boolean;
      item: T;
      oldItem: T;
      value: V;
      oldValue: V;
      items: nasl.collection.List<T>;
      oldItems: nasl.collection.List<T>;
    }) => any;
    /**
     * 选择时
     * 选择某一项时触发
     */
    onInput: (event: V) => any;
    /**
     * 选择后
     * 选择某一项时触发。单选模式中：
     */
    onSelect: (event: {
      selected: nasl.core.Boolean;
      item: T;
      oldItem: T;
      value: V;
      oldValue: V;
      items: nasl.collection.List<T>;
      oldItems: nasl.collection.List<T>;
    }) => any;
    /**
     * 改变后
     * 选择值改变时触发。单选模式中：
     */
    onChange: (event: {
      item: T;
      oldItem: T;
      value: V;
      oldValue: V;
      items: nasl.collection.List<T>;
      oldItems: nasl.collection.List<T>;
      values: nasl.collection.List<V>;
    }) => any;
    /**
     * 加载前
     * 加载前触发
     */
    onBeforeLoad: (event: any) => any;
    /**
     * 加载后
     * 加载时触发
     */
    onLoad: (event: any) => any;
    /**
     * 插入文本或 HTML
     */
    slotDefault: () => Array<ViewComponent>;
    /**
     * 自定义选项的结构和样式
     */
    slotItem: (current: Current<T>) => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class UIframe extends ViewComponent {
    /**
     * 网页地址
     */
    src: UIframeOptions['src'];
    /**
     * 加载完成
     */
    loaded: nasl.core.Boolean;
    constructor(options?: Partial<UIframeOptions>);
  }
  export class UIframeOptions extends ViewComponentOptions {
    /**
     * 网页地址
     * 需要嵌入的网页地址
     */
    src: nasl.core.String;
    /**
     * 加载完成
     * 网页加载完成时触发。
     */
    onLoad: (event: any) => any;
  }
}
declare namespace nasl.ui {
  export class UImage extends ViewComponent {
    /**
     * 地址
     */
    src: UImageOptions['src'];
    /**
     * 默认图地址
     */
    placeholderSrc: UImageOptions['placeholderSrc'];
    /**
     * 预览状态
     */
    preview: nasl.core.Boolean;
    constructor(options?: Partial<UImageOptions>);
  }
  export class UImageOptions extends ViewComponentOptions {
    private convertSrcFn;
    /**
     * 地址
     */
    src: nasl.core.String;
    /**
     * 填充方式
     */
    fit: 'contain' | 'scale-down' | 'none' | 'fill' | 'cover';
    /**
     * 圆形遮罩
     */
    circle: nasl.core.Boolean;
    /**
     * 水平对齐方式
     */
    horizontalCenter: 'left' | 'center' | 'right';
    /**
     * 垂直对齐方式
     */
    verticalCenter: 'top' | 'center' | 'bottom';
    /**
     * 点击放大
     * 是否支持点击放大全屏展示
     */
    preview: nasl.core.Boolean;
    /**
     * 加载样式
     */
    loadingType: 'loading' | 'none' | 'placeholder';
    /**
     * 默认图地址
     */
    placeholderSrc: nasl.core.String;
    /**
     * 加载完成
     * 网页加载完成时触发
     */
    onLoad: (event: any) => any;
    /**
     * 点击
     * 在元素上按下并释放任意鼠标按钮时触发。
     */
    onClick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 双击
     * 在元素上双击鼠标按钮时触发。
     */
    onDblclick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 右键点击
     * 在右键菜单显示前触发。
     */
    onContextmenu: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标按下
     * 在元素上按下任意鼠标按钮时触发。
     */
    onMousedown: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标释放
     * 在元素上释放任意鼠标按钮时触发。
     */
    onMouseup: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标移入
     * 鼠标移入元素时触发。
     */
    onMouseenter: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标移出
     * 鼠标移出元素时触发。
     */
    onMouseleave: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
  }
}
declare namespace nasl.ui {
  export class UInfoList extends ViewComponent {
    constructor(options?: Partial<UInfoListOptions>);
  }
  export class UInfoListOptions extends ViewComponentOptions {
    /**
     * 列数
     * 整个详情列表的划分列数
     */
    repeat: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 显示表格头部
     * 是否显示表格头部
     */
    showHead: nasl.core.Boolean;
    /**
     * 列表项标题宽度
     * 设置详情列表所有列表项的标题宽度。
     */
    labelSize: 'auto' | 'small' | 'normal' | 'large';
    /**
     * 默认
     * 插入`<u-info-list-item>`或`<u-info-list-group>`子组件。
     */
    slotDefault: () => Array<ViewComponent>;
  }
  export class UInfoListItem extends ViewComponent {
    constructor(options?: Partial<UInfoListItemOptions>);
  }
  export class UInfoListItemOptions extends ViewComponentOptions {
    private label;
    /**
     * 占据数
     * 列跨越的格数
     */
    span: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 文本过长省略
     * 文字过长是否省略显示。默认文字超出时会换行。
     */
    ellipsis: nasl.core.Boolean;
    /**
     * 列表项标题宽度
     */
    labelSize: 'auto' | 'small' | 'normal' | 'large';
    /**
     * 默认
     * 插入文本或HTML。
     */
    slotDefault: () => Array<ViewComponent>;
    /**
     * 自定义标签内容
     * 用于自定义 label 内容。
     */
    slotLabel: () => Array<ViewComponent>;
  }
  export class UInfoListGroup extends ViewComponent {
    constructor(options?: Partial<UInfoListGroupOptions>);
  }
  export class UInfoListGroupOptions extends ViewComponentOptions {
    private title;
    /**
     * 列数
     * 当前组范围内的划分列数
     */
    repeat: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 列表项标题宽度
     * 设置详情列表组所有列表项的标题宽度。
     */
    labelSize: 'auto' | 'small' | 'normal' | 'large';
    /**
     * 默认
     * 插入`<u-info-list-item>`子组件
     */
    slotDefault: () => Array<ViewComponent>;
    /**
     * 自定义标题
     * 自定义标题。
     */
    slotTitle: () => Array<ViewComponent>;
    /**
     * 自定义额外操作项
     * 自定义额外操作项。
     */
    slotExtra: () => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class UInput extends ViewComponent {
    /**
     * 输入值
     */
    value: UInputOptions['value'];
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    /**
     * 只读
     */
    readonly: nasl.core.Boolean;
    /**
     * 预览
     */
    preview: nasl.core.Boolean;
    /**
     * 让输入框获取焦点。
     */
    focus(): void;
    /**
     * 让输入框失去焦点。
     */
    blur(): void;
    /**
     * 清空输入框。
     */
    clear(): void;
    constructor(options?: Partial<UInputOptions>);
  }
  export class UInputOptions extends ViewComponentOptions {
    private minlength;
    private spellcheck;
    private maxlengthMessage;
    /**
     * 类型
     * 文本框或者密码框
     */
    type: 'text' | 'password';
    /**
     * 值
     * 输入的值
     */
    value: nasl.core.String;
    /**
     * 空值为null
     * 清空值时是否设置为null
     */
    emptyValueIsNull: nasl.core.Boolean;
    /**
     * 占位符
     * 为空时显示的占位符文本
     */
    placeholder: nasl.core.String;
    /**
     * 最大字符数
     */
    maxlength: nasl.core.Integer;
    /**
     * 自动获取焦点
     * 设置是否自动获取焦点
     */
    autofocus: nasl.core.Boolean;
    /**
     * 前缀图标
     */
    prefix: nasl.core.String;
    /**
     * 后缀图标
     */
    suffix: nasl.core.String;
    /**
     * 可清除
     * 可点击清除按钮一键清除内容
     */
    clearable: nasl.core.Boolean;
    /**
     * 显示状态
     * 显示状态分为“True(显示)/False(隐藏)”，默认为“隐藏”
     */
    password: nasl.core.Boolean;
    /**
     * 只读
     * 正常显示，但禁止选择/输入
     */
    readonly: nasl.core.Boolean;
    /**
     * 预览
     * 显示预览态
     */
    preview: nasl.core.Boolean;
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 宽度
     * 设置单行输入框宽度大小
     */
    width: 'full' | 'huge' | 'large' | 'medium' | 'normal' | 'small' | 'mini';
    /**
     * 高度
     * 设置单行输入框高度大小
     */
    height: 'full' | 'huge' | 'large' | 'medium' | 'normal' | 'small' | 'mini';
    /**
     * 输入前
     * 输入前触发。可以在这个阶段阻止输入，或者修改输入的值 $event.value
     */
    onBeforeInput: (event: {
      value: nasl.core.String;
      oldValue: nasl.core.String;
    }) => any;
    /**
     * 输入时
     * 输入时触发。
     */
    onInput: (event: nasl.core.String) => any;
    /**
     * 改变后
     * 值变化时触发。（注意：与原生事件不同）
     */
    onChange: (event: {
      value: nasl.core.String;
      oldValue: nasl.core.String;
    }) => any;
    /**
     * 获得焦点
     * 获得焦点时触发。
     */
    onFocus: (event: {
      cancelBubble: nasl.core.Boolean;
      detail: nasl.core.String;
      layerX: nasl.core.Integer;
      layerY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 失去焦点
     * 失去焦点时触发。
     */
    onBlur: (event: {
      cancelBubble: nasl.core.Boolean;
      detail: nasl.core.String;
      layerX: nasl.core.Integer;
      layerY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 清空前
     * 清空前触发。
     */
    onBeforeClear: (event: {
      value: nasl.core.String;
      oldValue: nasl.core.String;
    }) => any;
    /**
     * 清空后
     * 清空后触发。
     */
    onClear: (event: {
      value: nasl.core.String;
      oldValue: nasl.core.String;
    }) => any;
    /**
     * 点击前缀图标
     * 点击前缀图标后触发
     */
    onClickPrefix: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 点击后缀图标
     * 点击后缀图标后触发
     */
    onClickSuffix: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 键盘按下
     * 键盘按键按下时触发
     */
    onKeydown: (event: KeyboardEvent) => any;
    /**
     * 键盘松开
     * 键盘按键松开时触发
     */
    onKeyup: (event: KeyboardEvent) => any;
    /**
     * 前缀图标
     * 前缀图标自定义
     */
    slotPrefix: () => Array<ViewComponent>;
    /**
     * 后缀图标
     * 后缀图标自定义
     */
    slotSuffix: () => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class ULabel extends ViewComponent {
    constructor(options?: Partial<ULabelOptions>);
  }
  export class ULabelOptions extends ViewComponentOptions {
    /**
     * 文本
     */
    text: nasl.core.String;
    /**
     * 样式类型
     * 设置标签样式，主要标签有背景，次要标签没有背景
     */
    type: 'filled' | 'line';
    /**
     * 主题颜色
     * 设置主题颜色样式
     */
    color: 'default' | 'primary' | 'success' | 'warning' | 'error';
    /**
     * 展示方式
     * 行内展示，或块级换行展示
     */
    display: 'inline' | 'block';
    /**
     * 可关闭
     * 设置标签是否可点击删除图标进行关闭
     */
    removable: nasl.core.Boolean;
    /**
     * 尺寸
     * 设置标签大小
     */
    size: 'small' | 'normal' | 'large' | 'huge';
    /**
     * 点击
     * 在元素上按下并释放任意鼠标按钮时触发。
     */
    onClick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 双击
     * 在元素上双击鼠标按钮时触发。
     */
    onDblclick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 右键点击
     * 在右键菜单显示前触发。
     */
    onContextmenu: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标按下
     * 在元素上按下任意鼠标按钮时触发。
     */
    onMousedown: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标释放
     * 在元素上释放任意鼠标按钮时触发。
     */
    onMouseup: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标移入
     * 鼠标移入元素时触发。
     */
    onMouseenter: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标移出
     * 鼠标移出元素时触发。
     */
    onMouseleave: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 删除前触发
     * 删除前触发
     */
    onBeforeRemove: (event: any) => any;
    /**
     * 删除时触发
     * 删除时触发
     */
    onRemove: (event: any) => any;
    /**
     * 默认
     * 插入文本或 HTML
     */
    slotDefault: () => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class ULinearLayout extends ViewComponent {
    /**
     * 打开加载中
     * 打开加载中
     */
    openLoading(): void;
    /**
     * 关闭加载中
     * 关闭加载中
     */
    closeLoading(): void;
    constructor(options?: Partial<ULinearLayoutOptions>);
  }
  export class ULinearLayoutOptions extends ViewComponentOptions {
    private display;
    private type;
    /**
     * 布局模式
     */
    mode: 'inline' | 'block' | 'flex';
    /**
     * 主轴方向
     */
    direction: 'horizontal' | 'vertical';
    /**
     * 横轴对齐
     */
    justify: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
    /**
     * 纵轴对齐
     */
    alignment: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
    _alignment: 'start' | 'center' | 'end' | 'stretch';
    _justify: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
    /**
     * 子元素展示方式
     * 子元素行内展示或块级换行展示
     */
    layout: 'none' | 'inline' | 'block';
    /**
     * 换行
     * 设置弹性布局下子元素总宽度超出父级时子元素是否换行展示
     */
    wrap: nasl.core.Boolean;
    /**
     * 加载中图标
     * 加载中状态显示的图标
     */
    loadingIcon: nasl.core.String;
    /**
     * 加载中图标旋转
     * 设置加载中图标是否旋转，默认开启。
     */
    loadingIconRotate: nasl.core.Boolean;
    /**
     * 加载中文案
     * 加载中状态显示的提示文案
     */
    loadingText: nasl.core.String;
    /**
     * 内容间隙
     * 内容块间隙大小
     */
    gap: 'shrink' | 'none' | 'small' | 'normal' | 'large';
    /**
     * 点击
     * 在元素上按下并释放任意鼠标按钮时触发。
     */
    onClick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 双击
     * 在元素上双击鼠标按钮时触发。
     */
    onDblclick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 右键点击
     * 在右键菜单显示前触发。
     */
    onContextmenu: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标按下
     * 在元素上按下任意鼠标按钮时触发。
     */
    onMousedown: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标释放
     * 在元素上释放任意鼠标按钮时触发。
     */
    onMouseup: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标移入
     * 鼠标移入元素时触发。
     */
    onMouseenter: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标移出
     * 鼠标移出元素时触发。
     */
    onMouseleave: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 滚动时
     * 滚动时触发
     */
    onScroll: (event: {
      scrollTop: nasl.core.Integer;
      scrollLeft: nasl.core.Integer;
      scrollWidth: nasl.core.Integer;
      scrollHeight: nasl.core.Integer;
      clientWidth: nasl.core.Integer;
      clientHeight: nasl.core.Integer;
    }) => any;
    /**
     * 默认
     * 内容
     */
    slotDefault: () => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class ULinearProgress extends ViewComponent {
    /**
     * 当前进度(%)
     */
    percent: UCircularProgressOptions['percent'];
    constructor(options?: Partial<ULinearProgressOptions>);
  }
  export class ULinearProgressOptions extends ViewComponentOptions {
    private range;
    /**
     * 当前进度(%)
     * 进度条显示的进度百分比，1-100之间的数字
     */
    percent: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 进度条方向
     */
    direction: 'horizontal' | 'vertical';
    /**
     * 尺寸
     * 进度条高度大小
     */
    size: 'small' | 'normal' | 'large' | 'huge';
    /**
     * 默认
     * 插入文本或HTML。
     */
    slotDefault: () => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class ULink extends ViewComponent {
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    constructor(options?: Partial<ULinkOptions>);
  }
  export class ULinkOptions extends ViewComponentOptions {
    private to;
    private replace;
    private append;
    private decoration;
    /**
     * 文本
     * 显示文本内容
     */
    text: nasl.core.String;
    /**
     * 主题颜色
     * 设置主题颜色样式
     */
    color: 'default' | 'light' | 'success' | 'warning' | 'danger';
    /**
     * 展示方式
     */
    display: 'inline' | 'block';
    /**
     * 链接类型
     */
    linkType: 'destination' | 'download';
    /**
     * 链接地址
     */
    hrefAndTo: nasl.core.String;
    /**
     * 链接打开方式
     * 链接跳转的打开方式，父级窗口和顶级窗口仅适用于iframe组件嵌套的情况，若不存在嵌套，则其打开方式同当前窗口。
     */
    target: '_blank' | '_self' | '_parent' | '_top';
    /**
     * 鼠标悬停效果
     * 鼠标悬停时的样式变化方式
     */
    hoverType: 'underline' | 'color';
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 点击
     * 在元素上按下并释放任意鼠标按钮时触发。
     */
    onClick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 双击
     * 在元素上双击鼠标按钮时触发。
     */
    onDblclick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 右键点击
     * 在右键菜单显示前触发。
     */
    onContextmenu: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标按下
     * 在元素上按下任意鼠标按钮时触发。
     */
    onMousedown: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标释放
     * 在元素上释放任意鼠标按钮时触发。
     */
    onMouseup: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标移入
     * 鼠标移入元素时触发。
     */
    onMouseenter: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标移出
     * 鼠标移出元素时触发。
     */
    onMouseleave: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 获得焦点
     * 获得焦点时触发。
     */
    onFocus: (event: {
      cancelBubble: nasl.core.Boolean;
      detail: nasl.core.String;
      layerX: nasl.core.Integer;
      layerY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 失去焦点
     * 失去焦点时触发。
     */
    onBlur: (event: {
      cancelBubble: nasl.core.Boolean;
      detail: nasl.core.String;
      layerX: nasl.core.Integer;
      layerY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 切换路由前
     * 使用 router 相关属性切换路由前触发
     */
    onBeforeNavigate: (event: {
      to: nasl.core.String;
      replace: nasl.core.Boolean;
      append: nasl.core.Boolean;
    }) => any;
    /**
     * 切换路由后
     * 使用 router 相关属性切换路由后触发
     */
    onNavigate: (event: {
      to: nasl.core.String;
      replace: nasl.core.Boolean;
      append: nasl.core.Boolean;
    }) => any;
  }
}
declare namespace nasl.ui {
  export class UListComponents<T> extends ViewComponent {
    /**
     * 数据
     */
    data: nasl.collection.List<T>;
    constructor(options?: Partial<UListComponentsOptions<T>>);
  }
  export class UListComponentsOptions<T> extends ViewComponentOptions {
    /**
     * 数据源
     * 展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑
     */
    dataSource: nasl.collection.List<T> | {
      list: nasl.collection.List<T>;
      total: nasl.core.Integer;
    };
    /**
     * 数据类型
     * 数据源返回的数据结构的类型，自动识别类型进行展示说明
     */
    dataSchema: T;
    /**
     * 唯一字段
     * 唯一字段，默认使用数据 index 作为唯一字段
     */
    idField: (item: T) => any;
    /**
     * 每行排列项数
     * 为空时默认为5
     */
    colnum: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 均分宽度
     * 设置是否均分宽度
     */
    equalWidth: nasl.core.Boolean;
    /**
     * 默认
     * 内容自定义
     */
    slotDefault: (current: Current<T>) => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class UListView<T, V, P extends nasl.core.Boolean, M extends nasl.core.Boolean, C> extends ViewComponent {
    /**
     * 数据
     */
    data: nasl.collection.List<T>;
    /**
     * 数据总数
     */
    total: nasl.core.Integer;
    /**
     * 分页大小
     */
    size: UListViewOptions<T, V, P, M, C>['pageSize'];
    /**
     * 当前页数
     */
    page: UListViewOptions<T, V, P, M, C>['pageNumber'];
    /**
     * 排序属性
     */
    sort: nasl.core.String;
    /**
     * 排序方式
     */
    order: nasl.core.String;
    /**
     * 过滤文本
     */
    filterText: nasl.core.String;
    /**
     * 值
     */
    value: UListViewOptions<T, V, P, M, C>['value'];
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    /**
     * 只读
     */
    readonly: nasl.core.Boolean;
    /**
     * 清除缓存，重新加载
     */
    reload(): void;
    /**
     * 带页码刷新
     * 保持页码，重新加载
     * @param page - '要刷新的页数'
     */
    loadTo(page?: nasl.core.Integer): void;
    constructor(options?: Partial<UListViewOptions<T, V, P, M, C>>);
  }
  export class UListViewOptions<T, V, P extends nasl.core.Boolean, M extends nasl.core.Boolean, C> extends ViewComponentOptions {
    /**
     * 数据源
     * 展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑
     */
    dataSource: {
      list: nasl.collection.List<T>;
      total: nasl.core.Integer;
    } | nasl.collection.List<T>;
    /**
     * 数据类型
     * 数据源返回的数据结构的类型，自动识别类型进行展示说明
     */
    dataSchema: T;
    /**
     * 分页
     * 设置是否分页展示数据
     */
    pageable: nasl.core.Boolean;
    /**
     * 默认每页条数
     */
    pageSize: nasl.core.Integer;
    /**
     * 当前页数
     * 当前默认展示在第几页
     */
    pageNumber: nasl.core.Integer;
    /**
     * 每页条数选项
     * 每页条数切换器的选项
     */
    pageSizeOptions: nasl.collection.List<nasl.core.Integer>;
    /**
     * 显示总条数
     */
    showTotal: nasl.core.Boolean;
    /**
     * 显示每页条数
     * 显示每页条数切换器
     */
    showSizer: nasl.core.Boolean;
    /**
     * 显示跳转输入
     * 显示页面跳转输入框
     */
    showJumper: nasl.core.Boolean;
    /**
     * 筛选
     * 设置是否可以筛选，开启将会显示搜索框。
     */
    filterable: nasl.core.Boolean;
    /**
     * 后端分页
     * 是否使用后端分页。
     */
    remotePaging: nasl.core.Boolean;
    private remoteFiltering;
    /**
     * 匹配方法
     * 筛选时的匹配方法
     */
    matchMethod: nasl.core.String;
    /**
     * 大小写敏感
     * 设置是否区分大小写
     */
    caseSensitive: nasl.core.Boolean;
    /**
     * 搜索框占位符
     * 搜搜框为空时显示的占位符文本
     */
    placeholder: nasl.core.String;
    /**
     * 选中值
     * 显示的值
     */
    value: M extends true ? (C extends '' ? nasl.collection.List<V> : nasl.core.String) : V;
    /**
     * 文本字段
     * 当开启可多选时，显示的选项文本字段名
     */
    textField: (item: T) => any;
    /**
     * 值字段
     * 当开启可多选时，选项值的字段
     */
    valueField: (item: T) => V;
    /**
     * 可取消
     * 与"可多选"属性对应，表示选中的行再点击时是否可以取消选中。默认关闭。
     */
    cancelable: nasl.core.Boolean;
    /**
     * 可多选
     * 设置是否可以多选行
     */
    multiple: M;
    /**
     * 可清除筛选
     * 可点击搜索框中的清除按钮一键清除内容
     */
    clearable: nasl.core.Boolean;
    /**
     * 显示头部
     */
    showHead: nasl.core.Boolean;
    /**
     * 列表标题
     */
    title: nasl.core.String;
    /**
     * 显示底部
     */
    showFoot: nasl.core.Boolean;
    /**
     * 初始即加载
     * 设置初始时是否立即加载
     */
    initialLoad: nasl.core.Boolean;
    /**
     * 加载状态设置
     * 设置不同加载状态的展示内容
     */
    designerMode: 'success' | 'empty' | 'loading' | 'error';
    /**
     * 加载中文案
     * 加载中状态显示的文案
     */
    loadingText: nasl.core.String;
    /**
     * 自定义加载中触发条件
     * 支持自定义状态的触发条件，未设置则默认为系统定义条件
     */
    loading: nasl.core.Boolean;
    /**
     * 加载失败文案
     * 加载失败状态显示的提示文案
     */
    errorText: nasl.core.String;
    /**
     * 加载失败触发条件
     * 加载失败状态的触发条件，未设置则默认为系统定义条件
     */
    error: nasl.core.Boolean;
    /**
     * 暂无数据文案
     * 暂无数据状态显示的提示文案
     */
    emptyText: nasl.core.String;
    /**
     * 只读
     * 正常显示，但禁止选择/输入
     */
    readonly: nasl.core.Boolean;
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 显示边框
     */
    border: nasl.core.Boolean;
    /**
     * 宽度
     * 设置数据列表宽度大小
     */
    width: 'full' | 'huge' | 'large' | 'normal' | 'auto';
    /**
     * 高度
     * 设置数据列表高度大小
     */
    height: 'full' | 'huge' | 'large' | 'normal' | 'auto';
    /**
     * 选择前
     * 选择某一项前触发
     */
    onBeforeSelect: (event: {
      selected: nasl.core.Boolean;
      item: T;
      oldItem: T;
      value: V;
      oldValue: V;
      items: nasl.collection.List<T>;
      oldItems: nasl.collection.List<T>;
    }) => any;
    /**
     * 选择时
     * 选择某一项时触发
     */
    onInput: (event: V) => any;
    /**
     * 选择后
     * 选择某一项时触发。单选模式中：
     */
    onSelect: (event: {
      selected: nasl.core.Boolean;
      item: T;
      oldItem: T;
      value: V;
      oldValue: V;
      items: nasl.collection.List<T>;
      oldItems: nasl.collection.List<T>;
    }) => any;
    /**
     * 改变后
     * 选择值改变时触发。
     */
    onChange: (event: {
      item: T;
      oldItem: T;
      value: V;
      oldValue: V;
      items: nasl.collection.List<T>;
      oldItems: nasl.collection.List<T>;
      values: nasl.collection.List<V>;
    }) => any;
    /**
     * 加载前
     * 加载前触发
     */
    onBeforeLoad: (event: any) => any;
    /**
     * 加载后
     * 加载时触发
     */
    onLoad: (event: any) => any;
    /**
     * 默认
     * 插入文本或 HTML
     */
    slotDefault: () => Array<ViewComponent>;
    /**
     * 空状态时显示的内容
     */
    slotEmpty: () => Array<ViewComponent>;
    /**
     * 项
     * 自定义选项的结构和样式
     */
    slotItem: (current: Current<T>) => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class UModal extends ViewComponent {
    /**
     * 显示状态
     */
    visible: nasl.core.Boolean;
    /**
     * 打开弹窗
     */
    open(): void;
    /**
     * 关闭弹窗
     */
    close(): void;
    constructor(options?: Partial<UModalOptions>);
  }
  export class UModalOptions extends ViewComponentOptions {
    private title;
    private content;
    private description;
    private okButton;
    private cancelButton;
    private static;
    /**
     * 显示头部栏
     */
    showHead: nasl.core.Boolean;
    /**
     * 显示底部栏
     */
    showFoot: nasl.core.Boolean;
    /**
     * 提示图标
     */
    icon: '' | 'success' | 'warning' | 'error';
    /**
     * 点击遮罩关闭
     * 点击遮罩关闭弹窗
     */
    maskClose: nasl.core.Boolean;
    /**
     * 显示状态
     * 显示状态分为“True(打开)/False(关闭)”，默认为“打开”
     */
    visible: nasl.core.Boolean;
    /**
     * 尺寸
     * 弹窗的尺寸
     */
    size: 'small' | 'normal' | 'large' | 'huge' | 'auto';
    /**
     * 打开前
     * 打开弹窗前触发
     */
    onBeforeOpen: (event: any) => any;
    /**
     * 打开后
     * 打开弹窗后触发
     */
    onOpen: (event: any) => any;
    /**
     * 关闭前
     * 关闭弹窗前触发
     */
    onBeforeClose: (event: any) => any;
    /**
     * 关闭后
     * 关闭弹窗时触发
     */
    onClose: (event: {
      ok: nasl.core.Boolean;
    }) => any;
    /**
     * 弹窗标题自定义
     */
    slotTitle: () => Array<ViewComponent>;
    /**
     * 弹窗头部自定义
     */
    slotHead: () => Array<ViewComponent>;
    /**
     * 弹窗中部自定义
     */
    slotBody: () => Array<ViewComponent>;
    /**
     * 弹窗尾部自定义
     */
    slotFoot: () => Array<ViewComponent>;
    /**
     * 弹框小标题自定义
     */
    slotHeading: () => Array<ViewComponent>;
    /**
     * 默认
     * 弹窗内容自定义
     */
    slotDefault: () => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class UMultiLayout extends ViewComponent {
    constructor(options?: Partial<UMultiLayoutOptions>);
  }
  export class UMultiLayoutOptions extends ViewComponentOptions {
    /**
     * 主轴方向
     */
    direction: 'horizontal' | 'vertical';
    /**
     * 横轴对齐
     */
    justify: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
    /**
     * 纵轴对齐
     */
    alignment: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
    _alignment: 'start' | 'center' | 'end' | 'stretch';
    _justify: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
    /**
     * 内容间隙
     * 布局中各分栏间的空隙大小
     */
    gap: 'shrink' | 'none' | 'small' | 'normal' | 'large';
    /**
     * 滚动时
     * 滚动时触发
     */
    onScroll: (event: {
      scrollTop: nasl.core.Integer;
      scrollLeft: nasl.core.Integer;
      scrollWidth: nasl.core.Integer;
      scrollHeight: nasl.core.Integer;
      clientWidth: nasl.core.Integer;
      clientHeight: nasl.core.Integer;
    }) => any;
    /**
     * 点击
     * 在元素上按下并释放任意鼠标按钮时触发。
     */
    onClick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 双击
     * 在元素上双击鼠标按钮时触发。
     */
    onDblclick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 右键点击
     * 在右键菜单显示前触发。
     */
    onContextmenu: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标按下
     * 在元素上按下任意鼠标按钮时触发。
     */
    onMousedown: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标释放
     * 在元素上释放任意鼠标按钮时触发。
     */
    onMouseup: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标移入
     * 鼠标移入元素时触发。
     */
    onMouseenter: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标移出
     * 鼠标移出元素时触发。
     */
    onMouseleave: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 插入`<u-multi-layout-item>`子组件。
     */
    slotDefault: () => Array<ViewComponent>;
  }
  export class UMultiLayoutItem extends ViewComponent {
    constructor(options?: Partial<UMultiLayoutItemOptions>);
  }
  export class UMultiLayoutItemOptions extends ViewComponentOptions {
    private fixed;
    private fixdirec;
    private display;
    /**
     * 布局模式
     */
    mode: 'inline' | 'flex';
    /**
     * 主轴方向
     * 可更改布局的排列方向
     */
    direction: 'horizontal' | 'vertical';
    /**
     * 横轴对齐
     */
    justify: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
    /**
     * 纵轴对齐
     */
    alignment: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
    _alignment: 'start' | 'center' | 'end' | 'stretch';
    _justify: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
    /**
     * 内容间隙
     * 内容块间隙大小
     */
    gap: 'shrink' | 'none' | 'small' | 'normal' | 'large';
    /**
     * 点击
     * 在元素上按下并释放任意鼠标按钮时触发。
     */
    onClick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 双击
     * 在元素上双击鼠标按钮时触发。
     */
    onDblclick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 右键点击
     * 在右键菜单显示前触发。
     */
    onContextmenu: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标按下
     * 在元素上按下任意鼠标按钮时触发。
     */
    onMousedown: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标释放
     * 在元素上释放任意鼠标按钮时触发。
     */
    onMouseup: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标移入
     * 鼠标移入元素时触发。
     */
    onMouseenter: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标移出
     * 鼠标移出元素时触发。
     */
    onMouseleave: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 默认
     * 内容
     */
    slotDefault: () => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class UNavbarMulti<T, V> extends ViewComponent {
    /**
     * 数据
     */
    data: nasl.collection.List<T>;
    /**
     * 选中值
     */
    value: UNavbarMultiOptions<T, V>['value'];
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    /**
     * 只读
     */
    readonly: nasl.core.Boolean;
    constructor(options?: Partial<UNavbarMultiOptions<T, V>>);
  }
  export class UNavbarMultiOptions<T, V> extends ViewComponentOptions {
    /**
     * 数据源配置
     */
    hasDataSource: nasl.core.Boolean;
    /**
     * 数据源
     * 展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。
     */
    dataSource: nasl.collection.List<T> | {
      list: nasl.collection.List<T>;
      total: nasl.core.Integer;
    };
    /**
     * 数据类型
     * 数据源返回的数据结构的类型，自动识别类型进行展示说明
     */
    dataSchema: T;
    /**
     * 文本字段
     * 集合的元素类型中，用于显示文本的属性名称
     */
    textField: (item: T) => any;
    /**
     * 值字段
     * 集合的元素类型中，用于标识选中值的属性
     */
    valueField: (item: T) => V;
    /**
     * 图标属性字段
     * 集合的元素类型中，用于图标的属性名称
     */
    iconField: (item: T) => any;
    /**
     * 跳转链接字段
     * 集合的元素类型中，用于跳转链接的属性名称
     */
    toField: (item: T) => any;
    /**
     * 父级值字段
     * 集合的元素类型中，用于标识父节点的属性
     */
    parentField: (item: T) => any;
    /**
     * 使用路由
     * 是否根据 vue-router 来控制选择项
     */
    router: nasl.core.Boolean;
    /**
     * 选中值
     * 当前选中的值
     */
    value: V;
    private field;
    /**
     * 只读
     * 正常显示，但禁止选择/输入
     */
    readonly: nasl.core.Boolean;
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 选择后
     * 选择某一项后触发。
     */
    onSelect: (event: {
      selected: nasl.core.Boolean;
      item: T;
      oldItem: T;
      value: V;
      oldValue: V;
    }) => any;
    /**
     * 默认
     * 插入`<u-navbar-multi>`子组件。
     */
    slotDefault: () => Array<ViewComponent>;
    /**
     * 左侧导航
     * 内容自定义
     */
    slotLeft: () => Array<ViewComponent>;
    /**
     * 右侧导航
     * 内容自定义
     */
    slotRight: () => Array<ViewComponent>;
  }
  export class UNavbarItemMulti extends ViewComponent {
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    constructor(options?: Partial<UNavbarItemMultiOptions>);
  }
  export class UNavbarItemMultiOptions extends ViewComponentOptions {
    private text;
    private item;
    private to;
    private replace;
    private exact;
    /**
     * 值
     * 用于标识此项的值
     */
    value: nasl.core.String;
    /**
     * 图标
     */
    icon: nasl.core.String;
    /**
     * 链接类型
     */
    linkType: 'destination' | 'download';
    /**
     * 链接地址
     */
    hrefAndTo: nasl.core.String;
    /**
     * 链接打开方式
     * 链接跳转的打开方式，父级窗口和顶级窗口仅适用于iframe组件嵌套的情况，若不存在嵌套，则其打开方式同当前窗口。
     */
    target: '_blank' | '_self' | '_parent' | '_top';
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 点击
     * 在元素上按下并释放任意鼠标按钮时触发。
     */
    onClick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 双击
     * 在元素上双击鼠标按钮时触发。
     */
    onDblclick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 右键点击
     * 在右键菜单显示前触发。
     */
    onContextmenu: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标按下
     * 在元素上按下任意鼠标按钮时触发。
     */
    onMousedown: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标释放
     * 在元素上释放任意鼠标按钮时触发。
     */
    onMouseup: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标移入
     * 鼠标移入元素时触发。
     */
    onMouseenter: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标移出
     * 鼠标移出元素时触发。
     */
    onMouseleave: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 获得焦点
     * 获得焦点时触发。
     */
    onFocus: (event: {
      cancelBubble: nasl.core.Boolean;
      detail: nasl.core.String;
      layerX: nasl.core.Integer;
      layerY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 失去焦点
     * 失去焦点时触发。
     */
    onBlur: (event: {
      cancelBubble: nasl.core.Boolean;
      detail: nasl.core.String;
      layerX: nasl.core.Integer;
      layerY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 切换路由后
     * 使用 router 相关属性切换路由后触发
     */
    onNavigate: (event: {
      to: nasl.core.String;
      replace: nasl.core.Boolean;
      append: nasl.core.Boolean;
    }) => any;
    /**
     * 默认
     * 导航栏项的内容
     */
    slotDefault: () => Array<ViewComponent>;
  }
  export class UNavbarDividerMulti extends ViewComponent {
    constructor(options?: Partial<UNavbarDividerMultiOptions>);
  }
  export class UNavbarDividerMultiOptions extends ViewComponentOptions {}
  export class UNavbarDropdownMulti extends ViewComponent {
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    constructor(options?: Partial<UNavbarDropdownMultiOptions>);
  }
  export class UNavbarDropdownMultiOptions extends ViewComponentOptions {
    /**
     * 弹出方向
     * 弹出层的弹出方向
     */
    placement: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end';
    /**
     * 触发方式
     */
    trigger: 'click' | 'hover' | 'right-click' | 'double-click' | 'manual';
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
  }
  export class UNavbarMenuMulti extends ViewComponent {
    constructor(options?: Partial<UNavbarMenuMultiOptions>);
  }
  export class UNavbarMenuMultiOptions extends ViewComponentOptions {}
  export class UNavbarMenuGroupMulti extends ViewComponent {
    constructor(options?: Partial<UNavbarMenuGroupMultiOptions>);
  }
  export class UNavbarMenuGroupMultiOptions extends ViewComponentOptions {}
  export class UNavbarMenuItemMulti extends ViewComponent {
    constructor(options?: Partial<UNavbarMenuItemMultiOptions>);
  }
  export class UNavbarMenuItemMultiOptions extends ViewComponentOptions {}
  export class UNavbarMenuDividerMulti extends ViewComponent {
    constructor(options?: Partial<UNavbarMenuDividerMultiOptions>);
  }
  export class UNavbarMenuDividerMultiOptions extends ViewComponentOptions {}
  export class UNavbarSelectMulti extends ViewComponent {
    constructor(options?: Partial<UNavbarSelectMultiOptions>);
  }
  export class UNavbarSelectMultiOptions extends ViewComponentOptions {}
  export class UNavbarSelectGroupMulti extends ViewComponent {
    constructor(options?: Partial<UNavbarSelectGroupMultiOptions>);
  }
  export class UNavbarSelectGroupMultiOptions extends ViewComponentOptions {}
  export class UNavbarSelectItemMulti extends ViewComponent {
    constructor(options?: Partial<UNavbarSelectItemMultiOptions>);
  }
  export class UNavbarSelectItemMultiOptions extends ViewComponentOptions {}
  export class UNavbarSelectDividerMulti extends ViewComponent {
    constructor(options?: Partial<UNavbarSelectDividerMultiOptions>);
  }
  export class UNavbarSelectDividerMultiOptions extends ViewComponentOptions {}
  export class UNavbarGroupMulti extends ViewComponent {
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    constructor(options?: Partial<UNavbarGroupMultiOptions>);
  }
  export class UNavbarGroupMultiOptions extends ViewComponentOptions {
    private title;
    /**
     * 可折叠
     * 设置是否可以展开/折叠
     */
    collapsible: nasl.core.Boolean;
    /**
     * 触发方式
     */
    trigger: 'click' | 'hover' | 'right-click' | 'double-click';
    /**
     * 展开状态
     * 展开状态分为“True(展开)/False(折叠)”，默认为“展开”
     */
    expanded: nasl.core.Boolean;
    /**
     * 禁用展开/折叠
     * 置灰显示，且禁止展开/折叠操作
     */
    disabled: nasl.core.Boolean;
    /**
     * 默认
     * 插入`<u-navbar-multi>`子组件。
     */
    slotDefault: () => Array<ViewComponent>;
    /**
     * 标题
     * 标题自定义
     */
    slotTitle: () => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class UNavbar extends ViewComponent {
    constructor(options?: Partial<UNavbarOptions>);
  }
  export class UNavbarOptions extends ViewComponentOptions {
    /**
     * 使用路由
     * 是否根据 vue-router 来控制选择项
     */
    router: nasl.core.Boolean;
    /**
     * 值
     * 当前选择的值
     */
    value: nasl.core.String;
    private field;
    /**
     * 只读
     * 是否只读
     */
    readonly: nasl.core.Boolean;
    /**
     * 禁用
     * 是否禁用
     */
    disabled: nasl.core.Boolean;
    /**
     * 点击
     * 点击此项时触发，与原生 click 事件不同的是，它只会在非只读和禁用的情况下触发。
     */
    onClick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 输入前
     * 选择某一项前触发
     */
    onBeforeSelect: (event: {
      value: nasl.core.String;
      oldValue: nasl.core.String;
      selectedItem: any;
      item: any;
      oldItem: any;
    }) => any;
    /**
     * 输入时
     * 选择某一项时触发
     */
    onInput: (event: nasl.core.String) => any;
    /**
     * 选择后
     * 选择某一项时触发
     */
    onSelect: (event: {
      value: nasl.core.String;
      oldValue: nasl.core.String;
      selectedItem: any;
      item: any;
      oldItem: any;
    }) => any;
    /**
     * 改变后
     * 选择值改变时触发
     */
    onChange: (event: {
      value: nasl.core.String;
      oldValue: nasl.core.String;
      selectedItem: any;
      item: any;
      oldItem: any;
    }) => any;
    /**
     * 链接区域
     * 链接区域
     */
    slotDefault: () => Array<ViewComponent>;
    /**
     * 左部区域
     * 左部区域，一般放置 logo 等
     */
    slotLeft: () => Array<ViewComponent>;
    /**
     * 右部区域
     * 右部区域，一般放置用户个人信息等
     */
    slotRight: () => Array<ViewComponent>;
  }
  export class UNavbarItem extends ViewComponent {
    constructor(options?: Partial<UNavbarItemOptions>);
  }
  export class UNavbarItemOptions extends ViewComponentOptions {
    /**
     * 文本
     * 文本内容
     */
    text: nasl.core.String;
    /**
     * 值
     * 此项的值
     */
    value: any;
    /**
     * 图标
     * 图标
     */
    icon: nasl.core.String;
    /**
     * 禁用
     * 禁用此项
     */
    disabled: nasl.core.Boolean;
    private item;
    /**
     * 链接类型
     * 链接类型
     */
    linkType: 'destination' | 'download';
    /**
     * 链接
     * 链接地址
     */
    hrefAndTo: nasl.core.String;
    /**
     * 打开方式
     * 链接跳转方式
     */
    target: '_blank' | '_self' | '_parent' | '_top';
    private to;
    private replace;
    private exact;
    /**
     * 选择前
     * 选择此项前触发
     */
    onBeforeSelect: (event: {
      value: nasl.core.String;
      oldValue: nasl.core.String;
      selectedItem: any;
      item: any;
      oldItem: any;
    }) => any;
    /**
     * 导航前
     * 使用 router 相关属性切换路由前触发
     */
    onBeforeNavigate: (event: {
      to: nasl.core.String;
      replace: nasl.core.Boolean;
      append: nasl.core.Boolean;
    }) => any;
    /**
     * 导航
     * 使用router相关属性切换路由时触发
     */
    onNavigate: (event: {
      to: nasl.core.String;
      replace: nasl.core.Boolean;
      append: nasl.core.Boolean;
    }) => any;
    /**
     * 默认
     * 导航项自定义
     */
    slotDefault: () => Array<ViewComponent>;
  }
  export class UNavbarDivider extends ViewComponent {
    constructor(options?: Partial<UNavbarDividerOptions>);
  }
  export class UNavbarDividerOptions extends ViewComponentOptions {}
  export class UNavbarDropdown extends ViewComponent {
    constructor(options?: Partial<UNavbarDropdownOptions>);
  }
  export class UNavbarDropdownOptions extends ViewComponentOptions {
    /**
     * 触发方式
     * 触发方式
     */
    trigger: 'click' | 'hover' | 'right-click' | 'double-click' | 'manual';
    /**
     * 弹出位置
     * 弹出方位
     */
    placement: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end';
    /**
     * 禁用
     * 是否禁用
     */
    disabled: nasl.core.Boolean;
    /**
     * 默认
     * 插入文本或 HTML
     */
    slotDefault: () => Array<ViewComponent>;
    /**
     * 标题
     * 插入文本或 HTML
     */
    slotTitle: () => Array<ViewComponent>;
  }
  export class UNavbarMenu extends ViewComponent {
    constructor(options?: Partial<UNavbarMenuOptions>);
  }
  export class UNavbarMenuOptions extends ViewComponentOptions {
    /**
     * 默认
     * 插入文本或 HTML
     */
    slotDefault: () => Array<ViewComponent>;
  }
  export class UNavbarMenuGroup extends ViewComponent {
    constructor(options?: Partial<UNavbarMenuGroupOptions>);
  }
  export class UNavbarMenuGroupOptions extends ViewComponentOptions {}
  export class UNavbarMenuItem extends ViewComponent {
    constructor(options?: Partial<UNavbarMenuItemOptions>);
  }
  export class UNavbarMenuItemOptions extends ViewComponentOptions {
    /**
     * 点击
     * 在元素上按下并释放任意鼠标按钮时触发。
     */
    onClick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 默认
     * 插入文本或 HTML
     */
    slotDefault: () => Array<ViewComponent>;
  }
  export class UNavbarMenuDivider extends ViewComponent {
    constructor(options?: Partial<UNavbarMenuDividerOptions>);
  }
  export class UNavbarMenuDividerOptions extends ViewComponentOptions {}
  export class UNavbarSelect extends ViewComponent {
    constructor(options?: Partial<UNavbarSelectOptions>);
  }
  export class UNavbarSelectOptions extends ViewComponentOptions {}
  export class UNavbarSelectGroup extends ViewComponent {
    constructor(options?: Partial<UNavbarSelectGroupOptions>);
  }
  export class UNavbarSelectGroupOptions extends ViewComponentOptions {}
  export class UNavbarSelectItem extends ViewComponent {
    constructor(options?: Partial<UNavbarSelectItemOptions>);
  }
  export class UNavbarSelectItemOptions extends ViewComponentOptions {}
  export class UNavbarSelectDivider extends ViewComponent {
    constructor(options?: Partial<UNavbarSelectDividerOptions>);
  }
  export class UNavbarSelectDividerOptions extends ViewComponentOptions {}
}
declare namespace nasl.ui {
  export class UNumberInput extends ViewComponent {
    /**
     * 值
     */
    value: UNumberInputOptions['value'];
    /**
     * 格式化后的值
     */
    formattedValue: nasl.core.String;
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    /**
     * 只读
     */
    readonly: nasl.core.Boolean;
    /**
     * 预览
     */
    preview: nasl.core.Boolean;
    constructor(options?: Partial<UNumberInputOptions>);
  }
  export class UNumberInputOptions extends ViewComponentOptions {
    private formatter;
    /**
     * 值
     * 输入的值
     */
    value: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 最小值
     * 最小可输入的值
     */
    min: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 最大值
     * 最大可输入的值
     */
    max: nasl.core.Decimal | nasl.core.Integer;
    private precision;
    /**
     * 精度
     * 控制数据存储时小数点后保留几位。例如：精度为2，则数据存储时小数点后保留2位。
     */
    decimalLength: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 小数位数
     * 控制数据展示时小数点后保留几位，仅影响展示，不影响数据实际存储的值。例如：小数位数为2，则数据展示时小数点后保留2位。
     */
    decimalPlacesValue: nasl.core.Integer;
    /**
     * 隐藏末尾0
     * 控制数据展示时最后一个是否展示0，仅影响展示，不影响数据实际存储的值。
     */
    decimalPlacesOmitZero: nasl.core.Boolean;
    /**
     * 千位符
     */
    thousandths: nasl.core.Boolean;
    /**
     * 百分号
     */
    percentSign: nasl.core.Boolean;
    /**
     * 单位显示位置
     * 输入框中显示的单位
     */
    unitType: 'prefix' | 'suffix';
    /**
     * 单位
     * 输入框中显示的单位
     */
    unitValue: nasl.core.String;
    /**
     * 高级格式化
     * 用来控制数字的展示格式
     */
    advancedFormatEnable: nasl.core.Boolean;
    /**
     * 高级格式化内容
     * 用来控制数字的展示格式
     */
    advancedFormatValue: nasl.core.String;
    /**
     * 占位符
     * 为空时显示的占位符文本
     */
    placeholder: nasl.core.String;
    /**
     * 自动获取焦点
     * 设置是否自动获取焦点
     */
    autofocus: nasl.core.Boolean;
    /**
     * 隐藏按钮
     * 是否隐藏上下点击按钮
     */
    hideButtons: nasl.core.Boolean;
    /**
     * 可清除
     * 可点击清除按钮一键清除内容
     */
    clearable: nasl.core.Boolean;
    /**
     * 只读
     * 正常显示，但禁止选择/输入
     */
    readonly: nasl.core.Boolean;
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 预览
     * 显示预览态
     */
    preview: nasl.core.Boolean;
    /**
     * 间隔
     * 间隔，表示点击按钮或按上下键所增加或减少的量
     */
    step: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 宽度
     * 设置数字输入框宽度大小
     */
    width: 'full' | 'huge' | 'large' | 'medium' | 'normal' | 'small' | 'mini';
    /**
     * 高度
     * 设置数字输入框高度大小
     */
    height: 'full' | 'huge' | 'large' | 'medium' | 'normal' | 'small' | 'mini';
    /**
     * 输入时
     * 输入时触发
     */
    onInput: (event: nasl.core.String) => any;
    /**
     * 验证时
     * 输入验证时触发
     */
    onValidate: (event: {
      trigger: nasl.core.String;
      valid: nasl.core.Boolean;
      triggerValid: nasl.core.Boolean;
      touched: nasl.core.Boolean;
      dirty: nasl.core.Boolean;
      firstError: nasl.core.String;
      value: nasl.core.String;
      oldValue: nasl.core.String;
    }) => any;
    /**
     * 改变后
     * 值变化时触发（与原生事件不同）
     */
    onChange: (event: {
      value: nasl.core.Decimal | nasl.core.Integer;
      oldValue: nasl.core.Decimal | nasl.core.Integer;
      formattedValue: nasl.core.String;
      valid: nasl.core.Boolean;
    }) => any;
    /**
     * 聚焦后
     * 获得焦点时触发
     */
    onFocus: (event: {
      cancelBubble: nasl.core.Boolean;
      detail: nasl.core.String;
      layerX: nasl.core.Integer;
      layerY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 失焦后
     * 失去焦点时触发
     */
    onBlur: (event: {
      cancelBubble: nasl.core.Boolean;
      detail: nasl.core.String;
      layerX: nasl.core.Integer;
      layerY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 键盘按下
     * 键盘按键按下时触发
     */
    onKeydown: (event: KeyboardEvent) => any;
    /**
     * 键盘松开
     * 键盘按键松开时触发
     */
    onKeyup: (event: KeyboardEvent) => any;
    /**
     * 默认
     * 插入 HTML 或 `Component`, 可展示额外内容。
     */
    slotDefault: () => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class UPagination extends ViewComponent {
    /**
     * 分页大小
     */
    size: UPaginationOptions['pageSize'];
    /**
     * 当前页数
     */
    page: UPaginationOptions['page'];
    /**
     * 总页数
     */
    totalPage: nasl.core.Integer;
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    /**
     * 只读
     */
    readonly: nasl.core.Boolean;
    constructor(options?: Partial<UPaginationOptions>);
  }
  export class UPaginationOptions extends ViewComponentOptions {
    /**
     * 当前页数
     * 当前默认展示在第几页
     */
    page: nasl.core.Integer;
    /**
     * 总页数
     */
    total: nasl.core.Integer;
    /**
     * 两端页码数量
     * 当页数多时，两端恒定显示的页码数量
     */
    side: nasl.core.Integer;
    /**
     * 中间页码数量
     * 当页数多时，中间恒定显示的页码数量
     */
    around: nasl.core.Integer;
    /**
     * 总条数
     */
    totalItems: nasl.core.Integer;
    /**
     * 默认每页条数
     */
    pageSize: nasl.core.Integer;
    /**
     * 每页条数选项
     * 每页条数切换器的选项
     */
    pageSizeOptions: nasl.collection.List<nasl.core.Integer>;
    /**
     * 显示总条数
     */
    showTotal: nasl.core.Boolean;
    /**
     * 显示每页条数
     * 显示每页条数切换器
     */
    showSizer: nasl.core.Boolean;
    /**
     * 显示跳转输入
     * 显示页面跳转输入框
     */
    showJumper: nasl.core.Boolean;
    /**
     * 只读
     * 正常显示，但禁止选择/输入
     */
    readonly: nasl.core.Boolean;
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 选择前
     * 选择分页前触发
     */
    onBeforeSelect: (event: {
      page: nasl.core.Integer;
      oldPage: nasl.core.Integer;
    }) => any;
    /**
     * 选择后
     * 选择分页时触发
     */
    onSelect: (event: {
      page: nasl.core.Integer;
      oldPage: nasl.core.Integer;
    }) => any;
    /**
     * 改变后
     * 页码改变时触发
     */
    onChange: (event: {
      page: nasl.core.Integer;
      oldPage: nasl.core.Integer;
    }) => any;
    /**
     * 条数改变后
     * 每页条数改变时触发
     */
    onChangePageSize: (event: {
      page: nasl.core.Integer;
      oldPage: nasl.core.Integer;
      pageSizeOptions: nasl.collection.List<nasl.core.Integer>;
    }) => any;
    /**
     * 总数
     * 总数自定义
     */
    slotTotal: () => Array<ViewComponent>;
    /**
     * 上一页
     * 上一页自定义
     */
    slotPrev: () => Array<ViewComponent>;
    /**
     * 下一页
     * 下一页自定义
     */
    slotNext: () => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class UPanel extends ViewComponent {
    constructor(options?: Partial<UPanelOptions>);
  }
  export class UPanelOptions extends ViewComponentOptions {
    private content;
    private title;
    /**
     * 显示边框
     * 设置是否显示边框
     */
    bordered: nasl.core.Boolean;
    /**
     * 阴影
     * 阴影显示方式
     */
    shadow: 'always' | 'hover' | 'never';
    /**
     * 默认
     * 插入`<u-panel-group>`子组件。
     */
    slotDefault: () => Array<ViewComponent>;
    /**
     * 标题
     * 标题自定义
     */
    slotTitle: () => Array<ViewComponent>;
    /**
     * 额外信息
     * 额外信息自定义
     */
    slotExtra: () => Array<ViewComponent>;
  }
  export class UPanelGroup extends ViewComponent {
    constructor(options?: Partial<UPanelGroupOptions>);
  }
  export class UPanelGroupOptions extends ViewComponentOptions {
    /**
     * 标题
     * 面板项的标题
     */
    title: nasl.core.String;
    /**
     * 插入默认的元素
     */
    slotDefault: () => Array<ViewComponent>;
    /**
     * 标题
     * 标题自定义
     */
    slotTitle: () => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class UPopupCombination extends ViewComponent {
    /**
     * 打开
     */
    opened: nasl.core.Boolean;
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    /**
     * 弹出实例。
     */
    open(): void;
    /**
     * 关闭实例。
     */
    close(): void;
    /**
     * 切换弹出/关闭状态。
     * @param opened - '可选。弹出/关闭状态'
     */
    toggle(opened?: nasl.core.Boolean): void;
    /**
     * 更新 popper 实例。参考 [Popper.update()](https://popper.js.org/popper-documentation.html#Popper.update)。
     */
    update(): void;
    /**
     * 在下次 UI 渲染时一块更新 popper 实例，比`update()`性能要好。参考 [Popper.scheduleUpdate()](https://popper.js.org/popper-documentation.html#Popper.scheduleUpdate)。
     */
    scheduleUpdate(): void;
    constructor(options?: Partial<UPopupCombinationOptions>);
  }
  export class UPopupCombinationOptions extends ViewComponentOptions {
    private offset;
    private mergeBorders;
    /**
     * 标题
     * 弹出框标题
     */
    title: nasl.core.String;
    /**
     * 弹出方向
     * 弹出层的弹出方向
     */
    placement: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end';
    /**
     * 消失延迟时间
     * 当触发方式为'悬浮'时，提示内容消失延迟时间，单位是毫秒(ms)
     */
    hideDelay: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 跟随鼠标
     */
    followCursor: nasl.core.Boolean;
    /**
     * 展示方式
     */
    display: 'inline' | 'block';
    /**
     * 文本过长省略
     * 文字过长是否省略显示。
     */
    ellipsis: nasl.core.Boolean;
    /**
     * 触发方式
     * 弹出框的触发方式
     */
    trigger: 'click' | 'hover' | 'right-click' | 'double-click' | 'manual';
    /**
     * 弹出状态
     * 弹出状态分为“True(弹出)/False(关闭)”，默认为“弹出”
     */
    opened: nasl.core.Boolean;
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 弹出前
     * 弹出前触发。
     */
    onBeforeOpen: (event: any) => any;
    /**
     * 弹出时
     * 弹出时触发。
     */
    onOpen: (event: any) => any;
    /**
     * 隐藏前
     * 隐藏前触发。
     */
    onBeforeClose: (event: any) => any;
    /**
     * 隐藏后
     * 隐藏时触发。
     */
    onClose: (event: any) => any;
    /**
     * 展开折叠前
     * @deprecated
     */
    onBeforeToggle: (event: {
      opened: nasl.core.Boolean;
    }) => any;
    /**
     * 展开折叠后
     * @deprecated
     */
    onToggle: (event: {
      opened: nasl.core.Boolean;
    }) => any;
    /**
     * 自定义弹出的内容。
     */
    slotDefault: () => Array<ViewComponent>;
    /**
     * 弹出层触发节点。
     */
    slotReference: () => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class UProcessButton extends ViewComponent {
    constructor(options?: Partial<UProcessButtonOptions>);
  }
  export class UProcessButtonOptions extends ViewComponentOptions {
    /**
     * 提交按钮样式
     * 设置提交按钮的颜色和按钮样式类型
     */
    submit_color: 'primary' | 'primary_secondary' | 'default' | 'danger' | 'danger_secondary';
    /**
     * 同意按钮样式
     * 设置同意按钮的颜色和按钮样式类型
     */
    approve_color: 'primary' | 'primary_secondary' | 'default' | 'danger' | 'danger_secondary';
    /**
     * 拒绝按钮样式
     * 设置拒绝按钮的颜色和按钮样式类型
     */
    reject_color: 'primary' | 'primary_secondary' | 'default' | 'danger' | 'danger_secondary';
    /**
     * 转派按钮样式
     * 设置转派按钮的颜色和按钮样式类型
     */
    reassign_color: 'primary' | 'primary_secondary' | 'default' | 'danger' | 'danger_secondary';
    /**
     * 加签按钮样式
     * 设置加签按钮的颜色和按钮样式类型
     */
    addSign_color: 'primary' | 'primary_secondary' | 'default' | 'danger' | 'danger_secondary';
    /**
     * 撤回按钮样式
     * 设置撤回按钮的颜色和按钮样式类型
     */
    withdraw_color: 'primary' | 'primary_secondary' | 'default' | 'danger' | 'danger_secondary';
    /**
     * 操作成功响应方式
     */
    linkType: 'destination';
    /**
     * 链接地址
     */
    hrefAndTo: nasl.core.String;
    /**
     * 链接打开方式
     * 链接跳转的打开方式，父级窗口和顶级窗口仅适用于iframe组件嵌套的情况，若不存在嵌套，则其打开方式同当前窗口。
     */
    target: '_blank' | '_self' | '_parent' | '_top';
    /**
     * 提交时
     * 提交时按钮成功执行后触发。
     */
    onSubmit: (event: any) => void;
    /**
     * 同意时
     * 同意时按钮成功执行后触发。
     */
    onApprove: (event: any) => void;
    /**
     * 拒绝时
     * 拒绝时按钮成功执行后触发。
     */
    onReject: (event: any) => void;
    /**
     * 转派时
     * 转派时按钮成功执行后触发。
     */
    onReassign: (event: any) => void;
    /**
     * 加签时
     * 加签时按钮成功执行后触发。
     */
    onAddSign: (event: any) => void;
    /**
     * 撤回时
     * 撤回时按钮成功执行后触发。
     */
    onWithdraw: (event: any) => void;
  }
}
declare namespace nasl.ui {
  export class UProcessGraph extends ViewComponent {
    /**
     * 清除缓存，重新加载
     */
    reload(): void;
    constructor(options?: Partial<UProcessGraphOptions>);
  }
  export class UProcessGraphOptions extends ViewComponentOptions {
    /**
     * 初始缩放比
     */
    initialZoom: nasl.core.String;
  }
}
declare namespace nasl.ui {
  export class UProcessInfo extends ViewComponent {
    constructor(options?: Partial<UProcessInfoOptions>);
  }
  export class UProcessInfoOptions extends ViewComponentOptions {}
}
declare namespace nasl.ui {
  export class UProcessMyprocess extends ViewComponent {
    constructor(options?: Partial<UProcessMyprocessOptions>);
  }
  export class UProcessMyprocessOptions extends ViewComponentOptions {}
}
declare namespace nasl.ui {
  export class UProcessRecord extends ViewComponent {
    constructor(options?: Partial<UProcessRecordOptions>);
  }
  export class UProcessRecordOptions extends ViewComponentOptions {
    /**
     * 展示类型
     */
    type: 'table' | 'timeline';
  }
}
declare namespace nasl.ui {
  export class UProcessTaskbox extends ViewComponent {
    /**
     * 总条数
     */
    total: nasl.core.Integer;
    constructor(options?: Partial<UProcessTaskboxOptions>);
  }
  export class UProcessTaskboxOptions extends ViewComponentOptions {
    /**
     * 图标
     */
    icon: nasl.core.String;
    /**
     * 每页条数
     * 每页展示的任务数量
     */
    size: nasl.core.Integer;
    /**
     * 时间间隔（秒）
     * 任务刷新时间间隔，单位：秒
     */
    interval: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 点击
     * 在元素上按下并释放任意鼠标按钮时触发。
     */
    onClick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 双击
     * 在元素上双击鼠标按钮时触发。
     */
    onDblclick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 右键点击
     * 在右键菜单显示前触发。
     */
    onContextmenu: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标按下
     * 在元素上按下任意鼠标按钮时触发。
     */
    onMousedown: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标释放
     * 在元素上释放任意鼠标按钮时触发。
     */
    onMouseup: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标移入
     * 鼠标移入元素时触发。
     */
    onMouseenter: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标移出
     * 鼠标移出元素时触发。
     */
    onMouseleave: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 获得焦点
     * 获得焦点时触发。
     */
    onFocus: (event: {
      cancelBubble: nasl.core.Boolean;
      detail: nasl.core.String;
      layerX: nasl.core.Integer;
      layerY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 失去焦点
     * 失去焦点时触发。
     */
    onBlur: (event: {
      cancelBubble: nasl.core.Boolean;
      detail: nasl.core.String;
      layerX: nasl.core.Integer;
      layerY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
  }
}
declare namespace nasl.ui {
  export class URadios<T, V> extends ViewComponent {
    /**
     * 数据
     */
    data: nasl.collection.List<T>;
    /**
     * 选中值
     */
    value: URadiosOptions<T, V>['value'];
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    /**
     * 只读
     */
    readonly: nasl.core.Boolean;
    /**
     * 预览
     */
    preview: nasl.core.Boolean;
    /**
     * 清除缓存，重新加载
     */
    reload(): void;
    constructor(options?: Partial<URadiosOptions<T, V>>);
  }
  export class URadiosOptions<T, V> extends ViewComponentOptions {
    /**
     * 数据源
     * 展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。
     */
    dataSource: nasl.collection.List<T> | {
      list: nasl.collection.List<T>;
      total: nasl.core.Integer;
    };
    /**
     * 数据类型
     * 数据源返回的数据结构的类型，自动识别类型进行展示说明
     */
    dataSchema: T;
    private textField;
    /**
     * 选项值字段
     * 集合的元素类型中，用于标识选中值的字段
     */
    valueField: (item: T) => V;
    /**
     * 选中值
     * 当前选中的值
     */
    value: V;
    /**
     * 只读
     * 正常显示，但禁止选择/输入
     */
    readonly: nasl.core.Boolean;
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 预览
     * 显示预览态
     */
    preview: nasl.core.Boolean;
    /**
     * 选择前
     * 选择某一项前触发
     */
    onBeforeSelect: (event: {
      value: V;
      oldValue: V;
    }) => any;
    /**
     * 输入时
     * 选择某一项时触发
     */
    onInput: (event: nasl.core.String) => any;
    /**
     * 选择后
     * 选择某一项时触发
     */
    onSelect: (event: {
      value: V;
      oldValue: V;
    }) => any;
    /**
     * 改变后
     * 选择值改变时触发
     */
    onChange: (event: {
      value: V;
      oldValue: V;
    }) => any;
    /**
     * 加载前
     * 加载前触发
     */
    onBeforeLoad: (event: any) => any;
    /**
     * 加载后
     * 加载后触发
     */
    onLoad: (event: any) => any;
    /**
     * 默认
     * 插入`<u-radio>`子组件。
     */
    slotDefault: () => Array<URadio<V>>;
    /**
     * 自定义选项的结构和样式
     */
    slotItem: (current: Current<T>) => Array<ViewComponent>;
  }
  export class URadio<V> extends ViewComponent {
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    /**
     * 只读
     */
    readonly: nasl.core.Boolean;
    constructor(options?: Partial<URadioOptions<V>>);
  }
  export class URadioOptions<V> extends ViewComponentOptions {
    private text;
    /**
     * 选项值
     * 用于标识选项的值
     */
    label: V | nasl.core.String | nasl.core.Boolean | nasl.core.Integer;
    /**
     * 自动获取焦点
     * 设置是否自动获取焦点
     */
    autofocus: nasl.core.Boolean;
    /**
     * 只读
     * 正常显示，但禁止选择/输入
     */
    readonly: nasl.core.Boolean;
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 选择前
     * 选择此项前触发
     */
    onBeforeSelect: (event: {
      value: V;
      oldValue: V;
    }) => any;
    /**
     * 自定义选项的结构和样式
     */
    slotItem: () => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class URate extends ViewComponent {
    /**
     * 选中值
     */
    value: URateOptions['value'];
    /**
     * 只读
     */
    readonly: nasl.core.Boolean;
    /**
     * 预览
     */
    preview: nasl.core.Boolean;
    constructor(options?: Partial<URateOptions>);
  }
  export class URateOptions extends ViewComponentOptions {
    /**
     * 评分值
     */
    value: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 最大分数
     */
    max: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 展示辅助文本
     * 在评分后展示辅助文字
     */
    showText: nasl.core.Boolean;
    /**
     * 辅助文本
     * 辅助说明的文本信息，在展示辅助文本开关打开的情况下才会生效
     */
    texts: nasl.collection.List<nasl.core.String>;
    /**
     * 展示提示信息
     * 鼠标悬浮时展示Tooltip提示信息
     */
    showTooltip: nasl.core.Boolean;
    /**
     * 提示信息
     * Tooltip提示信息设置。在展示提示信息开关打开的情况下才会生效
     */
    tooltips: nasl.collection.List<nasl.core.String>;
    /**
     * 可半选
     * 是否允许半选
     */
    allowHalf: nasl.core.Boolean;
    /**
     * 可清除
     * 可选中后再次点击以清除选中
     */
    clearable: nasl.core.Boolean;
    /**
     * 只读
     * 正常显示，但禁止选择/输入
     */
    readonly: nasl.core.Boolean;
    /**
     * 预览
     * 显示预览态
     */
    preview: nasl.core.Boolean;
    /**
     * 改变后
     * 修改时触发
     */
    onChange: (event: {
      value: nasl.core.Decimal | nasl.core.Integer;
      oldValue: nasl.core.Decimal | nasl.core.Integer;
    }) => any;
  }
}
declare namespace nasl.ui {
  export class URegionSelect<T, V> extends ViewComponent {
    /**
     * 选中值
     */
    value: URegionSelectOptions<T, V>['value'];
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    /**
     * 只读
     */
    readonly: nasl.core.Boolean;
    /**
     * 预览
     */
    preview: nasl.core.Boolean;
    /**
     * 打开
     */
    opened: nasl.core.Boolean;
    /**
     * 弹出实例。
     */
    open(): void;
    /**
     * 关闭实例。
     */
    close(): void;
    /**
     * 清空输入框。
     */
    clear(): void;
    constructor(options?: Partial<URegionSelectOptions<T, V>>);
  }
  export class URegionSelectOptions<T, V> extends ViewComponentOptions {
    private join;
    /**
     * 转换器
     * 选择地区名称，返回：浙江省/杭州市/滨江区（不加空格）；选择地区码，返回：330108
     */
    converter: 'name' | 'code';
    /**
     * 数据源
     * 支持动态绑定集合类型变量（List<T>）或输出参数为集合类型的逻辑。
     */
    data: nasl.collection.List<T>;
    /**
     * 值
     */
    value: any;
    /**
     * 文本字段
     */
    field: (item: T) => any;
    /**
     * 筛选
     * 设置是否可以筛选，开启将会显示搜索框。
     */
    filterable: nasl.core.Boolean;
    /**
     * 占位符
     * 为空时显示的占位符文本
     */
    placeholder: nasl.core.String;
    /**
     * 只显示最后一项
     * 定义是否显示完整的路径，ture时只显示最后一项
     */
    showFinalValue: nasl.core.Boolean;
    /**
     * 自动获取焦点
     * 设置是否自动获取焦点
     */
    autofocus: nasl.core.Boolean;
    /**
     * 触发方式
     */
    trigger: 'click' | 'hover';
    /**
     * 可清空
     * 设置是否可以清空搜索框，开启后将在有内容时显示清除按钮。
     */
    clearable: nasl.core.Boolean;
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 只读
     * 正常显示，但禁止选择/输入
     */
    readonly: nasl.core.Boolean;
    /**
     * 预览
     * 显示预览态
     */
    preview: nasl.core.Boolean;
    /**
     * 弹出状态
     * 弹出状态分为“True(弹出)/False(关闭)”，默认为“弹出”
     */
    opened: nasl.core.Boolean;
    /**
     * 输入时
     * 选择某一项时触发
     */
    onInput: (event: nasl.core.String) => any;
    /**
     * 选择后
     * 选择某一项时触发
     */
    onSelect: (event: {
      value: V;
      values: nasl.collection.List<V>;
      items: nasl.collection.List<T>;
    }) => any;
    /**
     * 获得焦点
     * 获得焦点时触发。
     */
    onFocus: (event: {
      cancelBubble: nasl.core.Boolean;
      detail: nasl.core.String;
      layerX: nasl.core.Integer;
      layerY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 失去焦点
     * 失去焦点时触发。
     */
    onBlur: (event: {
      cancelBubble: nasl.core.Boolean;
      detail: nasl.core.String;
      layerX: nasl.core.Integer;
      layerY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 清空后
     * 清空后触发。
     */
    onClear: (event: any) => any;
  }
}
declare namespace nasl.ui {
  export class URouterView extends ViewComponent {
    constructor(options?: Partial<URouterViewOptions>);
  }
  export class URouterViewOptions extends ViewComponentOptions {
    /**
     * 进入已打开页面时刷新
     * 重新进入已打开页面时，会刷新页面
     */
    disableKeepAlive: nasl.core.Boolean;
  }
}
declare namespace nasl.ui {
  export class USelect<T, V, P extends nasl.core.Boolean, M extends nasl.core.Boolean, C> extends ViewComponent {
    /**
     * 数据
     */
    data: nasl.collection.List<T>;
    /**
     * 数据总数
     */
    total: nasl.core.Integer;
    /**
     * 选中值
     */
    value: USelectOptions<T, V, P, M, C>['value'];
    /**
     * 分页大小
     */
    size: USelectOptions<T, V, P, M, C>['pageSize'];
    /**
     * 当前页数
     */
    page: USelectOptions<T, V, P, M, C>['pageNumber'];
    /**
     * 弹出状态
     */
    opened: USelectOptions<T, V, P, M, C>['opened'];
    /**
     * 过滤文本
     */
    filterText: nasl.core.String;
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    /**
     * 只读
     */
    readonly: nasl.core.Boolean;
    /**
     * 预览
     */
    preview: nasl.core.Boolean;
    /**
     * 弹出选择框。
     */
    open(): void;
    /**
     * 关闭选择框。
     */
    close(): void;
    /**
     * 切换弹出/关闭状态。
     * @param opened - '可选。弹出/关闭状态'
     */
    toggle(opened?: nasl.core.Boolean): void;
    /**
     * 清除缓存，重新加载
     */
    reload(): void;
    /**
     * 添加项
     * @param item - '当前添加的项'
     * @param inFirst - '是否添加到列表的第一项'
     */
    addItem(item: T, inFirst?: nasl.core.Boolean): void;
    constructor(options?: Partial<USelectOptions<T, V, P, M, C>>);
  }
  export class USelectOptions<T, V, P extends nasl.core.Boolean, M extends nasl.core.Boolean, C> extends ViewComponentOptions {
    /**
     * 数据源
     * 展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。
     */
    dataSource: {
      list: nasl.collection.List<T>;
      total: nasl.core.Integer;
    } | nasl.collection.List<T>;
    /**
     * 数据类型
     * 数据源返回的数据结构的类型，自动识别类型进行展示说明
     */
    dataSchema: T;
    /**
     * 选中值
     * 当前选中的值
     */
    value: M extends true ? (C extends '' ? nasl.collection.List<V> : nasl.core.String) : V;
    /**
     * 文本字段
     * 集合的元素类型中，用于显示文本的属性名称
     */
    textField: (item: T) => any;
    /**
     * 值字段
     * 集合的元素类型中，用于标识选中值的属性
     */
    valueField: (item: T) => V;
    /**
     * 空值为null
     * 清空值时是否设置为null
     */
    emptyValueIsNull: nasl.core.Boolean;
    private pageable;
    private remotePaging;
    /**
     * 分页
     * 设置是否分页展示数据
     */
    pagination: nasl.core.Boolean;
    /**
     * 默认每页条数
     * 当分页条数过少导致无法触发分页滚动加载时，系统会自动请求数据到出现滚动条以避免功能异常
     */
    pageSize: nasl.core.Integer;
    private pageNumber;
    /**
     * 初始化排序规则
     * 设置数据初始化时的排序字段和顺序规则
     */
    sorting: {
      field: nasl.core.String;
      order: 'asc' | 'desc';
    };
    /**
     * 选项辅助文本
     * 选项的辅助说明信息，展示在选项文本下方
     */
    description: nasl.core.Boolean;
    /**
     * 辅助文本字段
     * 集合的元素类型中，用于显示文本下方辅助描述的字段
     */
    descriptionField: (item: T) => any;
    /**
     * 图标展示字段
     * 集合的元素类型中，用于显示文本前面图标的属性名称。与文本字段、值字段类似的写法
     */
    iconField: (item: T) => any;
    /**
     * 自动加载选中值
     * 当下拉列表是分页或加载更多而选中值不在第一页时，是否自动往下加载直到加载到选中值，使下拉框能够展示选中值。数据较多时建议关闭该属性，使用选中值完整数据
     */
    autoCheckSelectedValue: nasl.core.Boolean;
    /**
     * 选中值完整数据
     * 当下拉列表是分页或加载更多时，需要使用该字段回显选择框内数据。
     */
    selectedValuesData: nasl.collection.List<{
      text: nasl.core.String;
      value: V;
    }>;
    /**
     * 筛选
     * 设置是否可以筛选，开启将会支持搜索。
     */
    filterable: nasl.core.Boolean;
    private remoteFiltering;
    /**
     * 匹配方法
     * 过滤时的匹配方法
     */
    matchMethod: 'includes' | 'startsWith' | 'endsWith';
    /**
     * 可扩展下拉项
     * 设置是否可扩展下拉项,开启后可自定义下拉框选项
     */
    showRenderFooter: nasl.core.Boolean;
    /**
     * 全选控制
     * 是否存在可以控制选项的全选/反选
     */
    hasAllCheckItem: nasl.core.Boolean;
    /**
     * 全选展示内容
     * 是否存在可以控制选项的全选/反选
     */
    allCheckItemText: nasl.core.String;
    /**
     * 转换器
     * 将选中的值以选择的符号作为连接符，转为字符串格式；选择“json”则转为JSON字符串格式。
     */
    converter: '' | 'join' | 'join:|' | 'join:;' | 'json';
    /**
     * 占位符
     * 为空时显示的占位符文本
     */
    placeholder: nasl.core.String;
    /**
     * 自动获取焦点
     * 设置是否自动获取焦点
     */
    autofocus: nasl.core.Boolean;
    /**
     * 前缀图标
     */
    prefix: nasl.core.String;
    /**
     * 后缀图标
     */
    suffix: nasl.core.String;
    /**
     * 弹出层位置依据
     * 设置弹出层依据哪个元素定位位置，可选值：`body`表示添加到 document.body，`reference`表示添加到参考元素中。
     */
    appendTo: 'reference' | 'body';
    /**
     * 可清除
     * 可点击清除按钮一键清除所选内容
     */
    clearable: nasl.core.Boolean;
    /**
     * 多选项展示形式
     * 多选项过多时的展示形式
     */
    tagsOverflow: 'hidden' | 'collapse' | 'visible';
    private cancelable;
    /**
     * 可多选
     * 设置是否可以多选行
     */
    multiple: M;
    /**
     * 初始即加载
     * 设置初始时是否立即加载
     */
    initialLoad: nasl.core.Boolean;
    private loadingText;
    /**
     * 展示暂无数据文案
     * 是否在数据为空时展示暂无数据的文字提示
     */
    showEmptyText: nasl.core.Boolean;
    /**
     * 暂无数据文案
     * 暂无数据状态显示的提示文案
     */
    emptyText: nasl.core.String;
    /**
     * 为空自动禁用
     * 为空时置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    emptyDisabled: nasl.core.Boolean;
    /**
     * 只读
     * 正常显示，但禁止选择/输入
     */
    readonly: nasl.core.Boolean;
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 预览
     * 显示预览态
     */
    preview: nasl.core.Boolean;
    /**
     * 弹出状态
     * 弹出状态分为“True(弹出)/False(关闭)”，默认为“弹出”
     */
    opened: nasl.core.Boolean;
    /**
     * 宽度
     * 设置选择框宽度大小
     */
    width: 'full' | 'huge' | 'large' | 'medium' | 'normal' | 'small' | 'mini';
    /**
     * 下拉列表宽度
     * 设置下拉列表宽度
     */
    popperWidth: nasl.core.String;
    /**
     * 回显选项
     * 设置回显选项
     */
    isItemDisplay: nasl.core.Boolean;
    /**
     * 高度
     * 设置选择框高度大小
     */
    height: 'full' | 'huge' | 'large' | 'medium' | 'normal' | 'small' | 'mini';
    private caseSensitive;
    private autoComplete;
    /**
     * 选择前
     * 选择某一项前触发。
     */
    onBeforeSelect: (event: {
      selected: nasl.core.Boolean;
      item: T;
      oldItem: T;
      value: V;
      oldValue: V;
      items: nasl.collection.List<T>;
      oldItems: nasl.collection.List<T>;
    }) => any;
    /**
     * 选择时
     * 选择某一项时触发
     */
    onInput: (event: V) => any;
    /**
     * 选择后
     * 选择某一项后触发。单选模式中：
     */
    onSelect: (event: {
      selected: nasl.core.Boolean;
      item: T;
      oldItem: T;
      value: V;
      oldValue: V;
      items: nasl.collection.List<T>;
      oldItems: nasl.collection.List<T>;
    }) => any;
    /**
     * 改变后
     * 选择值改变时触发。单选模式中：
     */
    onChange: (event: {
      item: T;
      oldItem: T;
      value: V;
      oldValue: V;
      values: nasl.collection.List<V>;
      items: nasl.collection.List<T>;
      oldItems: nasl.collection.List<T>;
    }) => any;
    /**
     * 弹出前
     * 弹出前触发。
     */
    onBeforeOpen: (event: any) => any;
    /**
     * 弹出后
     * 弹出后触发。
     */
    onOpen: (event: any) => any;
    /**
     * 关闭前
     * 关闭前触发。
     */
    onBeforeClose: (event: any) => any;
    /**
     * 关闭后
     * 关闭时触发。
     */
    onClose: (event: any) => any;
    /**
     * 加载前
     * 加载前触发
     */
    onBeforeLoad: (event: any) => any;
    /**
     * 加载后
     * 加载后触发
     */
    onLoad: (event: any) => any;
    /**
     * 点击前缀图标
     * 点击前缀图标后触发
     */
    onClickPrefix: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 点击后缀图标
     * 点击后缀图标后触发
     */
    onClickSuffix: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 失去焦点
     * 失去焦点时触发。
     */
    onBlur: (event: {
      cancelBubble: nasl.core.Boolean;
      detail: nasl.core.String;
      layerX: nasl.core.Integer;
      layerY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 搜索前
     * 可搜索输入框，在输入搜索文字时
     */
    onBeforeFilter: (event: {
      filterText: nasl.core.String;
    }) => any;
    /**
     * 默认
     * 插入`<u-select-item>`、`<u-select-divider>`或`<u-select-group>`子组件。
     */
    slotDefault: () => Array<USelectItem<T, V> | USelectGroup<T, V> | USelectDivider>;
    /**
     * 底部
     */
    slotRenderFooter: () => Array<ViewComponent>;
  }
  export class USelectItem<T, V> extends ViewComponent {
    constructor(options?: Partial<USelectItemOptions<T, V>>);
  }
  export class USelectItemOptions<T, V> extends ViewComponentOptions {
    /**
     * 选项文本
     * 此项的显示值
     */
    text: nasl.core.String;
    /**
     * 值
     * 此项的值。
     */
    value: V;
    /**
     * 选项辅助文本
     * 选项的辅助说明信息，展示在选项文本下方
     */
    description: nasl.core.String;
    /**
     * 相关对象
     * 相关对象。当选择此项时，抛出的事件会传递该对象，便于开发。
     */
    item: T;
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 选择前
     * 选择此项前触发
     */
    onBeforeSelect: (event: {
      selected: nasl.core.Boolean;
      item: T;
      oldItem: T;
      value: V;
      oldValue: V;
      items: nasl.collection.List<T>;
      oldItems: nasl.collection.List<T>;
    }) => any;
    /**
     * 默认
     * 插入文本或 HTML。
     */
    slotDefault: (current: Current<T>) => Array<ViewComponent>;
  }
  export class USelectGroup<T, V> extends ViewComponent {
    constructor(options?: Partial<USelectGroupOptions<T, V>>);
  }
  export class USelectGroupOptions<T, V> extends ViewComponentOptions {
    /**
     * 标题
     */
    title: nasl.core.String;
    /**
     * 默认
     * 插入`<u-select-item>`或`<u-select-divider>`子组件。
     */
    slotDefault: () => Array<USelectItem<T, V>>;
    /**
     * 标题
     * 自定义标题文本。
     */
    slotTitle: () => Array<ViewComponent>;
    /**
     * 附加内容
     * 在右侧可以附加内容。
     */
    slotExtra: () => Array<ViewComponent>;
  }
  export class USelectDivider extends ViewComponent {
    constructor(options?: Partial<USelectDividerOptions>);
  }
  export class USelectDividerOptions extends ViewComponentOptions {}
}
declare namespace nasl.ui {
  export class USelectableSteps<T> extends ViewComponent {
    /**
     * 当前步骤
     */
    value: USelectableStepsOptions<T>['value'];
    /**
     * 第一步
     */
    isFirst: nasl.core.Boolean;
    /**
     * 最后一步
     */
    isLast: nasl.core.Boolean;
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    /**
     * 只读
     */
    readonly: nasl.core.Boolean;
    /**
     * 上一步
     * 上一步
     */
    prev(): void;
    /**
     * 下一步
     * 下一步
     */
    next(): void;
    /**
     * 重新加载数据
     */
    reload(): void;
    constructor(options?: Partial<USelectableStepsOptions<T>>);
  }
  export class USelectableStepsOptions<T> extends ViewComponentOptions {
    /**
     * 数据源
     * 展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑
     */
    dataSource: nasl.collection.List<T>;
    /**
     * 数据类型
     * 集合类型每一元素的数据类型
     */
    dataSchema: T;
    private titleField;
    private descField;
    /**
     * 当前步骤
     * 设置当前处于选中状态的步骤
     */
    value: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 步骤条方向
     */
    direction: 'horizontal' | 'vertical';
    /**
     * 只读
     * 正常显示，但禁止选择/输入
     */
    readonly: nasl.core.Boolean;
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 尺寸
     */
    size: 'auto' | 'normal';
    /**
     * 选择前
     * 选择某一步骤前触发
     */
    onBeforeSelect: (event: {
      value: nasl.core.Integer;
      oldValue: nasl.core.Integer;
      item: T;
    }) => any;
    /**
     * 选择后
     * 选择某一步骤时触发
     */
    onSelect: (event: {
      value: nasl.core.Integer;
      oldValue: nasl.core.Integer;
      item: T;
    }) => any;
    /**
     * 改变后
     * 步骤数改变后触发
     */
    onChange: (event: {
      value: nasl.core.Integer;
      oldValue: nasl.core.Integer;
      item: T;
      oldItem: T;
    }) => any;
    /**
     * 默认
     * 插入`<u-selectable-step>`子组件。
     */
    slotDefault: () => Array<ViewComponent>;
    /**
     * 头部标题
     */
    slotTitle: (current: Current<T>) => Array<ViewComponent>;
    /**
     * 描述
     */
    slotDesc: (current: Current<T>) => Array<ViewComponent>;
  }
  export class USelectableStep extends ViewComponent {
    /**
     * 状态
     */
    status: USelectableStepOptions['status'];
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    /**
     * 只读
     */
    readonly: nasl.core.Boolean;
    constructor(options?: Partial<USelectableStepOptions>);
  }
  export class USelectableStepOptions extends ViewComponentOptions {
    private title;
    private desc;
    /**
     * 状态值
     * 若不配置该属性时，会使用步骤条的当前步骤来自动指定状态；如果该属性与当前步骤指定的状态不匹配会覆盖自动匹配的状态
     */
    status: 'pending' | 'selected' | 'passed' | 'failed';
    /**
     * 图标
     */
    icon: nasl.core.String;
    /**
     * 只读
     * 正常显示，但禁止选择/输入
     */
    readonly: nasl.core.Boolean;
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 默认
     * 插入文本或 HTML
     */
    slotDefault: () => Array<ViewComponent>;
    /**
     * 标题
     * 自定义标题文本
     */
    slotTitle: () => Array<ViewComponent>;
    /**
     * 描述
     */
    slotDesc: () => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class USidebar<T, V> extends ViewComponent {
    /**
     * 数据
     */
    data: nasl.collection.List<T>;
    /**
     * 选中值
     */
    value: USidebarOptions<T, V>['value'];
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    /**
     * 只读
     */
    readonly: nasl.core.Boolean;
    /**
     * 展开/折叠所有分组
     * @param expanded - '展开/折叠'
     */
    toggleAll(expanded: nasl.core.Boolean): void;
    /**
     * 展开/折叠所有分组
     */
    toggleCollapse(): void;
    constructor(options?: Partial<USidebarOptions<T, V>>);
  }
  export class USidebarOptions<T, V> extends ViewComponentOptions {
    /**
     * 数据源配置
     */
    hasDataSource: nasl.core.Boolean;
    /**
     * 数据源
     * 展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。
     */
    dataSource: nasl.collection.List<T> | {
      list: nasl.collection.List<T>;
      total: nasl.core.Integer;
    };
    /**
     * 数据类型
     * 数据源返回的数据结构的类型，自动识别类型进行展示说明
     */
    dataSchema: T;
    /**
     * 文本字段
     * 集合的元素类型中，用于显示文本的属性名称
     */
    textField: (item: T) => any;
    /**
     * 值字段
     * 集合的元素类型中，用于标识选中值的属性
     */
    valueField: (item: T) => any;
    /**
     * 图标属性字段
     * 集合的元素类型中，用于图标的属性名称
     */
    iconField: (item: T) => any;
    /**
     * 跳转链接字段
     * 集合的元素类型中，用于跳转链接的属性名称
     */
    toField: (item: T) => any;
    /**
     * 父级值字段
     * 集合的元素类型中，用于标识父节点的属性
     */
    parentField: (item: T) => V;
    /**
     * 使用路由
     * 是否根据 vue-router 来控制选择哪一项
     */
    router: nasl.core.Boolean;
    /**
     * 选中值
     * 当前选中的值
     */
    value: any;
    /**
     * 菜单项可折叠
     * 设置菜单项是否可以展开/折叠
     */
    collapsible: nasl.core.Boolean;
    /**
     * 手风琴模式
     * 设置是否每次只展开一个
     */
    accordion: nasl.core.Boolean;
    /**
     * 展开触发方式
     * 展开/折叠操作的触发方式
     */
    expandTrigger: 'click' | 'click-expander';
    /**
     * 侧边栏可折叠
     * 设置侧边栏是否可以展开/折叠
     */
    enableCollapse: nasl.core.Boolean;
    /**
     * 默认状态
     * 侧边栏是否折叠
     */
    collapseMode: 'fold' | 'expand';
    /**
     * 是否展示伸缩图标
     * 是否展示伸缩图标
     */
    showCollapseIcon: nasl.core.Boolean;
    /**
     * 展开图标
     * 侧边栏展开图标
     */
    expandIcon: nasl.core.String;
    /**
     * 折叠图标
     * 侧边栏折叠图标
     */
    foldIcon: nasl.core.String;
    /**
     * 只读
     * 正常显示，但禁止选择/输入
     */
    readonly: nasl.core.Boolean;
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 选择后
     * 选择某一项后触发。
     */
    onSelect: (event: {
      selected: nasl.core.Boolean;
      item: T;
      oldItem: T;
      value: V;
      oldValue: V;
      items: nasl.collection.List<T>;
      oldItems: nasl.collection.List<T>;
    }) => any;
    /**
     * 默认
     * 插入`<u-sidebar-item>`、`<u-sidebar-divider>`或`<u-sidebar-group>`子组件。
     */
    slotDefault: () => Array<ViewComponent>;
  }
  export class USidebarItem extends ViewComponent {
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    constructor(options?: Partial<USidebarItemOptions>);
  }
  export class USidebarItemOptions extends ViewComponentOptions {
    private text;
    private item;
    private to;
    private replace;
    private exact;
    /**
     * 值
     * 用于标识此项的值
     */
    value: nasl.core.String;
    /**
     * 图标
     */
    icon: nasl.core.String;
    /**
     * 链接类型
     */
    linkType: 'destination' | 'download';
    /**
     * 链接地址
     */
    hrefAndTo: nasl.core.String;
    /**
     * 链接打开方式
     * 链接跳转的打开方式，父级窗口和顶级窗口仅适用于iframe组件嵌套的情况，若不存在嵌套，则其打开方式同当前窗口。
     */
    target: '_blank' | '_self' | '_parent' | '_top';
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 点击
     * 在元素上按下并释放任意鼠标按钮时触发。
     */
    onClick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 双击
     * 在元素上双击鼠标按钮时触发。
     */
    onDblclick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 右键点击
     * 在右键菜单显示前触发。
     */
    onContextmenu: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标按下
     * 在元素上按下任意鼠标按钮时触发。
     */
    onMousedown: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标释放
     * 在元素上释放任意鼠标按钮时触发。
     */
    onMouseup: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标移入
     * 鼠标移入元素时触发。
     */
    onMouseenter: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标移出
     * 鼠标移出元素时触发。
     */
    onMouseleave: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 获得焦点
     * 获得焦点时触发。
     */
    onFocus: (event: {
      cancelBubble: nasl.core.Boolean;
      detail: nasl.core.String;
      layerX: nasl.core.Integer;
      layerY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 失去焦点
     * 失去焦点时触发。
     */
    onBlur: (event: {
      cancelBubble: nasl.core.Boolean;
      detail: nasl.core.String;
      layerX: nasl.core.Integer;
      layerY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 切换路由后
     * 使用 router 相关属性切换路由后触发
     */
    onNavigate: (event: {
      to: nasl.core.String;
      replace: nasl.core.Boolean;
      append: nasl.core.Boolean;
    }) => any;
    /**
     * 默认
     * 侧边栏项自定义
     */
    slotDefault: () => Array<ViewComponent>;
  }
  export class USidebarGroup extends ViewComponent {
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    constructor(options?: Partial<USidebarGroupOptions>);
  }
  export class USidebarGroupOptions extends ViewComponentOptions {
    private title;
    /**
     * 可折叠
     * 设置是否可以展开/折叠
     */
    collapsible: nasl.core.Boolean;
    /**
     * 展开状态
     * 展开状态分为“True(展开)/False(折叠)”，默认为“展开”
     */
    expanded: nasl.core.Boolean;
    /**
     * 禁用展开/折叠
     * 置灰显示，且禁止展开/折叠操作
     */
    disabled: nasl.core.Boolean;
    /**
     * 图标
     */
    icon: nasl.core.String;
    /**
     * 默认
     * 插入`<u-sidebar-item>`或`<u-sidebar-divider>`子组件。
     */
    slotDefault: () => Array<ViewComponent>;
    /**
     * 自定义标题文本。
     */
    slotTitle: () => Array<ViewComponent>;
    /**
     * 在右侧可以附加内容。
     */
    slotExtra: () => Array<ViewComponent>;
  }
  export class USidebarDivider extends ViewComponent {
    constructor(options?: Partial<USidebarDividerOptions>);
  }
  export class USidebarDividerOptions extends ViewComponentOptions {}
}
declare namespace nasl.ui {
  export class USwitch extends ViewComponent {
    /**
     * 值
     */
    value: nasl.core.Boolean;
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    /**
     * 只读
     */
    readonly: nasl.core.Boolean;
    /**
     * 预览
     */
    preview: nasl.core.Boolean;
    constructor(options?: Partial<USwitchOptions>);
  }
  export class USwitchOptions extends ViewComponentOptions {
    /**
     * 值
     * 标识开关状态的值
     */
    value: nasl.core.Boolean;
    /**
     * 显示开关文字
     * 是否显示开关`ON`和`OFF`文字
     */
    withText: nasl.core.Boolean;
    /**
     * 只读
     * 正常显示，但禁止选择/输入
     */
    readonly: nasl.core.Boolean;
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 预览
     * 显示预览态
     */
    preview: nasl.core.Boolean;
    /**
     * 切换状态前
     * 切换开关状态前触发
     */
    onBeforeToggle: (event: {
      value: nasl.core.Boolean;
      oldValue: nasl.core.Boolean;
    }) => any;
    /**
     * 输入时
     * 切换开关状态时触发
     */
    onInput: (event: nasl.core.Boolean) => any;
    /**
     * 打开时
     * 开关打开时触发
     */
    onOn: (event: any) => any;
    /**
     * 关闭时
     * 开关关闭时触发
     */
    onOff: (event: any) => any;
    /**
     * 切换状态后
     * 切换开关状态时触发
     */
    onToggle: (event: {
      value: nasl.core.Boolean;
      oldValue: nasl.core.Boolean;
    }) => any;
    /**
     * 改变后
     * 开关状态改变时触发
     */
    onChange: (event: {
      value: nasl.core.Boolean;
      oldValue: nasl.core.Boolean;
    }) => any;
  }
}
declare namespace nasl.ui {
  export class UTableView<T, V, P extends nasl.core.Boolean, M extends nasl.core.Boolean> extends ViewComponent {
    /**
     * 数据
     */
    data: nasl.collection.List<T>;
    /**
     * 数据总数
     */
    total: nasl.core.Integer;
    /**
     * 分页大小
     */
    size: UTableViewOptions<T, V, P, M>['pageSize'];
    /**
     * 当前页数
     */
    page: UTableViewOptions<T, V, P, M>['pageNumber'];
    /**
     * 排序属性
     */
    sort: UTableViewOptions<T, V, P, M>['sorting']['field'];
    /**
     * 排序方式
     */
    order: UTableViewOptions<T, V, P, M>['sorting']['order'];
    /**
     * 单选值
     */
    value: V;
    /**
     * 多选值
     */
    values: nasl.collection.List<V>;
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    /**
     * 只读
     */
    readonly: nasl.core.Boolean;
    /**
     * 清除缓存，重新加载
     */
    reload(): void;
    /**
     * 带页码刷新
     * 保持页码，重新加载
     * @param page - '要刷新的页数'
     */
    loadTo(page?: nasl.core.Integer): void;
    /**
     * 获取所有表格列的 field
     */
    getFields(): nasl.core.String;
    /**
     * 导出 excel 文件
     * @param page - '当前页码'
     * @param size - '每页条数'
     * @param filename - '导出文件名'
     * @param sort - '排序字段'
     * @param order - '排序顺序'
     * @param excludeColumns - '排除字段'
     * @param includeStyles - '是否带样式'
     */
    exportExcel(page?: nasl.core.Integer, size?: nasl.core.Integer, filename?: nasl.core.String, sort?: nasl.core.String, order?: 'asc' | 'desc', excludeColumns?: nasl.collection.List<nasl.core.String>, includeStyles?: nasl.core.Boolean): void;
    /**
     * 重制编辑列的编辑状态为非编辑态
     * @param item - '行数据'
     */
    resetEdit(item?: object): void;
    constructor(options?: Partial<UTableViewOptions<T, V, P, M>>);
  }
  export class UTableViewOptions<T, V, P extends nasl.core.Boolean, M extends nasl.core.Boolean> extends ViewComponentOptions {
    /**
     * 数据源
     * 展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑
     */
    dataSource: {
      list: nasl.collection.List<T>;
      total: nasl.core.Integer;
    } | nasl.collection.List<T>;
    /**
     * 数据类型
     * 数据源返回的数据结构的类型，自动识别类型进行展示说明
     */
    dataSchema: T;
    private extraParams;
    private pageable;
    private remotePaging;
    /**
     * 分页
     * 设置是否分页展示数据
     */
    pagination: nasl.core.Boolean;
    /**
     * 默认每页条数
     */
    pageSize: nasl.core.Integer;
    /**
     * 显示每页条数
     * 显示每页条数切换器
     */
    showSizer: nasl.core.Boolean;
    /**
     * 每页条数选项
     * 每页条数切换器的选项
     */
    pageSizeOptions: nasl.collection.List<nasl.core.Integer>;
    /**
     * 当前页数
     * 当前默认展示在第几页
     */
    pageNumber: nasl.core.Integer;
    /**
     * 显示总条数
     */
    showTotal: nasl.core.Boolean;
    /**
     * 显示跳转输入
     * 显示页面跳转输入框
     */
    showJumper: nasl.core.Boolean;
    /**
     * 初始化排序规则
     * 设置数据初始化时的排序字段和顺序规则
     */
    sorting: {
      field: nasl.core.String;
      order: nasl.core.String;
      compare?: Function;
    };
    private remoteSorting;
    private defaultOrder;
    private filtering;
    private remoteFiltering;
    /**
     * 值字段
     * 在单选、多选操作、渲染树形数据中，指定数据唯一值的字段
     */
    valueField: (item: T) => V;
    /**
     * 单选值
     * 用于标识单选选项的值
     */
    value: V;
    /**
     * 多选值
     * 用于标识多选选项的值
     */
    values: nasl.collection.List<V>;
    /**
     * 树形模式
     * 以树形数据展示表格
     */
    treeDisplay: nasl.core.Boolean;
    /**
     * 父级值字段
     * 当数据源为平铺数据时自动生成树形数据的节点字段名，重要：值字段名需要一起配置
     */
    parentField: (item: T) => any;
    /**
     * 子级值字段
     * 树形数据子节点字段名，默认为children
     */
    childrenField: (item: T) => nasl.collection.List<any>;
    /**
     * 包含子级值字段
     * 该字段指定行数据是否包含子节点数据，默认为hasChildren
     */
    hasChildrenField: (item: T) => nasl.core.Boolean;
    /**
     * 关联选中类型
     * 父子树节点是否关联选中
     */
    treeCheckType: 'up+down' | 'down' | 'up' | 'none';
    /**
     * 表格标题
     */
    title: nasl.core.String;
    /**
     * 显示表格头部
     */
    showHead: nasl.core.Boolean;
    /**
     * 表格头部吸顶
     */
    stickHead: nasl.core.Boolean;
    /**
     * 表格头部吸顶偏移量
     */
    stickHeadOffset: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 表头文本过长省略
     * 文字过长是否省略显示。默认文字超出时会换行。
     */
    thEllipsis: nasl.core.Boolean;
    /**
     * 内容区文本过长省略
     * 文字过长是否省略显示。默认文字超出时会换行。
     */
    ellipsis: nasl.core.Boolean;
    private hover;
    /**
     * 可选行
     * 设置是否可以单选行
     */
    selectable: nasl.core.Boolean;
    /**
     * 可取消
     * 设置是否可以取消选择
     */
    cancelable: nasl.core.Boolean;
    /**
     * 表格内可拖拽
     * 设置是否可以拖拽行排序
     */
    draggable: nasl.core.Boolean;
    /**
     * 表格间可拖拽
     * 设置多个表格间是否可以拖拽放置
     */
    acrossTableDrag: nasl.core.Boolean;
    /**
     * 可拖拽节点
     * 设置表格行是否可拖拽起来。绑定逻辑
     */
    canDragableHandler: Function;
    /**
     * 可放置节点
     * 设置表格行是否可拖拽放入。绑定逻辑
     */
    canDropinHandler: Function;
    /**
     * 手风琴模式
     * 设置是否每次只展开一个
     */
    accordion: nasl.core.Boolean;
    /**
     * 可调整列宽
     * 设置是否可以调整列宽
     */
    resizable: nasl.core.Boolean;
    /**
     * 调整列宽效果
     * 设置调整列宽时如何处理剩余大小
     */
    resizeRemaining: 'sequence' | 'average' | 'none';
    /**
     * 配置展示列
     * 设置是否可以配置展示列
     */
    configurable: nasl.core.Boolean;
    /**
     * 虚拟滚动
     * 虚拟滚动表示不展示所有的数据，只展示默认条数的数据，当滚动时再展示剩余的数据。当表格数据量大时，可设置为虚拟滚动，提高性能。默认关闭。
     */
    virtual: nasl.core.Boolean;
    /**
     * 每行高度
     * 与虚拟滚动配合使用，表示每一行的高度。请确保行里的数据不要换行
     */
    itemHeight: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 展示条数
     * 与虚拟滚动配合使用，表示每屏展示的最大条数
     */
    virtualCount: nasl.core.Integer;
    /**
     * 使用原生滚动条
     * 表格滚动默认使用滚动组件的滚动条，开启后使用浏览器原生滚动条。有固定列的场景不适用
     */
    nativeScroll: nasl.core.Boolean;
    /**
     * 初始即加载
     * 设置初始时是否立即加载
     */
    initialLoad: nasl.core.Boolean;
    /**
     * 加载状态设置
     * 设置不同加载状态的展示内容
     */
    designerMode: 'success' | 'empty' | 'loading' | 'error';
    /**
     * 加载中文案
     * 加载中状态显示的提示文案
     */
    loadingText: nasl.core.String;
    /**
     * 加载中触发条件
     * 加载中状态的触发条件，未设置则默认为系统定义条件
     */
    loading: nasl.core.Boolean;
    /**
     * 加载失败文案
     * 加载失败状态显示的提示文案
     */
    errorText: nasl.core.String;
    /**
     * 加载失败触发条件
     * 加载失败状态的触发条件，未设置则默认为系统定义条件
     */
    error: nasl.core.Boolean;
    /**
     * 暂无数据文案
     * 暂无数据状态显示的提示文案
     */
    emptyText: nasl.core.String;
    /**
     * 只读
     * 正常显示，但禁止选择/输入
     */
    readonly: nasl.core.Boolean;
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 标题对齐方式
     */
    titleAlignment: 'left' | 'center' | 'right';
    /**
     * 表头加粗
     */
    boldHeader: nasl.core.Boolean;
    private border;
    /**
     * 分隔线条
     * 单元格之间是否显示分隔线条
     */
    line: nasl.core.Boolean;
    /**
     * 斑马条纹
     * 表格行是否按斑马线条纹显示
     */
    striped: nasl.core.Boolean;
    /**
     * 默认列宽度
     * 表格的默认列宽度，可设置为数字或百分比
     */
    defaultColumnWidth: nasl.core.String | nasl.core.Decimal;
    /**
     * 加载前
     * 加载前触发
     */
    onBeforeLoad: (event: any) => any;
    /**
     * 加载后
     * 加载后触发
     */
    onLoad: (event: any) => any;
    /**
     * 切换分页前
     * 切换分页前触发
     */
    onBeforePage: (event: {
      size: nasl.core.Integer;
      oldSize: nasl.core.Integer;
      number: nasl.core.Integer;
      oldNumber: nasl.core.Integer;
    }) => any;
    /**
     * 切换分页后
     * 切换分页或改变分页大小时触发
     */
    onPage: (event: {
      size: nasl.core.Integer;
      oldSize: nasl.core.Integer;
      number: nasl.core.Integer;
      oldNumber: nasl.core.Integer;
    }) => any;
    /**
     * 排序前
     * 排序前触发
     */
    onBeforeSort: (event: {
      field: nasl.core.String;
      order: nasl.core.String;
      compare?: Function;
    }) => any;
    /**
     * 排序后
     * 排序后触发
     */
    onSort: (event: {
      field: nasl.core.String;
      order: nasl.core.String;
      compare?: Function;
    }) => any;
    /**
     * 筛选前
     * 筛选前触发
     */
    onBeforeFilter: (event: any) => any;
    /**
     * 筛选后
     * 筛选后触发
     */
    onFilter: (event: any) => any;
    /**
     * 点击行
     * 点击某一行时触发
     */
    onClickRow: (event: {
      item: T;
      index: nasl.core.Integer;
      rowIndex: nasl.core.Integer;
    }) => any;
    /**
     * 双击行
     * 双击某一行时触发
     */
    onDblclickRow: (event: {
      item: T;
      index: nasl.core.Integer;
      rowIndex: nasl.core.Integer;
    }) => any;
    /**
     * 选择前
     * 选择某一项前触发
     */
    onBeforeSelect: (event: {
      value: V;
      oldValue: V;
      item: T;
      oldItem: T;
    }) => any;
    /**
     * 选择触发
     * 选择某一项后触发
     */
    onInput: (event: V) => any;
    /**
     * 选择后
     * 选择某一项后触发
     */
    onSelect: (event: {
      selectedItem: T;
      value: V;
      oldValue: V;
      item: T;
      oldItem: T;
      index: nasl.core.Integer;
    }) => any;
    /**
     * 多选后
     * 多选模式中，选中节点后触发
     */
    onCheck: (event: {
      checked: nasl.core.Boolean;
      oldChecked: nasl.core.Boolean;
      values: nasl.collection.List<V>;
      oldValues: nasl.collection.List<V>;
      item: T;
      items: nasl.collection.List<T>;
    }) => any;
    /**
     * 改变后
     * 单选或多选值改变后触发
     */
    onChange: (event: {
      value: V;
      oldValue: V;
      item: T;
      oldItem: T;
      values: nasl.collection.List<V>;
      oldValues: nasl.collection.List<V>;
      items: nasl.collection.List<T>;
    }) => any;
    /**
     * 调整列宽后
     * 调整列宽后触发
     */
    onResize: (event: any) => any;
    /**
     * 展开行前
     * 点击展开按钮前触发
     */
    onBeforeToggleExpanded: (event: {
      item: T;
      expanded: nasl.core.Boolean;
      oldExpanded: nasl.core.Boolean;
    }) => any;
    /**
     * 展开行后
     * 点击展开按钮后触发
     */
    onToggleExpanded: (event: {
      item: T;
      expanded: nasl.core.Boolean;
    }) => any;
    /**
     * 拖拽开始时
     * 拖拽行时触发
     */
    onDragstart: (event: {
      source: {
        parent: T;
        item: T;
        level: nasl.core.Integer;
        index: nasl.core.Integer;
      };
      target: {
        parent: T;
        item: T;
        level: nasl.core.Integer;
        index: nasl.core.Integer;
      };
      finalSource: {
        parent: T;
        item: T;
        level: nasl.core.Integer;
        index: nasl.core.Integer;
      };
      position: nasl.core.String;
      updateData: {
        sourceList: nasl.collection.List<T>;
        targetList: nasl.collection.List<T>;
      };
    }) => any;
    /**
     * 拖拽经过时
     * 拖拽经过每一行时触发
     */
    onDragover: (event: {
      source: {
        parent: T;
        item: T;
        level: nasl.core.Integer;
        index: nasl.core.Integer;
      };
      target: {
        parent: T;
        item: T;
        level: nasl.core.Integer;
        index: nasl.core.Integer;
      };
      finalSource: {
        parent: T;
        item: T;
        level: nasl.core.Integer;
        index: nasl.core.Integer;
      };
      position: nasl.core.String;
      updateData: {
        sourceList: nasl.collection.List<T>;
        targetList: nasl.collection.List<T>;
      };
    }) => any;
    /**
     * 拖拽放置时
     * 拖拽结束时触发
     */
    onDrop: (event: {
      source: {
        parent: T;
        item: T;
        level: nasl.core.Integer;
        index: nasl.core.Integer;
      };
      target: {
        parent: T;
        item: T;
        level: nasl.core.Integer;
        index: nasl.core.Integer;
      };
      finalSource: {
        parent: T;
        item: T;
        level: nasl.core.Integer;
        index: nasl.core.Integer;
      };
      position: nasl.core.String;
      updateData: {
        sourceList: nasl.collection.List<T>;
        targetList: nasl.collection.List<T>;
      };
    }) => any;
    /**
     * 默认
     * 在表格中插入`<u-table-view-column>`子组件
     */
    slotDefault: () => Array<UTableViewColumn<T, V, P, M> | UTableViewColumnDynamic<T, V, P, M, unknown> | UTableViewColumnGroup<T, V, P, M> | ViewComponent>;
    /**
     * 加载中内容
     * 自定义加载中内容
     */
    slotLoading: () => Array<ViewComponent>;
    /**
     * 加载错误内容
     * 自定义加载错误内容
     */
    slotError: () => Array<ViewComponent>;
    /**
     * 暂无数据内容
     * 自定义暂无数据内容
     */
    slotEmpty: () => Array<ViewComponent>;
    /**
     * 拖拽缩略图
     * 自定义拖拽缩略图
     */
    slotDragGhost: (current: Current<T>) => Array<ViewComponent>;
    /**
     * 配置列
     * 自定义配置列内容
     */
    slotConfigColumns: () => Array<ViewComponent>;
  }
  export class UTableViewColumn<T, V, P extends nasl.core.Boolean, M extends nasl.core.Boolean> extends ViewComponent {
    constructor(options?: Partial<UTableViewColumnOptions<T, V, P, M>>);
  }
  export class UTableViewColumnOptions<T, V, P extends nasl.core.Boolean, M extends nasl.core.Boolean> extends ViewComponentOptions {
    private formatter;
    private filters;
    /**
     * 值字段
     * data 项中的字段
     */
    field: (item: T) => any;
    /**
     * 排序
     * 设置该列是否可以排序
     */
    sortable: nasl.core.Boolean;
    /**
     * 排序初始顺序
     * 该列首次点击时的排序顺序
     */
    defaultOrder: 'asc' | 'desc';
    /**
     * 列类型
     * 支持序号列、单/多选、树形列和编辑列切换，序号列支持按照数字排序。选择编辑列需要先设置列字段。
     */
    type: 'normal' | 'index' | 'radio' | 'checkbox' | 'expander' | 'tree' | 'editable' | 'dragHandler';
    /**
     * 换页继续编号
     * 换页后，继续上一页的列序号进行编号
     */
    autoIndex: nasl.core.Boolean;
    /**
     * 起始序号
     * 序号列的起始序号
     */
    startIndex: nasl.core.Decimal | nasl.core.Integer;
    private dblclickHandler;
    private title;
    /**
     * 固定列
     * 该列是否固定。左侧固定列需要从第一列到当前固定列之间的列都是固定列。右侧固定列需要最后一列到当前固定列之间的列都是固定列。
     */
    fixed: nasl.core.Boolean;
    /**
     * 表头文本过长省略
     * 文字过长是否省略显示。默认文字超出时会换行。
     */
    thEllipsis: nasl.core.Boolean;
    /**
     * 内容区文本过长省略
     * 文字过长是否省略显示。默认文字超出时会换行。
     */
    ellipsis: nasl.core.Boolean;
    /**
     * 隐藏列
     */
    hidden: nasl.core.Boolean;
    /**
     * 展开列图标位置
     * 展开列图标的位置
     */
    expanderPosition: 'left' | 'right';
    /**
     * 列宽度
     * 设置列宽度，可设置为数字或百分比
     */
    width: nasl.core.String | nasl.core.Decimal | nasl.core.Integer;
    /**
     * 合并列数
     */
    colSpan: nasl.core.Integer;
    /**
     * 自动合并相同数据
     */
    autoRowSpan: nasl.core.Boolean;
    /**
     * 单元格
     * 对单元格的数据展示进行自定义
     */
    slotCell: (current: Current<T>) => Array<ViewComponent>;
    /**
     * 编辑单元格
     * 对单元格的编辑数据展示进行自定义
     */
    slotEditcell: (current: Current<T>) => Array<ViewComponent>;
    /**
     * 标题
     * 对标题进行自定义
     */
    slotTitle: () => Array<ViewComponent>;
    /**
     * 展开列内容
     * 展开列的内容
     */
    'slot-expand-content': (current: Current<T>) => Array<ViewComponent>;
    slotExpandContent: (current: Current<T>) => Array<ViewComponent>;
    /**
     * 展开列图标
     * 展开列图标
     */
    slotExpander: (current: Current<T>) => Array<ViewComponent>;
  }
  export class UTableViewColumnConfig<T, V> extends ViewComponent {
    constructor(options?: Partial<UTableViewColumnConfigOptions<T, V>>);
  }
  export class UTableViewColumnConfigOptions<T, V> extends ViewComponentOptions {
    private textField;
    /**
     * 数据源
     * 展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑
     */
    dataSource: nasl.collection.List<T> | {
      list: nasl.collection.List<T>;
      total: nasl.core.Integer;
    };
    /**
     * 数据类型
     * 数据源返回的数据结构的类型，自动识别类型进行展示说明
     */
    dataSchema: T;
    /**
     * 值字段
     * 在单选、多选操作、渲染树形数据中，指定数据唯一值的字段
     */
    valueField: (item: T) => V;
    /**
     * 值
     */
    value: nasl.collection.List<V>;
    /**
     * 确定/取消按钮
     * 控制弹出层的确定/取消按钮是否展示
     */
    showFooter: nasl.core.Boolean;
    /**
     * 选择后
     */
    onSelect: (event: {
      selectedItem: T;
      value: V;
      oldValue: V;
      item: T;
      oldItem: T;
    }) => any;
    /**
     * 配置列展示title
     */
    slotTitle: () => Array<ViewComponent>;
    /**
     * 配置列展示item
     * 自定义选项的结构和样式
     */
    slotItem: (current: Current<T>) => Array<ViewComponent>;
  }
  export class UTableViewColumnDynamic<T, V, P extends nasl.core.Boolean, M extends nasl.core.Boolean, T1> extends ViewComponent {
    /**
     * 数据
     */
    data: UTableViewColumnDynamicOptions<T, V, P, M, unknown>['dataSource'];
    constructor(options?: Partial<UTableViewColumnDynamicOptions<T, V, P, M, T1>>);
  }
  export class UTableViewColumnDynamicOptions<T, V, P extends nasl.core.Boolean, M extends nasl.core.Boolean, T1> extends ViewComponentOptions {
    /**
     * 数据源
     * 展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑
     */
    dataSource: {
      list: nasl.collection.List<T1>;
      total: nasl.core.Integer;
    } | nasl.collection.List<T1>;
    /**
     * 数据类型
     * 数据源返回的数据结构的类型，自动识别类型进行展示说明
     */
    dataSchema: T1;
    /**
     * 值字段
     * 在单选、多选操作、渲染树形数据中，指定数据唯一值的字段
     */
    valueField: (item: T1) => any;
    /**
     * 排序
     * 设置该列是否可以排序
     */
    sortable: nasl.core.Boolean;
    /**
     * 排序初始顺序
     * 该列首次点击时的排序顺序
     */
    defaultOrder: 'asc' | 'desc';
    /**
     * 固定列
     * 该列是否固定。左侧固定列需要从第一列到当前固定列之间的列都是固定列。右侧固定列需要最后一列到当前固定列之间的列都是固定列。
     */
    fixed: nasl.core.Boolean;
    /**
     * 表头文本过长省略
     * 文字过长是否省略显示。默认文字超出时会换行。
     */
    thEllipsis: nasl.core.Boolean;
    /**
     * 内容区文本过长省略
     * 文字过长是否省略显示。默认文字超出时会换行。
     */
    ellipsis: nasl.core.Boolean;
    /**
     * 隐藏列
     */
    hidden: nasl.core.Boolean;
    /**
     * 列宽度
     * 设置列宽度，可设置为数字或百分比
     */
    width: nasl.core.String | nasl.core.Decimal | nasl.core.Integer;
    /**
     * 配置列展示title
     */
    slotTitle: (current: {
      columnIndex: nasl.core.Integer;
      columnItem: T1;
    }) => Array<ViewComponent>;
    /**
     * 配置列展示item
     * 自定义选项的结构和样式
     */
    slotCell: (current: CurrentDynamic<T, T1>) => Array<ViewComponent>;
  }
  export class UTableViewColumnGroup<T, V, P extends nasl.core.Boolean, M extends nasl.core.Boolean> extends ViewComponent {
    constructor(options?: Partial<UTableViewColumnGroupOptions<T, V, P, M>>);
  }
  export class UTableViewColumnGroupOptions<T, V, P extends nasl.core.Boolean, M extends nasl.core.Boolean> extends ViewComponentOptions {
    private title;
    /**
     * 默认
     * 在表格中插入`<u-table-view-column>`子组件
     */
    slotDefault: SlotType<() => Array<UTableViewColumn<T, V, P, M> | ViewComponent>>;
    /**
     * 标题
     * 对标题进行自定义
     */
    slotTitle: () => Array<ViewComponent>;
  }
  export class UTableViewExpander extends ViewComponent {
    constructor(options?: Partial<UTableViewExpanderOptions>);
  }
  export class UTableViewExpanderOptions extends ViewComponentOptions {
    /**
     * 展开时图标
     * 展开时图标
     */
    expandIcon: nasl.core.String;
    /**
     * 关闭时图标
     * 关闭时图标
     */
    collapseIcon: nasl.core.String;
  }
}
declare namespace nasl.ui {
  export class UTabs<T, V> extends ViewComponent {
    /**
     * 值
     */
    value: V;
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    /**
     * 只读
     */
    readonly: nasl.core.Boolean;
    /**
     * 重新加载数据
     */
    reload(): void;
    constructor(options?: Partial<UTabsOptions<T, V>>);
  }
  export class UTabsOptions<T, V> extends ViewComponentOptions {
    private showScrollButtons;
    /**
     * 数据源
     * 展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。
     */
    dataSource: nasl.collection.List<T> | {
      list: nasl.collection.List<T>;
      total: nasl.core.Integer;
    };
    /**
     * 数据类型
     * 数据源返回的数据结构的类型，自动识别类型进行展示说明
     */
    dataSchema: T;
    /**
     * 标签项标题
     * 数据源集合的元素，用于显示标签标题的属性
     */
    titleField: (item: T) => any;
    /**
     * 标签项标题值字段
     * 数据源集合的元素，用于标识标签值的属性
     */
    valueField: (item: T) => V;
    /**
     * 标签项内容值字段
     * 数据源集合的元素，用于标识当前打开的标签项
     */
    urlField: (item: T) => any;
    /**
     * 值
     * 指当前打开标签的标签项
     */
    value: V;
    /**
     * 使用路由
     * 开启后，选项卡可设置跳转页面
     */
    router: nasl.core.Boolean;
    /**
     * 标签项可关闭
     * 设置标签项是否可关闭
     */
    closableField: nasl.core.String;
    /**
     * 仅在显示时加载内容
     * 仅在显示时加载内容（优化渲染性能）
     */
    loadOnActive: nasl.core.Boolean;
    /**
     * 可关闭
     * 设置标签是否可关闭
     */
    closable: nasl.core.Boolean;
    /**
     * 只读
     * 正常显示，但禁止选择/输入
     */
    readonly: nasl.core.Boolean;
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 展示外观
     */
    appear: 'square' | 'round' | 'line' | 'text' | 'capsule' | 'split';
    /**
     * 标签尺寸
     */
    size: 'normal' | 'small' | 'mini';
    /**
     * 点击后
     * 点击某一项后触发
     */
    onClick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 选择前
     * 选择某一页前触发
     */
    onBeforeSelect: (event: {
      selected: nasl.core.Boolean;
      item: T;
      oldItem: T;
      value: V;
      oldValue: V;
      items: nasl.collection.List<T>;
      oldItems: nasl.collection.List<T>;
    }) => any;
    /**
     * 选择后
     * 选择某一项后触发
     */
    onSelect: (event: {
      selected: nasl.core.Boolean;
      item: T;
      oldItem: T;
      value: V;
      oldValue: V;
      items: nasl.collection.List<T>;
      oldItems: nasl.collection.List<T>;
    }) => any;
    /**
     * 关闭前
     * 关闭某一页前触发
     */
    onBeforeClose: (event: {
      value: V;
      oldValue: V;
    }) => any;
    /**
     * 关闭后
     * 关闭某一页后触发
     */
    onClose: (event: {
      value: V;
      oldValue: V;
    }) => any;
    /**
     * 加载前
     * 加载前触发
     */
    onBeforeLoad: (event: any) => any;
    /**
     * 加载后
     * 加载后触发
     */
    onLoad: (event: any) => any;
    /**
     * 默认
     * 插入`<u-tab>`子组件。
     */
    slotDefault: () => Array<UTab<V> | ViewComponent>;
    /**
     * 右侧附加
     * 在标签右侧可以附加的组件。
     */
    slotExtra: () => Array<ViewComponent>;
    /**
     * 头部标题
     */
    slotTitle: (current: Current<T>) => Array<ViewComponent>;
    /**
     * 内容区
     */
    slotContent: (current: Current<T>) => Array<ViewComponent>;
  }
  export class UTab<V> extends ViewComponent {
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    constructor(options?: Partial<UTabOptions<V>>);
  }
  export class UTabOptions<V> extends ViewComponentOptions {
    private title;
    private href;
    private target;
    private to;
    private replace;
    private append;
    private exact;
    /**
     * 值
     */
    value: V;
    /**
     * 链接类型
     */
    linkType: 'destination';
    /**
     * 链接地址
     */
    hrefAndTo: nasl.core.String;
    /**
     * 可关闭
     * 设置标签是否可关闭
     */
    closable: nasl.core.Boolean;
    /**
     * 显示状态
     * 显示状态分为“True(显示)/False(隐藏)”，默认为“显示”
     */
    showTabItem: nasl.core.Boolean;
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 默认
     * 该 tab 下的内容
     */
    slotDefault: () => Array<ViewComponent>;
    /**
     * 标题
     * 自定义标题
     */
    slotTitle: () => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class UTaskbox extends ViewComponent {
    /**
     * 总条数
     */
    total: nasl.core.Integer;
    constructor(options?: Partial<UTaskboxOptions>);
  }
  export class UTaskboxOptions extends ViewComponentOptions {
    /**
     * 图标
     */
    icon: nasl.core.String;
    /**
     * 每页条数
     * 每页展示的任务数量
     */
    size: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 时间间隔（秒）
     * 任务刷新时间间隔，单位：秒
     */
    interval: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 点击
     * 在元素上按下并释放任意鼠标按钮时触发。
     */
    onClick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 双击
     * 在元素上双击鼠标按钮时触发。
     */
    onDblclick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 右键点击
     * 在右键菜单显示前触发。
     */
    onContextmenu: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标按下
     * 在元素上按下任意鼠标按钮时触发。
     */
    onMousedown: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标释放
     * 在元素上释放任意鼠标按钮时触发。
     */
    onMouseup: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标移入
     * 鼠标移入元素时触发。
     */
    onMouseenter: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标移出
     * 鼠标移出元素时触发。
     */
    onMouseleave: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 获得焦点
     * 获得焦点时触发。
     */
    onFocus: (event: {
      cancelBubble: nasl.core.Boolean;
      detail: nasl.core.String;
      layerX: nasl.core.Integer;
      layerY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 失去焦点
     * 失去焦点时触发。
     */
    onBlur: (event: {
      cancelBubble: nasl.core.Boolean;
      detail: nasl.core.String;
      layerX: nasl.core.Integer;
      layerY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
  }
}
declare namespace nasl.ui {
  export class UText extends ViewComponent {
    constructor(options?: Partial<UTextOptions>);
  }
  export class UTextOptions extends ViewComponentOptions {
    /**
     * 文本
     * 显示文本内容
     */
    text: nasl.core.String;
    /**
     * 主题颜色
     * 设置主题颜色样式
     */
    color: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'disabled';
    /**
     * 展示方式
     * 行内展示，或块级换行展示
     */
    display: 'inline' | 'block';
    /**
     * 隐藏过长文本
     * 文本过长时省略显示
     */
    overflow: 'normal' | 'ellipsis' | 'break' | 'nowrap';
    /**
     * 尺寸
     * 设置文本大小
     */
    size: 'default' | 'small' | 'normal' | 'large' | 'huge';
    /**
     * 点击
     * 在元素上按下并释放任意鼠标按钮时触发。
     */
    onClick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 双击
     * 在元素上双击鼠标按钮时触发。
     */
    onDblclick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 右键点击
     * 在右键菜单显示前触发。
     */
    onContextmenu: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标按下
     * 在元素上按下任意鼠标按钮时触发。
     */
    onMousedown: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标释放
     * 在元素上释放任意鼠标按钮时触发。
     */
    onMouseup: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标移入
     * 鼠标移入元素时触发。
     */
    onMouseenter: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 鼠标移出
     * 鼠标移出元素时触发。
     */
    onMouseleave: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
  }
}
declare namespace nasl.ui {
  export class UTextarea extends ViewComponent {
    /**
     * 输入值
     */
    value: UTextareaOptions['value'];
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    /**
     * 只读
     */
    readonly: nasl.core.Boolean;
    /**
     * 预览
     */
    preview: nasl.core.Boolean;
    private focus;
    private blur;
    private clear;
    constructor(options?: Partial<UTextareaOptions>);
  }
  export class UTextareaOptions extends ViewComponentOptions {
    private minlength;
    private spellcheck;
    /**
     * 值
     * 输入的值
     */
    value: nasl.core.String;
    /**
     * 空值为null
     * 清空值时是否设置为null
     */
    emptyValueIsNull: nasl.core.Boolean;
    /**
     * 占位符
     * 为空时显示的占位符文本
     */
    placeholder: nasl.core.String;
    /**
     * 最大字符数
     * 输入框内可输入的最大字符数，超过时不支持输入
     */
    maxlength: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 显示字数统计
     * 设置是否显示「最大字符数」的字数统计
     */
    showWordLimit: nasl.core.Boolean;
    /**
     * 字数统计位置
     * 设置字数统计位置
     */
    limitPosition: 'inside' | 'outside';
    /**
     * 自动获取焦点
     * 设置是否自动获取焦点
     */
    autofocus: nasl.core.Boolean;
    /**
     * 可清除
     * 可点击清除按钮一键清除内容
     */
    clearable: nasl.core.Boolean;
    /**
     * 可调整大小
     * 设置调整大小的方式
     */
    resize: 'none' | 'both' | 'horizontal' | 'vertical';
    /**
     * 只读
     * 正常显示，但禁止选择/输入
     */
    readonly: nasl.core.Boolean;
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 预览
     * 显示预览态
     */
    preview: nasl.core.Boolean;
    /**
     * 尺寸
     * 设置多行输入框大小
     */
    size: 'full' | 'huge' | 'large' | 'medium' | 'normal';
    /**
     * 自适应内容高度
     * 可输入如{maxHeight:100,minHeight:50}，单位默认为px
     */
    autosize: nasl.core.Boolean | object;
    /**
     * 输入前
     * 输入前触发。可以在这个阶段阻止输入，或者修改输入的值 $event.value
     */
    onBeforeInput: (event: {
      value: nasl.core.String;
      oldValue: nasl.core.String;
    }) => any;
    /**
     * 输入时
     * 输入时触发。
     */
    onInput: (event: nasl.core.String) => any;
    /**
     * 改变后
     * 值变化时触发。（注意：与原生事件不同）
     */
    onChange: (event: {
      value: nasl.core.String;
      oldValue: nasl.core.String;
    }) => any;
    /**
     * 聚焦后
     * 获得焦点时触发。
     */
    onFocus: (event: {
      cancelBubble: nasl.core.Boolean;
      detail: nasl.core.String;
      layerX: nasl.core.Integer;
      layerY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 失焦后
     * 失去焦点时触发。
     */
    onBlur: (event: {
      cancelBubble: nasl.core.Boolean;
      detail: nasl.core.String;
      layerX: nasl.core.Integer;
      layerY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 清空前
     * 清空前触发。
     */
    onBeforeClear: (event: {
      value: nasl.core.String;
      oldValue: nasl.core.String;
    }) => any;
    /**
     * 清空后
     * 清空时触发。
     */
    onClear: (event: {
      value: nasl.core.String;
      oldValue: nasl.core.String;
    }) => any;
  }
}
declare namespace nasl.ui {
  export class UTimePicker extends ViewComponent {
    /**
     * 值
     */
    value: UTimePickerOptions['value'];
    /**
     * 起始值
     */
    startTime: UTimePickerOptions['startTime'];
    /**
     * 结束值
     */
    endTime: UTimePickerOptions['endTime'];
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    /**
     * 只读
     */
    readonly: nasl.core.Boolean;
    /**
     * 预览
     */
    preview: nasl.core.Boolean;
    constructor(options?: Partial<UTimePickerOptions>);
  }
  export class UTimePickerOptions extends ViewComponentOptions {
    /**
     * 最小单位
     * 最小时间单位
     */
    minUnit: 'second' | 'minute';
    /**
     * 区间选择
     * 是否支持进行时间区间选择，关闭则为时间点选择
     */
    range: nasl.core.Boolean;
    /**
     * 占位符
     * 为空时显示的占位符文本
     */
    placeholder: nasl.core.String;
    /**
     * 右侧占位符
     * 为空时显示的占位符文本（右侧）
     */
    placeholderRight: nasl.core.String;
    /**
     * 值
     * 默认显示的时间值，格式如08:08:08
     */
    value: nasl.core.String | nasl.core.Time;
    /**
     * 起始值
     * 默认显示的起始时间值，格式如08:08:08
     */
    startTime: nasl.core.String | nasl.core.Time;
    /**
     * 结束值
     * 默认显示的结束时间值，格式如08:08:08
     */
    endTime: nasl.core.String | nasl.core.Time;
    /**
     * 最小时间值
     * 最小可选的时间值，填写null则不限制，日期填写格式为“00:00:00”
     */
    minTime: nasl.core.String | nasl.core.Time;
    /**
     * 最大时间值
     * 最大可选的时间值，填写null则不限制，日期填写格式为“00:00:00”
     */
    maxTime: nasl.core.String | nasl.core.Time;
    /**
     * 时间展示格式
     */
    showFormatter: 'HH:mm:ss' | 'HH时mm分ss秒' | 'HH:mm' | 'HH时mm分';
    /**
     * 高级格式化
     */
    advancedFormatEnable: nasl.core.Boolean;
    /**
     * 高级格式化内容
     * 用来控制时间的展示格式
     */
    advancedFormatValue: nasl.core.String;
    /**
     * 自动获取焦点
     * 设置是否自动获取焦点
     */
    autofocus: nasl.core.Boolean;
    /**
     * 此刻按钮
     * 点击可快捷选择当前时间
     */
    showRightNowButton: nasl.core.Boolean;
    /**
     * 此刻按钮名称
     */
    rightNowTitle: nasl.core.String;
    /**
     * 取消/确定按钮
     * 控制弹出层的关闭和设置的生效与否
     */
    showFooterButton: nasl.core.Boolean;
    /**
     * 取消按钮名称
     */
    cancelTitle: nasl.core.String;
    /**
     * 确定按钮名称
     * 确定按钮的显示名称，如果为空则不显示
     */
    okTitle: nasl.core.String;
    /**
     * 前缀图标
     */
    preIcon: 'time' | '';
    /**
     * 后缀图标
     */
    suffixIcon: 'time' | '';
    /**
     * 弹出层位置依据
     * 设置弹出层依据哪个元素定位位置，可选值：'body'表示添加到 document.body，'reference'表示添加到参考元素中。
     */
    appendTo: 'reference' | 'body';
    /**
     * 可清除
     * 可点击清除按钮一键清除内容
     */
    clearable: nasl.core.Boolean;
    /**
     * 只读
     * 正常显示，但禁止选择/输入
     */
    readonly: nasl.core.Boolean;
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 预览
     * 显示预览态
     */
    preview: nasl.core.Boolean;
    private visible;
    /**
     * 宽度
     * 设置时间选择输入框宽度大小
     */
    width: 'full' | 'huge' | 'large' | 'medium' | 'normal' | 'small' | 'mini';
    /**
     * 高度
     * 设置时间选择输入框高度大小
     */
    height: 'full' | 'huge' | 'large' | 'medium' | 'normal' | 'small' | 'mini';
    /**
     * 改变后
     * 时间改变时触发
     */
    onChange: (event: {
      date: nasl.core.String;
      time: nasl.core.String;
    }) => any;
    /**
     * 失去焦点
     * 失去焦点时触发。
     */
    onBlur: (event: {
      cancelBubble: nasl.core.Boolean;
      detail: nasl.core.String;
      layerX: nasl.core.Integer;
      layerY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
  }
}
declare namespace nasl.ui {
  export class UTimeline<T> extends ViewComponent {
    /**
     * 数据
     */
    data: nasl.collection.List<T>;
    constructor(options?: Partial<UTimelineOptions<T>>);
  }
  export class UTimelineOptions<T> extends ViewComponentOptions {
    /**
     * 数据源
     * 展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑
     */
    dataSource: nasl.collection.List<T>;
    /**
     * 数据类型
     * 数据源返回的数据结构的类型，自动识别类型进行展示说明
     */
    dataSchema: T;
    /**
     * 排布方式
     * 时间线节点与内容的排布方式
     */
    mode: 'default' | 'label';
    /**
     * 待定节点
     * 待定节点连接线为虚线展示，用于表示即将发生或者正在进行的节点
     */
    pending: nasl.core.Boolean;
    /**
     * 插入 `<u-timeline-item>` 子组件
     */
    slotDefault: () => Array<ViewComponent>;
    /**
     * 自定义选项的结构和样式
     */
    slotItem: (current: Current<T>) => Array<ViewComponent>;
  }
  export class UTimelineItem extends ViewComponent {
    constructor(options?: Partial<UTimelineItemOptions>);
  }
  export class UTimelineItemOptions extends ViewComponentOptions {
    /**
     * 标签
     * 指定展示在另一侧的 `label`，只在 `label` 模式下生效
     */
    label: nasl.core.String;
    /**
     * 位置
     * 指定交替展示时的位置，只在 `alternate` 或 `label` 模式下生效
     */
    position: 'left' | 'right';
    /**
     * 节点颜色
     * 指定圆圈颜色 `primary`, `success`, `warning`, `error`，或自定义的色值
     */
    color: nasl.core.String;
    /**
     * 插入文本或 HTML
     */
    slotDefault: () => Array<ViewComponent>;
    /**
     * 自定义图标
     */
    slotDot: () => Array<ViewComponent>;
    /**
     * 自定义 `label` ，只在 `label` 模式下生效
     */
    slotLabel: () => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class UToastSingle extends ViewComponent {
    /**
     * 打开轻提示
     */
    open(): void;
    /**
     * 关闭轻提示
     */
    close(): void;
    constructor(options?: Partial<UToastSingleOptions>);
  }
  export class UToastSingleOptions extends ViewComponentOptions {
    /**
     * 提示内容
     * 默认提示内容
     */
    text: nasl.core.String;
    /**
     * 消息类型
     * 提示的类型
     */
    color: 'success' | 'warning' | 'error' | 'loading' | 'custom';
    /**
     * 自定义图标
     */
    customIcon: nasl.core.String;
    /**
     * 停留时间
     * 自动关闭的延时，单位毫秒。设为 0 时不自动关闭
     */
    duration: nasl.core.Decimal | nasl.core.Integer;
    private position;
    private single;
    private closable;
    /**
     * 弹出后事件
     * 弹出提示时触发
     */
    onOpen: (event: {
      text: nasl.core.String;
      color: nasl.core.String;
      duration: nasl.core.Integer;
      timestamp: nasl.core.Integer;
    }) => any;
    /**
     * 关闭后
     * 关闭提示时触发
     */
    onClose: (event: {
      text: nasl.core.String;
      color: nasl.core.String;
      duration: nasl.core.Integer;
      timestamp: nasl.core.Integer;
    }) => any;
    /**
     * 项
     * 项自定义
     */
    slotItem: () => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class UToc extends ViewComponent {
    /**
     * 选中值
     */
    value: UTocOptions['value'];
    constructor(options?: Partial<UTocOptions>);
  }
  export class UTocOptions extends ViewComponentOptions {
    /**
     * 选中值
     * 当前选中的值
     */
    value: nasl.core.String;
    /**
     * 选择前
     * 选择某一项前触发
     */
    onBeforeSelect: (event: {
      value: nasl.core.String;
      oldValue: nasl.core.String;
      node: nasl.core.String;
      oldNode: nasl.core.String;
    }) => any;
    /**
     * 选择后
     * 选择某一项时触发
     */
    onSelect: (event: {
      value: nasl.core.String;
      oldValue: nasl.core.String;
      node: nasl.core.String;
      oldNode: nasl.core.String;
    }) => any;
    /**
     * 插入`<u-toc-item>`子组件。
     */
    slotDefault: () => Array<ViewComponent>;
  }
  export class UTocItem extends ViewComponent {
    constructor(options?: Partial<UTocItemOptions>);
  }
  export class UTocItemOptions extends ViewComponentOptions {
    private label;
    /**
     * 值
     * 集合的元素类型中，用于标识选中值的属性
     */
    value: nasl.core.String;
    private item;
    /**
     * 链接类型
     */
    linkType: 'destination' | 'download';
    /**
     * 链接地址
     */
    hrefAndTo: nasl.core.String;
    /**
     * 链接打开方式
     * 链接跳转的打开方式，父级窗口和顶级窗口仅适用于iframe组件嵌套的情况，若不存在嵌套，则其打开方式同当前窗口。
     */
    target: '_blank' | '_self' | '_parent' | '_top';
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 点击
     * 点击此项时触发，与原生 click 事件不同的是，它只会在非只读和禁用的情况下触发。
     */
    onClick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    /**
     * 插入`<u-toc-item>`子组件。
     */
    slotDefault: () => Array<ViewComponent>;
    /**
     * 标签
     * 内容自定义
     */
    slotLabel: () => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class UTransfer<T, V> extends ViewComponent {
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    /**
     * 只读
     */
    readonly: nasl.core.Boolean;
    /**
     * 预览
     */
    preview: nasl.core.Boolean;
    /**
     * 从左向右转移数据。
     * @param values - '指定转移选项值的列表。如果不填，则为按左列表框选中项值的列表。'
     */
    forward(values: nasl.collection.List<nasl.core.String>): void;
    /**
     * 从右向左转移数据。
     * @param values - '指定转移选项值的列表。如果不填，则为按右列表框选中项值的列表。'
     */
    reverse(values: nasl.collection.List<nasl.core.String>): void;
    /**
     * 转移指定项的数据。
     * @param direction - '方向'
     * @param values - '指定转移选项值的列表。'
     */
    transfer(direction: 'forward' | 'reverse', values: nasl.collection.List<nasl.core.String>): void;
    constructor(options?: Partial<UTransferOptions<T, V>>);
  }
  export class UTransferOptions<T, V> extends ViewComponentOptions {
    private matchMethod;
    private pageable;
    private pageSize;
    /**
     * 原始数据
     * 原数据列表
     */
    source: nasl.collection.List<T>;
    /**
     * 目标数据
     * 目标数据列表
     */
    target: nasl.collection.List<T>;
    /**
     * 文本字段
     * 选项文本的字段名
     */
    textField: nasl.core.String;
    /**
     * 值字段
     * 选项值的字段名
     */
    valueField: nasl.core.String;
    /**
     * 筛选
     * 显示筛选（搜索框）
     */
    filterable: nasl.core.Boolean;
    /**
     * 大小写敏感
     * 设置是否区分大小写
     */
    caseSensitive: nasl.core.Boolean;
    /**
     * 可清除筛选
     * 可点击清除按钮一键清除搜索框内容
     */
    clearable: nasl.core.Boolean;
    /**
     * 显示头部
     */
    showHead: nasl.core.Boolean;
    /**
     * 左侧列表标题
     */
    sourceTitle: nasl.core.String;
    /**
     * 右侧列表标题
     */
    targetTitle: nasl.core.String;
    /**
     * 占位符
     * 为空时显示的占位符文本
     */
    placeholder: nasl.core.String;
    /**
     * 只读
     * 正常显示，但禁止选择/输入
     */
    readonly: nasl.core.Boolean;
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 预览
     * 显示预览态
     */
    preview: nasl.core.Boolean;
    /**
     * 数据转移时
     * 数据转移时触发
     */
    onTransfer: (event: {
      source: nasl.collection.List<T>;
      target: nasl.collection.List<T>;
      transfer: nasl.collection.List<T>;
      transferValues: nasl.collection.List<V>;
    }) => any;
    /**
     * 改变后
     * 数据改变时触发
     */
    onChange: (event: {
      source: nasl.collection.List<T>;
      target: nasl.collection.List<T>;
      transfer: nasl.collection.List<T>;
      transferValues: nasl.collection.List<V>;
    }) => any;
    /**
     * 默认
     * 插入文本或 HTML
     */
    slotDefault: () => Array<ViewComponent>;
    /**
     * 项
     * 自定义选项的结构和样式
     */
    slotItem: (current: Current<T>) => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class UTreeSelectNew<T, V, M extends nasl.core.Boolean> extends ViewComponent {
    /**
     * 数据
     */
    data: nasl.collection.List<T>;
    /**
     * 选中值
     */
    value: UTreeSelectNewOptions<T, V, M>['value'];
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    /**
     * 预览
     */
    preview: nasl.core.Boolean;
    /**
     * 打开
     */
    opened: nasl.core.Boolean;
    /**
     * 重新加载
     * 重新加载
     */
    reload(): void;
    constructor(options?: Partial<UTreeSelectNewOptions<T, V, M>>);
  }
  export class UTreeSelectNewOptions<T, V, M extends nasl.core.Boolean> extends ViewComponentOptions {
    /**
     * 数据源
     * 展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。
     */
    dataSource: nasl.collection.List<T> | {
      list: nasl.collection.List<T>;
      total: nasl.core.Integer;
    };
    /**
     * 数据类型
     * 数据源返回的数据结构的类型，自动识别类型进行展示说明
     */
    dataSchema: T;
    /**
     * 文本字段
     * 集合的元素类型中，用于显示文本的属性名称
     */
    textField: (item: T) => any;
    /**
     * 值字段
     * 集合的元素类型中，用于标识选中值的属性
     */
    valueField: (item: T) => V;
    /**
     * 父级值字段
     * 集合的元素类型中，用于标识父节点的属性
     */
    parentField: (item: T) => any;
    /**
     * 子级值字段
     * 集合的元素类型中，用于标识子节点的属性，默认为children
     */
    childrenField: (item: T) => nasl.collection.List<any>;
    /**
     * 节点是否展开字段
     * 集合的元素类型中，用于标识节点是否展开的属性，默认为expanded
     */
    expandedField: (item: T) => nasl.core.Boolean;
    /**
     * 选中值
     * 选择后，所选中的值
     */
    value: M extends true ? nasl.collection.List<V> : V;
    /**
     * 可多选
     * 设置是否开启多选模式，显示多选框
     */
    checkable: M;
    /**
     * 占位符
     * 为空时显示的占位符文本
     */
    placeholder: nasl.core.String;
    /**
     * 父子节点独立选择
     * 开启后父节点选择不会全选子节点，子节点选择不会联动父节点
     */
    checkControlled: nasl.core.Boolean;
    /**
     * 不可选择字段
     * 集合的元素类型中，用于标识节点的disabled属性
     */
    disabledField: nasl.core.String;
    /**
     * 可清除
     * 设置是否开启可清除模式
     */
    clearable: nasl.core.Boolean;
    /**
     * 空值为null
     * 清空值时是否设置为null
     */
    emptyValueIsNull: nasl.core.Boolean;
    /**
     * 只渲染激活节点
     * 设置只渲染tree激活子节点，用于渲染性能提升。
     */
    renderOptimize: nasl.core.Boolean;
    /**
     * 弹出层位置依据
     * 设置弹出层依据哪个元素定位位置，可选值：'body'表示添加到 document.body，'reference'表示添加到参考元素中。
     */
    appendTo: 'reference' | 'body';
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 弹出状态
     * 弹出状态分为“True(弹出)/False(关闭)”，默认为“关闭”
     */
    opened: nasl.core.Boolean;
    /**
     * 宽度
     * 设置选择框宽度大小
     */
    width: 'full' | 'huge' | 'large' | 'medium' | 'normal' | 'small' | 'mini';
    /**
     * 高度
     * 设置选择框高度大小
     */
    height: 'full' | 'huge' | 'large' | 'medium' | 'normal' | 'small' | 'mini';
    /**
     * 预览
     * 显示预览态
     */
    preview: nasl.core.Boolean;
    /**
     * 改变后
     * 修改时触发
     */
    onChange: (event: {
      value: V;
      oldValue: V;
      node: T;
      oldNode: T;
    }) => any;
    /**
     * 选择后
     * 选择某一项时触发
     */
    onSelect: (event: {
      value: V;
      oldValue: V;
      node: T;
      oldNode: T;
    }) => any;
    /**
     * 选中或取消后
     * 选中/取消节点时触发
     */
    onCheck: (event: {
      checked: nasl.core.Boolean;
      oldChecked: nasl.core.Boolean;
      node: T;
      values: nasl.collection.List<V>;
    }) => any;
    /**
     * 加载前
     * 加载前触发
     */
    onBeforeLoad: (event: any) => any;
    /**
     * 加载后
     * 加载后触发
     */
    onLoad: (event: any) => any;
    /**
     * 清空前
     * 清空前触发
     */
    onBeforeClear: (event: {
      value: V;
      oldValue: V;
      values: nasl.collection.List<V>;
      oldValues: nasl.collection.List<V>;
    }) => any;
    /**
     * 清空后
     * 清空时触发
     */
    onClear: (event: {
      value: V;
      oldValue: V;
      values: nasl.collection.List<V>;
      oldValues: nasl.collection.List<V>;
    }) => any;
    /**
     * 默认
     * 插入`<u-tree-view-node-new>`子组件
     */
    slotDefault: () => Array<UTreeViewNodeNew<T, V> | ViewComponent>;
    /**
     * 项
     * 自定义选项的结构和样式
     */
    slotItem: (current: Current<T>) => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class UTreeViewNew<T, V, M extends nasl.core.Boolean> extends ViewComponent {
    /**
     * 数据
     */
    data: nasl.collection.List<T>;
    /**
     * 选中值
     */
    value: UTreeViewNewOptions<T, V, M>['value'];
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    /**
     * 只读
     */
    readonly: nasl.core.Boolean;
    /**
     * 展开/折叠所有节点
     * @param expanded - '展开/折叠'
     */
    toggleAll(expanded: nasl.core.Boolean): void;
    /**
     * 重新加载
     */
    reload(): void;
    constructor(options?: Partial<UTreeViewNewOptions<T, V, M>>);
  }
  export class UTreeViewNewOptions<T, V, M extends nasl.core.Boolean> extends ViewComponentOptions {
    /**
     * 数据源
     * 展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。
     */
    dataSource: nasl.collection.List<T> | {
      list: nasl.collection.List<T>;
      total: nasl.core.Integer;
    };
    /**
     * 数据类型
     * 数据源返回的数据结构的类型，自动识别类型进行展示说明
     */
    dataSchema: T;
    /**
     * 选项文本
     * 集合的元素类型中，用于显示文本的属性名称
     */
    textField: (item: T) => any;
    /**
     * 值字段
     * 集合的元素类型中，用于标识选中值的属性
     */
    valueField: (item: T) => V;
    /**
     * 子级值字段
     * 集合的元素类型中，用于标识子节点的属性，默认为children
     */
    childrenField: (item: T) => nasl.collection.List<any>;
    /**
     * 父级值字段
     * 集合的元素类型中，用于标识父节点的属性
     */
    parentField: (item: T) => any;
    /**
     * 选中值
     * 选择后，所选中的值
     */
    value: M extends true ? nasl.collection.List<V> : V;
    /**
     * 父子节点独立选择
     * 开启后父节点选择不会全选子节点，子节点选择不会联动父节点
     */
    checkControlled: nasl.core.Boolean;
    /**
     * 可多选
     * 设置是否开启多选模式，显示多选框
     */
    checkable: M;
    /**
     * 手风琴模式
     * 设置是否每次只展开一个
     */
    accordion: nasl.core.Boolean;
    /**
     * 触发方式
     * 展开/折叠的触发方式
     */
    expandTrigger: 'click' | 'click-expander';
    /**
     * 只读
     * 正常显示，但禁止选择/输入
     */
    readonly: nasl.core.Boolean;
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 选择前
     * 选择某一项前触发
     */
    onBeforeSelect: (event: {
      value: V;
      oldValue: V;
      node: T;
      oldNode: T;
    }) => any;
    /**
     * 输入时
     * 选择某一项时触发
     */
    onInput: (event: V | nasl.collection.List<V>) => any;
    /**
     * 选择后
     * 选择某一项时触发
     */
    onSelect: (event: {
      value: V;
      oldValue: V;
      node: T;
      oldNode: T;
    }) => any;
    /**
     * 改变后
     * 选择值改变时触发
     */
    onChange: (event: {
      value: V;
      oldValue: V;
      node: T;
      oldNode: T;
    }) => any;
    /**
     * 展开折叠后
     * 展开/折叠某节点时触发
     */
    onToggle: (event: {
      expanded: nasl.core.Boolean;
      node: T;
    }) => any;
    /**
     * 选中取消后
     * 选中/取消节点时触发
     */
    onCheck: (event: {
      checked: nasl.core.Boolean;
      oldChecked: nasl.core.Boolean;
      node: T;
      values: nasl.collection.List<V>;
    }) => any;
    /**
     * 加载前
     * 加载前触发
     */
    onBeforeLoad: (event: any) => any;
    /**
     * 加载后
     * 加载后触发
     */
    onLoad: (event: any) => any;
    /**
     * 插入`<u-tree-view-node-new>`子组件
     */
    slotDefault: () => Array<UTreeViewNodeNew<T, V> | ViewComponent>;
    /**
     * 项
     * 自定义选项的结构和样式
     */
    slotItem: (current: Current<T>) => Array<ViewComponent>;
  }
  export class UTreeViewNodeNew<T, V> extends ViewComponent {
    constructor(options?: Partial<UTreeViewNodeNewOptions<T, V>>);
  }
  export class UTreeViewNodeNewOptions<T, V> extends ViewComponentOptions {
    /**
     * 文本
     * 节点的文本
     */
    text: nasl.core.String;
    private node;
    /**
     * 值
     * 节点的值
     */
    value: V;
    /**
     * 默认选中
     */
    checked: nasl.core.Boolean;
    /**
     * 展开状态
     * 展开状态分为“True(展开)/False(折叠)”，默认为“展开”
     */
    expanded: nasl.core.Boolean;
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 选择前
     * 选择此项前触发
     */
    onBeforeSelect: (event: {
      value: V;
      oldValue: V;
      node: T;
      oldNode: T;
    }) => any;
    /**
     * 展开折叠前
     * 展开/折叠此节点前触发
     */
    onBeforeToggle: (event: {
      expanded: nasl.core.Boolean;
      node: T;
    }) => any;
    /**
     * 展开折叠后
     * 展开/折叠某节点时触发
     */
    onToggle: (event: {
      expanded: nasl.core.Boolean;
      node: T;
    }) => any;
    /**
     * 选中后
     * 选中节点时触发
     */
    onCheck: (event: {
      checked: nasl.core.Boolean;
      oldChecked: nasl.core.Boolean;
      node: T;
    }) => any;
    /**
     * 默认
     * 插入子节点
     */
    slotDefault: () => Array<UTreeViewNodeNew<T, V>>;
    /**
     * 项
     * 自定义选项的结构和样式
     */
    slotItem: (current: Current<T>) => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class UUploader extends ViewComponent {
    /**
     * 值
     */
    value: UUploaderOptions['value'];
    /**
     * 上传地址
     */
    url: UUploaderOptions['url'];
    /**
     * 禁用
     */
    disabled: nasl.core.Boolean;
    /**
     * 只读
     */
    readonly: nasl.core.Boolean;
    /**
     * 预览
     */
    preview: nasl.core.Boolean;
    /**
     * 选择
     * 选择文件上传
     */
    select(): void;
    constructor(options?: Partial<UUploaderOptions>);
  }
  export class UUploaderOptions extends ViewComponentOptions {
    private dataType;
    private pastable;
    /**
     * 值
     * 当前文件列表
     */
    value: nasl.core.String;
    /**
     * 上传地址
     * 上传的 URL 地址
     */
    url: nasl.core.String;
    /**
     * 上传的文件字段
     * 上传的文件字段名，后端需要这个字段获取
     */
    name: nasl.core.String;
    /**
     * 支持上传的文件类型
     * 若要限制上传文件类型，请输入类型名称，格式为“.后缀名”，多个文件类型时使用英文逗号隔开。例如“.jpeg,.png,.gif”
     */
    accept: nasl.core.String;
    /**
     * cookie值
     * 通过设置 withCredentials 为 true 获得的第三方 cookies，将会依旧享受同源策略
     */
    withCredentials: nasl.core.Boolean;
    /**
     * 附加数据
     */
    data: object;
    /**
     * 列表数量上限
     */
    limit: nasl.core.Integer;
    /**
     * 最大文件大小
     * 可上传的最大文件大小。默认为50MB；如果为数字，则表示单位为字节；如果为字符串，可以添加以下单位：`KB`、`MB`、`GB`
     */
    maxSize: nasl.core.String;
    /**
     * 列表类型
     */
    listType: 'text' | 'image' | 'card';
    /**
     * URL 字段
     * 请求返回的 URL 字段名
     */
    urlField: nasl.core.String;
    /**
     * 文件图标
     * 是否展示文件图标
     */
    fileIconSwitcher: nasl.core.Boolean;
    private iconMap;
    /**
     * 文件类型
     */
    fileType: 'doc|docx' | 'jpg|jpeg|png|bmp|gif|tiff|tif|webp|svg|psd|raw' | 'pdf' | 'xlsx' | 'txt' | 'ppt|pptx' | 'zip' | 'csv';
    /**
     * 文件图标
     */
    fileIcon: nasl.core.String;
    /**
     * 下载图标
     * 是否展示下载图标
     */
    downloadIconSwitcher: nasl.core.Boolean;
    /**
     * 下载图标
     */
    downloadIcon: nasl.core.String;
    /**
     * 文件大小
     * 是否展示文件大小，单位小于1MB则展示KB，大于1MB则展示MB。
     */
    fileSize: nasl.core.Boolean;
    /**
     * 请求 headers
     */
    headers: Object;
    /**
     * 多文件上传
     */
    multiple: nasl.core.Boolean;
    /**
     * 一次性上传多文件
     * 利用原生 multipart/form-data 传输多个文件的能力，一次性上传多个文件
     */
    multipleOnce: nasl.core.Boolean;
    /**
     * 启用图片裁剪
     * 设置是否启用图片裁剪功能，只对单文件上传有效
     */
    openCropper: nasl.core.Boolean;
    /**
     * 固定图片裁剪框大小
     */
    fixedCropper: nasl.core.Boolean;
    /**
     * 图片裁剪框宽度
     */
    cropperBoxWidth: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 图片裁剪框高度
     */
    cropperBoxHeight: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 图片裁剪框预览形状
     */
    cropperPreviewShape: 'rect' | 'square' | 'circle';
    /**
     * 图片裁剪框标题
     */
    cropperTitle: nasl.core.String;
    private autoUpload;
    /**
     * 显示文件列表
     */
    showFileList: nasl.core.Boolean;
    /**
     * 转换器
     */
    converter: 'json' | 'simple';
    /**
     * 展示方式
     * 行内展示，或块级换行展示
     */
    display: 'inline' | 'block';
    /**
     * 辅助文本
     * 辅助说明的文本信息，如上传的数量、大小等，在上传组件下方展示。
     */
    description: nasl.core.String;
    /**
     * 报错信息
     * 设置是否展示上传时的出错信息，如超出数量、大小
     */
    showErrorMessage: nasl.core.Boolean;
    /**
     * 辅助文本
     * 辅助说明的文本信息
     */
    dragDescription: nasl.core.String;
    /**
     * 文件校验
     * 文件校验函数，可自定义校验规则，如文件名称包含特殊字符等，返回string类型的出错信息
     */
    checkFile: Function;
    /**
     * 文件访问策略
     */
    access: 'public' | 'private';
    /**
     * 文件有效期
     * 是否开启文件有效期控制
     */
    ttl: nasl.core.Boolean;
    /**
     * 上传后有效天数
     * 文件上传后的有效期天数
     */
    ttlValue: nasl.core.Decimal | nasl.core.Integer;
    /**
     * 源地址访问
     * 开启后支持通过文件存储源地址访问文件
     */
    viaOriginURL: nasl.core.Boolean;
    /**
     * 启用压缩
     * 启用压缩后上传的文件按压缩规则进行压缩后上传，压缩规则可在自定义配置参数管理
     */
    lcapIsCompress: nasl.core.Boolean;
    /**
     * 可拖拽
     */
    draggable: nasl.core.Boolean;
    /**
     * 只读
     * 正常显示，但禁止选择/输入
     */
    readonly: nasl.core.Boolean;
    /**
     * 禁用
     * 置灰显示，且禁止任何交互（焦点、点击、选择、输入等）
     */
    disabled: nasl.core.Boolean;
    /**
     * 预览
     * 显示预览态
     */
    preview: nasl.core.Boolean;
    /**
     * 上传前
     * 上传前触发
     */
    onBeforeUpload: (event: {
      file: nasl.core.String;
    }) => any;
    /**
     * 进度改变时
     * 发送进度改变时触发，在上传进度条时使用
     */
    onProgress: (event: {
      item: File;
      file: nasl.core.String;
    }) => any;
    /**
     * 文件数量超额
     * 文件数量超额时触发
     */
    onCountExceed: (event: {
      files: nasl.collection.List<File>;
      value: {
        url: nasl.core.String;
        name: nasl.core.String;
      };
      count: nasl.core.Integer;
      limit: nasl.core.Integer;
      message: nasl.core.String;
    }) => any;
    /**
     * 文件大小超额
     * 文件大小超额时触发
     */
    onSizeExceed: (event: {
      maxSize: nasl.core.Decimal | nasl.core.Integer;
      size: nasl.core.Decimal | nasl.core.Integer;
      message: nasl.core.String;
      name: nasl.core.String;
      file: File;
    }) => any;
    /**
     * 上传成功时
     * 上传成功时触发
     */
    onSuccess: (event: {
      item: File;
      file: nasl.core.String;
    }) => any;
    /**
     * 上传错误时
     * 上传报错时触发
     */
    onError: (event: {
      item: File;
      file: nasl.core.String;
    }) => any;
    /**
     * 删除时
     * 点击删除按钮时触发
     */
    onRemove: (event: {
      value: {
        url: nasl.core.String;
        name: nasl.core.String;
      };
      item: File;
      index: nasl.core.Integer;
    }) => any;
    /**
     * 插入文本 或 HTML。
     */
    slotDefault: () => Array<ViewComponent>;
    /**
     * 文件列表
     * 文件列表。
     */
    'slot-file-list': () => Array<ViewComponent>;
    slotFileList: () => Array<ViewComponent>;
    /**
     * 拖拽文字
     * 拖拽文字自定义
     */
    slotDragDescription: () => Array<ViewComponent>;
  }
}
declare namespace nasl.ui {
  export class UValidator extends ViewComponent {
    /**
     * 验证是否有效
     */
    valid: nasl.core.Boolean;
    /**
     * 手动验证。
     * @param trigger - '触发方式，可选值：`submit`、`blur`和`input`之一，或者它们的任意组合。'
     * @param muted - '是否验证后无提示'
     */
    validate(trigger?: nasl.core.String, muted?: nasl.core.Boolean): ValidateResult;
    constructor(options?: Partial<UValidatorOptions>);
  }
  export class UValidatorOptions extends ViewComponentOptions {
    /**
     * 验证值
     * 临时修改验证值
     */
    validatingValue: any;
    /**
     * 值预处理
     * 验证前对值进行预处理
     */
    validatingProcess: Function;
    private name;
    /**
     * 标签
     * 在 UValidator 用于提示消息的合成，在 UFormItem 等其他组件用于显示标签
     */
    label: nasl.core.String;
    /**
     * 规则
     * 简写格式为字符串类型，完整格式或混合格式为数组类型
     */
    rules: nasl.core.String | Array<any>;
    /**
     * 提示信息
     * 鼠标悬浮时显示的提示信息
     */
    message: nasl.core.String;
    /**
     * 静默
     * 验证时是否静默。可选值：'message'表示只静默消息提示，'all'同时静默消息提示和红框提示
     */
    muted: nasl.core.String;
    /**
     * 忽略验证
     */
    ignoreValidation: nasl.core.Boolean;
    private ignoreRules;
    /**
     * 验证辅助对象
     * 在 Rule 的 `validate` 方法中使用
     */
    validatingOptions: object;
    /**
     * 手动验证
     * 是否采取手动验证。如果为'true'，则 UValidator 将不会在监听到子组件的'input'、'change'和'blur'事件后进行相应的验证。
     */
    manual: nasl.core.Boolean;
    /**
     * 报错位置依据
     * 设置报错信息依据哪个元素定位位置。可选值：'body'表示添加到 document.body，'reference'表示添加到参考元素中。当父级有overflow:hidden而又想展示出错信息，可以设置为body
     */
    appendTo: 'reference' | 'body';
    /**
     * 报错位置方向
     * 设置报错信息展示的位置方向
     */
    placement: 'right' | 'bottom';
    /**
     * 验证后
     * 对于第一个 Field 或者所有子 UValidator：
     */
    onValidate: (event: {
      trigger: nasl.core.String;
      valid: nasl.core.Boolean;
      triggerValid: nasl.core.Boolean;
      touched: nasl.core.Boolean;
      dirty: nasl.core.Boolean;
      firstError: nasl.core.String;
      value: nasl.core.String;
      oldValue: nasl.core.String;
    }) => any;
    /**
     * 失焦验证通过后
     * 对于第一个 Field 或者所有子 UValidator：
     */
    onBlurValid: (event: {
      trigger: nasl.core.String;
      valid: nasl.core.Boolean;
      triggerValid: nasl.core.Boolean;
      touched: nasl.core.Boolean;
      dirty: nasl.core.Boolean;
      firstError: nasl.core.String;
      value: nasl.core.String;
      oldValue: nasl.core.String;
    }) => any;
    /**
     * 失焦验证不通过后
     * 对于第一个 Field 或者所有子 UValidator：
     */
    onBlurInvalid: (event: {
      trigger: nasl.core.String;
      valid: nasl.core.Boolean;
      triggerValid: nasl.core.Boolean;
      touched: nasl.core.Boolean;
      dirty: nasl.core.Boolean;
      firstError: nasl.core.String;
      value: nasl.core.String;
      oldValue: nasl.core.String;
    }) => any;
    /**
     * 默认
     * 插入继承了 MField 的组件，或子 UValidator，或其他 HTML 和文本。
     */
    slotDefault: () => Array<ViewComponent>;
  }
}