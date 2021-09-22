import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Docs from '../views/Docs.vue'
import Profile from '../views/Profile.vue'
import config from "../config.json";

const getPropsFromPath = (path) => {
  // "/gh/username/repo" -> { username: username, repo: repo, etc }
  // TODO: Refactor
  const paramsParts = path.split('?')
  let params = null
  if (paramsParts) {
    params = new URLSearchParams(`?${paramsParts[1]}`)
    path = paramsParts[0]
  }
  const pathParts = path.split('/')

  return {
    username: pathParts[2],
    reponame: pathParts[3],
    branch: params.get('branch'),
    filename: params.get('filename'),

  }
}

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
  ...Object.entries(config.aliases).map(
    ([key, value]) => ({
      path: key,
      name: `alias-${key}`,
      props: { ...getPropsFromPath(value) },
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
