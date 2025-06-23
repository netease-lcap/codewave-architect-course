module.exports = [
    {
        text: '开发模式', link: '/practice/index', items: [
            {
                text: '敏捷开发', link: '/practice/index', collapsed: true, items: [
                    {
                        text: '用户故事梳理', link: '/practice/index',
                    },
                    { text: '进度对齐', link: '/practice/index' },
                    {
                        text: '需求优先级', link: '/practice/index',
                    },
                    {
                        text: '需求优先级', link: '/practice/index',
                    },
                    {
                        text: '迭代成果验证', link: '/practice/index',
                    },
                    {
                        text: '版本规划', link: '/practice/index',
                    },
                    {
                        text: '增量交付评估', link: '/practice/index',
                    },
                ]
            },
            {
                text: '快速原型法', link: '/practice/index', collapsed: true, items: [
                    {
                        text: '快速原型设计', link: '/practice/index',
                    },
                    { text: '跨团队协作', link: '/practice/index' },
                    {
                        text: '测试收集反馈', link: '/practice/index',
                    },
                    {
                        text: '原型迭代', link: '/practice/index',
                    },
                    {
                        text: '需求收敛与筛选', link: '/practice/index',
                    },
                ]
            }
        ]
    },
    {
        text: '架构设计', link: '/practice/index', items: [
            {
                text: '微服务', link: '/architecture/micro-application-case',
            },
            { text: '微前端', link: '/practice/index' },
            {
                text: 'DevOps', link: '/deployment/multi-application-deploy',
            },
        ]
    },
    {
        text: '应用开发实践', link: '/practice/index', items: [
            {
                text: '低代码开发', link: '/practice/index', collapsed: true, items: [
                    {
                        text: '高保真UI还原', link: '/practice/index',
                    },
                    { text: '领域建模', link: '/practice/index' },
                    {
                        text: '工作流设计', link: '/practice/index',
                    },
                ]
            },
            {
                text: '高代码开发', link: '/practice/index', collapsed: false, items: [
                    {
                        text: '前端组件库', link: '/development/frontend',
                    },
                    { text: 'Java依赖库', link: '/development/serverend' },
                    {
                        text: '连接器', link: '/development/connector',
                    }]
            },
        ]
    },
]