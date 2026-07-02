---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Codewave最佳实践"
#   text: "A VitePress Site"
  tagline: SpecDriven智能开发助力企业应用提效
#   image:
#     src: /logo.png
#     alt: VitePress
  actions:
    - theme: brand
      text: SpecDriven智能开发
      link: /specdriven/
    - theme: alt
      text: 架构师指南
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