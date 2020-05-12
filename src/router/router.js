import Router from 'vue-router'
import vue from 'vue'
import content from '../views/content.vue'

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
      component: content
    },
    {
      path: '/tags',
      component: () => import('../views/tags.vue')
    },
    {
      path: '/archives',
      component: () => import('../views/archives.vue')
    },
    {
      path: '/content/edit',
      component: () => import('../views/edit.vue')
    }
  ]
})
