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
    name: 'Github Profile',
    props: true,
    component: Profile
  },
  {
    path: '/gh/:username/:reponame',
    name: 'Github Repo',
    props: true,
    component: Profile
  },
  ...Object.entries(config.ghAliases).map(
    ([key, values]) => ({
      path: key,
      name: `alias-${key}`,
      props: { ...values },
      component: Profile
    })

  )
]
console.log(routes)

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
