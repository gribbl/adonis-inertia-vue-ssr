/// <reference path="../adonisrc.ts" />
/// <reference path="../config/inertia.ts" />

import './css/app.css'
import { createSSRApp, h } from 'vue'
import type { DefineComponent } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import MainLayout from '~/layouts/MainLayout.vue'

createInertiaApp({
  progress: { color: '#5468FF' },
  title: (title) => `${title} - App`,
  resolve: async (name) => {
    const resolvedPage = await resolvePageComponent(
      `./pages/${name}.vue`,
      import.meta.glob<DefineComponent>('./pages/**/*.vue')
    )
    resolvedPage.default.layout ??= MainLayout
    return resolvedPage
  },
  setup({ el, App, props, plugin }) {
    createSSRApp({ render: () => h(App, props) })
      .use(plugin)
      .mount(el)
  },
})
