import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue')
  },
  {
    path: '/history',
    name: 'History',
    component: () => import(/* webpackChunkName: "history" */ './views/History.vue')
  },
  {
    path: '/update',
    name: 'Update Database',
    component: () => import(/* webpackChunkName: "update" */ './views/Update.vue')
  },
  {
    path: '/debug',
    name: 'Debug',
    component: () => import(/* webpackChunkName: "debug" */ './views/Debug.vue')
  },
  {
    path: '/10.(\\d{4,9})/*',
    name: 'Paper',
    component: () => import(/* webpackChunkName: "paper" */ './views/Paper.vue')
  },
  {
    path: '*',
    name: 'Not Found',
    component: () => import(/* webpackChunkName: "notfound" */ './views/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = (to.name ? to.name + ' - ' : '') + 'SciHub on P2P'
  next()
})

export default router
