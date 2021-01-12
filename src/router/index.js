import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { auth } from '@/firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {

    const user = auth.currentUser

    if (user) {
      next()
    } else {
      next({name: 'Login'})
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
