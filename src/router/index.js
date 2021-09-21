import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/gh/:username',
    alias: '/gh/:username/:reponame',
    name: 'Github Profile',
    props: true,
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
