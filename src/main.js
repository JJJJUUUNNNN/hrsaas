import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import * as directives from '@/directives'

import Component from '@/components'
Vue.use(Component)

import Print from 'vue-print-nb'
Vue.use(Print)

import * as filters from '@/filters'
// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

import checkPermission from '@/mixin/checkPermission'
// 全局混入检查对象
Vue.mixin(checkPermission)

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
