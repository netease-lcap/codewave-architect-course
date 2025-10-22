---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Codewave架构师课程"
#   text: "A VitePress Site"
  tagline: 让低代码融入企业架构体系
#   image:
#     src: /logo.png
#     alt: VitePress
  actions:
    - theme: brand
      text: 开始学习
      link: /howtouse.md
    - theme: alt
      text: GitHub
      link: https://github.com/netease-lcap/codewave-architect-course
   
features:
  - icon: 🧑‍💻
    title: 应用开发
    details: 前端扩展、服务端扩展、数据库插件、组件样式
    link: /development
  - icon: 🚀
    title: 部署集成
    details: 源码导出、持续集成、翻译器定制、日志监控
    link: /deployment
  - icon: 🏗️
    title: 应用架构
    details: 微前端、微服务、认证授权、分布式事务
    link: /architecture
  - icon: 🛠️
    title: 平台定制
    details: 平台定制、IDE定制
    link: /platform
    
---
<style module>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #41d1ff);
}
</style>