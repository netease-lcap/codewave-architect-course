# codewave_course
CodeWave架构师课程

## 启动文档网站
```bash
pnpm i
pnpm dev
```



## 文档编写规范
### 编写工具 Typora


### 目录结构
```
.
├── docs  # 文档目录
│   ├── development   # 应用开发  
│   ├── deployment    # 部署集成 
│   ├── architecture  # 架构设计
│   ├── platform      # 平台定制
│   ├── performance   # 性能优化
│   └── security      # 安全强化
└── sample  # 源代码示例
```

### 标题
```bash
## 使用“#”表示标题
# 一、 一级标题
## 1、 二级标题
### 1.1、 三级标题
#### 1.1.1、 四级标题
```


### 图片引用
- 图片统一放在`{目录名}/assets`目录下
- 图片引用：`![图片名称](assets/{目录名}/{文件名}.{后缀})`



