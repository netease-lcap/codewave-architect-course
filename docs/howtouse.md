# 学习指南


<object data="a2.svg" type="image/svg+xml" style="max-width: 100%;"></object>

我们将系统搭建的过程分为三个阶段：架构选择、应用搭建、部署集成。


## 一、架构选择
选择架构风格（单体应用、多应用、微服务）需结合业务规模、团队能力、技术成熟度等多维度综合判断。 [【应用架构选择】](architecture/index.md)

以下是常见的三种常见的架构模式搭建中常见技术点的实现方法：
### 1. 单体应用
   - API集成： 解决单体应用与其他系统的通信问题。
   - 单点登录： 解决单体应用利用在企业技术架构中的单点登录问题，主要是依赖IAM模版实现。
### 2. 多应用架构
   
   - [微前端](./architecture/micro-frontend.md)： 解决多应用架构中前端代码的解耦问题。
   - [统一认证与授权](./architecture/authentication.md)： 解决多应用架构中用户认证与授权的问题。
   
   > 参考案例：  [交通行业系统案例](./architecture/case03.md)、[能源行业系统案例](./architecture/case02.md)

### 3. 微服务架构 
   - [服务注册与发现](./architecture/microservice.md)： 解决微服务实例的动态注册与发现问题。
   - 配置中心： 解决微服务配置管理的问题。
   - [分布式事务](./architecture/multi-application-transaction.md)： 解决微服务间数据一致性的问题。

   > 参考案例： [大型MES系统案例](./architecture/micro-application-case.md)



## 二、应用搭建

在搭建复杂应用时、需要高低代码配合完成。低代码负责组装业务逻辑。高代码负责定制特殊的底层组件与实现特殊复杂功能。

### 1. 低代码开发
   复杂项目规模庞大、往往会涉及多人开发的情况。低代码开发需要考虑到代码的可维护性、可扩展性和团队协作效率等问题。其中开发规范与版本控制是非常重要的。

   - [开发规范](./development/rule.md)： 提供低代码开发的规范和最佳实践。
   - [版本控制 & 多人协作](./development/version-control.md)： 提供版本控制和多人协作的工具和流程。
### 2. 前端高代码开发
   前端高代码开发主要负责定制前端组件库、开发前端定制组件等。复杂的样式定制也可以通过高代码实现。

   - [前端扩展](./development/frontend.md)： 用于封装第三方组件库、开发前端定制组件等
   - [复杂样式定制](./development/componentsStyle.md)： 用于定制前端组件的样式。
  
### 3. 服务端高代码开发
   服务端高代码开发主要负责封装第三方类库、复用高码项目逻辑、定制业务逻辑、扩展服务或数据源支持等。具体又可以分为以下三种形式：

   - [服务端扩展](./development/serverend.md)： 用于扩展Java逻辑比如封装第三方类库、复用高码项目逻辑、定制业务逻辑等。
   - [连接器](./development/connector.md)： 用于开发连接第三方服务、系统或数据源的工具(如：Redis、DeepSeek等)。
   - [数据库插件](./development/owl.md)： 用于定制数据库驱动来支持更多的关系数据库产品。


## 三、部署集成
在应用部署方面，虽然CodeWave平台本身支持一键部署，但在企业中更为青睐导出源码后按照高代码开发的规范进行定制部署。另外也会对导出代码的编写风格与工程目录结构提出自己的更个性化要求。

### 1. 应用部署：
   - [源码导出](./development/export.md)： 用于导出CodeWave平台上的项目源码。
   - [集成部署](./development/multi-application.md)： 用于将导出的源码按照高代码开发的规范进行定制部署。
   - [日志监控](./development/log-monitor.md)： 用于监控应用运行状态和性能。
  
### 2. 源码风格结构定制：
   源码的定制主要依赖开发编写代码翻译器插件来实现。翻译器分为前端和服务端两个部分：
   - [前端翻译器插件](./development/frontend-generator-plugin.md)
   - [服务端翻译器插件](./development/backend-generator-plugin.md)

