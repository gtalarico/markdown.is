<template>
  <div>
    <ProgressBar :isLoading="isLoading"></ProgressBar>
    <div class="markdown-body">
      <div v-if="readme" v-html="readme"></div>
    </div>
    <div class="mt-4 pt-6 border-t py-2 px-2 overflow-scroll rounded text-center">
      <a :href="url" class="inline">
        <span class="ml-2 text-sm font-mono text-gray-600">
          {{ url }}
        </span>
      </a>
    </div>
  </div>
</template>

<script>
import ProgressBar from '../components/ProgressBar.vue'
import { renderMarkdownLocal, processMarkup } from '../utils'

export default {
  name: 'App',
  props: ['username', 'reponame', 'branch', 'filename', 'cssFilename'],
  components: { ProgressBar },
  data() {
    return {
      readme: null,
      isLoading: true,
      url: null,
    }
  },
  mounted() {},
  async created() {
    let [username, reponame] = [this.username, this.reponame]
    if (!reponame) {
      reponame = username
    }
    const branches = this.$route.query.branch ? [this.$route.query.branch] : ['main', 'master']
    const filename = this.$route.query.filename || 'README.md'
    const cssFilename = this.$route.query.cssFilename || 'README.css'

    const branchUrls = branches.map((branch) => ({
      branchName: branch,
      mdURL: `https://raw.githubusercontent.com/${username}/${reponame}/${branch}/${filename}`,
      cssURL: `https://raw.githubusercontent.com/${username}/${reponame}/${branch}/${cssFilename}`,
    }))

    let branch = 'main'
    let md
    let css = null

    const promisses = branchUrls.map((u) => fetch(u.mdURL))

    Promise.allSettled(promisses).then((results) => {
      this.isLoading = false
    })

    promisses.forEach((prom, idx) => {
      prom
        .then(async (resp) => {
          if (resp.status == 200) {
            md = await resp.text()
            const branchOpt = branchUrls[idx]

            // Render
            this.url = `https://github.com/${username}/${reponame}/blob/${branchOpt.branchName}/${filename}`
            // let html = await renderMarkdownRemote(md) // Users Github API
            let html = await renderMarkdownLocal(md)
            this.readme = processMarkup(html, username, reponame, branchOpt.branchName)

            try {
              let cssResponse = await fetch(branchOpt.cssURL)
              css = await cssResponse.text()

              const styleId = 'markdown-injected-css'
              const style = document.getElementById(styleId) || document.createElement('style')
              style.id = 'markdown-injected-css'
              style.textContent = css
              document.head.append(style)
              console.log('Css Injected')
            } catch (e) {
              console.log(e)
            }
          }
        })
        .catch((e) => console.log(e))
    })
  },
}
</script>

<style></style>
