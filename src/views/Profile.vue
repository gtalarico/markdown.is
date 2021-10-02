<template>
  <div>
    <div class="markdown-body">
      <ProgressBar :isLoading="isLoading"></ProgressBar>
      <div v-if="readme" v-html="readme"></div>
    </div>
    <div class="pt-6 border-t py-2 px-2 overflow-scroll rounded text-center">
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
    const repoPath = `${username}/${reponame}`
    const branches = this.$route.query.branch ? [this.$route.query.branch] : ['main', 'master']
    const filename = this.$route.query.filename || 'README.md'
    const cssFilename = this.$route.query.cssFilename || 'README.css'

    // for (let branch of this.$route.query.branch) {
    const urls = branches.map((branch) => ({
      branchName: branch,
      mdURL: `https://raw.githubusercontent.com/${repoPath}/${branch}/${filename}`,
      cssURL: `https://raw.githubusercontent.com/${repoPath}/${branch}/${cssFilename}`,
    }))

    let md, branch
    let css = null
    const results = await Promise.allSettled(urls.map((o) => fetch(o.mdURL)))
    let index = 0
    for (let r of results) {
      if (r.value.status == 200) {
        md = await r.value.text()
        branch = urls[index].branchName
        let cssURL = urls[index].cssURL
        try {
          let cssResponse = await fetch(cssURL)
          css = await cssResponse.text()
        } catch (e) {
          console.log(e)
        }
        break
      }
      index++
    }

    this.url = `https://github.com/${repoPath}/blob/${branch}/${filename}`

    // Refactor out
    const processMarkup = (htmlMarkup) => {
      const parser = new DOMParser()
      const doc = parser.parseFromString(htmlMarkup, 'text/html')
      doc.querySelectorAll('img').forEach((node) => {
        let imgPath = node.attributes.src.value
        if (!imgPath.startsWith('http') & !imgPath.startsWith('//')) {
          const newUrl = `https://raw.githubusercontent.com/${repoPath}/${branch}/${imgPath}`
          node.src = newUrl
        }
      })
      // dom parser adds html & body so we strip back out
      return doc.body.innerHTML
    }

    if (md) {
      this.readme = processMarkup(this.$md.render(this.$sanitize(md)))
      if (css) {
        // TODO need to id and pop previous one
        const style = document.createElement('style')
        style.textContent = css
        document.head.append(style)
      }
    }
    this.isLoading = false
  },
}
</script>

<style></style>
