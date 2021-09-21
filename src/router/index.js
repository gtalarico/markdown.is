import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
// import Profile from '../views/Profile.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/gh/:username',
    name: 'Github Profile',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: Profile
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
