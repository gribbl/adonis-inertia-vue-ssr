import { createInertiaApp } from '@inertiajs/vue3'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp, h, type DefineComponent } from 'vue'
import MainLayout from '~/layouts/MainLayout.vue'

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: renderToString,
    title: (title) => `${title} - App`,
    resolve: (name) => {
      const pages = import.meta.glob<DefineComponent>('./pages/**/*.vue', { eager: true })
      const resolvedPage = pages[`./pages/${name}.vue`]
      resolvedPage.default.layout ??= MainLayout
      return resolvedPage
    },
    setup({ App, props, plugin }) {
      return createSSRApp({ render: () => h(App, props) }).use(plugin)
    },
  })
}
