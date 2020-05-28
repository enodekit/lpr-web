import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets 提供前端不同浏览器现实一致性的插件

import ElementUI from 'element-ui'
import './styles/element-variables.scss'
import '@/styles/index.scss' // global css

import App from './App.vue'
import router from './router'
import store from './store'

import formCreate from 'form-create/element'
import i18n from './lang' // Internationalization
import './icons' // icon
import './utils/errorLog' // error log
import './permission' // 权限控制
import 'xe-utils'
import VXETable from 'vxe-table' // 新表单插件（原可编辑表单插件不再更新-更换）
import VXETablePluginElement from 'vxe-table-plugin-element'
import * as filters from './filters' // global 自定义一些全局的过滤器
import 'vxe-table-plugin-element/dist/style.css'
import 'vxe-table/lib/index.css'
import VueCarousel from 'vue-carousel'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
// import style
Vue.use(ElementUI, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value) }) // size 用于改变组件的默认尺寸 zIndex 设置弹框的初始 z-index（默认值：2000）
Vue.use(formCreate)
Vue.config.productionTip = false

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.use(VXETable)
VXETable.use(VXETablePluginElement)
Vue.use(VueCarousel)
Vue.use(VueAwesomeSwiper)
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
