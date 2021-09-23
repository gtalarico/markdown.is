<template>
  <div class="markdown-body">
    <ProgressBar :isLoading="isLoading"></ProgressBar>
    <div v-if="readme" v-html="readme"></div>
    <div class="mt-2 text-gray-400 text-sm text-center font-light">
      URL
      <a :href="url">
        {{ url }}
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
  mounted() {
    console.log(this.username)
    console.log(this.reponame)
    console.log(this.branch)
    console.log(this.filename)
  },
  async created() {
    let [username, reponame] = [this.username, this.reponame]
    if (!reponame) {
      reponame = username
    }
    const repoPath = `${username}/${reponame}`
    const branch = this.$route.query.branch || 'main'
    const filename = this.$route.query.filename || 'README.md'
    const cssFilename = this.$route.query.cssFilename || 'README.css'

    const mdUrl = `https://raw.githubusercontent.com/${repoPath}/${branch}/${filename}`
    const cssUrl = `https://raw.githubusercontent.com/${repoPath}/${branch}/${cssFilename}`

    const [mdResult, cssResult] = await Promise.allSettled([fetch(mdUrl), fetch(cssUrl)])
    const md = mdResult.value.status === 200 ? await mdResult.value.text() : 'not found'
    const css = cssResult.value.status === 200 ? await cssResult.value.text() : null

    this.url = `https://github.com/${repoPath}/blob/${branch}/${filename}`

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
