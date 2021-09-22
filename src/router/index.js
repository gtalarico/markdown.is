import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Docs from '../views/Docs.vue'
import Profile from '../views/Profile.vue'
import config from "../config.json";


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/docs',
    name: 'Docs',
    component: Docs,
  },
  {
    path: '/gh/:username',
    alias: '/gh/:username/:reponame',
    name: 'Github Profile',
    props: true,
    component: Profile
  },
  ...Object.entries(config.aliases).map(
    ([key, value]) => ({ path: key, redirect: value })
  )
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
