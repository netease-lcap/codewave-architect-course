const { link } = require("fs");

module.exports = {
    title: 'CodeWave架构师课程',
    description: '',
    // 关闭死链接检测
    checkDeadLinks: false,
    themeConfig: {

        outline: [2, 4], // 显示 h2 和 h3 标题
        nav: [
            { text: '应用开发', link: '/development' },
            { text: '部署集成', link: '/deployment' },
            { text: '应用架构', link: '/architecture' },
            { text: '平台定制', link: '/platform' }
        ],
        sidebar:
            [
                {
                    text: '应用开发',
                    link: '/development/',
                    items: [
                        {
                            text: '服务端扩展', link: '/development/serverend',
                        },
                        { text: '前端扩展', link: '/development/frontend' },
                        {
                            text: '连接器开发', link: '/development/connector',
                        },
                        { text: '组件样式定制 ⏳', link: '/development/componentsStyle' },
                        { text: '流程扩展定制 ⏳', link: '/development/pocess' },
                        { text: '数据库插件', link: '/development/owl' }
                    ]
                },
                {
                    text: '部署集成',
                    link: '/deployment/',
                    items: [
                        { text: '源码导出 ', link: '/deployment/export' },
                        { text: '多应用集成独立部署', link: '/deployment/multi-application-deploy' },
                        { text: '后端翻译器 ', link: '/deployment/backend-generator-plugin' },
                        { text: '前端翻译器 ', link: '/deployment/frontend-generator-plugin' },
                        { text: '日志监控 ⏳', link: '/deployment/log-monitor' },
                    ]
                },
                {
                    text: '应用架构',
                    link: '/architecture',
                    items: [
                        { text: '微前端 ⏳', link: '/architecture' },
                        { text: '多应用', link: '/architecture/multi-application-case' },
                        { text: '微服务', link: '/architecture/micro-application-case' },
                        { text: '认证授权', link: '/architecture/authentication' },
                        { text: '分布式事务 ', link: '/architecture/multi-application-transaction' },
                        { text: '微服务架构对接 ', link: '/architecture/microservice' }
                    ]
                },
                {
                    text: '平台定制',
                    link: '/platform',
                    items: [
                        { text: '管控面定制 ⏳', link: '/platform' },
                        { text: 'IDE定制 ⏳', link: '/platform' }
                    ]
                },
                {
                    text: '安全强化 ⏳',
                    link: '/security',
                },
                {
                    text: '性能优化 ⏳',
                    link: '/performance',
                },
            ]
    }
}
