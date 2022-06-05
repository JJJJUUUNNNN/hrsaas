// 控制页面登录权限
import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 定义白名单
const WhiteList = ['/login', '/404']

// 前置守卫
router.beforeEach(function(to, from, next) {
  NProgress.start()
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (WhiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/')
    }
  }
  // NProgress.done()
})

// 后置守卫
router.afterEach(function() {
  NProgress.done()
})
