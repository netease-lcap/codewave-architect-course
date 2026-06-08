import { defineUserConfig } from 'vitepress-export-pdf'

const routeOrder = [
  '/index.html',
  '/guide/what-is-vitepress.html',
  '/guide/getting-started.html',
  '/guide/configuration.html',
]

export default defineUserConfig({
//   sorter: (pageA, pageB) => {
//     const aIndex = routeOrder.findIndex(route => route === pageA.path)
//     const bIndex = routeOrder.findIndex(route => route === pageB.path)
//     return aIndex - bIndex
//   },
  routePatterns: ['/docs/performance/index.md'],
})