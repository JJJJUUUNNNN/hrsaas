// 控制页面登录权限
import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 定义白名单
const WhiteList = ['/login', '/404']

// 前置守卫
// next是前置守卫必须必须执行的钩子，next必须执行，如果不执行页面就死了
// next（）放过
// next（false）跳转终止
// next（地址）跳至地址
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
      console.log()
      next('/login')
    }
  }
  NProgress.done() // 强关一次，解决手动跳转时进度条不停的问题
})

// 后置守卫
router.afterEach(function() {
  NProgress.done()
})
