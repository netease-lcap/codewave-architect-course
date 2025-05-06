const { link } = require("fs");

module.exports = {
    title: 'CodeWave架构师课程',
    description: '',
    themeConfig: {
        nav: [
            { text: '应用开发', link: '/development' },
            { text: '部署集成', link: '/deployment' },
            { text: '应用架构', link: '/architecture' },
            { text: '平台定制', link: '/platform' }
        ],
        sidebar: [
            {
                text: '应用开发',
                link: '/development/',
                items: [
                    { text: '服务端扩展', link: '/development/serverend' },
                    { text: '前端扩展', link: '/development/frontend' },
                    { text: '组件样式定制', link: '/getting - started' },
                    { text: '流程扩展定制', link: '/getting - started' },
                    { text: '数据库插件', link: '/getting - started' }
                ]
            },
            {
                text: '部署集成',
                link: '/development',
                items: [
                    { text: '源码导出', link: '/introduction' },
                    { text: '翻译器定制', link: '/getting - started' },
                    { text: '日志监控', link: '/getting - started' },
                ]
            },
            {
                text: '应用架构',
                link: '/development',
                items: [
                    { text: '微前端', link: '/introduction' },
                    { text: '微服务', link: '/getting - started' },
                    { text: '认证授权', link: '/getting - started' },
                    { text: '分布式事务', link: '/getting - started' }
                ]
            },
            {
                text: '平台定制',
                link: '/development',
                items: [
                    { text: '管控面定制', link: '/introduction' },
                    { text: 'IDE定制', link: '/getting - started' }
                ]
            },
            {
                text: '安全强化',
                link: '/',
            },
            {
                text: '性能优化',
                link: '/',
            },
        ]
    }
}
