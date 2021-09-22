import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Docs from '../views/Docs.vue'
import Profile from '../views/Profile.vue'
import config from "../config.json";

const getUserNameAndRepos = (path) => {
  // "/gh/username/repo" -> { username: username, repo: repo }
  const parts = path.split('/')
  return {
    username: parts[2],
    reponame: parts[3]
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
      name: 'Github Alias',
      props: { ...getUserNameAndRepos(value) },
      component: Profile
    })

  )
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
