import Router from 'vue-router'
import vue from 'vue'

vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      component: () => import('../views/home.vue')
    },
    {
      path: '/content',
      component: () => import('../views/content.vue')
    },
    {
      path: '/tags',
      component: () => import('../views/tags.vue')
    },
    {
      path: '/archives',
      component: () => import('../views/archives.vue')
    }
  ]
})
