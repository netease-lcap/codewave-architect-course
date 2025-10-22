const { link } = require("fs");

module.exports = {
    title: 'CodeWave架构师课程',
    description: '',
    // 关闭死链接检测
    checkDeadLinks: false,
    themeConfig: {

        outline: [2, 4], // 显示 h2 和 h3 标题
        nav: [
            { text: '学习指南', link: '/howtouse/' },
            { text: 'GitHub', link: 'https://github.com/netease-lcap/codewave-architect-course' },
            // { text: '应用开发', link: '/development' },
            // { text: '部署集成', link: '/deployment' },

            // { text: '最佳实践', link: '/practice/index' }
        ],
        sidebar: {
            '/practice/': require('../practice/sidebar.js'),
            '/':
                [
                    // {
                    //     link: '/howtouse/',
                    //     text: '学习指南',
                    // },
                    {
                        text: '应用架构',
                        link: '/architecture',
                        items: [
                            { text: '微前端', link: '/architecture/micro-frontend' },
                            { text: '认证授权', link: '/architecture/authentication' },
                            { text: '分布式事务 ', link: '/architecture/multi-application-transaction' },
                            { text: '微服务 ', link: '/architecture/microservice' },
                            // { text: '案例：多应用', link: '/architecture/multi-application-case' },
                            { text: '案例：大型MES系统', link: '/architecture/micro-application-case' },

                            { text: '案例：能源行业系统', link: '/architecture/case02' },

                            { text: '案例：交通行业系统', link: '/architecture/case03' },
                        ]
                    },
                    {
                        text: '部署集成',
                        link: '/deployment/',
                        items: [
                            { text: '源码导出 ', link: '/deployment/export' },
                            { text: '多应用集成独立部署', link: '/deployment/multi-application-deploy' },
                            { text: '服务端翻译器插件 ', link: '/deployment/backend-generator-plugin' },
                            { text: '前端翻译器插件 ', link: '/deployment/frontend-generator-plugin' },
                            { text: '日志监控', link: '/deployment/log-monitor' },
                        ]
                    },

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
                            { text: '组件样式定制', link: '/development/componentsStyle' },
                            // { text: '流程扩展定制 ⏳', link: '/development/pocess' },
                            { text: '数据库插件', link: '/development/owl' },
                            { text: '版本控制与多人协作', link: '/development/version_team' },
                            { text: '开发规范', link: '/development/rule' },
                            { text: '开发排障', link: '/development/debug' }
                        ]
                    },
                    // {
                    //     text: '平台定制',
                    //     link: '/platform',
                    //     items: [
                    //         { text: '管控面定制 ⏳', link: '/platform' },
                    //         { text: 'IDE定制 ⏳', link: '/platform' }
                    //     ]
                    // },
                    // {
                    //     text: '安全强化 ⏳',
                    //     link: '/security',
                    // },
                    // {
                    //     text: '性能优化 ⏳',
                    //     link: '/performance',
                    // },
                ]
        },

    }
}
