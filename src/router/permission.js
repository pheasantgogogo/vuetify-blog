import router from './router.js'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.inc()
NProgress.configure({ easing: 'ease', speed: 500 })

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.path === '/login') {
    if (window.sessionStorage.token) {
      next({ path: '/user' })
    } else {
      next()
    }
  } else {
    if (window.sessionStorage.token) {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
